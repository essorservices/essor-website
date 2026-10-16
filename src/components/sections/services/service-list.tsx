"use client";

import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { services, type ServiceKey } from "@/content/services";
import { useMedia, usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";
import { CARD_H, CARD_W, FloatingPreview } from "./floating-preview";
import { ServiceRow } from "./service-row";
import { useScrollAnchor } from "./use-scroll-anchor";

/** Desktop, precise pointer, motion allowed: the only case where the floating card shows. */
const FLOATING_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Clear space between the card and the row's text (it also absorbs the card's tilt) */
const GAP = 24;
/** How far the card may poke past the list, and its minimum distance to the window edge */
const OVERHANG = 72;
const EDGE = 24;
/** Keeps the card clear of the fixed header */
const SAFE_TOP = 96;
/** On short screens the card shrinks to fit beside the row, never below this */
const MIN_SCALE = 0.55;
/** The title slides 0.75rem to the right on hover (service-row) */
const HOVER_SHIFT = 12;
const follow = { stiffness: 380, damping: 34, mass: 0.6 };

const order = (key: ServiceKey) => services.findIndex((s) => s.key === key);

/** Left edge of the full-size card: at the end of the list, poking past it a little. */
function cardLeft(list: HTMLElement) {
  return Math.min(list.getBoundingClientRect().right + OVERHANG, window.innerWidth - EDGE) - CARD_W;
}

/**
 * Vertical band of the row, relative to its top, holding the parts a card placed from `left`
 * would cover: the title and summary glyphs (not their boxes) and the toggle.
 */
function measureClearBand(row: HTMLElement, left: number) {
  const rowTop = row.getBoundingClientRect().top;
  let top = Infinity;
  let bottom = -Infinity;
  for (const el of row.querySelectorAll<HTMLElement>("[data-keep-clear]")) {
    let box = el.getBoundingClientRect();
    if (el.dataset.keepClear === "text") {
      const range = document.createRange();
      range.selectNodeContents(el);
      box = range.getBoundingClientRect();
    }
    if (box.right + HOVER_SHIFT + GAP < left) continue;
    top = Math.min(top, box.top - rowTop);
    bottom = Math.max(bottom, box.bottom - rowTop);
  }
  return top <= bottom ? { top, bottom } : { top: 0, bottom: row.offsetHeight };
}

/**
 * The five métiers as an accordion (one open at a time, the first by default).
 * On desktop with a mouse, a mockup card pops out beside the hovered row.
 */
export function ServiceList({ className }: { className?: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const hoverRow = useRef<{ el: HTMLElement; top: number; bottom: number } | null>(null);
  const [open, setOpen] = useState<ServiceKey | null>(services[0].key);
  const [hovered, setHovered] = useState<ServiceKey | null>(null);
  // After a click the card steps aside so it does not cover the text that just opened
  const [dismissed, setDismissed] = useState<ServiceKey | null>(null);

  const reduced = usePrefersReducedMotion();
  const floating = useMedia(FLOATING_QUERY);
  const near = useInView(listRef, { once: true, margin: "600px 0px" });
  const anchor = useScrollAnchor();

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const x = useSpring(targetX, follow);
  const y = useSpring(targetY, follow);
  const scale = useSpring(targetScale, follow);

  /**
   * No row is wide enough to hold the card next to its title, so the card sits at the end of
   * the list, just above or below the band holding the hovered row's title, summary and toggle:
   * above when it fits (over the rows already read), else below, else on the roomier side,
   * shrunk to fit (short laptop screens), so the hovered row stays fully readable.
   */
  function place() {
    const list = listRef.current;
    const row = hoverRow.current;
    if (!list || !row) return;
    const rowTop = row.el.getBoundingClientRect().top;
    const roomAbove = rowTop + row.top - GAP - SAFE_TOP;
    const roomBelow = window.innerHeight - EDGE - (rowTop + row.bottom + GAP);
    const above = roomAbove >= CARD_H || (roomBelow < CARD_H && roomAbove >= roomBelow);
    const s = Math.min(Math.max((above ? roomAbove : roomBelow) / CARD_H, MIN_SCALE), 1);
    targetX.set(cardLeft(list));
    targetY.set(above ? rowTop + row.top - GAP - CARD_H * s : rowTop + row.bottom + GAP);
    targetScale.set(s);
  }

  function enter(key: ServiceKey, e: React.PointerEvent<HTMLButtonElement>) {
    if (e.pointerType !== "mouse" || !listRef.current) return;
    hoverRow.current = { el: e.currentTarget, ...measureClearBand(e.currentTarget, cardLeft(listRef.current)) };
    place();
    if (hovered === null) {
      // Appear in place instead of flying in from the last position
      x.jump(targetX.get());
      y.jump(targetY.get());
      scale.jump(targetScale.get());
    }
    setHovered(key);
    if (dismissed !== key) setDismissed(null);
  }

  function leave() {
    hoverRow.current = null;
    setHovered(null);
    setDismissed(null);
  }

  // While the card is up it stays with its row on scroll, and Escape puts it away like a click
  const onScroll = useEffectEvent(place);
  useEffect(() => {
    if (hovered === null) return;
    const scroll = () => onScroll();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDismissed(hovered);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
    };
  }, [hovered]);

  function toggle(key: ServiceKey, header: HTMLElement) {
    const next = open === key ? null : key;
    // A row above is about to collapse: keep the clicked one where it is on screen
    if (open !== null && next !== null && order(open) < order(next)) anchor(header);
    setOpen(next);
    setDismissed(key);
  }

  return (
    <div className={className}>
      <ul
        ref={listRef}
        // Rows above can still be opening or closing: follow the hovered one
        onPointerMove={(e) => e.pointerType === "mouse" && place()}
        className={cn(
          "relative border-b border-navy/10",
          // Row metrics shared by the title, number column, toggle and hover disc
          "[--row-t:clamp(2rem,5.4vw,3.75rem)] [--tog:2.75rem]",
          "lg:[--disc:2.25rem] lg:[--num:3.75rem] lg:[--row-t:3.4vw] lg:[--tog:3rem]",
          "xl:[--disc:2.75rem] xl:[--num:6.5rem] xl:[--row-t:var(--text-title)] xl:[--tog:3.5rem]",
        )}
      >
        {services.map((s, i) => (
          <ServiceRow
            key={s.key}
            service={s}
            index={i}
            open={open === s.key}
            reduced={reduced}
            onToggle={(header) => toggle(s.key, header)}
            onPointerEnter={(e) => enter(s.key, e)}
            onPointerLeave={leave}
          />
        ))}
      </ul>

      {floating && near ? (
        <FloatingPreview
          active={hovered}
          visible={hovered !== null && hovered !== dismissed}
          x={x}
          y={y}
          scale={scale}
        />
      ) : null}
    </div>
  );
}
