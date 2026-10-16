import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NotFound from "@/app/not-found";
import { CaseStudy } from "@/components/sections/work/case-study/case-study";
import { projectBySlug, projects } from "@/content/projects";
import { site } from "@/content/site";

// Allowed to block on params (read outside Suspense below), which also opts it out of static-shell validation.
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  // Concept projects say so in every snippet, so they never read as real client work
  const name = project.concept ? `${project.client} (projet concept)` : project.client;
  const summary = project.summary.charAt(0).toLowerCase() + project.summary.slice(1);
  const description = project.concept ? `Projet concept : ${summary}` : project.summary;
  const title = `${name} | ${site.name}`;
  return {
    title: name,
    description,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      type: "article",
      locale: site.locale,
      siteName: site.name,
      url: `/projets/${project.slug}`,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Every slug is prerendered (generateStaticParams) and `params` is read outside any Suspense
 * boundary, so direct visits get the whole case study as HTML.
 * Unknown slugs never reach this page in practice: src/proxy.ts rewrites them to a real 404.
 * As a fallback the 404 view is rendered instead of throwing, because a notFound() thrown here
 * escapes the server render and ships an empty error shell (blank page until JS runs).
 */
export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return <NotFound />;

  return <CaseStudy project={project} />;
}
