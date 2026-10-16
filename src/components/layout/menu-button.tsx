"use client";

import { cn } from "@/lib/cn";
import type { HeaderTone } from "./use-header-scroll";

/** Round toggle: two lines that cross into an X. 48px, so it is a comfortable touch target. */
export function MenuButton({
  open,
  tone,
  controls,
  onClick,
  ref,
}: {
  open: boolean;
  tone: HeaderTone;
  controls?: string;
  onClick: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      className={cn(
        "relative grid size-12 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-95 lg:hidden",
        "forced-colors:border forced-colors:border-[color:ButtonText]",
        open ? "bg-coral text-navy" : tone === "dark" ? "bg-white text-navy" : "bg-navy text-white",
      )}
    >
      <span aria-hidden className="relative block h-3 w-5">
        <span
          className={cn(
            "absolute left-0 top-0 h-[2px] w-full origin-center rounded-full bg-current forced-colors:bg-[color:ButtonText] transition-transform duration-500 ease-[var(--ease-out-expo)]",
            open && "translate-y-[5px] rotate-45",
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[2px] w-full origin-center rounded-full bg-current forced-colors:bg-[color:ButtonText] transition-transform duration-500 ease-[var(--ease-out-expo)]",
            open ? "-translate-y-[5px] -rotate-45" : "scale-x-[0.6] translate-x-[20%]",
          )}
        />
      </span>
    </button>
  );
}
