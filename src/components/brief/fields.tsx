"use client";

import { AnimatePresence, motion } from "motion/react";
import { useWatch } from "react-hook-form";
import { cn } from "@/lib/cn";
import { DESCRIPTION_MAX, type BriefField, type BriefInput } from "@/lib/brief/schema";
import { formCopy } from "./copy";
import { describedBy, useBriefField } from "./use-brief-field";

/**
 * Soft filled input: sky tint at rest, white with a coral ring when focused. The resting
 * edge keeps 3:1 against the white card; forced colours get a real border and outline.
 */
export const inputClasses = cn(
  "block w-full rounded-2xl bg-sky-50 px-4 text-[1.0625rem] leading-snug text-navy",
  "ring-1 ring-inset ring-navy/45 placeholder:text-navy/65",
  "transition-[background-color,box-shadow] duration-300 ease-[var(--ease-out-expo)]",
  "hover:ring-navy/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-coral",
  "forced-colors:border forced-colors:border-[color:CanvasText]",
  "aria-[invalid=true]:bg-coral-100/45 aria-[invalid=true]:ring-coral/70 aria-[invalid=true]:focus:ring-coral",
);

export function OptionalTag() {
  return (
    <span className="font-mono text-[0.7rem] font-normal uppercase tracking-[0.12em] text-navy/60">{formCopy.optional}</span>
  );
}

/** A label's text and its "facultatif" tag; when they wrap, the tag starts flush left. */
export function LabelText({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span>{children}</span>
      {optional ? <OptionalTag /> : null}
    </span>
  );
}

export function FieldLabel({
  htmlFor,
  id,
  children,
  optional,
  aside,
}: {
  htmlFor?: string;
  id?: string;
  children: React.ReactNode;
  optional?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-2.5 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} id={id} className="text-[0.98rem] font-semibold tracking-[-0.005em] text-navy">
        <LabelText optional={optional}>{children}</LabelText>
      </label>
      {aside}
    </div>
  );
}

export function FieldHint({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[0.9rem] leading-snug text-navy/60">
      {children}
    </p>
  );
}

/** Inline error: navy text (coral would fail contrast at this size) behind a coral badge. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          key="error"
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 flex items-start gap-2 text-[0.92rem] font-medium leading-snug text-navy"
        >
          <span
            aria-hidden
            className="mt-[0.12em] grid size-[1.1rem] shrink-0 place-items-center rounded-full bg-coral font-mono text-[0.7rem] font-medium text-navy"
          >
            !
          </span>
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  inputMode,
  enterKeyHint = "next",
  placeholder,
  hint,
  optional = false,
  className,
}: {
  name: BriefField;
  label: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  enterKeyHint?: React.InputHTMLAttributes<HTMLInputElement>["enterKeyHint"];
  placeholder?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
}) {
  const f = useBriefField(name);
  return (
    <div className={className}>
      <FieldLabel htmlFor={f.id} optional={optional}>
        {label}
      </FieldLabel>
      <input
        id={f.id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
        placeholder={placeholder}
        spellCheck={type === "text" ? undefined : false}
        aria-required={optional ? undefined : true}
        aria-invalid={f.message ? true : undefined}
        aria-describedby={describedBy(hint && f.hintId, f.message && f.errorId)}
        className={cn(inputClasses, "h-14")}
        {...f.registration}
      />
      {hint ? <FieldHint id={f.hintId}>{hint}</FieldHint> : null}
      <FieldError id={f.errorId} message={f.message} />
    </div>
  );
}

const frNumber = new Intl.NumberFormat("fr-FR");

/** Live "124 / 3 000 caractères" counter under the description. */
function Counter({ id }: { id: string }) {
  const value = useWatch<BriefInput, "description">({ name: "description" });
  const length = value?.length ?? 0;
  return (
    <p id={id} className="tabular shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-navy/60">
      {formCopy.fields.description.counter(frNumber.format(length), frNumber.format(DESCRIPTION_MAX))}
    </p>
  );
}

export function DescriptionField() {
  const f = useBriefField("description");
  const counterId = `${f.id}-counter`;
  const copy = formCopy.fields.description;
  return (
    <div>
      <FieldLabel htmlFor={f.id}>{copy.label}</FieldLabel>
      <textarea
        id={f.id}
        rows={6}
        maxLength={DESCRIPTION_MAX}
        placeholder={copy.placeholder}
        aria-required
        aria-invalid={f.message ? true : undefined}
        aria-describedby={describedBy(f.message && f.errorId, counterId)}
        // Let the textarea scroll on its own instead of the smooth-scrolled page.
        data-lenis-prevent
        className={cn(inputClasses, "min-h-40 resize-y py-3.5 leading-relaxed")}
        {...f.registration}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <FieldError id={f.errorId} message={f.message} />
        </div>
        <div className="mt-2.5">
          <Counter id={counterId} />
        </div>
      </div>
    </div>
  );
}
