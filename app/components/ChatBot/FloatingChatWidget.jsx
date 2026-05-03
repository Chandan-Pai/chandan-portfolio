'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './ChatWidget.module.css';

const SCORE_THRESHOLD = 2.5;

const STOP = new Set(
  `the a an and or but in on at to for of as is are was were be been being have has had do does did will would could should may might must shall can this that these those i you he she it we they what which who whom whose where when why how all each every both few more most other some such no nor not only own same so than too very just about into through during before after above below between under again further then once here there from up down out off over also back well way even much me my your his her its our their tell know want get make like work site page`
    .split(/\s+/),
);

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function normalizeBase(p) {
  if (!p) return '';
  return p.endsWith('/') ? p.slice(0, -1) : p;
}

function knowledgeJsonUrl() {
  const b = normalizeBase(process.env.NEXT_PUBLIC_BASE_PATH || '');
  return `${b}/knowledge.json`;
}

function tokenize(s) {
  const m = String(s).toLowerCase().match(/[a-z0-9]+/g);
  return m || [];
}

function scoreChunk(queryTokens, chunk) {
  const text = [chunk.title, chunk.body, ...(chunk.tags || [])].join(' ');
  const docTokens = tokenize(text);
  const docFreq = new Map();
  for (const t of docTokens) {
    docFreq.set(t, (docFreq.get(t) || 0) + 1);
  }
  let score = 0;
  for (const qt of queryTokens) {
    if (STOP.has(qt)) continue;
    const c = docFreq.get(qt);
    if (c) score += 1 + 1 / (1 + Math.log1p(c));
  }
  const titleLower = chunk.title.toLowerCase();
  const qPhrase = queryTokens.join(' ');
  if (titleLower.length > 2 && qPhrase.includes(titleLower)) score += 2;
  return score;
}

function detectIntent(queryTokens, raw) {
  const q = raw.toLowerCase();
  const hasSubstr = (subs) => subs.some((s) => q.includes(s));
  if (hasSubstr(['email', 'contact', 'reach', 'hiring', 'linkedin', 'connect', 'collaborat'])) {
    return { label: 'contact', rule: 'substring match: contact / hire / email / linkedin' };
  }
  if (hasSubstr(['who is', 'who are', 'about ', 'background', 'your story', 'bio'])) {
    return { label: 'about', rule: 'substring match: about / who / background' };
  }
  if (hasSubstr(['accessib', 'wcag', 'initiator', 'a11y'])) {
    return { label: 'accessibility-case-study', rule: 'substring match: accessibility / wcag / initiator' };
  }
  if (hasSubstr(['campus', 'campus-sync', 'wayfinding'])) {
    return { label: 'campus-case-study', rule: 'substring match: campus / wayfinding' };
  }
  if (hasSubstr(['mercedes', 'repair manual', 'automotive', 'service manual'])) {
    return { label: 'repair-case-study', rule: 'substring match: mercedes / repair / service manual' };
  }
  if (hasSubstr(['manufacturing', 'takt', ' lean', 'blade', 'workflow'])) {
    return { label: 'manufacturing-case-study', rule: 'substring match: manufacturing / takt / lean' };
  }
  if (hasSubstr(['tableau', 'visualization', 'visualisation', 'netflix', 'dashboard', 'data viz'])) {
    return { label: 'data-visualization', rule: 'substring match: tableau / visualization' };
  }
  return { label: 'general', rule: 'no keyword bucket matched; ranked by token overlap only' };
}

function retrieve(chunks, query, topK) {
  const queryTokens = tokenize(query);
  if (!queryTokens.length) {
    return chunks.slice(0, topK).map((c) => ({ chunk: c, score: 0.01 }));
  }
  const scored = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(queryTokens, chunk) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const out = scored.slice(0, topK);
  if (out.length === 0) {
    return chunks.slice(0, 2).map((c) => ({ chunk: c, score: 0 }));
  }
  return out;
}

/** All chunks with scores (including zero), descending — for trace and threshold check. */
function scoreAllChunks(chunks, query) {
  const queryTokens = tokenize(query);
  const scored = chunks.map((chunk) => ({
    chunk,
    score: scoreChunk(queryTokens, chunk),
  }));
  scored.sort((a, b) => b.score - a.score);
  return { queryTokens, scored };
}

function firstSentence(text) {
  const t = String(text).trim();
  const cut = t.match(/^[^.!?]+[.!?]?/);
  return cut ? cut[0].trim() : t;
}

