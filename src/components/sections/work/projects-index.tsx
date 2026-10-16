import { Container } from "@/components/ui/container";
import { Doodle } from "@/components/ui/doodle";
import { Panel } from "@/components/ui/panel";
import { SectionLabel } from "@/components/ui/section-label";
import { Sticker } from "@/components/ui/sticker";
import { workIntro } from "@/content/home";
import { projects } from "@/content/projects";
import { ConceptTag } from "./concept-tag";
import { workCopy } from "./copy";
import { ProjectCard } from "./project-card";
import { ProjectFilter } from "./project-filter";
import "./work.css";

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/**
 * /projets: a big "Projets" with the "de la marque à l'appli." sticker slapped over its foot,
 * the intro on the right, then the filterable grid of every project.
 * Everything above the fold enters with CSS animations, so it shows before hydration.
 */
export function ProjectsIndex() {
  const items = projects.map((project) => ({
    slug: project.slug,
    services: project.services,
    card: <ProjectCard project={project} headingLevel="h2" />,
  }));

  return (
    <Panel tone="white" aria-labelledby="projets-titre">
      <Container className="pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-36 lg:pt-44">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-8">
            <div className="work-in">
              <SectionLabel>{workCopy.index.eyebrow}</SectionLabel>
            </div>
            <h1 id="projets-titre" className="mt-5 text-[clamp(5rem,22vw,11.5rem)] leading-[0.86] sm:mt-7">
              <span className="relative inline-block">
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <span className="work-word" style={delay(0.05)}>
                    {workCopy.index.title}
                  </span>
                </span>
                <sup
                  aria-hidden
                  className="work-in tabular absolute left-full top-[0.12em] ml-[0.1em] font-mono text-[max(0.8rem,0.15em)] font-normal tracking-[0.08em] text-navy/60"
                  style={delay(0.5)}
                >
                  ({String(projects.length).padStart(2, "0")})
                </sup>
              </span>
              <span className="sr-only"> </span>
              {/* The sticker is slapped over the foot of the word */}
              <span className="relative z-10 -mt-[0.14em] block pl-[0.25em] text-[clamp(1.55rem,5.4vw,4.1rem)] leading-none tracking-[-0.02em] sm:pl-[1.5em]">
                {/* The spark is anchored to the sticker's top-right corner, so it never wraps to the line start.
                    On lg the sticker outruns the word, so it moves above the corner to stay clear of the intro column. */}
                <span className="relative inline-block">
                  <span className="work-pop origin-[20%_60%]" style={delay(0.45)}>
                    <Sticker rotate={-3.5} className="px-[0.32em] pb-[0.1em] pt-[0.04em]">
                      {workIntro.highlight}
                    </Sticker>
                  </span>
                  <Doodle
                    name="spark"
                    delay={1}
                    className="absolute -top-[0.7em] left-full ml-[0.1em] hidden size-[1.1em] text-coral sm:block lg:-right-[0.1em] lg:-top-[1.05em] lg:left-auto lg:ml-0"
                  />
                </span>
              </span>
            </h1>
          </div>

          <div className="work-in lg:col-span-4 lg:pb-[0.6rem]" style={delay(0.3)}>
            <p className="max-w-[30rem] text-lg text-navy/70 sm:text-xl">{workIntro.intro}</p>
            <div className="mt-7 max-w-[30rem] border-t border-navy/10 pt-5">
              <ConceptTag />
              <p className="mt-3 text-[0.95rem] leading-relaxed text-navy/60">{workCopy.conceptNote}</p>
            </div>
          </div>
        </div>

        <div className="work-in mt-16 sm:mt-20 lg:mt-28" style={delay(0.45)}>
          <ProjectFilter items={items} />
        </div>
      </Container>
    </Panel>
  );
}
