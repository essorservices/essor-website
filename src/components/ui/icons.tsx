import { cn } from "@/lib/cn";
import type { ServiceKey } from "@/content/services";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn("size-4", className)}>
      <path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn("size-4", className)}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn("size-4", className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn("size-4", className)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

const servicePaths: Record<ServiceKey, React.ReactNode> = {
  branding: (
    <>
      <path d="M12 2.8 18.4 10 12 21.2 5.6 10Z" />
      <path d="M12 2.8v7.4" />
      <circle cx="12" cy="11.8" r="1.6" />
    </>
  ),
  strategie: (
    <>
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="3.8" />
      <path d="m11 13 9-9M16.6 4H20v3.4" />
    </>
  ),
  contenu: (
    <>
      <rect x="2.8" y="6" width="13" height="12" rx="2.6" />
      <path d="m15.8 10.4 5.4-2.6v8.4l-5.4-2.6" />
      <circle cx="9.3" cy="12" r="2.2" />
    </>
  ),
  web: (
    <>
      <rect x="2.8" y="4" width="18.4" height="16" rx="2.8" />
      <path d="M2.8 9h18.4" />
      <path d="M6 6.5h.01M8.6 6.5h.01" strokeWidth="2.4" />
      <path d="M7 13.5h6M7 16.5h4" />
    </>
  ),
  automatisation: (
    <>
      <circle cx="5.5" cy="12" r="2.6" />
      <circle cx="18.5" cy="5.5" r="2.6" />
      <circle cx="18.5" cy="18.5" r="2.6" />
      <path d="M8.1 12h2.7c1.6 0 2.4-.6 3.1-2l1.6-2.9M8.1 12h2.7c1.6 0 2.4.6 3.1 2l1.6 2.9" />
    </>
  ),
};

export function ServiceIcon({ service, className }: IconProps & { service: ServiceKey }) {
  return (
    <svg {...base} className={cn("size-5", className)}>
      {servicePaths[service]}
    </svg>
  );
}
