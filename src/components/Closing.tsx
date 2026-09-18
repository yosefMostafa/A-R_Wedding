'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { titleEn, wedding } from '@/config/wedding';
import { shareInvitation } from '@/lib/share';
import { inkIn, inView, stagger } from './motion';
import { Ornament } from './Ornament';

export function Closing() {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const share = async () => {
    const url = wedding.siteUrl + '/';
    const result = await shareInvitation(titleEn, `${titleEn} · ${wedding.date.en}`, url);
    const msg = result === 'copied' ? 'Invitation link copied' : result === 'unsupported' ? url : null;
    if (!msg) return;
    setToast(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <motion.section
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="flex flex-col items-center gap-4 text-center"
    >
      <motion.div variants={inkIn} className="w-full">
        <Ornament />
      </motion.div>

      <motion.p variants={inkIn} className="label tracking-[0.28em] text-gold">
        {wedding.hashtag}
      </motion.p>

      <motion.button
        variants={inkIn}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={share}
        className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-ink bg-ink px-6 py-2.5 font-sans text-[clamp(11px,2.7vw,12px)] uppercase tracking-[0.16em] text-gold-light transition-colors hover:bg-env-1 hover:text-cream-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        Share Invitation
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-[calc(max(16px,3vw)+62px)] left-1/2 z-80 max-w-[min(84vw,340px)] -translate-x-1/2 rounded-full bg-env-3/95 px-5 py-3 font-sans text-[clamp(11px,2.6vw,13px)] tracking-wide text-cream-light shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
