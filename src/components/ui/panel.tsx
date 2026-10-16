import { cn } from "@/lib/cn";

export type PanelTone = "white" | "navy" | "sky" | "coral";

const tones: Record<PanelTone, string> = {
  white: "bg-white text-navy",
  navy: "bg-navy text-white",
  sky: "bg-sky text-navy",
  coral: "bg-coral text-navy",
};

/**
 * A rounded "sheet" section. The page background is sky, so panels read as
 * stacked cards (like the white card on grey in the inspiration).
 * `grid` adds the Bond-style grid canvas (navy panels only).
 * overflow-clip (not hidden) keeps the rounded corners without making the panel a
 * scroll container, so position: sticky still works inside it.
 */
export function Panel({
  id,
  tone = "white",
  grid = false,
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: {
  id?: string;
  tone?: PanelTone;
  grid?: boolean;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      data-tone={tone}
      className={cn(
        "relative mx-2 overflow-clip rounded-[var(--radius-panel)] sm:mx-3",
        "scroll-mt-4",
        tones[tone],
        className,
      )}
    >
      {grid && tone === "navy" ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-grid mask-fade absolute inset-0" />
          <div className="bg-grid-plus mask-fade absolute inset-0" />
        </div>
      ) : null}
      {grid && tone !== "navy" ? (
        <div aria-hidden className="bg-grid-light mask-fade pointer-events-none absolute inset-0" />
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}
