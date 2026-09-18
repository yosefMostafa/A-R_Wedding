import type { Variants } from 'framer-motion';

export const inkIn: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } },
};

export const stagger = (delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: delay } },
});

export const inView = { once: true, amount: 0.25 } as const;
