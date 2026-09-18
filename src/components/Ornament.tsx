'use client';

import { motion, useReducedMotion } from 'framer-motion';

const PATHS = [
  'M6 12 H86',
  'M154 12 H234',
  'M86 12 C94 4.5, 103 4.5, 107 12 C103 19.5, 94 19.5, 86 12 Z',
  'M154 12 C146 4.5, 137 4.5, 133 12 C137 19.5, 146 19.5, 154 12 Z',
  'M120 5.5 L126.5 12 L120 18.5 L113.5 12 Z',
];

/* Gold flourish divider; the strokes draw themselves when it enters view */
export function Ornament({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={`flex w-full justify-center text-gold ${className}`} aria-hidden>
      <motion.svg
        viewBox="0 0 240 24"
        className="h-auto w-[clamp(150px,56%,230px)]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        initial={reduced ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        {PATHS.map((d) => (
          <motion.path
            key={d}
            d={d}
            variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        <motion.circle
          cx={120}
          cy={12}
          r={1.6}
          fill="currentColor"
          stroke="none"
          variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />
      </motion.svg>
    </div>
  );
}
