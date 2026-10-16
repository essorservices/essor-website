import { projectBySlug, projects } from "@/content/projects";
import { site } from "@/content/site";
import { caseStudyImage, ogSize } from "../_og/render";

export const alt = `Projet concept imaginé par ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** The PNG bytes, cached per slug: rendering one takes ~0.5 s. Null for an unknown slug. */
async function png(slug: string) {
  "use cache";
  const project = projectBySlug(slug);
  if (!project) return null;
  return new Uint8Array(await (await caseStudyImage(project)).arrayBuffer());
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bytes = await png(slug);
  if (!bytes) return new Response(null, { status: 404 });
  return new Response(bytes, { headers: { "Content-Type": contentType } });
}
