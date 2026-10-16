import "server-only";
import { briefLabels, briefSubject, firstName, type ReadableBrief } from "./format";

/**
 * E-mail markup for the brief. Table layout and inline styles only, because e-mail
 * clients ignore most CSS. Every value typed by the visitor goes through `esc()`.
 */

const navy = "#0F1045";
const coral = "#FF5C5C";
const sky = "#E3ECFF";
const sky50 = "#F4F7FF";
const muted = "#5B5C82"; // navy at ~65% on white, passes AA for body text
const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes and keeps the visitor's line breaks. */
function paragraphs(value: string) {
  return esc(value).replace(/\r?\n/g, "<br>");
}

function label(text: string) {
  return `<p style="margin:0 0 6px;font-family:${mono};font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${muted};">${esc(text)}</p>`;
}

function row(name: string, valueHtml: string) {
  return `<tr>
  <td style="padding:14px 0;border-top:1px solid #E6E8F2;width:132px;vertical-align:top;font-family:${mono};font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${muted};">${esc(name)}</td>
  <td style="padding:14px 0;border-top:1px solid #E6E8F2;vertical-align:top;font-family:${font};font-size:15px;line-height:1.5;color:${navy};">${valueHtml}</td>
</tr>`;
}

const dash = `<span style="color:${muted};">—</span>`;

function link(href: string, text: string) {
  return `<a href="${esc(href)}" style="color:${navy};text-decoration:underline;text-decoration-color:${coral};text-underline-offset:3px;">${esc(text)}</a>`;
}

function wordmark(color: string) {
  return `<span style="font-family:${font};font-size:22px;font-weight:700;letter-spacing:-0.6px;color:${color};">essor</span><span style="display:inline-block;width:8px;height:8px;margin-left:3px;border-radius:8px;background:${coral};vertical-align:top;margin-top:4px;"></span>`;
}

