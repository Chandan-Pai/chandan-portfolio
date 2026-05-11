'use client';

import { useState, useEffect, useCallback } from 'react';

const COOKIE_NAME = 'portfolio_intro';
const COOKIE_MAX_AGE_DAYS = 30;

function getCookiePath() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!base || base === '/') return '/';
  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function readIntroCookie() {
  if (typeof document === 'undefined') return true;
  const pattern = new RegExp(`(?:^|; )${COOKIE_NAME}=1(?:;|$)`);
  return pattern.test(document.cookie);
}

function writeIntroCookie() {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_MAX_AGE_DAYS);
  const path = getCookiePath();
  document.cookie = `${COOKIE_NAME}=1; expires=${expires.toUTCString()}; path=${path}; SameSite=Lax`;
}

export default function FirstVisit() {
  /** null = not yet read on client; true = show tour; false = skip */
  const [show, setShow] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setShow(!readIntroCookie());
  }, []);

  const dismiss = useCallback(() => {
    writeIntroCookie();
    setShow(false);
  }, []);

  useEffect(() => {
    if (show !== true) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [show, dismiss]);

  if (show !== true) return null;

  const steps = [
    {
      title: "Hey, I'm Chandan.",
      body: 'Human Factors Engineer and UX Researcher. This portfolio is built to show how I think, not just what I have shipped.',
      action: 'See my work',
    },
    {
      title: 'How to navigate',
      body: 'Scroll home to Work for case studies. Each card opens a full write-up. On desktop, the top nav island expands on hover; on your phone, use the menu at the top right.',
      action: 'Next',
    },
    {
      title: 'Small detail',
      body: 'On desktop, a custom cursor highlights interactive spots. On touch devices it stays out of the way.',
      action: 'Enter site',
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div
      className="first-visit-overlay fixed inset-0 z-[100] flex items-end justify-start p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-8 sm:pb-10 md:p-12 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="first-visit-title"
      aria-describedby="first-visit-body"
    >
      <button
        type="button"
        className="first-visit-backdrop absolute inset-0 bg-black/25 backdrop-blur-[2px] pointer-events-auto cursor-default border-0 p-0"
        aria-label="Dismiss intro"
        onClick={dismiss}
      />

      <div className="first-visit-card relative pointer-events-auto w-full max-w-sm rounded-2xl border border-slate-600/80 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-5 flex gap-1.5" role="tablist" aria-label="Intro steps">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-sky-400' : 'w-2 bg-slate-600'}`}
              aria-hidden
            />
          ))}
        </div>

        <h2 id="first-visit-title" className="mb-2 text-xl font-bold text-slate-100">
          {current.title}
        </h2>
        <p id="first-visit-body" className="mb-6 text-sm leading-relaxed text-slate-400">
          {current.body}
        </p>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={dismiss}
            className="text-xs text-slate-500 transition hover:text-slate-300"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={() => {
              if (isLast) dismiss();
              else setStep((s) => s + 1);
            }}
            className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-500"
          >
            {current.action}
            {!isLast ? ' →' : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
