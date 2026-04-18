import Link from 'next/link';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-slate-900">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800">← Back to home</Link>
      </div>

      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Mercedes‑Benz Service Manual App</h1>
        <p className="mt-2 text-slate-600">QR-based interactive repair guidance with multi-format support (text/audio/video). Participatory design with n=4 usability validation.</p>
      </header>

      <section className="rounded-lg border-2 border-dashed border-slate-300 h-48 flex items-center justify-center bg-slate-50">
        <span className="text-sm text-slate-500">Case study placeholder — Mercedes service manual</span>
      </section>

      <footer className="mt-8 text-sm text-slate-500">Role: Product Design &amp; UX Research</footer>
    </main>
  );
}
