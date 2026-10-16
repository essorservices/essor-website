"use client";

import { useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Writes a spring-smoothed progress to the CSS custom property `name` on `ref`:
 * 0 at the top of the page, 1 once the bottom of `ref` has scrolled past the top of the viewport.
 * Measured against the page rather than the viewport, so the resting pose is exact on any screen
 * height (a viewport-relative offset would already be part-way through when the hero is short).
 * When disabled (reduced motion) the property is removed and the CSS default applies.
 */
export function useLeaveProgress(ref: React.RefObject<HTMLElement | null>, name: `--${string}`, enabled: boolean) {
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 140, damping: 28, mass: 0.5 });
  const distance = useRef(1);
  const { scrollY } = useScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!enabled) {
      el.style.removeProperty(name);
      return;
    }
    const measure = () => {
      distance.current = Math.max(1, el.getBoundingClientRect().bottom + window.scrollY);
      progress.set(Math.min(1, window.scrollY / distance.current));
    };
    measure();
    // the panel resizes when fonts load or the viewport changes, which moves the element
    const observer = new ResizeObserver(measure);
    observer.observe(el.closest("section") ?? el);
    return () => observer.disconnect();
  }, [ref, name, enabled, progress]);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (enabled) progress.set(Math.min(1, Math.max(0, y / distance.current)));
  });

  useMotionValueEvent(smooth, "change", (value) => {
    if (enabled) ref.current?.style.setProperty(name, value.toFixed(4));
  });
}
