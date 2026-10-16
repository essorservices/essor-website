"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import type { ClientTheme, DeliverableKind } from "@/content/projects";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/cn";
import { styles } from "./styles";
import { themeVars, voiceClass } from "./theme";

/**
 * Root of every mockup: a size container filled with the client theme.
 * Loops run only while `animate` is on, the card is on screen and motion is allowed.
 */
export function DeliverableFrame({
  kind,
  theme,
  animate,
  className,
  children,
}: {
  kind: DeliverableKind;
  theme: ClientTheme;
  animate: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "15% 0px 15% 0px" });
  const reduced = usePrefersReducedMotion();
  const play = animate && inView && !reduced;

  return (
    <div
      ref={ref}
      aria-hidden
      data-deliverable={kind}
      data-play={play ? "" : undefined}
      className={cn(
        styles.root,
        "relative isolate size-full overflow-hidden rounded-[inherit] bg-(--bg) text-(--ink)",
        voiceClass[theme.voice],
        className,
      )}
      style={{ ...themeVars(theme), containerType: "size" }}
    >
      {children}
    </div>
  );
}
