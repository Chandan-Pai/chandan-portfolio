'use client';
 
import Link from 'next/link';
import { useState, useEffect } from 'react';
 
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return (
    <div className="text-right w-20 flex-shrink-0">
      <div className="text-white text-xs font-medium leading-tight">{timeStr}</div>
      <div className="text-slate-400 text-xs leading-tight">{dateStr}</div>
    </div>
  );
}
 
function ImageWithStats({ src, alt, statValue, statDetail }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="card cursor-pointer"
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
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg w-full">
                <p className="text-sm font-semibold text-blue-900 mb-2">Research Method</p>
                <p className="text-3xl font-bold text-blue-700 mb-3">{statValue}</p>
                <p className="text-sm text-blue-600">{statDetail}</p>
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
  const [isDarkSection, setIsDarkSection] = useState(true);
  const [navExpanded, setNavExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: '', alt: '' });
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  const isExpanded = !scrolled || navExpanded;
 
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Top blur bar */}
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
            background: 'rgba(0, 0, 0, 0.8)',
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
                <Link href="/Chandan_Pai_HF_Engineer.pdf" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">Resume</Link>
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
            className={`inline-flex items-center gap-3 rounded-full px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/30 transition-all ${isDarkSection ? 'text-white' : 'text-gray-900'}`}
          >
            <svg className={`w-4 h-4 ${isDarkSection ? 'text-black' : 'text-gray-900'}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`text-sm font-semibold ${isDarkSection ? 'text-black' : 'text-gray-900'}`}>Back to Portfolio</span>
          </Link>
        </div>
 
        {/* HERO IMAGE */}
        <section className="w-full bg-gradient-to-r from-green-900 to-green-700 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <img
              src="/chandan-portfolio/images/initiator-fellowship/screenshot-rocks.png"
              alt="Initiator Fellowship website before and after"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </section>
 
        {/* TITLE SECTION */}
        <section className="w-full px-6 py-12 border-t border-slate-200">
          <h1 className="text-5xl font-bold mb-4">Initiator Fellowship Website Redesign</h1>
          <p className="text-xl text-slate-600 mb-8">Accessibility-first redesign bridging WCAG compliance and usable navigation</p>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide">Role</p>
              <p className="text-base font-medium">UX Researcher & Accessibility Specialist</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide">Team</p>
              <p className="text-base font-medium">Neha Aramkuni, Vaishnavi Venkatasubramanian, Ajaydeep Singh, Chandan Pai, Vikram Selvakumaranraja</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide">Impact</p>
              <p className="text-base font-medium">2.3/5 → 4.7/5 usability • 104% increase • WCAG 2.1 AA</p>
            </div>
          </div>
        </section>
 
        {/* OPENING PROBLEM */}
        <section className="w-full px-6 py-12 border-t border-slate-200">
          <div className="prose prose-sm max-w-3xl">
            <p>A potential fellowship applicant visits the Initiator Fellowship website, excited to learn about the program. Within 90 seconds, she closes the tab.</p>
            <p>Not because she wasn't qualified. Not because the program wasn't right for her. But because she couldn't find the eligibility criteria.</p>
            <p>When we tested the site, this pattern repeated. Every single participant struggled with the same task: figure out if they could apply. The information existed—buried at the bottom of a page, hidden in an FAQ section, wrapped in confusing navigation.</p>
          </div>
        </section>
 
        {/* PROBLEM SECTION */}
        <section className="w-full px-6 py-12 border-t border-slate-200">
          <div className="max-w-8xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">The Usability Crisis</h2>
            <p className="text-lg text-slate-600 mb-8">The Initiator Fellowship supports next-generation social entrepreneurs across Greater Minnesota. But the website—their primary recruitment tool—was actively preventing qualified candidates from applying.</p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { title: 'WCAG Non-Compliance', desc: 'Color contrast failures, no accessibility standards met' },
                { title: 'Hidden Eligibility', desc: 'Application criteria buried in FAQ at page bottom' },
                { title: 'Dual Navigation Bars', desc: 'Confusing layout in half-screen view' },
                { title: 'No Form Feedback', desc: "Users couldn't tell what they did wrong when submitting" }
              ].map((issue, i) => (
                <div key={i} className="border-l-4 border-red-500 pl-4 py-2">
                  <p className="font-semibold text-red-700">{issue.title}</p>
                  <p className="text-sm text-slate-600">{issue.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <HoverableImage src="/chandan-portfolio/images/initiator-fellowship/screenshot-rocks.png" alt="Screenshot 1" />
              <HoverableImage src="/chandan-portfolio/images/initiator-fellowship/screenshot-rocks (1).png" alt="Screenshot 2" />
              <HoverableImage src="/chandan-portfolio/images/initiator-fellowship/screenshot-rocks (2).png" alt="Screenshot 3" />
            </div>
          </div>
        </section>
 
        {/* RESEARCH APPROACH */}
        <section className="w-full px-6 py-12 border-t border-slate-200">
          <div className="max-w-8xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Mixed-Methods UX Research</h2>
            <p className="text-lg text-slate-600 mb-8">We combined heuristic evaluation, task analysis, and user testing to identify root causes—not just symptoms.</p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { title: 'Heuristic Evaluation', desc: "Applied Nielsen's 10 usability principles. Identified violations across consistency, feedback, and recognition heuristics." },
                { title: 'Hierarchical Task Analysis', desc: 'Mapped 4 critical user flows: learning about fellowship, finding eligibility, applying, contacting staff.' },
                { title: 'Card Sorting (n=5)', desc: 'Participants organized content to reveal natural information architecture patterns.' },
                { title: 'User Testing (n=5)', desc: '3 scenarios tested on both old and new sites. Measured task completion time, post-task ratings, qualitative feedback.' }
              ].map((method, i) => (
                <div key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-2">{method.title}</p>
                  <p className="text-sm text-slate-700">{method.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
              <HoverableImage src="/chandan-portfolio/images/initiator-fellowship/graphicaltaskanalysis.png" alt="HTA diagram" statValue="HTA" statDetail="Hierarchical Task Analysis" />
              <HoverableImage src="/chandan-portfolio/images/initiator-fellowship/Cardsorting.png" alt="Card sorting" statValue="Card Sorting" statDetail="User-Centered Content Organization" />
              <HoverableImage src="/chandan-portfolio/images/initiator-fellowship/timetake(oldwebsite).png" alt="User testing" statValue="User Testing" statDetail="Usability Evaluation" />
            </div>
          </div>
        </section>
 
        {/* KEY INSIGHTS */}
        <section className="w-full px-10 py-12 border-t border-slate-200">
          <h2 className="text-4xl font-bold mb-8">Key Insights</h2>
          {[
            { 
              title: 'Disconnected Application Process', 
              problem: "Users couldn't track where they were in the application workflow. Timeline, criteria, and tracking were scattered across pages.", 
              solution: "Unified 'Apply' section with integrated criteria, timeline, application form, and tracking—all in one pathway.", 
              figs: [
                { num: 4.1, src: '/chandan-portfolio/images/initiator-fellowship/Currentuserflow.png', alt: 'Disconnected application process - before' },
                { num: 4.3, src: '/chandan-portfolio/images/initiator-fellowship/newuserflow.png', alt: 'New application flow' },
              ] 
            },
            { 
              title: 'Overwhelming Homepage', 
              problem: "Large text blocks, no visual hierarchy. Users couldn't identify what to do first.", 
              solution: 'Redesigned as central navigation hub with clear section blocks: Program, Apply, Members, Contact.', 
              figs: [
                { num: 4.5, src: '/chandan-portfolio/images/initiator-fellowship/screenshot-rocks.png', alt: 'Homepage - before' },
                { num: 4.6, src: '/chandan-portfolio/images/initiator-fellowship/Currentuserflow.png', alt: 'Homepage - after' },
                { num: 4.7, src: '/chandan-portfolio/images/initiator-fellowship/homepagenew.png', alt: 'Navigation blocks' },
                { num: 4.8, src: '/chandan-portfolio/images/initiator-fellowship/newuserflow.png', alt: 'Homepage details' }
              ] 
            },
            { 
              title: 'Hidden Program Details', 
              problem: 'Benefits and coverage areas scattered inside long paragraphs across multiple pages.', 
              solution: 'Consolidated Program page with structured sections, timeline graphic, bite-sized content chunks.', 
              figs: [
                { num: 4.9, src: '/chandan-portfolio/images/initiator-fellowship/screenshot-rocks(1).png', alt: 'Program page - before' },
                { num: 4.10, src: '/chandan-portfolio/images/initiator-fellowship/screenshot-rocks(2).png', alt: 'Program page - after' }
              ] 
            },
            { 
              title: 'Poor Contact Integration', 
              problem: 'Program manager info buried in general contact section. No confirmation after form submission.', 
              solution: "Manager details moved to Resources page. Contact Us button in top nav. Confirmation message: 'Message received, response in 2-3 business days.'", 
              figs: [
                { num: 4.11, src: '/chandan-portfolio/images/initiator-fellowship/contactbefore.png', alt: 'Contact section - before' },
                { num: 4.12, src: '/chandan-portfolio/images/initiator-fellowship/contactafter.png', alt: 'Contact section - after' },
                { num: 4.13, src: '/chandan-portfolio/images/initiator-fellowship/managerafter.png', alt: 'Manager details' },
                { num: 4.14, src: '/chandan-portfolio/images/initiator-fellowship/confirmationmessage.png', alt: 'Confirmation message' }
              ] 
            }
          ].map((insight, i) => (
            <div key={i} className="mb-12 pb-12 border-b border-slate-200 last:border-b-0">
              <h3 className="text-2xl font-semibold mb-4">{insight.title}</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm font-semibold text-red-700 mb-2">PROBLEM</p>
                  <p className="text-slate-700">{insight.problem}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-700 mb-2">SOLUTION</p>
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
        </section>
 
        {/* IMPACT METRICS */}
        <section className="w-full px-10 py-12 border-t border-slate-200">
          <div className="max-w-8xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Impact Metrics</h2>
            {[
              {
                title: 'Average Post-Task Rating Improvement',
                problem: 'Users rated task ease on the old website at 2.3/5 on average, indicating significant difficulty with navigation and information discovery.',
                solution: 'Redesigned with clear information hierarchy, streamlined workflows, and intuitive navigation to reduce cognitive load.',
                metric: '2.3/5 → 4.7/5',
                increase: '+104% improvement',
                detail: 'Post-task System Usability Scale (SUS) scores across n=5 participants',
                figs: [
                  { num: 'Old Website', src: '/chandan-portfolio/images/initiator-fellowship/posttaskold.png', alt: 'Old Website Post-Task Ratings' },
                  { num: 'Prototype', src: '/chandan-portfolio/images/initiator-fellowship/posttasknew.png', alt: 'Prototype Post-Task Ratings' },
                  { num: 'Average', src: '/chandan-portfolio/images/initiator-fellowship/avgposttaskrating.png', alt: 'Average Post-Task Rating Comparison' }
                ]
              },
              {
                title: 'Task Completion Time: Old Website',
                problem: 'Participants spent excessive time navigating the current website due to scattered information and poor information architecture.',
                solution: 'Consolidated all critical information into unified pathways with clear visual hierarchy and progress indicators.',
                metric: 'Scenario 1: 6m 24s avg',
                detail: 'Scenario 2: 4m 18s avg | Scenario 3: 5m 12s avg',
                figs: [
                  { num: 'Old Website', src: '/chandan-portfolio/images/initiator-fellowship/timetake(old website).png', alt: 'Time per Participant - Old Website' }
                ]
              },
              {
                title: 'Task Completion Time: Prototype',
                problem: 'Initial prototype had some responsiveness issues on smaller screens, but overall performance was significantly better.',
                solution: 'Streamlined application process, integrated eligibility criteria, and unified navigation reduced overall completion time.',
                metric: 'Scenario 1: 2m 45s avg',
                detail: 'Scenario 2: 1m 52s avg | Scenario 3: 3m 08s avg (larger due to Macbook screen constraints)',
                figs: [
                  { num: 5.5, src: '/chandan-portfolio/images/initiator-fellowship/timetake(newwebsite).png', alt: 'Time per Participant - Prototype' },
                  { num: 5.6, src: '/chandan-portfolio/images/initiator-fellowship/avgtimetaken.png', alt: 'Average Time Comparison by Scenario' }
                ]
              },
              
            ].map((metric, i) => (
              <div key={i} className="mb-12 pb-12 border-b border-slate-200 last:border-b-0">
                <h3 className="text-2xl font-semibold mb-4">{metric.title}</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-red-700 mb-2">CHALLENGE</p>
                    <p className="text-slate-700">{metric.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-700 mb-2">SOLUTION</p>
                    <p className="text-slate-700">{metric.solution}</p>
                  </div>
                </div>
                <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                  <p className="text-sm text-slate-600 uppercase tracking-wide mb-2">Measured Impact</p>
                  <p className="text-4xl font-bold text-green-700 mb-1">{metric.metric}</p>
                  <p className="text-lg font-semibold text-green-600">{metric.increase}</p>
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
        <section className="w-full px-6 py-12 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Most Impactful Change</h3>
          <blockquote className="text-2xl font-semibold italic text-slate-800 mb-3 pl-6 border-l-4 border-green-500">
            "The new site made me feel like the fellowship actually wanted me to apply. Everything was clear, organized, and I knew exactly what to do next."
          </blockquote>
          <p className="text-sm text-slate-600">Participant feedback, Round 3 user testing</p>
        </section>
 
        {/* DELIVERABLES */}
        <section className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200">
          <h2 className="text-4xl font-bold mb-8">What We Shipped</h2>
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
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Prototype Screens</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: 'Home', src: '/chandan-portfolio/images/initiator-fellowship/protohome.png', alt: 'Home Page - Prototype', title: 'Home' },
                { num: 'Program', src: '/chandan-portfolio/images/initiator-fellowship/proprogram.png', alt: 'Program Page - Prototype', title: 'Program' },
                { num: 'Fellows', src: '/chandan-portfolio/images/initiator-fellowship/protofellows.png', alt: 'Fellows Page - Prototype', title: 'Fellows' },
                { num: 'Resources', src: '/chandan-portfolio/images/initiator-fellowship/protoresources.png', alt: 'Resources Page - Prototype', title: 'Resources' }
              ].map((fig) => (
                <div key={fig.num} className="relative group">
                  <HoverableImage
                    src={fig.src}
                    alt={fig.alt}
                    className="h-96 w-full rounded-lg border border-slate-300"
                  />
                  <div className="mt-3">
                    <p className="font-semibold text-slate-900 mb-1">{fig.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* REFLECTION */}
        <section className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200">
          <h2 className="text-4xl font-bold mb-6">Designing for Real Impact</h2>
          <div className="prose prose-sm max-w-3xl mb-8">
            <p>This project reinforced something critical: accessibility isn't a checklist—it's a design philosophy. Every decision we made started with "Can someone who needs this fellowship actually use this site?" WCAG compliance was the baseline. Usable navigation was the goal. A 104% usability increase meant we achieved both.</p>
          </div>
          <blockquote className="text-lg italic text-slate-700 pl-6 border-l-4 border-slate-300 mb-6">
            "Good UX research doesn't just find problems. It builds consensus around solutions."
          </blockquote>
          <div className="text-sm text-slate-600">
            <p className="mb-2"><span className="font-semibold">Team:</span> Neha Aramkuni, Vaishnavi Venkatasubramanian, Ajaydeep Singh, Chandan Pai, Vikram Selvakumaranraja</p>
            <p><span className="font-semibold">Course:</span> IE 4511 — December 2024</p>
          </div>
        </section>
 
        {/* FOOTER NAV */}
        <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 transition">
            ← Back to Portfolio
          </Link>
          <Link href="/mercedes-service-manual" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 transition">
            Next Project →
          </Link>
        </footer>
      </div>
    </main>
  );
}