"use client";

import { useEffect, useRef } from "react";
import { briefSteps, budgetOptions, sectorOptions, sourceOptions, timelineOptions } from "@/content/brief";
import { ChoiceGroup, ConsentField, NeedTiles } from "./choices";
import { formCopy } from "./copy";
import { DescriptionField, TextField } from "./fields";

const total = briefSteps.length;

/**
 * Keeps hyphenated words ("avez-vous", "êtes-vous") on one line in big titles. Spaces stay
 * in the text around them: a space alone in its text node is dropped from the accessible name.
 */
function keepHyphenated(text: string) {
  return text
    .split(/(\S+-\S+)/)
    .map((part, i) => (i % 2 ? <span key={i} className="whitespace-nowrap">{part}</span> : part))
    .filter((part) => part !== "");
}

/**
 * The step's title. It takes focus when the visitor arrives on the step (not on page
 * load), so keyboard and screen-reader users start reading at the right place.
 */
function StepHeading({ index, focusOnMount, onFocused }: { index: number; focusOnMount: boolean; onFocused: (el: HTMLElement) => void }) {
  const ref = useRef<HTMLHeadingElement>(null);
  // Only on arrival: later re-renders of the same step must not steal focus again.
  const focused = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (focused.current || !focusOnMount || !el) return;
    focused.current = true;
    el.focus({ preventScroll: true });
    onFocused(el);
  }, [focusOnMount, onFocused]);
  return (
    <div>
      <p className="tabular font-mono text-[0.75rem] uppercase tracking-[0.14em] text-navy/60">
        {formCopy.stepOf(index + 1, total)}
      </p>
      <h2
        ref={ref}
        id={`brief-step-${briefSteps[index].key}`}
        tabIndex={-1}
        className="mt-3 text-[clamp(1.85rem,3.2vw,2.6rem)] leading-[1.02] text-navy focus:outline-none"
      >
        {keepHyphenated(briefSteps[index].title)}
      </h2>
    </div>
  );
}

type StepProps = { focusOnMount: boolean; onFocused: (el: HTMLElement) => void };

function StepVous(props: StepProps) {
  const f = formCopy.fields;
  return (
    <div className="space-y-8">
      <StepHeading index={0} {...props} />
      <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
        <TextField name="name" label={f.name.label} autoComplete="name" />
        <TextField name="company" label={f.company.label} autoComplete="organization" />
      </div>
      <ChoiceGroup name="sector" legend={f.sector.label} options={sectorOptions} />
      <TextField name="city" label={f.city.label} autoComplete="address-level2" optional className="sm:max-w-[calc(50%-0.5rem)]" />
    </div>
  );
}

function StepBesoins(props: StepProps) {
  return (
    <div className="space-y-2">
      <StepHeading index={1} {...props} />
      <NeedTiles labelledBy="brief-step-besoins" />
    </div>
  );
}

function StepCadre(props: StepProps) {
  const f = formCopy.fields;
  return (
    <div className="space-y-8">
      <StepHeading index={2} {...props} />
      <ChoiceGroup name="budget" legend={f.budget.label} options={budgetOptions} hint={f.budget.hint} />
      <ChoiceGroup name="timeline" legend={f.timeline.label} options={timelineOptions} />
    </div>
  );
}

function StepProjet(props: StepProps) {
  const f = formCopy.fields;
  return (
    <div className="space-y-8">
      <StepHeading index={3} {...props} />
      <DescriptionField />
      <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
        <TextField
          name="email"
          type="email"
          label={f.email.label}
          autoComplete="email"
          inputMode="email"
          placeholder={f.email.placeholder}
          enterKeyHint="send"
        />
        <TextField
          name="phone"
          type="tel"
          label={f.phone.label}
          autoComplete="tel"
          inputMode="tel"
          hint={f.phone.hint}
          optional
          enterKeyHint="send"
        />
      </div>
      <ChoiceGroup name="source" legend={f.source.label} options={sourceOptions} optional />
      <ConsentField />
    </div>
  );
}

export const steps = [StepVous, StepBesoins, StepCadre, StepProjet] as const;
