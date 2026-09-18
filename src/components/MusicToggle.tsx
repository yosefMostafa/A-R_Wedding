'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { wedding } from '@/config/wedding';

type Props = { visible: boolean; playing: boolean; onToggle: () => void };

/* Burgundy capsule with a three-bar equalizer; bars dance while playing */
export function MusicToggle({ visible, playing, onToggle }: Props) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!wedding.musicUrl) return;
    if (!audio.current) {
      audio.current = new Audio(wedding.musicUrl);
      audio.current.loop = true;
      audio.current.volume = 0.6;
    }
    const a = audio.current;
    if (playing) a.play().catch(() => {});
    else a.pause();
  }, [playing]);

  useEffect(() => () => audio.current?.pause(), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-pressed={playing}
          aria-label={playing ? 'Pause background music' : 'Play background music'}
          onClick={onToggle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-[max(16px,3vw)] right-[max(16px,3vw)] z-60 inline-flex min-h-11 items-center gap-3 rounded-full border border-gold/60 bg-ink px-4 py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-gold-light shadow-[0_14px_28px_-14px_rgba(0,0,0,.6)] backdrop-blur-sm hover:bg-env-1 hover:text-cream-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0.55, 1, 0.7].map((peak, i) => (
              <motion.span
                key={i}
                className="w-[3px] origin-bottom rounded-sm bg-gold-bright"
                style={{ height: 16 }}
                animate={playing && !reduced ? { scaleY: [0.25, peak, 0.4, peak * 0.8, 0.25] } : { scaleY: 0.25 }}
                transition={
                  playing && !reduced
                    ? { duration: 0.9 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }
                    : { duration: 0.3 }
                }
              />
            ))}
          </span>
          {playing ? 'Playing' : 'Music'}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
