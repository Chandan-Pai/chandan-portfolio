export default function SiteContactFooter() {
  return (
    <footer
      className="relative z-10 w-full min-w-0 shrink-0 self-stretch border-t border-gray-200 bg-white [background-color:rgb(255,255,255)]"
      style={{ backgroundColor: '#ffffff', width: '100%', boxSizing: 'border-box' }}
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Contact</p>
        <a
          href="mailto:2000chandanpai@gmail.com"
          className="inline-flex text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline"
        >
          2000chandanpai@gmail.com
        </a>
        <p className="text-sm text-gray-500 mt-2">Reach out by email — happy to talk research, product, or collaboration.</p>
      </div>
    </footer>
  );
}
