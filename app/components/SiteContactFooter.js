export default function SiteContactFooter() {
  return (
    <footer
      className="relative z-10 w-full min-w-0 shrink-0 self-stretch border-t border-slate-800 bg-neutral-950"
      style={{ backgroundColor: '#0a0a0a', width: '100%', boxSizing: 'border-box' }}
    >
      <div className="mx-auto max-w-5xl px-5 pt-16 sm:px-8 pb-[max(4rem,env(safe-area-inset-bottom,0px)+3rem)]">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Contact</p>
        <a
          href="mailto:2000chandanpai@gmail.com"
          className="inline-flex text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline"
        >
          2000chandanpai@gmail.com
        </a>
        <p className="text-sm text-slate-500 mt-2">Reach out by email. Happy to talk research, product, or collaboration.</p>
      </div>
    </footer>
  );
}
