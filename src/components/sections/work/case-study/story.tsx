import { Deliverable, deliverableLabels } from "@/components/deliverables";
import { ButtonLink } from "@/components/ui/button";
import { CheckIcon, ServiceIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import type { ClientTheme, DeliverableKind, Project } from "@/content/projects";
import { serviceByKey } from "@/content/services";
import { cn } from "@/lib/cn";
import { workCopy } from "../copy";
import { CaseLabel } from "./case-label";

const t = workCopy.caseStudy;

/** Shared rail: the section label on the left (3 cols), the content on the right (9 cols). */
function Row({ label, index, id, children }: { label: string; index: string; id: string; children: React.ReactNode }) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-y-8 border-t border-navy/10 pt-8 first:border-t-0 first:pt-0 sm:pt-10 xl:grid-cols-12 xl:gap-x-8"
    >
      <Reveal className="xl:col-span-3" y={14}>
        <CaseLabel id={id} index={index} className="whitespace-nowrap xl:pt-[0.55rem]">
          {label}
        </CaseLabel>
      </Reveal>
      <div className="xl:col-span-9">{children}</div>
    </section>
  );
}

/** "Les habitués revenaient. Les nouveaux…": the last sentence is set apart in coral. */
function splitLastSentence(text: string): [string, string] {
  const cut = text.lastIndexOf(". ", text.length - 2);
  return cut === -1 ? [text, ""] : [text.slice(0, cut + 2), text.slice(cut + 2)];
}

function Challenge({ text }: { text: string }) {
  const [lead, last] = splitLastSentence(text);
  return (
    <Reveal>
      <p className="max-w-[24ch] font-display text-[clamp(1.75rem,3.6vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.024em] text-navy [font-variation-settings:'opsz'_72] sm:max-w-[26ch]">
        {lead}
        {last ? <span className="text-coral">{last}</span> : null}
      </p>
    </Reveal>
  );
}

function ApproachStep({ step, number }: { step: Project["approach"][number]; number: number }) {
  const service = serviceByKey[step.service];
  return (
    <article className="flex flex-col">
      <div className="flex items-center gap-4">
        <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-coral text-navy">
          <ServiceIcon service={step.service} className="size-[1.35rem]" />
        </span>
        <span aria-hidden className="h-px flex-1 bg-navy/10" />
        <span className="tabular font-mono text-[0.78rem] tracking-[0.14em] text-navy/60">
          <span className="sr-only">Étape </span>
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-navy/60">{service.title}</p>
      <h3 className="mt-2.5 text-2xl leading-[1.08] sm:text-[1.75rem]">{step.title}</h3>
      <p className="mt-3.5 max-w-[34rem] text-[1.05rem] leading-relaxed text-navy/70">{step.text}</p>
    </article>
  );
}

/** A deliverable pinned on a sky board between the steps. */
function ApproachFigure({ kind, theme, client, tilt }: { kind: DeliverableKind; theme: ClientTheme; client: string; tilt: number }) {
  return (
    <figure className="rounded-[1.75rem] bg-sky-50 px-[11%] pb-14 pt-[11%] ring-1 ring-inset ring-navy/[0.06]">
      <div
        className="aspect-[4/5] overflow-hidden rounded-[1.25rem] shadow-lift"
        style={{ rotate: `${tilt}deg` }}
      >
        <Deliverable kind={kind} theme={theme} />
      </div>
      <figcaption className="mt-9 flex items-center justify-between gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-navy/60">
        <span>{deliverableLabels[kind]}</span>
        <span>{client}</span>
      </figcaption>
    </figure>
  );
}

function Approach({ project, extra }: { project: Project; extra: DeliverableKind[] }) {
  const steps = project.approach.map((step, i) => ({ key: `step-${i}`, node: <ApproachStep step={step} number={i + 1} /> }));
  const figures = extra.map((kind, i) => ({
    key: `figure-${kind}`,
    figure: true,
    node: <ApproachFigure kind={kind} theme={project.theme} client={project.client} tilt={i % 2 ? 2 : -2} />,
  }));
  // First figure after the second step (it spans two rows next to steps 3 and 4), the rest at the end.
  const items: { key: string; node: React.ReactNode; figure?: boolean }[] = [
    ...steps.slice(0, 2),
    ...figures.slice(0, 1),
    ...steps.slice(2),
    ...figures.slice(1),
  ];

  return (
    <ul className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
      {items.map((item, i) => (
        <Reveal key={item.key} as="li" delay={(i % 2) * 0.1} className={cn(item.figure && "md:row-span-2 md:self-start")}>
          {item.node}
        </Reveal>
      ))}
    </ul>
  );
}

function Deliverables({ items }: { items: string[] }) {
  return (
    <div>
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item, i) => (
          <Reveal key={item} as="li" delay={i * 0.05} y={14}>
            <span className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white pl-2 pr-5 text-[1.02rem] font-medium text-navy ring-1 ring-inset ring-navy/15">
              <span aria-hidden className="grid size-8 place-items-center rounded-full bg-sky text-navy">
                <CheckIcon />
              </span>
              {item}
            </span>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-14 sm:mt-16" delay={0.15}>
        <ButtonLink href={t.ctaHref} size="lg">
          {t.cta}
        </ButtonLink>
      </Reveal>
    </div>
  );
}

/** Le défi, Ce qu'on a fait, Livrables: one white sheet with a label rail. */
export function CaseStory({ project, extra }: { project: Project; extra: DeliverableKind[] }) {
  return (
    <Panel tone="white">
      <Container className="flex flex-col gap-20 py-20 sm:gap-24 sm:py-28 lg:gap-32 lg:py-36">
        <Row label={t.challenge} index="01" id="cas-defi">
          <Challenge text={project.challenge} />
        </Row>
        <Row label={t.approach} index="02" id="cas-approche">
          <Approach project={project} extra={extra} />
        </Row>
        <Row label={t.deliverables} index="03" id="cas-livrables">
          <Deliverables items={project.deliverables} />
        </Row>
      </Container>
    </Panel>
  );
}
