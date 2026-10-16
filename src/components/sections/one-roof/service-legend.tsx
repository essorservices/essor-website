"use client";

import { ServiceIcon } from "@/components/ui/icons";
import type { Business } from "@/content/one-roof";
import { services, type ServiceKey } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * The five métiers under the diagram. Hovering or focusing one lights up its pills;
 * clicking keeps it lit (aria-pressed) until clicked again.
 */
export function ServiceLegend({
  labelId,
  business,
  focus,
  pinned,
  onPreview,
  onPin,
}: {
  labelId: string;
  business: Business;
  focus: ServiceKey | null;
  pinned: ServiceKey | null;
  onPreview: (key: ServiceKey | null) => void;
  onPin: (key: ServiceKey) => void;
}) {
  return (
    <div className="mt-12 flex flex-col gap-3 border-t border-sky/15 pt-5 lg:mt-6 xl:flex-row xl:items-center xl:gap-8">
      <p id={labelId} className="shrink-0 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-sky/70">
        Repérer un métier
      </p>
      <div
        role="group"
        aria-labelledby={labelId}
        className="-mx-2 flex flex-wrap gap-x-1 gap-y-1 sm:gap-x-3"
        onPointerLeave={() => onPreview(null)}
      >
        {services.map((s) => {
          const count = business.items.filter((it) => it.service === s.key).length;
          const lit = focus === s.key;
          return (
            <button
              key={s.key}
              type="button"
              aria-pressed={pinned === s.key}
              aria-label={`${s.label}, ${count} prestation${count > 1 ? "s" : ""}`}
              onClick={() => onPin(s.key)}
              onPointerEnter={(e) => e.pointerType === "mouse" && onPreview(s.key)}
              onFocus={() => onPreview(s.key)}
              onBlur={() => onPreview(null)}
              className={cn(
                "group/legend inline-flex h-11 items-center gap-2.5 rounded-full pl-2 pr-3 text-[0.92rem] transition-colors duration-300",
                lit ? "text-white" : "text-sky/75 hover:text-white",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "grid size-7 place-items-center rounded-full transition-[background-color,color,box-shadow] duration-300",
                  lit ? "bg-coral text-navy" : "text-sky/75 ring-1 ring-inset ring-sky/25 group-hover/legend:ring-sky/50",
                )}
              >
                <ServiceIcon service={s.key} className="size-4" />
              </span>
              <span>{s.label}</span>
              <span aria-hidden className={cn("font-mono text-[0.7rem] tabular", lit ? "text-coral" : "text-sky/50")}>
                ×{count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
