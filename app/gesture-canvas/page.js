'use client';

import Link from 'next/link';
import { MotionHero, MotionSection, MotionBlock, FadeUp, FadeUpScale, MotionGrid } from '../components/MotionCaseStudy';

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
            Interaction Research · Novel Input
          </FadeUp>
          <FadeUp as="h1" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            GestureCanvas
          </FadeUp>
          <FadeUp as="p" className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 max-w-3xl">
            Browser hand-tracking layer (MediaPipe) for laser, ink, and slide-style control while
            presenting — annotate without a stylus or keyboard.
          </FadeUp>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-3xl" stagger={0.15}>
            {[
              { value: 'MediaPipe', label: 'Hand tracking' },
              { value: 'Live demo', label: 'GitHub Pages' },
              { value: 'Browser', label: 'No install required' },
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
            {['MediaPipe Hands', 'JavaScript', 'Canvas API', 'Chrome extension path'].map((tag) => (
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
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-violet-300 hover:text-violet-200 hover:underline"
            >
              Live demo ↗
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-violet-300 hover:text-violet-200 hover:underline"
            >
              GitHub repo ↗
            </a>
          </FadeUp>
        </MotionHero>
      </header>

      <section className="project-gutter-x py-10 sm:py-14 border-b border-slate-800">
        <FadeUp>
          <img
            src={heroSrc}
            alt="GestureCanvas conceptual preview of hand tracking and ink strokes"
            className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-700/80 shadow-2xl"
          />
        </FadeUp>
      </section>

      <MotionSection className="project-gutter-x py-14 sm:py-20 space-y-10 max-w-4xl">
        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            What it is
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed">
            GestureCanvas is a prototype for mixed-methods probing of gesture UI: use your hands in
            front of a webcam to draw and control presentation-like tools in the browser.
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            Why it matters for HF / UX
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed">
            Novel input needs the same rigor as product UX: feedback states, failure modes, and
            learnability. The live demo is a research probe, not a finished product — useful for
            discussing gesture affordances and iteration from real use.
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp className="flex flex-wrap gap-3 pt-4">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition-colors"
            >
              Open live demo
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400 transition-colors"
            >
              View GitHub repo
            </a>
          </FadeUp>
        </MotionBlock>
      </MotionSection>
    </main>
  );
}
