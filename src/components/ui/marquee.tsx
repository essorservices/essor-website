import { cn } from "@/lib/cn";

/** Infinite horizontal band. Content is duplicated once; pauses on hover; still under reduced motion. */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group/marquee flex overflow-hidden", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 ? true : undefined}
          style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : undefined }}
          className="flex min-w-max shrink-0 animate-marquee items-center group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {children}
        </div>
      ))}
    </div>
  );
}
