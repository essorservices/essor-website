"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { DOT, MARK_PATH } from "@/components/brand/logo-paths";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";

/** The ring of the essor mark (first sub-path), without its bar: it reads as a 0 with a gap. */
const RING = MARK_PATH.slice(0, MARK_PATH.indexOf("Z") + 1);

/** The dot's escape route, in mark units (the ring is 80 units wide). Quadratic curve S → E. */
const S = { x: DOT.cx, y: DOT.cy };
const C = { x: 46, y: -112 };
const E = { x: 205, y: -92 };
const TRAIL = `M${S.x} ${S.y}Q${C.x} ${C.y} ${E.x} ${E.y}`;

function pointAt(t: number) {
  const u = 1 - t;
  return {
    x: u * u * S.x + 2 * u * t * C.x + t * t * E.x,
    y: u * u * S.y + 2 * u * t * C.y + t * t * E.y,
  };
}

const steps = Array.from({ length: 17 }, (_, i) => pointAt(i / 16));
const xs = steps.map((p) => p.x - S.x);
const ys = steps.map((p) => p.y - S.y);

const flight = { duration: 2.2, delay: 0.7, ease: [0.55, 0, 0.25, 1] as const };

/**
 * "404" where the 0 is the essor ring and its coral dot has drifted away,
 * leaving a dashed trail. Decorative: the page's h1 carries the message.
 * Height matches Bricolage numerals (0.687em with overshoot) so it sits on the baseline.
 */
export function LostDot404({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const maskId = `trail${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div
      aria-hidden
      className={cn(
        // Negative margins trim the line box to the numerals, so the block aligns on its baseline
        "-mb-[0.185em] -mt-[0.15em] flex select-none items-baseline font-display font-semibold tracking-[-0.04em] text-navy [font-variation-settings:'opsz'_96]",
        className,
      )}
    >
      <span className="leading-none">4</span>
      <svg
        viewBox="-40 -40 80 80"
        focusable="false"
        className="mx-[0.03em] h-[0.687em] w-auto shrink-0 overflow-visible"
        style={{ marginBottom: "-0.014em" }}
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="-60" y="-160" width="330" height="220">
            <motion.path
              d={TRAIL}
              fill="none"
              stroke="#fff"
              strokeWidth={6}
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={flight}
            />
          </mask>
        </defs>
        <path d={RING} fill="currentColor" />
        <path
          d={TRAIL}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.28}
          strokeWidth={1.4}
          strokeDasharray="2.2 4.4"
          strokeLinecap="round"
          mask={`url(#${maskId})`}
        />
        <motion.circle
          cx={S.x}
          cy={S.y}
          r={DOT.r}
          fill="var(--color-coral)"
          initial={reduced ? false : { x: 0, y: 0 }}
          animate={{ x: xs, y: ys }}
          transition={flight}
        />
      </svg>
      <span className="leading-none">4</span>
    </div>
  );
}
