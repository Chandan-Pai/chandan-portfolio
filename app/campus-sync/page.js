'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CampusSyncPage() {
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
              <Link href="/About" className="text-white text-sm font-medium hover:text-slate-300 transition">About</Link>
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
      <section className="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white py-30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-700 rounded-lg p-16 mb-8 text-center">
            <p className="text-sm text-gray-300">Hero Image</p>
          </div>
          <h1 className="text-5xl font-bold mb-4">Campus-Sync</h1>
          <p className="text-xl text-gray-300 mb-8">Solving winter navigation through design and trust</p>
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Role:</span> Lead UX Researcher & Product Designer</p>
            <p><span className="font-semibold">Team:</span> Chandan Umesh Pai, Nick Kanning, Saad Saleem, David Tomlinson</p>
            <p><span className="font-semibold">Impact:</span> 90% routing accuracy • 82 SUS score • Live product</p>
          </div>
        </div>
      </section>

      {/* Opening Story */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              A student stands at a tunnel entrance on a February morning. It's –20°F outside. She looks at the tunnel opening, pauses for several seconds, then turns around and walks outside into the cold.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              She wasn't avoiding the tunnel because she didn't know it existed. She was avoiding it because she couldn't trust what was on the other side.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This moment became the central insight for Campus-Sync—the realization that the problem wasn't the tunnel system itself. It was the information gap that made students choose frostbite over uncertainty.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <p className="text-sm text-gray-500">Problem scenario GIF</p>
          </div>
        </div>
      </section>

      {/* Context & Research Woven In */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Understanding the Real Problem</h2>
        
        <div className="mb-12">
          <p className="text-lg text-gray-700 mb-4">
            The University of Minnesota's Gopher Way connects 7+ miles of tunnels. Students knew about it. But they didn't use it.
          </p>
          <p className="text-gray-600 mb-8">
            When we shadowed 15 students across winter weeks, the pattern was unmissable. Every hesitation at a tunnel entrance came down to the same question: <span className="font-semibold text-gray-900">Can I trust that this path is actually open?</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2 text-sm">Building Hours Scattered</p>
            <p className="text-sm text-gray-600">No single source of real-time access information</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2 text-sm">Static Maps Outdated</p>
            <p className="text-sm text-gray-600">Paper maps don't reflect seasonal closures</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2 text-sm">Fragmented Data</p>
            <p className="text-sm text-gray-600">Students make risky assumptions</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-12 text-center mb-8">
          <p className="text-sm text-gray-500">Research documentation photo</p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Mapping 40+ real navigation scenarios revealed most routes were short—just 1–3 building hops. The insight: <span className="font-semibold">users didn't need perfect routing. They needed reliable routing.</span> Something they could trust instantly, in real time, while wearing gloves at a tunnel entrance.
        </p>
      </section>

      {/* Solution Intro */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white/40 backdrop-blur-md rounded-2xl mx-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What We Built</h2>
          <p className="text-gray-700 mb-8">
            CampusSync is live at campus-sync.org. No login. No installation. Built on a single principle: <span className="font-semibold">every route users see must be walkable right now.</span>
          </p>

          <div className="bg-white rounded-lg p-8 mb-8">
            <p className="text-sm text-gray-500 mb-8 text-center">Demo: Search to result (15 sec GIF)</p>
          </div>

          <p className="text-gray-600 text-sm">
            The solution wasn't complex. It was precise. Four design decisions—each one solving a specific failure point we watched users encounter.
          </p>
        </div>
      </section>

      {/* Design Decisions - Simplified */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* Decision 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Routing Engine</h3>
              <p className="text-sm text-[#8B1538] font-semibold mb-3">Insight</p>
              <p className="text-gray-700 mb-6">Routes through closed buildings destroy trust.</p>
              <p className="text-sm text-gray-600 mb-4">
                We query building access status at routing time, filtering out any path users can't actually walk. Users never see a route they can't take.
              </p>
              <p className="text-sm font-semibold text-gray-900">Outcome: Zero failed routes in testing.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-500">Routing logic diagram</p>
            </div>
          </div>

          {/* Decision 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-gray-100 rounded-lg p-8 text-center order-2 md:order-1">
              <p className="text-sm text-gray-500">Before/after visualization</p>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dual-Color Visual System</h3>
              <p className="text-sm text-[#8B1538] font-semibold mb-3">Insight</p>
              <p className="text-gray-700 mb-6">Users followed routes without realizing they went outside.</p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="text-[#8B1538] font-semibold">Maroon</span> for tunnels, <span className="text-[#FDB913] font-semibold">gold</span> for outdoor segments. In Round 2 testing, users immediately recognized the distinction.
              </p>
              <p className="text-sm font-semibold text-gray-900">Outcome: No more misunderstood routes.</p>
            </div>
          </div>

          {/* Decision 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Search-First Interface</h3>
              <p className="text-sm text-[#8B1538] font-semibold mb-3">Insight</p>
              <p className="text-gray-700 mb-6">Map tapping is too slow for someone in motion.</p>
              <p className="text-sm text-gray-600 mb-4">
                Autocomplete search restricted to navigable buildings. Users make decisions at tunnel entrances in real time, in coats and gloves.
              </p>
              <p className="text-sm font-semibold text-gray-900">Outcome: 45% faster than paper maps.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-500">Search UI screenshot</p>
            </div>
          </div>

          {/* Decision 4 */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-gray-100 rounded-lg p-8 text-center order-2 md:order-1">
              <p className="text-sm text-gray-500">Route result with timing</p>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Walking Time Estimates</h3>
              <p className="text-sm text-[#8B1538] font-semibold mb-3">Insight</p>
              <p className="text-gray-700 mb-6">Students need to compare indoor vs. outdoor instantly.</p>
              <p className="text-sm text-gray-600 mb-4">
                Walking time displayed for both route types. Users see the actual time cost of each choice.
              </p>
              <p className="text-sm font-semibold text-gray-900">Outcome: Enables informed, real-time decisions.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-12 text-center mt-16">
          <p className="text-sm text-gray-500">Live product screenshots</p>
        </div>
      </section>

      {/* Validation & Results */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">What Changed</h2>
        
        <p className="text-gray-700 mb-12 leading-relaxed">
          We tested with 25 users across three rounds. The metrics were secondary—what mattered was the behavior shift. Users stopped hesitating at tunnel entrances.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-[#8B1538] mb-2">82/100</p>
            <p className="text-sm font-semibold text-gray-900">System Usability Score</p>
            <p className="text-xs text-gray-600">Industry avg: 68</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-[#8B1538] mb-2">~90%</p>
            <p className="text-sm font-semibold text-gray-900">Routing Accuracy</p>
            <p className="text-xs text-gray-600">Target: ≥90% ✓</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-[#8B1538] mb-2">45%</p>
            <p className="text-sm font-semibold text-gray-900">Task Completion Speed</p>
            <p className="text-xs text-gray-600">vs. paper maps</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-[#8B1538] mb-2">70%</p>
            <p className="text-sm font-semibold text-gray-900">Mobile Adoption</p>
            <p className="text-xs text-gray-600">Real-world usage</p>
          </div>
        </div>

        <div className="bg-[#FDB913] p-6 rounded-lg mb-8">
          <p className="font-semibold text-gray-900 text-sm mb-2">Most Significant Finding</p>
          <p className="text-gray-800 text-sm">"The dual-color route visualization was the thing that made it actually useful. Immediately obvious."</p>
        </div>

        <div className="bg-white border-l-4 border-[#8B1538] p-6 rounded">
          <p className="font-semibold text-gray-900 text-sm mb-2">Known Scope</p>
          <p className="text-gray-700 text-sm">Minneapolis/St. Paul cross-linking excluded by design. Campus-specific solution, intentionally narrow.</p>
        </div>
      </section>

      {/* The Process */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-gray-50 -mx-4 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">How We Got Here</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <div className="font-semibold text-[#8B1538] text-sm min-w-24">Oct 15</div>
              <p className="text-sm text-gray-700">Figma prototype revealed map-tapping was too slow. Pivot to search.</p>
            </div>
            <div className="flex gap-4">
              <div className="font-semibold text-[#8B1538] text-sm min-w-24">Nov 3</div>
              <p className="text-sm text-gray-700">MVP shipped with basic routing + dual-color system.</p>
            </div>
            <div className="flex gap-4">
              <div className="font-semibold text-[#8B1538] text-sm min-w-24">Nov 17</div>
              <p className="text-sm text-gray-700">Functional prototype added building-hour filtering.</p>
            </div>
            <div className="flex gap-4">
              <div className="font-semibold text-[#8B1538] text-sm min-w-24">Dec 9</div>
              <p className="text-sm text-gray-700">Final release. Two iterations from pilot feedback implemented.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-[#FDB913]">
            <p className="font-semibold text-gray-900 text-sm mb-2">Deliberate Scope</p>
            <p className="text-gray-700 text-sm mb-3">What we didn't build: real-time API syncing, turn-by-turn navigation, schedule integration. We cut to ship a reliable core.</p>
            <p className="text-gray-600 text-xs italic">"Cut deliberately to own something, not to save time."</p>
          </div>
        </div>
      </section>

      {/* Live & Forward */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Now</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Campus-Sync launched December 9, 2025. The product is live at campus-sync.org and currently serving 50,000+ students daily.
          </p>
          <p className="text-gray-600 text-sm mb-8">
            The next phase will integrate real-time API updates with facilities management. We've already identified the integration points. But first, we're observing how students use the core product in the wild.
          </p>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-semibold text-gray-900">Team:</span> Nick Kanning, Chandan Umesh Pai, Saad Saleem, David Tomlinson</p>
            <p><span className="font-semibold text-gray-900">Guided by:</span> Prof. Kathryn Wust & Prof. Scott Hareland</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-200 mt-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-[#8B1538] hover:underline font-semibold text-sm">
            ← Back to Portfolio
          </Link>
          <Link href="/manufacturing-workflow" className="text-[#8B1538] hover:underline font-semibold text-sm">
            Next Project →
          </Link>
        </div>
      </section>
      </div>
    </main>
  );
}
