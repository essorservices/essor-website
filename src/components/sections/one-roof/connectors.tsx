"use client";

import { AnimatePresence, motion } from "motion/react";
import type { BusinessKey } from "@/content/one-roof";
import type { ServiceKey } from "@/content/services";
import { cn } from "@/lib/cn";
import { connectorPath, SLOTS, STAGE } from "./geometry";

/**
 * Desktop only: one SVG in stage coordinates holding the six dashed curves.
 * Dashes can't be drawn with pathLength directly (both use stroke-dasharray),
 * so each dashed line is revealed by a solid mask path that draws itself.
 */
export function Connectors({
  uid,
  business,
  services,
  focus,
  revealed,
  playing,
  reduced,
}: {
  uid: string;
  business: BusinessKey;
  /** Service of each slot, in slot order */
  services: ServiceKey[];
  focus: ServiceKey | null;
  revealed: boolean;
  /** Section on screen. Off screen the dash loop pauses: stroke-dashoffset can't be composited. */
  playing: boolean;
  reduced: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
      fill="none"
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
    >
      <AnimatePresence initial={false}>
        <motion.g key={business} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
          {SLOTS.map((slot, i) => {
            const d = connectorPath(slot);
            const id = `${uid}-${business}-${i}`;
            const lit = focus !== null && services[i] === focus;
            const dim = focus !== null && !lit;
            return (
              <g key={i} className="transition-opacity duration-300" opacity={dim ? 0.3 : 1}>
                <mask id={id} maskUnits="userSpaceOnUse" x={0} y={0} width={STAGE.w} height={STAGE.h}>
                  <motion.path
                    d={d}
                    stroke="#fff"
                    strokeWidth={8}
                    initial={reduced ? false : { pathLength: 0 }}
                    animate={{ pathLength: revealed || reduced ? 1 : 0 }}
                    transition={{ duration: 0.75, delay: 0.1 + i * 0.06, ease: [0.65, 0, 0.35, 1] }}
                  />
                </mask>
                <path
                  d={d}
                  mask={`url(#${id})`}
                  strokeWidth={1.5}
                  strokeDasharray="5 7"
                  strokeLinecap="round"
                  className={cn(
                    "transition-[stroke,stroke-opacity] duration-300",
                    lit ? "stroke-coral" : "stroke-sky",
                    !reduced && "animate-dash",
                  )}
                  style={playing ? undefined : { animationPlayState: "paused" }}
                  strokeOpacity={lit ? 1 : 0.5}
                />
                {/* Socket on the pill edge: half of it peeks out from under the pill */}
                <motion.circle
                  cx={slot.x}
                  cy={slot.y}
                  r={4.5}
                  className={cn("transition-colors duration-300", lit ? "fill-coral" : "fill-sky")}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: revealed || reduced ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: 0.55 + i * 0.06 }}
                />
              </g>
            );
          })}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}
