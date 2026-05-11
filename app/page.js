'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";

/** Encode each path segment so spaces (e.g. `Repair manual/`) work on GitHub Pages and strict hosts. */
function publicAssetUrl(basePath, relativePath) {
  const encoded = relativePath
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  if (!basePath) return `/${encoded}`;
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${base}/${encoded}`;
}

export default function HomePage() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [scrollY, setScrollY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  /** Matches `SiteIslandNav` mobile breakpoint; disables hero parallax and drives layout tweaks. */
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setIsNarrowViewport(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = () => setReduceMotion(mediaQuery.matches);
    handleMotionPreference();

    let targetY = window.scrollY;
    let currentY = targetY;
    let rafId = null;

    const handleScroll = () => {
      targetY = window.scrollY;
      if (mediaQuery.matches) setScrollY(targetY);
    };

    const animate = () => {
      if (!mediaQuery.matches) {
        currentY += (targetY - currentY) * 0.12;
        if (Math.abs(targetY - currentY) < 0.1) currentY = targetY;
        setScrollY(currentY);
      }
      rafId = requestAnimationFrame(animate);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    mediaQuery.addEventListener?.('change', handleMotionPreference);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener?.('change', handleMotionPreference);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const projectLinks = document.querySelectorAll('.project-link');

    const onEnter = () => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) cursor.classList.add('hover');
    };
    const onLeave = () => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) cursor.classList.remove('hover');
    };

    projectLinks.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      projectLinks.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  // ── SCROLL-DRIVEN 3D CARD LIFT (disabled below 768px for readability and performance) ──
  useEffect(() => {
    const MAX_ROTATE = 45;
    const MAX_Y = 50;
    const MAX_Z = -40;
    const FADE_SPEED = 2.0;
    const ZONE_SCROLL_PX = 300;

    const mq = window.matchMedia('(min-width: 768px)');

    const cards = () => Array.from(document.querySelectorAll('.project-link'));

    function clamp(v, lo, hi) {
      return Math.min(Math.max(v, lo), hi);
    }

    function clearCardStyles(list) {
      list.forEach((card) => {
        card.style.removeProperty('transform');
        card.style.removeProperty('opacity');
        card.style.removeProperty('transform-origin');
      });
    }

    function updateCards() {
      const list = cards();
      if (!mq.matches) {
        clearCardStyles(list);
        return;
      }

      const vh = window.innerHeight;

      const rawProgress = list.map((card) => {
        const rect = card.getBoundingClientRect();
        const start = rect.bottom - vh;
        return clamp(1 - start / ZONE_SCROLL_PX, 0, 1);
      });

      const seqProgress = [...rawProgress];
      seqProgress[0] = 1;
      for (let i = 1; i < list.length; i++) {
        seqProgress[i] = Math.min(rawProgress[i], seqProgress[i - 1]);
      }

      list.forEach((card, i) => {
        if (i === 0) {
          card.style.removeProperty('transform');
          card.style.removeProperty('opacity');
          card.style.removeProperty('transform-origin');
          return;
        }
        const p = seqProgress[i];
        card.style.transform = `perspective(1400px) rotateX(${MAX_ROTATE * (1 - p)}deg) translateY(${MAX_Y * (1 - p)}px) translateZ(${MAX_Z * (1 - p)}px)`;
        card.style.opacity = clamp(p * FADE_SPEED, 0, 1);
        card.style.transformOrigin = 'center bottom';
      });
    }

    let rafId = null;
    function tick() {
      updateCards();
      rafId = requestAnimationFrame(tick);
    }

    const onMq = () => updateCards();
    mq.addEventListener('change', onMq);
    tick();
    return () => {
      mq.removeEventListener('change', onMq);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []); 

  const projects = [
    {
      id: 'campus-sync',
      href: '/campus-sync',
      title: 'Campus-Sync Navigation',
      role: 'UX Researcher & Designer',
      metric: '40% navigation error reduction • 65% → 95% task completion',
      src: publicAssetUrl(BASE_PATH, 'images/campus sync/home page.mp4'),
      type: 'video',
      num: '01',
    },
    {
      id: 'initiator-fellowship',
      href: '/initiator-fellowship',
      title: 'Website Accessibility Redesign',
      role: 'UX Researcher',
      metric: '104% usability increase • 2.3/5 → 4.7/5 rating',
      src: publicAssetUrl(BASE_PATH, 'images/initiator-fellowship/initiator-fellowship.mp4'),
      type: 'video',
      num: '02',
    },
    {
      id: 'mercedes',
      href: '/mercedes-service-manual',
      title: 'Interactive Repair Guidance',
      role: 'Product Researcher',
      metric: 'Multi-format prototype • n=4 usability validation',
      src: publicAssetUrl(BASE_PATH, 'images/Repair manual/Repair manual.png'),
      type: 'image',
      num: '03',
    },
    {
      id: 'airpods-adaptive-audio',
      href: '/airpods-adaptive-audio',
      title: 'Invisible AI & Mental Models',
      role: 'HF Researcher — CDM · Think-Aloud · Endsley SA',
      metric: 'AirPods Pro Adaptive Audio · n=2 CDM · 3 environments · 5 themes',
      src: publicAssetUrl(BASE_PATH, 'images/airpods-case-study/Airpod Hero.png'),
      type: 'image',
      num: '04',
    },
    {
      id: 'user-engagement-analysis',
      href: '/user-engagement-analysis',
      title: 'Quantifying User Engagement',
      role: 'Data Analyst & Researcher',
      metric: '8,196 Play Store apps • R² = 0.98 • +29.8% lift (free vs paid)',
      src: publicAssetUrl(BASE_PATH, 'images/user-engagement-analysis/playstore_engagement_analysis.png'),
      type: 'image',
      num: '05',
      /** Image is portrait (2426×3094); pin a 3:2 frame so the placard height matches the others. */
      mediaAspect: 'aspect-[3/2]',
    },
    {
      id: 'boston-scientific',
      href: '/manufacturing-workflow',
      title: 'Manufacturing Process Optimization',
      role: 'Industrial Designer',
      metric: 'Lean workflow analysis • Takt time: 13.47 sec/blade',
      src: publicAssetUrl(BASE_PATH, 'images/wolverine blade assembly.png'),
      type: 'image',
      num: '06',
    },
  ];

  /** Edit this object to change the statement below Work. */
  const homeStatement = {
    label: 'How I built this portfolio',
    body:
      'Three AI tools, three different problems. One week to ship. Content stayed mine throughout.',
    /** Set to null to hide. Use Next `Link` below; do not put raw <a> tags in `body` (they will not work). */
    aiBuildLink: {
      label: 'How this portfolio was built with AI',
      href: '/ai-process',
    },
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-slate-100 antialiased">
      {/* Hero: full image; mobile clears fixed nav + text limited to left half so portrait stays visible */}
      <header className="relative overflow-hidden bg-neutral-900 max-sm:pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-0">
        <div className="relative w-full">
          <img
            src={publicAssetUrl(BASE_PATH, 'images/about/hero home.png')}
            alt=""
            className="w-full h-auto max-w-full block select-none pointer-events-none grayscale"
            style={{
              transform: `translateY(${reduceMotion || isNarrowViewport ? 0 : scrollY * 0.35}px)`,
              willChange: reduceMotion || isNarrowViewport ? 'auto' : 'transform',
            }}
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-black/40 max-sm:bg-gradient-to-r max-sm:from-black/75 max-sm:via-black/45 max-sm:to-transparent"
            aria-hidden
          />
          {/* Mobile: bottom scrim so copy stays readable; in-flow spacer below extends hero past the photo */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-neutral-900/35 to-neutral-900 sm:hidden"
            aria-hidden
          />
          <div className="absolute inset-0 z-10 flex flex-col items-start justify-center text-left max-sm:justify-start max-sm:items-start max-sm:pt-6 max-sm:pb-8 max-sm:pl-3 max-sm:pr-3 sm:pb-20 sm:pl-4 sm:pr-4 sm:justify-center sm:pt-0 sm:pl-10 md:pl-14 lg:pl-20 sm:pr-6">
            <div className="w-full min-w-0 max-w-[min(44rem,100%)] max-sm:max-w-[min(78vw,18rem)]">
              <h1 className="font-black uppercase text-left leading-[1.05] text-[clamp(1.2rem,5.5vw,1.6rem)] text-sky-200 [text-shadow:0_2px_24px_rgba(0,0,0,0.85)] sm:leading-none sm:whitespace-nowrap sm:tracking-tight sm:text-[clamp(2.75rem,10vw,5.5rem)] sm:bg-gradient-to-r sm:from-blue-400 sm:to-white sm:bg-clip-text sm:text-transparent sm:[text-shadow:none] sm:drop-shadow-md">
                <span className="max-sm:block">CHANDAN</span>
                <span className="hidden sm:inline" aria-hidden>
                  {' '}
                </span>
                <span className="max-sm:block sm:inline">PAI</span>
              </h1>
              <p className="mt-3 text-left text-[0.6875rem] font-semibold tracking-wide leading-snug text-white uppercase [text-shadow:0_1px_12px_rgba(0,0,0,0.9)] sm:mt-6 sm:text-sm sm:tracking-wider sm:tracking-widest sm:leading-relaxed sm:text-white/90 sm:[text-shadow:none]">
                <span className="max-sm:block">Human Factors Engineer</span>
                <span className="max-sm:hidden"> • </span>
                <span className="max-sm:block">UX Researcher</span>
              </p>
              <p className="mt-4 text-left text-[0.8125rem] leading-relaxed text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.88)] sm:mt-8 sm:text-lg sm:text-white/90 sm:[text-shadow:none]">
                Building data-driven design solutions at the intersection of engineering and human behavior
              </p>
            </div>
          </div>
          {/* In-flow: absolute copy does not grow height; extends dark hero for mobile tagline */}
          <div
            className="w-full shrink-0 bg-neutral-900 sm:hidden h-[clamp(6.25rem,28vw,10.5rem)]"
            aria-hidden
          />
        </div>
      </header>

      {/* Projects Gallery */}
      <section id="work" className="relative py-16 sm:py-24 px-4 sm:px-6">
        {/*
          Decorative back-of-section gradient. Lives behind every placard so
          their `backdrop-filter` has color/light to refract — without it the
          frosted glass would read as a flat translucent rectangle on the
          pure-dark page background.
        */}
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 90% 55% at 50% 8%, rgba(56,189,248,0.10), transparent 55%),' +
              'radial-gradient(ellipse 60% 50% at 95% 95%, rgba(99,102,241,0.09), transparent 55%),' +
              'radial-gradient(ellipse 50% 45% at 5% 80%, rgba(14,165,233,0.07), transparent 55%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-slate-100">Work</h2>
          <div className="h-0.5 w-full bg-slate-700/80 mb-16"></div>

          <div className="scene" style={{ perspective: '1400px', perspectiveOrigin: '50% 30%' }}>
            <div className="space-y-8">
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  href={project.href}
                  className="group project-link glass-placard block rounded-2xl overflow-hidden"
                  style={{ willChange: index === 0 ? 'auto' : 'transform, opacity' }}
                >
                  <div className="flex flex-col md:flex-row items-stretch">
                    <div
                      className={`w-full md:w-2/3 shrink-0 bg-transparent flex items-center justify-center ${project.mediaAspect ?? ''}`}
                    >
                      {project.type === 'video' ? (
                        <video
                          className={
                            project.mediaAspect
                              ? 'w-full h-full object-cover block transition-opacity duration-300 group-hover:opacity-95'
                              : 'w-full h-auto max-w-full block transition-opacity duration-300 group-hover:opacity-95'
                          }
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                        >
                          <source src={project.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={project.src}
                          alt={project.title}
                          className={
                            project.mediaAspect
                              ? 'w-full h-full object-contain object-center p-4 sm:p-6 block transition-opacity duration-300 group-hover:opacity-95'
                              : 'w-full h-auto max-w-full block transition-opacity duration-300 group-hover:opacity-95'
                          }
                        />
                      )}
                    </div>
                    <div className="w-full md:w-1/3 p-5 sm:p-8 md:p-10 flex flex-col justify-between gap-6 sm:gap-8 min-h-0 min-w-0">
                      <div>
                        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">{project.num} | {project.role}</p>
                        <h3 className="text-2xl font-bold text-slate-100 mb-4 leading-snug">{project.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{project.metric}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:gap-4 transition-all duration-300">
                        <span>View Project</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statement: editable copy in `homeStatement` above */}
      <section
        id="statement"
        aria-labelledby="home-statement-heading"
        className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-800 bg-gradient-to-b from-neutral-950 via-slate-900/40 to-neutral-950"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56, 189, 248, 0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(15, 23, 42, 0.06), transparent 50%)',
          }}
          aria-hidden
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-slate-700/90 bg-slate-900/70 backdrop-blur-sm shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] p-6 sm:p-12 md:p-14">
            <div
              className="absolute top-0 left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent rounded-full"
              aria-hidden
            />
            <p
              id="home-statement-heading"
              className="text-xs font-semibold tracking-[0.12em] text-slate-400 mb-8 sm:tracking-[0.16em]"
            >
              {homeStatement.label}
            </p>
            <p className="relative text-xl sm:text-2xl md:text-[1.65rem] font-medium text-slate-200 leading-[1.45] tracking-tight">
              <span
                className="absolute -left-1 sm:-left-2 top-0 -translate-y-1 text-5xl sm:text-6xl font-serif text-sky-400/25 leading-none select-none"
                aria-hidden
              >
                “
              </span>
              <span className="relative z-[1] pl-6 sm:pl-8">{homeStatement.body}</span>
            </p>
            {homeStatement.aiBuildLink ? (
              <div className="relative z-[1] mt-10 pl-6 sm:pl-8">
                <Link
                  href={homeStatement.aiBuildLink.href}
                  data-no-cursor-hover
                  className="group inline-flex items-center gap-2 text-base font-semibold text-sky-400 hover:text-sky-300 underline decoration-sky-500/40 underline-offset-4 hover:decoration-sky-400 transition-colors"
                >
                  {homeStatement.aiBuildLink.label}
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* GitHub Projects (distinct id — duplicate id="work" breaks getElementById / scroll-spy) */}
      <section id="code-projects" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">Code & Data</p>
          <h2 className="text-3xl font-bold mb-12 text-slate-100">Projects</h2>

         <div className="space-y-6">
            {[
              { 
                title: 'Laptop Sales Data Visualization', 
                desc: 'Interactive dashboard analyzing sales trends, pricing patterns, and market segments across brands and regions', 
                tech: ['Tableau', 'Data Visualization', 'Dashboard'], 
                href: 'https://public.tableau.com/app/profile/chandan.pai4658/viz/DataVizFinalProject4/FinalDashboard?publish=yes&showOnboarding=true',
                status: 'live'
              },
              { 
                title: 'Netflix Content Data Visualization', 
                desc: 'Visual breakdown of Netflix catalog by genre, country, release year, and content type, uncovering how streaming strategy has shifted over a decade', 
                tech: ['Tableau', 'Data Visualization', 'Entertainment Analytics'], 
                href: 'https://public.tableau.com/app/profile/chandan.pai4658/viz/NetflixContentDatavisualisation/Dashboard1?publish=yes',
                status: 'live'
              },
              
            ].map((proj, i) => (
              <a key={i} href={proj.href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-5 sm:p-6 border border-slate-700 rounded-xl hover:border-slate-500 hover:bg-slate-900/80 transition-all group text-left">
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-slate-100 text-slate-200">{proj.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map(t => <span key={t} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded">{t}</span>)}
                  </div>
                </div>
                <span className="text-slate-500 group-hover:text-slate-300 text-xl sm:ml-6 sm:shrink-0 self-end sm:self-auto">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 pb-[max(3rem,env(safe-area-inset-bottom))]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-slate-100">Let's Connect</h2>
          <p className="text-lg text-slate-400 mb-8">
            Open to HF/UX roles, industrial engineering positions, and collaborative research opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:2000chandanpai@gmail.com" 
              className="px-8 py-4 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-500 transition"
            >
              Email Me
            </a>
            <a 
              href="https://www.linkedin.com/in/chandan-umesh-pai/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-slate-500 text-slate-100 font-medium rounded-lg hover:bg-slate-800 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
