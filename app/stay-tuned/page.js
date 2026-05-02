import Link from 'next/link';

export const metadata = {
  title: 'More work — Chandan Pai',
  description: 'More case studies and project write-ups are on the way.',
};

export default function StayTunedPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs font-semibold tracking-[0.25em] text-sky-600 uppercase mb-6">Overview</p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Stay tuned</h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-4">
          You&apos;ve seen the four featured projects on this portfolio. I&apos;m working on additional write-ups and
          experiments — human factors, field research, and product work that doesn&apos;t fit neatly into a single case
          study yet.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          Check back here for updates, or reach out if you want to talk through something in progress.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-200">
          <Link href="/" className="text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition">
            ← Back to portfolio
          </Link>
          <Link href="/#work" className="text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition">
            Browse featured work →
          </Link>
        </div>
      </div>
    </main>
  );
}
