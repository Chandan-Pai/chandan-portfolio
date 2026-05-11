'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const REPO_URL = 'https://github.com/Chandanpai13/user-engagement-analysis';

/* ─────────────────────────────────────────────────────────────────
 *  PAGE
 * ──────────────────────────────────────────────────────────────── */
export default function UserEngagementAnalysisPage() {
  const [isDarkSection, setIsDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsDarkSection(window.scrollY < 640);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-slate-100 antialiased">
      <div className="min-h-screen bg-neutral-950 text-slate-100">
        {/* Back Button */}
        <div className="fixed z-50 left-4 sm:left-6" style={{ top: 'max(1rem, env(safe-area-inset-top, 0px))' }}>
          <Link
            href="/"
            aria-label="Back to portfolio"
            data-no-cursor-hover
            className={`inline-flex items-center gap-2 sm:gap-3 rounded-full px-3 py-2 sm:px-4 bg-white/20 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/30 transition-all ${
              isDarkSection ? 'text-white' : 'text-slate-100'
            }`}
          >
            <svg
              className={`w-4 h-4 shrink-0 text-white`}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`hidden sm:inline text-sm font-semibold text-white`}>
              Back to Portfolio
            </span>
          </Link>
        </div>

        {/* HERO */}
        <header className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white pt-[max(5.5rem,env(safe-area-inset-top)+3rem)] pb-16 sm:pb-20 md:pt-32 md:pb-24">
          <div className="project-gutter-x w-full min-w-0">
            <p className="text-xs font-mono tracking-widest text-sky-400 uppercase mb-4">
              Behavioral Data Analysis · Google Play Store
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              What Actually Drives App Engagement?
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 max-w-3xl">
              Behavioral data analysis of 8,196 Google Play Store apps.
            </p>

            {/* Stat callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-3xl">
              {[
                { value: '8,196', label: 'Apps analyzed' },
                { value: 'R² = 0.98', label: 'Model fit' },
                { value: '+29.8%', label: 'Free vs paid lift' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Python', 'Pandas', 'Scikit-learn', 'Scipy', 'Matplotlib'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 border-t border-white/15 pt-6 mt-2">
              <span>
                <span className="font-semibold text-white">Role:</span> Data Analyst &amp; Researcher
              </span>
              <span>
                <span className="font-semibold text-white">Team:</span> Solo project
              </span>
              <span>
                <span className="font-semibold text-white">Date:</span> April 2025
              </span>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sky-300 hover:text-sky-200 hover:underline"
              >
                GitHub repo ↗
              </a>
            </div>
          </div>
        </header>

        {/* PROBLEM */}
        <section id="problem" className="w-full py-12 border-t border-slate-700">
          <div className="project-gutter-x w-full min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The problem</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-3xl">
              Three problems had to be solved before the headline question could even be answered honestly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Messy raw data',
                  desc:
                    '1,181 duplicate entries plus unparseable Installs, Size, and Price fields ("10,000+", "19M", "$3.99").',
                },
                {
                  title: 'No single engagement metric',
                  desc:
                    'Ratings alone miss install volume — a 4.5★ app with 50 reviews is not the same as one with 500K reviews.',
                },
                {
                  title: 'Untested assumptions',
                  desc:
                    'Free vs paid impact was industry-assumed, never statistically validated at per-app scale on this dataset.',
                },
              ].map((card) => (
                <div key={card.title} className="border-l-4 border-rose-400 bg-rose-900/25 pl-4 py-3 rounded-r">
                  <p className="font-semibold text-slate-100 mb-1">{card.title}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METHODOLOGY */}
        <section id="methodology" className="w-full py-12 border-t border-slate-700">
          <div className="project-gutter-x w-full min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Methodology</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-3xl">
              Four steps, each justified by what the previous one revealed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  step: '01',
                  title: 'Data Cleaning',
                  desc:
                    'Removed 1,181 duplicates, parsed Installs / Size / Price fields, dropped rows with null Rating / Reviews / Installs.',
                  outcome: '8,196 clean apps · 0 nulls remaining',
                },
                {
                  step: '02',
                  title: 'Composite Engagement Score',
                  desc:
                    'Weighted index combining reach, depth of feedback, and quality. Rationale: volume signals sustained behavior; rating alone is gameable.',
                  outcome: '0.40 × norm(log Reviews) + 0.40 × norm(log Installs) + 0.20 × norm(Rating)',
                },
                {
                  step: '03',
                  title: 'Segmentation + Regression',
                  desc:
                    'Median split into High / Low groups, Welch t-test between groups, linear regression on standardized features to rank drivers.',
                  outcome: 't = 143, p < 0.0001 between segments',
                },
                {
                  step: '04',
                  title: 'A/B Natural Experiment',
                  desc:
                    "Used the real free / paid split as treatment vs control. Welch's t-test for significance on engagement-score means.",
                  outcome: 'n = 800 free · n = 604 paid',
                },
              ].map((s) => (
                <div key={s.step} className="bg-sky-950/40 border border-sky-800 rounded-lg p-5">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-xs font-mono font-bold tracking-widest text-sky-400">{s.step}</span>
                    <p className="font-semibold text-sky-200">{s.title}</p>
                  </div>
                  <p className="text-sm text-slate-300 mb-3 leading-relaxed">{s.desc}</p>
                  <p className="text-xs font-mono text-sky-300 bg-slate-800/90 border border-sky-700 rounded px-2 py-1.5 inline-block">
                    {s.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE DASHBOARD */}
        <section id="dashboard" className="w-full py-12 border-t border-slate-700 bg-slate-900/50">
          <div className="project-gutter-x w-full min-w-0">
            <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">Interactive Dashboard</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Explore the Data</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-3xl">
              Filter and compare across engagement segments and categories.
            </p>
            <Dashboard />
          </div>
        </section>

        {/* KEY FINDINGS */}
        <section id="findings" className="w-full py-12 border-t border-slate-700">
          <div className="project-gutter-x w-full min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Key Findings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  stat: '#1 Driver',
                  label:
                    'Review volume (coeff +0.154) — bigger impact than rating, price, or app size combined.',
                },
                {
                  stat: '+29.8%',
                  label: 'Free apps outperform paid (p < 0.0001, n = 1,404 apps).',
                },
                {
                  stat: '900×',
                  label:
                    'More reviews in high-engagement vs low-engagement apps (510K avg vs 558 avg).',
                },
              ].map((card) => (
                <div
                  key={card.stat}
                  className="bg-gradient-to-br from-slate-800/70 to-sky-900/40 border border-sky-700 rounded-lg p-6"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-sky-300 mb-3">{card.stat}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIMITATIONS */}
        <section id="limitations" className="w-full py-12 border-t border-slate-700">
          <div className="project-gutter-x w-full min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Research Limitations</h2>
            <div className="bg-amber-950/40 border-2 border-amber-700 rounded-lg p-6 max-w-3xl">
              <ul className="space-y-4 text-slate-200">
                <li className="flex gap-3">
                  <span className="text-amber-400 mt-1" aria-hidden>
                    ⚠
                  </span>
                  <span>
                    Dataset sourced from Kaggle (2019) — may not reflect current Play Store dynamics, ranking
                    algorithms, or post-pandemic install behavior.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 mt-1" aria-hidden>
                    ⚠
                  </span>
                  <span>
                    R² = 0.98 reflects partial circularity: the composite score shares input features (Reviews,
                    Installs, Rating) with the regression model. Future work: use an independent behavioral outcome
                    variable.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 mt-1" aria-hidden>
                    ⚠
                  </span>
                  <span>Observational study only — correlation, not causation.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* REFLECTION */}
        <section id="reflection" className="w-full py-12 border-t border-slate-700">
          <div className="project-gutter-x w-full min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Reflection</h2>
            <blockquote className="text-xl sm:text-2xl font-semibold italic text-slate-200 mb-6 pl-6 border-l-4 border-sky-500 max-w-3xl">
              &ldquo;The most important research skill is knowing when your metric design creates circular reasoning
              &mdash; and flagging it before someone else does. R² = 0.98 sounds impressive. Knowing why to distrust
              it is more impressive.&rdquo;
            </blockquote>
            <p className="text-slate-300 leading-relaxed max-w-3xl">
              The first version of the report buried R² = 0.98 as the headline number. Catching the feature overlap
              myself, before a reviewer did, turned a quietly weak finding into a clearly framed one &mdash; with an
              honest caveat and a defensible next step.
            </p>
          </div>
        </section>

        {/* FOOTER NAV */}
        <footer className="w-full border-t border-slate-700 py-12">
          <div className="project-gutter-x w-full min-w-0 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline transition">
              ← Back to Portfolio
            </Link>
            <Link
              href="/stay-tuned"
              className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline transition"
            >
              Next Project →
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  DASHBOARD (recharts-powered)
 *
 *  Static-export safety: recharts components only render after
 *  client hydration, since `ResponsiveContainer` measures the DOM.
 *  This whole file is `'use client'`, so that's fine.
 * ──────────────────────────────────────────────────────────────── */

const PALETTE = {
  highBlue: '#185FA5',
  lowBlue: '#B5D4F4',
  positiveGreen: '#1D9E75',
  negativeRed: '#E24B4A',
  categoryBlue: '#378ADD',
  paidSlate: '#94A3B8',
  grid: '#334155',
  text: '#cbd5e1',
};

const TOP_METRICS = [
  { label: 'Avg Engagement Score', value: '0.544', sub: 'composite, 0–1 scale' },
  { label: 'Avg Rating', value: '4.17', sub: 'out of 5' },
  { label: 'Avg Reviews', value: '255K', sub: 'per app, mean' },
  { label: 'Avg Installs', value: '9.2M', sub: 'per app, mean' },
];

const segmentData = [
  { metric: 'Avg Rating', high: 4.29, low: 4.05 },
  { metric: 'Reviews (×10K)', high: 51.0, low: 0.056 },
  { metric: 'Installs (×100K)', high: 182.8, low: 0.49 },
];

const regressionData = [
  { feature: 'Reviews (log)', coeff: 0.154 },
  { feature: 'Rating', coeff: 0.021 },
  { feature: 'Is Free', coeff: 0.008 },
  { feature: 'App Size', coeff: -0.0015 },
];

const abData = [
  { group: 'Free apps (n=800)', score: 0.555 },
  { group: 'Paid apps (n=604)', score: 0.428 },
];

const allCategories = [
  { name: 'Communication', score: 0.71 },
  { name: 'Social', score: 0.68 },
  { name: 'Video Players', score: 0.65 },
  { name: 'Photography', score: 0.63 },
  { name: 'Entertainment', score: 0.61 },
  { name: 'Travel & Local', score: 0.58 },
  { name: 'Tools', score: 0.56 },
  { name: 'Shopping', score: 0.54 },
  { name: 'Health & Fitness', score: 0.52 },
  { name: 'Education', score: 0.49 },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <MetricCards />
      <SegmentChartCard />
      <RegressionChartCard />
      <ABTestChartCard />
      <CategoryChartCard />
    </div>
  );
}

