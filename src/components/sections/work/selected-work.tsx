import { StickerTitle } from "@/components/sections/services/sticker-title";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { workIntro } from "@/content/home";
import { projects } from "@/content/projects";
import { ConceptNote } from "./concept-note";
import { Parallax } from "./parallax";
import { ProjectCard } from "./project-card";

/**
 * Where each of the first four projects sits on the 12-column grid (md and up).
 * Two interlocking blocks: a large card beside [intro + small card], then the mirror,
 * [note + small card] beside a large card. Phones get a single column in DOM order.
 */
const slots = [
  "md:col-span-7 md:col-start-1 md:row-span-2 md:row-start-1",
  "md:col-span-5 md:col-start-8 md:row-start-2",
  "md:col-span-5 md:col-start-1 md:row-start-4",
  "md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-3 md:mt-16 lg:mt-24",
];
/** Slots holding the small (5-column) cards */
const small = new Set([1, 2]);

/** 03, "Projets": four projects in an asymmetric editorial layout. */
export function SelectedWork() {
  const featured = projects.slice(0, slots.length);

  return (
    <Panel id="projets" tone="white" aria-labelledby="projets-titre">
      <Container className="py-20 sm:py-28 lg:py-36">
        <Reveal className="max-w-[64rem]">
          <h2 id="projets-titre" className="text-display">
            <StickerTitle text={workIntro.title} highlight={workIntro.highlight} />
          </h2>
        </Reveal>

        <ul className="mt-12 flex flex-col gap-16 sm:mt-16 md:grid md:grid-cols-12 md:gap-x-6 md:gap-y-14 lg:mt-20 lg:gap-x-8 lg:gap-y-16">
          <Reveal as="li" className="md:col-span-5 md:col-start-8 md:row-start-1 lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="max-w-[30rem] text-lg text-navy/70 sm:text-xl">{workIntro.intro}</p>
          </Reveal>

          {featured.map((project, i) => (
            <Reveal key={project.slug} as="li" className={slots[i]} delay={i % 2 === 1 ? 0.12 : 0}>
              {/* The small cards drift a little against the large ones: depth for the stagger */}
              {small.has(i) ? (
                <Parallax amount={5}>
                  <ProjectCard project={project} />
                </Parallax>
              ) : (
                <ProjectCard project={project} />
              )}
            </Reveal>
          ))}

          <Reveal as="li" className="md:col-span-5 md:col-start-1 md:row-start-3 md:mt-16 md:self-end lg:col-span-4 lg:mt-24">
            <ConceptNote cta={workIntro.cta} className="md:mr-4" />
          </Reveal>
        </ul>
      </Container>
    </Panel>
  );
}
