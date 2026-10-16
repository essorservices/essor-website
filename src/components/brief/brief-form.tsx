"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FormProvider, useForm, useFormContext, type DefaultValues, type FieldErrors } from "react-hook-form";
import { submitBrief } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";
import { Sticker } from "@/components/ui/sticker";
import { briefCopy, briefSteps } from "@/content/brief";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";
import { firstName } from "@/lib/brief/format";
import { briefSchema, fieldsOfStep, stepOfField, type Brief, type BriefField, type BriefInput } from "@/lib/brief/schema";
import { formCopy } from "./copy";
import { clearDraft, hasDraftSnapshot, readDraft, subscribeDraft, writeDraft } from "./draft-store";
import { Stepper } from "./stepper";
import { steps } from "./steps";
import { SubmitError } from "./submit-error";
import { BriefSuccess } from "./success";

const LAST = briefSteps.length - 1;
const ease = [0.16, 1, 0.3, 1] as const;

const emptyBrief: DefaultValues<BriefInput> = {
  name: "",
  company: "",
  city: "",
  needs: [],
  description: "",
  email: "",
  phone: "",
  source: null,
  consent: false,
  website: "",
  startedAt: 0,
};

/** Restores the saved draft (client only: RHF resolves async defaults after mount). */
async function initialValues(): Promise<BriefInput> {
  return { ...emptyBrief, ...readDraft(), website: "", consent: false, startedAt: Date.now() } as BriefInput;
}

type Status = "idle" | "sending" | "error" | "success";

