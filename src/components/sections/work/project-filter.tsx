"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ServiceIcon } from "@/components/ui/icons";
import { services, type ServiceKey } from "@/content/services";
import { cn } from "@/lib/cn";
import { workCopy } from "./copy";

export type FilterItem = {
  slug: string;
  services: readonly ServiceKey[];
  /** The server-rendered card */
  card: React.ReactNode;
};

type FilterKey = ServiceKey | "tous";

const ease = [0.16, 1, 0.3, 1] as const;
const layoutSpring = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 } as const;

/**
 * Filter chips ("Tous" + the five métiers) above a two-column grid.
 * Cards keep one size; the right column is pushed down to give the grid its rhythm,
 * and Motion animates every card to its new place when the filter changes.
 */
export function ProjectFilter({ items }: { items: FilterItem[] }) {
  const [active, setActive] = useState<FilterKey>("tous");
  const visible = active === "tous" ? items : items.filter((item) => item.services.includes(active));

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: "tous", label: workCopy.index.all, count: items.length },
    ...services.map((s) => ({
      key: s.key,
      label: s.label,
      count: items.filter((item) => item.services.includes(s.key)).length,
    })),
  ];
  const activeLabel = filters.find((f) => f.key === active)?.label ?? workCopy.index.all;

  return (
    <div>
      <div className="flex flex-col gap-5 border-t border-navy/10 pt-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <p id="filtre-projets" className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-navy/60">
          {workCopy.index.filterLabel}
        </p>
        {/* Phones: one swipeable row bleeding to the panel edge; wider screens wrap */}
        <div
          role="group"
          aria-labelledby="filtre-projets"
          className="-mx-5 flex gap-2 overflow-x-auto [mask-image:linear-gradient(to_right,#000_82%,transparent)] px-5 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden"
        >
          {filters.map((f) => {
            const pressed = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={pressed}
                disabled={f.count === 0}
                onClick={() => setActive(f.key)}
                className={cn(
                  "group/chip inline-flex h-11 shrink-0 items-center gap-2 rounded-full pl-2 pr-4 text-[0.95rem] font-medium",
                  "ring-1 ring-inset transition-[background-color,color,box-shadow] duration-300 ease-[var(--ease-out-expo)]",
                  "disabled:pointer-events-none disabled:opacity-40",
                  f.key === "tous" && "pl-4",
                  pressed ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-navy/15 hover:bg-sky-50 hover:ring-navy/40",
                )}
              >
                {f.key !== "tous" ? (
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-7 place-items-center rounded-full transition-colors duration-300",
                      pressed ? "bg-coral text-navy" : "bg-sky-50 text-navy group-hover/chip:bg-white",
                    )}
                  >
                    <ServiceIcon service={f.key} className="size-4" />
                  </span>
                ) : null}
                {f.label}
                <span
                  className={cn(
                    "tabular font-mono text-[0.7rem] tracking-[0.08em]",
                    pressed ? "text-sky/75" : "text-navy/60",
                  )}
                >
                  <span aria-hidden>{String(f.count).padStart(2, "0")}</span>
                  <span className="sr-only">, {workCopy.index.count(f.count)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Names the filter too: several filters give the same count, which alone would not be re-announced */}
      <p aria-live="polite" className="sr-only">
        {`${activeLabel}\u00A0: ${workCopy.index.count(visible.length)}`}
      </p>

      <ul
        className={cn(
          "relative mt-12 grid gap-16 sm:mt-14 md:grid-cols-2 md:gap-x-8 md:gap-y-20 lg:gap-x-14 lg:gap-y-24",
          // Room for the right column, which is shifted down
          visible.length > 1 && "md:pb-32 lg:pb-44",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3, ease } }}
              transition={{ layout: layoutSpring, opacity: { duration: 0.45, ease }, scale: { duration: 0.6, ease } }}
              className={cn(i % 2 === 1 && "md:translate-y-32 lg:translate-y-44")}
            >
              {item.card}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
