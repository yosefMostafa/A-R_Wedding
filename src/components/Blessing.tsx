'use client';

import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { inkIn, inView, stagger } from './motion';

export function Blessing() {
  return (
    <motion.section
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative border border-gold/50 px-[clamp(14px,4vw,26px)] pb-[clamp(22px,5vw,32px)] pt-[clamp(28px,6vw,40px)] text-center"
    >
      <p className="label absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-gold/50 bg-cream-light px-3.5 py-1 text-gold">
        A Blessing
      </p>

      <motion.p variants={inkIn} className="font-ar-body text-[clamp(18px,4.8vw,26px)] leading-[2] text-ink" lang="ar">
        {wedding.verse.ar}
      </motion.p>
      <motion.p
        variants={inkIn}
        className="mx-auto mt-4 max-w-[36ch] text-[clamp(14px,3.4vw,17px)] italic leading-relaxed text-ink-soft text-balance"
      >
        &ldquo;{wedding.verse.en}&rdquo;
      </motion.p>
      <motion.p variants={inkIn} className="label mt-4 text-gold">
        <span lang="ar">{wedding.verse.ref.ar}</span>
        &nbsp;&bull;&nbsp;
        {wedding.verse.ref.en}
      </motion.p>
    </motion.section>
  );
}
