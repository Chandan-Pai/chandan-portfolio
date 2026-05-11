'use client';

import Link from 'next/link';

const cardSurface = {
  background: 'rgba(0, 0, 0, 0.65)',
  borderColor: 'rgba(255, 255, 255, 0.15)',
};

const TOOLS = [
  {
    name: 'Claude (Anthropic)',
    role: 'Content & strategy',
    note: 'Content strategy, case-study copy, Cursor prompts, research framing, and honest critique of portfolio gaps.',
  },
  {
    name: 'Cursor IDE',
    role: 'AI code editor',
    note: 'Generated Next.js page components, drove the dark-theme migration, the Recharts dashboard, the liquid-glass nav system, and the broader component architecture.',
  },
  {
    name: 'GitHub Copilot + Next.js',
    role: 'Iteration & deploy',
    note: 'Autocomplete during iteration, deployment pipeline, and the static export to GitHub Pages.',
  },
];

const PHASES = [
  {
    name: 'Phase 1',
    title: 'Foundation',
    note: 'Next.js App Router portfolio, four case-study pages, and the GitHub Pages deployment pipeline.',
  },
  {
    name: 'Phase 2',
    title: 'Shared components',
    note: 'ExpandableImage lightbox with two-state zoom (fit ↔ actual resolution for reading text-heavy diagrams), FirstVisit intro overlay backed by a 30-day cookie, and a shared image system used across every case study.',
  },
  {
    name: 'Phase 3',
    title: 'User Engagement Analysis',
    note: 'New case study with a full interactive Recharts dashboard: segment comparison toggle, color-coded regression coefficients, A/B-test lift visualization, category filter (All / High / Mid / Low), and four headline metric cards — built over 8,196 Play Store apps.',
  },
  {
    name: 'Phase 4',
    title: 'Dark theme + liquid glass',
    note: 'Site-wide dark migration to #0a0a0a with a full contrast audit, liquid-glass nav island with IntersectionObserver-based scroll spy (basePath-aware for prod vs dev), liquid-glass home placards via backdrop-filter, route-transition progress bar, and an asymmetric AEIOU / Observation Sheet grid.',
  },
];

function SectionLabel({ children }) {
  return <p className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase mb-4">{children}</p>;
}

function FrostedPanel({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border p-8 sm:p-10 backdrop-blur-md ${className}`}
      style={cardSurface}
    >
      {children}
    </div>
  );
}

export default function AiProcessPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images5.alphacoders.com/492/492784.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          filter: 'grayscale(100%) brightness(0.3)',
        }}
      />

      <div className="relative z-10">
        {/* Hero */}
        <section
          className="flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12 md:pt-28 md:pb-16 relative"
          style={{ minHeight: '42vh' }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase mb-6 text-center">Case study</p>
          <h1
            className="font-black tracking-tight uppercase text-center max-w-5xl"
            style={{
              fontSize: 'clamp(1.75rem, 8vw, 4.5rem)',
              lineHeight: '1.05',
              color: '#ffffff',
              textShadow: '0 0 20px rgba(10, 199, 202, 0.6)',
            }}
          >
            How I Built This Portfolio With AI
          </h1>
          <div className="mt-8 flex justify-center w-full px-2">
            <p className="text-lg sm:text-xl text-white/90 text-center max-w-3xl leading-relaxed">
              This isn&apos;t a story about AI doing the work. It&apos;s about using AI as a collaborator — for building,
              debugging, and shipping faster than I could alone. Every research insight, every design decision, every
              word on the case-study pages is mine. The AI helped me move from idea to implementation without getting
              stuck.
            </p>
          </div>
        </section>

        {/* Tools used */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <SectionLabel>Tools used</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 leading-tight">The collaborator stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                className="rounded-2xl border p-6 sm:p-8 backdrop-blur-md flex flex-col"
                style={cardSurface}
              >
                <p className="text-xs font-semibold tracking-widest text-sky-400/90 uppercase mb-2">Tool {i + 1}</p>
                <p className="text-lg font-bold text-white mb-1">{tool.name}</p>
                <p className="text-sm font-medium text-white/70 mb-3">{tool.role}</p>
                <p className="text-sm text-white/80 leading-relaxed flex-1">{tool.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What actually got built */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <SectionLabel>What actually got built</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 leading-tight">From scaffold to system, in four phases</h2>
          <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0">
            {PHASES.map((phase, i) => (
              <div key={phase.name} className="flex flex-col md:flex-row md:items-stretch flex-1 min-w-0">
                <div
                  className="rounded-2xl border p-5 sm:p-6 backdrop-blur-md flex-1 flex flex-col"
                  style={cardSurface}
                >
                  <p className="text-xs font-semibold tracking-widest text-sky-400/90 uppercase mb-2">{phase.name}</p>
                  <p className="text-lg font-bold text-white mb-3">{phase.title}</p>
                  <p className="text-sm text-white/80 leading-relaxed flex-1">{phase.note}</p>
                </div>
                {i < PHASES.length - 1 && (
                  <div
                    className="hidden md:flex items-center justify-center px-2 text-sky-400/80 text-xl font-light select-none"
                    aria-hidden="true"
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/55 md:hidden text-center">
            Foundation → Shared components → User Engagement Analysis → Dark theme + liquid glass.
          </p>
        </section>

        {/* Honest reflection */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <SectionLabel>Honest reflection</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">The hardest part wasn&apos;t the code</h2>
          <FrostedPanel>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4">
              The hardest part wasn&apos;t the code — it was knowing what to build and why. AI could generate a
              component in seconds. Deciding whether that component actually served the research narrative took
              judgment that had to be mine.
            </p>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-4">
              The liquid-glass nav pill took three debugging rounds to position correctly because of a Tailwind v4
              transform composition bug. The lightbox zoom states, the IntersectionObserver active-section logic, the
              basePath edge cases in prod vs dev — these weren&apos;t solved by prompting. They were solved by
              understanding the problem first, then using AI to implement the solution faster.
            </p>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              That&apos;s the right relationship with these tools.
            </p>
          </FrostedPanel>
        </section>

        {/* Bottom note */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-[max(7rem,env(safe-area-inset-bottom))]">
          <SectionLabel>Bottom note</SectionLabel>
          <div
            className="rounded-2xl border-l-4 border-sky-400 border border-white/15 pl-6 pr-6 py-8 sm:pl-8 sm:pr-8 backdrop-blur-md"
            style={{ background: 'rgba(10, 25, 40, 0.72)' }}
          >
            <ul className="space-y-3 text-base sm:text-lg text-white/90 leading-relaxed">
              <li>
                <span className="font-semibold text-white">Content, research framing, and design decisions:</span>{' '}
                mine.
              </li>
              <li>
                <span className="font-semibold text-white">Implementation speed:</span> significantly faster with AI.
              </li>
              <li>
                <span className="font-semibold text-white">Time from concept to deployed portfolio:</span> ~3 weeks.
              </li>
            </ul>
            <p className="mt-8 text-sm text-sky-300/90">
              <Link href="/About" className="underline hover:text-sky-200">
                About
              </Link>
              <span className="text-white/40 mx-2">·</span>
              <Link href="/" className="underline hover:text-sky-200">
                Home
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
