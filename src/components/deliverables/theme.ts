import type { CSSProperties } from "react";
import type { ClientTheme } from "@/content/projects";

export type Motif = ClientTheme["motif"];

/**
 * Typographic and shape personality of a client brand.
 * The font family comes from `theme.voice`; weight, width, case and corner radius
 * come from `theme.motif`, so every brand keeps one consistent look across all six mockups.
 */
type Personality = {
  weight: number;
  variation: string;
  tracking: string;
  transform: "none" | "uppercase";
  /** Corner radius multiplier: 1 = soft and round, 0 = square */
  radius: number;
};

const personalities: Record<Motif, Personality> = {
  arch: { weight: 680, variation: '"opsz" 96, "wdth" 92', tracking: "-0.018em", transform: "none", radius: 1 },
  circle: { weight: 500, variation: '"opsz" 96, "wdth" 75', tracking: "0.01em", transform: "uppercase", radius: 0.55 },
  wave: { weight: 620, variation: '"opsz" 40', tracking: "-0.022em", transform: "none", radius: 0.8 },
  stripe: { weight: 320, variation: '"opsz" 96, "wdth" 100', tracking: "-0.03em", transform: "none", radius: 0.12 },
  grid: { weight: 500, variation: "normal", tracking: "-0.03em", transform: "uppercase", radius: 0 },
};

export const voiceClass: Record<ClientTheme["voice"], string> = {
  display: "font-display",
  sans: "font-sans",
  mono: "font-mono",
};

/** Name of the typeface each voice renders with (shown on the identity sheet). */
export const voiceFontName: Record<ClientTheme["voice"], string> = {
  display: "Bricolage Grotesque",
  sans: "DM Sans",
  mono: "DM Mono",
};

function luminance(hex: string) {
  const v = hex.replace("#", "");
  if (v.length !== 6) return 0.5;
  const channel = (i: number) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** First candidate that reads at UI size (3:1) on `bg`, otherwise the best one. */
export function readableOn(bg: string, candidates: string[]) {
  const ok = candidates.find((c) => contrast(bg, c) >= 3);
  return ok ?? [...candidates].sort((x, y) => contrast(bg, y) - contrast(bg, x))[0];
}

export const isDark = (hex: string) => luminance(hex) < 0.18;

/**
 * CSS custom properties consumed by the compositions:
 * colours (--bg, --surface, --ink, --accent, --accent2, --on-accent, --on-accent2, --deep),
 * radius multiplier (--r) and the display style (--dw, --dv, --dl, --dt).
 */
export function themeVars(theme: ClientTheme): CSSProperties {
  const p = personalities[theme.motif];
  const light = [theme.surface, theme.bg, theme.ink];
  const deep = [theme.bg, theme.surface, theme.ink].sort((a, b) => luminance(a) - luminance(b))[0];
  return {
    "--bg": theme.bg,
    "--surface": theme.surface,
    "--ink": theme.ink,
    "--accent": theme.accent,
    "--accent2": theme.accent2,
    "--on-accent": readableOn(theme.accent, light),
    "--on-accent2": readableOn(theme.accent2, [theme.ink, theme.bg, theme.surface]),
    "--deep": deep,
    "--r": String(p.radius),
    "--dw": String(p.weight),
    "--dv": p.variation,
    "--dl": p.tracking,
    "--dt": p.transform,
  } as CSSProperties;
}

const strip = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();

/** "Café Nour" -> "cafe.nour" */
export const handleOf = (brand: string) => strip(brand).split(/\s+/).join(".");

/** Concept brands get local, clearly fictional domains: a plain `.com` could belong to a real company. */
const fictionalDomains: Record<string, string> = { pulse: "pulse-club.dz" };

/** "Café Nour" -> "cafe-nour.dz" */
export const domainOf = (brand: string) => fictionalDomains[strip(brand)] ?? `${strip(brand).replace(/\s+/g, "-")}.dz`;
