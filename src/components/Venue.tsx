'use client';

import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { inkIn, inView, stagger } from './motion';
import { PinIcon, SectionLabel } from './SectionLabel';

export function Venue() {
  return (
    <motion.section
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="flex flex-col items-center gap-3 text-center"
    >
      <motion.div variants={inkIn}>
        <SectionLabel icon={PinIcon}>Where</SectionLabel>
      </motion.div>

      <motion.div variants={inkIn} className="flex flex-col items-center gap-1">
        <span className="font-ar-display text-[clamp(22px,5.4vw,30px)] leading-snug text-ink" lang="ar">
          {wedding.venue.name.ar}
        </span>
        <span className="font-display text-[clamp(19px,4.6vw,24px)] text-ink">{wedding.venue.name.en}</span>
      </motion.div>

      <motion.div variants={inkIn} className="flex flex-col items-center text-[clamp(14px,3.4vw,16px)] text-ink-soft">
        <span className="font-ar-body text-[1.1em]" lang="ar">
          {wedding.venue.address.ar}
        </span>
        <span>{wedding.venue.address.en}</span>
      </motion.div>

      <motion.a
        variants={inkIn}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        href={wedding.venue.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-gold bg-transparent px-6 py-2.5 font-sans text-[clamp(11px,2.7vw,12px)] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {PinIcon}
        View Location
      </motion.a>
    </motion.section>
  );
}
