import {
  budgetOptions,
  labelOf,
  needOptions,
  sectorOptions,
  sourceOptions,
  timelineOptions,
} from "./options";
import type { Brief } from "./schema";

/** A brief with every choice turned into its French label, ready to show to the team. */
export type ReadableBrief = {
  name: string;
  company: string;
  sector: string;
  city: string;
  needs: string[];
  budget: string;
  timeline: string;
  description: string;
  email: string;
  phone: string;
  source: string;
};

export function readable(brief: Brief): ReadableBrief {
  return {
    name: brief.name,
    company: brief.company,
    sector: labelOf(sectorOptions, brief.sector),
    city: brief.city ?? "",
    needs: brief.needs.map((n) => labelOf(needOptions, n)),
    budget: labelOf(budgetOptions, brief.budget),
    timeline: labelOf(timelineOptions, brief.timeline),
    description: brief.description,
    email: brief.email,
    phone: brief.phone ?? "",
    source: labelOf(sourceOptions, brief.source),
  };
}

/** French labels, in the order used by the e-mail, the console log and the Google Sheet. */
export const briefLabels: Record<keyof ReadableBrief, string> = {
  name: "Nom",
  company: "Entreprise",
  sector: "Secteur",
  city: "Ville",
  needs: "Besoins",
  budget: "Budget",
  timeline: "Délai",
  description: "Description",
  email: "E-mail",
  phone: "Téléphone",
  source: "Source",
};

/** "Prénom Nom" → "Prénom", for friendly greetings. */
export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function briefSubject(r: ReadableBrief) {
  return `Nouveau brief\u00A0: ${r.company} (${r.sector})`;
}

/** "jeudi 15 octobre 2026 à 14:32", in the given IANA time zone. */
export function formatReceivedAt(receivedAt: Date, timeZone: string) {
  try {
    return receivedAt.toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone });
  } catch {
    // Unknown time zone name in BRIEF_TIMEZONE: fall back to UTC rather than failing the brief.
    return `${receivedAt.toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "UTC" })} UTC`;
  }
}

/** Plain-text version of the brief (e-mail fallback and development log). */
export function briefToText(r: ReadableBrief, receivedAt: Date, timeZone: string): string {
  const when = formatReceivedAt(receivedAt, timeZone);
  const line = (key: keyof ReadableBrief, value: string) => `${briefLabels[key]}\u00A0: ${value || "—"}`;
  return [
    briefSubject(r),
    `Reçu le ${when}`,
    "",
    line("name", r.name),
    line("company", r.company),
    line("sector", r.sector),
    line("city", r.city),
    "",
    `${briefLabels.needs}\u00A0:`,
    ...r.needs.map((n) => `  • ${n}`),
    "",
    line("budget", r.budget),
    line("timeline", r.timeline),
    "",
    `${briefLabels.description}\u00A0:`,
    r.description,
    "",
    line("email", r.email),
    line("phone", r.phone),
    line("source", r.source),
  ].join("\n");
}

/** The row sent to the Google Apps Script web app (one key per sheet column). */
export function briefToSheetRow(r: ReadableBrief, receivedAt: Date) {
  return {
    date: receivedAt.toISOString(),
    name: r.name,
    company: r.company,
    sector: r.sector,
    city: r.city,
    needs: r.needs.join(", "),
    budget: r.budget,
    timeline: r.timeline,
    description: r.description,
    email: r.email,
    phone: r.phone,
    source: r.source,
  };
}

export type BriefSheetRow = ReturnType<typeof briefToSheetRow>;
