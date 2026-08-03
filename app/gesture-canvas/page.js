'use client';

import Link from 'next/link';
import {
  MotionHero,
  MotionSection,
  MotionBlock,
  FadeUp,
  FadeUpScale,
  MotionGrid,
} from '../components/MotionCaseStudy';

const DEMO_URL = 'https://chandan-pai.github.io/Gesture_canvas/';
const REPO_URL = 'https://github.com/Chandan-Pai/Gesture_canvas';

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
const heroSrc = publicAssetUrl(BASE_PATH, 'images/gesture-canvas/hero.svg');

function LiveEmbed({ src, title, openLabel }) {
  return (
    <div
      className="my-6 overflow-hidden rounded-xl border border-slate-700/90 bg-slate-900 shadow-lg"
      data-no-cursor-hover
    >
      <div className="flex items-center gap-2 border-b border-slate-700/80 bg-slate-800/90 px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400/90" />
          <span className="size-2.5 rounded-full bg-amber-400/90" />
          <span className="size-2.5 rounded-full bg-green-400/90" />
        </span>
        <div className="min-w-0 flex-1 truncate rounded-md border border-slate-700/80 bg-slate-900 px-3 py-1 font-mono text-xs text-slate-400">
          {src}
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-semibold text-violet-300 hover:text-violet-200"
        >
          Open ↗
        </a>
      </div>
      <div className="relative h-[min(75svh,720px)] min-h-[420px] w-full bg-slate-900">
        <iframe
          title={title}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="camera; microphone"
        />
      </div>
      <p className="border-t border-slate-700 bg-slate-900/50 px-3 py-2 text-xs text-slate-400">
        Embedded live demo (camera permission may be required). If blank, open{' '}
        <a href={src} className="font-medium text-violet-300 underline hover:text-violet-200" target="_blank" rel="noopener noreferrer">
          {openLabel}
        </a>
        .
      </p>
    </div>
  );
}

const RESEARCH_QUESTIONS = [
  {
    q: 'Can people discover gesture affordances without a tutorial wall?',
    why: 'Novel input dies when first-use friction is high. Probe onboarding length vs discovery.',
  },
  {
    q: 'What feedback states make tracking feel trustworthy vs broken?',
    why: 'Same problem as invisible AI: when the system fails silently, users invent wrong mental models.',
  },
  {
    q: 'Which failure modes are recoverable (retry) vs session-ending?',
    why: 'Maps to severity ranking you’d use in a usability readout for a hardware + software team.',
  },
];

const AI_PHASES = [
  {
    title: 'Define the research probe',
    mine: 'Scoped GestureCanvas as a mixed-methods probe for gesture UI — not a finished productivity app. Named success as learnability + feedback clarity.',
    ai: 'Helped scaffold browser / MediaPipe integration paths and debug camera permission edge cases.',
  },
  {
    title: 'Ship a demo people can try',
    mine: 'Pushed for a public GitHub Pages demo so interviewers can experience the interaction, not only screenshots.',
    ai: 'Accelerated HTML/JS iteration and deploy friction; I owned interaction design choices and research framing.',
  },
  {
    title: 'Portfolio case depth',
    mine: 'Wrote the study as research questions + failure modes (Grace-style product depth), not a tech demo dump.',
    ai: 'Drafted layout/components in Cursor; I rewrote claims to stay honest about prototype status.',
  },
];

