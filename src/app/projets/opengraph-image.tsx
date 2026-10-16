import { workCopy } from "@/components/sections/work/copy";
import { workIntro } from "@/content/home";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { ogSize, projectsIndexImage } from "./_og/render";

export const alt = `${workCopy.index.title} ${site.name}\u00A0: ${workIntro.highlight}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return projectsIndexImage(
    projects.map((p) => p.theme),
    workIntro.highlight,
  );
}
