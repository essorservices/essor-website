import "server-only";
import { site } from "@/content/site";
import { isEmailConfigured, sendBriefEmail } from "./email";
import { briefToSheetRow, briefToText, formatReceivedAt, readable } from "./format";
import type { Brief } from "./schema";
import { appendBriefToSheet, isSheetsConfigured } from "./sheets";

export type DeliveryOutcome =
  /** At least one channel accepted the brief. */
  | { status: "delivered"; channels: string[] }
  /** No channel configured, development only: the brief was printed to the server console. */
  | { status: "logged" }
  /** Nothing configured in production, or every configured channel failed. */
  | { status: "failed" };

/**
 * Sends a validated brief by e-mail (Resend) and to the Google Sheet, in parallel.
 * Succeeds when at least one configured channel succeeds. Errors are logged on the
 * server with their reason; secrets and stack traces never leave this module.
 */
export async function deliverBrief(brief: Brief): Promise<DeliveryOutcome> {
  const receivedAt = new Date();
  const timeZone = process.env.BRIEF_TIMEZONE?.trim() || "Europe/Paris";
  const r = readable(brief);
  const meta = {
    receivedAt,
    timeZone,
    receivedAtLabel: formatReceivedAt(receivedAt, timeZone),
    siteUrl: site.url,
    pageUrl: new URL("/contact", site.url).toString(),
  };

  const channels: { name: string; run: () => Promise<void> }[] = [];
  if (isEmailConfigured()) channels.push({ name: "email", run: () => sendBriefEmail(r, meta) });
  if (isSheetsConfigured()) channels.push({ name: "sheets", run: () => appendBriefToSheet(briefToSheetRow(r, receivedAt)) });

  if (channels.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[brief] No delivery channel configured (RESEND_API_KEY + BRIEF_TO_EMAIL, or GOOGLE_SHEETS_WEBHOOK_URL + GOOGLE_SHEETS_SECRET). " +
          "Development mode: the brief is printed below instead. See docs/FORMULAIRE.md.",
      );
      console.log(`\n──────── brief ────────\n${briefToText(r, receivedAt, timeZone)}\n───────────────────────\n`);
      return { status: "logged" };
    }
    console.error("[brief] No delivery channel configured in production: the brief was NOT delivered. See docs/FORMULAIRE.md.");
    return { status: "failed" };
  }

  const results = await Promise.allSettled(channels.map((c) => c.run()));
  const delivered: string[] = [];
  results.forEach((result, i) => {
    const name = channels[i].name;
    if (result.status === "fulfilled") delivered.push(name);
    else {
      const reason = result.reason instanceof Error ? `${result.reason.name}: ${result.reason.message}` : result.reason;
      console.error(`[brief] Channel "${name}" failed:`, reason);
    }
  });

  if (delivered.length === 0) {
    // Keep the content in the logs so a brief is never lost when every channel is down.
    console.error(`[brief] Every channel failed. Brief content:\n${briefToText(r, receivedAt, timeZone)}`);
    return { status: "failed" };
  }
  return { status: "delivered", channels: delivered };
}
