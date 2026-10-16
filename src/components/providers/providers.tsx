"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { MotionConfig } from "motion/react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

/**
 * App-wide client providers:
 * - Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync
 * - Motion respects the visitor's reduced-motion preference
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduced) return;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [reduced]);

  return (
    <MotionConfig reducedMotion="user">
      {reduced ? null : (
        <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.12, anchors: { offset: -12 } }}>
          <ScrollTriggerSync />
        </ReactLenis>
      )}
      {children}
    </MotionConfig>
  );
}
