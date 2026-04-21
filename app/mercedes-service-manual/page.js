'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MercedesServiceManualPage() {
  const [isDarkSection, setIsDarkSection] = useState(true);
  const [navExpanded, setNavExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scrolled past 400px, we're in light section
      setIsDarkSection(window.scrollY < 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Dynamic Island Navigation */}
      <div 
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          height: '80px',
          background: 'rgba(0, 0, 0, 0.01)',
          backdropFilter: 'blur(3px)',
          borderBottom: '1px solid transparent',
          backgroundImage: 'linear-gradient(to right, rgba(100, 100, 100, 0.1) 0%, rgba(150, 150, 150, 0.4) 50%, rgba(100, 100, 100, 0.1) 100%)',
          backgroundClip: 'padding-box, border-box',
          backgroundOrigin: 'padding-box, border-box',
        }}
      />

      <nav 
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out"
        onMouseEnter={() => setNavExpanded(true)}
        onMouseLeave={() => setNavExpanded(false)}
        style={{
          width: navExpanded ? '600px' : '100px',
          height: '40px',
          borderRadius: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="h-full flex items-center justify-center gap-8 px-6">
          {!navExpanded ? (
            <div className="astronaut-float">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="white"/>
                <ellipse cx="12" cy="16" rx="6" ry="4" fill="white"/>
                <circle cx="10" cy="7" r="1" fill="black"/>
                <circle cx="14" cy="7" r="1" fill="black"/>
                <path d="M10 10 Q12 11 14 10" stroke="black" strokeWidth="0.5" fill="none"/>
              </svg>
            </div>
          ) : (
            <>
              <Link href="/" className="text-white text-sm font-medium hover:text-slate-300 transition">Home</Link>
              <Link href="/#work" className="text-white text-sm font-medium hover:text-slate-300 transition">Work</Link>
              <Link href="/about" className="text-white text-sm font-medium hover:text-slate-300 transition">About</Link>
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-slate-300 transition">Resume</Link>
              <Link href="mailto:pai00040@umn.edu" className="text-white text-sm font-medium hover:text-slate-300 transition">Contact</Link>
            </>
          )}
        </div>
      </nav>


      {/* HERO IMAGE PLACEHOLDER */}
      <section className="w-full h-96 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
        <div className="text-center text-white">
          <span className="text-sm font-medium">App Prototype • QR Scanning Interface</span>
        </div>
      </section>

      {/* TITLE SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-4">Mercedes-Benz Service Manual Redesign</h1>
        <p className="text-xl text-slate-600 mb-8">QR-based interactive repair guidance with multi-format learning support</p>
        
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-sm text-slate-500 uppercase">Role</h3>
            <p className="mt-2">Product Designer & UX Researcher</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-500 uppercase">Context</h3>
            <p className="mt-2">HUMF 5874 - Human Centered Design • Independent Project</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-500 uppercase">Impact</h3>
            <p className="mt-2">Multi-format prototype • n=4 usability validation • AR-ready framework</p>
          </div>
        </div>
      </section>

      {/* OPENING STORY */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-slate-50 rounded-lg my-8 border border-slate-200">
        <p className="text-lg leading-relaxed text-slate-700 mb-4">
          A technician flips through a 200-page repair manual, searching for the wiring diagram buried somewhere in Section 7. Oil stains smudge the pages. A critical safety warning is printed in 8-point font at the bottom of page 143.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 mb-4">
          Meanwhile, a first-time furniture assembler stares at an IKEA instruction sheet, unable to tell which screw goes where because the diagram shows everything from the same angle.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 font-semibold">
          Both failures have the same root cause: manuals are designed for documentation, not for use.
        </p>
      </section>

      {/* PROBLEM SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-4">Why Repair Manuals Fail Users</h2>
        <p className="text-lg text-slate-600 mb-8">
          Repair and assembly manuals are safety-critical documents. Yet they're designed like legal contracts—dense text, unclear visuals, buried warnings. When users can't follow them, they turn to YouTube. When YouTube fails, they get injured.
        </p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Safety Warnings Overlooked", desc: "Small text, inconsistent placement, no visual hierarchy" },
            { title: "Technical Jargon Barriers", desc: "Language assumes expert knowledge, excludes beginners" },
            { title: "2D Diagrams Fail Spatial Tasks", desc: "Users can't visualize 3D assembly from flat drawings" },
            { title: "No Learning Flexibility", desc: "Text-only format doesn't support different comprehension styles" }
          ].map((pain, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-semibold mb-2">{pain.title}</h3>
              <p className="text-sm text-slate-600">{pain.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm">
            Slide 10: First-time Assembler Persona
          </div>
          <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm">
            Slide 11: Part-time Technician Persona
          </div>
        </div>
      </section>

      {/* RESEARCH APPROACH */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-4">Participatory Design with Real Users</h2>
        <p className="text-lg text-slate-600 mb-8">
          We didn't just ask users what they wanted. We watched them fail, then co-designed solutions together.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { method: "Participatory Design Sessions", desc: "Users sketched assembly steps to test spatial comprehension. Revealed 2D instruction failures." },
            { method: "AEIOU Field Observation", desc: "Studied repair workflows in real workshop contexts. Documented tool usage, environment, interactions." },
            { method: "Qualtrics Survey", desc: "Identified primary users: 18-34 age group, mobile-first preference, furniture/home repair focus." },
            { method: "Usability Testing (n=4)", desc: "Think-aloud protocol with wireframe prototype. Tested help features, navigation, safety checklists." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 border-l-4 border-purple-500">
              <h3 className="font-semibold mb-2 text-sm">{item.method}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm">
            Slides 19-20: Pig Drawing Test Results
          </div>
          <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm">
            Slide 13: Demographics Charts
          </div>
        </div>
      </section>

      {/* THE PIG DRAWING TEST */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-orange-50 rounded-lg border-2 border-orange-200 my-8">
        <h3 className="text-3xl font-bold mb-4">The Moment Everything Clicked</h3>
        <p className="text-lg leading-relaxed text-slate-700 mb-4">
          We asked participants to draw a pig using only text instructions. No images. Just step-by-step text. The results were chaos—unrecognizable shapes, frustrated users, zero success.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 mb-4">
          Then we gave them the same task with visual progress shown after each step. Suddenly, everyone could draw a recognizable pig.
        </p>
        <p className="text-lg leading-relaxed text-slate-700 font-semibold">
          That single exercise proved our hypothesis: instructions without visual feedback don't just fail—they're fundamentally broken.
        </p>
        <div className="mt-8 h-40 bg-white rounded-lg flex items-center justify-center text-slate-500 text-sm border border-orange-200">
          Slide 20: Text-Only vs Visual-Guided Pig Drawings
        </div>
      </section>

      {/* KEY INSIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-12">Key Discoveries</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: "Visual-First, Not Text-Heavy",
              finding: "Users consistently preferred images over text paragraphs. Text should support visuals, not replace them.",
              evidence: "Word cloud analysis from survey showed 'clarity,' 'structure,' 'simplicity' as top demands."
            },
            {
              title: "Multimodal Flexibility Required",
              finding: "Different repair contexts demand different formats. Hands-free work needs audio. Complex assembly needs video. Quick reference needs text.",
              evidence: "Users wanted control to switch between text/audio/video based on task context."
            },
            {
              title: "Progress Visibility Essential",
              finding: "Users needed to see 'what it should look like' after each step. Without visual confirmation, they couldn't self-correct errors.",
              evidence: "Pig drawing test, user testing feedback: 'I didn't know if I was doing it right until it was too late.'"
            },
            {
              title: "QR Codes Reduce Friction",
              finding: "Instant access from physical product to digital manual eliminates search time and reduces errors.",
              evidence: "Users immediately understood QR scan workflow in prototype testing."
            }
          ].map((insight, idx) => (
            <div key={idx} className="p-6 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-bold text-lg mb-3">{insight.title}</h3>
              <p className="text-sm text-slate-700 mb-3"><strong>Finding:</strong> {insight.finding}</p>
              <p className="text-sm text-slate-600"><strong>Evidence:</strong> {insight.evidence}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 h-40 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm">
          Slide 14: Word Cloud Analysis
        </div>
      </section>

      {/* SOLUTION - THE APP PROTOTYPE */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-4">Interactive Repair Guidance System</h2>
        <p className="text-lg text-slate-600 mb-8">
          Users scan a QR code on the product part. The app opens directly to that component's manual—no login, no search, no guessing.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            { feature: "QR Code Scanning", desc: "Instant manual access from product parts. Camera-based scanning flow." },
            { feature: "Multi-Format Support", desc: "Users choose: text-based, step-by-step visuals, audio narration, or video guide." },
            { feature: "Safety-First Layout", desc: "Bold warnings, tool checklists displayed before instructions begin. No buried hazards." },
            { feature: "Adaptive Content", desc: "Instructions adjust based on user skill level and repair context." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 border-2 border-purple-300 rounded-lg bg-gradient-to-br from-purple-50 to-transparent">
              <h3 className="font-bold text-lg mb-2">{item.feature}</h3>
              <p className="text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-xs text-center p-2">
            Slide 24: User Flow
          </div>
          <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-xs text-center p-2">
            Slide 25: QR Scan Screen
          </div>
          <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-xs text-center p-2">
            Slide 26: Safety Checklist
          </div>
          <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-xs text-center p-2">
            Slide 27: A/B Layouts
          </div>
        </div>
      </section>

      {/* USABILITY TESTING RESULTS */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-slate-50 rounded-lg">
        <h2 className="text-4xl font-bold mb-4">What We Learned from Testing</h2>
        <p className="text-lg text-slate-600 mb-8">
          Four participants tested wireframe prototypes using think-aloud protocol. Their feedback shaped the final design.
        </p>

        <div className="space-y-4 mb-8">
          {[
            { finding: "In-step help preferred", result: "Question mark icon for inline help beats separate help screens." },
            { finding: "Simpler terminology needed", result: "Users confused by 'tools and safety checklist'—merged into 'Preparation Checklist.'" },
            { finding: "Small screen adaptation critical", result: "Layout must work on phones, not just tablets." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold">{item.finding}</h3>
              <p className="text-slate-600 text-sm mt-1">{item.result}</p>
            </div>
          ))}
        </div>

        <div className="h-40 bg-white rounded-lg flex items-center justify-center text-slate-500 text-sm border border-slate-200">
          Slide 30: Usability Testing Summary
        </div>
      </section>

      {/* IMPACT & FUTURE VISION */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8">Impact & Future Vision</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { metric: "4", label: "Users tested", subtext: "Think-aloud protocol" },
            { metric: "3", label: "Format options", subtext: "Text, audio, video" },
            { metric: "AR-ready", label: "Framework", subtext: "3D overlay guidance" },
            { metric: "100%", label: "Safety-first", subtext: "Zero buried warnings" }
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6 bg-gradient-to-br from-purple-50 to-slate-50 rounded-lg border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">{item.metric}</div>
              <div className="font-semibold text-sm">{item.label}</div>
              <div className="text-xs text-slate-600 mt-1">{item.subtext}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-500 mb-12">
          <h3 className="font-bold text-lg mb-4">Future Directions</h3>
          <ul className="space-y-3 text-slate-700">
            <li><strong>Multilingual Support:</strong> Pilot manuals in additional languages with native speaker testing</li>
            <li><strong>AR Integration:</strong> Overlay step-by-step guidance directly on physical parts</li>
            <li><strong>Analytics for Iteration:</strong> Track which steps cause errors, refine instructions based on real usage</li>
            <li><strong>Voice-Guided Repairs:</strong> Hands-free audio instructions for mechanics working under cars</li>
          </ul>
        </div>
      </section>

      {/* LARGER SYSTEM THINKING */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-slate-100 rounded-lg">
        <h2 className="text-4xl font-bold mb-6">Why This Matters Beyond One Manual</h2>
        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          Better manuals reduce product returns, lower support call volume, prevent user injuries, and support regulatory compliance. This isn't just UX—it's safety, cost savings, and accessibility. Good manual design benefits manufacturers, users, and society.
        </p>
        <blockquote className="text-2xl font-semibold text-slate-800 italic border-l-4 border-purple-500 pl-6">
          "The best manual is the one users never notice they're following."
        </blockquote>
      </section>

      {/* REFLECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-6">Reflection</h2>
        <p className="text-lg leading-relaxed text-slate-700 mb-4">
          This project taught me that design research isn't about asking users what they want—it's about watching where they fail and designing systems that prevent those failures. Participatory design revealed problems I never would have found through interviews alone. The pig drawing test became the turning point: proof that our hypothesis wasn't theory—it was observable truth.
        </p>
        <p className="text-sm text-slate-600">
          <strong>Course:</strong> HUMF 5874 - December 2024
        </p>
      </section>

      {/* FOOTER NAV */}
      <footer className="max-w-6xl mx-auto px-6 py-12 flex gap-6 text-sm">
        <Link href="/" className="text-slate-600 hover:text-slate-800">← Back to Portfolio</Link>
        <Link href="/" className="text-slate-600 hover:text-slate-800">← Back to Homepage</Link>
      </footer>
    </main>
  );
}
