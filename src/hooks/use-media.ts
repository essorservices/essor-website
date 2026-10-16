"use client";

import { useSyncExternalStore } from "react";

function subscribeTo(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

/** SSR-safe media query hook. Returns `serverValue` during SSR and hydration. */
export function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribeTo(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");
export const useIsDesktop = () => useMedia("(min-width: 1024px)");
