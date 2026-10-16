"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Drifts its child vertically while it crosses the viewport (scroll-scrubbed).
 * Desktop only (768px and up) and never under reduced motion.
 * `amount` is in percent of the element's height: positive moves up faster than the page.
 */
export function Parallax({ amount = 6, className, children }: { amount?: number; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (reduced || !el) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          el,
          { yPercent: amount },
          { yPercent: -amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [reduced, amount] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
