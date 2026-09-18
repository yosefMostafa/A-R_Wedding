'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function WaxSeal({ monogram, opening }: { monogram: string; opening: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-1/2 z-20 grid size-[clamp(72px,20vw,108px)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
      style={{
        background: 'radial-gradient(circle at 38% 35%, var(--color-env-1) 0%, var(--color-ink) 60%, var(--color-env-3) 100%)',
        boxShadow:
          '0 6px 16px rgba(0,0,0,.5), inset 0 2px 4px rgba(255,255,255,.15), inset 0 -2px 6px rgba(0,0,0,.4), 0 0 0 3px rgba(240,217,168,.25)',
      }}
      animate={
        opening
          ? { opacity: 0, scale: 1.35 }
          : reduced
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: [1, 1.05, 1] }
      }
      transition={
        opening
          ? { duration: 0.5, ease: 'easeOut' }
          : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      <span
        className="font-display text-[clamp(20px,5.4vw,30px)] font-semibold italic tracking-wide text-gold-bright"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,.45)' }}
      >
        {monogram}
      </span>
    </motion.div>
  );
}
