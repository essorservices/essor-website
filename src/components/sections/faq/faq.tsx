import { ButtonLink } from "@/components/ui/button";
import { Doodle } from "@/components/ui/doodle";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { faq } from "@/content/home";
import { site } from "@/content/site";
import { FaqAccordion } from "./faq-accordion";

/** 06, "Questions": the title and a way to ask anything else on the left, the answers on the right. */
export function Faq() {
  return (
    <Panel id="faq" tone="white" aria-labelledby="faq-titre">
      <Container className="py-20 sm:py-28 lg:py-36">
        <div className="grid gap-y-12 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:sticky lg:top-[7.5rem] lg:col-span-5 lg:self-start">
            <SectionLabel index="06">{faq.label}</SectionLabel>
            <h2 id="faq-titre" className="mt-6 max-w-[13ch] text-title">
              {faq.title}
            </h2>
            <p className="mt-6 max-w-[25rem] text-lg text-navy/70 sm:text-xl">
              Votre question n’est pas dans la liste ? Posez-la dans votre brief : on vous répond sans détour.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <ButtonLink href={site.cta.href} variant="outline">
                {site.cta.label}
              </ButtonLink>
              <Doodle name="arrow" delay={0.6} className="h-10 w-14 -scale-x-100 rotate-[24deg] text-coral" />
            </div>
          </Reveal>

          <FaqAccordion items={faq.items} className="lg:col-span-7 lg:mt-[0.45rem]" />
        </div>
      </Container>
    </Panel>
  );
}
