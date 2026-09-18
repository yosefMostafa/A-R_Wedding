'use client';

import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { inkIn, inView, stagger } from './motion';
import { CalendarIcon, SectionLabel } from './SectionLabel';

export function DateTimeCard() {
  return (
    <motion.section
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="flex flex-col items-center gap-3 border-y border-gold/35 py-6 text-center"
    >
      <motion.div variants={inkIn}>
        <SectionLabel icon={CalendarIcon}>When</SectionLabel>
      </motion.div>

      <motion.div variants={inkIn} className="flex flex-col items-center gap-1">
        <span className="font-ar-display text-[clamp(24px,6vw,34px)] leading-tight text-ink" lang="ar">
          {wedding.date.ar}
        </span>
        <span className="font-display text-[clamp(20px,5vw,28px)] text-ink">{wedding.date.en}</span>
      </motion.div>

      <motion.div variants={inkIn} className="flex flex-col items-center gap-1">
        <span className="font-ar-body text-[clamp(15px,3.8vw,18px)] text-ink-soft" lang="ar">
          {wedding.time.ar}
        </span>
        <span className="label text-ink-soft">{wedding.time.en}</span>
      </motion.div>

      <motion.p variants={inkIn} className="label mt-1 tracking-[0.28em] text-gold">
        {wedding.hashtag}
      </motion.p>
    </motion.section>
  );
}
