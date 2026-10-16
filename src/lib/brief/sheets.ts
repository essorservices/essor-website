import "server-only";
import type { BriefSheetRow } from "./format";

/**
 * Google Sheets channel: POSTs the row to a Google Apps Script web app
 * (integrations/google-apps-script.gs) that appends it to the "Briefs" sheet.
 * GOOGLE_SHEETS_WEBHOOK_URL  the web app URL, ending in /exec
 * GOOGLE_SHEETS_SECRET       the same value as the script property SECRET
 */

const TIMEOUT_MS = 10_000;

export function isSheetsConfigured() {
  return Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL) && Boolean(process.env.GOOGLE_SHEETS_SECRET);
}

export async function appendBriefToSheet(row: BriefSheetRow): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;
  if (!url || !secret) throw new Error("Sheets channel is not configured");

  // Apps Script answers a POST with a 302 to script.googleusercontent.com, which serves the result.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, ...row }),
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  const body = await res.text();
  const type = res.headers.get("content-type") ?? "";

  // A Google sign-in page means the deployment is not shared with "Anyone".
  if (type.includes("text/html")) {
    throw new Error(`Sheets: HTML response (HTTP ${res.status}). Check that the web app is deployed with access "Anyone".`);
  }

  let json: unknown = null;
  try {
    json = JSON.parse(body);
  } catch {
    // Not JSON: fall back to the HTTP status below.
  }

  if (json && typeof json === "object" && "ok" in json) {
    if ((json as { ok: unknown }).ok === true) return;
    const reason = "error" in json ? String((json as { error: unknown }).error) : "unknown error";
    throw new Error(`Sheets: script answered ok:false (${reason})`);
  }
  if (res.ok) return;
  throw new Error(`Sheets: HTTP ${res.status}`);
}
