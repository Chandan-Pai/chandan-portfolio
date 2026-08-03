'use client';

import React from 'react';
import Link from 'next/link';
import {
  MotionHero,
  MotionSection,
  MotionBlock,
  FadeUp,
  FadeUpScale,
  MotionGrid,
} from '../components/MotionCaseStudy';
import LiveSiteEmbed from '../components/LiveSiteEmbed';

const REPO_URL = 'https://github.com/Chandan-Pai/UX-quantitative-analysis';
const LIVE_URL = 'https://ux-quantitative-analysis-f7wxsl89jopdxvcaycsukx.streamlit.app/';

function publicAssetUrl(basePath, relativePath) {
  const encoded = relativePath
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  if (!basePath) return `/${encoded}`;
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${base}/${encoded}`;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
const heroSrc = publicAssetUrl(BASE_PATH, 'images/ux-quantitative-analysis/hero.svg');

const STUDIES = [
  {
    name: 'Survey validation',
    question: 'When people finish a task, is the experience actually good — or just completable?',
    metrics: 'SUS, trust, ease, frustration, completion time · success vs fail gaps · device / experience segments',
    decision:
      'Treat completion as necessary but not sufficient. Mid SUS with high completion → clarity and trust work before new features.',
  },
  {
    name: 'Usability testing',
    question: 'Which tasks create the most friction (errors, help, frustration) and should be redesigned first?',
    metrics: 'Task success, error counts, help rate, time, satisfaction · task friction ranking',
    decision: 'Rank redesign candidates by errors + frustration, not success rate alone.',
  },
  {
    name: 'A/B experiment',
    question: 'Does a conversion lift come with an acceptable experience — or higher bounce / worse load?',
    metrics: 'Conversion %, bounce %, load time, session length, device segments',
    decision: 'Conversion is primary; bounce and load are quality guards before calling a winner.',
  },
];

const AI_PHASES = [
  {
    title: 'Frame the research product',
    mine: 'Chose a validation-suite story (not a notebook dump). Locked honesty: educational synthetic data only, with bold Rafiei / PUX attribution.',
    ai: 'Cursor helped turn the framing into Streamlit page structure and README / portfolio copy drafts I edited hard.',
  },
  {
    title: 'Build the pipeline',
    mine: 'Defined clean → analysis-ready → readout. Specified metrics, decision banners, and “empty filter” failure modes that would blank the UI.',
    ai: 'Implemented cleaners, Plotly charts, and Cloud deploy wiring faster; I reviewed every metric label and statistical claim.',
  },
  {
    title: 'Make it partner-readable',
    mine: 'Moved filters to the top, forced human axis labels, and severity-style decisions — the same readout posture I’d use with EPD partners.',
    ai: 'Iterated layout bugs (page_link, clipping, Cloud multipage). AI accelerated fixes; judgment on what “good validation UI” means stayed mine.',
  },
];

export default function QuantUxValidationPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-slate-100 antialiased">
      <div className="fixed z-50 left-4 sm:left-6" style={{ top: 'max(1rem, env(safe-area-inset-top, 0px))' }}>
        <Link
          href="/"
          aria-label="Back to portfolio"
          data-no-cursor-hover
          className="inline-flex items-center gap-2 sm:gap-3 rounded-full px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/30 transition-all text-white"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline text-sm font-semibold">Back to Portfolio</span>
        </Link>
      </div>

      <header className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white pt-[max(5.5rem,env(safe-area-inset-top)+3rem)] pb-16 sm:pb-20 md:pt-32 md:pb-24">
        <MotionHero className="project-gutter-x w-full min-w-0">
          <FadeUp as="p" className="text-xs font-mono tracking-widest text-sky-400 uppercase mb-4">
            Quantitative UX · Product-decision validation
          </FadeUp>
          <FadeUp as="h1" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Quant UX Validation Suite
          </FadeUp>
          <FadeUp as="p" className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6 max-w-3xl">
            A deep product-focused study of how quantitative UX should land with partners: not a methods
            gallery — a repeatable motion from messy data to a ship / fix / watch decision.
          </FadeUp>
          <FadeUp as="p" className="text-sm text-sky-200/90 mb-8 max-w-3xl leading-relaxed border-l-2 border-sky-500/60 pl-4">
            Inspired by HF interview advice that <strong className="text-white">product-domain depth
            beats generic methods decks</strong>. This suite practices the validation craft I’d bring to
            Insights / UXR / HF partners — while a separate earbud tip study goes after physical audio-fit depth.
          </FadeUp>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-3xl" stagger={0.15}>
            {[
              { value: '3 modes', label: 'Survey · Usability · A/B' },
              { value: '0.96', label: 'Diagnostic ROC-AUC' },
              { value: 'Live', label: 'Streamlit Cloud embed' },
            ].map((stat) => (
              <FadeUpScale
                key={stat.label}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">{stat.label}</p>
              </FadeUpScale>
            ))}
          </MotionGrid>

          <FadeUp className="flex flex-wrap gap-2 mb-6">
            {['Study design', 'Metrics definition', 'Cleaning pipelines', 'Partner readout UI', 'Streamlit', 'Python'].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-gray-100"
                >
                  {tag}
                </span>
              )
            )}
          </FadeUp>

          <FadeUp className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-2">
            <span>
              <span className="font-semibold text-white">Role:</span> Quantitative UX researcher
            </span>
            <span>
              <span className="font-semibold text-white">Date:</span> August 2026
            </span>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-300 hover:underline">
              GitHub ↗
            </a>
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-300 hover:underline">
              Live dashboard ↗
            </a>
          </FadeUp>
        </MotionHero>
      </header>

      <section className="project-gutter-x py-10 sm:py-14 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
            Live product
          </FadeUp>
          <FadeUp as="p" className="text-slate-400 text-sm mb-2 max-w-3xl leading-relaxed">
            Interactive Quant UX Validation Suite — Survey · Usability · A/B. Same browser-chrome embed pattern as Campus-Sync.
          </FadeUp>
          <LiveSiteEmbed
            url={LIVE_URL}
            title="Quant UX Validation Suite live Streamlit app"
            linkLabel="the live Streamlit dashboard"
          />
        </div>
      </section>

      <MotionSection className="project-gutter-x w-full min-w-0 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-14">
        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            1. Research problem
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed mb-4">
            Teams often show charts without a decision. Partners need: what failed, for whom, how sure we are,
            and what to change next. The failure mode of “quant UXR portfolios” is a methods collage that never
            influences a product call.
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed">
            <strong className="text-slate-100">Hypothesis for this study:</strong> a shared readout grammar
            (decision → KPIs → breaks → segments → method) across survey, usability, and A/B makes validation
            transferable — the same way a real research ops motion would.
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            2. Study design thinking
          </FadeUp>
          <FadeUp as="ul" className="space-y-4 text-slate-300 leading-relaxed">
            <li>
              <strong className="text-slate-100">Define metrics before plots.</strong> SUS / trust / frustration
              each have a direction of “better.” Completion alone is treated as incomplete evidence.
            </li>
            <li>
              <strong className="text-slate-100">Reduce variables in the UI.</strong> Top filter bar scoped to
              partner-relevant cuts (device, experience, task, country) — not every column in the CSV.
            </li>
            <li>
              <strong className="text-slate-100">Decision banners carry severity.</strong> High / medium / low
              priority language mirrors how I’d brief design and engineering.
            </li>
            <li>
              <strong className="text-slate-100">Model as diagnostic, not theater.</strong> Logistic task-success
              check (ROC-AUC ≈ 0.96) shows UX features separate outcomes; it is not framed as a production scorer.
            </li>
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6">
            3. Three validation modes (deep cuts)
          </FadeUp>
          <div className="space-y-5">
            {STUDIES.map((study) => (
              <FadeUp
                key={study.name}
                className="rounded-2xl border border-slate-700/80 bg-slate-900/50 p-5 sm:p-6"
              >
                <p className="text-xs font-semibold tracking-widest text-sky-400 uppercase mb-2">{study.name}</p>
                <p className="text-lg font-semibold text-slate-100 mb-3">{study.question}</p>
                <p className="text-sm text-slate-400 mb-2">
                  <span className="text-slate-200 font-medium">Measured: </span>
                  {study.metrics}
                </p>
                <p className="text-sm text-slate-300">
                  <span className="text-slate-100 font-medium">Product decision: </span>
                  {study.decision}
                </p>
              </FadeUp>
            ))}
          </div>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            4. Pipeline (how the work actually runs)
          </FadeUp>
          <FadeUp as="pre" className="overflow-x-auto rounded-xl border border-slate-700 bg-black/40 p-4 text-sm text-sky-200/90 font-mono mb-4">
{`raw educational CSV
  → src/clean_*.py (impute, clip, attention checks, labels)
  → data/processed/*_analysis_ready.csv
  → Streamlit pages (decision → KPI → break → segment → method)
  → Community Cloud redeploy on git push`}
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed">
            Reproducibility mattered as much as charts: cleaners are scripts, not one-off notebook cells, so a
            new study type can follow the same pattern (feature adoption / funnel next).
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            5. AI workflow — collaborator, not author
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed mb-6">
            Same posture as the rest of my portfolio: AI accelerates implementation; research framing, honesty
            locks, and partner language stay mine. (See also{' '}
            <Link href="/ai-process" className="text-sky-400 hover:underline">
              How I built this portfolio with AI
            </Link>
            .)
          </FadeUp>
          <div className="space-y-4">
            {AI_PHASES.map((phase, i) => (
              <FadeUp key={phase.title} className="rounded-2xl border border-slate-700/80 bg-slate-900/40 p-5">
                <p className="text-xs font-semibold tracking-widest text-violet-300 uppercase mb-2">
                  Phase {i + 1} · {phase.title}
                </p>
                <p className="text-sm text-slate-300 mb-2">
                  <span className="text-slate-100 font-medium">I owned: </span>
                  {phase.mine}
                </p>
                <p className="text-sm text-slate-400">
                  <span className="text-slate-200 font-medium">AI helped: </span>
                  {phase.ai}
                </p>
              </FadeUp>
            ))}
          </div>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            6. Honesty locks
          </FadeUp>
          <FadeUp as="ul" className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
            <li>
              Data from <strong className="text-slate-100">Mohsen Rafiei, Ph.D. / PUX Lab</strong> — synthetic
              educational datasets, not real product users.
            </li>
            <li>No claims of live product telemetry or published empirical research on a shipped app.</li>
            <li>Significance checks are educational diagnostics, not sequential experiment designs.</li>
          </FadeUp>
          <FadeUp as="p" className="text-slate-400 text-sm mt-4">
            Dataset source:{' '}
            <a
              href="https://github.com/mohsen-rafiei/UX_datasets"
              className="text-sky-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/mohsen-rafiei/UX_datasets
            </a>
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            7. What’s next (domain depth)
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed">
            This suite trains the <em>validation system</em>. Parallel work — earbud tip fit &amp; comfort —
            trains <em>audio / wearables domain depth</em> with participant-owned hardware, the kind of
            product-focused study that shows niche passion in HF interviews.
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp>
            <img
              src={heroSrc}
              alt="Suite overview graphic"
              className="w-full rounded-2xl border border-slate-700/80 mb-6"
            />
          </FadeUp>
          <FadeUp className="flex flex-wrap gap-3">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400"
            >
              Open live dashboard
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              View GitHub repo
            </a>
          </FadeUp>
        </MotionBlock>
        </div>
      </MotionSection>
    </main>
  );
}
