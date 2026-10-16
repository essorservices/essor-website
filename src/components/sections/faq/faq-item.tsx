"use client";

import { motion } from "motion/react";
import { PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;
const easeInOut = [0.76, 0, 0.24, 1] as const;

export function FaqItem({
  id,
  index,
  question,
  answer,
  open,
  reduced,
  onToggle,
}: {
  id: string;
  index: number;
  question: string;
  answer: string;
  open: boolean;
  reduced: boolean;
  onToggle: (button: HTMLButtonElement) => void;
}) {
  const buttonId = `${id}-question`;
  const panelId = `${id}-reponse`;

  return (
    <li className="border-t border-navy/10 last:border-b">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={(e) => onToggle(e.currentTarget)}
          className="group/q grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 py-6 text-left sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:py-7"
        >
          <span
            aria-hidden
            className={cn(
              "hidden pt-[0.55rem] font-mono font-normal text-[0.78rem] tracking-[0.12em] tabular transition-colors duration-300 sm:block",
              open ? "text-navy" : "text-navy/60",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-[1.3rem] font-semibold leading-[1.15] tracking-[-0.02em] [font-variation-settings:'opsz'_48] sm:text-2xl">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-out-expo)] group-hover/q:bg-[length:100%_1.5px]">
              {question}
            </span>
          </span>
          <span
            aria-hidden
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-[background-color,color,box-shadow] duration-300 sm:-mt-1",
              open
                ? "bg-coral text-navy ring-coral"
                : "bg-white text-navy ring-navy/20 group-hover/q:bg-navy group-hover/q:text-white group-hover/q:ring-navy",
            )}
          >
            <PlusIcon
              className={cn(
                "size-[1.1rem] transition-transform duration-500 ease-[var(--ease-out-expo)]",
                open ? "rotate-45" : "rotate-0",
              )}
            />
          </span>
        </button>
      </h3>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : open
              ? { height: { duration: 0.65, ease }, opacity: { duration: 0.4, delay: 0.1 } }
              : { height: { duration: 0.5, ease: easeInOut }, opacity: { duration: 0.2 } }
        }
        className="overflow-hidden"
      >
        <p className="max-w-[40rem] pb-8 pr-14 text-[1.05rem] leading-relaxed text-navy/70 sm:pl-16 sm:pr-16 sm:text-lg">{answer}</p>
      </motion.div>
    </li>
  );
}