/** Minimal CSV parser (quoted fields, CRLF). */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((cell) => String(cell).trim().length > 0)) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  row.push(field);
  if (row.some((cell) => String(cell).trim().length > 0)) rows.push(row);
  return rows;
}

function isHeaderRow(row) {
  if (!row.length) return false;
  const a = String(row[0]).trim().toLowerCase();
  const b = row[1] != null ? String(row[1]).trim().toLowerCase() : '';
  return (
    (a === 'q' || a === 'question' || a.startsWith('question')) &&
    (b === 'a' || b === 'answer' || b.startsWith('answer'))
  );
}

/**
 * Fuzzy match: token overlap between Sheet Q (col 0) and user query after stopword removal.
 * Returns { text, overlap } for best row, or null if no row has overlap ≥ 1.
 */
function matchSheetRows(rows, query) {
  const queryTokens = tokenize(query).filter((t) => !STOP.has(t));
  if (!queryTokens.length) return null;
  const qtSet = new Set(queryTokens);
  let bestText = null;
  let bestOverlap = 0;

  for (const row of rows) {
    if (row.length < 2) continue;
    const qCol = row[0];
    const aCol = row[1];
    const qTokens = tokenize(qCol).filter((t) => !STOP.has(t));
    let overlap = 0;
    for (const t of qTokens) {
      if (qtSet.has(t)) overlap++;
    }
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      bestText = aCol;
    }
  }
  if (bestOverlap < 1) return null;
  return { text: String(bestText).trim(), overlap: bestOverlap };
}

async function fetchSheetFallback(query, getRows) {
  const url = process.env.NEXT_PUBLIC_SHEETS_FALLBACK_URL;
  if (!url) return null;
  try {
    const rows = await getRows();
    if (!rows || !rows.length) return null;
    let dataRows = rows;
    if (isHeaderRow(rows[0])) dataRows = rows.slice(1);
    return matchSheetRows(dataRows, query);
  } catch {
    return null;
  }
}

