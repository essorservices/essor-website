import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { process } from "@/content/home";
import { Staircase } from "./staircase";

/**
 * 05, "Méthode": four steps that climb like a staircase and end in a take-off,
 * which is what "essor" means.
 */
export function Process() {
  return (
    <Panel id="methode" tone="white" aria-labelledby="methode-titre">
      <Container className="py-20 sm:py-28 lg:py-36">
        <Reveal>
          <h2 id="methode-titre" className="max-w-[11ch] text-display">
            <Highlight text={process.title} highlight={process.highlight} rotate={-2.5} />
          </h2>
        </Reveal>

        <Staircase steps={process.steps} className="mt-16 sm:mt-20 lg:-mt-24 xl:-mt-32" />
      </Container>
    </Panel>
  );
}