/* ── A. Metric cards ─────────────────────────────────────────── */
function MetricCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {TOP_METRICS.map((m) => (
        <div
          key={m.label}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-200"
        >
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{m.label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-100">{m.value}</p>
          <p className="text-xs text-slate-400 mt-1">{m.sub}</p>
        </div>
      ))}
    </div>
  );
}

/* ── B. Segment comparison ───────────────────────────────────── */
function SegmentChartCard() {
  const [view, setView] = useState('both'); // 'both' | 'high' | 'low'

  const showHigh = view === 'both' || view === 'high';
  const showLow = view === 'both' || view === 'low';

  return (
    <ChartCard
      title="High vs Low Engagement — Key Differences"
      controls={
        <ToggleGroup
          value={view}
          onChange={setView}
          options={[
            { id: 'both', label: 'Show Both' },
            { id: 'high', label: 'High Only' },
            { id: 'low', label: 'Low Only' },
          ]}
        />
      }
    >
      <div className="h-80 sm:h-96">
        <ClientOnly>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segmentData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
              <CartesianGrid stroke={PALETTE.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="metric" tick={{ fill: PALETTE.text, fontSize: 12 }} axisLine={{ stroke: PALETTE.grid }} tickLine={false} />
              <YAxis tick={{ fill: PALETTE.text, fontSize: 12 }} axisLine={{ stroke: PALETTE.grid }} tickLine={false} />
              <Tooltip content={<RechartsTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }} />
              {showHigh ? <Bar dataKey="high" name="High engagement" fill={PALETTE.highBlue} radius={[4, 4, 0, 0]} /> : null}
              {showLow ? <Bar dataKey="low" name="Low engagement" fill={PALETTE.lowBlue} radius={[4, 4, 0, 0]} /> : null}
            </BarChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <Legend swatchColor={PALETTE.highBlue} label="High engagement" />
        <Legend swatchColor={PALETTE.lowBlue} label="Low engagement" />
      </div>
      <p className="mt-3 text-sm text-slate-400">
        <span className="font-semibold text-slate-200">Review volume gap is 900×</span> — the most discriminating
        feature between groups.
      </p>
    </ChartCard>
  );
}

