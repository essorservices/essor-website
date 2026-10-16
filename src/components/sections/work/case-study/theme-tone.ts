import type { DeliverableKind, Project } from "@/content/projects";

/** Relative luminance of a #RRGGBB colour (WCAG formula). */
function luminance(hex: string) {
  const v = hex.replace("#", "");
  if (v.length !== 6) return 1;
  const channel = (i: number) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

/**
 * Panel tone matching a client background, read by the header (`data-tone`)
 * so its text stays legible over the showcase.
 */
export const toneFor = (bg: string): "navy" | "white" => (luminance(bg) < 0.18 ? "navy" : "white");

/**
 * Splits the gallery between the showcase (three pieces when there are four or more,
 * otherwise two) and the pieces interleaved with the approach, so each mockup shows once.
 */
export function splitGallery(project: Project): { showcase: DeliverableKind[]; extra: DeliverableKind[] } {
  const count = project.gallery.length >= 4 ? 3 : Math.min(2, project.gallery.length);
  return { showcase: project.gallery.slice(0, count), extra: project.gallery.slice(count) };
}
