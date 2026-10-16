import { Doodle } from "@/components/ui/doodle";
import { Sticker } from "@/components/ui/sticker";
import { hero } from "@/content/home";
import { cn } from "@/lib/cn";
import { InlineObject } from "./inline-object";

const WORD_START = 0.08;
const WORD_STAGGER = 0.06;

const delay = (seconds: number) => ({ "--d": `${seconds.toFixed(3)}s` }) as React.CSSProperties;

/** One word sliding up out of a mask (the mask is padded so descenders and accents are not cut). */
function Word({ children, at }: { children: React.ReactNode; at: number }) {
  return (
    <span className="-mx-[0.05em] -my-[0.12em] inline-block overflow-hidden px-[0.05em] py-[0.12em] align-bottom">
      <span className="hero-word" style={delay(at)}>
        {children}
      </span>
    </span>
  );
}

/** Splits a line into masked words; a trailing full stop becomes the coral dot of the logo. */
function Line({ text, from }: { text: string; from: number }) {
  const words = text.split(" ");
  return words.map((word, i) => {
    const last = i === words.length - 1;
    const dotted = last && word.endsWith(".");
    return (
      <span key={i}>
        <Word at={WORD_START + (from + i) * WORD_STAGGER}>
          {dotted ? (
            <>
              {word.slice(0, -1)}
              <span className="ml-[0.05em] inline-block size-[0.17em] rounded-full bg-coral" />
            </>
          ) : (
            word
          )}
        </Word>
        {last ? null : " "}
      </span>
    );
  });
}

/**
 * "Tout le digital [object] / de votre business. / [On s’en occupe.]"
 * Screen readers get the sentence once; the animated version is hidden from them.
 */
export function Headline({ id, className }: { id?: string; className?: string }) {
  const first = hero.line1.split(" ").length;
  const second = hero.line2.split(" ").length;
  const objectAt = WORD_START + first * WORD_STAGGER + 0.04;
  const stickerAt = WORD_START + (first + 1 + second) * WORD_STAGGER + 0.12;

  return (
    <h1
      id={id}
      className={cn(
        "font-display text-navy",
        "text-[clamp(2.2rem,11.2vw,3.6rem)] leading-[0.98] tracking-[-0.038em]",
        "sm:text-[clamp(3.4rem,min(10vw,8.7svh),6.75rem)] sm:leading-[0.95]",
        className,
      )}
    >
      <span className="sr-only">{`${hero.line1} ${hero.line2} ${hero.sticker}`}</span>
      <span aria-hidden className="block">
        <span className="block">
          <Line text={hero.line1} from={0} />{" "}
          <span className="hero-pop relative -top-[0.04em] align-middle" style={delay(objectAt)}>
            <InlineObject />
          </span>
        </span>
        <span className="block">
          <Line text={hero.line2} from={first + 1} />
        </span>
        <span className="mt-[0.14em] block">
          <span className="hero-pop relative" style={delay(stickerAt)}>
            <Sticker rotate={-2.5}>{hero.sticker}</Sticker>
            <Doodle
              name="spark"
              strokeWidth={3}
              delay={stickerAt + 0.35}
              duration={0.5}
              className="absolute -right-[0.5em] top-[0.02em] size-[0.56em] rotate-[40deg] text-coral"
            />
          </span>
        </span>
      </span>
    </h1>
  );
}