/* ── C. Regression coefficients ──────────────────────────────── */
function RegressionChartCard() {
  return (
    <ChartCard
      title="What Predicts Engagement? Regression Coefficients"
      subtitle="Standardized features. Green = positive driver, red = negative."
      headerTrailing={<span className="text-xs font-mono text-slate-400">R² = 0.98</span>}
    >
      <div className="h-72 sm:h-80">
        <ClientOnly>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={regressionData} margin={{ top: 8, right: 24, left: 32, bottom: 8 }}>
              <CartesianGrid stroke={PALETTE.grid} strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fill: PALETTE.text, fontSize: 12 }} axisLine={{ stroke: PALETTE.grid }} tickLine={false} />
              <YAxis
                type="category"
                dataKey="feature"
                tick={{ fill: PALETTE.text, fontSize: 12 }}
                axisLine={{ stroke: PALETTE.grid }}
                tickLine={false}
                width={110}
              />
              <Tooltip
                content={<RechartsTooltip valueFormatter={(v) => `${v >= 0 ? '+' : ''}${Number(v).toFixed(4)}`} />}
                cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
              />
              <Bar dataKey="coeff" radius={[0, 4, 4, 0]}>
                {regressionData.map((entry) => (
                  <Cell
                    key={entry.feature}
                    fill={entry.coeff >= 0 ? PALETTE.positiveGreen : PALETTE.negativeRed}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
        <Legend swatchColor={PALETTE.positiveGreen} label="Positive driver" />
        <Legend swatchColor={PALETTE.negativeRed} label="Negative driver" />
      </div>
    </ChartCard>
  );
}

/* ── D. A/B test result ──────────────────────────────────────── */
function ABTestChartCard() {
  return (
    <ChartCard title="Free vs Paid Apps — Natural Experiment">
      <div className="h-64 sm:h-72">
        <ClientOnly>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={abData} margin={{ top: 16, right: 12, left: 0, bottom: 8 }}>
              <CartesianGrid stroke={PALETTE.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="group" tick={{ fill: PALETTE.text, fontSize: 12 }} axisLine={{ stroke: PALETTE.grid }} tickLine={false} />
              <YAxis
                domain={[0, 0.7]}
                tick={{ fill: PALETTE.text, fontSize: 12 }}
                axisLine={{ stroke: PALETTE.grid }}
                tickLine={false}
              />
              <Tooltip
                content={<RechartsTooltip valueFormatter={(v) => Number(v).toFixed(3)} />}
                cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {abData.map((entry, i) => (
                  <Cell key={entry.group} fill={i === 0 ? PALETTE.positiveGreen : PALETTE.paidSlate} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>
      <div className="mt-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-950/60 border border-emerald-700 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
          +29.8% lift · p &lt; 0.0001 · Welch t-test
        </span>
      </div>
    </ChartCard>
  );
}

/* ── E. Category chart with filter ───────────────────────────── */
function CategoryChartCard() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredData = useMemo(() => {
    switch (activeFilter) {
      case 'high':
        return allCategories.filter((c) => c.score >= 0.6);
      case 'mid':
        return allCategories.filter((c) => c.score >= 0.5 && c.score < 0.6);
      case 'low':
        return allCategories.filter((c) => c.score < 0.5);
      case 'all':
      default:
        return allCategories;
    }
  }, [activeFilter]);

  const chartHeight = Math.max(120, filteredData.length * 44 + 60);

  return (
    <ChartCard
      title="Avg Engagement Score by App Category"
      controls={
        <ToggleGroup
          value={activeFilter}
          onChange={setActiveFilter}
          options={[
            { id: 'all', label: 'All' },
            { id: 'high', label: 'High ≥0.60' },
            { id: 'mid', label: 'Mid 0.50–0.60' },
            { id: 'low', label: 'Low <0.50' },
          ]}
        />
      }
    >
      {filteredData.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-400">No categories match this filter.</p>
      ) : (
        <div style={{ height: chartHeight }}>
          <ClientOnly fallbackHeight={chartHeight}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={filteredData}
                margin={{ top: 8, right: 24, left: 40, bottom: 8 }}
              >
                <CartesianGrid stroke={PALETTE.grid} strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 0.8]}
                  tick={{ fill: PALETTE.text, fontSize: 12 }}
                  axisLine={{ stroke: PALETTE.grid }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: PALETTE.text, fontSize: 12 }}
                  axisLine={{ stroke: PALETTE.grid }}
                  tickLine={false}
                  width={130}
                />
                <Tooltip
                  content={<RechartsTooltip valueFormatter={(v) => Number(v).toFixed(2)} />}
                  cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
                />
                <Bar dataKey="score" fill={PALETTE.categoryBlue} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ClientOnly>
        </div>
      )}
      <p className="mt-3 text-xs text-slate-400">
        Showing {filteredData.length} of {allCategories.length} categories.
      </p>
    </ChartCard>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Shared chart primitives
 * ──────────────────────────────────────────────────────────────── */

function ChartCard({ title, subtitle, controls, headerTrailing, children }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-100">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs text-slate-400">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {headerTrailing}
          {controls}
        </div>
      </div>
      {children}
    </div>
  );
}

/** Recharts' ResponsiveContainer measures the DOM, which fails during SSG/initial hydration
 *  with `output: 'export'` (producing harmless but noisy `width(-1)` warnings). Gate chart
 *  rendering behind a mount check so the chart only renders after layout. */
function ClientOnly({ fallbackHeight, children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <div
        style={typeof fallbackHeight === 'number' ? { height: fallbackHeight } : undefined}
        className={typeof fallbackHeight === 'number' ? '' : 'h-full'}
        aria-hidden
      />
    );
  }
  return children;
}

