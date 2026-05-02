'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ManufacturingWorkflowPage() {
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
    <main className="min-h-screen bg-white text-slate-900 antialiased">
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

        {/* Hero Section — aligned with campus-sync case study header */}
        <section className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white px-5 sm:px-8 pt-28 pb-20 md:pt-32 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Boston Scientific Wolverine Blade Manufacturing
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed max-w-3xl">
                Lean methodology analysis identifying bottlenecks and optimization opportunities in medical device assembly
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-6">
              <div>
                <span className="font-semibold text-white">Role:</span> Industrial Engineer
              </div>
              <span>
                <span className="font-semibold text-white">Team:</span> Olasubomi Omoyeni, Chandan Pai, Jason Phan
              </span>
              <span>
                <span className="font-semibold text-white">Date:</span> December 2024
              </span>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="p-8 bg-slate-900 rounded-lg border border-slate-700">
              <p className="text-5xl font-bold text-white mb-2">13.47s</p>
              <p className="text-sm text-slate-400">Takt time per blade assembly</p>
              <p className="text-xs text-slate-500 mt-3">Customer demand: 122,000 blades/month</p>
            </div>
            <div className="p-8 bg-slate-900 rounded-lg border border-slate-700">
              <p className="text-5xl font-bold text-white mb-2">18.2s</p>
              <p className="text-sm text-slate-400">Station 5 bottleneck (blade break)</p>
              <p className="text-xs text-slate-500 mt-3">41% longer than takt time target</p>
            </div>
            <div className="p-8 bg-slate-900 rounded-lg border border-slate-700">
              <p className="text-5xl font-bold text-white mb-2">142</p>
              <p className="text-sm text-slate-400">Average batch size per cycle</p>
              <p className="text-xs text-slate-500 mt-3">Mix of 10mm and 15mm blades</p>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Boston Scientific's Wolverine cutting balloon blade production requires precision and efficiency. The coronary cutting balloon opens coronary arteries when standard balloon angioplasty cannot address blockages—a critical medical device where manufacturing quality directly impacts patient outcomes.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our task: Analyze the three-station production workflow (blade break, degreasing, dimensional inspection), identify bottlenecks, and optimize using lean methodology.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through 10 production cycles and time studies using Boston Scientific's MES system, we mapped constraints and quantified improvement opportunities.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-gray-900 mb-4">Process Stages Analyzed</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-slate-900 font-bold mt-1">→</span>
                  <span><strong>Blade Break:</strong> Operator separates 142 mini blades per cycle using tweezers and microscope, placing them in isopropyl alcohol</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-900 font-bold mt-1">→</span>
                  <span><strong>Degreasing:</strong> Blades submerged in automated cleaning machine to remove residual machining oil (timer-controlled)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-900 font-bold mt-1">→</span>
                  <span><strong>Inspection:</strong> Each blade dimensionally verified against specification database using microscope</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="w-full bg-gray-50 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Lean Analysis: Data Collection & Methodology</h2>

            <div className="space-y-12">
              {/* Time Study */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Time Study & Cycle Analysis</h3>
                  <p className="text-gray-700 mb-4">
                    We conducted detailed time studies across 10 production cycles, capturing cycle times for each station using Boston Scientific's Manufacturing Execution System (MES).
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li>• <strong>Data source:</strong> MES system (automated start/end timestamps)</li>
                    <li>• <strong>Cycles observed:</strong> 10 complete cycles (7 × 10mm, 3 × 15mm)</li>
                    <li>• <strong>Operator allocation:</strong> 1 dedicated operator per station</li>
                    <li>• <strong>Flex timing:</strong> 415 minutes/shift (480 min − breaks/rest)</li>
                  </ul>
                  <div className="p-4 bg-white border border-slate-200 rounded">
                    <p className="text-xs text-gray-500 font-mono">Shift: 415 min/shift × 3 shifts/day × 22 days = 27,390 min/month</p>
                    <p className="text-xs text-gray-500 font-mono">Demand: 122,000 blades/month</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">Takt Time = 13.47 sec/blade</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Batch Composition</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="p-3 bg-slate-50 rounded">
                      <p className="font-semibold text-gray-900">10mm Blades</p>
                      <p>7 cycles × 160 blades = 1,120 blades</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <p className="font-semibold text-gray-900">15mm Blades</p>
                      <p>3 cycles × 100 blades = 300 blades</p>
                    </div>
                    <div className="p-3 bg-slate-900 text-white rounded">
                      <p className="font-semibold">Average: 142 blades/cycle</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process Balance */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-lg border border-slate-200 order-2 md:order-1">
                  <h4 className="font-semibold text-gray-900 mb-4">Station Cycle Times</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-slate-800/80 rounded border border-slate-600">
                      <span className="text-gray-700">Station 5: Blade Break</span>
                      <span className="font-bold text-sky-300">18.2s</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                      <span className="text-gray-700">Station 6: Degreasing</span>
                      <span className="font-bold">12.1s</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                      <span className="text-gray-700">Station 7: Inspection</span>
                      <span className="font-bold">11.4s</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-sky-950/50 rounded border border-sky-700/50 mt-3">
                      <span className="text-gray-700"><strong>Takt Time Target</strong></span>
                      <span className="font-bold text-sky-300">13.47s</span>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-xl font-semibold mb-4">Process Balance & Bottleneck Identification</h3>
                  <p className="text-gray-700 mb-4">
                    Analysis of all three stations revealed that Station 5 (blade break) operates at 18.2 seconds per blade—<strong>41% above takt time.</strong>
                  </p>
                  <p className="text-gray-700 mb-4">
                    Stations 6 and 7 operate below takt time, meaning they can keep pace with customer demand when Station 5 is unconstrained. This identifies blade break as the production constraint.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Microscope-dependent precision work (tweezers, manual separation)</li>
                    <li>• High variability with blade sizes (5mm, 10mm, 15mm)</li>
                    <li>• Container non-conformance delays (quality checks)</li>
                    <li>• Operator occasionally diverted to support other lines</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Findings */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-12">Waste Identification & Key Insights</h2>

          <div className="space-y-6">
            <div className="p-8 bg-slate-100 rounded-lg border border-slate-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🔴 Critical Bottleneck: Station 5</h3>
              <p className="text-gray-700 mb-3">
                Blade break station cycle time of 18.2 seconds exceeds takt time by 4.73 seconds (41% excess). This is the constraint limiting overall throughput.
              </p>
              <p className="text-sm text-gray-600"><strong>Root causes:</strong> Microscope-dependent precision, manual tweezers separation, container non-conformance checks</p>
            </div>

            <div className="p-8 bg-slate-100 rounded-lg border border-slate-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Motion & Transportation Waste</h3>
              <p className="text-gray-700 mb-3">
                Operators engage in unnecessary reaching for tools, searching for supplies, and non-value-added movements across the three stations.
              </p>
              <p className="text-sm text-gray-600"><strong>Opportunity:</strong> Workstation layout optimization could save 2–3 seconds per cycle</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">⏳ Waiting Waste</h3>
              <p className="text-gray-700 mb-3">
                Operators experience delays waiting for degreasing machine cycles to complete and for parts to arrive from upstream EDM machining (3.5-hour batches).
              </p>
              <p className="text-sm text-gray-600"><strong>Note:</strong> EDM machine excluded from analysis—operates independently with 3.5-hour cycle, impractical for real-time observation</p>
            </div>

            <div className="p-8 bg-sky-50 rounded-lg border border-sky-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Recent Improvements (Layout Optimization)</h3>
              <p className="text-gray-700 mb-3">
                Boston Scientific recently repositioned workstations closer together, reducing travel distances between stations.
              </p>
              <p className="text-sm text-gray-600"><strong>Results so far:</strong> Faster deionized water refill, improved PPE accessibility, reduced transition times. However, Station 5 remains the constraint.</p>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="w-full bg-slate-900 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Recommended Improvements: Station 5 Focus</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-lg">⚡</span> Short-term (Weeks 1–4)
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span><strong>Workstation reorganization:</strong> Optimize tool and material placement within arm's reach to reduce reaching/searching motions</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span><strong>Visual management system:</strong> Label containers and supply locations to reduce decision time</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span><strong>Expected savings:</strong> 1.5–2 seconds/cycle (8–11% throughput improvement)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-lg">🔄</span> Long-term (Months 2–3)
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span><strong>Pull-based flow system:</strong> Shift from batch processing to smaller batch sizes (25–30 units) to reduce wait time</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span><strong>Cross-training:</strong> Train secondary operators for Station 5 backup during high-demand periods</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span><strong>Expected savings:</strong> 3–4 seconds/cycle (22–30% throughput improvement)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
              <h3 className="font-semibold text-white mb-4">Impact at Scale</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Current throughput</p>
                  <p className="text-2xl font-bold text-white">1,420 blades/shift</p>
                </div>
                <div>
                  <p className="text-slate-400">Target improvement (short-term)</p>
                  <p className="text-2xl font-bold text-sky-300">+114 blades/shift</p>
                </div>
                <div>
                  <p className="text-slate-400">Potential (long-term)</p>
                  <p className="text-2xl font-bold text-sky-300">+426 blades/shift</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-200">
          <h2 className="text-3xl font-bold mb-8">Conclusion</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Through systematic lean analysis of the Wolverine blade manufacturing process, we identified Station 5 (blade break) as the production constraint, operating at 18.2 seconds per blade against a takt time target of 13.47 seconds.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We quantified improvement opportunities worth 3–4 seconds per cycle through workstation reorganization, visual management, and pull-based flow systems. Implementation could increase throughput by 22–30% without additional capital investment—translating to 426 additional blades per shift or 9,372 blades per month (additional revenue at scale).
          </p>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
            <p className="text-sm font-semibold text-gray-900 mb-2">Key Takeaway</p>
            <p className="text-gray-700">
              This analysis demonstrates that visibility into actual cycle times, batch composition, and operator variability is essential for targeting improvement efforts. The blade break station's constraint status was quantifiable—and therefore solvable.
            </p>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Link href="/" className="text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition">
              ← Back to portfolio
            </Link>
            <Link href="/stay-tuned" className="text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition">
              What&apos;s next →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}