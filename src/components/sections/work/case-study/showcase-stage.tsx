"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useRef } from "react";
import { Deliverable, deliverableLabels } from "@/components/deliverables";
import type { ClientTheme, DeliverableKind } from "@/content/projects";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = [0.16, 1, 0.3, 1] as const;

type Pose = {
  /** Width, overlap, resting offset and tilt (Tailwind, so they stay responsive) */
  className: string;
  rotate: number;
  /** Parallax strength: positive drifts up faster than the page */
  depth: number;
  caption: "left" | "right";
};

/** Hand-placed poses: a centre piece standing tall, side pieces tucked behind it and lower. */
const poses: Record<2 | 3, Pose[]> = {
  3: [
    { className: "z-0 w-[46%] -mr-[23%] translate-y-[14%] sm:w-[31%] sm:-mr-[3%]", rotate: -5, depth: 0.6, caption: "left" },
    { className: "z-10 w-[54%] sm:w-[36%]", rotate: 1.5, depth: 1, caption: "left" },
    { className: "z-0 w-[46%] -ml-[23%] translate-y-[22%] sm:w-[31%] sm:-ml-[3%]", rotate: 5, depth: 0.4, caption: "right" },
  ],
  2: [
    { className: "z-10 w-[56%] -mr-[12%] sm:w-[40%] sm:-mr-[4%]", rotate: -3.5, depth: 1, caption: "left" },
    { className: "z-0 w-[56%] translate-y-[16%] sm:w-[40%]", rotate: 3.5, depth: 0.5, caption: "right" },
  ],
};

/**
 * The Behance-style hero shot: two or three deliverables in the client's colours,
 * fanned out with tilts and staggered heights. They open like a hand of cards when
 * they enter the view and drift at different speeds while the page scrolls.
 */
export function ShowcaseStage({
  kinds,
  theme,
  dark,
}: {
  kinds: DeliverableKind[];
  theme: ClientTheme;
  /** The client background is dark: card edges get a light hairline */
  dark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const set = poses[kinds.length >= 3 ? 3 : 2];
  const shown = kinds.slice(0, set.length);

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      for (const card of gsap.utils.toArray<HTMLElement>("[data-depth]", ref.current)) {
        const depth = Number(card.dataset.depth);
        gsap.fromTo(
          card,
          { yPercent: 7 * depth },
          {
            yPercent: -7 * depth,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref}>
    <div className="flex items-start justify-center pb-[12%] pt-[2%] sm:pb-[9%]">
      {shown.map((kind, i) => {
        const pose = set[i];
        return (
          <figure
            key={kind}
            data-depth={pose.depth}
            className={cn("relative shrink-0", pose.className)}
            style={{ rotate: `${pose.rotate}deg` }}
          >
            <motion.div
              initial={{ opacity: 0, y: 70, rotate: -pose.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 1.1, delay: 0.08 + i * 0.09, ease }}
            >
              <div
                className={cn(
                  "relative aspect-[4/5] overflow-hidden rounded-[clamp(0.9rem,1.8vw,1.75rem)] shadow-lift",
                  "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset",
                  dark ? "after:ring-sky/15" : "after:ring-navy/[0.06]",
                )}
              >
                <Deliverable kind={kind} theme={theme} />
              </div>
              {/* Phones: the fan overlaps too much for captions on the cards; the legend below takes over */}
              <figcaption
                className={cn(
                  "max-sm:sr-only",
                  "absolute -bottom-3.5 inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-navy shadow-sticker sm:-bottom-4 sm:h-9 sm:text-[0.72rem]",
                  pose.caption === "left" ? "left-[8%] -rotate-3" : "right-[8%] rotate-3",
                )}
              >
                <span aria-hidden className="size-1.5 rounded-full bg-coral" />
                {deliverableLabels[kind]}
              </figcaption>
            </motion.div>
          </figure>
        );
      })}
    </div>
    <ul aria-hidden className="mt-8 flex flex-wrap justify-center gap-2 sm:hidden">
      {shown.map((kind) => (
        <li
          key={kind}
          className="inline-flex h-8 items-center gap-2 rounded-full bg-white px-3.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-navy shadow-sticker"
        >
          <span className="size-1.5 rounded-full bg-coral" />
          {deliverableLabels[kind]}
        </li>
      ))}
    </ul>
    </div>
  );
}
