'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LiveClock from './LiveClock';

function NavLinks({ resumeHref, navLinkClass, onNavigate }) {
  return (
    <>
      <Link href="/" className={navLinkClass} onClick={onNavigate}>
        Home
      </Link>
      <Link href="/#work" className={navLinkClass} onClick={onNavigate}>
        Work
      </Link>
      <Link href="/About" className={navLinkClass} onClick={onNavigate}>
        About
      </Link>
      <a href={resumeHref} target="_blank" rel="noopener noreferrer" className={navLinkClass} onClick={onNavigate}>
        Resume
      </a>
      <Link href="mailto:2000chandanpai@gmail.com" className={navLinkClass} onClick={onNavigate}>
        Contact
      </Link>
    </>
  );
}

/** Desktop: CP + Dynamic Island + clock. Mobile: CP + top-right hamburger panel. */
export default function SiteIslandNav() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [navExpanded, setNavExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => {
      const narrow = mq.matches;
      setIsNarrow(narrow);
      if (!narrow) setMobileMenuOpen(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen || !isNarrow) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen, isNarrow]);

  const isExpanded = !scrolled || navExpanded;
  const resumeHref = `${BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH}/Chandan_Pai_UX_Researcher.pdf`;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const desktopLinkClass =
    'text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap shrink-0 py-1';

  const mobileLinkClass =
    'block rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10 transition';

  const labelLight = scrolled ? 'text-slate-900' : 'text-white drop-shadow-sm';

  return (
    <>
      {mobileMenuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[45] cursor-default border-0 bg-black/40 p-0 sm:hidden"
          aria-label="Close menu"
          onClick={closeMobileMenu}
        />
      ) : null}

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
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      />

      {/* Mobile: CP + hamburger */}
      <div
        className={`pointer-events-none fixed z-50 left-0 right-0 sm:hidden ${mobileMenuOpen ? '' : ''}`}
        style={{ top: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}
      >
        <div className="pointer-events-auto flex h-11 items-center justify-between px-4">
          <span className={`text-sm font-semibold tracking-widest ${labelLight}`}>CP</span>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/80 shadow-lg backdrop-blur-xl"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-site-nav"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path d="M6 6L18 18M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div
          id="mobile-site-nav"
          className="fixed left-3 right-3 z-[48] max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto rounded-2xl border border-white/15 bg-black/92 py-3 shadow-2xl backdrop-blur-xl sm:hidden"
          style={{
            top: 'calc(3.75rem + env(safe-area-inset-top, 0px))',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <nav className="flex flex-col px-2">
            <NavLinks resumeHref={resumeHref} navLinkClass={mobileLinkClass} onNavigate={closeMobileMenu} />
          </nav>
          <div className="mt-2 border-t border-white/10 px-4 py-3">
            <LiveClock layout="inline" variant="onDark" />
          </div>
        </div>
      ) : null}

      {/* Desktop: CP + island + clock */}
      <div
        className="pointer-events-none fixed z-50 left-0 right-0 hidden sm:block"
        style={{ top: 'calc(1.5rem + env(safe-area-inset-top, 0px))' }}
      >
        <div className="relative mx-auto h-10 w-full max-w-[100vw] px-2 sm:px-0">
          <div className="pointer-events-auto absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span
              className={`text-sm font-semibold tracking-widest transition-colors ${scrolled ? 'text-slate-900' : 'text-white drop-shadow-sm'}`}
            >
              CP
            </span>
          </div>

          <div className="pointer-events-auto absolute left-1/2 top-1/2 max-w-[calc(100vw-5rem)] -translate-x-1/2 -translate-y-1/2 sm:max-w-none">
            <nav
              className="transition-all duration-300 ease-in-out"
              onMouseEnter={() => setNavExpanded(true)}
              onMouseLeave={() => setNavExpanded(false)}
              style={{
                width: isExpanded ? 'min(480px, calc(100vw - 1.25rem))' : '80px',
                height: '40px',
                borderRadius: '20px',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
              }}
            >
              <div
                className={`no-scrollbar flex h-full items-center px-3 sm:px-6 ${
                  isExpanded ? 'justify-center gap-4 overflow-x-auto sm:gap-8' : 'justify-center gap-8'
                }`}
              >
                {!isExpanded ? (
                  <div className="astronaut-float pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="8" r="4" fill="white" />
                      <ellipse cx="12" cy="16" rx="6" ry="4" fill="white" />
                      <circle cx="10" cy="7" r="1" fill="black" />
                      <circle cx="14" cy="7" r="1" fill="black" />
                      <path d="M10 10 Q12 11 14 10" stroke="black" strokeWidth="0.5" fill="none" />
                    </svg>
                  </div>
                ) : (
                  <NavLinks resumeHref={resumeHref} navLinkClass={desktopLinkClass} onNavigate={undefined} />
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
