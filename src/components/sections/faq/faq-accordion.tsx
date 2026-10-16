"use client";

import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { FaqItem } from "./faq-item";
import { useKeepInPlace } from "./use-keep-in-place";

type Item = { q: string; a: string };

/** One answer open at a time, the first one by default. Clicking the open question closes it. */
export function FaqAccordion({ items, className }: { items: readonly Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = usePrefersReducedMotion();
  const keepInPlace = useKeepInPlace();

  function toggle(i: number, button: HTMLButtonElement) {
    // An answer closing above would pull the clicked question up: hold it under the pointer
    if (open !== null && open < i) keepInPlace(button);
    setOpen((current) => (current === i ? null : i));
  }

  return (
    <ul className={className}>
      {items.map((item, i) => (
        <FaqItem
          key={item.q}
          id={`faq-${i + 1}`}
          index={i}
          question={item.q}
          answer={item.a}
          open={open === i}
          reduced={reduced}
          onToggle={(button) => toggle(i, button)}
        />
      ))}
    </ul>
  );
}
