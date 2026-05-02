'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LiveClock from '../components/LiveClock';

/** Path under `public/` (e.g. `images/campus sync/file.png`). Encodes spaces and `:` so assets work on GitHub Pages and all browsers. */
function publicUrl(basePath, relativePath) {
  const encoded = relativePath
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  if (!basePath) return `/${encoded}`;
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${base}/${encoded}`;
}

function HoverableImage({ src, alt, className = '', imgClassName = '' }) {
  return (
    <figure
      className={`group relative my-10 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 shadow-sm transition-shadow duration-300 hover:shadow-md ${className}`}
      data-no-cursor-hover
    >
      <img
        src={src}
        alt={alt}
        className={`block w-full h-auto rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.02] ${imgClassName}`}
      />
    </figure>
  );
}

/** iPhone 16 (6.1") logical portrait ≈ 393 × 852 pt — frame height for prototype strip. */
const UX_MOBILE_PROTOTYPES = [
  { file: 'images/campus sync/ux mobile prototye.png', alt: 'Mobile UX prototype screen 1' },
  { file: 'images/campus sync/ux mobile prototype 1.png', alt: 'Mobile UX prototype screen 2' },
  { file: 'images/campus sync/ux mobile prototype 2.png', alt: 'Mobile UX prototype screen 3' },
  { file: 'images/campus sync/ux mobile prototype 3.png', alt: 'Mobile UX prototype screen 4' },
  { file: 'images/campus sync/ux mobile protytpe 4.png', alt: 'Mobile UX prototype screen 5' },
];

function PrototypeIphoneRow({ basePath }) {
  return (
    <div
      className="flex flex-row flex-nowrap items-stretch gap-3 sm:gap-4 my-10 overflow-x-auto pb-4 snap-x snap-mandatory [-webkit-overflow-scrolling:touch]"
      role="list"
      aria-label="Mobile prototype screens, each framed at iPhone 16 portrait height (852pt max)"
    >
      {UX_MOBILE_PROTOTYPES.map(({ file, alt }) => (
        <figure
          key={file}
          role="listitem"
          className="group relative shrink-0 snap-start overflow-hidden rounded-[2.25rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl [aspect-ratio:393/852] h-[min(852px,82svh)]"
          data-no-cursor-hover
        >
          <img
            src={publicUrl(basePath, file)}
            alt={alt}
            className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </figure>
      ))}
    </div>
  );
}

function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`max-w-5xl mx-auto px-5 sm:px-8 py-14 ${className}`}>
      {title ? (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

function Subheading({ children, className = '' }) {
  return <h3 className={`text-xl font-semibold text-gray-900 mt-10 mb-3 ${className}`}>{children}</h3>;
}

function Body({ children, className = '' }) {
  return <p className={`text-gray-700 leading-relaxed mb-4 ${className}`}>{children}</p>;
}

export default function CampusSyncPage() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [isDarkSection, setIsDarkSection] = useState(true);
  const [navExpanded, setNavExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsDarkSection(window.scrollY < 640);
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = !scrolled || navExpanded;

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      <div
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          height: '80px',
          background: 'rgba(0, 0, 0, 0.01)',
          backdropFilter: 'blur(3px)',
          borderBottom: '1px solid transparent',
          backgroundImage:
            'linear-gradient(to right, rgba(100, 100, 100, 0.1) 0%, rgba(150, 150, 150, 0.4) 50%, rgba(100, 100, 100, 0.1) 100%)',
          backgroundClip: 'padding-box, border-box',
          backgroundOrigin: 'padding-box, border-box',
        }}
      />

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
                  <circle cx="12" cy="8" r="4" fill="white" />
                  <ellipse cx="12" cy="16" rx="6" ry="4" fill="white" />
                  <circle cx="10" cy="7" r="1" fill="black" />
                  <circle cx="14" cy="7" r="1" fill="black" />
                  <path d="M10 10 Q12 11 14 10" stroke="black" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
            ) : (
              <>
                <Link href="/" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">
                  Home
                </Link>
                <Link href="/#work" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">
                  Work
                </Link>
                <Link href="/About" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">
                  About
                </Link>
                <a
                  href={`${BASE_PATH}/resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap"
                >
                  Resume
                </a>
                <Link href="mailto:2000chandanpai@gmail.com" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">
                  Contact
                </Link>
              </>
            )}
          </div>
        </nav>
        <LiveClock />
      </div>

      <div className="min-h-screen bg-white text-gray-900">
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
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`text-sm font-semibold ${isDarkSection ? 'text-white' : 'text-gray-900'}`}>Back to Portfolio</span>
          </Link>
        </div>

        {/* Hero */}
        <header className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white px-5 sm:px-8 pt-28 pb-20 md:pt-32 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Campus-Sync: Gopher Tunnel Navigation System
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              Led end-to-end UX research and product design for a web application solving real navigation challenges for 50,000+ University of Minnesota students traversing 7+ miles of underground tunnels in harsh winters. Applied mixed-methods approach: contextual inquiry (shadowing 15 users in extreme weather), task analysis (mapping 40+ navigation scenarios), and iterative usability testing (3 rounds, n=25). Integrated campus mapping API with building access hours database. Achieved 80% user satisfaction (SUS: 82/100), 90% routing accuracy, 70% mobile adoption. Product deployed and serving daily active users.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-6">
              <span className="font-semibold text-white">UX Research &amp; Product Design</span>
              <span>December 9, 2025</span>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 -mt-8 relative z-10">
          <HoverableImage src={publicUrl(BASE_PATH, 'images/campus sync/current pdf.png')} alt="Campus tunnel map context" />
        </div>

        <Section id="problem" title="The Problem">
          <Body>
            We watched a student walk to a tunnel entrance, pause, look uncertain, then turn around and go outside in -20°F weather. She knew the tunnels existed. She just couldn&apos;t trust them.
          </Body>
          <Body>
            That one moment defined the project. The University of Minnesota&apos;s Gopher Way connects 7+ miles of underground tunnels and skyways across campus. On paper, it means students never have to brave a Minnesota winter between classes. In practice? Most students avoided it entirely.
          </Body>
          <Body>
            Not because they didn&apos;t know it existed. Because they couldn&apos;t predict whether their route would actually work. Building hours change. Doors lock without warning. One blocked entrance mid-route costs more time than just going outside. So students kept making the rational choice: take the guaranteed bad option over the uncertain good one.
          </Body>
          <Body>
            The data backed it up. Building hours were scattered across 12 different department websites. Official tunnel maps were static PDFs last updated in 2019. Google Maps routed outdoors. There was no single tool that put it together and students were paying the price every winter.
          </Body>
          <HoverableImage src={publicUrl(BASE_PATH, 'images/campus sync/images.jpeg')} alt="Winter campus navigation context" />
        </Section>

        <Section id="research" title="How We Found the Real Problem" className="bg-gray-50/80">
          <Subheading>Before we opened Figma, we went outside in September with the students.</Subheading>

          <Subheading>What We Saw vs. What We Expected</Subheading>
          <Body>
            We shadowed 15 students navigating campus during actual winter conditions — not in a lab, not via survey. What we expected: students struggling to find tunnel entrances. What we actually saw: students finding entrances just fine, then turning around anyway.
          </Body>
          <Body>
            The hesitation was the data point. Students were doing a mental risk calculation at every tunnel entrance: &quot;If this route is blocked halfway through, I&apos;ve lost more time than if I just go outside now.&quot; The problem wasn&apos;t awareness. It was predictability. That single insight changed everything about what we built.
          </Body>

          <Subheading>Mapping 40+ Scenarios</Subheading>
          <Body>
            We ran Hierarchical Task Analysis across 40+ navigation scenarios — from a simple 2-building hop to a complex multi-stop route during a building closure. The HTA revealed something counterintuitive: most campus navigation isn&apos;t long cross-campus trips. It&apos;s short 1–3 building hops. That meant our UI needed to optimize for a 10-second lookup, not a trip planner.
          </Body>
          <Body>
            The HTA also showed us exactly when building hours mattered: not at the start of a journey, but in the middle of one. Students weren&apos;t pre-planning routes at their desk — they were making decisions at tunnel entrances, in real time, in coats and gloves. The solution had to work in that moment.
          </Body>
          <PrototypeIphoneRow basePath={BASE_PATH} />

          <Subheading>Three Rounds of Testing</Subheading>
          <Body>
            We tested at every stage — Figma prototype, MVP, functional prototype — with 8, 10, and 7 participants respectively. Round 2 gave us our most important finding: users were following routes without realizing they&apos;d been sent outdoors. Single-color map lines looked identical whether they represented a tunnel or a sidewalk. That&apos;s where the maroon/gold visual system came from — not a design preference, a usability failure we observed and fixed.
          </Body>
        </Section>

        <Section id="process" title="How We Built It">
          <Subheading>Discover: The Predictability Problem</Subheading>
          <Body>
            Three weeks of field research produced one sentence that drove every decision: students don&apos;t avoid tunnels because they don&apos;t know about them — they avoid them because they can&apos;t trust them. Once we had that, scope became obvious. The product needed to guarantee route completeness, not just show tunnel paths.
          </Body>

          <Subheading>Define: What We Would and Wouldn&apos;t Build</Subheading>
          <Body>
            We made an explicit list of features we were NOT building: real-time building hour API updates, turn-by-turn indoor navigation, Minneapolis/St. Paul campus cross-linking, schedule integration. Every one of these was a real request from early user interviews. Every one of them was cut deliberately — not because they weren&apos;t valuable, but because they would have made it impossible to ship a reliable core product by December.
          </Body>
          <Body>
            Scope discipline is a design skill. We wrote a Project Scope Statement, got team sign-off on it in week two, and referenced it every time someone suggested adding a feature.
          </Body>
          <Body>
            On the ground, students were still reconciling scattered building hours and static PDF maps with what they saw on tunnel walls — official Gopher Way signage helped orient people, but it could not answer &quot;is this entire route open right now?&quot; That gap is what we designed against.
          </Body>
          <HoverableImage
            src={publicUrl(BASE_PATH, 'images/campus sync/images.jpeg')}
            alt="Existing Gopher Way tunnel and on-campus wayfinding context students navigated alongside physical signage"
          />

          <Subheading>Develop: Three Stages, Three Deployed Versions</Subheading>
          <Body className="font-semibold text-sky-700">October 15 — Figma Prototype</Body>
          <Body>
            Full interactive prototype before any code. Round 1 testing immediately surfaced that map-tap input was too slow for users in motion. We rebuilt around search-first input before writing a line of code — saving weeks of implementation rework.
          </Body>
          <p className="text-sm font-medium text-gray-500 mb-3">Selected Figma prototype screens (pre-code)</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <HoverableImage className="my-0" src={publicUrl(BASE_PATH, 'images/campus sync/screenshot-rocks.png')} alt="Figma prototype screen 1" />
            <HoverableImage className="my-0" src={publicUrl(BASE_PATH, 'images/campus sync/screenshot-rocks (1).png')} alt="Figma prototype screen 2" />
            <HoverableImage className="my-0" src={publicUrl(BASE_PATH, 'images/campus sync/screenshot-rocks (2).png')} alt="Figma prototype screen 3" />
          </div>
          <Body className="font-semibold text-sky-700">November 3 — MVP</Body>
          <Body>
            Live at{' '}
            <a href="https://campus-sync.org" className="text-sky-700 underline hover:no-underline" target="_blank" rel="noopener noreferrer">
              campus-sync.org
            </a>
            . Basic routing, map overlay, and the dual-color system. Maroon for tunnels. Gold for outdoor segments. University of Minnesota brand colors — immediately readable without a legend.
          </Body>
          <Body className="font-semibold text-sky-700">November 17 — Functional Prototype</Body>
          <Body>
            Building-hour filtering integrated directly into the routing engine. The algorithm queries current building access status before pathfinding, so it never suggests a route through a locked building. Validated at 90%+ accuracy against 20 manually-verified routes.
          </Body>

          <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm my-10">
            <video className="w-full h-auto max-h-[520px] object-cover" autoPlay loop muted playsInline>
              <source src={publicUrl(BASE_PATH, 'images/campus sync/home page.mp4')} type="video/mp4" />
            </video>
          </div>

          <Subheading className="mt-14 border-t border-gray-200 pt-12 scroll-mt-24">
            The Decision That Changed Everything
          </Subheading>
          <p className="text-lg font-semibold text-gray-900 mb-4">Why We Moved from Mobile App to Web Product</p>
          <Body>
            The Figma prototype started as a native mobile app — login screen, bottom navigation bar, map-tap input. It felt like the right instinct: students use their phones, so build for phones. But the first prototype wasn&apos;t really about the interface. It was about answering a more fundamental question: would students actually use a tool like this at all, or would they keep defaulting to going outside?
          </Body>
          <Body>
            That phase gave us our answer — and something we didn&apos;t expect. Students found the app concept intuitive enough to navigate, but the learning curve of a new installed app created friction before they even got to the routing. They needed to understand what the product did before they could trust it. A native app asks users to commit before they&apos;ve seen the value.
          </Body>
          <Body>
            So we made the call to ship as a web product instead. No download. No login. Open a link, type two buildings, get a route. The barrier to first use dropped to zero — which mattered enormously for a product that students had to trust enough to use mid-route, in a coat, in the cold. The web format let the product prove itself before asking anything of the user.
          </Body>
          <Body className="mb-0">
            The first prototype wasn&apos;t a failed design. It was the research that made the right design obvious.
          </Body>

          <Subheading>Deliver: Two Fixes That Mattered</Subheading>
          <Body>
            Pilot testing gave us 10+ feedback responses. We implemented exactly two improvements — chosen by impact, not by ease. First: tunnel overlay visual weight increased so segments were distinguishable from building outlines on mobile screens. Second: dropdown menus rebuilt as bottom-sheet components on mobile, eliminating the overflow issue affecting phones under 390px width. Both fixes were regression-tested before the December 9 final release.
          </Body>
        </Section>

        <Section id="solution" title="What We Built" className="bg-white">
          <Body className="text-lg">
            CampusSync is live at{' '}
            <a href="https://campus-sync.org" className="text-sky-700 font-semibold underline hover:no-underline" target="_blank" rel="noopener noreferrer">
              campus-sync.org
            </a>
            . No login. No installation. Open it, type where you are, type where you&apos;re going, get a route you can actually trust.
          </Body>

          <Subheading>The Routing Engine</Subheading>
          <Body>
            The core innovation isn&apos;t the map — it&apos;s what happens before the map renders. The routing engine queries building access status at routing time, filters out any path that goes through a currently-closed building, then runs pathfinding on the remaining graph. Users never see a route they can&apos;t walk. That&apos;s the feature that changed behavior.
          </Body>
          <HoverableImage src={publicUrl(BASE_PATH, 'images/campus sync/Routing Logic Diagram.png')} alt="Routing engine logic" />

          <Subheading>The Visual System</Subheading>
          <Body>
            Maroon lines = tunnels. Gold lines = outdoors. Two colors, zero ambiguity. Round 2 usability testing showed users following routes without realizing they&apos;d gone outside — the original single-color overlay gave no signal. The dual-color system made the distinction impossible to miss, even on a small mobile screen while walking.
          </Body>
          <HoverableImage src={publicUrl(BASE_PATH, 'images/campus sync/Before:after visualization.png')} alt="Before and after dual-color route visualization" />

          <Subheading>The Input Model</Subheading>
          <Body>
            Search-first, not map-click. Round 1 testing showed that tapping a small building on a map while moving was too slow and too error-prone. The search field uses autocomplete restricted to buildings in the navigable network — so users only see options that the routing engine can actually connect.
          </Body>
          <HoverableImage src={publicUrl(BASE_PATH, 'images/campus sync/Search first interface.png')} alt="Search-first interface" />

          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-10 my-10">
            <div className="min-w-0 flex-1">
              <Subheading>The Walking Time Estimate</Subheading>
              <Body className="mb-0">
                Added in response to a specific pilot testing question: &quot;Is this actually faster than going outside?&quot; Students needed to make that comparison in real time. The time estimate displays prominently for both indoor and outdoor segments, so the decision is instant.
              </Body>
            </div>
            <figure
              className="shrink-0 w-full max-w-xs sm:max-w-sm mx-auto md:mx-0 md:mt-2 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 shadow-sm"
              data-no-cursor-hover
            >
              <img
                src={publicUrl(BASE_PATH, 'images/campus sync/Walking time estimates.png')}
                alt="Walking time estimates for indoor vs outdoor route comparison in the product UI"
                className="block w-full h-auto object-contain max-h-56 md:max-h-64"
              />
            </figure>
          </div>
        </Section>

        <Section id="devices" title="Devices &amp; visual feedback" className="bg-gray-50/80">
          <Body>
            We validated the live product on the hardware students actually carry — not lab desktops — and captured quick visual-appeal signal after task-based sessions.
          </Body>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start mt-6">
            <div>
              <Subheading className="mt-0 md:mt-0">Devices used to check the website</Subheading>
              <Body>
                Sessions were run on participants&apos; own phones and a shared set of common screen sizes (including narrower devices under 390px width) so layout, tap targets, and route legibility matched real winter use.
              </Body>
              <HoverableImage
                className="my-6"
                src={publicUrl(BASE_PATH, 'images/campus sync/device used to check the website.png')}
                alt="Phones and devices participants used to test CampusSync in usability sessions"
              />
            </div>
            <div>
              <Subheading className="mt-10 md:mt-0">Visual appeal (post-task survey)</Subheading>
              <Body>
                In a short follow-up survey (n=10), 90% of participants said they found the website visually appealing — a useful sanity check alongside task metrics that the interface felt credible, not just functional.
              </Body>
              <HoverableImage
                className="my-6"
                src={publicUrl(BASE_PATH, 'images/campus sync/visually apealling .png')}
                alt="Survey results: 90% of respondents found the website visually appealing"
              />
            </div>
          </div>
        </Section>

        <Section id="impact" title="What Changed" className="bg-gray-50/80">
          <Body>
            Every metric we defined before building anything, we hit or beat. That matters — these weren&apos;t goals we set after seeing the results.
          </Body>
          <ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed mb-10">
            <li>
              <strong className="text-gray-900">SUS Score: 82/100.</strong> The industry average is 68. For a first-semester product with no prior version to iterate from, 82 is a strong result.
            </li>
            <li>
              <strong className="text-gray-900">Routing accuracy: ~90%.</strong> Validated against 20 manually-checked routes. The 10% gap is entirely attributable to Minneapolis/St. Paul cross-campus connections — a known scope exclusion documented before we started building.
            </li>
            <li>
              <strong className="text-gray-900">Task completion: 45% faster</strong> than the existing combination of PDF maps and scattered building-hours pages.
            </li>
            <li>
              <strong className="text-gray-900">Mobile adoption: 70%.</strong> Students used it on their phones while physically navigating. Not at their desks. The mobile-first design decision was validated by the people it was designed for.
            </li>
            <li>
              <strong className="text-gray-900">User satisfaction: 80%+.</strong> Meeting the pre-defined threshold exactly.
            </li>
          </ul>

          <HoverableImage src={publicUrl(BASE_PATH, 'images/campus sync/usability .png')} alt="Usability testing summary" />

          <Body className="mt-8">
            The qualitative feedback was equally useful. The dual-color route visualization was the single most-cited positive feature — described as &quot;immediately obvious&quot; and &quot;the thing that made it actually useful.&quot; The most-cited limitation was Minneapolis/St. Paul routing — which the team had documented as a user misconception before launch. The tunnels don&apos;t connect the campuses. That&apos;s not a missing feature. That&apos;s a geography problem.
          </Body>
        </Section>

        <Section id="launch" title="">
          <Body className="text-lg">
            CampusSync launched December 9, 2025 and is actively serving University of Minnesota students.
          </Body>
          <div className="mt-6 space-y-1 text-sm text-gray-600 border-t border-gray-200 pt-6">
            <p>
              <span className="font-semibold text-gray-900">Team:</span> Nick Kanning, Chandan Umesh Pai, Saad Saleem, David Tomlinson
            </p>
            <p>
              <span className="font-semibold text-gray-900">Guided by:</span> Prof. Kathryn Wust &amp; Prof. Scott Hareland
            </p>
          </div>
        </Section>

        <section className="max-w-5xl mx-auto px-5 sm:px-8 py-10 border-t border-gray-100">
          <div className="flex flex-wrap justify-between gap-4 items-center">
            <Link href="/" className="text-sky-700 hover:text-sky-800 hover:underline font-semibold text-sm">
              ← Back to Portfolio
            </Link>
            <Link href="/mercedes-service-manual" className="text-sky-700 hover:text-sky-800 hover:underline font-semibold text-sm">
              Next project →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