/** The four-step project brief. Validates step by step, sends through the `submitBrief` Server Action. */
export function BriefForm() {
  const form = useForm<BriefInput, unknown, Brief>({
    resolver: zodResolver(briefSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
    // RHF would focus before the error is rendered; `focusRequest` below does it after.
    shouldFocusError: false,
  });

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [navigated, setNavigated] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [focusRequest, setFocusRequest] = useState<{ name: BriefField } | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const lastMove = useRef(0);
  /** Once the brief is sent, a pending draft write must not bring the draft back. */
  const sent = useRef(false);
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();
  const hasDraft = useSyncExternalStore(subscribeDraft, hasDraftSnapshot, () => false);
  // Before hydration a click would do a native submit and wipe the answers.
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);

  // Keep the draft on this device while the visitor types (debounced).
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = form.subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (!sent.current) writeDraft(values);
        }, 300);
      },
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [form]);

  // Focus moves once the field's error is rendered, so screen readers read it with the field.
  useEffect(() => {
    if (focusRequest) form.setFocus(focusRequest.name);
  }, [focusRequest, form]);

  // The submit button was disabled while sending, which dropped focus to the page.
  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  /** Brings the top of the white card back into view when it went up under the header. */
  function revealCard() {
    const card = cardRef.current?.closest<HTMLElement>("[data-brief-card]") ?? cardRef.current;
    if (!card || card.getBoundingClientRect().top >= 80) return;
    // The card's scroll margin clears the floating header. Lenis already subtracts it from an element target.
    const offset = parseFloat(getComputedStyle(card).scrollMarginTop) || 88;
    if (lenis && !reduced) lenis.scrollTo(card, { duration: 0.9 });
    else window.scrollTo({ top: window.scrollY + card.getBoundingClientRect().top - offset });
  }

  function goTo(index: number) {
    setDirection(index > step ? 1 : -1);
    setStep(index);
    setNavigated(true);
    lastMove.current = performance.now();
  }

  async function next() {
    const fields = fieldsOfStep(step) as BriefField[];
    if (await form.trigger(fields)) goTo(step + 1);
    else focusFirstError(fields.filter((f) => form.getFieldState(f).error));
  }

  /**
   * Server errors and client errors both send the visitor to the first field that needs a fix:
   * its step (whose title takes focus on arrival), or the field itself when it is on this step.
   */
  function focusFirstError(fields: string[]) {
    const first = briefSteps.flatMap((_, i) => fieldsOfStep(i)).find((f) => fields.includes(f));
    if (!first) return;
    const target = stepOfField(first);
    if (target !== step) goTo(target);
    else setFocusRequest({ name: first });
  }

  async function send(data: Brief) {
    setStatus("sending");
    setError("");
    try {
      const result = await submitBrief(data);
      if (result.ok) {
        sent.current = true;
        clearDraft();
        setSentTo(firstName(data.name));
        setStatus("success");
        return;
      }
      if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          form.setError(field as BriefField, { type: "server", message });
        }
        focusFirstError(Object.keys(result.fieldErrors));
        setStatus("idle");
        return;
      }
      setError(result.error);
      setStatus("error");
    } catch {
      // Network failure, or a stale page calling an action from a previous deployment.
      setError(briefCopy.errorText);
      setStatus("error");
    }
  }

  function onInvalid(errors: FieldErrors<BriefInput>) {
    focusFirstError(Object.keys(errors));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    // A double click on "Continuer" must not also press the "Envoyer" button that replaces it.
    if (performance.now() - lastMove.current < 450) return;
    // Enter in a text field moves to the next step instead of sending early.
    if (step < LAST) {
      void next();
      return;
    }
    void form.handleSubmit(send, onInvalid)(event);
  }

  function restart() {
    clearDraft();
    form.reset({ ...emptyBrief, startedAt: Date.now() } as BriefInput);
    setStatus("idle");
    setError("");
    goTo(0);
  }

  const Step = steps[step];
  const sending = status === "sending";

  return (
    <div ref={cardRef}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
            <BriefSuccess firstName={sentTo} onShown={revealCard} />
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}>
            {/* Tag slapped on the card's edge (the card is the positioned parent) */}
            <Sticker
              tone="coral"
              rotate={7}
              className="absolute -top-3 right-6 font-mono text-[0.8rem] font-medium uppercase tracking-[0.1em] sm:-top-3.5 sm:right-10"
            >
              <span aria-hidden>{formCopy.duration}</span>
            </Sticker>
            <FormProvider {...form}>
              <form method="post" noValidate onSubmit={onSubmit} aria-label={formCopy.formLabel} aria-busy={sending || undefined}>
                <Stepper current={step} onSelect={goTo} disabled={sending} />

                <div className="mt-10 sm:mt-12">
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * 28 }),
                        center: { opacity: 1, x: 0 },
                        exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -20 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease }}
                    >
                      <Step focusOnMount={navigated} onFocused={revealCard} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <Honeypot />

                {status === "error" && step === LAST ? (
                  <div className="mt-8">
                    <SubmitError ref={errorRef} message={error} />
                  </div>
                ) : null}

                {/* Phones: the main button runs full width on top, "Retour" sits under it */}
                <div className="mt-10 flex flex-col-reverse items-stretch gap-3 border-t border-navy/10 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => goTo(step - 1)}
                      disabled={sending}
                      className="group/back -ml-3 inline-flex h-12 items-center gap-2 self-start rounded-full px-3 text-[0.98rem] font-semibold text-navy transition-colors hover:bg-sky-50 disabled:opacity-50 sm:self-auto"
                    >
                      <ArrowIcon className="rotate-180 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/back:-translate-x-0.5" />
                      {briefCopy.back}
                    </button>
                  ) : (
                    <span className="hidden sm:block" />
                  )}

                  {step < LAST ? (
                    <Button type="submit" variant="dark" size="lg" disabled={!hydrated} className={stepButtonClasses(hydrated)}>
                      {briefCopy.next}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={sending || !hydrated}
                      arrow={!sending}
                      className={stepButtonClasses(hydrated)}
                    >
                      {sending ? (
                        <span className="inline-flex items-center gap-2.5">
                          <Spinner />
                          {briefCopy.sending}
                        </span>
                      ) : (
                        briefCopy.submit
                      )}
                    </Button>
                  )}
                </div>

                <p aria-live="polite" className="sr-only">
                  {sending ? formCopy.sendingStatus : ""}
                </p>

                {hasDraft ? (
                  <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.88rem] text-navy/60">
                    <span>
                      <span aria-hidden className="mr-2 inline-block size-1.5 rounded-full bg-coral align-middle" />
                      {formCopy.draft.restored}
                    </span>
                    <button
                      type="button"
                      onClick={restart}
                      disabled={sending}
                      className="font-semibold text-navy underline decoration-navy/25 underline-offset-[0.2em] transition-colors hover:decoration-coral"
                    >
                      {formCopy.draft.clear}
                    </button>
                  </p>
                ) : null}
              </form>
            </FormProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function subscribeNoop() {
  return () => {};
}

/**
 * One line at every width; full width on phones, without the arrow disc below 360px where
 * it no longer fits. Not faded while waiting for hydration.
 */
function stepButtonClasses(hydrated: boolean) {
  return cn(
    "whitespace-nowrap max-sm:w-full max-[359px]:justify-center max-[359px]:px-6 max-[359px]:[&_[data-arrow]]:hidden",
    !hydrated && "disabled:opacity-100",
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[1.1rem] animate-spin" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Invisible to people (and skipped by keyboard and screen readers); bots tend to fill it. */
function Honeypot() {
  "use no memo"; // see useBriefField: register() must run on every render
  const { register } = useFormContext<BriefInput>();
  return (
    <div aria-hidden className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0">
      <label>
        {formCopy.honeypot}
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </label>
    </div>
  );
}
