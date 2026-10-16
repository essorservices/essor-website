"use client";

import { motion } from "motion/react";
import type { BusinessKey } from "@/content/one-roof";
import { cn } from "@/lib/cn";

/*
  Line drawings for the centre card: 2px navy strokes, one coral accent each.
  Drawn on a 160×120 grid, framed to the drawings (viewBox 16 8 128 100).
  Every stroke draws itself when the card content changes.
*/

type Stroke = { d: string; accent?: boolean };
type Dot = { cx: number; cy: number; r: number };

const drawings: Record<BusinessKey, { strokes: Stroke[]; dots?: Dot[]; badge?: Dot & { plus: string } }> = {
  cafe: {
    strokes: [
      { d: "M28 99h104" },
      { d: "M42 99c6 7 70 7 76 0" },
      { d: "M48 52h60v16c0 16-12 27-30 27S48 84 48 68V52Z" },
      { d: "M108 58h5c8 0 12 5 12 11s-4 11-12 11h-7" },
      { d: "M66 42c-5-5 4-9 0-15", accent: true },
      { d: "M78 40c-6-6 5-10 0-17-3-4 1-8 0-11", accent: true },
      { d: "M90 42c-5-5 4-9 0-15", accent: true },
    ],
  },
  restaurant: {
    strokes: [
      { d: "M22 92h116" },
      { d: "M48 99h64" },
      { d: "M32 92c0-27 21-48 48-48s48 21 48 48" },
      { d: "M48 80c1-11 8-20 18-24", accent: true },
      { d: "M80 44v-4" },
      { d: "M128 32l7-7M134 44h9", accent: true },
    ],
    dots: [{ cx: 80, cy: 35, r: 5 }],
  },
  clinique: {
    strokes: [
      {
        d: "M62 24c-12 0-20 9-20 23 0 11 5 18 7 30 2 13 4 25 11 25 7 0 7-17 11-24 2-3 3-5 9-5s7 2 9 5c4 7 4 24 11 24 7 0 9-12 11-25 2-12 7-19 7-30 0-14-8-23-20-23-8 0-12 4-18 4s-10-4-18-4Z",
      },
      { d: "M55 46c0-6 3-10 8-11", accent: true },
    ],
    badge: { cx: 118, cy: 30, r: 13, plus: "M118 24v12M112 30h12" },
  },
  boutique: {
    strokes: [
      { d: "M43 46h74l7 56H36l7-56Z" },
      { d: "M61 62V40c0-11 8.5-20 19-20s19 9 19 20v22" },
      { d: "M56 62h10M94 62h10" },
    ],
    dots: [{ cx: 80, cy: 82, r: 6.5 }],
  },
};

const draw = (i: number) => ({
  pathLength: { duration: 0.7, delay: 0.12 + i * 0.07, ease: [0.65, 0, 0.35, 1] as const },
  opacity: { duration: 0.01, delay: 0.12 + i * 0.07 },
});

export function BusinessIllustration({
  business,
  play,
  reduced,
  className,
}: {
  business: BusinessKey;
  /** false until the section has been seen: the drawing waits, undrawn */
  play: boolean;
  reduced: boolean;
  className?: string;
}) {
  const { strokes, dots = [], badge } = drawings[business];
  const shown = play || reduced;
  const pop = (i: number) => ({
    initial: reduced ? false : { scale: 0, opacity: 0 },
    animate: shown ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 },
    transition: { type: "spring" as const, stiffness: 420, damping: 22, delay: 0.35 + i * 0.08 },
  });

  return (
    <svg
      viewBox="16 8 128 100"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={cn("overflow-visible", className)}
    >
      {strokes.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          stroke={s.accent ? "var(--color-coral)" : "var(--color-navy)"}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={shown ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={draw(i)}
        />
      ))}
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="var(--color-coral)"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          {...pop(i)}
        />
      ))}
      {badge ? (
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "center" }} {...pop(0)}>
          <circle cx={badge.cx} cy={badge.cy} r={badge.r} fill="var(--color-coral)" />
          <path d={badge.plus} stroke="var(--color-navy)" strokeWidth={2.4} />
        </motion.g>
      ) : null}
    </svg>
  );
}
