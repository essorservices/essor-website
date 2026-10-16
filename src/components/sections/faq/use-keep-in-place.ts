"use client";

import { useLenis } from "lenis/react";

/**
 * Keeps an element at the same spot on screen while the layout above it changes
 * (an answer collapsing above the question just opened), so the clicked question
 * stays under the pointer. Scrolls through Lenis when it runs, natively otherwise.
 */
export function useKeepInPlace() {
  const lenis = useLenis();

  return function keep(el: HTMLElement, durationMs = 800) {
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
