import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { finalCta, servicesIntro } from "@/content/home";
import { ServiceList } from "./service-list";
import { StickerTitle } from "./sticker-title";

/**
 * 02, "Services": the five métiers. Title and intro stay pinned on the left
 * while the list scrolls on the right; each row opens to its description and scope.
 */
export function Services() {
  return (
    <Panel id="services" tone="white" aria-labelledby="services-titre">
      <Container className="py-20 sm:py-28 lg:py-36">
        <div className="grid gap-y-14 sm:gap-y-16 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:sticky lg:top-[7.5rem] lg:col-span-5 lg:-mt-2 lg:self-start xl:col-span-4">
            <SectionLabel index="02">{servicesIntro.label}</SectionLabel>
            <h2 id="services-titre" className="mt-6 text-display lg:text-[clamp(3rem,5.1vw,4.6rem)]">
              <StickerTitle text={servicesIntro.title} highlight={servicesIntro.highlight} />
            </h2>
            <p className="mt-7 max-w-[34rem] text-lg text-navy/70 sm:text-xl">{servicesIntro.intro}</p>
            <ButtonLink href={finalCta.primary.href} variant="outline" size="sm" className="mt-9">
              {finalCta.primary.label}
            </ButtonLink>
          </Reveal>

          <ServiceList className="lg:col-span-7 xl:col-span-8" />
        </div>
      </Container>
    </Panel>
  );
}
