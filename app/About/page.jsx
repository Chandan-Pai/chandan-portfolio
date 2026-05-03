'use client';

import Link from 'next/link';

function publicAssetUrl(basePath, relativePath) {
  const encoded = relativePath
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  if (!basePath) return `/${encoded}`;
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${base}/${encoded}`;
}

const JOURNEY = [
  {
    range: '2026',
    items: [
      'Graduated from the University of Minnesota with my Masters in Human Factors Engineering',
      'Activaly searching for a job in the field of Human Factors Engineering or UX Research',
    ],
  },
  {
    range: '2025',
    items: [
      'Refreshed this portfolio site',
      'CampusSync shipped for University of Minnesota students — tunnel navigation, mixed-methods UX, live product',
      'Major Personal events Travelled to India Twice for parents and family visits',
      'Became a Graduate Teaching Assistant for the Human Factors Engineering course at the University of Minnesota',
    ],
  },
  {
    range: '2024',
    items: [
      'Quit my Mercedes Benz job to pursue my Masters in Human Factors Engineering at the University of Minnesota and moved to USA',
      'worked on two major projects during my Masters: Initiator Fellowship website and Boston Scientific Wolverine blade line',
    ],
  },
  {
    range: '2023',
    items: [
      'Got Promoted to Engieer at Mercedes Benz Research and Development India Pvt Ltd',
      'Started building repair concepts upcomming for Mercedes Benz cars and automating multiple processes',
      'Realization hit that I want to do more than just CAD work and I want to be a part of the design process',
    ],
  },
  {
    range: '2022',
    items: [
      'Graduated from the SDM College of Engineering and Technology, Dharrwad, karnataka, India with my Bachelors in Mehcanical Engineering',
      'Started working as a Graduate Engineering Trainee at Mercedes Benz Research and Development India Pvt Ltd as a CAD Engineer',
    ],
  },
  {
    range: 'Earlier',
    items: [
      'Mercedes-Benz internship — repair throughput, cognitive load on the line; learned how bottlenecks hide in real workflows',
      'Built habit of validating systems in the real world — from go-kart steering to production constraints, not just slides',
    ],
  },
];

const LIFE_OUTSIDE = [
  {
    src: 'images/about/duluth trip sunrise.jpg',
    caption: 'Duluth sunrise hike — cold air, early light, good reset before a busy semester.',
  },
  {
    src: 'images/about/me at mercedes .jpg',
    caption: 'India —First day at mercedes benz research and development india pvt ltd',
  },
  {
    src: 'images/about/aagumbe.jpg',
    caption: 'Trip to Aagumbe ',
  },
  {
    src: 'images/about/minigolf at stone mountain.JPG',
    caption: 'Stone Mountain mini-golf — low-stakes competition with Family.',
  },
  {
    src: 'images/about/ooty.jpg',
    caption: 'Ooty — hills, mist, and slowing down when screens get too loud.',
  },
];

export default function AboutPage() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const img = (rel) => publicAssetUrl(BASE_PATH, rel);

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <div
        className="about-hero-bg fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images5.alphacoders.com/492/492784.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: 'grayscale(100%) brightness(0.3)',
        }}
      />

      <div className="relative z-10">
        <section className="flex flex-col items-center justify-center px-6 pt-20 pb-8 relative" style={{ minHeight: '50vh' }}>
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
              alt=""
              width={250}
            />
          </div>

          <div className="astronaut astronaut2">
            <img
              src="https://images.vexels.com/media/users/3/152641/isolated/preview/2b3d63661f0d7fe62c36168604985f26-space-cosmonaut-cartoon-by-vexels.png"
              alt=""
              width={250}
            />
          </div>
        </section>

        {/* Intro + portrait — side by side on large screens */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div
              className="rounded-2xl border p-8 sm:p-10 backdrop-blur-md"
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
              }}
            >
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed mb-4">
                Hey, my name is <span className="font-semibold text-white">Chandan</span>.
              </p>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-4">
                I try to figure out why things fail and try to fix them.
              </p>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-4">
                Most systems are broken because nobody talks to the people using them. I learned this the hard way at{' '}
                <strong className="text-white font-semibold">Mercedes-Benz</strong>, sitting in an office designing repair
                workflows I&apos;d never actually watched someone use. The moment I saw a technician struggle with what I
                built, everything changed. A mentor told me:{' '}
                <q className="text-white font-semibold not-italic">
                  Every conversation is not perfect and you cannot get everything out of it, but it could prepare you for
                  next.
                </q>{' '}
                That&apos;s how I think now — every failed assumption, every moment you realize you were wrong, that&apos;s
                not failure. That&apos;s preparation.
              </p>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-4">
                Now I don&apos;t design anything without watching real people do real work. I&apos;ve applied this across{' '}
                <strong className="text-white font-semibold">education</strong>,{' '}
                <strong className="text-white font-semibold">public-sector design</strong>,{' '}
                <strong className="text-white font-semibold">automotive repair</strong>, and{' '}
                <strong className="text-white font-semibold">medical device manufacturing</strong>. Every project taught me
                where friction actually lives — and it&apos;s never just the interface.
              </p>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-4">
                I&apos;m based around the Twin Cities at University of Minnesota. If you care about real workflows, real
                users, and building systems that actually work under pressure, reach out.
              </p>
              <p className="text-sm text-sky-300/90">
                <a href="mailto:2000chandanpai@gmail.com" className="underline hover:text-sky-200">
                  2000chandanpai@gmail.com
                </a>
              </p>
            </div>

            <div
              className="rounded-2xl border overflow-hidden w-full max-w-md mx-auto lg:max-w-none"
              style={{ aspectRatio: '3/4', borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <img src={img('images/about/fall photo.jpg')} alt="Chandan Pai" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* MY JOURNEY */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <h2 className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase mb-10">My journey</h2>
          <div className="space-y-12">
            {JOURNEY.map((block) => (
              <div key={block.range}>
                <p className="text-white font-bold text-lg mb-4">{block.range}</p>
                <ul className="space-y-3 text-white/85 text-base leading-relaxed list-disc pl-5 marker:text-white/40">
                  {block.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* MY LIFE OUTSIDE WORK */}
        <section className="max-w-5xl mx-auto px-6 pb-28">
          <h2 className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase mb-6">My life outside work</h2>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl mb-12">
            I make time to travel, be outside, and reset away from screens. Here are a few moments that keep me
            grounded.
          </p>

          <div className="life-outside-strip-outer relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden py-2">
            <div className="life-outside-strip-track flex gap-4 sm:gap-5 pr-4 sm:pr-5">
              {[...LIFE_OUTSIDE, ...LIFE_OUTSIDE].map((item, i) => (
                <figure
                  key={`${item.src}-${i}`}
                  className="relative shrink-0 w-[min(78vw,300px)] sm:w-[min(42vw,340px)] h-[220px] sm:h-[260px] rounded-xl border overflow-hidden shadow-lg shadow-black/40"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <img
                    src={img(item.src)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 px-3 py-2.5 text-xs sm:text-sm text-white/90 leading-snug bg-gradient-to-t from-black/85 via-black/55 to-transparent max-h-[45%] overflow-y-auto">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <p className="mt-16 text-base text-white/90 leading-relaxed max-w-2xl">
            <span className="font-semibold text-sky-300">P.S.</span> When I am stuck on a problem, I still reach for a
            pen before a new slide — drawing helps me see the system.
          </p>
        </section>
      </div>

      <style jsx>{`
        @keyframes lifeOutsideStrip {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .life-outside-strip-track {
          width: max-content;
          animation: lifeOutsideStrip 95s linear infinite reverse;
          animation-delay: -12s;
        }
        @media (prefers-reduced-motion: reduce) {
          .life-outside-strip-outer {
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-gutter: stable;
          }
          .life-outside-strip-track {
            animation: none;
            animation-delay: 0s;
          }
        }
        .astronaut {
          position: absolute;
          padding-top: 150px;
          display: block;
        }
        @media (max-width: 639px) {
          .astronaut {
            padding-top: 80px;
            opacity: 0.4;
            pointer-events: none;
          }
          .astronaut img {
            width: 120px !important;
            height: auto !important;
          }
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
          0% {
            transform: translateY(0px);
          }
          10% {
            transform: translateY(30px) rotate(10deg);
          }
          20% {
            transform: translateY(60px) rotate(20deg);
          }
          30% {
            transform: translateY(90px) rotate(30deg);
          }
          40% {
            transform: translateY(120px) rotate(20deg);
          }
          50% {
            transform: translateY(150px) rotate(30deg);
          }
          60% {
            transform: translateY(120px) rotate(40deg);
          }
          70% {
            transform: translateY(90px) rotate(10deg);
          }
          80% {
            transform: translateY(60px) rotate(20deg);
          }
          90% {
            transform: translateY(30px) rotate(10deg);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes anim2 {
          0% {
            transform: translateY(0px);
          }
          10% {
            transform: translateY(-30px) rotate(-10deg);
          }
          20% {
            transform: translateY(-60px) rotate(-20deg);
          }
          30% {
            transform: translateY(-90px) rotate(-10deg);
          }
          40% {
            transform: translateY(-120px) rotate(0deg);
          }
          50% {
            transform: translateY(-150px) rotate(-10deg);
          }
          60% {
            transform: translateY(-120px) rotate(0deg);
          }
          70% {
            transform: translateY(-90px) rotate(20deg);
          }
          80% {
            transform: translateY(-60px) rotate(10deg);
          }
          90% {
            transform: translateY(-30px) rotate(0deg);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </main>
  );
}
