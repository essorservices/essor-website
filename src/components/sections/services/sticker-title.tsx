import { Fragment } from "react";
import { Sticker } from "@/components/ui/sticker";

/** "Une seule équipe." -> ["Une seule", "équipe."]: cut at the space closest to the middle. */
function splitInTwo(phrase: string): string[] {
  const middle = phrase.length / 2;
  let cut = -1;
  for (let i = 0; i < phrase.length; i++) {
    if (phrase[i] === " " && (cut === -1 || Math.abs(i - middle) < Math.abs(cut - middle))) cut = i;
  }
  return cut === -1 ? [phrase] : [phrase.slice(0, cut), phrase.slice(cut + 1)];
}

const tilts = [-3, 2.5];

/**
 * Like <Highlight>, but the highlighted phrase becomes two stickers with opposite tilts
 * (the stacked "super. digital." stickers of the Bond reference). A single wide sticker
 * cannot wrap gracefully in the narrow sticky column; two short ones stack or sit side by side.
 */
export function StickerTitle({ text, highlight }: { text: string; highlight: string }) {
  if (!text.includes(highlight)) return <>{text}</>;
  const [before, ...rest] = text.split(highlight);
  const after = rest.join(highlight);
  const parts = splitInTwo(highlight);

  return (
    <>
      {before}
      <span className="inline-block">
        {parts.map((part, i) => (
          <Fragment key={part}>
            <Sticker rotate={tilts[i % tilts.length]} className={i > 0 ? "ml-[0.08em] mt-[0.06em]" : undefined}>
              {part}
            </Sticker>
            {i < parts.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
      {after}
    </>
  );
}
