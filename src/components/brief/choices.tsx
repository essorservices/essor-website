"use client";

import Link from "next/link";
import { ArrowUpRightIcon, CheckIcon, ServiceIcon } from "@/components/ui/icons";
import { briefCopy } from "@/content/brief";
import { serviceByKey, type ServiceKey } from "@/content/services";
import { cn } from "@/lib/cn";
import type { BriefOption } from "@/lib/brief/options";
import { needOptions } from "@/lib/brief/options";
import type { BriefField } from "@/lib/brief/schema";
import { formCopy } from "./copy";
import { FieldError, FieldHint, LabelText } from "./fields";
import { describedBy, useBriefField } from "./use-brief-field";

/**
 * Selection controls are real radio / checkbox inputs (keyboard and screen readers
 * get native behaviour); the visible pill reacts to `:checked` through `has-[]`.
 * Radios show a round mark, checkboxes a square one, so single and multiple choice
 * read differently at a glance.
 */

const focusRing =
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-coral has-[:focus-visible]:outline-solid";

/**
 * Forced colours (Windows High Contrast) drop rings and backgrounds: draw a real border,
 * and mark the checked choice with a thick outline so it still reads once focus has left.
 */
const forcedEdge = "forced-colors:border forced-colors:border-[color:CanvasText]";
const forcedChecked = "forced-colors:has-[:checked]:outline-[3px] forced-colors:has-[:checked]:outline-solid";

function Mark({ shape, className }: { shape: "round" | "square"; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-5 shrink-0 place-items-center ring-[1.5px] ring-inset ring-navy/25 transition-[background-color,box-shadow] duration-300",
        forcedEdge,
        "group-has-[:checked]/choice:bg-coral group-has-[:checked]/choice:ring-coral",
        shape === "round" ? "rounded-full" : "rounded-[6px]",
        className,
      )}
    >
      <CheckIcon className="size-3 scale-50 text-navy opacity-0 transition-[opacity,scale] duration-300 ease-[var(--ease-out-back)] group-has-[:checked]/choice:scale-100 group-has-[:checked]/choice:opacity-100 forced-colors:text-[color:CanvasText] [&_path]:stroke-[3]" />
    </span>
  );
}

export function ChoiceGroup({
  name,
  legend,
  options,
  multiple = false,
  optional = false,
  hint,
}: {
  name: BriefField;
  legend: string;
  options: readonly BriefOption[];
  multiple?: boolean;
  optional?: boolean;
  hint?: string;
}) {
  const f = useBriefField(name);
  const legendId = `${f.id}-legend`;
  const invalid = Boolean(f.message);
  return (
    <fieldset
      role={multiple ? undefined : "radiogroup"}
      aria-labelledby={legendId}
      aria-describedby={describedBy(hint && f.hintId, f.message && f.errorId)}
      aria-required={optional ? undefined : true}
      aria-invalid={!multiple && invalid ? true : undefined}
    >
      <legend id={legendId} className="mb-3 text-[0.98rem] font-semibold tracking-[-0.005em] text-navy">
        <LabelText optional={optional}>{legend}</LabelText>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "group/choice relative inline-flex min-h-12 cursor-pointer select-none items-center gap-2.5 rounded-full py-2 pl-3 pr-4.5",
              "bg-white text-[0.98rem] font-medium leading-tight text-navy ring-1 ring-inset ring-navy/15",
              "transition-[background-color,color,box-shadow,scale] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97]",
              "hover:ring-navy/40 has-[:checked]:bg-navy has-[:checked]:text-white has-[:checked]:ring-navy",
              invalid && "ring-coral/60",
              focusRing,
              forcedEdge,
              forcedChecked,
            )}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              value={o.value}
              aria-invalid={multiple && invalid ? true : undefined}
              aria-describedby={describedBy(f.message && f.errorId)}
              className="peer sr-only"
              {...f.registration}
            />
            <Mark shape={multiple ? "square" : "round"} className="group-has-[:checked]/choice:ring-coral" />
            <span className="tabular">{o.label}</span>
          </label>
        ))}
      </div>
      {hint ? <FieldHint id={f.hintId}>{hint}</FieldHint> : null}
      <FieldError id={f.errorId} message={f.message} />
    </fieldset>
  );
}

const serviceKeys = new Set<string>(["branding", "strategie", "contenu", "web", "automatisation"] satisfies ServiceKey[]);