function ToggleGroup({ value, onChange, options }) {
  return (
    <div
      role="group"
      className="inline-flex flex-wrap gap-1 rounded-md border border-slate-700 bg-slate-900/50 p-0.5 text-xs font-medium"
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={active}
            className={`px-2.5 py-1 rounded transition-colors ${
              active
                ? 'bg-slate-800 text-slate-100 shadow-sm border border-sky-700/40'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Legend({ swatchColor, label }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-2.5 w-2.5 rounded-sm"
        style={{ backgroundColor: swatchColor }}
        aria-hidden
      />
      {label}
    </span>
  );
}

function RechartsTooltip({ active, payload, label, valueFormatter }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-md border border-slate-600 bg-slate-900/95 backdrop-blur-sm shadow-lg px-3 py-2 text-xs">
      {label ? <p className="font-semibold text-slate-100 mb-1">{label}</p> : null}
      <ul className="space-y-0.5">
        {payload.map((entry) => (
          <li key={entry.dataKey} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-sm"
              style={{ backgroundColor: entry.color || entry.payload?.fill }}
              aria-hidden
            />
            <span className="text-slate-400">{entry.name || entry.dataKey}:</span>
            <span className="font-mono text-slate-100">
              {valueFormatter ? valueFormatter(entry.value) : entry.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
