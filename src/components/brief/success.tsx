"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Doodle } from "@/components/ui/doodle";
import { briefCopy } from "@/content/brief";
import { usePrefersReducedMotion } from "@/hooks/use-media";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The take-off ("essor"): the coral dot rolls along the ground, lifts off and climbs
 * to the top-right corner, leaving a dotted trail. The flight path is a cubic curve
 * sampled by arc length here, so the dot and the trail reveal move in lockstep.
 */
const P = [
  [26, 182],
  [150, 184],
  [196, 150],
  [292, 34],
] as const;
const PATH = `M${P[0].join(" ")}C${P[1].join(" ")} ${P[2].join(" ")} ${P[3].join(" ")}`;

function pointAt(t: number): [number, number] {
  const u = 1 - t;
  const [a, b, c, d] = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0], a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1]];
}

/** Slow roll, fast climb, soft arrival. */
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function flight(steps: number) {
  // Fine polyline to measure the curve
  const fine = Array.from({ length: 201 }, (_, i) => pointAt(i / 200));
  const lengths = [0];
  for (let i = 1; i < fine.length; i++) {
    lengths.push(lengths[i - 1] + Math.hypot(fine[i][0] - fine[i - 1][0], fine[i][1] - fine[i - 1][1]));
  }
  const total = lengths[lengths.length - 1];
  const x: number[] = [];
  const y: number[] = [];
  const drawn: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const s = easeInOut(i / steps);
    const target = s * total;
    const j = Math.max(1, lengths.findIndex((l) => l >= target));
    const k = (target - lengths[j - 1]) / (lengths[j] - lengths[j - 1] || 1);
    x.push(fine[j - 1][0] + (fine[j][0] - fine[j - 1][0]) * k - P[0][0]);
    y.push(fine[j - 1][1] + (fine[j][1] - fine[j - 1][1]) * k - P[0][1]);
    drawn.push(s);
  }
  return { x, y, drawn };
}

const PATHWAY = flight(36);
const FLIGHT = 1.6;
const DELAY = 0.35;
const along = { duration: FLIGHT, delay: DELAY, ease: "linear" } as const;

function Takeoff() {
  const reduced = usePrefersReducedMotion();
  const end = { x: PATHWAY.x.at(-1), y: PATHWAY.y.at(-1) };
  return (
    <div aria-hidden className="relative aspect-[320/200] w-full max-w-[22rem]">
      <svg viewBox="0 0 320 200" className="absolute inset-0 size-full overflow-visible" fill="none">
        <defs>
          <mask id="brief-trail-mask" maskUnits="userSpaceOnUse" x="-20" y="-20" width="360" height="240">
            <motion.path
              d={PATH}
              stroke="#fff"
              strokeWidth="16"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: reduced ? 1 : PATHWAY.drawn }}
              transition={along}
            />
          </mask>
        </defs>
        {/* The runway */}
        <path d="M4 197h104" stroke="var(--color-navy)" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="round" />
        {/* Dotted trail, revealed right behind the dot */}
        <path
          d={PATH}
          mask="url(#brief-trail-mask)"
          stroke="var(--color-navy)"
          strokeOpacity="0.3"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="0.1 11"
        />
        <motion.circle
          cx={P[0][0]}
          cy={P[0][1]}
          r="13"
          fill="var(--color-coral)"
          initial={reduced ? false : { x: 0, y: 0, scale: 0 }}
          animate={reduced ? { ...end, scale: 1 } : { x: PATHWAY.x, y: PATHWAY.y, scale: 1 }}
          transition={{ x: along, y: along, scale: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }}
        />
      </svg>
      <div className="absolute bottom-[83%] left-[90%] w-[14%] text-coral">
        <Doodle name="spark" className="size-full" strokeWidth={3} delay={reduced ? 0 : DELAY + FLIGHT - 0.05} duration={0.5} />
      </div>
    </div>
  );
}

export function BriefSuccess({ firstName, onShown }: { firstName: string; onShown?: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shown = useRef(false);
  useEffect(() => {
    if (shown.current) return;
    shown.current = true;
    headingRef.current?.focus({ preventScroll: true });
    onShown?.();
  }, [onShown]);

  const text = firstName ? briefCopy.successText.replace("{name}", firstName) : briefCopy.successText.replace(" {name}", "");

  return (
    <div className="flex flex-col py-2 sm:py-4">
      <Takeoff />
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] text-navy focus:outline-none sm:mt-8"
      >
        {briefCopy.successTitle}
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease }}
        className="mt-5 max-w-[30rem] text-lg leading-relaxed text-navy/70 sm:text-xl"
      >
        {text}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
        className="mt-9"
      >
        <ButtonLink href="/" variant="dark" size="lg">
          {briefCopy.successCta}
        </ButtonLink>
      </motion.div>
    </div>
  );
}
