import Link from "next/link";
import { Deliverable } from "@/components/deliverables";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ConceptTag } from "../concept-tag";
import { workCopy } from "../copy";

const t = workCopy.caseStudy;
const pad = (n: number) => String(n).padStart(2, "0");

/** Navy grid sheet: the next client's name, huge, with its cover. The whole sheet is the link. */
export function NextProject({ project, position, total }: { project: Project; position: number; total: number }) {
  return (
    <Panel tone="navy" grid aria-label={t.next}>
      <Link
        href={`/projets/${project.slug}`}
        prefetch
        aria-label={`${t.next} : ${project.client}`}
        className="group/next block rounded-[var(--radius-panel)] [outline-offset:-10px]"
      >
        <Container className="grid items-center gap-y-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-x-8 lg:py-28">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-2.5 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-sky/75">
              <span aria-hidden className="size-2 rounded-full bg-coral" />
              {t.next}
              <span aria-hidden className="text-sky/40">
                —
              </span>
              <span className="tabular">
                {pad(position)} / {pad(total)}
              </span>
            </p>
            <h2 className="mt-6 text-mega text-white sm:mt-8">
              <span className="inline-block transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/next:translate-x-[0.08em] group-focus-visible/next:translate-x-[0.08em]">
                {project.client}
              </span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-10">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-sky/75">
                {project.sector}
                <span aria-hidden className="px-2 text-sky/40">
                  ·
                </span>
                <span className="tabular">{project.year}</span>
              </p>
              {project.concept ? <ConceptTag /> : null}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div
              className={cn(
                "relative mx-auto w-[min(70%,20rem)] rotate-[5deg] lg:mr-4",
                "transition-[rotate,scale] duration-700 ease-[var(--ease-out-expo)]",
                "group-hover/next:rotate-[1deg] group-hover/next:scale-[1.04] group-focus-visible/next:rotate-[1deg] group-focus-visible/next:scale-[1.04]",
              )}
            >
              <div
                className="aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-lift ring-1 ring-sky/10"
                style={{ backgroundColor: project.theme.bg }}
              >
                <Deliverable kind={project.cover} theme={project.theme} />
              </div>
              <span
                aria-hidden
                className={cn(
                  "absolute -left-7 -top-7 grid size-[4.5rem] place-items-center rounded-full bg-coral text-navy shadow-sticker sm:size-20",
                  "transition-[rotate] duration-500 ease-[var(--ease-out-back)] group-hover/next:rotate-45 group-focus-visible/next:rotate-45",
                )}
              >
                <ArrowUpRightIcon className="size-7" />
              </span>
            </div>
          </div>
        </Container>
      </Link>
    </Panel>
  );
}
