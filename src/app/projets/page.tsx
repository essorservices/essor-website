import type { Metadata } from "next";
import { workCopy } from "@/components/sections/work/copy";
import { ProjectsIndex } from "@/components/sections/work/projects-index";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: workCopy.index.title,
  description: workCopy.index.metaDescription,
  alternates: { canonical: "/projets" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/projets",
    title: `${workCopy.index.title} | ${site.name}`,
    description: workCopy.index.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${workCopy.index.title} | ${site.name}`,
    description: workCopy.index.metaDescription,
  },
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
