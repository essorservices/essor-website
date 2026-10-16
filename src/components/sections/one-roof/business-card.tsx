"use client";

import { AnimatePresence, motion } from "motion/react";
import { Mark } from "@/components/brand/logo";
import type { Business } from "@/content/one-roof";
import { BusinessIllustration } from "./illustrations";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The business in the middle of the diagram, pinned to the canvas like a note.
 * Sizes are in em so the card scales with the stage font size on desktop.
 */
export function BusinessCard({
  business,
  index,
  total,
  revealed,
  reduced,
}: {
  business: Business;
  index: number;
  total: number;
  revealed: boolean;
  reduced: boolean;
}) {
  const tilt = index % 2 === 0 ? -2.4 : 1.8;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: -8 }}
      animate={revealed ? { opacity: 1, y: 0, rotate: tilt } : { opacity: 0, y: 32, rotate: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.9 }}
      className="relative"
    >
      {/* Pin: the coral dot holds the card on the canvas */}
      <span
        aria-hidden
        className="absolute left-1/2 top-0 z-10 size-[0.95em] -translate-x-1/2 -translate-y-[45%] rounded-full bg-coral shadow-[0_0.16em_0_0_var(--color-navy-950)]"
      />
      <div className="relative overflow-hidden rounded-[1.6em] bg-white p-[0.8em] pb-[0.9em] text-navy shadow-lift">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={business.key}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.2, ease } }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="flex items-center justify-between px-[0.15em] font-mono text-[max(10px,0.68em)] uppercase tracking-[0.14em] text-navy/60">
              <span>Exemple</span>
              <span aria-hidden className="tabular">
                {pad(index + 1)}/{pad(total)}
              </span>
            </div>
            <div className="mt-[0.6em] grid aspect-[16/10] place-items-center lg:aspect-[4/3] rounded-[1.05em] bg-sky-50 ring-1 ring-inset ring-navy/[0.06]">
              <BusinessIllustration
                business={business.key}
                play={revealed}
                reduced={reduced}
                className="w-[62%] lg:w-[84%]"
              />
            </div>
            <div className="px-[0.15em]">
              <h3 className="mt-[0.75em] font-display text-[2em] leading-[1] text-navy">{business.example}</h3>
              <p className="mt-[0.55em] font-mono text-[max(10px,0.68em)] uppercase tracking-[0.14em] text-navy/60">
                {business.descriptor}
              </p>
              <div className="mt-[1em] flex items-center justify-between border-t border-navy/10 pt-[0.75em]">
                <span className="font-mono text-[max(10px,0.68em)] uppercase tracking-[0.14em] text-navy/60">
                  <span aria-hidden className="tabular">
                    {pad(business.items.length)}
                  </span>
                  <span className="sr-only">{business.items.length}</span> prestations
                </span>
                <Mark title="" className="h-[1.35em] text-navy" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
