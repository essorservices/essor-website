"use client";

import "./one-roof.css";
import { useInView } from "motion/react";
import { useId, useRef, useState } from "react";
import { Doodle } from "@/components/ui/doodle";
import { oneRoof } from "@/content/one-roof";
import type { ServiceKey } from "@/content/services";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";
import { BusinessTabs } from "./business-tabs";
import { ServiceLegend } from "./service-legend";
import { Stage } from "./stage";

const AUTOPLAY_MS = 5500;
const businesses = oneRoof.businesses;

/**
 * Interactive part of "Un seul toit": business tabs, the diagram, the legend.
 * Autoplay cycles the tabs while the section is on screen; it pauses on hover or
 * keyboard focus, stops for good once a tab is chosen, and is off under reduced motion.
 */
export function OneRoofExplorer({ intro, className }: { intro: string; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const panelId = `${uid}-panel`;
  const tabId = (i: number) => `${uid}-tab-${businesses[i].key}`;

  const root = useRef<HTMLDivElement>(null);
  const onScreen = useInView(root, { amount: 0.3 });
  const revealed = useInView(root, { once: true, amount: 0.2 });
  // The endless loops (dashes, spine, float) only run while some of the section is visible
  const visible = useInView(root);
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop();

  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [preview, setPreview] = useState<ServiceKey | null>(null);
  const [pinned, setPinned] = useState<ServiceKey | null>(null);

  const autoplayOn = !stopped && !reduced;
  const running = autoplayOn && revealed && onScreen && !hovered && !focused;
  const focus = preview ?? pinned;
  const business = businesses[active];

  function next() {
    setActive((a) => (a + 1) % businesses.length);
  }

  function select(i: number) {
    setActive(i);
    setStopped(true);
  }

  const hoverZone = {
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(true),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(false),
  };

  return (
    <div
      ref={root}
      data-paused={!visible || undefined}
      className={className}
      onFocus={(e) => setFocused(!e.target.closest("[data-autoplay-toggle]"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      {/* Intro then tabs in reading order; side by side from xl, the intro on the right */}
      <div className="flex flex-col gap-10 xl:flex-row-reverse xl:items-end xl:justify-between xl:gap-16">
        <p className="max-w-[38rem] text-lg text-sky/75 sm:text-xl xl:max-w-[30rem] xl:pb-1">{intro}</p>
        {/* Mobile: note + toggle on one row, tabs below. sm+: note above, toggle after the tabs.
            DOM order (tabs, then toggle) matches the desktop reading and focus order. */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Note className="order-1 flex-1 pl-1 sm:mb-1 sm:basis-full" />
          <div {...hoverZone} className="order-3 w-full sm:order-2 sm:w-auto">
            <BusinessTabs
              businesses={businesses}
              active={active}
              onSelect={select}
              tabId={tabId}
              panelId={panelId}
              autoplay={autoplayOn ? { running, durationMs: AUTOPLAY_MS, onDone: next } : null}
            />
          </div>
          {reduced ? null : (
            <AutoplayToggle stopped={stopped} onToggle={() => setStopped((s) => !s)} className="order-2 sm:order-3" />
          )}
        </div>
      </div>

      <div
        {...hoverZone}
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="mt-12 rounded-[var(--radius-panel)] lg:mt-6"
      >
        <Stage
          uid={uid}
          business={business}
          index={active}
          total={businesses.length}
          focus={focus}
          revealed={revealed}
          playing={visible}
          reduced={reduced}
          desktop={desktop}
        />
      </div>

      <div {...hoverZone}>
        <ServiceLegend
          labelId={`${uid}-legend`}
          business={business}
          focus={focus}
          pinned={pinned}
          onPreview={setPreview}
          onPin={(key) => setPinned((p) => (p === key ? null : key))}
        />
      </div>
    </div>
  );
}

/** Handwritten-feel hint pointing down at the tabs. Decorative: the intro already says it. */
function Note({ className }: { className?: string }) {
  return (
    <p aria-hidden className={cn("pointer-events-none flex select-none items-start gap-1 text-coral", className)}>
      <span className="-rotate-2 whitespace-nowrap font-mono text-[0.8rem] tracking-[0.02em] sm:text-[0.82rem]">
        choisissez votre business
      </span>
      <Doodle name="arrow" strokeWidth={2.4} delay={0.3} className="mt-1.5 h-7 w-9 shrink-0 rotate-[6deg] sm:h-8 sm:w-11" />
    </p>
  );
}

function AutoplayToggle({
  stopped,
  onToggle,
  className,
}: {
  stopped: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-autoplay-toggle
      onClick={onToggle}
      aria-label={stopped ? "Relancer le défilement automatique" : "Arrêter le défilement automatique"}
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full text-sky/75 ring-1 ring-inset ring-sky/25 transition-colors duration-300 hover:bg-white/5 hover:text-white",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" aria-hidden focusable="false" className="size-3.5" fill="currentColor">
        {stopped ? <path d="M4.5 2.8v10.4L13 8 4.5 2.8Z" /> : <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />}
      </svg>
    </button>
  );
}
