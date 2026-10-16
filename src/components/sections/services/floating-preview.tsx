"use client";

import { motion, useSpring, useTransform, useVelocity, type MotionValue } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Deliverable } from "@/components/deliverables";
import { services, type ServiceKey } from "@/content/services";
import { cn } from "@/lib/cn";
import { servicePreviews } from "./previews";

export const CARD_W = 260;
export const CARD_H = 325;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Card that pops out beside the hovered row of the services list and shows its métier as a
 * themed mockup. Fixed and portalled to <body> so no transformed ancestor can break it.
 * Rendered only for desktop fine pointers without reduced motion (the parent decides).
 * `x`/`y` are the card's top-left corner in viewport pixels and `scale` its size from that
 * corner, all already smoothed.
 */
export function FloatingPreview({
  active,
  visible,
  x,
  y,
  scale,
}: {
  active: ServiceKey | null;
  visible: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
}) {
  // Keep the last service on the card while it fades out, instead of blanking it
  const [shown, setShown] = useState<ServiceKey>(active ?? services[0].key);
  if (active !== null && active !== shown) setShown(active);

  // Lean into the direction of travel, then settle back
  const velocity = useVelocity(x);
  const lean = useSpring(useTransform(velocity, [-2400, 0, 2400], [-7, 0, 7], { clamp: true }), {
    stiffness: 320,
    damping: 30,
  });
  // The client tag keeps its size when the card shrinks, so "projet concept" stays legible
  const tagScale = useTransform(scale, (s) => 1 / s);

  return createPortal(
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{ x, y, scale, originX: 0, originY: 0 }}
    >
      <motion.div style={{ rotate: lean }}>
        <motion.div
          className="relative"
          style={{ width: CARD_W }}
          initial={false}
          animate={visible ? { opacity: 1, scale: 1, rotate: 4 } : { opacity: 0, scale: 0.72, rotate: -3 }}
          transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }}
        >
          <div
            className="relative overflow-hidden rounded-[1.25rem] bg-sky shadow-lift ring-1 ring-navy/10"
            style={{ height: CARD_H }}
          >
            {services.map((s) => {
              const preview = servicePreviews[s.key];
              const on = s.key === shown;
              return (
                <motion.div
                  key={s.key}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 1.06 }}
                  transition={{ duration: on ? 0.55 : 0.35, ease }}
                >
                  <Deliverable kind={preview.kind} theme={preview.theme} animate={on && visible} />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="absolute -bottom-3.5 left-4 grid -rotate-3"
            style={{ scale: tagScale, originX: 0, originY: 1 }}
          >
            {services.map((s) => {
              const preview = servicePreviews[s.key];
              return (
                <span
                  key={s.key}
                  className={cn(
                    "col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap rounded-full bg-navy py-1.5 pl-2.5 pr-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-white transition-opacity duration-300",
                    s.key === shown ? "opacity-100" : "opacity-0",
                  )}
                >
                  <span className="size-1.5 rounded-full bg-coral" />
                  {preview.client}
                  {preview.concept ? <span className="text-sky/70">· projet concept</span> : null}
                </span>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
