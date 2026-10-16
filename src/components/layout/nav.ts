import { projects } from "@/content/projects";
import { site } from "@/content/site";

export type NavItem = (typeof site.nav)[number];

/**
 * The home section a nav item stands for: its anchor ("/#services" → "services"),
 * or "projets" for the projects page, whose preview sits on the home page.
 */
const sectionOf = (href: string) => (href.startsWith("/#") ? href.slice(2) : href === "/projets" ? "projets" : null);

/** Section ids on the home page that the navigation points to. */
export const homeSectionIds = site.nav.map((item) => sectionOf(item.href)).filter((id): id is string => id !== null);

export const isHashLink = (href: string) => href.includes("#");

/**
 * Which nav href is "current" for a pathname.
 * On the home page the answer comes from the section in view, elsewhere from the route.
 */
export function activeHref(pathname: string, sectionInView: string | null): string | null {
  if (pathname === "/") {
    return sectionInView ? (site.nav.find((item) => sectionOf(item.href) === sectionInView)?.href ?? null) : null;
  }
  const match = site.nav.find((item) => !isHashLink(item.href) && (pathname === item.href || isProjectPage(pathname, item.href)));
  return match?.href ?? null;
}

/**
 * Only real case studies count as "under" /projets. An unknown /projets/… URL shows the
 * prerendered 404 page, which is built without any active item, so the client must agree.
 */
const projectPaths = new Set(projects.map((project) => `/projets/${project.slug}`));
const isProjectPage = (pathname: string, href: string) => href === "/projets" && projectPaths.has(pathname);
