import "server-only";
import { after } from "next/server";
import { Resend } from "resend";
import {
  confirmationEmail,
  confirmationEmailText,
  confirmationSubject,
  teamEmail,
  teamEmailSubject,
} from "./email-template";
import { briefToText, type ReadableBrief } from "./format";

/**
 * E-mail channel (Resend).
 * RESEND_API_KEY      required to enable the channel
 * BRIEF_TO_EMAIL      required, one or more addresses separated by commas
 * BRIEF_FROM_EMAIL    optional, defaults to Resend's test sender (only delivers to the Resend account owner)
 * BRIEF_SEND_CONFIRMATION="true"  also e-mails the visitor (needs a domain verified on Resend)
 */

const DEFAULT_FROM = "essor <onboarding@resend.dev>";
/** Same limit as the Sheets channel: a hanging request must not keep the visitor waiting. */
const TIMEOUT_MS = 10_000;

function recipients() {
  return (process.env.BRIEF_TO_EMAIL ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY) && recipients().length > 0;
}

export type BriefMeta = { receivedAt: Date; receivedAtLabel: string; timeZone: string; siteUrl: string; pageUrl: string };

export async function sendBriefEmail(r: ReadableBrief, meta: BriefMeta): Promise<void> {
  const to = recipients();
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || to.length === 0) throw new Error("E-mail channel is not configured");

  const resend = new Resend(apiKey);
  const from = process.env.BRIEF_FROM_EMAIL?.trim() || DEFAULT_FROM;

  const { error } = await resend.emails.send(
    {
      from,
      to,
      replyTo: r.email,
      subject: teamEmailSubject(r),
      html: teamEmail(r, { receivedAt: meta.receivedAtLabel, pageUrl: meta.pageUrl }),
      text: briefToText(r, meta.receivedAt, meta.timeZone),
      tags: [{ name: "type", value: "brief" }],
    },
    { signal: AbortSignal.timeout(TIMEOUT_MS) },
  );
  if (error) throw new Error(`Resend: ${error.name}: ${error.message}`);

  if (process.env.BRIEF_SEND_CONFIRMATION === "true") {
    // Best effort, after the visitor has their answer: a slow or failed acknowledgement
    // must neither delay the response nor turn a received brief into an error.
    after(async () => {
      try {
        const ack = await resend.emails.send(
          {
            from,
            to: r.email,
            replyTo: to[0],
            subject: confirmationSubject,
            html: confirmationEmail(r, { siteUrl: meta.siteUrl }),
            text: confirmationEmailText(r, { siteUrl: meta.siteUrl }),
            tags: [{ name: "type", value: "brief-confirmation" }],
          },
          { signal: AbortSignal.timeout(TIMEOUT_MS) },
        );
        if (ack.error) console.error(`[brief] Confirmation e-mail not sent: ${ack.error.name}: ${ack.error.message}`);
      } catch (err) {
        console.error("[brief] Confirmation e-mail not sent:", err instanceof Error ? `${err.name}: ${err.message}` : err);
      }
    });
  }
}
