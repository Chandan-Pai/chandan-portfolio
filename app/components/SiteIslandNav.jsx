'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LiveClock from './LiveClock';

/** Matches home: CP at 25%, island at 50%, inline clock at 75%; light-on-dark until scroll. */
export default function SiteIslandNav() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [navExpanded, setNavExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = !scrolled || navExpanded;
  const resumeHref = `${BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH}/Chandan_Pai_UX_Researcher.pdf`;

  return (
    <>
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

      <div className="pointer-events-none fixed top-6 left-0 right-0 z-50">
        <div className="relative mx-auto h-10 w-full max-w-[100vw]">
          <div className="pointer-events-auto absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className={`text-sm font-semibold tracking-widest transition-colors ${scrolled ? 'text-slate-900' : 'text-white drop-shadow-sm'}`}
            >
              CP
            </Link>
          </div>

          <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                      href={resumeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap"
                    >
                      Resume
                    </a>
                    <Link
                      href="mailto:2000chandanpai@gmail.com"
                      className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap"
                    >
                      Contact
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>

          <div className="pointer-events-auto absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LiveClock layout="inline" variant={scrolled ? 'onLight' : 'onDark'} />
          </div>
        </div>
      </div>
    </>
  );
}
