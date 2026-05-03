'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LiveClock from './LiveClock';

/** Home: CP at 25%, island at 50%, clock at 75%. Below `lg` (1024px): hamburger — avoids broken layout at phone landscape (~932px) where `md` would show the crowded island. */
export default function SiteIslandNav() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const pathname = usePathname();
  const [navExpanded, setNavExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const isExpanded = !scrolled || navExpanded;
  const resumeHref = `${BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH}/Chandan_Pai_UX_Researcher.pdf`;

  const linkClassMobile =
    'text-white text-lg font-medium py-4 border-b border-white/15 active:bg-white/5 transition-colors';
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-40 lg:h-20"
        style={{
          height: 'max(72px, calc(env(safe-area-inset-top, 0px) + 52px))',
          background: 'rgba(0, 0, 0, 0.01)',
          backdropFilter: 'blur(3px)',
          borderBottom: '1px solid transparent',
          backgroundImage:
            'linear-gradient(to right, rgba(100, 100, 100, 0.1) 0%, rgba(150, 150, 150, 0.4) 50%, rgba(100, 100, 100, 0.1) 100%)',
          backgroundClip: 'padding-box, border-box',
          backgroundOrigin: 'padding-box, border-box',
        }}
      />

      {/* —— Mobile / tablet portrait: bar + overlay menu —— */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] px-3"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className={`mx-auto mt-3 flex max-w-[100vw] items-center justify-between gap-2 rounded-full px-3 py-2.5 shadow-sm transition-colors ${
            scrolled ? 'bg-white/95 text-slate-900 backdrop-blur-md' : 'bg-black/40 text-white backdrop-blur-md'
          }`}
          style={{ pointerEvents: 'auto' }}
        >
          <Link
            href="/"
            className={`shrink-0 text-sm font-semibold tracking-widest ${scrolled ? 'text-slate-900' : 'text-white drop-shadow-sm'}`}
          >
            CP
          </Link>
          <div className="min-w-0 flex-1 hidden min-[380px]:flex justify-center">
            <LiveClock layout="inline" variant={scrolled ? 'onLight' : 'onDark'} />
          </div>
          <button
            type="button"
            className={`shrink-0 rounded-full p-2 -mr-1 touch-manipulation ${scrolled ? 'text-slate-900' : 'text-white'}`}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className="lg:hidden fixed inset-0 z-[100] flex flex-col bg-slate-950/97 backdrop-blur-md"
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        >
          <div className="flex items-center justify-end border-b border-white/10 px-4 py-3">
            <button
              type="button"
              className="rounded-full p-2 text-white touch-manipulation"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav id="site-mobile-nav" className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
            <Link href="/" className={`block ${linkClassMobile}`} onClick={closeMenu}>
              Home
            </Link>
            <Link href="/#work" className={`block ${linkClassMobile}`} onClick={closeMenu}>
              Work
            </Link>
            <Link href="/About" className={`block ${linkClassMobile}`} onClick={closeMenu}>
              About
            </Link>
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${linkClassMobile}`}
              onClick={closeMenu}
            >
              Resume
            </a>
            <Link href="mailto:2000chandanpai@gmail.com" className={`block ${linkClassMobile} border-b-0`} onClick={closeMenu}>
              Contact
            </Link>
          </nav>
        </div>
      ) : null}

      {/* —— Desktop / large tablet: floating island —— */}
      <div className="pointer-events-none hidden lg:block fixed top-6 left-0 right-0 z-50">
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
              className="transition-all duration-300 ease-in-out max-w-[min(480px,calc(100vw-2rem))]"
              onMouseEnter={() => setNavExpanded(true)}
              onMouseLeave={() => setNavExpanded(false)}
              style={{
                width: isExpanded ? 'min(480px, calc(100vw - 2rem))' : '80px',
                height: '40px',
                borderRadius: '20px',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
              }}
            >
              <div className="h-full flex items-center justify-center gap-4 lg:gap-8 px-4 lg:px-6 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                    <Link href="/" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap shrink-0">
                      Home
                    </Link>
                    <Link href="/#work" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap shrink-0">
                      Work
                    </Link>
                    <Link href="/About" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap shrink-0">
                      About
                    </Link>
                    <a
                      href={resumeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap shrink-0"
                    >
                      Resume
                    </a>
                    <Link
                      href="mailto:2000chandanpai@gmail.com"
                      className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap shrink-0"
                    >
                      Contact
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>

          <div className="pointer-events-auto absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2 hidden min-[900px]:block">
            <LiveClock layout="inline" variant={scrolled ? 'onLight' : 'onDark'} />
          </div>
        </div>
      </div>
    </>
  );
}
