"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ServiceIcon } from "@/components/ui/icons";
import type { ServiceKey } from "@/content/services";
import { usePrefersReducedMotion } from "@/hooks/use-media";

const cycle: ServiceKey[] = ["branding", "strategie", "contenu", "web", "automatisation"];
const STEP = 1800;

/**
 * The small object set inside the headline: a coral capsule that flips through
 * the five services. Decorative; the h1 carries the full sentence for assistive tech.
 */
export function InlineObject() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref);
  const [index, setIndex] = useState(0);
  const playing = inView && !reduced;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % cycle.length), STEP);
    return () => clearInterval(id);
  }, [playing]);

  const service = cycle[reduced ? 0 : index];

  return (
    <span
      ref={ref}
      aria-hidden
      className="relative flex h-[0.82em] w-[1.5em] rotate-[6deg] items-center justify-center overflow-hidden rounded-full bg-coral text-navy shadow-[0_0.055em_0_0_var(--color-navy-950)]"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={service}
          className="absolute inset-0 grid place-items-center"
          initial={{ y: "105%", rotate: -12 }}
          animate={{ y: "0%", rotate: 0 }}
          exit={{ y: "-105%", rotate: 12 }}
          transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
        >
          <ServiceIcon service={service} className="size-[0.5em] [stroke-width:2.1]" />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
