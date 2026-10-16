import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const url = (path: string) => new URL(path, site.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/projets"), changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: url(`/projets/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/mentions-legales"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
