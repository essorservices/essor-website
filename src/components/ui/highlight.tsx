import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { Sticker, type StickerTone } from "./sticker";

/**
 * Renders `text` and turns the `highlight` substring into a sticker (or a coral word).
 * Content files expose { title, highlight } pairs for this.
 */
export function Highlight({
  text,
  highlight,
  variant = "sticker",
  tone = "coral",
  rotate = -2.5,
  className,
}: {
  text: string;
  highlight?: string;
  variant?: "sticker" | "coral";
  tone?: StickerTone;
  rotate?: number;
  className?: string;
}) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, ...rest] = text.split(highlight);
  const after = rest.join(highlight);
  return (
    <Fragment>
      {before}
      {variant === "sticker" ? (
        <Sticker tone={tone} rotate={rotate} className={cn("mx-[0.04em] whitespace-normal", className)}>
          {highlight}
        </Sticker>
      ) : (
        <span className={cn("text-coral", className)}>{highlight}</span>
      )}
      {after}
    </Fragment>
  );
}
