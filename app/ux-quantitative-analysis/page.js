'use client';

import React from 'react';
import Link from 'next/link';
import { MotionHero, MotionSection, MotionBlock, FadeUp, FadeUpScale, MotionGrid } from '../components/MotionCaseStudy';

const REPO_URL = 'https://github.com/Chandan-Pai/UX-quantitative-analysis';
const LIVE_URL = 'https://ux-quantitative-analysis-f7wxsl89jopdxvcaycsukx.streamlit.app/';

function publicAssetUrl(basePath, relativePath) {
  const encoded = relativePath
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  if (!basePath) return `/${encoded}`;
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${base}/${encoded}`;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
const heroSrc = publicAssetUrl(BASE_PATH, 'images/ux-quantitative-analysis/hero.svg');

export default function QuantUxValidationPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-slate-100 antialiased">
      <div className="fixed z-50 left-4 sm:left-6" style={{ top: 'max(1rem, env(safe-area-inset-top, 0px))' }}>
        <Link
          href="/"
          aria-label="Back to portfolio"
          data-no-cursor-hover
          className="inline-flex items-center gap-2 sm:gap-3 rounded-full px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/30 transition-all text-white"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline text-sm font-semibold">Back to Portfolio</span>
        </Link>
      </div>

      <header className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white pt-[max(5.5rem,env(safe-area-inset-top)+3rem)] pb-16 sm:pb-20 md:pt-32 md:pb-24">
        <MotionHero className="project-gutter-x w-full min-w-0">
          <FadeUp as="p" className="text-xs font-mono tracking-widest text-sky-400 uppercase mb-4">
            Quantitative UX Research · Validation Suite
          </FadeUp>
          <FadeUp as="h1" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Quant UX Validation Suite
          </FadeUp>
          <FadeUp as="p" className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 max-w-3xl">
            End-to-end quantitative validation across survey, usability testing, and A/B experiment
            data — cleaned, modeled, and published as a live decision-oriented Streamlit app.
          </FadeUp>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-3xl" stagger={0.15}>
            {[
              { value: '3 studies', label: 'Survey · Usability · A/B' },
              { value: '0.96', label: 'Task-success ROC-AUC' },
              { value: 'Live app', label: 'Streamlit Community Cloud' },
            ].map((stat) => (
              <FadeUpScale
                key={stat.label}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">{stat.label}</p>
              </FadeUpScale>
            ))}
          </MotionGrid>

          <FadeUp className="flex flex-wrap gap-2 mb-6">
            {['Python', 'Pandas', 'Scikit-learn', 'Scipy', 'Plotly', 'Streamlit'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-gray-100"
              >
                {tag}
              </span>
            ))}
          </FadeUp>

          <FadeUp className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-2">
            <span>
              <span className="font-semibold text-white">Role:</span> Quantitative UX Researcher
            </span>
            <span>
              <span className="font-semibold text-white">Team:</span> Solo project
            </span>
            <span>
              <span className="font-semibold text-white">Date:</span> August 2026
            </span>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-300 hover:text-sky-200 hover:underline"
            >
              GitHub repo ↗
            </a>
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-300 hover:text-sky-200 hover:underline"
            >
              Live dashboard ↗
            </a>
          </FadeUp>
        </MotionHero>
      </header>

      <section className="project-gutter-x py-10 sm:py-14 border-b border-slate-800">
        <FadeUp>
          <img
            src={heroSrc}
            alt="Quant UX Validation Suite overview graphic showing survey, usability, and A/B pipelines"
            className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-700/80 shadow-2xl"
          />
        </FadeUp>
      </section>

      <MotionSection className="project-gutter-x py-14 sm:py-20 space-y-10 max-w-4xl">
        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            Problem
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed">
            Hiring managers and product partners often ask whether a researcher can run quantitative
            validation end to end — not only charts, but cleaning, comparison, and a clear product
            decision. This project answers that with a reusable suite pattern.
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            Approach
          </FadeUp>
          <FadeUp as="ul" className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
            <li>
              <span className="text-slate-100 font-medium">Pipeline:</span> educational raw CSV →
              cleaning scripts → analysis-ready tables → Streamlit readout.
            </li>
            <li>
              <span className="text-slate-100 font-medium">Same story on every page:</span> decision
              banner → KPIs → where it breaks → segments → method.
            </li>
            <li>
              <span className="text-slate-100 font-medium">Studies shipped:</span> survey
              questionnaire (including a task-success model check), usability testing friction
              ranking, and A/B variant scorecards with conversion and bounce guards.
            </li>
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            Outcomes
          </FadeUp>
          <FadeUp as="ul" className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
            <li>Public GitHub repo with reproducible cleaners and processed datasets.</li>
            <li>Live multipage Streamlit app on Community Cloud for interactive demos.</li>
            <li>
              Holdout logistic model on survey task success with ROC-AUC ≈ 0.96 (diagnostic, not a
              production scorer).
            </li>
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp as="h2" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            Data credit &amp; honesty
          </FadeUp>
          <FadeUp as="p" className="text-slate-300 leading-relaxed">
            Survey, usability, and A/B CSVs come from{' '}
            <strong className="text-slate-100">Mohsen Rafiei, Ph.D.</strong>,{' '}
            <em>UX Datasets Collection</em> (2025), Perceptual User Experience Lab (PUX Lab). These
            are <strong className="text-slate-100">synthetically generated educational datasets</strong>
            — not real product telemetry. Results are for methods practice and portfolio
            demonstration only.
          </FadeUp>
          <FadeUp as="p" className="text-slate-400 text-sm mt-4 leading-relaxed">
            Source:{' '}
            <a
              href="https://github.com/mohsen-rafiei/UX_datasets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              github.com/mohsen-rafiei/UX_datasets
            </a>
          </FadeUp>
        </MotionBlock>

        <MotionBlock>
          <FadeUp className="flex flex-wrap gap-3 pt-4">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition-colors"
            >
              Open live dashboard
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400 transition-colors"
            >
              View GitHub repo
            </a>
          </FadeUp>
        </MotionBlock>
      </MotionSection>
    </main>
  );
}
