'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LiveClock from '../components/LiveClock';

export default function MercedesServiceManualPage() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [navExpanded, setNavExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setIsDarkSection(window.scrollY < 640);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = !scrolled || navExpanded;

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">

      {/* Top blur bar */}
      <div className="fixed top-0 left-0 right-0 z-40" style={{
        height: '80px',
        background: 'rgba(0,0,0,0.01)',
        backdropFilter: 'blur(3px)',
        borderBottom: '1px solid transparent',
        backgroundImage: 'linear-gradient(to right, rgba(100,100,100,0.1) 0%, rgba(150,150,150,0.4) 50%, rgba(100,100,100,0.1) 100%)',
        backgroundClip: 'padding-box, border-box',
        backgroundOrigin: 'padding-box, border-box',
      }} />

      {/* Nav */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <span className="text-slate-900 text-sm font-semibold tracking-widest">CP</span>
        <nav
          className="transition-all duration-300 ease-in-out"
          onMouseEnter={() => setNavExpanded(true)}
          onMouseLeave={() => setNavExpanded(false)}
          style={{
            width: isExpanded ? '480px' : '80px',
            height: '40px',
            borderRadius: '20px',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
          }}
        >
          <div className="h-full flex items-center justify-center gap-8 px-6">
            {!isExpanded ? (
              <div className="astronaut-float">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="white"/>
                  <ellipse cx="12" cy="16" rx="6" ry="4" fill="white"/>
                  <circle cx="10" cy="7" r="1" fill="black"/>
                  <circle cx="14" cy="7" r="1" fill="black"/>
                  <path d="M10 10 Q12 11 14 10" stroke="black" strokeWidth="0.5" fill="none"/>
                </svg>
              </div>
            ) : (
              <>
                <Link href="/" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">Home</Link>
                <Link href="/#work" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">Work</Link>
                <Link href="/About" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">About</Link>
                <a
                  href={`${BASE_PATH}/Chandan_Pai_HF_Engineer.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap"
                >
                  Resume
                </a>
                <Link href="mailto:2000chandanpai@gmail.com" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">Contact</Link>
              </>
            )}
          </div>
        </nav>
        <LiveClock />
      </div>

      <div className="min-h-screen bg-white text-gray-900">
        {/* Back Button */}
        <div className="fixed top-6 left-6 z-50">
          <Link
            href="/"
            aria-label="Back to portfolio"
            data-no-cursor-hover
            className={`inline-flex items-center gap-3 rounded-full px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/30 transition-all ${
              isDarkSection ? 'text-white' : 'text-gray-900'
            }`}
          >
            <svg
              className={`w-4 h-4 ${isDarkSection ? 'text-white' : 'text-gray-900'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M15 18L9 12L15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`text-sm font-semibold ${isDarkSection ? 'text-white' : 'text-gray-900'}`}>Back to Portfolio</span>
          </Link>
        </div>

        <header className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white px-5 sm:px-8 pt-28 pb-20 md:pt-32 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-mono tracking-widest text-sky-400 uppercase mb-4">
              HUMF 5874 — Human Centered Design
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Interactive Repair Guidance
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-6 max-w-3xl">
              Product research and participatory design for clearer, safer assembly manuals — from field observation to a validated QR-based prototype.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-6">
              <span>
                <span className="font-semibold text-white">Role:</span> Product Researcher
              </span>
              <span>
                <span className="font-semibold text-white">Methods:</span> AEIOU · Participatory design · Usability testing
              </span>
              <span>
                <span className="font-semibold text-white">Output:</span> QR-based app prototype · n=4 validated
              </span>
            </div>
          </div>
        </header>

      {/* OPENING STORY */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-2xl leading-relaxed text-slate-700 mb-6">
          A technician flips through a 200-page repair manual searching for a wiring diagram buried in Section 7. Oil stains smudge the pages. A critical safety warning sits in 8-point font at the bottom of page 143.
        </p>
        <p className="text-2xl leading-relaxed text-slate-700 mb-6">
          Meanwhile, a first-time assembler stares at an instruction sheet, unable to tell which screw goes where because everything is drawn from the same angle.
        </p>
        <p className="text-2xl font-semibold text-slate-900">
          Both failures share one root cause: manuals are designed for documentation, not for use.
        </p>
      </section>

      {/* DOUBLE DIAMOND PROCESS */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-8">Process</p>
          <h2 className="text-3xl font-bold mb-12">Double Diamond</h2>

          <div className="grid grid-cols-4 gap-0 relative">
            {[
              {
                phase: 'DISCOVER',
                label: '01',
                color: 'bg-sky-100 border-sky-300',
                accent: 'text-sky-800',
                items: ['Personal story — why manuals fail', 'AEIOU field observation', 'Stakeholder interviews', 'Qualtrics survey (18–34 yr olds)'],
              },
              {
                phase: 'DEFINE',
                label: '02',
                color: 'bg-slate-100 border-slate-300',
                accent: 'text-slate-800',
                items: ['Journey map (current vs ideal state)', 'Two personas identified', 'Core pain points clustered', 'Problem statement formalized'],
              },
              {
                phase: 'DEVELOP',
                label: '03',
                color: 'bg-slate-100 border-slate-300',
                accent: 'text-slate-800',
                items: ['Participatory design sessions', 'Pig drawing test (key insight)', 'Two prototype concepts', 'QR-scan app selected'],
              },
              {
                phase: 'DELIVER',
                label: '04',
                color: 'bg-cyan-100 border-cyan-300',
                accent: 'text-cyan-700',
                items: ['Wireframe prototype built', 'Usability testing n=4', 'Think-aloud protocol', 'Iterated on findings'],
              },
            ].map((d, i) => (
              <div key={i} className={`border ${d.color} p-6 ${i === 0 ? 'rounded-l-xl' : ''} ${i === 3 ? 'rounded-r-xl' : ''}`}>
                <p className={`text-xs font-mono font-bold tracking-widest uppercase mb-1 ${d.accent}`}>{d.label}</p>
                <p className="text-sm font-bold text-slate-900 mb-4">{d.phase}</p>
                <ul className="space-y-2">
                  {d.items.map((item, j) => (
                    <li key={j} className="text-xs text-slate-600 flex gap-2">
                      <span className={`${d.accent} mt-0.5`}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM — stat cards instead of images */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Discover</p>
        <h2 className="text-4xl font-bold mb-4">Why Repair Manuals Fail Users</h2>
        <p className="text-lg text-slate-600 mb-12 max-w-3xl">
          Repair and assembly manuals are safety-critical documents. Yet they're designed like legal contracts — dense text, unclear visuals, buried warnings. When users can't follow them, they turn to YouTube.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { title: "Safety Warnings Overlooked", desc: "Small text, inconsistent placement, no visual hierarchy", icon: "⚠" },
            { title: "Technical Jargon Barriers", desc: "Language assumes expert knowledge, excludes beginners", icon: "📖" },
            { title: "2D Diagrams Fail Spatial Tasks", desc: "Users can't visualize 3D assembly from flat drawings", icon: "📐" },
            { title: "No Learning Flexibility", desc: "Text-only format doesn't support different comprehension styles", icon: "🎯" },
          ].map((pain, idx) => (
            <div key={idx} className="p-6 bg-slate-900 rounded-xl text-white">
              <p className="text-3xl mb-4">{pain.icon}</p>
              <h3 className="font-semibold text-sm mb-2">{pain.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>

        {/* Two personas as text cards */}
        <div className="grid grid-cols-2 gap-6">
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
            <div key={i} className={`border-l-4 ${p.color} pl-6 py-4`}>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">{p.type}</p>
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{p.age}</p>
              <ul className="space-y-2">
                {p.pains.map((pain, j) => (
                  <li key={j} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">✗</span>
                    {pain}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <img src={`${BASE_PATH}/images/Repair manual/AEIOU Field observations.png`} alt="AEIOU Field Observation" className="w-full rounded-xl border border-slate-200 mb-16" />
          <img src={`${BASE_PATH}/images/Repair manual/Observation sheets.png`} alt="Observation sheets" className="w-full rounded-xl border border-slate-200 mt-8" />
        </div>
        
      </section>

      {/* DEFINE — Journey Map */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Define</p>
          <h2 className="text-4xl font-bold mb-12">Journey Map — Current vs Ideal State</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="text-left py-3 pr-6 text-slate-500 font-mono text-xs uppercase tracking-widest w-32">Phase</th>
                  <th className="text-left py-3 pr-6 text-slate-700 font-semibold">Current State ✗</th>
                  <th className="text-left py-3 text-sky-800 font-semibold">Ideal State ✓</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
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
                  <tr key={i}>
                    <td className="py-4 pr-6 font-semibold text-slate-900 align-top">{row.phase}</td>
                    <td className="py-4 pr-6 text-slate-600 align-top">{row.current}</td>
                    <td className="py-4 text-slate-700 align-top">{row.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <img src={`${BASE_PATH}/images/Repair manual/Journey Map.png`} alt="Journey Map" className="w-full rounded-xl border border-slate-200 mt-8" />
          <img src={`${BASE_PATH}/images/Repair manual/Affinity Diagraming.png`} alt="Affinity Diagram" className="w-full rounded-xl border border-slate-200 mt-6" />    
        </div>
      </section>

      {/* THE PIG DRAWING TEST — hero moment */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Develop — Key Insight</p>
        <h2 className="text-4xl font-bold mb-8">The Pig Drawing Test</h2>

        {/* Narrative text */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed text-slate-700 mb-6">
            We gave participants two different sets of instructions: one text-only, one with visuals. Both described drawing a pig.
          </p>
          <p className="text-lg leading-relaxed text-slate-700">
            The results were stark. Text-only instructions produced chaotic, unrecognizable drawings. Visual-guided steps produced consistent, recognizable results.
          </p>
        </div>

        

        {/* How it should be drawn - reference image */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Reference: How the pig should look</h3>
          <div className="rounded-xl overflow-hidden border border-slate-200 max-w-2xl">
            <img src={`${BASE_PATH}/images/Repair manual/pig drawing reference.png`} alt="Correct pig drawing reference" className="w-full h-auto" />
            <div className="bg-sky-100 p-3">
              <p className="text-xs font-semibold text-sky-900">Target outcome with visual guidance</p>
            </div>
          </div>
        </div>

        {/* The actual pig drawing instructions */}
        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mb-8">
          <p className="text-sm font-semibold text-slate-700 mb-4">The actual instructions participants received (text-only condition):</p>
          <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
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
          <p className="text-sm text-slate-700 font-semibold mt-4">→ Result: Every participant produced a different, unrecognizable drawing.</p>
        </div>
        
        {/* Images - horizontal layout */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <img src={`${BASE_PATH}/images/Repair manual/Pig drawing test text.jpg`} alt="Text-only pig instructions" className="w-full h-auto" />
            <div className="bg-slate-200 p-3">
              <p className="text-xs font-semibold text-slate-800">Text-only instructions — chaotic results</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <img src={`${BASE_PATH}/images/Repair manual/pig drawing test visual.jpg`} alt="Visual-guided pig drawings" className="w-full h-auto" />
            <div className="bg-sky-100 p-3">
              <p className="text-xs font-semibold text-sky-900">Visual + text steps — consistent, recognizable</p>
            </div>
          </div>
        </div>

        {/* Participatory design summary */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '❌', text: 'Instructions too vague — users can\'t tell what the product should look like after each step' },
            { icon: '❌', text: 'Too much text, not enough visual guidance at point of need' },
            { icon: '⚠', text: 'Switching between formats (text, audio, video) is clunky or missing entirely' },
            { icon: '✅', text: 'Users love clear visuals paired with simple, non-detailed text' },
            { icon: '✅', text: 'Users want control: choose between video, audio, or text based on comfort' },
            { icon: '✅', text: 'Audio guidance noted as beneficial for hands-free operation during repairs' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-lg">
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <p className="text-sm text-slate-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KEY INSIGHTS */}
      <section className="w-full bg-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Key Discoveries</p>
          <h2 className="text-4xl font-bold text-white mb-12">What the Research Revealed</h2>

          <div className="grid grid-cols-2 gap-6">
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
              <div key={idx} className="p-6 border border-slate-700 rounded-xl bg-slate-800">
                <h3 className="font-bold text-white mb-3">{insight.title}</h3>
                <p className="text-sm text-slate-300 mb-3">{insight.finding}</p>
                <p className="text-xs text-slate-500 border-t border-slate-700 pt-3 mt-3">
                  <span className="text-slate-400 font-semibold">Evidence: </span>{insight.evidence}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <img src={`${BASE_PATH}/images/Repair manual/Age Group Distribution.jpg`} alt="Age group distribution" className="w-full rounded-xl border border-slate-200" />
            <img src={`${BASE_PATH}/images/Repair manual/Top Frustrations.jpg`} alt="Top frustrations" className="w-full rounded-xl border border-slate-200" />
            <img src={`${BASE_PATH}/images/Repair manual/where are manuals used.png`} alt="Where manuals are used" className="w-full rounded-xl border border-slate-200" />
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Deliver — Prototype</p>
        <h2 className="text-4xl font-bold mb-4">Interactive Repair Guidance System</h2>
        <p className="text-lg text-slate-600 mb-12 max-w-3xl">
          Users scan a QR code on the product part. The app opens directly to that component's manual — no login, no search, no guessing.
        </p>

        {/* User flow */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4">
          {[
            'Open App',
            'Scan QR on part',
            'Choose format',
            'View safety checklist',
            'Follow step-by-step',
            'Confirm completion',
          ].map((step, i, arr) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-slate-800 text-sky-200 text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap">
                {step}
              </div>
              {i < arr.length - 1 && <span className="text-slate-300">→</span>}
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-6">Prototype Screens</h3>
        
        {/* QR Scan Screen */}
        <div className="mb-12">
          <div className="max-w-md mx-auto rounded-xl overflow-hidden border border-slate-200">
            <img src={`${BASE_PATH}/images/Repair manual/QR.png`} alt="QR scan screen" className="w-full h-auto" />
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">QR scan + format selection screen</p>
        </div>

        {/* Step Navigation - 3 Images */}
        <div className="mb-12">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Step-by-Step Navigation</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img src={`${BASE_PATH}/images/Repair manual/STEP1.png`} alt="Step navigation screen 1" className="w-full h-auto" />
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img src={`${BASE_PATH}/images/Repair manual/step2 .png`} alt="Step navigation screen 2" className="w-full h-auto" />
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img src={`${BASE_PATH}/images/Repair manual/step3.png`} alt="Step navigation screen 3" className="w-full h-auto" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">Safety checklist → step-by-step flow</p>
        </div>

        {/* A/B Layout Comparison - 2 Images */}
        <div className="max-w-2xl mx-auto rounded-xl overflow-hidden border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">A/B Layout Testing</h4>
          <div className="grid grid-cols-2 gap-10">
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img src={`${BASE_PATH}/images/Repair manual/Prototype 1.png`} alt="A/B prototype layout A" className="w-full h-auto" />
              <div className="bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-700">Layout A: Text-first approach</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img src={`${BASE_PATH}/images/Repair manual/Prototype 2.png`} alt="A/B prototype layout B" className="w-full h-auto" />
              <div className="bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-700">Layout B: Visual-first approach</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">A/B layouts tested for one-handed phone use during repair tasks</p>
        </div>
      </section>

      {/* USABILITY TESTING */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Usability Testing</p>
          <h2 className="text-4xl font-bold mb-4">What We Learned from n=4</h2>
          <p className="text-lg text-slate-600 mb-12">Think-aloud protocol, scenario-based tasks, post-task reflection.</p>

          {/* Direct user quotes */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {[
              { quote: '"I got a little confused with the tools and safety checklist… maybe we can simplify that process."', change: 'Merged into "Preparation Checklist"' },
              { quote: '"Layout should be compatible with small phones too."', change: 'Redesigned for mobile-first layout' },
              { quote: '"The question mark visually implies being stuck — that\'s much better than a lightbulb."', change: '? icon chosen over 💡 for help' },
              { quote: '"If steps are clearly defined, then I don\'t think that should be an issue."', change: 'Confirmed step-by-step structure works' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <p className="text-slate-700 italic mb-4 text-sm leading-relaxed">{item.quote}</p>
                <div className="flex gap-2 items-start">
                  <span className="text-sky-600 flex-shrink-0 mt-0.5">→</span>
                  <p className="text-xs text-sky-800 font-semibold">{item.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">Impact</p>
        <h2 className="text-4xl font-bold mb-12">Why This Matters Beyond One Manual</h2>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              Better manuals reduce product returns, lower support call volume, prevent user injuries, and support regulatory compliance. This isn't just UX — it's safety, cost savings, and accessibility.
            </p>
            <blockquote className="text-xl font-semibold text-slate-800 italic border-l-4 border-sky-500 pl-6">
              "The best manual is the one users never notice they're following."
            </blockquote>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🏷', label: 'Reduces product returns', desc: 'Saves company resources' },
              { icon: '🛡', label: 'Lowers injury risk', desc: 'Supports regulatory compliance' },
              { icon: '🌍', label: 'Supports accessibility', desc: 'Benefits a broader user base' },
              { icon: '🔄', label: 'Enables iteration', desc: 'Analytics-driven improvement' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-sky-50 rounded-xl">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-sm font-semibold text-sky-900">{item.label}</p>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFLECTION */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-200">
        <h2 className="text-3xl font-bold mb-6">Reflection</h2>
        <p className="text-lg leading-relaxed text-slate-700 mb-4">
          This project taught me that design research isn't about asking users what they want — it's about watching where they fail and designing systems that prevent those failures. Participatory design revealed problems I never would have found through interviews alone.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 mb-8">
          The pig drawing test became the turning point: proof that our hypothesis wasn't theory — it was observable truth. One exercise replaced 20 slides of literature review.
        </p>
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">Course:</span> HUMF 5874 — Human Centered Design, December 2024
        </p>
      </section>

      {/* FOOTER NAV */}
      <footer className="max-w-5xl mx-auto px-5 sm:px-8 py-12 border-t border-slate-200 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition">
          ← Back to Portfolio
        </Link>
        <Link href="/manufacturing-workflow" className="text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition">
          Next Project →
        </Link>
      </footer>
      </div>
    </main>
  );
}