import { budgetValues, needValues, sectorValues, sourceValues, timelineValues } from "@/lib/brief/options";
import type { BriefInput } from "@/lib/brief/schema";

/**
 * The unsent brief, kept in this browser's localStorage so a visitor who leaves
 * the page finds their answers again. Every access is wrapped: storage can be
 * full, disabled or blocked (private mode, strict cookie settings).
 */

const KEY = "essor:brief-draft:v1";
const EVENT = "essor:brief-draft";

/** Fields worth keeping. Consent and the anti-spam fields are always asked again. */
type DraftValues = Partial<Omit<BriefInput, "consent" | "website" | "startedAt">>;

const textFields = ["name", "company", "city", "description", "email", "phone"] as const;

function pick<T extends string>(allowed: readonly T[], value: unknown): T | undefined {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

/** Keeps only well-formed values, so an old or edited draft can never break the form. */
function sanitize(raw: unknown): DraftValues {
  if (!raw || typeof raw !== "object") return {};
  const r = raw as Record<string, unknown>;
  const out: DraftValues = {};
  for (const key of textFields) {
    const v = r[key];
    if (typeof v === "string") out[key] = v.slice(0, 3000);
  }
  out.sector = pick(sectorValues, r.sector);
  out.budget = pick(budgetValues, r.budget);
  out.timeline = pick(timelineValues, r.timeline);
  out.source = pick(sourceValues, r.source) ?? null;
  if (Array.isArray(r.needs)) {
    out.needs = r.needs.map((n) => pick(needValues, n)).filter((n): n is NonNullable<typeof n> => Boolean(n));
  }
  return out;
}

export function readDraft(): DraftValues | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function hasContent(values: Partial<BriefInput>) {
  return (
    textFields.some((k) => typeof values[k] === "string" && values[k].trim() !== "") ||
    Boolean(values.sector || values.budget || values.timeline || values.source) ||
    (Array.isArray(values.needs) && values.needs.length > 0)
  );
}

export function writeDraft(values: Partial<BriefInput>) {
  try {
    if (hasContent(values)) window.localStorage.setItem(KEY, JSON.stringify(sanitize(values)));
    else window.localStorage.removeItem(KEY);
  } catch {
    // Storage unavailable: the form still works, the draft is just not kept.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** For useSyncExternalStore: is a draft currently saved on this device? */
export function subscribeDraft(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function hasDraftSnapshot(): boolean {
  try {
    return window.localStorage.getItem(KEY) !== null;
  } catch {
    return false;
  }
}
