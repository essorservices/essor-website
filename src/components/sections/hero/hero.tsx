import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { Panel } from "@/components/ui/panel";
import { SectionLabel } from "@/components/ui/section-label";
import { hero } from "@/content/home";
import { Fan } from "./fan";
import { Headline } from "./headline";
import "./hero.css";

const at = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

/** Mobile CTAs are full width and a notch shorter so the fan still peeks above the fold. */
const cta = "w-full max-sm:h-[3.25rem] sm:w-auto";

/**
 * Home hero: a clean white sheet, a headline with an object set inside it,
 * and a fan of deliverables spilling out of the bottom edge.
 * From 640px the sheet fills the first screen and the fan sits on its bottom edge;
 * vertical gaps follow the viewport height so short laptop screens still show the fan.
 */
export function Hero() {
  return (
    <Panel tone="white" aria-labelledby="hero-title" className="hero">
      <div className="flex flex-col sm:min-h-[min(calc(100svh-1.5rem),62rem)]">
        <Container className="flex flex-1 flex-col items-center justify-center pt-36 text-center sm:pt-[clamp(8.5rem,20svh,12.5rem)]">
          <SectionLabel className="hero-in justify-center text-[0.7rem] tracking-[0.1em] sm:text-[0.78rem] sm:tracking-[0.14em]">
            {hero.eyebrow}
          </SectionLabel>

          <Headline id="hero-title" className="mt-5 sm:mt-[clamp(1.1rem,2.8svh,1.75rem)]" />

          <p
            className="hero-in mt-5 max-w-[40rem] text-base leading-[1.6] text-navy/70 sm:mt-[clamp(1.1rem,2.8svh,1.75rem)] sm:text-xl sm:leading-[1.5]"
            style={at(0.5)}
          >
            {hero.sub}
          </p>

          <div
            className="hero-in mt-7 flex w-full max-w-[22rem] flex-col gap-2.5 sm:mt-[clamp(1.25rem,3.4svh,2rem)] sm:w-auto sm:max-w-none sm:flex-row sm:gap-3"
            style={at(0.62)}
          >
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink href={hero.primary.href} size="lg" className={cta}>
                {hero.primary.label}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={hero.secondary.href} variant="outline" size="lg" className={cta}>
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </Container>

        <div className="pt-6 sm:pt-[clamp(2rem,4.5svh,3rem)]">
          <Fan />
        </div>
      </div>
    </Panel>
  );
}
