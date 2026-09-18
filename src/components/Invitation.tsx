'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { Blessing } from './Blessing';
import { Closing } from './Closing';
import { Countdown } from './Countdown';
import { DateTimeCard } from './DateTimeCard';
import { LetterHead } from './LetterHead';
import { inkIn } from './motion';
import { Venue } from './Venue';

export function Invitation() {
  const reduced = useReducedMotion();

  return (
    <main className="relative z-10 flex min-h-svh flex-col items-center px-[clamp(16px,4vw,48px)] pb-[clamp(56px,10vh,96px)] pt-[clamp(36px,7vh,64px)]">
      <motion.article
        initial={reduced ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[min(92vw,430px)] bg-cream-light px-[clamp(22px,6vw,32px)] py-[clamp(38px,8vw,56px)]"
        style={{ boxShadow: '0 30px 60px -30px rgba(0,0,0,.55), 0 0 0 1px rgba(94,19,39,.12)' }}
      >
        {/* Gold hairline frame — above content so it also crosses the head band */}
        <div className="pointer-events-none absolute inset-3 z-20 border border-gold/60" aria-hidden />

        <div className="relative z-10 flex flex-col gap-[clamp(24px,5vw,36px)]">
          <LetterHead />

          <motion.p
            variants={inkIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 1.1 }}
            className="mx-auto text-center text-[clamp(15px,3.6vw,19px)] italic leading-[1.75] text-ink-soft text-balance"
          >
            <span className="mb-2 block font-ar-body not-italic text-[1.08em] text-ink" lang="ar">
              {wedding.invite.ar}
            </span>
            {wedding.invite.en}
          </motion.p>

          <DateTimeCard />
          <Venue />
          <Countdown />
          <Blessing />
          <Closing />
        </div>
      </motion.article>

      <footer className="mt-[clamp(28px,5vw,44px)] flex items-center gap-1.5 font-sans text-[clamp(12px,2.6vw,13px)] tracking-wider text-ink/70">
        Built with ♡ by
        <a
          href="https://github.com/yosefMostafa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-ink hover:opacity-80"
        >
          <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden>
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Youssef Mostafa
        </a>
      </footer>
    </main>
  );
}
