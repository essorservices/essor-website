import { ServiceIcon } from "@/components/ui/icons";
import { serviceByKey, type ServiceKey } from "@/content/services";
import { cn } from "@/lib/cn";

/** Small chips naming the métiers a project used (icon + short label). */
export function ServiceChips({
  services,
  id,
  size = "sm",
  className,
}: {
  services: readonly ServiceKey[];
  id?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <ul id={id} className={cn("flex flex-wrap gap-1.5", size === "md" && "gap-2", className)}>
      {services.map((key) => (
        <li
          key={key}
          className={cn(
            "inline-flex items-center rounded-full bg-sky-50 font-medium text-navy ring-1 ring-inset ring-navy/10",
            size === "sm" ? "h-8 gap-1.5 pl-1 pr-3 text-[0.82rem]" : "h-10 gap-2 pl-1.5 pr-4 text-[0.95rem]",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "grid shrink-0 place-items-center rounded-full bg-white ring-1 ring-inset ring-navy/10",
              size === "sm" ? "size-6" : "size-7",
            )}
          >
            <ServiceIcon service={key} className={size === "sm" ? "size-3.5" : "size-4"} />
          </span>
          {serviceByKey[key].label}
        </li>
      ))}
    </ul>
  );
}
