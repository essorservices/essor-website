import type { ClientTheme } from "@/content/projects";
import { cn } from "@/lib/cn";
import type { DeliverableCopy, FlowStepType } from "../copy";
import { styles } from "../styles";
import { MockIcon } from "../icons";
import { Monogram } from "../motif";

/* Artboard units: 100 wide x 125 tall (4/5), contained in the card whatever its ratio. */
const NODE_W = 66;
const NODE_H = 13.4;
const TOPS = [24, 50, 76, 102];
const lefts = (i: number) => (i % 2 === 0 ? 5 : 29);
const radius = "rounded-[calc(var(--r)*2.2cqw+0.6cqw)]";

const tileTone: Record<FlowStepType, string> = {
  Déclencheur: "bg-(--accent) text-(--on-accent)",
  Action: "bg-(--ink) text-(--bg)",
  Délai: "bg-(--accent2) text-(--on-accent2)",
  Condition: "bg-(--bg) text-(--ink) shadow-[inset_0_0_0_0.3cqw_color-mix(in_srgb,var(--ink)_25%,transparent)]",
};

/** Node-based workflow on a dotted canvas: trigger, actions and delays linked by flowing connectors. */
export function Automation({ theme, copy }: { theme: ClientTheme; copy: DeliverableCopy }) {
  const steps = copy.flow;
  const links = steps.slice(1).map((_, i) => {
    const x1 = lefts(i) + NODE_W / 2;
    const y1 = TOPS[i] + NODE_H;
    const x2 = lefts(i + 1) + NODE_W / 2;
    const y2 = TOPS[i + 1];
    const my = (y1 + y2) / 2;
    return { d: `M${x1} ${y1}C${x1} ${my} ${x2} ${my} ${x2} ${y2}`, x1, y1, x2, y2 };
  });

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in srgb, var(--ink) 22%, transparent) 0.22cqmin, transparent 0.3cqmin)",
        backgroundSize: "4cqmin 4cqmin",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 aspect-[4/5] -translate-x-1/2 -translate-y-1/2"
        style={{ width: "min(100cqw, 80cqh)", containerType: "inline-size" }}
      >
        {/* header */}
        <div className={cn(radius, "absolute inset-x-[5cqw] top-[5.5cqw] flex items-center gap-[2.6cqw] bg-(--surface) px-[3cqw] py-[2.6cqw] font-sans shadow-[0_0_0_0.25cqw_color-mix(in_srgb,var(--ink)_9%,transparent)]")}>
          <Monogram motif={theme.motif} letters={theme.monogram} fill="var(--ink)" color="var(--surface)" className="size-[6.4cqw] shrink-0" />
          <span className="mr-auto min-w-0">
            <span className={cn(styles.ellipsis, "block text-[3.6cqw] font-semibold leading-tight")}>{copy.flowTitle}</span>
            <span className={cn(styles.mono, "mt-[0.8cqw] block text-[2cqw] opacity-55")}>{steps.length} étapes</span>
          </span>
          <span className="flex items-center gap-[1.4cqw] rounded-full bg-(--accent2)/25 py-[0.9cqw] pl-[2.2cqw] pr-[0.9cqw] text-[2.8cqw] font-semibold">
            Actif
            <span className="flex h-[3.8cqw] w-[6.6cqw] items-center justify-end rounded-full bg-(--accent) p-[0.5cqw]">
              <span className="size-[2.8cqw] rounded-full bg-(--surface)" />
            </span>
          </span>
        </div>

        {/* connectors */}
        <svg viewBox="0 0 100 125" className="absolute inset-0 size-full" aria-hidden focusable="false">
          {links.map((l) => (
            <g key={l.d}>
              <path d={l.d} fill="none" stroke="var(--ink)" strokeOpacity="0.16" strokeWidth="1.6" strokeLinecap="round" />
              <path
                d={l.d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.7"
                strokeDasharray="2 2"
                strokeLinecap="round"
                className={styles.flow}
              />
              <circle cx={l.x2} cy={l.y2} r="1.1" fill="var(--surface)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="0.5" />
            </g>
          ))}
        </svg>

        {/* nodes */}
        {steps.map((step, i) => (
          <div
            key={step.label}
            className={cn(radius, "absolute flex items-center gap-[3cqw] bg-(--surface) px-[3cqw] font-sans shadow-[0_0_0_0.25cqw_color-mix(in_srgb,var(--ink)_10%,transparent),0_1.2cqw_2.4cqw_-1.4cqw_color-mix(in_srgb,var(--deep)_45%,transparent)]")}
            style={{ left: `${lefts(i)}cqw`, top: `${TOPS[i]}cqw`, width: `${NODE_W}cqw`, height: `${NODE_H}cqw` }}
          >
            <span className={cn("grid size-[8cqw] shrink-0 place-items-center rounded-[calc(var(--r)*1.6cqw+0.4cqw)]", tileTone[step.type])}>
              <MockIcon name={step.icon} className="size-[4.4cqw]" strokeWidth={2.1} />
            </span>
            <span className="min-w-0">
              <span className={cn(styles.mono, "block text-[2.1cqw] opacity-55")}>{step.type}</span>
              <span className={cn(styles.ellipsis, "mt-[0.5cqw] block text-[3.5cqw] font-semibold leading-[1.25]")}>{step.label}</span>
            </span>
            <span
              className={cn(styles.lit, radius, "pointer-events-none absolute -inset-[0.8cqw] border-[0.5cqw] border-(--accent)")}
              style={{ "--i": i } as React.CSSProperties}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-[4cqmin] left-[4cqmin] flex items-center gap-[1.6cqmin] rounded-full bg-(--surface) px-[2.4cqmin] py-[1.2cqmin] font-mono text-[2.2cqmin] shadow-[0_0_0_0.25cqmin_color-mix(in_srgb,var(--ink)_10%,transparent)]">
        <span className="opacity-60">−</span>
        <span className="tabular">{"100\u00A0%"}</span>
        <span className="opacity-60">+</span>
      </div>
    </div>
  );
}
