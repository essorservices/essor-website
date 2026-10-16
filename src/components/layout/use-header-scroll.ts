"use client";

import { useEffect, useState, type RefObject } from "react";

export type HeaderTone = "light" | "dark";

type HeaderScroll = {
  /** Past the first 40px: the bar turns into a compact pill */
  scrolled: boolean;
  /** Scrolling down: the bar slides out of view */
  hidden: boolean;
  /** Tone of the panel currently under the bar */
  tone: HeaderTone;
};

const SCROLLED_AFTER = 40;
/** Never hide while the hero is still close to the top */
const HIDE_AFTER = 160;
/** Distance to travel in one direction before the bar reacts (avoids jitter) */
const DOWN_TOLERANCE = 14;
const UP_TOLERANCE = 6;

/**
 * Tracks the header state on scroll, throttled to one read per frame.
 * The tone comes from the `[data-tone]` element (Panel) under the bar's midpoint;
 * in the thin sky gaps between panels the previous tone is kept, so it never flickers.
 * `initialTone` is the tone of the route's first panel, so the server HTML paints right.
 */
export function useHeaderScroll(
  frameRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
  routeKey: string,
  initialTone: HeaderTone = "light",
): HeaderScroll {
  const [state, setState] = useState<HeaderScroll>({ scrolled: false, hidden: false, tone: initialTone });

  useEffect(() => {
    let lastY = window.scrollY;
    let down = 0;
    let up = 0;
    let hidden = false;
    let tone = initialTone;
    let frame = 0;

    const readTone = () => {
      const outer = frameRef.current;
      const bar = barRef.current;
      if (!outer || !bar) return tone;
      // The outer frame is never transformed, so its box stays put while the bar hides.
      const probeY = outer.getBoundingClientRect().bottom - bar.offsetHeight / 2;
      let found: string | undefined;
      for (const el of document.querySelectorAll<HTMLElement>("[data-tone]")) {
        if (outer.contains(el) || el.closest("[data-header-ignore]")) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) found = el.dataset.tone;
      }
      if (found) tone = found === "navy" ? "dark" : "light";
      return tone;
    };

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const dy = y - lastY;
      lastY = y;

      if (y < HIDE_AFTER) {
        hidden = false;
        down = up = 0;
      } else if (dy > 0) {
        down += dy;
        up = 0;
        if (down > DOWN_TOLERANCE) hidden = true;
      } else if (dy < 0) {
        up -= dy;
        down = 0;
        if (up > UP_TOLERANCE) hidden = false;
      }

      const next = { scrolled: y > SCROLLED_AFTER, hidden, tone: readTone() };
      setState((prev) =>
        prev.scrolled === next.scrolled && prev.hidden === next.hidden && prev.tone === next.tone ? prev : next,
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    // Content streaming in or images loading can move panels without any scroll.
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
    };
  }, [frameRef, barRef, routeKey, initialTone]);

  return state;
}
