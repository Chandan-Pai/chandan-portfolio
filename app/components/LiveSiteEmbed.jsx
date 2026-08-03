'use client';

/**
 * Browser-chrome live iframe — same pattern as Campus Sync.
 * Pass embedSrc when the iframe needs a special query (e.g. Streamlit ?embed=true)
 * while the chrome / open-link still show the clean public URL.
 */
export default function LiveSiteEmbed({
  url,
  embedSrc,
  title,
  linkLabel,
}) {
  const frameSrc = embedSrc || url;
  const chromeUrl = url.startsWith('http') ? url : `https://${url.replace(/^https?:\/\//, '')}`;

  return (
    <div
      className="my-10 overflow-hidden rounded-xl border border-slate-700/90 bg-slate-900 shadow-lg"
      data-no-cursor-hover
    >
      <div className="flex items-center gap-2 border-b border-slate-700/80 bg-slate-800/90 px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400/90" />
          <span className="size-2.5 rounded-full bg-amber-400/90" />
          <span className="size-2.5 rounded-full bg-green-400/90" />
        </span>
        <div className="min-w-0 flex-1 truncate rounded-md border border-slate-700/80 bg-slate-900 px-3 py-1 font-mono text-xs text-slate-400">
          {chromeUrl}
        </div>
      </div>
      <div className="relative h-[min(70svh,640px)] min-h-[320px] w-full bg-slate-900">
        <iframe
          title={title}
          src={frameSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="camera; microphone; clipboard-write"
        />
      </div>
      <p className="border-t border-slate-700 bg-slate-900/50 px-3 py-2 text-xs text-slate-400">
        Live embed. If this area stays blank, framing may be blocked; use{' '}
        <a
          href={url}
          className="font-medium text-sky-400 underline hover:text-sky-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </a>{' '}
        in a new tab.
      </p>
    </div>
  );
}
