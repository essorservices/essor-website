import { projects, type ClientTheme, type DeliverableKind } from "@/content/projects";

/** x in card widths, y in card heights (positive = lower), r in degrees */
export type FanPose = { x: number; y: number; r: number };

export type FanCard = {
  kind: DeliverableKind;
  theme: ClientTheme;
  /** pose on phones (5 cards) */
  mobile: FanPose;
  /** pose from 640px (6 cards) */
  desktop: FanPose;
  z: number;
  /** hidden on phones so the fan keeps five readable cards */
  desktopOnly?: boolean;
};

function themeOf(slug: string): ClientTheme {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Hero fan: unknown project "${slug}"`);
  return project.theme;
}

/*
  Left to right. Light and dark mockups alternate so neighbours always contrast.
  The poses are hand-tuned rather than computed on a perfect arc: a fan held in a hand
  is never quite symmetrical. Keep `desktopOnly` cards last: the touch autoplay walks
  through the first N visible cards by index.
*/
export const fanCards: FanCard[] = [
  {
    kind: "app",
    theme: themeOf("atelier-lina"),
    mobile: { x: -1.3, y: 0.17, r: -14 },
    desktop: { x: -1.66, y: 0.2, r: -17 },
    z: 1,
  },
  {
    kind: "reel",
    theme: themeOf("maison-safran"),
    mobile: { x: -0.68, y: 0.05, r: -7 },
    desktop: { x: -1.0, y: 0.075, r: -10 },
    z: 3,
  },
  {
    kind: "identity",
    theme: themeOf("cafe-nour"),
    mobile: { x: 0, y: 0, r: 0.5 },
    desktop: { x: -0.33, y: 0.01, r: -3.5 },
    z: 5,
  },
  {
    kind: "website",
    theme: themeOf("pulse"),
    mobile: { x: 0.69, y: 0.06, r: 7.5 },
    desktop: { x: 0.33, y: -0.02, r: 2.5 },
    z: 6,
  },
  {
    kind: "post",
    theme: themeOf("clinique-azur"),
    mobile: { x: 1.32, y: 0.18, r: 13 },
    desktop: { x: 1.0, y: 0.07, r: 10 },
    z: 4,
  },
  {
    kind: "automation",
    theme: themeOf("maison-safran"),
    mobile: { x: 0, y: 0.4, r: 0 },
    desktop: { x: 1.67, y: 0.205, r: 18 },
    z: 2,
    desktopOnly: true,
  },
];
