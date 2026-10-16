"use client";

import { motion } from "motion/react";
import { CheckIcon } from "@/components/ui/icons";
import { briefSteps } from "@/content/brief";
import { cn } from "@/lib/cn";
import { formCopy } from "./copy";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Four labelled segments. Done and current segments fill in coral (one progress bar
 * cut in four), the current label is the strongest. Finished steps are buttons, so
 * the visitor can go back to any of them; upcoming steps are plain text.
 */
export function Stepper({ current, onSelect, disabled }: { current: number; onSelect: (index: number) => void; disabled?: boolean }) {
  return (
    <nav aria-label={formCopy.stepsLabel}>
      <ol className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
        {briefSteps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          const number = String(i + 1).padStart(2, "0");
          const content = (
            <>
              <span aria-hidden className="flex items-center gap-2">
                <span
                  className={cn(
                    "tabular font-mono text-[0.75rem] tracking-[0.08em] transition-colors duration-300",
                    active ? "text-navy" : "text-navy/60",
                  )}
                >
                  {number}
                </span>
                <span
                  className={cn(
                    "hidden text-[0.95rem] leading-none tracking-[-0.01em] transition-colors duration-300 sm:inline",
                    active ? "font-semibold text-navy" : "font-medium text-navy/60",
                    done && "group-hover/step:text-navy",
                  )}
                >
                  {step.label}
                </span>
                {done ? <CheckIcon className="size-3.5 text-navy/60 [&_path]:stroke-[2.6]" /> : null}
              </span>
              <span aria-hidden className="relative mt-3 block h-[5px] overflow-hidden rounded-full bg-sky">
                <motion.span
                  className="absolute inset-0 origin-left rounded-full bg-coral"
                  initial={false}
                  animate={{ scaleX: done || active ? 1 : 0 }}
                  transition={{ duration: 0.7, ease, delay: active ? 0.15 : 0 }}
                />
              </span>
              <span className="sr-only">
                {`Étape ${i + 1}\u00A0: ${step.label}${done ? ` (${formCopy.stepDone})` : active ? ` (${formCopy.stepCurrent})` : ""}`}
              </span>
            </>
          );
          return (
            <li key={step.key} aria-current={active ? "step" : undefined} className="min-w-0">
              {done ? (
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  disabled={disabled}
                  className="group/step -mx-1.5 -my-2.5 block w-[calc(100%+0.75rem)] rounded-lg px-1.5 py-2.5 text-left"
                >
                  {content}
                </button>
              ) : (
                <span className="block">{content}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
