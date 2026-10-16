"use client";

import { useFormContext, useFormState } from "react-hook-form";
import type { BriefField, BriefInput } from "@/lib/brief/schema";

/**
 * Registers a brief field and exposes what its markup needs (ids, error message).
 * Errors only appear once the visitor tries to continue; after that, a field
 * re-validates on every change so the message disappears as soon as it is fixed.
 */
export function useBriefField(name: BriefField) {
  // React Compiler would memoize `register()`: after a reset (restoring the draft,
  // "Tout effacer") RHF drops its field refs and needs register's fresh ref callback
  // on the next render to re-attach the inputs. Opt this hook out of memoization.
  "use no memo";
  const { register, trigger, getFieldState } = useFormContext<BriefInput>();
  const { errors } = useFormState<BriefInput>({ name });
  const message = errors[name]?.message;

  const registration = register(name, {
    onChange: () => {
      if (getFieldState(name).error) void trigger(name);
    },
  });

  const id = `brief-${name}`;
  return {
    id,
    hintId: `${id}-hint`,
    errorId: `${id}-error`,
    message: typeof message === "string" ? message : undefined,
    registration,
  };
}

/** Joins the ids that describe a field, skipping the ones that are not rendered. */
export function describedBy(...ids: (string | false | null | undefined)[]) {
  const list = ids.filter(Boolean).join(" ");
  return list || undefined;
}