export default function GestureCanvasPage() {
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

      <header className="w-full bg-gradient-to-b from-slate-950 via-violet-950 to-slate-900 text-white pt-[max(5.5rem,env(safe-area-inset-top)+3rem)] pb-16 sm:pb-20 md:pt-32 md:pb-24">
        <MotionHero className="project-gutter-x w-full min-w-0">
          <FadeUp as="p" className="text-xs font-mono tracking-widest text-violet-300 uppercase mb-4">
            Interaction research · Novel input probe
          </FadeUp>
          <FadeUp as="h1" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            GestureCanvas
          </FadeUp>
          <FadeUp as="p" className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6 max-w-3xl">
            A live browser probe for gesture UI: MediaPipe hand tracking to draw and control a canvas —
            built to study learnability, feedback, and failure modes, not to ship a finished tool.
          </FadeUp>
          <FadeUp as="p" className="text-sm text-violet-200/90 mb-8 max-w-3xl leading-relaxed border-l-2 border-violet-500/60 pl-4">
            Product-focused depth means asking what breaks for users under novel input — the same discipline
            as hardware HF de-risking, applied to a software interaction concept.
          </FadeUp>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-3xl" stagger={0.15}>
            {[
              { value: 'MediaPipe', label: 'Hand tracking' },
              { value: 'Live demo', label: 'Embedded below' },
              { value: 'Probe', label: 'Not a finished product' },
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
            {['Gesture UX', 'Feedback states', 'Failure modes', 'MediaPipe', 'Canvas API'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-gray-100"
              >
                {tag}
              </span>
            ))}
          </FadeUp>

          <FadeUp className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-2">
            <span>
              <span className="font-semibold text-white">Role:</span> Interaction researcher / builder
            </span>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-300 hover:underline">
              Live demo ↗
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-300 hover:underline">
              GitHub ↗
            </a>
          </FadeUp>
        </MotionHero>
      </header>

      <section className="project-gutter-x py-10 border-b border-slate-800 max-w-5xl mx-auto">
        <FadeUp as="h2" className="text-xl font-bold text-slate-100 mb-2">
          Try the live demo
        </FadeUp>
        <FadeUp as="p" className="text-slate-400 text-sm mb-4">
          Allow camera access when prompted. Watch how feedback (or lack of it) shapes trust in the tracking.
        </FadeUp>
        <LiveEmbed src={DEMO_URL} title="GestureCanvas live demo" openLabel="the GestureCanvas demo" />
      </section>

      <MotionSection className="project-gutter-x py-14 sm:py-20 space-y-14 max-w-4xl">
        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            1. Why this exists
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed">
            Gesture and camera-based input look magical in demos and fail quietly in real use. I built a
            public probe so I can talk about <strong className="text-slate-100">discoverability, feedback,
            and recoverable errors</strong> with evidence you can feel — not only slides.
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6">
            2. Research questions (the deep cut)
          </FadeUp>
          <div className="space-y-4">
            {RESEARCH_QUESTIONS.map((item) => (
              <FadeUp key={item.q} className="rounded-2xl border border-slate-700/80 bg-slate-900/50 p-5">
                <p className="text-lg font-semibold text-slate-100 mb-2">{item.q}</p>
                <p className="text-sm text-slate-400">{item.why}</p>
              </FadeUp>
            ))}
          </div>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            3. How I’d study it formally
          </FadeUp>
          <FadeUp as="ul" className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
            <li>Think-aloud first-use sessions (n small, high signal) on draw / erase / mode switch.</li>
            <li>Code errors: lost tracking, lag, unintended strokes, mode confusion.</li>
            <li>Compare feedback prototypes (cursor ghost, confidence meter, haptic-less visual pulse).</li>
            <li>Severity + confidence readout for engineering — same grammar as the Quant UX suite.</li>
          </FadeUp>
          <FadeUp as="p" className="text-slate-400 text-sm mt-4">
            Honest status: the live build is the probe. Formal moderated n and coded themes are the next rigor step.
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            4. AI workflow — collaborator, not author
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed mb-6">
            AI helped me ship the demo faster. Research questions, prototype honesty, and what “good” means for
            gesture UX stayed mine. (
            <Link href="/ai-process" className="text-violet-300 hover:underline">
              Portfolio AI process
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
            5. What I’d show in an interview
          </FadeUp>
          <FadeUp as="ol" className="list-decimal pl-5 space-y-2 text-slate-300 leading-relaxed">
            <li>Open the live demo and narrate a failure + recovery.</li>
            <li>Walk the three research questions and how I’d instrument them.</li>
            <li>Connect to hardware HF: waiting on sensors / tracking quality is a real constraint, like waiting on prototypes.</li>
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp>
            <img src={heroSrc} alt="GestureCanvas concept graphic" className="w-full rounded-2xl border border-slate-700/80 mb-6" />
          </FadeUp>
          <FadeUp className="flex flex-wrap gap-3">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-400"
            >
              Open live demo
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
      </MotionSection>
    </main>
  );
}
