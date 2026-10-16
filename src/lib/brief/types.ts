/** What `submitBrief` returns to the form. Messages are safe to show (French, no internals). */
export type SubmitBriefResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };
