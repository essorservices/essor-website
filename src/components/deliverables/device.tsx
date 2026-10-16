import { cn } from "@/lib/cn";
import { styles } from "./styles";
import { MockIcon } from "./icons";

/**
 * Phone frame. `width` is a CSS length in the card's container units.
 * The screen is its own container, so everything inside is sized in cqw of the screen.
 */
export function Phone({
  width,
  ratio = "9 / 19.5",
  className,
  screenClassName,
  style,
  island = true,
  children,
}: {
  width: string;
  ratio?: string;
  className?: string;
  screenClassName?: string;
  style?: React.CSSProperties;
  island?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute bg-(--deep) shadow-[inset_0_0_0_0.3cqw_color-mix(in_srgb,var(--ink)_16%,transparent),0_2.2cqw_5cqw_-2.4cqw_color-mix(in_srgb,var(--deep)_70%,transparent)]",
        className,
      )}
      style={{
        width,
        aspectRatio: ratio,
        padding: `calc(${width} * 0.032)`,
        borderRadius: `calc(${width} * 0.16)`,
        ...style,
      }}
    >
      <div
        className={cn("relative size-full overflow-hidden", screenClassName)}
        style={{ containerType: "inline-size", borderRadius: `calc(${width} * 0.13)` }}
      >
        {children}
        {island ? (
          <div className="absolute left-1/2 top-[2.8cqw] h-[5.6cqw] w-[24cqw] -translate-x-1/2 rounded-full bg-(--deep)" />
        ) : null}
      </div>
    </div>
  );
}

/** iOS-like status bar: time on the left, signal and battery on the right. */
export function StatusBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between px-[8cqw] pt-[3.6cqw] text-[3.8cqw] font-semibold", className)}>
      <span className="tabular font-sans">9:41</span>
      <svg viewBox="0 0 34 12" className="h-[3.2cqw] w-auto" fill="currentColor" aria-hidden focusable="false">
        <path
          fillRule="evenodd"
          d="M0 8.5h2.6V12H0ZM4.2 6h2.6v6H4.2ZM8.4 3.5H11V12H8.4ZM12.6 1h2.6v11h-2.6ZM21.6 1h8.8A2.6 2.6 0 0 1 33 3.6v4.8a2.6 2.6 0 0 1-2.6 2.6h-8.8A2.6 2.6 0 0 1 19 8.4V3.6A2.6 2.6 0 0 1 21.6 1Zm0 1.2a1.4 1.4 0 0 0-1.4 1.4v4.8a1.4 1.4 0 0 0 1.4 1.4h8.8a1.4 1.4 0 0 0 1.4-1.4V3.6a1.4 1.4 0 0 0-1.4-1.4ZM21.4 3h7v6h-7Z"
        />
      </svg>
    </div>
  );
}

/** Desktop browser window. `width` is a CSS length in card units; the page inside is a container. */
export function Browser({
  url,
  width,
  className,
  style,
  children,
}: {
  url: string;
  width: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute flex flex-col overflow-hidden bg-(--surface) shadow-[0_0_0_0.25cqw_color-mix(in_srgb,var(--ink)_10%,transparent),0_2.4cqw_6cqw_-3cqw_color-mix(in_srgb,var(--deep)_55%,transparent)]",
        className,
      )}
      style={{ width, borderRadius: `calc(${width} * 0.022)`, containerType: "inline-size", ...style }}
    >
      <div className="relative flex h-[5.6cqw] shrink-0 items-center gap-[1.1cqw] border-b-[0.2cqw] border-(--ink)/8 bg-(--ink)/4 px-[2.4cqw]">
        <span className="size-[1.3cqw] rounded-full bg-(--ink)/20 shadow-[2.1cqw_0_0_color-mix(in_srgb,var(--ink)_20%,transparent),4.2cqw_0_0_color-mix(in_srgb,var(--ink)_20%,transparent)]" />
        <div className="absolute left-1/2 top-1/2 flex h-[3.2cqw] w-[34cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[0.8cqw] rounded-[0.9cqw] bg-(--surface) text-(--ink)/60">
          <MockIcon name="lock" className="size-[1.7cqw] shrink-0" strokeWidth={2.4} />
          <span className={cn(styles.ellipsis, "font-sans text-[1.8cqw] font-medium tracking-normal normal-case")}>{url}</span>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 bg-(--bg)">{children}</div>
    </div>
  );
}
