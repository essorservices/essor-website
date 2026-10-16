import { Container } from "@/components/ui/container";
import { Doodle } from "@/components/ui/doodle";
import { Highlight } from "@/components/ui/highlight";
import { Panel } from "@/components/ui/panel";
import { oneRoof } from "@/content/one-roof";
import { OneRoofExplorer } from "./explorer";

/**
 * 01, "Un seul toit": the offer in five seconds. A business in the middle,
 * everything essor can take over for it around, on the navy grid canvas.
 */
export function OneRoof() {
  // The spark bursts from the last word, so it rides on its own anchor (as in the footer CTA).
  // Sideways off the period, at x-height: the 0.95 leading leaves no room above the word.
  const cut = oneRoof.title.lastIndexOf(" ");
  return (
    <Panel id="un-seul-toit" tone="navy" grid aria-labelledby="un-seul-toit-titre">
      <Container className="py-20 sm:py-28 lg:py-36">
        <h2 id="un-seul-toit-titre" className="max-w-[24ch] text-display text-white">
          <Highlight text={oneRoof.title.slice(0, cut)} highlight={oneRoof.highlight} rotate={-2} />{" "}
          <span className="relative whitespace-nowrap">
            {oneRoof.title.slice(cut + 1)}
            <Doodle
              name="spark"
              strokeWidth={3}
              delay={0.5}
              className="absolute -right-[0.375em] top-[0.4em] size-[0.46em] rotate-30 text-coral"
            />
          </span>
        </h2>

        <OneRoofExplorer intro={oneRoof.intro} className="mt-8 sm:mt-10 xl:mt-14" />
      </Container>
    </Panel>
  );
}
