'use client';

import { useEffect, useRef } from 'react';

type P = { x: number; y: number; size: number; vy: number; sway: number; phase: number; spin: number; heart: boolean; alpha: number };

const HEARTS = 14;
const SPARKS = 30;

function heartPath(size: number) {
  const p = new Path2D();
  const s = size / 24;
  p.moveTo(12 * s, 21 * s);
  p.bezierCurveTo(5.3 * s, 16.6 * s, 2.7 * s, 12.6 * s, 2.7 * s, 12.6 * s);
  p.bezierCurveTo(0.5 * s, 9.2 * s, 2.4 * s, 4.5 * s, 6.6 * s, 4.5 * s);
  p.bezierCurveTo(8.6 * s, 4.5 * s, 10.2 * s, 5.6 * s, 12 * s, 7.5 * s);
  p.bezierCurveTo(13.8 * s, 5.6 * s, 15.4 * s, 4.5 * s, 17.4 * s, 4.5 * s);
  p.bezierCurveTo(21.6 * s, 4.5 * s, 23.5 * s, 9.2 * s, 21.3 * s, 12.6 * s);
  p.bezierCurveTo(18.7 * s, 16.6 * s, 12 * s, 21 * s, 12 * s, 21 * s);
  p.closePath();
  return p;
}

/* Floating glossy hearts + gold sparkles. Fixed, non-interactive, off under reduced-motion. */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const make = (heart: boolean, fromTop: boolean): P => ({
      x: Math.random() * w,
      y: fromTop ? -20 : Math.random() * h,
      size: heart ? 10 + Math.random() * 12 : 1.2 + Math.random() * 2,
      vy: heart ? 18 + Math.random() * 22 : 8 + Math.random() * 10,
      sway: 12 + Math.random() * 28,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.6,
      heart,
      alpha: heart ? 0.55 + Math.random() * 0.3 : 0.4 + Math.random() * 0.5,
    });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ps: P[] = [
      ...Array.from({ length: HEARTS }, () => make(true, false)),
      ...Array.from({ length: SPARKS }, () => make(false, false)),
    ];

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.y += p.vy * dt;
        p.phase += dt;
        const x = p.x + Math.sin(p.phase) * p.sway;
        if (p.y > h + 30) ps[i] = make(p.heart, true);

        ctx.save();
        ctx.translate(x, p.y);
        if (p.heart) {
          ctx.rotate(Math.sin(p.phase * 0.7) * 0.35 + p.spin);
          ctx.globalAlpha = p.alpha;
          const g = ctx.createRadialGradient(p.size * 0.35, p.size * 0.3, 0, p.size * 0.5, p.size * 0.5, p.size * 0.75);
          g.addColorStop(0, '#ff5a7a');
          g.addColorStop(0.55, '#e0163c');
          g.addColorStop(1, '#a60c2a');
          ctx.fillStyle = g;
          ctx.fill(heartPath(p.size));
          ctx.globalAlpha = p.alpha * 0.55;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.ellipse(p.size * 0.34, p.size * 0.34, p.size * 0.09, p.size * 0.055, -0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const twinkle = 0.5 + 0.5 * Math.sin(p.phase * 3);
          ctx.globalAlpha = p.alpha * twinkle;
          ctx.fillStyle = '#f0d9a8';
          ctx.shadowColor = '#d9ae6c';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-40" aria-hidden />;
}
