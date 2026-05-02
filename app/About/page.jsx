'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveClock from '../components/LiveClock';

export default function AboutPage() {
  const [navExpanded, setNavExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = !scrolled || navExpanded;
  const imgBase = BASE_PATH + '/images/about';
  const photos = [
    { label: 'Hiking', src: imgBase + '/duluth trip sunrise.jpg' },
    { label: 'India', src: imgBase + '/me at mercedes .jpg' },
    { label: 'Community', src: imgBase + '/aagumbe.jpg' },
    { label: 'Moments', src: imgBase + '/minigolf at stone mountain.JPG' },
    { label: 'More', src: imgBase + '/ooty.jpg' },
  ];

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: 'url("https://images5.alphacoders.com/492/492784.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        filter: 'grayscale(100%) brightness(0.3)',
      }} />

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
                <a
                  href={`${BASE_PATH}/Chandan_Pai_HF_Engineer.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap"
                >
                  Resume
                </a>
                <Link href="mailto:2000chandanpai@gmail.com" className="text-white text-sm font-medium hover:text-slate-300 transition whitespace-nowrap">Contact</Link>
              </>
            )}
          </div>
        </nav>
        <LiveClock />
      </div>

      <div className="relative z-10">
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

          <div className="astronaut astronaut1">
            <img
              src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
              alt="Floating astronaut"
              width={250}
            />
          </div>

          <div className="astronaut astronaut2">
            <img
              src="https://images.vexels.com/media/users/3/152641/isolated/preview/2b3d63661f0d7fe62c36168604985f26-space-cosmonaut-cartoon-by-vexels.png"
              alt="Floating cosmonaut"
              width={250}
            />
          </div>
        </section>

        <section className="w-[90%] mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
                  Growing up, I was the kid who took things apart to see why they worked. I built a go-kart in undergrad - the steering was wrong because I did not understand the physics. I fixed it. That taught me something fundamental: understanding systems matters more than following blueprints.
                </p>
                <p>
                  I have spent the last few years watching how people navigate complex environments. At Mercedes-Benz, I studied repair workflows: 6,000 spot welds per vehicle. The bottleneck was not the welds. It was the cognitive overload. I automated it. Throughput went from 1 vehicle/month to 4. But more importantly, I learned that real problems live in how systems actually function.
                </p>
                <p>
                  That is what pulled me into design: observing real friction, understanding root causes, and building solutions that remove unnecessary decisions.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                aspectRatio: '3/4',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <img
                src={imgBase + '/fall photo.jpg'}
                alt="Chandan Pai"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto px-16 py-20">
          <h2 className="text-3xl font-bold mb-8 text-white">Elsewhere</h2>
          <div className="flex flex-wrap gap-4 overflow-x-auto pb-4">
            {photos.map((item, idx) => (
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
