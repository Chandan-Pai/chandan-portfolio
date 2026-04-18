'use client';
import React, { useState } from "react";

export default function HomePage() {
  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Dynamic Island Navigation */}
        <div 
          className="fixed top-0 left-0 right-0 z-40"
          style={{
            height: '80px', // Adjust height as needed
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
    <a href="#work" className="text-white text-sm font-medium hover:text-slate-300 transition">Work</a>
    <a href="#about" className="text-white text-sm font-medium hover:text-slate-300 transition">About</a>
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-slate-300 transition">Resume</a>
    <a href="mailto:pai00040@umn.edu" className="text-white text-sm font-medium hover:text-slate-300 transition">Contact</a>
  </>
)}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 
          className="font-black tracking-tight uppercase gradient-text"
          style={{ 
                    fontSize: '7rem',
                    lineHeight: '1',
                }}
              >
                CHANDAN PAI
        </h1>
        <p className="mt-6 text-sm font-semibold tracking-widest text-slate-600 uppercase">
          Human Factors Engineer • UX Researcher
        </p>
        <p className="mt-8 max-w-2xl text-lg text-slate-600 leading-relaxed">
          Building data-driven design solutions at the intersection of engineering and human behavior
        </p>
      </header>

      {/* Projects Gallery */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">Selected Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Campus-Sync */}
            <a href="/campus-sync" className="group block">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div 
                  className="w-full h-[500px] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                >
                  <span className="text-slate-300 text-2xl font-medium">Campus-Sync Preview</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                  <span className="text-white font-semibold text-lg">View Project →</span>
                </div>
              </div>
              <h3 className="font-semibold mb-3" style={{ fontSize: '2rem' }}>Campus-Sync Navigation</h3>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                  UX Researcher & Designer
                </span>
              </div>
              <p className="text-base text-slate-600 font-medium">40% navigation error reduction • 65% → 95% task completion</p>
            </a>

            {/* Boston Scientific */}
            <a href="/manufacturing-workflow" className="group block">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div 
                  className="w-full h-[500px] bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                >
                  <span className="text-slate-400 text-2xl font-medium">Manufacturing Preview</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                  <span className="text-white font-semibold text-lg">View Project →</span>
                </div>
              </div>
              <h3 className="font-semibold mb-3" style={{ fontSize: '2rem' }}>Manufacturing Process Optimization</h3>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                  Industrial Engineer
                </span>
              </div>
              <p className="text-base text-slate-600 font-medium">Lean workflow analysis • Takt time: 13.47 sec/blade</p>
            </a>

            {/* Initiator Fellowship */}
            <a href="/initiator-fellowship" className="group block">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div 
                  className="w-full h-[500px] bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                >
                  <span className="text-slate-300 text-2xl font-medium">Accessibility Redesign Preview</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                  <span className="text-white font-semibold text-lg">View Project →</span>
                </div>
              </div>
              <h3 className="font-semibold mb-3" style={{ fontSize: '2rem' }}>Website Accessibility Redesign</h3>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                  UX Researcher
                </span>
              </div>
              <p className="text-base text-slate-600 font-medium">104% usability increase • 2.3/5 → 4.7/5 rating</p>
            </a>

            {/* Mercedes Service Manual */}
            <a href="/mercedes-service-manual" className="group block">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div 
                  className="w-full h-[500px] bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                >
                  <span className="text-slate-300 text-2xl font-medium">Mobile App Preview</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                  <span className="text-white font-semibold text-lg">View Project →</span>
                </div>
              </div>
              <h3 className="font-semibold mb-3" style={{ fontSize: '2rem' }}>Interactive Repair Guidance</h3>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                  Product Designer
                </span>
              </div>
              <p className="text-base text-slate-600 font-medium">Multi-format prototype • n=4 usability validation</p>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">About</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            MS Industrial & Systems Engineering (Human Factors) @ University of Minnesota, graduating May 2026.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            2+ years at Mercedes-Benz R&D India conducting mixed-methods research, ergonomic assessments, and ADAS safety evaluations. 
            I bridge rigorous engineering analysis with human-centered design to deliver data-driven solutions.
          </p>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-lg text-slate-600 mb-8">
            Open to HF/UX roles, industrial engineering positions, and collaborative research opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:2000chandanpai@gmail.com" 
              className="px-8 py-4 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
            >
              Email Me
            </a>
            <a 
              href="https://www.linkedin.com/in/chandan-umesh-pai/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-slate-900 text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Chandan Pai — Human Factors & UX Engineering
      </footer>
    </main>
  );
}