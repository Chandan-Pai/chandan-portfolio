'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
export default function AboutPage() {
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
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Fixed Space Background - Black & White */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: 'url("https://images5.alphacoders.com/492/492784.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        filter: 'grayscale(100%) brightness(0.3)',
      }}>
      </div>

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
                      <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">Resume</Link>
                      <Link href="mailto:pai00040@umn.edu" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">Contact</Link>
                    </>
                  )}
                </div>
              </nav>
              <LiveClock />
            </div>
       
      {/* Content Container */}
      <div className="relative z-10">
        
        {/* Hero Section with Name and Astronauts */}
        <section className="flex flex-col items-center justify-center px-6 pt-20 pb-0 relative" style={{ minHeight: '60vh' }}>
          <h1 
            className="font-black tracking-tight uppercase text-center"
            style={{ 
              fontSize: 'clamp(2rem, 12vw, 7rem)',
              lineHeight: '1',
              color: '#ffffff',
              textShadow: '0 0 20px rgba(10, 199, 202, 0.6)',
            }}
          >
            CHANDAN PAI
          </h1>

          {/* Astronaut 1 - Right side */}
          <div className="astronaut astronaut1">
            <img 
              src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png" 
              alt="Floating astronaut"
              width={250}
            />
          </div>

          {/* Astronaut 2 - Left side */}
          <div className="astronaut astronaut2">
            <img 
              src="https://images.vexels.com/media/users/3/152641/isolated/preview/2b3d63661f0d7fe62c36168604985f26-space-cosmonaut-cartoon-by-vexels.png" 
              alt="Floating cosmonaut"
              width={250}
            />
          </div>
        </section>

        {/* About Content Section */}
        <section className="w-[90%] mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Left: Glass Text */}
            <div 
              className="rounded-2xl border p-8 backdrop-blur-md"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <p className="text-xl font-bold mb-6 text-white">
                I solve problems by understanding how things actually work.
              </p>
              
              <div className="space-y-6 text-base leading-relaxed text-white">
                <p>
                  Growing up, I was the kid who took things apart to see why they worked. I built a go-kart in undergrad — the steering was wrong because I didn't understand the physics. I fixed it. That taught me something fundamental: understanding systems matters more than following blueprints.
                </p>
                
                <p>
                  I've spent the last few years watching how people navigate complex environments. At Mercedes-Benz, I studied repair workflows: 6,000 spot welds per vehicle. The bottleneck wasn't the welds. It was the cognitive overload. I automated it. Throughput went from 1 vehicle/month to 4. But more importantly, I learned that real problems live in how systems actually function.
                </p>
                
                <p>
                  That's what pulled me into design: observing real friction, understanding root causes, and building solutions that remove unnecessary decisions.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/30">
                <h3 className="text-lg font-bold text-white mb-3">What I Believe</h3>
                <p className="text-base leading-relaxed text-white">
                  Most design fails because we treat problems in isolation. They're system problems. They require understanding behavior, constraints, and the decisions people make under real pressure.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/30">
                <h3 className="text-lg font-bold text-white mb-3">Core Values</h3>
                <div className="space-y-2 text-base text-white">
                  <p>✱ Understand systems before redesigning them</p>
                  <p>✱ Build solutions that remove friction</p>
                  <p>✱ Lead teams that ship</p>
                </div>
              </div>
            </div>
            
            {/* Right: Image Placeholder */}
            <div 
                className="rounded-2xl border overflow-hidden"
                style={{
                    aspectRatio: '3/4',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                >
                <img 
                    src="/images/about/fall photo.jpg"
                    alt="Chandan Pai"
                    className="w-full h-full object-cover"
                />
                </div>
          </div>
        </section>

       {/* Photo Grid Section */}
            <section className="mx-auto px-16 py-20">
            <h2 className="text-3xl font-bold mb-8 text-white">Elsewhere</h2>
            
            <div className="flex flex-wrap gap-4 overflow-x-auto pb-4">
                {[
                { label: 'Hiking', src: '/images/about/duluth trip sunrise.jpg' },
                { label: 'India', src: '/images/about/me at mercedes .jpg' },
                { label: 'Community', src: '/images/about/aagumbe.jpg' },
                { label: 'Moments', src: '/images/about/minigolf at stone mountain.jpg' },
                { label: 'More', src: '/images/about/ooty.jpg' },
                ].map((item, idx) => (
                <div 
                    key={idx}
                    className="flex-shrink-0 w-84 aspect-square rounded-lg border overflow-hidden relative group hover:border-white transition-colors"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                    <img 
                    src={item.src} 
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-end p-3">
                    <span className="text-white text-sm font-medium">{item.label}</span>
                    </div>
                </div>
                ))}
            </div>
            </section>
      </div>

      {/* Animations */}
      <style jsx>{`
        .astronaut {
          position: absolute;
          padding-top: 150px;
          display: block;
        }

        .astronaut1 {
          left: 60%;
          animation: anim 20s linear infinite;
        }

        .astronaut2 {
          left: 15%;
          animation: anim2 20s linear infinite;
          animation-delay: 1s;
        }

        @keyframes anim {
          0% { transform: translateY(0px); }
          10% { transform: translateY(30px) rotate(10deg); }
          20% { transform: translateY(60px) rotate(20deg); }
          30% { transform: translateY(90px) rotate(30deg); }
          40% { transform: translateY(120px) rotate(20deg); }
          50% { transform: translateY(150px) rotate(30deg); }
          60% { transform: translateY(120px) rotate(40deg); }
          70% { transform: translateY(90px) rotate(10deg); }
          80% { transform: translateY(60px) rotate(20deg); }
          90% { transform: translateY(30px) rotate(10deg); }
          100% { transform: translateY(0px); }
        }

        @keyframes anim2 {
          0% { transform: translateY(0px); }
          10% { transform: translateY(-30px) rotate(-10deg); }
          20% { transform: translateY(-60px) rotate(-20deg); }
          30% { transform: translateY(-90px) rotate(-10deg); }
          40% { transform: translateY(-120px) rotate(0deg); }
          50% { transform: translateY(-150px) rotate(-10deg); }
          60% { transform: translateY(-120px) rotate(0deg); }
          70% { transform: translateY(-90px) rotate(20deg); }
          80% { transform: translateY(-60px) rotate(10deg); }
          90% { transform: translateY(-30px) rotate(0deg); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </main>
  );
}