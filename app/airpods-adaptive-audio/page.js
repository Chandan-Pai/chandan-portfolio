'use client';

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

/** Encode each path segment so filenames with spaces (e.g. `Airpod Hero.png`) work on GitHub Pages. */
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
const asset = (rel) => publicAssetUrl(BASE_PATH, rel);

/** Actual filenames in `public/images/airpods-case-study/` — spaces and capitalization preserved. */
const IMG = {
  hero: asset('images/airpods-case-study/Airpod Hero.png'),
  sound: asset('images/airpods-case-study/sound wave visualization.png'),
  library: asset('images/airpods-case-study/Library.png'),
  busyRoad: asset('images/airpods-case-study/BUsy road.png'),
  bus: asset('images/airpods-case-study/Bus.png'),
  iphoneUI: asset('images/airpods-case-study/Iphone UI Concept.png'),
};

const EASE = [0.25, 0.46, 0.45, 0.94];
const IN_VIEW = { once: true, amount: 0.3 };

// ────────────────────────────────────────────────────────────────────────────
// Shared section primitives
// ────────────────────────────────────────────────────────────────────────────

function BackLink() {
  return (
    <div
      className="fixed z-50 left-4 sm:left-6"
      style={{ top: 'max(1rem, env(safe-area-inset-top, 0px))' }}
    >
      <Link
        href="/"
        aria-label="Back to portfolio"
        data-no-cursor-hover
        className="inline-flex items-center gap-2 sm:gap-3 rounded-full px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-lg border border-white/20 text-slate-300 hover:text-white hover:bg-white/20 transition-all"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline text-sm font-semibold">Back to Portfolio</span>
      </Link>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ────────────────────────────────────────────────────────────────────────────

function Section1Hero({ fadeUp, prefersReduced }) {
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 240], [1, 0]);

  const heroStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">
      <img
        src={IMG.sound}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen pointer-events-none"
        draggable={false}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStagger}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs tracking-widest text-violet-400 uppercase"
        >
          Human Factors Research
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-8xl font-black text-white mt-6 leading-[1.05]"
        >
          When AI Goes Silent
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Mental models and diagnostic strategies in AirPods Pro Adaptive Audio
        </motion.p>

        <motion.img
          src={IMG.hero}
          alt="AirPods Pro adaptive-audio research illustration"
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="w-full max-w-2xl mx-auto max-h-[55vh] object-contain mt-12"
          draggable={false}
        />

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {[
            'n=2 CDM interviews',
            '3 environments',
            '5 themes from 23 codes',
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300"
            >
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: indicatorOpacity }}
        animate={prefersReduced ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-2xl select-none"
      >
        ↓
      </motion.div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 2 — THE PROBLEM
// ────────────────────────────────────────────────────────────────────────────

function Section2Problem({ prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [40, -40]);

  const lineStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const line = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section ref={sectionRef} className="bg-black border-t border-slate-900 py-32 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineStagger}
        >
          <motion.p
            variants={line}
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
          >
            The system was working correctly.
          </motion.p>
          <motion.p
            variants={line}
            className="text-3xl md:text-4xl font-bold text-violet-400 leading-tight mt-6"
          >
            Users thought it was broken.
          </motion.p>
          <motion.p variants={line} className="text-xl text-slate-400 mt-10">
            That&apos;s not a usability problem.
          </motion.p>
          <motion.p variants={line} className="text-xl text-slate-400">
            That&apos;s a transparency design problem.
          </motion.p>
        </motion.div>

        <motion.img
          src={IMG.hero}
          alt="AirPod Pro hero"
          style={{ y: parallaxY }}
          className="w-full max-w-sm mx-auto object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 3 — METHOD RATIONALE
// ────────────────────────────────────────────────────────────────────────────

function Section3Method({ fadeUp, prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const slideLeft = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  };
  const slideRight = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section ref={sectionRef} className="bg-neutral-950 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-4xl font-bold text-white text-center mb-16"
        >
          How We Studied Invisible Behavior
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={slideLeft}
            className="glass-placard p-8 rounded-3xl"
          >
            <p className="text-5xl font-black text-violet-400 mb-4">CDM</p>
            <p className="text-xl font-bold text-white mb-3">Critical Decision Method</p>
            <p className="text-slate-400 leading-relaxed">
              CDM surfaces tacit diagnostic knowledge — the reasoning people use that they
              cannot easily articulate. Standard think-aloud misses this entirely.
            </p>
            <p className="text-xs text-slate-600 mt-4">Klein et al., 1989</p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={slideRight}
            className="glass-placard p-8 rounded-3xl"
          >
            <p className="text-5xl font-black text-blue-400 mb-4">3 ENV</p>
            <p className="text-xl font-bold text-white mb-3">Contextual Think-Aloud</p>
            <p className="text-slate-400 leading-relaxed">
              Adaptive Audio behavior is environment-dependent. A lab would strip the exact
              context driving the behavior. We tested across 3 real environments.
            </p>
            <p className="text-xs text-slate-600 mt-4">Suchman, 1987</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 4 — THREE ENVIRONMENTS
// ────────────────────────────────────────────────────────────────────────────

const ENVIRONMENT_CARDS = [
  {
    img: IMG.library,
    tag: 'Quiet · Lind Hall',
    title: 'No transitions detected',
    observation:
      'User 1 could not perceive any mode changes. Adaptive Audio felt identical to Transparency.',
    quote: 'I didn\u2019t feel the moment it changed.',
    attribution: '— User 1',
  },
  {
    img: IMG.busyRoad,
    tag: 'High Noise · Washington Ave',
    title: 'Suppression without awareness',
    observation:
      'Background noise was blocked but users still couldn\u2019t identify when or why Adaptive activated.',
    quote: 'Adaptive is blocking the background but I still don\u2019t know when it changes.',
    attribution: '— User 1',
  },
  {
    img: IMG.bus,
    tag: 'Transit · Bus Scenario',
    title: 'Communication breakdown',
    observation:
      'Bus heater triggered constant mode switching. The other person on the call could not hear User 2.',
    quote: 'The heater makes it switch constantly and the person can\u2019t hear me.',
    attribution: '— User 2',
  },
];

function Section4Environments({ fadeUp, prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const grid = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const card = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section ref={sectionRef} className="bg-black py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-4xl font-bold text-white text-center mb-4"
        >
          Three Environments. One Invisible System.
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-slate-400 text-center mb-16"
        >
          Same feature. Completely different behavior.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={grid}
          className="grid md:grid-cols-3 gap-6"
        >
          {ENVIRONMENT_CARDS.map((c) => (
            <motion.article
              key={c.tag}
              variants={card}
              className="rounded-2xl overflow-hidden border border-slate-800 bg-neutral-950"
            >
              <img
                src={c.img}
                alt={c.title}
                className="h-48 w-full object-cover"
                draggable={false}
              />
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">{c.tag}</p>
                <h3 className="text-lg font-bold text-white mb-3">{c.title}</h3>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{c.observation}</p>
                <blockquote className="italic text-sm text-slate-300 border-l-2 border-violet-500 pl-3">
                  &ldquo;{c.quote}&rdquo;
                  <span className="block text-slate-500 not-italic text-xs mt-1">{c.attribution}</span>
                </blockquote>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 5 — MENTAL MODEL MATRIX
// ────────────────────────────────────────────────────────────────────────────

const MATRIX_ROWS = [
  ['Trigger', '"Activates when loud"', 'Continuous real-time adjustment', 'Binary vs continuous expectation'],
  ['Transitions', '"Audible click or shift"', 'Gradual, imperceptible', 'Users miss transitions entirely'],
  ['Mode discrimination', '"Adaptive = clearer Transparency"', 'Distinct algorithms', 'Cannot discriminate between modes'],
  ['Manual override', '"Switching disables Adaptive"', 'Adaptive stays active', 'False sense of manual control'],
  ['Conversation Awareness', '"Always activates for speech"', 'Specific vocal frequencies only', 'Perceived as unreliable'],
];

function Section5Matrix({ fadeUp, prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const tableStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const row = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section ref={sectionRef} className="bg-neutral-950 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-4xl font-bold text-white mb-4"
        >
          What Users Believed vs. Reality
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-slate-400 mb-12"
        >
          Five consistent gaps between mental model and system function
        </motion.p>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <motion.table
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={tableStagger}
            className="w-full min-w-[640px] border-collapse"
          >
            <thead>
              <tr className="bg-slate-800">
                {['Aspect', 'User Belief', 'Actual Function', 'Gap'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs uppercase tracking-widest text-slate-400 p-4 font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map(([aspect, belief, fn, gap]) => (
                <motion.tr key={aspect} variants={row} className="border-b border-slate-800">
                  <td className="text-sm text-slate-200 font-semibold p-4 align-top">{aspect}</td>
                  <td className="text-sm text-slate-300 p-4 align-top">{belief}</td>
                  <td className="text-sm text-slate-300 p-4 align-top">{fn}</td>
                  <td className="text-sm text-amber-400 font-medium p-4 align-top">{gap}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        <motion.blockquote
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="border-l-4 border-violet-500 pl-6 mt-8"
        >
          <p className="text-xl italic text-white">&ldquo;I didn&rsquo;t feel the moment it changed.&rdquo;</p>
          <p className="text-slate-500 text-sm mt-2 not-italic">&mdash; User 1</p>
        </motion.blockquote>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 6 — DIAGNOSTIC HEURISTICS
// ────────────────────────────────────────────────────────────────────────────

const HEURISTIC_CARDS = [
  {
    symptom: 'Sound becomes muffled',
    action: 'Switch modes repeatedly',
    assumption: 'A software reset will restore behavior',
  },
  {
    symptom: 'Unsure which mode is active',
    action: 'Remove one AirPod and reinsert',
    assumption: 'Physical removal resets mode state',
  },
  {
    symptom: 'Adaptive and Transparency sound identical',
    action: 'Move to louder environment to compare',
    assumption: 'Contrast reveals functional differences',
  },
  {
    symptom: 'Conversation Awareness fails',
    action: 'Play music and speak loudly',
    assumption: 'Feature needs volume threshold',
  },
  {
    symptom: 'Mic prioritizes ambient noise',
    action: 'Reposition AirPod or move location',
    assumption: 'Fit affects microphone pickup pattern',
  },
];

function Section6Heuristics({ fadeUp, prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const grid = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const card = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section ref={sectionRef} className="bg-black py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-4xl font-bold text-white text-center mb-2"
        >
          The Workarounds Users Invented
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-2xl font-bold text-amber-400 text-center mb-16"
        >
          Effective. But causally wrong.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={grid}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {HEURISTIC_CARDS.map((h, i) => {
            const isLast = i === HEURISTIC_CARDS.length - 1;
            return (
              <motion.div
                key={h.symptom}
                variants={card}
                className={`glass-placard p-6 rounded-2xl${
                  isLast ? ' md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto md:w-full' : ''
                }`}
              >
                <p className="text-xs text-rose-400 uppercase tracking-widest">If</p>
                <p className="text-lg font-bold text-white mt-1 mb-4">{h.symptom}</p>
                <p className="text-xs text-blue-400 uppercase tracking-widest">Then</p>
                <p className="text-base text-slate-300 mb-4">{h.action}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Assumption</p>
                <p className="text-sm text-slate-500 italic">{h.assumption}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="border-l-4 border-amber-500 bg-amber-950/30 rounded-r-2xl p-6 mt-12 max-w-4xl mx-auto"
        >
          <p className="text-amber-200 leading-relaxed">
            User 2 developed a reliable diagnostic: removing one AirPod to &ldquo;reset&rdquo; mode
            state. It worked every time. The causal assumption was completely wrong. The system
            hadn&rsquo;t changed. The user&rsquo;s perception had.
          </p>
        </motion.div>

        <motion.blockquote
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="border-l-4 border-violet-500 pl-6 mt-8 max-w-4xl mx-auto"
        >
          <p className="text-xl italic text-white">
            &ldquo;If I remove one AirPod, I know what mode I&rsquo;m in.&rdquo;
          </p>
          <p className="text-slate-500 text-sm mt-2 not-italic">&mdash; User 2</p>
        </motion.blockquote>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 7 — DECISION LADDER
// ────────────────────────────────────────────────────────────────────────────

const LADDER_ROWS = [
  {
    stage: 'Activation',
    user1: '"It sounds clearer, did something change?"',
    user2: '"That delay is annoying, it changed again"',
  },
  {
    stage: 'Observation',
    user1: 'Voice echo, background noise present/absent',
    user2: 'Wind, static, speech cutoff, mic noise',
  },
  {
    stage: 'Identification',
    skipped: true,
    user1: 'Assumes Adaptive = Transparency variant',
    user2: 'Attributes delays to software lag',
  },
  {
    stage: 'Evaluation',
    user1: 'Switches modes to compare',
    user2: 'Removes AirPod, tests with loud cues',
  },
  {
    stage: 'Task Definition',
    user1: '"I want consistent, predictable audio"',
    user2: '"I want manual control — Adaptive is unreliable"',
  },
];

function Section7Ladder({ fadeUp, prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const grid = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const row = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section ref={sectionRef} className="bg-neutral-950 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-4xl font-bold text-white mb-4"
        >
          Where Users Skipped The Critical Step
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-slate-400 mb-12"
        >
          Rasmussen&rsquo;s Decision Ladder mapped across both users
        </motion.p>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={grid}
          className="space-y-1"
        >
          {LADDER_ROWS.map((r) => (
            <motion.div
              key={r.stage}
              variants={row}
              className={
                r.skipped
                  ? 'bg-amber-950/40 border border-amber-800/50 rounded-xl px-4 py-5 grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1.5fr] gap-y-3 gap-x-6 items-start'
                  : 'border-b border-slate-800 py-5 grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1.5fr] gap-y-3 gap-x-6 items-start'
              }
            >
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                  {r.stage}
                </span>
                {r.skipped ? (
                  <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    Skipped by both
                  </span>
                ) : null}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-1 md:hidden">User 1</p>
                <p className="text-sm text-slate-300 leading-relaxed">{r.user1}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-1 md:hidden">User 2</p>
                <p className="text-sm text-slate-300 leading-relaxed">{r.user2}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="border-l-4 border-slate-600 pl-6 mt-10"
        >
          <p className="text-slate-400 italic leading-relaxed">
            Without feedback about what the system is doing or why, users cannot form accurate
            mental models — and fall back on trial-and-error strategies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 8 — DESIGN RECOMMENDATIONS
// ────────────────────────────────────────────────────────────────────────────

function Section8Recommendations({ fadeUp, prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const grid = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const card = {
    hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <section ref={sectionRef} className="bg-black py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-4xl font-bold text-white text-center mb-16"
        >
          Three Evidence-Based Recommendations
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={grid}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={card} className="glass-placard p-8 rounded-3xl flex flex-col">
            <p className="text-5xl font-black text-violet-400/30 mb-4">01</p>
            <p className="text-xl font-bold text-white mb-3">Haptic transition feedback</p>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              A brief pulse when Adaptive Audio shifts intensity. Addresses the SA Level 1
              breakdown — users need to perceive the change before they can understand it.
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Evidence</p>
            <blockquote className="text-sm italic text-slate-300 border-l-2 border-violet-500 pl-3 mt-auto">
              &ldquo;I didn&rsquo;t feel the moment it changed.&rdquo;
              <span className="block text-slate-500 not-italic text-xs mt-1">&mdash; User 1</span>
            </blockquote>
          </motion.div>

          <motion.div variants={card} className="glass-placard p-8 rounded-3xl flex flex-col">
            <p className="text-5xl font-black text-violet-400/30 mb-4">02</p>
            <p className="text-xl font-bold text-white mb-3">Persistent mode indicator</p>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Show current ANC/Transparency state in Control Center. Replaces trial-and-error with
              direct perception of system state.
            </p>
            <img
              src={IMG.iphoneUI}
              alt="Concept: persistent mode indicator in Control Center"
              className="w-full rounded-xl mt-2 mb-6 object-cover"
              draggable={false}
            />
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Evidence</p>
            <blockquote className="text-sm italic text-slate-300 border-l-2 border-violet-500 pl-3 mt-auto">
              &ldquo;Removing the AirPod is the only way I know what mode I&rsquo;m in.&rdquo;
              <span className="block text-slate-500 not-italic text-xs mt-1">&mdash; User 2</span>
            </blockquote>
          </motion.div>

          <motion.div variants={card} className="glass-placard p-8 rounded-3xl flex flex-col">
            <p className="text-5xl font-black text-violet-400/30 mb-4">03</p>
            <p className="text-xl font-bold text-white mb-3">User-configurable sensitivity</p>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              A preference slider biasing Adaptive toward cancellation or transparency. Both user
              types get meaningful control without losing automation benefit.
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Evidence</p>
            <blockquote className="text-sm italic text-slate-300 border-l-2 border-violet-500 pl-3 mt-auto">
              &ldquo;I prefer noise cancellation — it&rsquo;s more predictable.&rdquo;
              <span className="block text-slate-500 not-italic text-xs mt-1">&mdash; User 2</span>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 9 — BROADER IMPLICATION
// ────────────────────────────────────────────────────────────────────────────

function Section9Implication({ prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const lineAt = (delay) => ({
    hidden: { opacity: 0, y: prefersReduced ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: EASE, delay },
    },
  });

  return (
    <section ref={sectionRef} className="bg-black py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(0)}
          className="text-2xl text-slate-400 leading-relaxed"
        >
          Adaptive Audio is one instance of a broader problem.
        </motion.p>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(0.3)}
          className="text-2xl text-slate-400 leading-relaxed mt-6"
        >
          Invisible AI systems that adjust behavior continuously without surfacing their state to
          the user.
        </motion.p>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(0.6)}
          className="text-2xl text-slate-400 leading-relaxed mt-6"
        >
          The cognitive demands scale with opacity.
        </motion.p>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(0.9)}
          className="text-4xl font-bold text-violet-400 mt-10"
        >
          Transparency isn&rsquo;t a feature.
        </motion.p>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(1.1)}
          className="text-4xl font-bold text-white mt-4 leading-tight"
        >
          It&rsquo;s what determines whether users trust automation at all.
        </motion.p>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 10 — LIMITATIONS
// ────────────────────────────────────────────────────────────────────────────

const LIMITATIONS = [
  'n=2 restricts generalizability. CDM is not designed for statistical inference — it surfaces cognitive strategies invisible to shallow methods. Depth over breadth was intentional.',
  'Both participants were university students (ages 22–25). Demographic diversity was limited.',
  'Environmental conditions varied between participants due to real-world constraints, not controlled settings.',
  'One negative case: User 1 did not express frustration, complicating early assumptions about universal trust breakdown.',
];

function Section10Limitations({ fadeUp }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  return (
    <section ref={sectionRef} className="bg-neutral-950 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-3xl font-bold text-white mb-8"
        >
          Research Limitations
        </motion.h2>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="border border-amber-800/50 bg-amber-950/20 rounded-2xl p-8"
        >
          <ul className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
            {LIMITATIONS.map((l) => (
              <li key={l} className="flex gap-3">
                <span className="text-amber-400 select-none" aria-hidden="true">•</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SECTION 11 — REFLECTION
// ────────────────────────────────────────────────────────────────────────────

function Section11Reflection({ prefersReduced }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, IN_VIEW);

  const lineAt = (delay) => ({
    hidden: { opacity: 0, y: prefersReduced ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: EASE, delay },
    },
  });

  return (
    <section ref={sectionRef} className="bg-black py-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(0)}
          className="text-2xl text-slate-400"
        >
          The most surprising finding wasn&rsquo;t a breakdown.
        </motion.p>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(0.25)}
          className="text-2xl text-white font-bold mt-4"
        >
          It was that User 2&rsquo;s workaround actually worked.
        </motion.p>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(0.5)}
          className="text-lg text-slate-400 mt-8 leading-relaxed"
        >
          Removing an AirPod to reset mode state is causally wrong but behaviorally effective.
        </motion.p>

        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(0.85)}
          className="text-2xl text-white mt-12 leading-relaxed"
        >
          When users can&rsquo;t understand a system, they invent explanations that are good enough
          to function — and stop asking questions.
        </motion.p>
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={lineAt(1.1)}
          className="text-2xl font-bold text-violet-400 mt-4"
        >
          The system gets credit for reliability it didn&rsquo;t earn.
        </motion.p>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// FOOTER NAV
// ────────────────────────────────────────────────────────────────────────────

function FooterNav() {
  return (
    <footer className="w-full border-t border-slate-700 py-12 bg-black">
      <div className="project-gutter-x w-full min-w-0 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/mercedes-service-manual"
          className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline transition"
        >
          ← Interactive Repair Guidance
        </Link>
        <Link
          href="/user-engagement-analysis"
          className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline transition"
        >
          User Engagement Analysis →
        </Link>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────────────────

export default function AirpodsAdaptiveAudioPage() {
  const prefersReduced = useReducedMotion();
  const fadeUp = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <main className="min-h-screen bg-black text-slate-100 antialiased">
      <BackLink />
      <Section1Hero fadeUp={fadeUp} stagger={stagger} prefersReduced={prefersReduced} />
      <Section2Problem prefersReduced={prefersReduced} />
      <Section3Method fadeUp={fadeUp} prefersReduced={prefersReduced} />
      <Section4Environments fadeUp={fadeUp} prefersReduced={prefersReduced} />
      <Section5Matrix fadeUp={fadeUp} prefersReduced={prefersReduced} />
      <Section6Heuristics fadeUp={fadeUp} prefersReduced={prefersReduced} />
      <Section7Ladder fadeUp={fadeUp} prefersReduced={prefersReduced} />
      <Section8Recommendations fadeUp={fadeUp} prefersReduced={prefersReduced} />
      <Section9Implication prefersReduced={prefersReduced} />
      <Section10Limitations fadeUp={fadeUp} />
      <Section11Reflection prefersReduced={prefersReduced} />
      <FooterNav />
    </main>
  );
}
