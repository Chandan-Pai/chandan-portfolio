export default function SiteContactFooter() {
  return (
    <footer
      className="relative z-10 w-full min-w-0 shrink-0 self-stretch border-t border-gray-200 bg-white [background-color:rgb(255,255,255)]"
      style={{ backgroundColor: '#ffffff', width: '100%', boxSizing: 'border-box' }}
    >
      <div className="mx-auto max-w-5xl px-5 pt-16 sm:px-8 pb-[max(4rem,env(safe-area-inset-bottom,0px)+3rem)]">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Contact</p>
        <a
          href="mailto:2000chandanpai@gmail.com"
          className="inline-flex text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline"
        >
          2000chandanpai@gmail.com
        </a>
        <p className="text-sm text-gray-500 mt-2">Reach out by email. Happy to talk research, product, or collaboration.</p>
      </div>
    </footer>
  );
}
