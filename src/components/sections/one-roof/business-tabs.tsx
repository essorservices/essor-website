"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import type { Business } from "@/content/one-roof";
import { cn } from "@/lib/cn";

export type TabsAutoplay = {
  /** false while paused (hover, focus, off-screen) */
  running: boolean;
  durationMs: number;
  onDone: () => void;
};

/**
 * WAI-ARIA tablist (automatic activation): arrows move and select, Home/End jump,
 * only the selected tab is in the tab order. The coral background slides between tabs.
 */
export function BusinessTabs({
  businesses,
  active,
  onSelect,
  tabId,
  panelId,
  autoplay,
  className,
}: {
  businesses: Business[];
  active: number;
  onSelect: (index: number) => void;
  tabId: (index: number) => string;
  panelId: string;
  /** null when autoplay is off */
  autoplay: TabsAutoplay | null;
  className?: string;
}) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const n = businesses.length;
    const next =
      e.key === "ArrowRight"
        ? (active + 1) % n
        : e.key === "ArrowLeft"
          ? (active - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    onSelect(next);
    tabs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Type de business"
      onKeyDown={onKeyDown}
      className={cn("grid grid-cols-2 gap-2 sm:flex sm:flex-wrap", className)}
    >
      {businesses.map((b, i) => {
        const selected = i === active;
        return (
          <button
            key={b.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={tabId(i)}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(i)}
            className={cn(
              "relative isolate inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-5 text-[0.98rem] font-semibold tracking-[-0.01em] sm:justify-start",
              "transition-[color,background-color,box-shadow] duration-300 ease-[var(--ease-out-expo)]",
              selected ? "text-navy" : "text-white ring-1 ring-inset ring-sky/25 hover:bg-white/5",
            )}
          >
            {selected ? (
              <motion.span
                layoutId={`${panelId}-tab-bg`}
                aria-hidden
                className="absolute inset-0 -z-10 overflow-hidden rounded-full bg-coral"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              >
                {autoplay ? (
                  <span className="absolute inset-x-5 bottom-[7px] h-[2px] overflow-hidden rounded-full bg-navy/15">
                    <span
                      key={b.key}
                      data-paused={!autoplay.running}
                      onAnimationEnd={autoplay.onDone}
                      style={{ "--or-duration": `${autoplay.durationMs}ms` } as React.CSSProperties}
                      className="or-progress block h-full rounded-full bg-navy/70"
                    />
                  </span>
                ) : null}
              </motion.span>
            ) : null}
            <span aria-hidden className={cn("font-mono text-[0.7rem] tabular", selected ? "text-navy/60" : "text-sky/50")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{b.label}</span>
          </button>
        );
      })}
    </div>
  );
}
