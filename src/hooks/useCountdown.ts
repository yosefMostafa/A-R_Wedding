'use client';

import { useEffect, useMemo, useState } from 'react';

export type Countdown = { d: string; h: string; m: string; s: string; done: boolean };

const pad = (n: number) => String(n).padStart(2, '0');

function compute(target: number): Countdown {
  const diff = Math.max(0, target - Date.now());
  const total = Math.floor(diff / 1000);
  return {
    d: pad(Math.floor(total / 86400)),
    h: pad(Math.floor(total / 3600) % 24),
    m: pad(Math.floor(total / 60) % 60),
    s: pad(total % 60),
    done: diff === 0,
  };
}

/* Starts as null so server and first client render agree (avoids hydration mismatch). */
export function useCountdown(targetISO: string): Countdown | null {
  const target = useMemo(() => Date.parse(targetISO), [targetISO]);
  const [value, setValue] = useState<Countdown | null>(null);

  useEffect(() => {
    const tick = () => setValue(compute(target));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [target]);

  return value;
}
