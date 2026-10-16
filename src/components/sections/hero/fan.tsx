"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Deliverable, deliverableLabels } from "@/components/deliverables";
import { Sticker } from "@/components/ui/sticker";
import { useFinePointer, useMedia, usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";
import { fanCards } from "./fan-cards";
import { useLeaveProgress } from "./use-leave-progress";

const ENTRANCE_DELAY = 0.7;
const AUTOPLAY_START = 2400;
const AUTOPLAY_STEP = 2600;

const label =
  "Exemples de livrables, tirés de nos projets concept\u00A0: une application, un Reel, une identité visuelle, un site web, une publication pour les réseaux sociaux et une automatisation";

/**
 * The fan of deliverables spilling out of the bottom of the hero panel.
 * Geometry and hover live in CSS (hero.css); this island only feeds the scroll progress
 * and, on touch screens, highlights each card in turn once.
 */
export function Fan({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const wide = useMedia("(min-width: 640px)");
  const inView = useInView(ref, { amount: 0.4 });

  useLeaveProgress(ref, "--p", !reduced);

  const count = wide ? fanCards.length : fanCards.filter((c) => !c.desktopOnly).length;
  const autoplay = !fine && !reduced && inView;
  const [active, setActive] = useState<number | null>(null);
  // Autoplay steps taken so far: one per card, then one to put the fan down. The tour goes
  // round once only, even if the hero scrolls out of view and back.
  const steps = useRef(0);

  useEffect(() => {
    if (!autoplay || steps.current > count) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const step = () => {
      steps.current += 1;
      if (steps.current > count) {
        clearInterval(interval);
        setActive(null);
        return;
      }
      setActive((a) => (a === null ? Math.floor(count / 2) : (a + 1) % count));
    };
    const start = setTimeout(() => {
      step();
      interval = setInterval(step, AUTOPLAY_STEP);
    }, AUTOPLAY_START);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [autoplay, count]);

  const highlighted = autoplay ? active : null;

  return (
    <div ref={ref} className={cn("hero-fan", className)}>
      <div
        role="img"
        aria-label={label}
        className="hero-deck relative isolate h-[calc(var(--card-w)*1.02)] w-full sm:h-[calc(var(--card-w)*0.8)]"
      >
        {fanCards.map((card, i) => {
          const centre = Math.abs(card.desktop.x);
          return (
            <div
              key={card.kind}
              data-active={highlighted === i ? "" : undefined}
              className={cn("hero-slot group/slot", card.desktopOnly && "max-sm:hidden")}
              style={
                {
                  "--xm": card.mobile.x,
                  "--ym": card.mobile.y,
                  "--rm": card.mobile.r,
                  "--xd": card.desktop.x,
                  "--yd": card.desktop.y,
                  "--rd": card.desktop.r,
                  "--z": card.z,
                } as React.CSSProperties
              }
            >
              <div className="hero-rise" style={{ "--d": `${ENTRANCE_DELAY + centre * 0.1}s` } as React.CSSProperties}>
                <div className="hero-card">
                  <Sticker tone="navy" rotate={0} className="hero-label absolute text-[0.82rem] font-semibold sm:text-[0.95rem]">
                    {deliverableLabels[card.kind]}
                  </Sticker>
                  <div className="hero-face size-full overflow-hidden rounded-[1.25rem] bg-white shadow-card ring-1 ring-navy/10 group-hover/slot:shadow-lift group-data-active/slot:shadow-lift">
                    <Deliverable kind={card.kind} theme={card.theme} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
