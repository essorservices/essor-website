"use client";

import { motion, useIsPresent, type Variants } from "motion/react";
import { ServiceIcon } from "@/components/ui/icons";
import type { ServiceKey } from "@/content/services";
import { serviceByKey } from "@/content/services";
import { cn } from "@/lib/cn";
import { STAGE, type Slot } from "./geometry";

// Both sets define every animated prop: SSR renders the mobile set, and switching
// to the desktop set after hydration must not leave a stale x offset behind.
const spring = { type: "spring", stiffness: 440, damping: 26, mass: 0.8 } as const;

const desktopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, x: 0 },
  shown: (i: number) => ({ opacity: 1, scale: 1, x: 0, transition: { ...spring, delay: 0.32 + i * 0.06 } }),
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.16 } },
};

const mobileVariants: Variants = {
  hidden: { opacity: 0, x: -14, scale: 1 },
  shown: (i: number) => ({ opacity: 1, x: 0, scale: 1, transition: { ...spring, delay: 0.12 + i * 0.05 } }),
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/**
 * One deliverable of the active business.
 * Mobile/tablet: a full-width row on the timeline. Desktop (lg): absolutely placed
 * on the stage, its inner edge on the slot anchor (positions read CSS vars in stage units).
 */
export function Pill({
  item,
  slot,
  index,
  focus,
  revealed,
  desktop,
  floating,
}: {
  item: { service: ServiceKey; label: string };
  slot: Slot;
  index: number;
  focus: ServiceKey | null;
  revealed: boolean;
  desktop: boolean;
  floating: boolean;
}) {
  const isPresent = useIsPresent();
  const lit = focus !== null && item.service === focus;
  const dim = focus !== null && !lit;
  const left = slot.side === "left";

  return (
    <motion.li
      custom={index}
      variants={desktop ? desktopVariants : mobileVariants}
      initial="hidden"
      animate={revealed ? "shown" : "hidden"}
      exit="exit"
      aria-hidden={isPresent ? undefined : true}
      style={
        {
          "--x": slot.x,
          "--r": STAGE.w - slot.x,
          "--y": slot.y,
          "--tilt": `${slot.tilt}deg`,
        } as React.CSSProperties
      }
      className={cn(
        "relative origin-left",
        "lg:absolute lg:top-[calc(var(--u)*var(--y))] lg:-translate-y-1/2",
        left
          ? "lg:right-[calc(var(--u)*var(--r))] lg:origin-right"
          : "lg:left-[calc(var(--u)*var(--x))] lg:origin-left",
      )}
    >
      {/* Mobile timeline node */}
      <span aria-hidden className="absolute -left-[1.85rem] top-1/2 flex -translate-y-1/2 items-center lg:hidden">
        <span className="size-2 rounded-full bg-coral ring-4 ring-navy" />
        <span className="h-px w-[1.35rem] bg-sky/35" />
      </span>

      {/* Gentle float, CSS only: runs from lg up and never under reduced motion (one-roof.css) */}
      <div
        data-float={floating || undefined}
        style={
          {
            "--or-float-d": `${slot.float.duration}s`,
            "--or-float-delay": `${-slot.float.delay}s`,
          } as React.CSSProperties
        }
        className="or-float"
      >
        <div
          className={cn(
            "flex items-center gap-[0.7em] rounded-[1.9em] bg-white py-[0.45em] pl-[0.45em] pr-[1.15em] text-navy",
            "shadow-[0_0.2em_0_0_var(--color-navy-950)] ring-2 ring-transparent",
            "transition-[opacity,box-shadow] duration-300 ease-[var(--ease-out-expo)]",
            "lg:rotate-[var(--tilt)]",
            left ? "lg:origin-right" : "lg:origin-left",
            lit && "ring-coral",
            dim && "opacity-35",
          )}
        >
          <span className="grid size-[2.55em] shrink-0 place-items-center rounded-full bg-coral text-navy">
            <ServiceIcon service={item.service} className="size-[1.25em]" />
          </span>
          <span className="flex min-w-0 flex-col gap-[0.2em] py-[0.1em]">
            <span className="font-mono text-[max(10px,0.66em)] uppercase leading-none tracking-[0.14em] text-navy/60">
              {serviceByKey[item.service].label}
              <span className="sr-only"> : </span>
            </span>
            <span className="text-[1em] font-medium leading-[1.2] tracking-[-0.01em] lg:whitespace-nowrap">
              {item.label}
            </span>
          </span>
        </div>
      </div>
    </motion.li>
  );
}
