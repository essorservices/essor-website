import { briefCopy } from "@/content/brief";
import { site } from "@/content/site";
import { formCopy } from "./copy";

/**
 * Announced as soon as it appears (role="alert"), and focusable so the form can move focus
 * here after a failed send. Offers the e-mail address when the agency has one.
 */
export function SubmitError({ message, ref }: { message: string; ref?: React.Ref<HTMLDivElement> }) {
  // Widened: the content file types it as a literal "" until the team fills it in.
  const email: string = site.contact.email;
  // A specific reason (too fast, too many briefs) replaces the generic text, never both.
  const text = message || briefCopy.errorText;
  return (
    <div
      ref={ref}
      role="alert"
      tabIndex={-1}
      className="flex gap-3.5 rounded-2xl bg-coral-100 p-4 ring-1 ring-inset ring-coral/40 focus:outline-none sm:p-5"
    >
      <span
        aria-hidden
        className="mt-px grid size-6 shrink-0 place-items-center rounded-full bg-coral font-mono text-[0.8rem] font-medium text-navy"
      >
        !
      </span>
      <div className="min-w-0 text-[0.95rem] leading-relaxed text-navy">
        <p className="font-semibold">{briefCopy.errorTitle}</p>
        <p className="mt-1 text-navy/75">{text}</p>
        {email ? (
          <p className="mt-2">
            {formCopy.errorMail}{" "}
            <a
              href={`mailto:${email}`}
              className="font-semibold underline decoration-coral decoration-2 underline-offset-[0.2em] [overflow-wrap:anywhere]"
            >
              {email}
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
