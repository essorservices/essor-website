"use client";

import { useLenis } from "lenis/react";

/**
 * Keeps an element at the same spot on screen while the layout above it changes
 * (a row collapsing above the one just opened), so the clicked row stays under the pointer.
 * Scrolls through Lenis when it runs, natively otherwise (reduced motion).
 */
export function useScrollAnchor() {
  const lenis = useLenis();

  return function anchor(el: HTMLElement, durationMs = 900) {
    const start = el.getBoundingClientRect().top;
    const until = performance.now() + durationMs;

    const tick = () => {
      const drift = el.getBoundingClientRect().top - start;
      if (Math.abs(drift) >= 1) {
        const top = Math.max(0, window.scrollY + drift);
        if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
        else window.scrollTo({ top, behavior: "instant" });
      }
      if (performance.now() < until) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
}
