"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { briefCopy } from "@/content/brief";
import { deliverBrief } from "@/lib/brief/deliver";
import { allowBrief, clientIp } from "@/lib/brief/rate-limit";
import { briefSchema } from "@/lib/brief/schema";
import type { SubmitBriefResult } from "@/lib/brief/types";

/** Below this, the form was filled by a script (four steps cannot be done by hand that fast). */
const MIN_FILL_MS = 3000;

/**
 * Receives the project brief from the /contact form.
 * Anyone can POST to a Server Action, so everything is re-validated here.
 */
export async function submitBrief(input: unknown): Promise<SubmitBriefResult> {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Le formulaire est incomplet. Rechargez la page et réessayez." };
  }

  // Honeypot: humans never see this field. Bots get a success answer and nothing is sent.
  const honeypot = (input as { website?: unknown }).website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.info("[brief] Honeypot filled: submission ignored.");
    return { ok: true };
  }

  const parsed = briefSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const [field, messages] of Object.entries(z.flattenError(parsed.error).fieldErrors)) {
      const first = (messages as string[] | undefined)?.[0];
      if (first) fieldErrors[field] = first;
    }
    return { ok: false, error: "Certaines informations sont à compléter.", fieldErrors };
  }
  const brief = parsed.data;

  // Time trap. A negative value means the visitor's clock is ahead of ours: let it through
  // rather than block a real person (a script can forge this field anyway).
  const elapsed = Date.now() - brief.startedAt;
  if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
    console.info(`[brief] Submitted ${elapsed} ms after opening: rejected as too fast.`);
    return { ok: false, error: "Envoi trop rapide. Patientez quelques secondes, puis réessayez." };
  }

  // Best effort only: memory is not shared between serverless instances (see rate-limit.ts).
  const ip = clientIp(await headers());
  if (!allowBrief(ip)) {
    console.warn("[brief] Rate limit reached for one client: submission refused.");
    return {
      ok: false,
      error: "Vous avez envoyé plusieurs briefs en peu de temps. Réessayez dans quelques minutes.",
    };
  }

  try {
    const outcome = await deliverBrief(brief);
    if (outcome.status === "failed") return { ok: false, error: briefCopy.errorText };
    return { ok: true };
  } catch (err) {
    console.error("[brief] Unexpected error:", err instanceof Error ? err.message : err);
    return { ok: false, error: briefCopy.errorText };
  }
}
