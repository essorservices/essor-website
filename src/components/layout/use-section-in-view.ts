"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section (among `ids`) that crosses a thin band in the upper
 * part of the viewport, or null. Only observes while `enabled` (the home page).
 */
export function useSectionInView(ids: readonly string[], enabled: boolean): string | null {
  const [current, setCurrent] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) return;
    const sectionIds = key.split("|");
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setCurrent(sectionIds.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? current : null;
}
