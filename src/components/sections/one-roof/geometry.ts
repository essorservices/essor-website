/**
 * Fixed layout box of the desktop diagram, in design units (u).
 * The stage renders at any width: 1u = stage width / STAGE.w, so pills,
 * card and connectors scale together and the lines always hit the pills.
 */
export const STAGE = { w: 1000, h: 600 } as const;

export const CARD = { cx: 500, cy: 300, w: 236 } as const;

export type Side = "left" | "right";

export type Slot = {
  side: Side;
  /** Anchor on the pill's inner edge (the side facing the card) */
  x: number;
  y: number;
  /** Resting tilt of the pill, in degrees */
  tilt: number;
  /** Vertical offset of the connector start under the card, so no line is dead straight */
  bend?: number;
  /** Float loop: period and phase (s), different per pill so they never move in sync */
  float: { duration: number; delay: number };
};

/*
  Six pills on an ellipse around the card: 3 left, 3 right, top to bottom.
  Middle pills sit further out than the top/bottom ones, and the two sides are
  slightly offset so the composition does not read as a mirrored template.
*/
export const SLOTS: readonly Slot[] = [
  { side: "left", x: 372, y: 84, tilt: -1.6, float: { duration: 6.2, delay: 0 } },
  { side: "left", x: 306, y: 300, tilt: 1, bend: 34, float: { duration: 7.1, delay: 0.9 } },
  { side: "left", x: 384, y: 516, tilt: -0.6, float: { duration: 6.6, delay: 1.7 } },
  { side: "right", x: 630, y: 96, tilt: 1.3, float: { duration: 6.9, delay: 0.4 } },
  { side: "right", x: 696, y: 312, tilt: -1, bend: -40, float: { duration: 6.4, delay: 1.3 } },
  { side: "right", x: 618, y: 508, tilt: 0.7, float: { duration: 7.3, delay: 2.1 } },
];

/**
 * Curved connector from under the card to a pill anchor.
 * It starts near the card centre (hidden by the card), leaves it horizontally
 * and lands on the pill horizontally, which gives the soft S of the Bond lines.
 */
export function connectorPath(slot: Slot): string {
  const dir = slot.side === "left" ? -1 : 1;
  const sx = CARD.cx + dir * 30;
  const sy = CARD.cy + (slot.y - CARD.cy) * 0.3 + (slot.bend ?? 0);
  const c1x = sx + dir * 96;
  const c2x = slot.x - dir * 84;
  return `M${sx} ${round(sy)} C${c1x} ${round(sy)} ${c2x} ${slot.y} ${slot.x} ${slot.y}`;
}

function round(n: number) {
  return Math.round(n * 10) / 10;
}
