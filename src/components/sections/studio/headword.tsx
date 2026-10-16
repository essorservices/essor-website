"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

const word: Variants = {
  hidden: { y: "105%" },
  shown: { y: "0%", transition: { duration: 1, ease } },
};

const dot: Variants = {
  hidden: { scale: 0 },
  shown: { scale: 1, transition: { type: "spring", stiffness: 420, damping: 16, delay: 0.5 } },
};

/**
 * The headword slides up out of a mask, then the coral dot of the logo pops in as its full stop.
 * The in-view trigger sits on the visible mask, not on the clipped word (a fully clipped
 * element never intersects, so it would never start).
 */
export function Headword({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn("inline-flex items-baseline", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em]">
        <motion.span variants={word} className="inline-block will-change-transform">
          {text}
        </motion.span>
      </span>
      <motion.span variants={dot} className="ml-[0.05em] inline-block size-[0.17em] rounded-full bg-coral" />
    </motion.span>
  );
}
