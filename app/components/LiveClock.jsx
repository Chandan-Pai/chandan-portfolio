'use client';

import { useEffect, useState } from 'react';

/** Clock text must not depend on `new Date()` during the first paint (SSR + hydration). */
export default function LiveClock({ variant = 'onDark', layout = 'stack' }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(() => new Date(0));

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const timeClass = variant === 'onLight' ? 'text-slate-900' : 'text-white';
  const dateClass = variant === 'onLight' ? 'text-slate-600' : 'text-slate-400';

  if (layout === 'inline') {
    return (
      <div className="flex flex-shrink-0 items-baseline justify-end gap-1.5 whitespace-nowrap text-xs">
        <span className={`${timeClass} font-medium tabular-nums`}>{mounted ? timeStr : '—'}</span>
        <span className={dateClass} aria-hidden="true">
          ·
        </span>
        <span className={`${dateClass} tabular-nums`}>{mounted ? dateStr : '—'}</span>
      </div>
    );
  }

  return (
    <div className="w-20 flex-shrink-0 text-right">
      <div className={`${timeClass} text-xs font-medium leading-tight`}>{mounted ? timeStr : '—'}</div>
      <div className={`${dateClass} text-xs leading-tight`}>{mounted ? dateStr : '—'}</div>
    </div>
  );
}
