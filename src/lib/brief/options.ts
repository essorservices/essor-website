import {
  budgetOptions,
  needOptions,
  sectorOptions,
  sourceOptions,
  timelineOptions,
} from "@/content/brief";

/** A choice offered by the brief form: `value` is stored, `label` is shown. */
export type BriefOption = { readonly value: string; readonly label: string };

/** The `value`s of a const option list, keeping their literal types (for `z.enum`). */
function valuesOf<const T extends readonly BriefOption[]>(options: T) {
  return options.map((o) => o.value) as { -readonly [K in keyof T]: T[K]["value"] };
}

export const sectorValues = valuesOf(sectorOptions);
export const needValues = valuesOf(needOptions);
export const budgetValues = valuesOf(budgetOptions);
export const timelineValues = valuesOf(timelineOptions);
export const sourceValues = valuesOf(sourceOptions);

export type Sector = (typeof sectorValues)[number];
export type Need = (typeof needValues)[number];
export type Budget = (typeof budgetValues)[number];
export type Timeline = (typeof timelineValues)[number];
export type Source = (typeof sourceValues)[number];

/** Human-readable label of a stored value (falls back to the value itself). */
export function labelOf(options: readonly BriefOption[], value: string | null | undefined): string {
  if (!value) return "";
  return options.find((o) => o.value === value)?.label ?? value;
}

export { budgetOptions, needOptions, sectorOptions, sourceOptions, timelineOptions };
