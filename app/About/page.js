'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [navExpanded, setNavExpanded] = useState(false);

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

      {/* Dynamic Island Navigation */}
      <nav 
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out"
        onMouseEnter={() => setNavExpanded(true)}
        onMouseLeave={() => setNavExpanded(false)}
        style={{
          width: navExpanded ? '600px' : '100px',
          height: '40px',
          borderRadius: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="h-full flex items-center justify-center gap-8 px-6">
          {!navExpanded ? (
            <div className="astronaut-float">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="white"/>
                <ellipse cx="12" cy="16" rx="6" ry="4" fill="white"/>
                <circle cx="10" cy="7" r="1" fill="black"/>
                <circle cx="14" cy="7" r="1" fill="black"/>
                <path d="M10 10 Q12 11 14 10" stroke="black" strokeWidth="0.5" fill="none"/>
              </svg>
            </div>
          ) : (
            <>
              <Link href="/" className="text-white text-sm font-medium hover:text-slate-300 transition">Home</Link>
              <Link href="/#work" className="text-white text-sm font-medium hover:text-slate-300 transition">Work</Link>
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium hover:text-slate-300 transition">Resume</Link>
              <Link href="mailto:pai00040@umn.edu" className="text-white text-sm font-medium hover:text-slate-300 transition">Contact</Link>
            </>
          )}
        </div>
      </nav>

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
              className="rounded-2xl border flex items-center justify-center"
              style={{
                aspectRatio: '3/4',
                background: 'rgba(0, 0, 0, 0.6)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="text-white text-center text-sm">Photo placeholder</span>
            </div>
          </div>
        </section>

        {/* Photo Grid Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-8 text-white">Elsewhere</h2>
          
          <div className="flex gap-4 overflow-x-auto pb-4">
            {['Hiking', 'India', 'Community', 'Moments', 'More'].map((label, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 w-48 aspect-square rounded-lg border flex items-center justify-center hover:border-white transition-colors"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <span className="text-white text-sm">{label}</span>
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