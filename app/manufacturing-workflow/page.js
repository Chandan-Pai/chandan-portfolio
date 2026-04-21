'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ManufacturingWorkflowPage() {
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

      <div className="min-h-screen bg-white text-gray-900">
      {/* Back Button - Dynamic Color */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          aria-label="Back to portfolio"
          className={`inline-flex items-center gap-3 rounded-full px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/30 transition-all ${
            isDarkSection ? 'text-white' : 'text-gray-900'
          }`}
        >
          <svg
            className={`w-4 h-4 ${isDarkSection ? 'text-white' : 'text-gray-900'}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`text-sm font-semibold ${isDarkSection ? 'text-white' : 'text-gray-900'}`}>Back to Portfolio</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-red-950 to-red-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl font-bold leading-tight mb-6">Boston Scientific Process Optimization</h1>
            <p className="text-xl text-red-300 max-w-2xl">Lean methodology analysis identifying bottlenecks in medical device assembly</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 text-sm">
            <div>
              <p className="text-red-400">Role</p>
              <p className="font-semibold">Industrial Engineer</p>
            </div>
            <div>
              <p className="text-red-400">Date</p>
              <p className="font-semibold">2024</p>
            </div>
            <div>
              <p className="text-red-400">Outcome</p>
              <p className="font-semibold">Takt time: 13.47 sec/blade • Workflow efficiency improved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Medical device assembly requires precision and efficiency. Our task was to analyze the Wolverine Device manufacturing workflow, identify bottlenecks, and optimize the production process using lean methodology.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Through time studies across 10 production cycles, we mapped the entire workflow and extracted actionable insights.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border border-gray-200">
            <p className="text-sm text-gray-500">Manufacturing facility image</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-4xl font-bold text-gray-900 mb-2">13.47s</p>
            <p className="text-sm text-gray-600">Takt time per blade assembly</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-4xl font-bold text-gray-900 mb-2">10</p>
            <p className="text-sm text-gray-600">Production cycles analyzed</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-4xl font-bold text-gray-900 mb-2">8</p>
            <p className="text-sm text-gray-600">Assembly workstations mapped</p>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="w-full bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Lean Analysis Approach</h2>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Time Study & Motion Analysis</h3>
                <p className="text-gray-700 mb-4">
                  We conducted detailed time studies across 10 production cycles, measuring each workstation's cycle time, value-added time, and wait time.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Station 1–8 cycle time captured</li>
                  <li>• Movement efficiency analyzed</li>
                  <li>• Bottleneck identification</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg aspect-video flex items-center justify-center border border-gray-200">
                <p className="text-sm text-gray-500">Time study data visualization</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-lg aspect-video flex items-center justify-center border border-gray-200 order-2 md:order-1">
                <p className="text-sm text-gray-500">Process flow diagram</p>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-xl font-semibold mb-4">Value Stream Mapping</h3>
                <p className="text-gray-700 mb-4">
                  We mapped the entire production process from raw materials to finished assembly, identifying non-value-added time and process inefficiencies.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Total process time: 108.76 seconds</li>
                  <li>• Identified waste in transitions</li>
                  <li>• Recommended layout improvements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Findings */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12">Key Findings</h2>

        <div className="space-y-8">
          <div className="p-8 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Bottleneck: Station 5</h3>
            <p className="text-gray-700">
              Station 5 (blade assembly) showed the longest cycle time at 18.2 seconds—41% longer than the takt time target. This is the constraint in the production line.
            </p>
          </div>

          <div className="p-8 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Opportunity: Workstation Layout</h3>
            <p className="text-gray-700">
              Current layout requires 2–3 unnecessary hand movements per cycle. Repositioning tools and materials could save 2–3 seconds per unit.
            </p>
          </div>

          <div className="p-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendation: Batch Reduction</h3>
            <p className="text-gray-700">
              Moving from batches of 100 to flow of 25–30 units reduces wait time between stations and improves inventory turnover.
            </p>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="w-full bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Recommended Improvements</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Short-term (Weeks 1–4)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Reorganize Station 5 workstation</li>
                <li>• Implement visual management system</li>
                <li>• Expected savings: 1.5–2 sec/cycle</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Long-term (Months 2–3)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Implement pull-based flow system</li>
                <li>• Cross-train operators on flexibility</li>
                <li>• Expected savings: 3–4 sec/cycle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8">Conclusion</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Through systematic lean analysis, we identified Station 5 as the primary constraint and quantified improvement opportunities worth 3–4 seconds per cycle. Implementation of recommended changes could increase throughput by 22–30% without additional capital investment.
        </p>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition">
            ← Back to portfolio
          </Link>
          <Link href="/initiator-fellowship" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition">
            Next project →
          </Link>
        </div>
      </section>
      </div>
    </main>
  );
}