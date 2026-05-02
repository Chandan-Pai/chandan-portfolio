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

  // ── SCROLL-DRIVEN 3D CARD LIFT ──
  useEffect(() => {
    const MAX_ROTATE = 45;
    const MAX_Y = 50;
    const MAX_Z = -40;
    const FADE_SPEED = 2.0;
    const ZONE_SCROLL_PX = 300;

    const cards = Array.from(document.querySelectorAll('.project-link'));

    function clamp(v, lo, hi) {
      return Math.min(Math.max(v, lo), hi);
    }

    function updateCards() {
      const vh = window.innerHeight;

      const rawProgress = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const start = rect.bottom - vh;
        return clamp(1 - start / ZONE_SCROLL_PX, 0, 1);
      });

      const seqProgress = [...rawProgress];
      seqProgress[0] = 1;
      for (let i = 1; i < cards.length; i++) {
        seqProgress[i] = Math.min(rawProgress[i], seqProgress[i - 1]);
      }

      cards.forEach((card, i) => {
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

    tick();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []); 

  const projects = [
    { 
      id: 'initiator-fellowship', 
      href: '/initiator-fellowship', 
      title: 'Website Accessibility Redesign', 
      role: 'UX Researcher', 
      metric: '104% usability increase • 2.3/5 → 4.7/5 rating', 
      src: publicAssetUrl(BASE_PATH, 'images/initiator-fellowship/initiator-fellowship.mp4'),
      type: 'video', 
      num: '01' 
    },
    { 
      id: 'campus-sync', 
      href: '/campus-sync', 
      title: 'Campus-Sync Navigation', 
      role: 'UX Researcher & Designer', 
      metric: '40% navigation error reduction • 65% → 95% task completion', 
      src: publicAssetUrl(BASE_PATH, 'images/campus sync/home page.mp4'),
      type: 'video', 
      num: '02' 
    },
    { 
      id: 'mercedes', 
      href: '/mercedes-service-manual', 
      title: 'Interactive Repair Guidance', 
      role: 'Product Researcher', 
      metric: 'Multi-format prototype • n=4 usability validation', 
      src: publicAssetUrl(BASE_PATH, 'images/Repair manual/Repair manual.png'),
      type: 'image', 
      num: '03' 
    },
    { 
      id: 'boston-scientific', 
      href: '/manufacturing-workflow', 
      title: 'Manufacturing Process Optimization', 
      role: 'Industrial Designer', 
      metric: 'Lean workflow analysis • Takt time: 13.47 sec/blade', 
      src: publicAssetUrl(BASE_PATH, 'images/wolverine blade assembly.png'),
      type: 'image', 
      num: '04' 
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Hero — full image (no cover crop); width fits viewport, height from aspect ratio */}
      <header className="relative overflow-hidden bg-neutral-900">
        <div className="relative w-full">
          <img
            src={publicAssetUrl(BASE_PATH, 'images/about/hero home.png')}
            alt=""
            className="w-full h-auto max-w-full block select-none pointer-events-none grayscale"
            style={{
              transform: `translateY(${reduceMotion ? 0 : scrollY * 0.35}px)`,
              willChange: 'transform',
            }}
            draggable={false}
          />
          <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" aria-hidden />
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-start pl-6 sm:pl-10 md:pl-14 lg:pl-20 pr-6 text-left">
            <div className="max-w-[min(44rem,92vw)]">
              <h1
                className="font-black tracking-tight uppercase whitespace-nowrap bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent drop-shadow-md"
                style={{
                  fontSize: 'clamp(2.75rem, 10vw, 5.5rem)',
                  lineHeight: '1',
                }}
              >
                CHANDAN PAI
              </h1>
              <p className="mt-6 text-sm font-semibold tracking-widest text-white/90 uppercase">
                Human Factors Engineer • UX Researcher
              </p>
              <p className="mt-8 text-lg text-white/90 leading-relaxed">
                Building data-driven design solutions at the intersection of engineering and human behavior
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Gallery */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">Work</h2>
          <div className="h-0.5 w-full bg-gray-300 mb-16"></div>

          <div className="scene" style={{ perspective: '1400px', perspectiveOrigin: '50% 30%' }}>
            <div className="space-y-8">
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  href={project.href}
                  className="group project-link block border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors bg-white transition-shadow duration-300 hover:shadow-2xl"
                  style={{ willChange: index === 0 ? 'auto' : 'transform, opacity' }}
                >
                  <div className="flex flex-col md:flex-row items-stretch">
                    <div className="w-full md:w-2/3 shrink-0 bg-slate-100 flex items-start justify-center">
                      {project.type === 'video' ? (
                        <video
                          className="w-full h-auto max-w-full block transition-opacity duration-300 group-hover:opacity-95"
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
                          className="w-full h-auto max-w-full block transition-opacity duration-300 group-hover:opacity-95"
                        />
                      )}
                    </div>
                    <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col justify-between gap-8 min-h-0 min-w-0">
                      <div>
                        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">{project.num} | {project.role}</p>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">{project.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{project.metric}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:gap-4 transition-all duration-300">
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

      {/* GitHub Projects */}
      <section id="work" className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">Code & Data</p>
          <h2 className="text-3xl font-bold mb-12">Projects</h2>

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
                desc: 'Visual breakdown of Netflix catalog by genre, country, release year, and content type — uncovering how streaming strategy has shifted over a decade', 
                tech: ['Tableau', 'Data Visualization', 'Entertainment Analytics'], 
                href: 'https://public.tableau.com/app/profile/chandan.pai4658/viz/NetflixContentDatavisualisation/Dashboard1?publish=yes',
                status: 'live'
              },
              
            ].map((proj, i) => (
              <a key={i} href={proj.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-6 border border-slate-200 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all group">
                <div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-slate-700">{proj.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{proj.desc}</p>
                  <div className="flex gap-2">
                    {proj.tech.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">{t}</span>)}
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-slate-700 text-xl ml-6">→</span>
              </a>
            ))}
          </div>
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
    </main>
  );
}
