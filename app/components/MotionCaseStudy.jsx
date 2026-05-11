'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useMemo, useRef } from 'react';

const EASE = [0.25, 0.46, 0.45, 0.94];

/** Trigger threshold for all section-level scroll spy refs. */
const DEFAULT_IN_VIEW = { once: true, amount: 0.2 };

/** Orchestrator variant: no visual animation on the parent itself; just stagger
 *  timing for motion children. Keeping the parent layout-stable avoids the
 *  "visible gap before section enters view" artifact that translating the
 *  section box would produce. */
function makeStagger(stagger) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
}

/* ─── Section wrappers: own ref + own useInView ───────────────────────────── */

export function MotionSection({ id, className, children, stagger = 0.15 }) {
  const ref = useRef(null);
  const inView = useInView(ref, DEFAULT_IN_VIEW);
  const variants = useMemo(() => makeStagger(stagger), [stagger]);
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}

export function MotionBlock({ className, children, stagger = 0.15 }) {
  const ref = useRef(null);
  const inView = useInView(ref, DEFAULT_IN_VIEW);
  const variants = useMemo(() => makeStagger(stagger), [stagger]);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Above-the-fold hero block: animates once on mount, no scroll trigger. */
export function MotionHero({ className, children, stagger = 0.15 }) {
  const variants = useMemo(() => makeStagger(stagger), [stagger]);
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/* ─── Child wrappers (inherit visible/hidden state from nearest motion parent) ─ */

/** Stagger orchestrator for a grid/row of motion children. Useful when the
 *  staggered children are nested inside a non-motion wrapper (e.g. project
 *  gutter) and so wouldn't otherwise be direct children of `MotionSection`. */
export function MotionGrid({ className, children, stagger = 0.15, as = 'div' }) {
  const variants = useMemo(() => makeStagger(stagger), [stagger]);
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}

/** Fade-up wrapper for individual elements (headings, paragraphs, cards). */
export function FadeUp({ as = 'div', className, children, delay = 0 }) {
  const prefersReduced = useReducedMotion();
  const variant = useMemo(
    () => ({
      hidden: { opacity: 0, y: prefersReduced ? 0 : 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE, delay },
      },
    }),
    [prefersReduced, delay]
  );
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={variant}>
      {children}
    </Tag>
  );
}

/** Subtle scale-up for stat / impact / metric cards. */
export function FadeUpScale({ as = 'div', className, children }) {
  const prefersReduced = useReducedMotion();
  const variant = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: prefersReduced ? 1 : 0.95,
        y: prefersReduced ? 0 : 16,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE },
      },
    }),
    [prefersReduced]
  );
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={variant}>
      {children}
    </Tag>
  );
}

/** Hero image: scale 0.92 → 1.0 + opacity, longer duration. */
export function HeroImage({ src, alt, className, draggable = false, ...rest }) {
  const prefersReduced = useReducedMotion();
  const variant = useMemo(
    () => ({
      hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.92 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: EASE },
      },
    }),
    [prefersReduced]
  );
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      draggable={draggable}
      variants={variant}
      {...rest}
    />
  );
}
