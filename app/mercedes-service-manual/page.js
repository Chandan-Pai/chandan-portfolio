'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ExpandableImage from '../components/ExpandableImage';
import { MotionHero, MotionSection, MotionBlock, FadeUp, FadeUpScale, MotionGrid } from '../components/MotionCaseStudy';

export default function MercedesServiceManualPage() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [isDarkSection, setIsDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsDarkSection(window.scrollY < 640);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-slate-100 antialiased">

      <div className="min-h-screen bg-neutral-950 text-slate-100">
        {/* Back Button */}
        <div
          className="fixed z-50 left-4 sm:left-6"
          style={{ top: 'max(1rem, env(safe-area-inset-top, 0px))' }}
        >
          <Link
            href="/"
            aria-label="Back to portfolio"
            data-no-cursor-hover
            className={`inline-flex items-center gap-2 sm:gap-3 rounded-full px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/30 transition-all ${
              isDarkSection ? 'text-white' : 'text-slate-100'
            }`}
          >
            <svg
              className={`w-4 h-4 shrink-0 text-white`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M15 18L9 12L15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`hidden sm:inline text-sm font-semibold text-white`}>
              Back to Portfolio
            </span>
          </Link>
        </div>

        <header className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white pt-[max(5.5rem,env(safe-area-inset-top)+3rem)] pb-16 sm:pb-20 md:pt-32 md:pb-24">
          <MotionHero className="project-gutter-x w-full min-w-0">
            <FadeUp as="p" className="text-xs font-mono tracking-widest text-sky-400 uppercase mb-4">
              HUMF 5874: Human Centered Design
            </FadeUp>
            <FadeUp as="h1" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Interactive Repair Guidance
            </FadeUp>
            <FadeUp as="ul" className="list-disc list-outside space-y-2.5 text-gray-200 text-base sm:text-lg leading-snug mb-6 pl-5 sm:pl-6 marker:text-sky-400 max-w-3xl">
              <li>Product research and participatory design for clearer, safer assembly manuals.</li>
              <li>From field observation (AEIOU) through a validated QR-based prototype (usability testing, n=4).</li>
            </FadeUp>
            <FadeUp className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-6">
              <span>
                <span className="font-semibold text-white">Role:</span> Product Researcher
              </span>
              <span>
                <span className="font-semibold text-white">Methods:</span> AEIOU · Participatory design · Usability testing
              </span>
              <span>
                <span className="font-semibold text-white">Output:</span> QR-based app prototype · n=4 validated
              </span>
            </FadeUp>
            <FadeUp as="p" className="mt-4 text-sm italic text-slate-400 leading-relaxed max-w-3xl">
              <span className="font-semibold not-italic text-slate-300">My Role:</span>{' '}
              Solo end-to-end. I defined the research questions, designed the study, recruited participants, ran all sessions, analyzed findings, and built the prototype. Every methodological decision was mine.
            </FadeUp>
          </MotionHero>
        </header>

      {/* OPENING STORY */}
      <MotionSection className="project-gutter-x w-full min-w-0 py-20">
        <FadeUp as="p" className="text-lg sm:text-2xl leading-relaxed text-slate-300 mb-6">
          A technician flips through a 200-page repair manual searching for a wiring diagram buried in Section 7. Oil stains smudge the pages. A critical safety warning sits in 8-point font at the bottom of page 143.
        </FadeUp>
        <FadeUp as="p" className="text-lg sm:text-2xl leading-relaxed text-slate-300 mb-6">
          Meanwhile, a first-time assembler stares at an instruction sheet, unable to tell which screw goes where because everything is drawn from the same angle.
        </FadeUp>
        <FadeUp as="p" className="text-lg sm:text-2xl font-semibold text-slate-100">
          Both failures share one root cause: manuals are designed for documentation, not for use.
        </FadeUp>
      </MotionSection>

      {/* DOUBLE DIAMOND PROCESS */}
      <MotionSection className="w-full bg-slate-900/50 border-y border-slate-700 py-16">
        <div className="project-gutter-x w-full min-w-0">
          <FadeUp as="p" className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-8">Process</FadeUp>
          <FadeUp as="h2" className="text-3xl font-bold mb-12">Double Diamond</FadeUp>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-0 relative">
            {[
              {
                phase: 'DISCOVER',
                label: '01',
                color: 'border-sky-800',
                accent: 'text-sky-300',
                items: ['Personal story: why manuals fail', 'AEIOU field observation', 'Stakeholder interviews', 'Qualtrics survey (18-34 yr olds)'],
              },
              {
                phase: 'DEFINE',
                label: '02',
                color: 'border-slate-600',
                accent: 'text-slate-200',
                items: ['Journey map (current vs ideal state)', 'Two personas identified', 'Core pain points clustered', 'Problem statement formalized'],
              },
              {
                phase: 'DEVELOP',
                label: '03',
                color: 'border-slate-600',
                accent: 'text-slate-200',
                items: ['Participatory design sessions', 'Pig drawing test (key insight)', 'Two prototype concepts', 'QR-scan app selected'],
              },
              {
                phase: 'DELIVER',
                label: '04',
                color: 'border-cyan-800',
                accent: 'text-cyan-300',
                items: ['Wireframe prototype built', 'Usability testing n=4', 'Think-aloud protocol', 'Iterated on findings'],
              },
            ].map((d, i) => (
              <FadeUp
                key={i}
                className={`glass-placard border ${d.color} p-5 sm:p-6 rounded-xl xl:rounded-none ${i === 0 ? 'xl:rounded-l-xl' : ''} ${i === 3 ? 'xl:rounded-r-xl' : ''}`}
              >
                <p className={`text-xs font-mono font-bold tracking-widest uppercase mb-1 ${d.accent}`}>{d.label}</p>
                <p className="text-sm font-bold text-slate-100 mb-4">{d.phase}</p>
                <ul className="space-y-2">
                  {d.items.map((item, j) => (
                    <li key={j} className="text-xs text-slate-400 flex gap-2">
                      <span className={`${d.accent} mt-0.5`}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </MotionGrid>
        </div>
      </MotionSection>

      {/* PROBLEM: stat cards instead of images */}
      <MotionSection className="project-gutter-x w-full min-w-0 py-20">
        <FadeUp as="p" className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Discover</FadeUp>
        <FadeUp as="h2" className="text-2xl sm:text-4xl font-bold mb-4">Why Repair Manuals Fail Users</FadeUp>
        <FadeUp as="p" className="text-lg text-slate-400 mb-12">
          Repair and assembly manuals are safety-critical documents. Yet they're designed like legal contracts: dense text, unclear visuals, buried warnings. When users can't follow them, they turn to YouTube.
        </FadeUp>

        <MotionGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { title: "Safety Warnings Overlooked", desc: "Small text, inconsistent placement, no visual hierarchy", icon: "⚠" },
            { title: "Technical Jargon Barriers", desc: "Language assumes expert knowledge, excludes beginners", icon: "📖" },
            { title: "2D Diagrams Fail Spatial Tasks", desc: "Users can't visualize 3D assembly from flat drawings", icon: "📐" },
            { title: "No Learning Flexibility", desc: "Text-only format doesn't support different comprehension styles", icon: "🎯" },
          ].map((pain, idx) => (
            <FadeUp key={idx} className="glass-placard p-6 rounded-xl text-white">
              <p className="text-3xl mb-4">{pain.icon}</p>
              <h3 className="font-semibold text-sm mb-2">{pain.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{pain.desc}</p>
            </FadeUp>
          ))}
        </MotionGrid>

        {/* Two personas as text cards */}
        <MotionGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              type: 'Persona 1',
              name: 'First-Time Assembler',
              age: '22, Student',
              pains: ['Confusing images cause frustration', 'No clear safety warnings → minor injuries', 'Struggles with part alignment', 'Relies on YouTube when manual fails'],
              color: 'border-sky-500',
            },
            {
              type: 'Persona 2',
              name: 'Part-Time Technician',
              age: '34, Independent Repair',
              pains: ['Different manual formats = inconsistent experience', 'Wiring diagrams hard to interpret', 'No troubleshooting guidance', 'No multilingual support'],
              color: 'border-slate-400',
            },
          ].map((p, i) => (
            <FadeUp key={i} className={`glass-placard border-l-4 ${p.color} pl-4 sm:pl-6 py-4 rounded-r-lg`}>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">{p.type}</p>
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{p.age}</p>
              <ul className="space-y-2">
                {p.pains.map((pain, j) => (
                  <li key={j} className="text-sm text-slate-400 flex gap-2">
                    <span className="text-slate-400 mt-0.5 flex-shrink-0">✗</span>
                    {pain}
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </MotionGrid>
        {/*
          Side-by-side with an asymmetric 2:1 ratio. The AEIOU diagram is a
          single wide composition (legend left + Venn right) so it needs the
          horizontal real estate; the Observation Sheet PNG is a tall
          single-column document and stays readable at the narrower size.
          `items-start` aligns the top edges so the wider AEIOU isn't dragged
          down by the taller observation sheet underneath it. Click-to-expand
          (lightbox) still works on either image.
        */}
        <MotionGrid className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          <FadeUp className="sm:col-span-2">
            <ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/AEIOU Field observations.png`}
              alt="AEIOU Field Observation"
            />
          </FadeUp>
          <FadeUp className="sm:col-span-1">
            <ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/Observation sheets.png`}
              alt="Observation sheets"
            />
          </FadeUp>
        </MotionGrid>
        
      </MotionSection>

      {/* DEFINE: Journey Map */}
      <MotionSection className="w-full bg-slate-900/50 border-y border-slate-700 py-20" stagger={0.1}>
        <div className="project-gutter-x w-full min-w-0">
          <FadeUp as="p" className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Define</FadeUp>
          <FadeUp as="h2" className="text-2xl sm:text-4xl font-bold mb-12">Journey Map: Current vs Ideal State</FadeUp>

          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 pr-6 text-slate-400 font-mono text-xs uppercase tracking-widest w-32">Phase</th>
                  <th className="text-left py-3 pr-6 text-slate-300 font-semibold">Current State ✗</th>
                  <th className="text-left py-3 text-sky-300 font-semibold">Ideal State ✓</th>
                </tr>
              </thead>
              <MotionGrid as="tbody" className="divide-y divide-slate-200" stagger={0.1}>
                {[
                  {
                    phase: 'Morning Setup',
                    current: 'Unorganized tools, long setup time, unclear starting point',
                    ideal: 'Visual checklist, color-coded tool storage, clear workspace setup',
                  },
                  {
                    phase: 'Diagnosis',
                    current: 'Hard-to-understand manuals, hidden faults, no guidance',
                    ideal: 'Step-by-step visual guides, QR code for troubleshooting, color-coded diagrams',
                  },
                  {
                    phase: 'Repair & Assembly',
                    current: 'Fragile tools, missing spare parts, confusing 2D diagrams',
                    ideal: 'Durable ergonomic tools, labeled parts, multi-angle visuals',
                  },
                  {
                    phase: 'Final Check',
                    current: 'Unclear final testing instructions, no pass/fail criteria',
                    ideal: 'Visual checklist, clear pass/fail criteria, completion confirmation',
                  },
                ].map((row, i) => (
                  <FadeUp as="tr" key={i}>
                    <td className="py-4 pr-6 font-semibold text-slate-100 align-top">{row.phase}</td>
                    <td className="py-4 pr-6 text-slate-400 align-top">{row.current}</td>
                    <td className="py-4 text-slate-300 align-top">{row.ideal}</td>
                  </FadeUp>
                ))}
              </MotionGrid>
            </table>
          </div>
          <MotionGrid className="mt-8 space-y-6">
            <FadeUp>
              <ExpandableImage
                className="my-0"
                src={`${BASE_PATH}/images/Repair manual/Journey Map.png`}
                alt="Journey Map"
              />
            </FadeUp>
            <FadeUp>
              <ExpandableImage
                className="my-0"
                src={`${BASE_PATH}/images/Repair manual/Affinity Diagraming.png`}
                alt="Affinity Diagram"
              />
            </FadeUp>
          </MotionGrid>
        </div>
      </MotionSection>

      {/* THE PIG DRAWING TEST (hero moment) */}
      <MotionSection className="project-gutter-x w-full min-w-0 py-20">
        <FadeUp as="p" className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Develop: Key Insight</FadeUp>
        <FadeUp as="h2" className="text-2xl sm:text-4xl font-bold mb-8">The Pig Drawing Test</FadeUp>

        {/* Narrative text */}
        <FadeUp className="mb-12">
          <p className="text-lg leading-relaxed text-slate-300 mb-6">
            We gave participants two different sets of instructions: one text-only, one with visuals. Both described drawing a pig.
          </p>
          <p className="text-lg leading-relaxed text-slate-300">
            The results were stark. Text-only instructions produced chaotic, unrecognizable drawings. Visual-guided steps produced consistent, recognizable results.
          </p>
        </FadeUp>



        {/* How it should be drawn - reference image */}
        <FadeUp className="mb-12">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Reference: How the pig should look</h3>
          <ExpandableImage
            className="my-0 max-w-2xl"
            src={`${BASE_PATH}/images/Repair manual/pig drawing reference.png`}
            alt="Correct pig drawing reference"
            caption={<p className="text-xs font-semibold text-sky-200">Target outcome with visual guidance</p>}
            captionClassName="bg-sky-950/50 p-3 border-t border-sky-800"
          />
        </FadeUp>

        {/* The actual pig drawing instructions */}
        <FadeUp className="glass-placard rounded-xl p-4 sm:p-8 mb-8">
          <p className="text-sm font-semibold text-slate-300 mb-4">The actual instructions participants received (text-only condition):</p>
          <ol className="space-y-2 text-sm text-slate-400 list-decimal list-inside">
            {[
              'Divide the drawing area into 9 sections (NW, N, NE, W, Center, E, SW, S, SE)',
              'Draw a capital "M" at the intersection of North, Center, NW, and West sections',
              'Draw a curved line from one end of the "M" to the intersection of South and SE sections',
              'Draw a capital "W" at the intersection of South, SE, East, and Center sections',
              'Draw another "W" on the South, SW, West, and Center sections',
              'Join the two "W"s with a curved line',
              'From the ends of both "W" and "M," draw curves as the pig\'s nose',
              'Draw an ellipse joining the curves',
              'Draw two circles as nostrils inside the ellipse',
              'Draw a sideways "9" for the eyes',
              'Draw an elongated "R" in the East section for the pig\'s tail',
            ].map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="text-sm text-slate-300 font-semibold mt-4">→ Result: Every participant produced a different, unrecognizable drawing.</p>
        </FadeUp>

        {/* Images - horizontal layout */}
        <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <FadeUp>
            <ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/Pig drawing test text.jpg`}
              alt="Text-only pig instructions"
              caption={<p className="text-xs font-semibold text-slate-200">Text-only instructions: chaotic results</p>}
              captionClassName="bg-slate-800 p-3 border-t border-slate-700"
            />
          </FadeUp>
          <FadeUp>
            <ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/pig drawing test visual.jpg`}
              alt="Visual-guided pig drawings"
              caption={<p className="text-xs font-semibold text-sky-200">Visual + text steps: consistent, recognizable</p>}
              captionClassName="bg-sky-950/50 p-3 border-t border-sky-800"
            />
          </FadeUp>
        </MotionGrid>

        {/* Participatory design summary */}
        <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '❌', text: 'Instructions too vague: users can\'t tell what the product should look like after each step' },
            { icon: '❌', text: 'Too much text, not enough visual guidance at point of need' },
            { icon: '⚠', text: 'Switching between formats (text, audio, video) is clunky or missing entirely' },
            { icon: '✅', text: 'Users love clear visuals paired with simple, non-detailed text' },
            { icon: '✅', text: 'Users want control: choose between video, audio, or text based on comfort' },
            { icon: '✅', text: 'Audio guidance noted as beneficial for hands-free operation during repairs' },
          ].map((item, i) => (
            <FadeUp key={i} className="glass-placard flex gap-3 p-4 rounded-lg">
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <p className="text-sm text-slate-300">{item.text}</p>
            </FadeUp>
          ))}
        </MotionGrid>
      </MotionSection>

      {/* KEY INSIGHTS */}
      <MotionSection className="w-full bg-slate-900 py-20" stagger={0.1}>
        <div className="project-gutter-x w-full min-w-0">
          <FadeUp as="p" className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Key Discoveries</FadeUp>
          <FadeUp as="h2" className="text-2xl sm:text-4xl font-bold text-white mb-12">What the Research Revealed</FadeUp>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
            {[
              {
                title: 'Visual-First, Not Text-Heavy',
                finding: 'Users consistently preferred images over text paragraphs. Text should support visuals, not replace them.',
                evidence: 'Word cloud analysis: "clarity," "structure," "simplicity" were top demands.',
              },
              {
                title: 'Multimodal Flexibility Required',
                finding: 'Different repair contexts demand different formats. Hands-free work needs audio. Complex assembly needs video.',
                evidence: 'Users wanted control to switch between text/audio/video based on task context.',
              },
              {
                title: 'Progress Visibility Essential',
                finding: 'Users needed to see "what it should look like" after each step to self-correct errors.',
                evidence: 'Pig drawing test + user testing: "I didn\'t know if I was doing it right until it was too late."',
              },
              {
                title: 'QR Codes Reduce Friction',
                finding: 'Instant access from physical product to digital manual eliminates search time and reduces errors.',
                evidence: 'Users immediately understood QR scan workflow in prototype testing.',
              },
            ].map((insight, idx) => (
              <FadeUp key={idx} className="glass-placard p-6 rounded-xl">
                <h3 className="font-bold text-white mb-3">{insight.title}</h3>
                <p className="text-sm text-slate-300 mb-3">{insight.finding}</p>
                <p className="text-xs text-slate-400 border-t border-slate-700 pt-3 mt-3">
                  <span className="text-slate-400 font-semibold">Evidence: </span>{insight.evidence}
                </p>
              </FadeUp>
            ))}
          </MotionGrid>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <FadeUp><ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/Age Group Distribution.jpg`}
              alt="Age group distribution"
            /></FadeUp>
            <FadeUp><ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/Top Frustrations.jpg`}
              alt="Top frustrations"
            /></FadeUp>
            <FadeUp><ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/where are manuals used.png`}
              alt="Where manuals are used"
            /></FadeUp>
          </MotionGrid>
        </div>
      </MotionSection>

      {/* SOLUTION */}
      <MotionSection className="project-gutter-x w-full min-w-0 py-20">
        <FadeUp as="p" className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Deliver: Prototype</FadeUp>
        <FadeUp as="h2" className="text-2xl sm:text-4xl font-bold mb-4">Interactive Repair Guidance System</FadeUp>
        <FadeUp as="p" className="text-lg text-slate-400 mb-12">
          Users scan a QR code on the product part. The app opens directly to that component's manual: no login, no search, no guessing.
        </FadeUp>

        {/* User flow */}
        <MotionGrid className="flex items-center gap-2 mb-12 overflow-x-auto pb-4" stagger={0.1}>
          {[
            'Open App',
            'Scan QR on part',
            'Choose format',
            'View safety checklist',
            'Follow step-by-step',
            'Confirm completion',
          ].map((step, i, arr) => (
            <FadeUp key={i} className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-slate-800 text-sky-200 text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap">
                {step}
              </div>
              {i < arr.length - 1 && <span className="text-slate-300">→</span>}
            </FadeUp>
          ))}
        </MotionGrid>

        <FadeUp as="h3" className="text-xl font-bold mb-6">Prototype Screens</FadeUp>

        {/* QR Scan Screen */}
        <FadeUp className="mb-12">
          <ExpandableImage
            className="my-0 max-w-md mx-auto"
            src={`${BASE_PATH}/images/Repair manual/QR.png`}
            alt="QR scan screen"
          />
          <p className="text-xs text-slate-400 mt-2 text-center">QR scan + format selection screen</p>
        </FadeUp>

        {/* Step Navigation - 3 Images */}
        <FadeUp className="mb-12">
          <h4 className="text-lg font-semibold text-slate-100 mb-4">Step-by-Step Navigation</h4>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FadeUp><ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/STEP1.png`}
              alt="Step navigation screen 1"
            /></FadeUp>
            <FadeUp><ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/step2 .png`}
              alt="Step navigation screen 2"
            /></FadeUp>
            <FadeUp><ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/step3.png`}
              alt="Step navigation screen 3"
            /></FadeUp>
          </MotionGrid>
          <p className="text-xs text-slate-400 mt-2 text-center">Safety checklist → step-by-step flow</p>
        </FadeUp>

        {/* A/B Layout Comparison - 2 Images */}
        <FadeUp className="max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-slate-100 mb-4">A/B Layout Testing</h4>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            <FadeUp><ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/Prototype 1.png`}
              alt="A/B prototype layout A"
              caption={<p className="text-xs font-semibold text-slate-300">Layout A: Text-first approach</p>}
              captionClassName="bg-slate-900/50 p-3 border-t border-slate-700"
            /></FadeUp>
            <FadeUp><ExpandableImage
              className="my-0"
              src={`${BASE_PATH}/images/Repair manual/Prototype 2.png`}
              alt="A/B prototype layout B"
              caption={<p className="text-xs font-semibold text-slate-300">Layout B: Visual-first approach</p>}
              captionClassName="bg-slate-900/50 p-3 border-t border-sky-800"
            /></FadeUp>
          </MotionGrid>
          <p className="text-xs text-slate-400 mt-4 text-center">A/B layouts tested for one-handed phone use during repair tasks</p>
        </FadeUp>
      </MotionSection>

      {/* USABILITY TESTING */}
      <MotionSection className="w-full bg-slate-900/50 border-y border-slate-700 py-20">
        <div className="project-gutter-x w-full min-w-0">
          <FadeUp as="p" className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Usability Testing</FadeUp>
          <FadeUp as="h2" className="text-4xl font-bold mb-4">What We Learned from n=4</FadeUp>
          <FadeUp as="p" className="text-lg text-slate-400 mb-12">Think-aloud protocol, scenario-based tasks, post-task reflection.</FadeUp>

          {/* Direct user quotes */}
          <MotionGrid className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { quote: '"I got a little confused with the tools and safety checklist… maybe we can simplify that process."', change: 'Merged into "Preparation Checklist"' },
              { quote: '"Layout should be compatible with small phones too."', change: 'Redesigned for mobile-first layout' },
              { quote: '"The question mark visually implies being stuck. That\'s much better than a lightbulb."', change: '? icon chosen over 💡 for help' },
              { quote: '"If steps are clearly defined, then I don\'t think that should be an issue."', change: 'Confirmed step-by-step structure works' },
            ].map((item, i) => (
              <FadeUp key={i} className="glass-placard rounded-xl p-6">
                <p className="text-slate-300 italic mb-4 text-sm leading-relaxed">{item.quote}</p>
                <div className="flex gap-2 items-start">
                  <span className="text-sky-600 flex-shrink-0 mt-0.5">→</span>
                  <p className="text-xs text-sky-300 font-semibold">{item.change}</p>
                </div>
              </FadeUp>
            ))}
          </MotionGrid>
        </div>
      </MotionSection>

      {/* IMPACT */}
      <MotionSection className="project-gutter-x w-full min-w-0 py-20" stagger={0.2}>
        <FadeUp as="p" className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Impact</FadeUp>
        <FadeUp as="h2" className="text-2xl sm:text-4xl font-bold mb-12">Why This Matters Beyond One Manual</FadeUp>

        <MotionGrid className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" stagger={0.2}>
          <FadeUp>
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              Better manuals reduce product returns, lower support call volume, prevent user injuries, and support regulatory compliance. This isn't just UX. It's safety, cost savings, and accessibility.
            </p>
            <blockquote className="glass-placard text-xl font-semibold text-slate-200 italic border-l-4 border-sky-500 pl-6 py-4 rounded-r-lg">
              "The best manual is the one users never notice they're following."
            </blockquote>
          </FadeUp>
          <MotionGrid className="grid grid-cols-2 gap-3 sm:gap-4" stagger={0.15}>
            {[
              { icon: '🏷', label: 'Reduces product returns', desc: 'Saves company resources' },
              { icon: '🛡', label: 'Lowers injury risk', desc: 'Supports regulatory compliance' },
              { icon: '🌍', label: 'Supports accessibility', desc: 'Benefits a broader user base' },
              { icon: '🔄', label: 'Enables iteration', desc: 'Analytics-driven improvement' },
            ].map((item, i) => (
              <FadeUpScale key={i} className="glass-placard p-4 rounded-xl">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-sm font-semibold text-sky-200">{item.label}</p>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </FadeUpScale>
            ))}
          </MotionGrid>
        </MotionGrid>
      </MotionSection>

      {/* REFLECTION */}
      <MotionSection className="project-gutter-x w-full min-w-0 py-12 border-t border-slate-700" stagger={0.2}>
        <FadeUp as="h2" className="text-3xl font-bold mb-6">Reflection</FadeUp>
        <FadeUp as="p" className="text-lg leading-relaxed text-slate-300 mb-4">
          This project taught me that design research isn't about asking users what they want. It's about watching where they fail and designing systems that prevent those failures. Participatory design revealed problems I never would have found through interviews alone.
        </FadeUp>
        <FadeUp as="p" className="text-lg leading-relaxed text-slate-300 mb-8">
          The pig drawing test became the turning point: proof that our hypothesis wasn't theory; it was observable truth. One exercise replaced 20 slides of literature review.
        </FadeUp>
        <FadeUp as="p" className="text-sm text-slate-400">
          <span className="font-semibold text-slate-300">Course:</span> HUMF 5874: Human Centered Design, December 2024
        </FadeUp>
      </MotionSection>

      {/* FOOTER NAV */}
      <footer className="w-full border-t border-slate-700 py-12">
        <MotionBlock className="project-gutter-x w-full min-w-0 flex flex-wrap items-center justify-between gap-4">
          <FadeUp><Link href="/" className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline transition">
            ← Back to Portfolio
          </Link></FadeUp>
          <FadeUp><Link href="/airpods-adaptive-audio" className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline transition">
            Next Project →
          </Link></FadeUp>
        </MotionBlock>
      </footer>
      </div>
    </main>
  );
}