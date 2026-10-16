"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Doodle } from "@/components/ui/doodle";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";
import { polyline, takeOffPath, type FlightPath, type Point } from "./flight-path";
import { StepNumber } from "./step-number";

const ease = [0.16, 1, 0.3, 1] as const;

type Step = { number: string; title: string; text: string };
type Geometry = FlightPath & { width: number; height: number };

/**
 * Space above each step on desktop, from the first to the last. Each step sits higher than
 * the one before, by a bigger margin every time: the line accelerates like a take-off.
 */
const LIFTS = ["14rem", "12.75rem", "10rem", "5.5rem"];

/** Center of `el` in the coordinate space of `box`. */
function centerIn(el: Element, box: DOMRect): Point {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
}

/** How many stops the line has passed. The last stop is the coral dot: `steps + 1` means it has arrived. */
function passed(progress: number, stops: number[]) {
  return stops.filter((s, i) => (i === 0 ? progress > 0.002 : progress >= s - 0.004)).length;
}

/**
 * The four steps of the method. On desktop they climb like a staircase, joined by a line
 * that leaves flat and takes off towards the coral dot, drawn as you scroll; each number
 * fills with coral when the line reaches it. Below lg it becomes a vertical timeline.
 */
export function Staircase({ steps, className }: { steps: readonly Step[]; className?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [reached, setReached] = useState(0);
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop();

  // Desktop: the whole climb, coral dot included, is drawn while the staircase is on screen.
  // Mobile: the tip of the line follows the reader at 70% of the viewport height.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: desktop ? ["start 0.7", "start 0.15"] : ["start 0.7", "end 0.7"],
  });
  // Round caps would show a dot at length 0, so the line only appears once it starts
  const lineOpacity = useTransform(scrollYProgress, (v) => (v > 0.002 ? 1 : 0));

  useEffect(() => {
    const list = listRef.current;
    const end = endRef.current;
    if (!list || !end) return;
    const wide = window.matchMedia("(min-width: 1024px)");

    const measure = () => {
      const box = list.getBoundingClientRect();
      const nodes = [...list.querySelectorAll("[data-node]")].map((n) => centerIn(n, box));
      const last = centerIn(end, box);
      const path = wide.matches ? takeOffPath([...nodes, last]) : polyline([...nodes, last]);
      setGeometry({ ...path, width: box.width, height: box.height });
      setReached(passed(scrollYProgress.get(), path.stops));
    };

    // Fires once on observe, then whenever fonts, content or the viewport change the layout
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (geometry) setReached(passed(v, geometry.stops));
  });

  const active = reduced ? steps.length + 1 : reached;
  const arrived = active > steps.length;

  return (
    <div className={cn("relative", className)}>
      {geometry ? (
        <svg
          aria-hidden
          focusable="false"
          width={geometry.width}
          height={geometry.height}
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          className="pointer-events-none absolute left-0 top-0 overflow-visible text-navy"
          fill="none"
        >
          {/* The planned route, dashed like the Bond connectors */}
          <path d={geometry.d} stroke="currentColor" strokeOpacity={0.16} strokeWidth={1.25} strokeDasharray="4 6" />
          <motion.path
            d={geometry.d}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            style={reduced ? { pathLength: 1 } : { pathLength: scrollYProgress, opacity: lineOpacity }}
          />
        </svg>
      ) : null}

      <ol ref={listRef} className="relative grid gap-y-14 sm:gap-y-16 lg:grid-cols-4 lg:gap-y-0">
        {steps.map((step, i) => {
          const on = active > i;
          return (
            <li
              key={step.number}
              style={{ "--lift": LIFTS[i] ?? "0px" } as React.CSSProperties}
              className="relative pl-14 sm:pl-20 lg:pl-0 lg:pr-8 lg:pt-[var(--lift)] xl:pr-12"
            >
              {/* Where the line passes: left of the number on mobile, above it on desktop */}
              <span
                data-node
                aria-hidden
                className={cn(
                  "absolute left-[5px] top-[1.6rem] size-3 rounded-full ring-1 ring-inset transition-[background-color,box-shadow] duration-500 sm:left-[13px] sm:top-[1.9rem]",
                  "lg:left-0 lg:top-[calc(var(--lift)-0.375rem)]",
                  on ? "bg-navy ring-navy" : "bg-white ring-navy/30",
                )}
              />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: 0.05 + i * 0.07, ease }}
                className="lg:pt-8"
              >
                <StepNumber value={step.number} filled={on} reduced={reduced} />
                <h3 className="mt-4 text-[1.65rem] leading-[1.05] sm:text-3xl lg:mt-6 lg:text-[1.75rem] xl:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[22rem] text-base leading-relaxed text-navy/70 sm:text-lg lg:mt-4">{step.text}</p>
              </motion.div>
            </li>
          );
        })}

        {/* The end of the line: the coral dot, and a spark as it takes off */}
        <li aria-hidden className="relative h-6 pl-14 sm:pl-20 lg:absolute lg:right-0 lg:top-0 lg:h-0 lg:p-0">
          <span
            ref={endRef}
            className="absolute left-[3px] top-0 block size-4 sm:left-[11px] lg:-top-[3.5rem] lg:left-auto lg:right-1"
          >
            <span
              className={cn(
                "absolute inset-0 rounded-full bg-coral transition-transform duration-500 ease-[var(--ease-out-back)]",
                arrived ? "scale-100" : "scale-0",
              )}
            />
            <AnimatePresence>
              {arrived ? (
                // Static drawing that pops in: the in-view draw of Doodle would not fire this close to the edge
                <motion.span
                  key="spark"
                  className="absolute -right-8 -top-8 block size-9 origin-bottom-left text-coral"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                >
                  <Doodle name="spark" strokeWidth={3.2} animate={false} className="size-full" />
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>
        </li>
      </ol>
    </div>
  );
}
