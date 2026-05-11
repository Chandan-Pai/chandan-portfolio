'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import LiveClock from './LiveClock';

/**
 * Single source of truth for nav items. `kind` controls the renderer:
 *   - 'route'    →  internal Next <Link>
 *   - 'mailto'   →  plain <a href="mailto:..."> (no client routing)
 *   - 'external' →  plain <a target="_blank"> for the resume PDF
 *
 * NOTE: `href` for the resume item is filled in at render time because it
 * depends on NEXT_PUBLIC_BASE_PATH (GitHub Pages subpath).
 */
const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: '/', kind: 'route' },
  { key: 'work', label: 'Work', href: '/#work', kind: 'route' },
  { key: 'about', label: 'About', href: '/About', kind: 'route' },
  { key: 'resume', label: 'Resume', kind: 'external' },
  { key: 'contact', label: 'Contact', href: 'mailto:2000chandanpai@gmail.com', kind: 'mailto' },
];

function normalizePathname(pathname) {
  if (pathname == null || pathname === '') return '';
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

/** Strip `next.config` `basePath` so we can match logical routes in dev and on GitHub Pages. */
function stripAppBase(pathname, basePath) {
  const norm = normalizePathname(pathname);
  const b = normalizePathname(basePath || '');
  if (!b) return norm || '/';
  if (norm === b) return '/';
  if (norm.startsWith(`${b}/`)) {
    const rest = norm.slice(b.length);
    return rest || '/';
  }
  return norm || '/';
}

function isHomePathname(pathname, basePath) {
  const route = stripAppBase(pathname, basePath);
  return route === '/' || route === '';
}

/**
 * Resolve the active nav key from the current route + home-page scroll position.
 *
 * Rules:
 *   - /About                                     →  'about'
 *   - any project case study (/initiator-fellowship, etc.) →  'work'
 *   - /  +  scrollY past the #work section top   →  'work'
 *   - /  +  otherwise                            →  'home'
 *   - resume / contact / mailto have no "active" state — they don't change route.
 *
 * NOTE: With `basePath` (e.g. GitHub Pages) and `trailingSlash: true`, `usePathname()`
 * returns values like `/chandan-portfolio/` — not `/`. Without stripping `basePath`,
 * the home scroll spy never runs and `homeSection` stays null, so this function
 * incorrectly falls through to `'work'`.
 *
 * NOTE on trailing slashes: we normalize by stripping a single trailing slash
 * before matching so `/About/` resolves like `/About`.
 */
function resolveActiveKey(pathname, homeSection, basePath) {
  if (pathname == null) return null;
  const route = stripAppBase(pathname, basePath);
  const r = route === '' ? '/' : route;
  if (r === '/About' || r === '/about') return 'about';
  if (r === '/') return homeSection ?? 'home';
  return 'work';
}

function NavItems({
  resumeHref,
  navLinkClass,
  activeLinkClass,
  activeKey,
  registerLinkRef,
  onNavigate,
}) {
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive = activeKey === item.key;
        const className = `${navLinkClass} ${isActive ? activeLinkClass : ''}`.trim();
        const ariaCurrent = isActive ? 'page' : undefined;
        const refCb = registerLinkRef ? (el) => registerLinkRef(item.key, el) : undefined;

        if (item.kind === 'external') {
          return (
            <a
              key={item.key}
              ref={refCb}
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-current={ariaCurrent}
              onClick={onNavigate}
            >
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={item.key}
            ref={refCb}
            href={item.href}
            className={className}
            aria-current={ariaCurrent}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

/** Desktop: CP + Dynamic Island + clock. Mobile: CP + top-right hamburger panel. */
export default function SiteIslandNav() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const pathname = usePathname();

  const [navExpanded, setNavExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** Tracks Home vs Work on the landing page. `null` on every other route. */
  const [homeSection, setHomeSection] = useState(null);
  const prevPathnameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => {
      const narrow = mq.matches;
      setIsNarrow(narrow);
      if (!narrow) setMobileMenuOpen(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen || !isNarrow) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen, isNarrow]);

  /**
   * Home-page scroll spy: on the app root path, flip the active key between 'home'
   * and 'work' as the user passes the #work section.
   *
   * Implementation: IntersectionObserver with a top rootMargin of -64px (right
   * below the nav island). When the work section's top edge crosses that line,
   * the observer fires and we flip the highlight.
   *
   * Why IntersectionObserver instead of `scroll` + `getBoundingClientRect`:
   * the hero is an `<img>` with `h-auto` and no fixed dimensions. Before the
   * image loads, the work section's top reads ~0 (≤ threshold), so a plain
   * scroll spy would lock in 'work' on first paint and never recover — no
   * subsequent scroll event fires when the image loads and pushes work down.
   * IntersectionObserver re-evaluates on every layout shift automatically, so
   * the highlight self-corrects once the hero hydrates.
   *
   * On every other route the spy stays disengaged (homeSection stays null) so
   * resolveActiveKey() can fall through to its route-based defaults.
   */
  useEffect(() => {
    const prev = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (!isHomePathname(pathname, BASE_PATH)) {
      setHomeSection(null);
      return;
    }

    /* Start optimistic on home — avoids a one-frame "work" flash before the
       observer reports its first entry, especially when coming from another
       route. */
    setHomeSection('home');

    let observer;
    let attachRafId;
    let cancelled = false;

    const attach = () => {
      if (cancelled) return;
      const workEl = document.getElementById('work');
      if (!workEl) {
        /* Section hasn't mounted yet (hydration race). Retry next frame. */
        attachRafId = requestAnimationFrame(attach);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          /* When the section's top has crossed under the nav island, the
             section intersects the shrunken root (viewport minus 64px top
             margin) → user is in Work. Otherwise → user is still in Home. */
          setHomeSection(entry.isIntersecting ? 'work' : 'home');
        },
        {
          /* Shrink the viewport from the top by ~64px so the trip line sits
             right under the floating nav island. */
          rootMargin: '-64px 0px 0px 0px',
          threshold: 0,
        }
      );
      observer.observe(workEl);
    };

    attach();

    return () => {
      cancelled = true;
      if (attachRafId != null) cancelAnimationFrame(attachRafId);
      if (observer) observer.disconnect();
    };
  }, [pathname, BASE_PATH]);

  const isExpanded = !scrolled || navExpanded;
  const resumeHref = `${BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH}/Chandan_Pai_UX_Researcher.pdf`;
  const activeKey = resolveActiveKey(pathname, homeSection, BASE_PATH);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  /* ---------- Desktop nav link styling ---------- */
  /* Relative + z-index keep the link text *above* the absolutely-positioned
     liquid-glass pill that slides behind the active item. */
  const desktopLinkClass =
    'relative z-10 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 py-1 px-2 text-white/75 hover:text-white';
  const desktopActiveLinkClass = '!text-white font-semibold';

  /* ---------- Mobile nav link styling ---------- */
  const mobileLinkClass =
    'relative block rounded-lg px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 transition';
  /* Static liquid-glass treatment on the active row — same vocabulary as the
     desktop sliding pill, just non-animated since the list is vertical. */
  const mobileActiveLinkClass =
    '!text-white bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_100%)] ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.30),inset_0_-1px_0_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.14)]';

  const labelLight = 'text-white drop-shadow-sm';

  /* ---------- Liquid-glass pill measurement ---------- */
  const navContainerRef = useRef(null);
  const linkRefMap = useRef({});
  const [pillStyle, setPillStyle] = useState({ x: 0, width: 0, opacity: 0 });

  const registerLinkRef = useCallback((key, el) => {
    if (el) linkRefMap.current[key] = el;
    else delete linkRefMap.current[key];
  }, []);

  /**
   * Re-measure the active link whenever:
   *   - the active key changes (route or scroll-spy update)
   *   - the island expands/collapses (links mount/unmount)
   *   - the container resizes (viewport change, font load, etc.)
   *
   * Using `transform: translateX(...)` over `left:` keeps the slide animation
   * on the compositor. Width is still transitioned but that's unavoidable for
   * a pill that wraps text labels of different lengths.
   */
  useLayoutEffect(() => {
    const containerEl = navContainerRef.current;
    if (!containerEl) return;

    const measure = () => {
      const linkEl = activeKey ? linkRefMap.current[activeKey] : null;
      if (!isExpanded || !linkEl) {
        setPillStyle((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
        return;
      }
      const linkRect = linkEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const width = linkRect.width;
      if (width === 0) return;
      setPillStyle({
        x: linkRect.left - containerRect.left,
        width,
        opacity: 1,
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(containerEl);
    /* Also observe each link individually — font-display: swap can shift widths
       after the initial render, and the island animates between 80px and 480px. */
    Object.values(linkRefMap.current).forEach((el) => el && ro.observe(el));

    return () => ro.disconnect();
  }, [activeKey, isExpanded, pathname]);

  return (
    <>
      {mobileMenuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[45] cursor-default border-0 bg-black/40 p-0 sm:hidden"
          aria-label="Close menu"
          onClick={closeMobileMenu}
        />
      ) : null}

      <div
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          height: '80px',
          background: 'rgba(0, 0, 0, 0.01)',
          backdropFilter: 'blur(3px)',
          borderBottom: '1px solid transparent',
          backgroundImage:
            'linear-gradient(to right, rgba(100, 100, 100, 0.1) 0%, rgba(150, 150, 150, 0.4) 50%, rgba(100, 100, 100, 0.1) 100%)',
          backgroundClip: 'padding-box, border-box',
          backgroundOrigin: 'padding-box, border-box',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      />

      {/* Mobile: CP + hamburger */}
      <div
        className="pointer-events-none fixed z-50 left-0 right-0 sm:hidden"
        style={{ top: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}
      >
        <div className="pointer-events-auto flex h-11 items-center justify-between px-4">
          <span className={`text-sm font-semibold tracking-widest ${labelLight}`}>CP</span>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/80 shadow-lg backdrop-blur-xl"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-site-nav"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path d="M6 6L18 18M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div
          id="mobile-site-nav"
          className="fixed left-3 right-3 z-[48] max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto rounded-2xl border border-white/15 bg-black/92 py-3 shadow-2xl backdrop-blur-xl sm:hidden"
          style={{
            top: 'calc(3.75rem + env(safe-area-inset-top, 0px))',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <nav className="flex flex-col px-2">
            <NavItems
              resumeHref={resumeHref}
              navLinkClass={mobileLinkClass}
              activeLinkClass={mobileActiveLinkClass}
              activeKey={activeKey}
              onNavigate={closeMobileMenu}
            />
          </nav>
          <div className="mt-2 border-t border-white/10 px-4 py-3">
            <LiveClock layout="inline" variant="onDark" />
          </div>
        </div>
      ) : null}

      {/* Desktop: CP + island + clock */}
      <div
        className="pointer-events-none fixed z-50 left-0 right-0 hidden sm:block"
        style={{ top: 'calc(1.5rem + env(safe-area-inset-top, 0px))' }}
      >
        <div className="relative mx-auto h-10 w-full max-w-[100vw] px-2 sm:px-0">
          <div className="pointer-events-auto absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span
              className="text-sm font-semibold tracking-widest transition-colors text-white drop-shadow-sm"
            >
              CP
            </span>
          </div>

          <div className="pointer-events-auto absolute left-1/2 top-1/2 max-w-[calc(100vw-5rem)] -translate-x-1/2 -translate-y-1/2 sm:max-w-none">
            <nav
              className="transition-all duration-300 ease-in-out"
              onMouseEnter={() => setNavExpanded(true)}
              onMouseLeave={() => setNavExpanded(false)}
              style={{
                width: isExpanded ? 'min(480px, calc(100vw - 1.25rem))' : '80px',
                height: '40px',
                borderRadius: '20px',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
              }}
            >
              <div
                ref={navContainerRef}
                className={`relative no-scrollbar flex h-full items-center px-3 sm:px-6 ${
                  isExpanded ? 'justify-center gap-4 overflow-x-auto sm:gap-8' : 'justify-center gap-8'
                }`}
              >
                {/*
                  Liquid-glass active pill. Slides between items via translateX
                  + width. Stacking order: behind the link text (which sets z-10
                  on each link) but inside the same flex row so coordinates
                  match. Hidden when the island is collapsed or there's no
                  resolvable active key (e.g. on routes outside the nav set).
                */}
                {isExpanded ? (
                  /*
                    IMPORTANT — Tailwind v4 emits the modern CSS `translate`
                    property (not `transform: translate()`), so utilities like
                    `-translate-y-1/2` would COMPOSE with our inline `transform`
                    rather than be overridden by it. To keep both axes under one
                    rule we own positioning entirely inline here: `top` for the
                    vertical anchor, and a single `transform` that combines the
                    X slide and the -50% Y centering. No Tailwind positioning
                    utilities on this element.
                  */
                  <div
                    aria-hidden
                    className="pointer-events-none absolute"
                    style={{
                      top: '50%',
                      left: 0,
                      height: '30px',
                      width: pillStyle.width,
                      borderRadius: '16px',
                      opacity: pillStyle.opacity,
                      transform: `translate(${pillStyle.x}px, -50%)`,
                      transition:
                        'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), width 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease',
                      /*
                        Liquid-glass look kept intentionally minimal so it
                        reads cleanly against the dark island:
                          • soft white-to-fainter gradient = translucent body
                          • inset hairline at 1px = clean glass rim
                          • inset 1px top highlight = specular catch
                          • backdrop blur+saturate = frosted refraction
                        Deliberately NO outer drop-shadow / glow and NO dark
                        inset edge — both produce weird halos/banding on a
                        dark base.
                      */
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)',
                      boxShadow:
                        'inset 0 0 0 1px rgba(255,255,255,0.22), inset 0 1px 0 rgba(255,255,255,0.40)',
                      backdropFilter: 'blur(10px) saturate(160%)',
                      WebkitBackdropFilter: 'blur(10px) saturate(160%)',
                    }}
                  />
                ) : null}

                {!isExpanded ? (
                  <div className="astronaut-float pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="8" r="4" fill="white" />
                      <ellipse cx="12" cy="16" rx="6" ry="4" fill="white" />
                      <circle cx="10" cy="7" r="1" fill="black" />
                      <circle cx="14" cy="7" r="1" fill="black" />
                      <path d="M10 10 Q12 11 14 10" stroke="black" strokeWidth="0.5" fill="none" />
                    </svg>
                  </div>
                ) : (
                  <NavItems
                    resumeHref={resumeHref}
                    navLinkClass={desktopLinkClass}
                    activeLinkClass={desktopActiveLinkClass}
                    activeKey={activeKey}
                    registerLinkRef={registerLinkRef}
                    onNavigate={undefined}
                  />
                )}
              </div>
            </nav>
          </div>

          <div className="pointer-events-auto absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LiveClock layout="inline" variant="onDark" />
          </div>
        </div>
      </div>
    </>
  );
}
