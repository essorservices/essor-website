"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";

/**
 * Hand-drawn accents (sparks, squiggles, arrows…) from the Bond reference.
 * They draw themselves once when scrolled into view (drawn at once under reduced motion). Decorative only.
 */
const doodles = {
  spark: {
    viewBox: "0 0 48 48",
    paths: [
      "M23.2 3.5c.5 4.3.2 8.7-1.1 13.1",
      "M39.6 9.8c-2.8 3.3-5.7 6.3-8.9 8.9",
      "M45 26.4c-4.1-.6-8.3-.6-12.5.3",
    ],
  },
  squiggle: {
    viewBox: "0 0 92 24",
    paths: ["M3 15.5c5.5-9.5 10.6-9.7 14.2-.4 3.7 9.4 8.9 9.2 14.4-.3 5.5-9.6 10.7-9.6 14.4-.2 3.7 9.3 8.9 9.1 14.3-.4 5.6-9.5 10.7-9.4 14.4-.1 2.2 5.6 5.4 8 9.3 4.7"],
  },
  arrow: {
    viewBox: "0 0 120 84",
    paths: ["M5 9.5c23.5 2.6 49.2 13.8 63.4 32.6 7.9 10.4 11.5 20.6 13.5 31.2", "M69.6 62.5 82.4 74l5.2-16.2"],
  },
  loop: {
    viewBox: "0 0 140 60",
    paths: ["M4 46c21-1.6 35.5-13.4 33.6-25.8C36.4 12 25.6 12.2 23.8 20c-2.8 12.3 16.4 22.4 37 18.6 19.4-3.6 32.6-16.2 46-26.6 9.5-7.4 19.4-9 29.2-6.6"],
  },
  underline: {
    viewBox: "0 0 220 22",
    paths: ["M4 13.5c44-6.4 101-9.4 212-5.2", "M24 18.2c54-4.1 108-5 168-2.2"],
  },
  circle: {
    viewBox: "0 0 220 90",
    paths: ["M162 13.5C119 1.6 43.5 6.4 15.7 32.2c-19.7 18.3 21.4 44.6 86.6 46.8 64.8 2.2 118.7-15.6 107.8-41.3-6.6-15.2-43.6-26.4-91.2-24.1"],
  },
  star: {
    viewBox: "0 0 48 48",
    paths: ["M24 3c1.6 12.6 4.4 17.4 21 21-16.6 3.6-19.4 8.4-21 21-1.6-12.6-4.4-17.4-21-21 16.6-3.6 19.4-8.4 21-21Z"],
  },
  zigzag: {
    viewBox: "0 0 64 40",
    paths: ["M4 30 16 10l10 20 10-20 10 20 12-20"],
  },
} as const;

export type DoodleName = keyof typeof doodles;

export function Doodle({
  name,
  className,
  strokeWidth = 2.6,
  delay = 0,
  duration = 0.9,
  animate = true,
}: {
  name: DoodleName;
  className?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  animate?: boolean;
}) {
  const d = doodles[name];
  const reduced = usePrefersReducedMotion();
  const draw = animate && !reduced;
  return (
    <svg
      viewBox={d.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={cn("pointer-events-none overflow-visible", className)}
    >
      {d.paths.map((p, i) =>
        draw ? (
          <motion.path
            key={i}
            d={p}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              pathLength: { duration, delay: delay + i * 0.12, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.01, delay: delay + i * 0.12 },
            }}
          />
        ) : (
          <path key={i} d={p} />
        ),
      )}
    </svg>
  );
}