function layout({ preheader, body, footer }: { preheader: string; body: string; footer: string }) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>essor</title>
</head>
<body style="margin:0;padding:0;background:${sky};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${sky};">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${sky};">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
${body}
<tr><td style="padding:20px 8px 0;font-family:${font};font-size:12px;line-height:1.6;color:${muted};text-align:center;">${footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** The e-mail the essor team receives for every brief. */
export function teamEmail(r: ReadableBrief, meta: { receivedAt: string; pageUrl: string }) {
  const replySubject = encodeURIComponent(`Votre projet avec essor (${r.company})`);
  const mailto = `mailto:${r.email}?subject=${replySubject}`;
  const tel = r.phone ? `tel:${r.phone.replace(/[^\d+]/g, "")}` : "";

  const needs = r.needs
    .map(
      (n) => `<tr>
  <td style="width:18px;padding:5px 0;vertical-align:top;"><span style="display:inline-block;width:8px;height:8px;margin-top:6px;border-radius:8px;background:${coral};"></span></td>
  <td style="padding:5px 0;font-family:${font};font-size:16px;line-height:1.4;color:#FFFFFF;">${esc(n)}</td>
</tr>`,
    )
    .join("");

  const body = `<tr><td style="background:${navy};border-radius:24px 24px 0 0;padding:28px 32px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td>${wordmark("#FFFFFF")}</td>
    <td align="right" style="font-family:${mono};font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${sky};">Nouveau brief</td>
  </tr></table>
</td></tr>
<tr><td style="background:${navy};padding:36px 32px 32px;">
  <p style="margin:0 0 10px;font-family:${mono};font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${coral};">${esc(r.sector)}${r.city ? ` · ${esc(r.city)}` : ""}</p>
  <h1 style="margin:0;font-family:${font};font-size:32px;line-height:1.1;font-weight:700;letter-spacing:-0.8px;color:#FFFFFF;">${esc(r.company)}</h1>
  <p style="margin:10px 0 0;font-family:${font};font-size:15px;line-height:1.5;color:#C9D3F0;">Brief envoyé par ${esc(r.name)}</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">${needs}</table>
</td></tr>
<tr><td style="background:#FFFFFF;border-radius:0 0 24px 24px;padding:28px 32px 32px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${row(briefLabels.budget, esc(r.budget))}
    ${row(briefLabels.timeline, esc(r.timeline))}
    ${row(briefLabels.name, esc(r.name))}
    ${row(briefLabels.email, link(mailto, r.email))}
    ${row(briefLabels.phone, r.phone ? link(tel, r.phone) : dash)}
    ${row(briefLabels.source, r.source ? esc(r.source) : dash)}
  </table>
  <div style="margin-top:20px;">
    ${label(briefLabels.description)}
    <div style="padding:18px 20px;border-radius:16px;background:${sky50};font-family:${font};font-size:15px;line-height:1.6;color:${navy};">${paragraphs(r.description)}</div>
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr>
    <td style="border-radius:999px;background:${coral};">
      <a href="${esc(mailto)}" style="display:inline-block;padding:14px 24px;font-family:${font};font-size:15px;font-weight:700;color:${navy};text-decoration:none;">Répondre à ${esc(firstName(r.name))} →</a>
    </td>
  </tr></table>
</td></tr>`;

  return layout({
    preheader: `${r.name} · ${r.needs.join(", ")} · ${r.budget}`,
    body,
    footer: `Reçu le ${esc(meta.receivedAt)} via ${link(meta.pageUrl, meta.pageUrl.replace(/^https?:\/\//, ""))}.<br>Répondez directement à cet e-mail pour écrire à ${esc(firstName(r.name))}.`,
  });
}

export function teamEmailSubject(r: ReadableBrief) {
  return briefSubject(r);
}

/**
 * Optional acknowledgement sent to the visitor (needs a verified sending domain on Resend).
 * Anyone can submit any address, so it carries no text typed by the visitor: only the
 * needs, which come from a fixed list. Otherwise the form could relay spam from our domain.
 */
export function confirmationEmail(r: ReadableBrief, meta: { siteUrl: string }) {
  const needs = r.needs.map((n) => `<li style="margin:0 0 4px;">${esc(n)}</li>`).join("");
  const body = `<tr><td style="background:#FFFFFF;border-radius:24px;padding:32px;">
  <p style="margin:0 0 28px;">${wordmark(navy)}</p>
  <h1 style="margin:0;font-family:${font};font-size:28px;line-height:1.15;font-weight:700;letter-spacing:-0.6px;color:${navy};">Merci, votre brief est bien arrivé.</h1>
  <p style="margin:16px 0 0;font-family:${font};font-size:16px;line-height:1.6;color:${navy};">On lit tout attentivement et on revient vers vous très vite pour en parler.</p>
  <div style="margin-top:24px;padding:18px 20px;border-radius:16px;background:${sky50};">
    ${label("Votre demande")}
    <ul style="margin:0;padding-left:18px;font-family:${font};font-size:15px;line-height:1.5;color:${navy};">${needs}</ul>
  </div>
  <p style="margin:24px 0 0;font-family:${font};font-size:15px;line-height:1.6;color:${muted};">Une précision à ajouter&nbsp;? Répondez simplement à cet e-mail.</p>
  <p style="margin:20px 0 0;font-family:${font};font-size:15px;line-height:1.6;color:${navy};">L’équipe essor</p>
</td></tr>`;
  return layout({
    preheader: "On lit votre brief et on revient vers vous très vite.",
    body,
    footer: link(meta.siteUrl, meta.siteUrl.replace(/^https?:\/\//, "")),
  });
}

export function confirmationEmailText(r: ReadableBrief, meta: { siteUrl: string }) {
  return [
    "Merci, votre brief est bien arrivé.",
    "",
    "On lit tout attentivement et on revient vers vous très vite pour en parler.",
    "",
    "Votre demande :",
    ...r.needs.map((n) => `  • ${n}`),
    "",
    "Une précision à ajouter ? Répondez simplement à cet e-mail.",
    "",
    "L’équipe essor",
    meta.siteUrl,
  ].join("\n");
}

export const confirmationSubject = "Votre brief est bien arrivé";
