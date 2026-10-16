import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ConceptTag } from "../concept-tag";
import { workCopy } from "../copy";
import { ServiceChips } from "../service-chips";
import { SplitWords } from "../split-words";
import "../work.css";

const t = workCopy.caseStudy;
const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/**
 * Case study opening: back link, client + concept tag, the headline, summary and meta.
 * Above the fold, so entrances are CSS (work.css) and play before hydration.
 */
export function CaseIntro({ project }: { project: Project }) {
  return (
    <Panel tone="white" aria-label={project.client}>
      <Container className="pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <Link
          href="/projets"
          className="group/back inline-flex h-11 items-center gap-2.5 rounded-full pl-1.5 pr-4 text-[0.95rem] font-medium text-navy ring-1 ring-inset ring-navy/15 transition-[box-shadow,background-color] duration-300 hover:bg-sky-50 hover:ring-navy/40"
        >
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-full bg-sky-50 transition-colors duration-300 group-hover/back:bg-navy group-hover/back:text-white"
          >
            <ArrowIcon className="rotate-180 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/back:-translate-x-0.5" />
          </span>
          {t.back}
        </Link>

        <div className="work-in mt-14 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-20">
          <p className="flex items-center gap-2.5 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-navy">
            <span aria-hidden className="size-2 rounded-full bg-coral" />
            {project.client}
          </p>
          {project.concept ? <ConceptTag /> : null}
        </div>

        <div className="mt-6 grid gap-y-10 sm:mt-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <SplitWords text={project.headline} delay={0.1} className="max-w-[17ch] text-display lg:col-span-8" />
          <div className="work-in lg:col-span-4 lg:pb-[0.5rem]" style={delay(0.4)}>
            <p className="max-w-[34rem] text-lg leading-relaxed text-navy/70 sm:text-xl">{project.summary}</p>
          </div>
        </div>

        {/* Spec strip, on the same 12-column grid: Services lines up with the summary above */}
        <div className="work-in mt-14 border-t border-navy/10 pt-8 sm:mt-20 sm:pt-10" style={delay(0.5)}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-12 md:gap-x-8">
            <Meta term={t.sector} className="md:col-span-4">
              {project.sector}
            </Meta>
            <Meta term={t.year} className="md:col-span-4">
              <span className="tabular">{project.year}</span>
            </Meta>
            <Meta term={t.services} className="col-span-2 md:col-span-4" mono={false}>
              <ServiceChips services={project.services} className="mt-0.5" />
            </Meta>
          </dl>
        </div>
      </Container>
    </Panel>
  );
}

function Meta({
  term,
  mono = true,
  className,
  children,
}: {
  term: string;
  mono?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <dt className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-navy/60">{term}</dt>
      <dd className={cn("mt-2.5 text-navy", mono && "font-mono text-[0.95rem] uppercase tracking-[0.06em]")}>{children}</dd>
    </div>
  );
}
