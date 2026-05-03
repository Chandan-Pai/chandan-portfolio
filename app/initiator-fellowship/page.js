'use client';
 
import Link from 'next/link';
import { useState, useEffect } from 'react';

/** Encode path segments so filenames with spaces or parens work on GitHub Pages. */
function publicAssetUrl(basePath, relativePath) {
  const encoded = relativePath
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
  if (!basePath) return `/${encoded}`;
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${base}/${encoded}`;
}

function ImageWithStats({ src, alt, statValue, statDetail }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="card cursor-pointer"
        data-no-cursor-hover
        data-cursor-expand
        onClick={() => setIsOpen(true)}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img src={src} alt={alt} />
        <section>
          <h2>{statValue}</h2>
          <p>{statDetail}</p>
          <div>
            <button type="button">Expand</button>
          </div>
        </section>
      </div>
 
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-6xl w-full mx-4 flex gap-6">
            <div className="flex-1">
              <img
                src={src}
                alt={alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="w-64 flex items-center">
              <div className="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-lg w-full">
                <p className="text-sm font-semibold text-sky-900 mb-2">Research Method</p>
                <p className="text-3xl font-bold text-sky-800 mb-3">{statValue}</p>
                <p className="text-sm text-sky-700">{statDetail}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
 
function ImageModal({ src, alt, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-6xl max-h-[90vh] w-full mx-4">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
 
function HoverableImage({ src, alt, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={`cursor-pointer group relative overflow-hidden rounded border border-slate-300 transition-all duration-300 hover:shadow-lg hover:scale-105 ${className}`}
        data-no-cursor-hover
        data-cursor-expand
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <span className="text-white/0 group-hover:text-white/100 text-sm font-semibold transition-all duration-300">
            Click to expand
          </span>
        </div>
      </div>
      <ImageModal src={src} alt={alt} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}


 
export default function InitiatorFellowshipPage() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const asset = (rel) => publicAssetUrl(BASE_PATH, rel);
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
        <div className="fixed left-4 z-[45] lg:left-6 top-[calc(env(safe-area-inset-top,0px)+5rem)] lg:top-6">
          <Link
            href="/"
            aria-label="Back to portfolio"
            data-no-cursor-hover
            className={`inline-flex items-center gap-3 rounded-full px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/30 transition-all ${isDarkSection ? 'text-white' : 'text-gray-900'}`}
          >
            <svg className={`w-4 h-4 ${isDarkSection ? 'text-white' : 'text-gray-900'}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`text-sm font-semibold ${isDarkSection ? 'text-white' : 'text-gray-900'}`}>Back to Portfolio</span>
          </Link>
        </div>

        <header className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white pt-28 pb-20 md:pt-32 md:pb-24">
          <div className="project-gutter-x w-full min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Initiator Fellowship Website Redesign
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              Accessibility-first redesign bridging WCAG compliance and usable navigation
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-6">
              <span>
                <span className="font-semibold text-white">Role:</span> UX Researcher &amp; Accessibility Specialist
              </span>
              <span>
                <span className="font-semibold text-white">Team:</span> Neha Aramkuni, Vaishnavi Venkatasubramanian, Ajaydeep Singh, Chandan Pai, Vikram Selvakumaranraja
              </span>
              <span>
                <span className="font-semibold text-white">Impact:</span> 2.3/5 → 4.7/5 usability • 104% increase • WCAG 2.1 AA
              </span>
            </div>
          </div>
        </header>

        <div className="project-gutter-x w-full min-w-0 -mt-8 relative z-10">
          <img
            src={asset('images/initiator-fellowship/screenshot-rocks.png')}
            alt="Initiator Fellowship website before and after"
            className="w-full rounded-xl shadow-lg border border-slate-200/80"
          />
        </div>
 
        {/* OPENING PROBLEM */}
        <section id="problem" className="w-full py-12 border-t border-slate-200">
          <div className="project-gutter-x w-full min-w-0">
          <div className="prose prose-sm max-w-none">
            <p>A potential fellowship applicant visits the Initiator Fellowship website, excited to learn about the program. Within 90 seconds, she closes the tab.</p>
            <p>Not because she wasn't qualified. Not because the program wasn't right for her. But because she couldn't find the eligibility criteria.</p>
            <p>When we tested the site, this pattern repeated. Every single participant struggled with the same task: figure out if they could apply. The information existed—buried at the bottom of a page, hidden in an FAQ section, wrapped in confusing navigation.</p>
          </div>
          </div>
        </section>
 
        {/* PROBLEM SECTION */}
        <section id="usability-crisis" className="w-full py-12 border-t border-slate-200">
          <div className="project-gutter-x w-full min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">The Usability Crisis</h2>
            <p className="text-lg text-slate-600 mb-8">The Initiator Fellowship supports next-generation social entrepreneurs across Greater Minnesota. But the website—their primary recruitment tool—was actively preventing qualified candidates from applying.</p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { title: 'WCAG Non-Compliance', desc: 'Color contrast failures, no accessibility standards met' },
                { title: 'Hidden Eligibility', desc: 'Application criteria buried in FAQ at page bottom' },
                { title: 'Dual Navigation Bars', desc: 'Confusing layout in half-screen view' },
                { title: 'No Form Feedback', desc: "Users couldn't tell what they did wrong when submitting" }
              ].map((issue, i) => (
                <div key={i} className="border-l-4 border-slate-400 pl-4 py-2">
                  <p className="font-semibold text-slate-800">{issue.title}</p>
                  <p className="text-sm text-slate-600">{issue.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <HoverableImage src={asset('images/initiator-fellowship/screenshot-rocks.png')} alt="Screenshot 1" />
              <HoverableImage src={asset('images/initiator-fellowship/screenshot-rocks(1).png')} alt="Screenshot 2" />
              <HoverableImage src={asset('images/initiator-fellowship/screenshot-rocks(2).png')} alt="Screenshot 3" />
            </div>
          </div>
        </section>
 
        {/* RESEARCH APPROACH */}
        <section id="research" className="w-full py-12 border-t border-slate-200">
          <div className="project-gutter-x w-full min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Mixed-Methods UX Research</h2>
            <p className="text-lg text-slate-600 mb-8">We combined heuristic evaluation, task analysis, and user testing to identify root causes—not just symptoms.</p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { title: 'Heuristic Evaluation', desc: "Applied Nielsen's 10 usability principles. Identified violations across consistency, feedback, and recognition heuristics." },
                { title: 'Hierarchical Task Analysis', desc: 'Mapped 4 critical user flows: learning about fellowship, finding eligibility, applying, contacting staff.' },
                { title: 'Card Sorting (n=5)', desc: 'Participants organized content to reveal natural information architecture patterns.' },
                { title: 'User Testing (n=5)', desc: '3 scenarios tested on both old and new sites. Measured task completion time, post-task ratings, qualitative feedback.' }
              ].map((method, i) => (
                <div key={i} className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                  <p className="font-semibold text-sky-900 mb-2">{method.title}</p>
                  <p className="text-sm text-slate-700">{method.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
              <HoverableImage src={asset('images/initiator-fellowship/graphicaltaskanalysis.png')} alt="HTA diagram" statValue="HTA" statDetail="Hierarchical Task Analysis" />
              <HoverableImage src={asset('images/initiator-fellowship/Cardsorting.png')} alt="Card sorting" statValue="Card Sorting" statDetail="User-Centered Content Organization" />
              <HoverableImage src={asset('images/initiator-fellowship/timetake(oldwebsite).png')} alt="User testing" statValue="User Testing" statDetail="Usability Evaluation" />
            </div>
          </div>
        </section>
 
        {/* KEY INSIGHTS */}
        <section id="insights" className="w-full py-12 border-t border-slate-200">
          <div className="project-gutter-x w-full min-w-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Key Insights</h2>
          {[
            { 
              title: 'Disconnected Application Process', 
              problem: "Users couldn't track where they were in the application workflow. Timeline, criteria, and tracking were scattered across pages.", 
              solution: "Unified 'Apply' section with integrated criteria, timeline, application form, and tracking—all in one pathway.", 
              figs: [
                { num: 4.1, src: asset('images/initiator-fellowship/currentuserflow.png'), alt: 'Disconnected application process - before' },
                { num: 4.3, src: asset('images/initiator-fellowship/newuserflow.png'), alt: 'New application flow' },
              ] 
            },
            { 
              title: 'Overwhelming Homepage', 
              problem: "Large text blocks, no visual hierarchy. Users couldn't identify what to do first.", 
              solution: 'Redesigned as central navigation hub with clear section blocks: Program, Apply, Members, Contact.', 
              figs: [
                { num: 4.5, src: asset('images/initiator-fellowship/screenshot-rocks.png'), alt: 'Homepage - before' },
                { num: 4.6, src: asset('images/initiator-fellowship/currentuserflow.png'), alt: 'Homepage - after' },
                { num: 4.7, src: asset('images/initiator-fellowship/homepagenew.png'), alt: 'Navigation blocks' },
                { num: 4.8, src: asset('images/initiator-fellowship/newuserflow.png'), alt: 'Homepage details' }
              ] 
            },
            { 
              title: 'Hidden Program Details', 
              problem: 'Benefits and coverage areas scattered inside long paragraphs across multiple pages.', 
              solution: 'Consolidated Program page with structured sections, timeline graphic, bite-sized content chunks.', 
              figs: [
                { num: 4.9, src: asset('images/initiator-fellowship/screenshot-rocks(1).png'), alt: 'Program page - before' },
                { num: 4.10, src: asset('images/initiator-fellowship/screenshot-rocks(2).png'), alt: 'Program page - after' }
              ] 
            },
            { 
              title: 'Poor Contact Integration', 
              problem: 'Program manager info buried in general contact section. No confirmation after form submission.', 
              solution: "Manager details moved to Resources page. Contact Us button in top nav. Confirmation message: 'Message received, response in 2-3 business days.'", 
              figs: [
                { num: 4.11, src: asset('images/initiator-fellowship/ContactBefore.png'), alt: 'Contact section - before' },
                { num: 4.12, src: asset('images/initiator-fellowship/ContactAfter.png'), alt: 'Contact section - after' },
                { num: 4.13, src: asset('images/initiator-fellowship/managerafter.png'), alt: 'Manager details' },
                { num: 4.14, src: asset('images/initiator-fellowship/confirmationmessage.png'), alt: 'Confirmation message' }
              ] 
            }
          ].map((insight, i) => (
            <div key={i} className="mb-12 pb-12 border-b border-slate-200 last:border-b-0">
              <h3 className="text-2xl font-semibold mb-4">{insight.title}</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">PROBLEM</p>
                  <p className="text-slate-700">{insight.problem}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-sky-700 mb-2">SOLUTION</p>
                  <p className="text-slate-700">{insight.solution}</p>
                </div>
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${insight.figs.length}, 1fr)` }}>
                {insight.figs.map((fig) => (
                  <div key={fig.num} className="relative">
                    <HoverableImage 
                      src={fig.src} 
                      alt={fig.alt}
                      className="h-80 w-full"
                    />
                    <p className="text-xs text-slate-500 text-center mt-2">Figure {fig.num}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </section>
 
        {/* IMPACT METRICS */}
        <section id="impact" className="w-full py-12 border-t border-slate-200">
          <div className="project-gutter-x w-full min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Impact Metrics</h2>
            {[
              {
                title: 'Average Post-Task Rating Improvement',
                problem: 'Users rated task ease on the old website at 2.3/5 on average, indicating significant difficulty with navigation and information discovery.',
                solution: 'Redesigned with clear information hierarchy, streamlined workflows, and intuitive navigation to reduce cognitive load.',
                metric: '2.3/5 → 4.7/5',
                increase: '+104% improvement',
                detail: 'Post-task System Usability Scale (SUS) scores across n=5 participants',
                figs: [
                  { num: 'Old Website', src: asset('images/initiator-fellowship/posttaskold.png'), alt: 'Old Website Post-Task Ratings' },
                  { num: 'Prototype', src: asset('images/initiator-fellowship/posttasknew.png'), alt: 'Prototype Post-Task Ratings' },
                  { num: 'Average', src: asset('images/initiator-fellowship/avgposttaskrating.png'), alt: 'Average Post-Task Rating Comparison' }
                ]
              },
              {
                title: 'Task Completion Time: Old Website',
                problem: 'Participants spent excessive time navigating the current website due to scattered information and poor information architecture.',
                solution: 'Consolidated all critical information into unified pathways with clear visual hierarchy and progress indicators.',
                metric: 'Scenario 1: 6m 24s avg',
                detail: 'Scenario 2: 4m 18s avg | Scenario 3: 5m 12s avg',
                figs: [
                  { num: 'Old Website', src: asset('images/initiator-fellowship/timetake(oldwebsite).png'), alt: 'Time per Participant - Old Website' }
                ]
              },
              {
                title: 'Task Completion Time: Prototype',
                problem: 'Initial prototype had some responsiveness issues on smaller screens, but overall performance was significantly better.',
                solution: 'Streamlined application process, integrated eligibility criteria, and unified navigation reduced overall completion time.',
                metric: 'Scenario 1: 2m 45s avg',
                detail: 'Scenario 2: 1m 52s avg | Scenario 3: 3m 08s avg (larger due to Macbook screen constraints)',
                figs: [
                  { num: 5.5, src: asset('images/initiator-fellowship/timetake(newwebsite).png'), alt: 'Time per Participant - Prototype' },
                  { num: 5.6, src: asset('images/initiator-fellowship/avgtimetaken.png'), alt: 'Average Time Comparison by Scenario' }
                ]
              },
              
            ].map((metric, i) => (
              <div key={i} className="mb-12 pb-12 border-b border-slate-200 last:border-b-0">
                <h3 className="text-2xl font-semibold mb-4">{metric.title}</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-2">CHALLENGE</p>
                    <p className="text-slate-700">{metric.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sky-700 mb-2">SOLUTION</p>
                    <p className="text-slate-700">{metric.solution}</p>
                  </div>
                </div>
                <div className="mb-6 bg-gradient-to-r from-slate-100 to-sky-50 border border-sky-200 rounded-lg p-6">
                  <p className="text-sm text-slate-600 uppercase tracking-wide mb-2">Measured Impact</p>
                  <p className="text-3xl sm:text-4xl font-bold text-sky-800 mb-1">{metric.metric}</p>
                  <p className="text-lg font-semibold text-sky-700">{metric.increase}</p>
                  {metric.detail && <p className="text-sm text-slate-600 mt-3">{metric.detail}</p>}
                </div>
                {metric.figs && (
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${metric.figs.length}, 1fr)` }}>
                    {metric.figs.map((fig) => (
                      <div key={fig.num} className="relative">
                        <HoverableImage 
                          src={fig.src} 
                          alt={fig.alt}
                          className={fig.num === 'Old Website' ? "h-96 w-full" : "h-80 w-full"}
                        />
                        <p className="text-xs text-slate-500 text-center mt-2">Figure {fig.num}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
 
        {/* USER QUOTE */}
        <section id="quote" className="w-full py-12 border-t border-slate-200">
          <div className="project-gutter-x w-full min-w-0">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Most Impactful Change</h3>
          <blockquote className="text-2xl font-semibold italic text-slate-800 mb-3 pl-6 border-l-4 border-sky-500">
            "The new site made me feel like the fellowship actually wanted me to apply. Everything was clear, organized, and I knew exactly what to do next."
          </blockquote>
          <p className="text-sm text-slate-600">Participant feedback, Round 3 user testing</p>
          </div>
        </section>
 
        {/* DELIVERABLES */}
        <section id="deliverables" className="w-full py-12 border-t border-slate-200">
          <div className="project-gutter-x w-full min-w-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">What We Shipped</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            {[
              { title: 'Figma Prototype', desc: 'Interactive high-fidelity prototype with full user flows' },
              { title: 'Accessibility Audit', desc: 'WCAG 2.1 AA compliance documentation' },
              { title: 'User Testing Report', desc: 'Complete findings, recommendations, and iteration documentation' },
              { title: 'HTA Documentation', desc: 'Task flow analysis for all critical pathways' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="font-semibold mb-2">{item.title}</p>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          
          {/* PROTOTYPE SCREENSHOTS */}
          <div className="mb-8 w-full min-w-0">
            <h3 className="text-2xl font-semibold mb-6">Interactive Prototype Screens</h3>
            
            {/* Interactive Figma Embed */}
              <div className="mb-12 w-full min-w-0 aspect-video rounded-lg overflow-hidden border border-slate-300 shadow-lg">
              <iframe
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  width: '100%',
                  height: '100%'
                }}
                src="https://embed.figma.com/proto/dHJku6xJ448RkamNTetvyD/IE4511_GroupProject--Copy-?node-id=23-3&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=23%3A3&embed-host=share"
                allowFullScreen
              />
            </div>
          </div>
          </div>
        </section>
 
        {/* REFLECTION */}
        <section id="reflection" className="w-full py-12 border-t border-slate-200">
          <div className="project-gutter-x w-full min-w-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Designing for Real Impact</h2>
          <div className="prose prose-sm max-w-none mb-8">
            <p>This project reinforced something critical: accessibility isn't a checklist—it's a design philosophy. Every decision we made started with "Can someone who needs this fellowship actually use this site?" WCAG compliance was the baseline. Usable navigation was the goal. A 104% usability increase meant we achieved both.</p>
          </div>
          <blockquote className="text-lg italic text-slate-700 pl-6 border-l-4 border-slate-300 mb-6">
            "Good UX research doesn't just find problems. It builds consensus around solutions."
          </blockquote>
          <div className="text-sm text-slate-600">
            <p className="mb-2"><span className="font-semibold">Team:</span> Neha Aramkuni, Vaishnavi Venkatasubramanian, Ajaydeep Singh, Chandan Pai, Vikram Selvakumaranraja</p>
            <p><span className="font-semibold">Course:</span> IE 4511 — December 2024</p>
          </div>
          </div>
        </section>
 
        {/* FOOTER NAV */}
        <footer className="w-full border-t border-slate-200 py-12">
          <div className="project-gutter-x w-full min-w-0 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition">
            ← Back to Portfolio
          </Link>
          <Link href="/campus-sync" className="text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition">
            Next Project →
          </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}