/** The five services as large tiles (icon + what it covers), plus a dashed "advise me" tile. */
export function NeedTiles({ labelledBy }: { labelledBy: string }) {
  const f = useBriefField("needs");
  const invalid = Boolean(f.message);
  return (
    <fieldset aria-labelledby={labelledBy} aria-describedby={describedBy(f.hintId, f.message && f.errorId)}>
      <FieldHint id={f.hintId}>{formCopy.fields.needs.hint}</FieldHint>
      {/* Above the tiles: below them, it would land far off screen on phones */}
      <FieldError id={f.errorId} message={f.message} />
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {needOptions.map((o) => {
          const service = serviceKeys.has(o.value) ? serviceByKey[o.value as ServiceKey] : null;
          const covers = service ? service.deliverables.slice(0, 3).join(" · ") : formCopy.adviceHint;
          return (
            <label
              key={o.value}
              className={cn(
                "group/choice relative flex cursor-pointer select-none items-start gap-3.5 rounded-[1.25rem] p-4 pr-12",
                "text-navy transition-[background-color,color,box-shadow,border-color,scale] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.985]",
                "has-[:checked]:bg-navy has-[:checked]:text-white",
                service
                  ? "bg-white ring-1 ring-inset ring-navy/15 hover:ring-navy/40 has-[:checked]:ring-navy"
                  : "border-[1.5px] border-dashed border-navy/30 hover:border-navy/55 has-[:checked]:border-navy",
                invalid && (service ? "ring-coral/60" : "border-coral/70"),
                focusRing,
                forcedEdge,
                forcedChecked,
              )}
            >
              <input
                type="checkbox"
                value={o.value}
                aria-invalid={invalid ? true : undefined}
                aria-describedby={describedBy(`${f.id}-${o.value}-covers`, f.message && f.errorId)}
                className="peer sr-only"
                {...f.registration}
              />
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-full bg-sky text-navy transition-colors duration-300 group-has-[:checked]/choice:bg-coral"
              >
                {service ? (
                  <ServiceIcon service={service.key} className="size-[1.35rem]" />
                ) : (
                  <span className="font-display text-[1.3rem] font-semibold leading-none">?</span>
                )}
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="block text-[1.02rem] font-semibold leading-tight tracking-[-0.01em]">{o.label}</span>
                <span
                  id={`${f.id}-${o.value}-covers`}
                  className="mt-1.5 block text-[0.88rem] leading-snug text-navy/60 transition-colors duration-300 group-has-[:checked]/choice:text-sky/75"
                >
                  {covers}
                </span>
              </span>
              <Mark shape="square" className="absolute right-4 top-4 group-has-[:checked]/choice:ring-coral" />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ConsentField() {
  const f = useBriefField("consent");
  return (
    <div>
      <div className="group/choice flex items-start gap-3.5">
        <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
          <input
            id={f.id}
            type="checkbox"
            aria-required
            aria-invalid={f.message ? true : undefined}
            aria-describedby={describedBy(f.message && f.errorId)}
            className={cn(
              "peer size-6 cursor-pointer appearance-none rounded-[7px] bg-white ring-[1.5px] ring-inset ring-navy/50",
              "transition-[background-color,box-shadow] duration-300 checked:bg-navy checked:ring-navy hover:ring-navy/70",
              "focus-visible:rounded-[7px] aria-[invalid=true]:ring-coral",
              forcedEdge,
            )}
            {...f.registration}
          />
          <CheckIcon className="pointer-events-none absolute size-3.5 scale-50 text-coral opacity-0 transition-[opacity,scale] duration-300 ease-[var(--ease-out-back)] peer-checked:scale-100 peer-checked:opacity-100 forced-colors:text-[color:CanvasText] [&_path]:stroke-[3]" />
        </span>
        <div className="min-w-0">
          <label htmlFor={f.id} className="block cursor-pointer text-[0.95rem] leading-relaxed text-navy/75">
            {briefCopy.consent}
          </label>
          {/* New tab: coming back to the form would otherwise untick the consent box */}
          <Link
            href="/mentions-legales#donnees-personnelles"
            target="_blank"
            rel="noopener"
            className="mt-1 inline-block text-[0.9rem] font-medium text-navy underline decoration-navy/25 underline-offset-[0.2em] transition-colors hover:decoration-coral"
          >
            {formCopy.legalLink}
            <ArrowUpRightIcon className="ml-1 inline-block size-3 align-[-0.05em] opacity-70" />
            <span className="sr-only"> {formCopy.newTab}</span>
          </Link>
        </div>
      </div>
      <FieldError id={f.errorId} message={f.message} />
    </div>
  );
}
