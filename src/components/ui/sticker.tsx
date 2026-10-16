import { cn } from "@/lib/cn";

export type StickerTone = "coral" | "sky" | "white" | "navy";

const tones: Record<StickerTone, string> = {
  coral: "bg-coral text-navy shadow-[0_0.08em_0_0_var(--color-navy-950)]",
  sky: "bg-sky text-navy shadow-[0_0.08em_0_0_var(--color-navy-950)]",
  white: "bg-white text-navy shadow-[0_0.08em_0_0_var(--color-navy-950)]",
  navy: "bg-navy text-white shadow-[0_0.08em_0_0_var(--color-coral)]",
};

/**
 * Tilted label, like a sticker slapped on the page (from the Bond reference).
 * Size follows the surrounding font size, so it works inside headlines and as a small tag.
 */
export function Sticker({
  children,
  tone = "coral",
  rotate = -3,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  tone?: StickerTone;
  rotate?: number;
  className?: string;
  as?: "span" | "div" | "p";
}) {
  return (
    <Tag
      style={{ rotate: `${rotate}deg` }}
      className={cn(
        "relative inline-block rounded-[0.22em] px-[0.28em] pb-[0.08em] pt-[0.02em] leading-[1.05]",
        "whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
