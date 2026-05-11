import Link from 'next/link';

export const metadata = {
  title: 'More work | Chandan Pai',
  description: 'More case studies and project write-ups are on the way.',
};

export default function StayTunedPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-slate-100 antialiased">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 md:py-28 pb-[max(5rem,env(safe-area-inset-bottom))]">
        <p className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase mb-6">Overview</p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">Stay tuned</h1>
        <ul className="list-disc list-outside space-y-2 text-lg text-slate-400 leading-relaxed mb-10 pl-5 marker:text-sky-500 max-w-xl">
          <li>
            More write-ups coming: human factors, field research, and product work that is not a single case study yet.
          </li>
          <li>Check back for updates, or reach out to talk through something in progress.</li>
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link href="/" className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline transition">
            ← Back to portfolio
          </Link>
          <Link href="/#work" className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline transition">
            Browse featured work →
          </Link>
        </div>
      </div>
    </main>
  );
}
