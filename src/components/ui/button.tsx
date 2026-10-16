import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./icons";

export type ButtonVariant = "primary" | "dark" | "light" | "outline" | "outline-light";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  // Coral buttons carry navy text: white on coral fails contrast (3:1), navy passes (5.9:1).
  primary: "bg-coral text-navy hover:bg-navy hover:text-white [&_[data-arrow]]:bg-navy [&_[data-arrow]]:text-coral hover:[&_[data-arrow]]:bg-coral hover:[&_[data-arrow]]:text-navy",
  dark: "bg-navy text-white hover:bg-coral hover:text-navy [&_[data-arrow]]:bg-coral [&_[data-arrow]]:text-navy hover:[&_[data-arrow]]:bg-navy hover:[&_[data-arrow]]:text-coral",
  light: "bg-white text-navy hover:bg-coral [&_[data-arrow]]:bg-navy [&_[data-arrow]]:text-white",
  outline: "bg-transparent text-navy ring-1 ring-inset ring-navy/25 hover:bg-navy hover:text-white hover:ring-navy",
  "outline-light": "bg-transparent text-white ring-1 ring-inset ring-sky/30 hover:bg-white hover:text-navy hover:ring-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 pl-4 pr-1.5 text-[0.9rem] [&_[data-arrow]]:size-7",
  md: "h-12 gap-3 pl-5 pr-1.5 text-[0.98rem] [&_[data-arrow]]:size-9",
  lg: "h-14 gap-3.5 pl-6 pr-2 text-[1.05rem] [&_[data-arrow]]:size-10",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  arrow = true,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
}) {
  return cn(
    "group/btn relative inline-flex select-none items-center justify-between rounded-full font-semibold tracking-[-0.01em]",
    // Forced colours drop backgrounds and rings: a system-colour border keeps the pill edge.
    "forced-colors:border forced-colors:border-[color:ButtonText]",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    !arrow && "justify-center px-6",
    className,
  );
}

function Arrow() {
  return (
    <span
      data-arrow
      aria-hidden
      className="grid shrink-0 place-items-center overflow-hidden rounded-full transition-colors duration-300"
    >
      <span className="relative block size-4 overflow-hidden">
        <ArrowIcon className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-[150%]" />
        <ArrowIcon className="absolute inset-0 -translate-x-[150%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0" />
      </span>
    </span>
  );
}

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant,
  size,
  arrow = true,
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={buttonClasses({ variant, size, arrow, className })} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

export function Button({
  variant,
  size,
  arrow = true,
  className,
  children,
  type = "button",
  ...rest
}: Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button type={type} className={buttonClasses({ variant, size, arrow, className })} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </button>
  );
}
