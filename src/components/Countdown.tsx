'use client';

import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { useCountdown } from '@/hooks/useCountdown';
import { inkIn, inView, stagger } from './motion';
import { SectionLabel } from './SectionLabel';

const UNITS = [
  ['d', 'Days'],
  ['h', 'Hours'],
  ['m', 'Minutes'],
  ['s', 'Seconds'],
] as const;

export function Countdown() {
  const cd = useCountdown(wedding.dateISO);

  return (
    <motion.section
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="flex flex-col items-center gap-4 text-center"
      aria-label="Countdown to the wedding"
    >
      <motion.div variants={inkIn}>
        <SectionLabel>{cd?.done ? 'The day is here' : 'Counting down to the day'}</SectionLabel>
      </motion.div>

      <motion.div variants={inkIn} className="flex items-start justify-center gap-[clamp(4px,2vw,14px)]" dir="ltr">
        {UNITS.map(([key, label], i) => (
          <div key={key} className="contents">
            {i > 0 && (
              <span className="mt-[clamp(14px,3.6vw,20px)] font-display text-[clamp(20px,6vw,30px)] leading-none text-gold max-[340px]:hidden">
                :
              </span>
            )}
            <div
              className="min-w-[clamp(52px,15vw,74px)] rounded-md bg-ink px-1.5 pb-2 pt-2.5"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(240,217,168,.35)' }}
            >
              <div
                className={`font-display text-[clamp(26px,7vw,40px)] font-semibold leading-none tabular-nums ${key === 's' ? 'text-gold-bright' : 'text-cream-light'}`}
              >
                {cd?.[key] ?? '00'}
              </div>
              <div className="label mt-2 text-[clamp(7px,1.9vw,9px)] tracking-[0.16em] text-gold-light">{label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
