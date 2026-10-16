import Link from "next/link";
import { Deliverable } from "@/components/deliverables";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ConceptTag } from "./concept-tag";
import { ServiceChips } from "./service-chips";

/**
 * A project in a list: the cover mockup in the client's colours, then client, sector,
 * year, métiers and the concept tag. The whole card is one link to the case study.
 * No client hooks, so it renders on the server and can be handed to client islands as a node.
 */
export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
  coverClassName = "aspect-[4/5]",
  className,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  /** Shape of the cover (aspect ratio); the width comes from the parent */
  coverClassName?: string;
  className?: string;
}) {
  const { slug, client, sector, year, services, theme, cover, concept } = project;
  const id = `projet-${slug}`;

  return (
    <Link
      href={`/projets/${slug}`}
      prefetch
      aria-labelledby={concept ? `${id}-nom ${id}-concept` : `${id}-nom`}
      aria-describedby={`${id}-meta ${id}-metiers`}
      className={cn("group/card @container block rounded-[1.75rem] [outline-offset:6px]", className)}
    >
      <div
        className={cn("relative isolate overflow-hidden rounded-[1.5rem]", coverClassName)}
        style={{ backgroundColor: theme.bg }}
      >
        <div className="size-full transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover/card:scale-[1.03] group-focus-visible/card:scale-[1.03]">
          <Deliverable kind={cover} theme={theme} />
        </div>
        {/* Hairline so pale client colours keep an edge on the white panel */}
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-navy/[0.07]" />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-4 top-4 grid size-14 place-items-center rounded-full bg-coral text-navy shadow-sticker sm:right-5 sm:top-5 sm:size-16",
            "-rotate-45 scale-50 opacity-0 transition-[opacity,scale,rotate] duration-500 ease-[var(--ease-out-back)]",
            "group-hover/card:rotate-0 group-hover/card:scale-100 group-hover/card:opacity-100",
            "group-focus-visible/card:rotate-0 group-focus-visible/card:scale-100 group-focus-visible/card:opacity-100",
          )}
        >
          <ArrowUpRightIcon className="size-5 sm:size-6" />
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-2.5 sm:mt-6">
        <Heading
          id={`${id}-nom`}
          className="min-w-0 text-2xl leading-[1.02] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/card:translate-x-1.5 sm:text-3xl @xl:text-[2.6rem]"
        >
          {client}
        </Heading>
        {concept ? <ConceptTag id={`${id}-concept`} className="mt-0.5 @xl:mt-2" /> : null}
      </div>
      <p id={`${id}-meta`} className="mt-2.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-navy/60">
        {sector}
        <span aria-hidden className="px-2 text-navy/30">
          ·
        </span>
        <span className="tabular">{year}</span>
      </p>
      <ServiceChips id={`${id}-metiers`} services={services} className="mt-4" />
    </Link>
  );
}
