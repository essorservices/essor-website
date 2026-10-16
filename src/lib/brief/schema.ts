import { z } from "zod";
import { briefSteps } from "@/content/brief";
import { budgetValues, needValues, sectorValues, sourceValues, timelineValues } from "./options";

/**
 * The project brief, validated with the same schema in the browser (react-hook-form)
 * and in the Server Action. Messages are shown to visitors, in French.
 */

export const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 3000;

/** Loose international pattern: optional +, then digits, spaces, dots, dashes, slashes or brackets. */
const PHONE_PATTERN = /^\+?[\d\s().\-/]{6,24}$/;

function isPhone(value: string) {
  if (value === "") return true;
  const digits = value.replace(/\D/g, "").length;
  return PHONE_PATTERN.test(value) && digits >= 6 && digits <= 15;
}

/**
 * Single-line fields end up in the e-mail subject, its text body and a sheet row. A browser
 * never sends line breaks or control characters from <input>, only a forged request does:
 * they become spaces, so nobody can add lines or headers.
 */
const CONTROL_CHARS = /[\p{Cc}\p{Zl}\p{Zp}]+/gu;
const oneLine = (value: string) => value.replace(CONTROL_CHARS, " ");

const requiredText = (empty: string, max: number) =>
  z
    .string({ error: empty })
    .transform(oneLine)
    .pipe(
      z
        .string()
        .trim()
        .min(1, empty)
        .min(2, "Un peu court\u00A0: 2 caractères minimum")
        .max(max, `${max.toLocaleString("fr-FR")} caractères maximum`),
    );

const optionalText = (max: number) =>
  z
    .string()
    .transform(oneLine)
    .pipe(z.string().trim().max(max, `${max.toLocaleString("fr-FR")} caractères maximum`))
    .optional();

export const briefSchema = z.object({
  // Step 1: vous
  name: requiredText("Indiquez votre nom", 80),
  company: requiredText("Indiquez le nom de votre entreprise", 120),
  sector: z.enum(sectorValues, { error: "Choisissez votre secteur d’activité" }),
  city: optionalText(80),

  // Step 2: besoins
  needs: z
    .array(z.enum(needValues), { error: "Choisissez au moins un besoin" })
    .min(1, "Choisissez au moins un besoin")
    .max(needValues.length, "Trop de besoins sélectionnés")
    .transform((needs) => [...new Set(needs)]),

  // Step 3: cadre
  budget: z.enum(budgetValues, { error: "Choisissez une fourchette de budget" }),
  timeline: z.enum(timelineValues, { error: "Choisissez un délai" }),

  // Step 4: projet
  description: z
    .string({ error: "Décrivez votre projet en quelques phrases" })
    .trim()
    .min(DESCRIPTION_MIN, `Dites-nous-en un peu plus (${DESCRIPTION_MIN} caractères minimum)`)
    .max(DESCRIPTION_MAX, `${DESCRIPTION_MAX.toLocaleString("fr-FR")} caractères maximum`),
  email: z
    .string({ error: "Indiquez votre adresse e-mail" })
    .trim()
    .min(1, "Indiquez votre adresse e-mail")
    .max(254, "Cette adresse e-mail est trop longue")
    .pipe(z.email({ error: "Cette adresse e-mail ne semble pas valide" })),
  phone: z
    .string()
    .transform(oneLine)
    .pipe(z.string().trim().max(30, "Ce numéro ne semble pas valide").refine(isPhone, "Ce numéro ne semble pas valide"))
    .optional(),
  source: z.enum(sourceValues).nullish(),
  consent: z
    .boolean({ error: "Cochez cette case pour envoyer votre brief" })
    .refine((v) => v, "Cochez cette case pour envoyer votre brief"),

  // Anti-spam: a hidden field humans never fill, and when the form was opened (epoch ms)
  website: z.string().max(0).optional(),
  startedAt: z.number().int().nonnegative(),
});

/** What the form holds (before trimming). */
export type BriefInput = z.input<typeof briefSchema>;
/** A validated brief. */
export type Brief = z.output<typeof briefSchema>;
export type BriefField = keyof BriefInput;

export type BriefStepKey = (typeof briefSteps)[number]["key"];

/** Fields validated by each step's "Continuer" button, in display order. */
export const briefStepFields = {
  vous: ["name", "company", "sector", "city"],
  besoins: ["needs"],
  cadre: ["budget", "timeline"],
  projet: ["description", "email", "phone", "source", "consent"],
} as const satisfies Record<BriefStepKey, readonly BriefField[]>;

/** Fields of the step at `index` (0-based, in `briefSteps` order). */
export function fieldsOfStep(index: number): readonly BriefField[] {
  const step = briefSteps[index];
  return step ? briefStepFields[step.key] : [];
}

/** Index of the step that holds `field`, or -1 for the hidden anti-spam fields. */
export function stepOfField(field: string): number {
  return briefSteps.findIndex((s) => (briefStepFields[s.key] as readonly string[]).includes(field));
}
