import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Doodle } from "@/components/ui/doodle";
import { Magnetic } from "@/components/ui/magnetic";
import { Sticker } from "@/components/ui/sticker";
import type { finalCta } from "@/content/home";

/**
 * The highlighted words as a coral sticker, with a spark bursting from the end of the line.
 * (Same split as `Highlight`, done here so the spark has a stable anchor.)
 */
function Title({ text, highlight }: { text: string; highlight: string }) {
  const at = text.indexOf(highlight);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      {/* nowrap: the sticker and the "?" that follows always stay on the same line */}
      <span className="whitespace-nowrap">
        <Sticker rotate={-3} className="mx-[0.04em]">
          {highlight}
        </Sticker>
        <span className="relative">
          {text.slice(at + highlight.length)}
          <Doodle
            name="spark"
            className="absolute -right-[0.62em] -top-[0.12em] size-[0.5em] text-coral"
            strokeWidth={2.4}
            delay={0.4}
          />
        </span>
      </span>
    </>
  );
}

/** Final call to action at the top of the footer: big headline left, the pitch and the button offset right. */
export function FooterCta({ cta }: { cta: typeof finalCta }) {
  return (
    <Container>
      <div className="relative border-b border-sky/15 pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-36">
        <div className="grid items-end gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="max-w-[15ch] text-display text-white">
              <Title text={cta.title} highlight={cta.highlight} />
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-[28rem] text-lg leading-relaxed text-sky/75 sm:text-xl">{cta.text}</p>
            <div className="relative mt-8 inline-block">
              <Doodle
                name="arrow"
                className="absolute -left-[7.25rem] -top-12 hidden h-auto w-24 text-sky/40 xl:block"
                strokeWidth={2}
                delay={0.6}
              />
              <Magnetic>
                <ButtonLink href={cta.primary.href} size="lg">
                  {cta.primary.label}
                </ButtonLink>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
