import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";

/**
 * Real 404 status for unknown case studies. The page itself streams, so a notFound() there
 * can only answer 200 + noindex. Rewriting to a path with no route renders the root
 * not-found page with a 404 before anything is sent.
 */
const known = new Set([...projects.map((p) => p.slug), "opengraph-image"]);

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !known.has(slug)) {
    return NextResponse.rewrite(new URL("/introuvable", request.url));
  }
}

export const config = {
  matcher: "/projets/:slug",
};
