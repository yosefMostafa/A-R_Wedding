'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { wedding } from '@/config/wedding';
import { WaxSeal } from './WaxSeal';

const FLAP_MS = 850;
const HOLD_MS = 550;

export function Envelope({ onOpened }: { onOpened: () => void }) {
  const [opening, setOpening] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    timer.current = window.setTimeout(onOpened, reduced ? 100 : FLAP_MS + HOLD_MS);
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Tap to open the wedding invitation"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      className="fixed inset-0 z-50 cursor-pointer select-none overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gold-bright"
      style={{
        background: 'radial-gradient(120% 80% at 50% 8%, #4a1020 0%, #2a0a14 58%, #17070c 100%)',
        perspective: 1400,
        perspectiveOrigin: 'center top',
      }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Envelope body with lining folds */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(170deg, var(--color-env-1) 0%, var(--color-env-2) 48%, var(--color-env-3) 100%)' }}
      >
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{ background: 'linear-gradient(135deg, var(--color-env-1), transparent 60%)', clipPath: 'polygon(0 0, 0 100%, 50% 45%)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{ background: 'linear-gradient(225deg, var(--color-env-1), transparent 60%)', clipPath: 'polygon(100% 0, 100% 100%, 50% 45%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-3/5"
          style={{ background: 'linear-gradient(to top, var(--color-env-3), transparent 70%)', clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)' }}
        />
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 10px 30px -10px rgba(0,0,0,.35)' }} />
      </div>

      {/* Flap — hinges open from the top edge; carries the title overlay */}
      <motion.div
        className="absolute inset-x-0 top-0 z-10 h-1/2"
        style={{
          transformOrigin: 'top center',
          backfaceVisibility: 'hidden',
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          background: 'linear-gradient(170deg, var(--color-env-1) 0%, var(--color-env-2) 100%)',
          filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.3))',
        }}
        initial={false}
        animate={{ rotateX: opening ? -172 : 0 }}
        transition={{ duration: reduced ? 0.01 : FLAP_MS / 1000, ease: [0.34, 0.01, 0.2, 1] }}
      >
        <div className="absolute inset-x-6 top-[18%] flex flex-col items-center gap-2 text-center">
          <span className="label text-gold-light">The Wedding of</span>
          <span
            className="font-display text-[clamp(30px,8vw,52px)] font-medium leading-tight text-cream-light"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,.45)' }}
          >
            {wedding.groom.en} <span className="italic text-gold-light">&amp;</span> {wedding.bride.en}
          </span>
          <span className="font-ar-display text-[clamp(22px,6vw,36px)] text-gold-bright" lang="ar">
            {wedding.groom.ar} و{wedding.bride.ar}
          </span>
        </div>
      </motion.div>

      <WaxSeal monogram={wedding.monogram} opening={opening} />

      {/* Call to action */}
      <motion.div
        className="absolute inset-x-0 top-[calc(50%+clamp(56px,13vw,80px))] flex flex-col items-center gap-4"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <motion.span
          className="rounded-full border border-gold/60 bg-ink/60 px-6 py-3 font-sans text-[clamp(11px,2.8vw,13px)] uppercase tracking-[0.18em] text-cream-light backdrop-blur-sm"
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Tap to Open Invitation
        </motion.span>
        <span className="label text-gold-light/80" lang="ar">
          اضغط لفتح الدعوة
        </span>
      </motion.div>
    </motion.div>
  );
}
