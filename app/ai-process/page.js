'use client';

import Link from 'next/link';

const cardSurface = {
  background: 'rgba(0, 0, 0, 0.65)',
  borderColor: 'rgba(255, 255, 255, 0.15)',
};

const STAT_CARDS = [
  {
    value: '1 hour',
    label: 'Act I: setup',
    detail: 'First pass: structure, pages, and layout fell into place fast.',
  },
  {
    value: '1 day',
    label: 'Act II: lost',
    detail: 'Scroll and nav behavior unraveled; models argued with the codebase, not the symptom.',
  },
  {
    value: '1 week',
    label: 'Act III: publish',
    detail: 'Deployment fought back until the pipeline and a single path typo were untangled.',
  },
];

const TOOLS = [
  {
    name: 'Claude Sonnet',
    role: 'Prompt generation',
    note: 'Drafted instructions tuned for a smaller, faster model downstream.',
  },
  {
    name: 'Claude Haiku',
    role: 'VS Code generation',
    note: 'Ran inside the editor on those prompts; most of the scaffold landed here.',
  },
  {
    name: 'Gemini (browser)',
    role: 'Bug diagnosis',
    note: 'Read the public repo from the outside and named conflicts the in-editor model missed.',
  },
  {
    name: 'Cursor Pro',
    role: 'Publish + paths',
    note: 'Full project context in-IDE; fixed the pipeline and the case-sensitive path bug.',
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
        <section className="flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12 md:pt-28 md:pb-16 relative" style={{ minHeight: '42vh' }}>
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
            Building this portfolio with AI
          </h1>
          <div className="mt-8 flex justify-center w-full px-2">
            <ul className="list-disc list-outside space-y-2 text-lg sm:text-xl text-white/90 text-left max-w-2xl leading-relaxed pl-5 sm:pl-6 marker:text-sky-400">
              <li>Fast setup, then a full day lost to interaction and editor bugs.</li>
              <li>A week on deployment and static hosting edge cases.</li>
              <li>Finished when tooling could reason over the whole repo, not just open files.</li>
            </ul>
          </div>
        </section>

        {/* Stat cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STAT_CARDS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border p-6 sm:p-8 backdrop-blur-md"
                style={cardSurface}
              >
                <p className="text-4xl sm:text-5xl font-black text-white mb-2 tabular-nums">{s.value}</p>
                <p className="text-sm font-semibold text-sky-300/95 tracking-wide uppercase">{s.label}</p>
                <p className="mt-4 text-sm text-white/80 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Strategy */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <SectionLabel>The strategy</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">Claude writing for Claude</h2>
          <FrostedPanel>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4">
              Sonnet drafted prompts; those prompts ran in VS Code against Haiku. Same family, different roles. The theory
              was simple: a strong model that knows how weaker siblings respond could steer generation better than one-shot
              prompting cold.
            </p>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              It worked until motion, scroll coupling, and layout state entered the picture. Then the stack stopped being
              “generate a page” and became a system, and the same pairing that shipped static structure could not reliably
              debug the interactions it had stitched together.
            </p>
          </FrostedPanel>
        </section>

        {/* Act 1 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <SectionLabel>Act I: The setup</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">Smooth, then misleadingly complete</h2>
          <p className="text-white/55 text-sm mb-8 italic">About an hour of real time.</p>
          <div className="space-y-5 text-base sm:text-lg text-white/85 leading-relaxed">
            <p>
              The first generation pass felt like cheating in the good way: site structure, routes, and broad layout
              converged quickly. The Claude-to-Claude loop was doing what it advertised: compressing exploration into a
              short burst of coherent files.
            </p>
            <p>
              What read as “done” was really “statically plausible.” No shame in that; it’s the same gap between mock and
              product, just compressed into an afternoon.
            </p>
          </div>
        </section>

        {/* Act 2 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <SectionLabel>Act II: The breaking point</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">Interactions turned the nav into a lottery</h2>
          <p className="text-white/55 text-sm mb-8 italic">A day gone to scroll listeners and competing layers.</p>
          <FrostedPanel className="mb-8">
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4">
              Adding motion and scroll-linked behavior broke assumptions the scaffold never declared. Effects stopped firing
              in the order the model assumed. The navbar’s animation drifted: sometimes half-responsive, sometimes
              fighting the scroll container above it.
            </p>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Claude, pointed at its own output, kept offering local patches that treated symptoms. The model that wrote the
              tangle couldn’t map the dependency graph well enough to unwind it.
            </p>
          </FrostedPanel>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            Gemini in the browser got the public GitHub link and read the repo as an outsider. That perspective (full
            tree, no attachment to the last “fix”) surfaced real conflicts: duplicated listeners, state split across
            effects, scroll targets that weren’t the window. Fixes landed locally. Then publishing exposed the next class of
            problem entirely.
          </p>
        </section>

        {/* Act 3 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <SectionLabel>Act III: The publish wall</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">GitHub Pages and the capital I</h2>
          <p className="text-white/55 text-sm mb-8 italic">Roughly a week before the pipeline held.</p>
          <div className="space-y-5 text-base sm:text-lg text-white/85 leading-relaxed">
            <p>
              The site wouldn’t publish cleanly: images missing, interactions wrong only in the static build,{' '}
              <code className="text-sky-200/90 text-sm px-1.5 py-0.5 rounded bg-white/10">_next/static/</code> assets not
              served the way the dev server implied. Remote models without full build logs and CI context spun in place.
            </p>
            <p>
              Cursor Pro was the first tool in the chain that held the entire project inside the IDE: not a pasted snippet,
              not a single file, not a web view of GitHub. It repaired the publishing configuration and traced assets end
              to end.
            </p>
            <p>
              The root cause for broken images was almost insulting: a folder name used a capital <strong className="text-white">I</strong> where
              imports assumed lowercase. macOS shrugged; Linux on GitHub Pages did not. Under an hour after that surfaced,
              paths lined up.
            </p>
          </div>
        </section>

        {/* The Distinction (callout) */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <SectionLabel>The distinction</SectionLabel>
          <div
            className="rounded-2xl border-l-4 border-sky-400 border border-white/15 pl-6 pr-6 py-8 sm:pl-8 sm:pr-8 backdrop-blur-md"
            style={{ background: 'rgba(10, 25, 40, 0.72)' }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">AI wrote code, not the story</h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4">
              Every case study on this site (research notes, metrics, narrative) comes from real work: reports,
              presentations, and an earlier portfolio. None of that prose was generated by a model.
            </p>
            <p className="text-base text-white/80 leading-relaxed">
              That’s the opposite of the usual “AI portfolio” pattern, where the writing is synthetic and the projects are
              thin. Here the risk was inverted: let tools handle the boring mechanics of layout and deployment; keep
              authorship of what actually matters.
            </p>
          </div>
        </section>

        {/* Tools timeline */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <SectionLabel>Tools used</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 leading-tight">How the stack shifted over time</h2>
          <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0">
            {TOOLS.map((tool, i) => (
              <div key={tool.name} className="flex flex-col md:flex-row md:items-stretch flex-1 min-w-0">
                <div
                  className="rounded-2xl border p-5 sm:p-6 backdrop-blur-md flex-1 flex flex-col"
                  style={cardSurface}
                >
                  <p className="text-xs font-semibold tracking-widest text-sky-400/90 uppercase mb-2">Step {i + 1}</p>
                  <p className="text-lg font-bold text-white mb-1">{tool.name}</p>
                  <p className="text-sm font-medium text-white/70 mb-3">{tool.role}</p>
                  <p className="text-sm text-white/80 leading-relaxed flex-1">{tool.note}</p>
                </div>
                {i < TOOLS.length - 1 && (
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
          <p className="mt-8 text-sm text-white/55 md:hidden text-center">Sonnet → Haiku → Gemini → Cursor, same order as above.</p>
        </section>

        {/* Reflection */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-[max(7rem,env(safe-area-inset-bottom))]">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">What this says about AI-assisted building</h2>
          <FrostedPanel>
            <ul className="space-y-4 text-base sm:text-lg text-white/88 leading-relaxed list-disc pl-5 marker:text-sky-500/80">
              <li>
                Speed at the start doesn’t predict stability at the end, especially when scroll, animation, and routing
                share implicit contracts the model never wrote down.
              </li>
              <li>
                An outside view of the repo beat an inside model that was over-fitted to its last edit, until tooling could
                load the whole graph in one place.
              </li>
              <li>
                Deployment bugs look like “AI failures” but are often environment law: case sensitivity, base paths, and
                static hosts exposing what your laptop forgave.
              </li>
              <li>
                The useful split isn’t “use AI / don’t use AI.” It’s which parts stay human-owned. Here, content stayed
                human; the rest was fair game to automate and debug.
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
          </FrostedPanel>
        </section>
      </div>
    </main>
  );
}