function RouteLink({ basePath, path, className, children }) {
  const base = normalizeBase(basePath);
  if (path.startsWith('http')) {
    return (
      <a href={path} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (path.startsWith('/#')) {
    return (
      <a href={`${base}/#${path.slice(2)}`} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={path} className={className}>
      {children}
    </Link>
  );
}

function buildTraceLines({
  intent,
  scored,
  topScore,
  latencyMs,
  sheetTriggered,
  sheetOverlap,
  kbCached,
  tLoadMs,
  sheetError,
  retrieveTopLine,
}) {
  const lines = [
    `intent: ${intent.label}`,
    `rule: ${intent.rule}`,
    '',
    'chunks scored (id → score):',
    ...scored.map(({ chunk, score }) => `  ${chunk.id}: ${score.toFixed(3)}`),
    '',
    `top score: ${topScore.toFixed(3)} (threshold ${SCORE_THRESHOLD})`,
    `retrieve() top hit: ${retrieveTopLine}`,
    `latency: ${latencyMs} ms`,
    `knowledge.json: ${kbCached ? 'cached' : `fetched (${tLoadMs} ms)`}`,
    `sheet fallback triggered: ${sheetTriggered ? 'yes' : 'no'}`,
  ];
  if (sheetTriggered && sheetOverlap != null) lines.push(`sheet match overlap (token count): ${sheetOverlap}`);
  if (sheetError) lines.push(`sheet error: ${sheetError}`);
  return lines.join('\n');
}

export default function FloatingChatWidget() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const titleId = useId();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const kbRef = useRef(null);
  const loadPromiseRef = useRef(null);
  const sheetRowsPromiseRef = useRef(null);
  const sheetRowsRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    kind: 'idle',
    traceText: '',
    topChunk: null,
    sheetText: null,
    error: null,
  });

  const ensureKb = useCallback(async () => {
    if (kbRef.current) return kbRef.current;
    if (loadPromiseRef.current) return loadPromiseRef.current;
    const url = knowledgeJsonUrl();
    loadPromiseRef.current = fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data) => {
        kbRef.current = data;
        return data;
      })
      .catch((e) => {
        loadPromiseRef.current = null;
        throw e;
      });
    return loadPromiseRef.current;
  }, []);

  const getSheetRows = useCallback(async () => {
    const url = process.env.NEXT_PUBLIC_SHEETS_FALLBACK_URL;
    if (!url) return null;
    if (sheetRowsRef.current) return sheetRowsRef.current;
    if (sheetRowsPromiseRef.current) return sheetRowsPromiseRef.current;
    sheetRowsPromiseRef.current = fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.text();
      })
      .then((csv) => {
        const rows = parseCSV(csv);
        sheetRowsRef.current = rows;
        return rows;
      })
      .catch((e) => {
        sheetRowsPromiseRef.current = null;
        throw e;
      });
    return sheetRowsPromiseRef.current;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(input.trim()), 280);
    return () => clearTimeout(t);
  }, [input]);

  const runPipeline = useCallback(
    async (query) => {
      if (!query) {
        setResult({ kind: 'idle', traceText: '', topChunk: null, sheetText: null, error: null });
        return;
      }

      const t0 = performance.now();
      setLoading(true);
      let kbCached = false;
      let tLoadMs = 0;
      let sheetTriggered = false;
      let sheetOverlap = null;
      let sheetError = null;

      try {
        kbCached = !!kbRef.current;
        const tKb = performance.now();
        const data = await ensureKb();
        tLoadMs = kbCached ? 0 : Math.round(performance.now() - tKb);
        const chunks = data.chunks || [];
        const intent = detectIntent(tokenize(query), query);
        const { scored } = scoreAllChunks(chunks, query);
        const topScore = scored[0]?.score ?? 0;
        const top = scored[0];
        const r1 = retrieve(chunks, query, 1)[0];
        const retrieveTopLine = r1 ? `${r1.chunk.id} (${r1.score.toFixed(3)})` : 'none';

        if (topScore >= SCORE_THRESHOLD && top) {
          const latencyMs = Math.round(performance.now() - t0);
          const traceText = buildTraceLines({
            intent,
            scored,
            topScore,
            latencyMs,
            sheetTriggered: false,
            sheetOverlap: null,
            kbCached,
            tLoadMs,
            sheetError: null,
            retrieveTopLine,
          });
          setResult({
            kind: 'kb',
            traceText,
            topChunk: top.chunk,
            sheetText: null,
            error: null,
          });
          setLoading(false);
          return;
        }

        sheetTriggered = !!process.env.NEXT_PUBLIC_SHEETS_FALLBACK_URL;
        let sheetMatch = null;
        if (sheetTriggered) {
          try {
            sheetMatch = await fetchSheetFallback(query, getSheetRows);
          } catch (e) {
            sheetError = e.message || String(e);
            sheetMatch = null;
          }
        }

        const latencyMs = Math.round(performance.now() - t0);

        if (sheetMatch) {
          sheetOverlap = sheetMatch.overlap;
          const traceText = buildTraceLines({
            intent,
            scored,
            topScore,
            latencyMs,
            sheetTriggered: true,
            sheetOverlap,
            kbCached,
            tLoadMs,
            sheetError,
            retrieveTopLine,
          });
          setResult({
            kind: 'sheet',
            traceText,
            topChunk: null,
            sheetText: sheetMatch.text,
            error: null,
          });
        } else {
          const traceText = buildTraceLines({
            intent,
            scored,
            topScore,
            latencyMs,
            sheetTriggered,
            sheetOverlap: null,
            kbCached,
            tLoadMs,
            sheetError,
            retrieveTopLine,
          });
          setResult({
            kind: 'none',
            traceText,
            topChunk: null,
            sheetText: null,
            error: null,
          });
        }
      } catch (e) {
        const latencyMs = Math.round(performance.now() - t0);
        const intent = detectIntent(tokenize(query), query);
        setResult({
          kind: 'error',
          traceText: buildTraceLines({
            intent,
            scored: [],
            topScore: 0,
            latencyMs,
            sheetTriggered: false,
            sheetOverlap: null,
            kbCached,
            tLoadMs,
            sheetError: e.message || String(e),
            retrieveTopLine: 'n/a (kb error)',
          }),
          topChunk: null,
          sheetText: null,
          error: e.message || String(e),
        });
      } finally {
        setLoading(false);
      }
    },
    [ensureKb, getSheetRows],
  );

  useEffect(() => {
    if (!open) return;
    runPipeline(debouncedQuery);
  }, [open, debouncedQuery, runPipeline]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    if (!root) return;

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const nodes = [...root.querySelectorAll(FOCUSABLE)].filter(
        (n) => n.offsetParent !== null || n === document.activeElement,
      );
      if (nodes.length === 0) return;
      const i = nodes.indexOf(document.activeElement);
      if (e.shiftKey) {
        if (i <= 0) {
          e.preventDefault();
          nodes[nodes.length - 1].focus();
        }
      } else if (i === -1 || i === nodes.length - 1) {
        e.preventDefault();
        nodes[0].focus();
      }
    };

    root.addEventListener('keydown', onKeyDown);
    return () => root.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const onBackdropMouseDown = useCallback((e) => {
    if (e.target === e.currentTarget) close();
  }, [close]);

  const openPalette = useCallback(() => {
    setOpen(true);
    ensureKb().catch(() => {});
  }, [ensureKb]);

  return (
    <div className={styles.root}>
      {!open && (
        <button
          type="button"
          className={styles.fab}
          aria-label="Open local retrieval palette"
          aria-keyshortcuts="Meta+K Control+K"
          onClick={openPalette}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      )}

      {open && (
        <div
          className={styles.overlay}
          role="presentation"
          onMouseDown={onBackdropMouseDown}
        >
          <div className={styles.paletteWrap} ref={dialogRef}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Close palette"
              onClick={close}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div
              className={styles.palette}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <div className={styles.paletteHeader}>
                <p id={titleId} className={styles.paletteTitle}>
                  Local retrieval
                </p>
                <p className={styles.paletteHint}>
                  Keyword match on this site’s JSON, then optional published sheet Q&amp;A — not an LLM.{' '}
                  <span className={styles.kbd} aria-hidden>⌘</span>
                  <span className={styles.kbd}>K</span> /{' '}
                  <span className={styles.kbd}>Ctrl</span>
                  <span className={styles.kbd}>K</span> · <span className={styles.kbd}>Esc</span> to close
                </p>
              </div>

              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  setDebouncedQuery(input.trim());
                }}
              >
                <label htmlFor="palette-search" className={styles.visuallyHidden}>
                  Search portfolio knowledge
                </label>
                <input
                  id="palette-search"
                  ref={inputRef}
                  className={styles.searchInput}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, methods, or contact…"
                  autoComplete="off"
                  aria-describedby={`${titleId}-live`}
                />
                <span id={`${titleId}-live`} className={styles.visuallyHidden} aria-live="polite">
                  {loading ? 'Loading' : result.kind === 'idle' ? '' : 'Results updated'}
                </span>
              </form>

              <div className={styles.results} role="region" aria-label="Retrieval results">
                {!debouncedQuery && (
                  <p className={styles.idleHint}>
                    Type a question. Strong matches (score ≥ {SCORE_THRESHOLD}) show a project card with a link; weaker
                    queries try your published Google Sheet CSV if configured.
                  </p>
                )}

                {debouncedQuery && loading && <p className={styles.loading}>Retrieving…</p>}

                {debouncedQuery && !loading && result.kind === 'error' && (
                  <>
                    <p className={styles.noneMessage} role="alert">
                      Could not load knowledge pack: {result.error}
                    </p>
                  </>
                )}

                {debouncedQuery && !loading && result.kind === 'kb' && result.topChunk && (
                  <>
                    <p className={styles.labelLocal}>Local retrieval — knowledge pack</p>
                    <article className={styles.card} aria-label={result.topChunk.title}>
                      <h2 className={styles.cardTitle}>{result.topChunk.title}</h2>
                      <p className={styles.cardBody}>{firstSentence(result.topChunk.body)}</p>
                      <RouteLink
                        basePath={basePath}
                        path={result.topChunk.path}
                        className={styles.cardLinkBtn}
                      >
                        Open {result.topChunk.path === '/' ? 'home' : result.topChunk.path.replace(/^\//, '')}
                      </RouteLink>
                    </article>
                  </>
                )}

                {debouncedQuery && !loading && result.kind === 'sheet' && result.sheetText && (
                  <>
                    <p className={styles.fallbackNote}>Published sheet Q&amp;A (CSV overlap match)</p>
                    <p className={styles.sheetAnswer}>{result.sheetText}</p>
                  </>
                )}

                {debouncedQuery && !loading && result.kind === 'none' && (
                  <p className={styles.noneMessage}>
                    I don&apos;t have that info — contact Chandan directly
                  </p>
                )}
              </div>

              <div className={styles.paletteFooter}>
                <details className={styles.traceDetails}>
                  <summary className={styles.traceSummary}>Reasoning trace</summary>
                  <pre className={styles.tracePre}>{result.traceText || '—'}</pre>
                </details>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
