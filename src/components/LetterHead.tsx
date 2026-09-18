'use client';

import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { inkIn, stagger } from './motion';
import { Ornament } from './Ornament';

const CARD_PAD_X = 'clamp(22px,6vw,32px)';
const CARD_PAD_Y = 'clamp(38px,8vw,56px)';

/* Burgundy head band bleeding to the card edges */
export function LetterHead() {
  return (
    <motion.header
      variants={stagger(0.35)}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-3 text-center text-cream-light"
      style={{
        margin: `calc(-1 * ${CARD_PAD_Y}) calc(-1 * ${CARD_PAD_X}) 0`,
        padding: `clamp(34px,7vw,52px) ${CARD_PAD_X} clamp(30px,6vw,44px)`,
        background: 'linear-gradient(180deg, var(--color-env-1) 0%, var(--color-ink) 100%)',
      }}
    >
      <motion.p variants={inkIn} className="gold-foil font-ar-display text-[clamp(22px,6.2vw,34px)] leading-relaxed" lang="ar">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </motion.p>

      <motion.div variants={inkIn} className="w-full">
        <Ornament />
      </motion.div>

      <motion.p variants={inkIn} className="label text-gold-light">
        The Wedding Of
      </motion.p>

      <motion.div variants={inkIn} className="flex flex-col items-center">
        <Name person={wedding.groom} />
        <div className="my-2 flex items-center gap-3.5 font-display text-[clamp(22px,6vw,34px)] italic text-gold-light">
          <span className="h-px w-[clamp(36px,10vw,64px)] bg-gold/70" />
          &amp;
          <span className="h-px w-[clamp(36px,10vw,64px)] bg-gold/70" />
        </div>
        <Name person={wedding.bride} />
      </motion.div>
    </motion.header>
  );
}

function Name({ person }: { person: { en: string; ar: string } }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-ar-display text-[clamp(40px,12vw,72px)] leading-[1.05] text-cream-light"
        style={{ textShadow: '0 2px 12px rgba(0,0,0,.35)' }}
        lang="ar"
      >
        {person.ar}
      </span>
      <span className="mt-1 font-display text-[clamp(17px,4.4vw,24px)] font-medium uppercase tracking-[0.08em] text-gold-light">
        {person.en}
      </span>
    </div>
  );
}
