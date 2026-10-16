import { Container } from "@/components/ui/container";
import type { DeliverableKind, Project } from "@/content/projects";
import { workCopy } from "../copy";
import { ShowcaseStage } from "./showcase-stage";
import { toneFor } from "./theme-tone";

/**
 * Full-width sheet in the client's background colour (same margins and radius as Panel),
 * holding the hero shot of the deliverables.
 */
export function Showcase({ project, kinds }: { project: Project; kinds: DeliverableKind[] }) {
  const tone = toneFor(project.theme.bg);
  return (
    <section
      aria-label={`${workCopy.caseStudy.showcase} : ${project.client}`}
      data-tone={tone}
      className="relative mx-2 overflow-hidden rounded-[var(--radius-panel)] sm:mx-3"
      style={{ backgroundColor: project.theme.bg }}
    >
      <Container className="py-16 sm:py-24 lg:py-28">
        <ShowcaseStage kinds={kinds} theme={project.theme} dark={tone === "navy"} />
      </Container>
    </section>
  );
}
