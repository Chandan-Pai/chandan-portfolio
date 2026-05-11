'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Top-of-page progress bar that sweeps left→right on every route change.
 *
 * Mounted once globally in app/layout.js. Purely visual feedback — does not
 * delay or interrupt navigation. Pairs with `data-scroll-behavior="smooth"`
 * on <html> (set in layout.js): that attribute tells Next to use instant
 * scrolling on route transitions, so the underlying scroll-to-top no longer
 * animates back through home-page sections.
 *
 * Each pathname change increments `transitionId`, which is used as a React
 * `key` so the bar's CSS animation restarts cleanly (no manual reset needed,
 * cancels any in-flight animation if navigation chains).
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [transitionId, setTransitionId] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setTransitionId((id) => id + 1);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[300] pointer-events-none h-[3px]"
    >
      {transitionId > 0 ? (
        <div
          key={transitionId}
          className="route-transition-bar h-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 shadow-[0_0_12px_rgba(56,189,248,0.55)]"
        />
      ) : null}
    </div>
  );
}
