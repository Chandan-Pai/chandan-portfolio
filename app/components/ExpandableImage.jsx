'use client';

import { useEffect, useState } from 'react';

/**
 * Click-to-expand image used across project case studies.
 *
 * - Renders the image in-place at whatever size the layout dictates
 *   (use `className` for the wrapper, `imgClassName` for the <img>).
 * - On click/tap or Enter/Space, opens a fullscreen lightbox so users
 *   can read fine detail. ESC, backdrop click, or the close button
 *   dismisses it. Body scroll is locked while open.
 * - Pairs with the custom desktop cursor: hovering shows the "Expand"
 *   pill on devices with a fine pointer; touch devices just tap.
 */
export default function ExpandableImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  caption,
  captionClassName = '',
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <figure
        className={`group relative my-10 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 shadow-sm transition-shadow duration-300 hover:shadow-md cursor-zoom-in ${className}`}
        role="button"
        tabIndex={0}
        aria-label={alt ? `Expand image: ${alt}` : 'Expand image'}
        data-cursor-expand
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
          }
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`block w-full rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.02] ${imgClassName}`}
        />
        {caption ? (
          <figcaption
            className={
              captionClassName ||
              'px-3 py-2 text-xs text-slate-500 bg-white border-t border-slate-200'
            }
          >
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {isOpen ? <Lightbox src={src} alt={alt} onClose={close} /> : null}
    </>
  );
}

function Lightbox({ src, alt, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt ? `Expanded view: ${alt}` : 'Expanded image'}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
      onClick={onClose}
      data-no-cursor-hover
    >
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] max-w-[92vw] object-contain rounded-lg shadow-2xl select-none"
        draggable={false}
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close expanded image"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition"
        data-no-cursor-hover
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
