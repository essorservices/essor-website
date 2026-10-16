import { projects, type Project } from "@/content/projects";
import { CaseIntro } from "./case-intro";
import { NextProject } from "./next-project";
import { Showcase } from "./showcase";
import { CaseStory } from "./story";
import { splitGallery } from "./theme-tone";

/** A full case study: intro, showcase in the client's colours, story, next project. */
export function CaseStudy({ project }: { project: Project }) {
  const { showcase, extra } = splitGallery(project);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <CaseIntro project={project} />
      <Showcase project={project} kinds={showcase} />
      <CaseStory project={project} extra={extra} />
      {next.slug !== project.slug ? (
        <NextProject project={next} position={projects.indexOf(next) + 1} total={projects.length} />
      ) : null}
    </>
  );
}
