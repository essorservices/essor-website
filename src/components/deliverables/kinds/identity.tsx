import { useId } from "react";
import type { ClientTheme } from "@/content/projects";
import { cn } from "@/lib/cn";
import type { DeliverableCopy } from "../copy";
import { styles } from "../styles";
import { Monogram } from "../motif";
import { readableOn, voiceFontName } from "../theme";

const tile = "relative overflow-hidden rounded-[calc(var(--r)*2.6cqw+0.5cqw)]";

/** Brand sheet: logo lockup, palette, type specimen and one application, as a bento board. */
export function Identity({ theme, copy }: { theme: ClientTheme; copy: DeliverableCopy }) {
  const nameSize = Math.min(9.5, 60 / Math.max(theme.brand.length, 4) / 0.56);
  const swatches = [
    { name: "Fond", hex: theme.bg, grow: 1.35 },
    { name: "Encre", hex: theme.ink, grow: 1.15 },
    { name: "Accent", hex: theme.accent, grow: 1 },
    { name: "Accent 2", hex: theme.accent2, grow: 0.85 },
  ];

  return (
    <div
      className="absolute inset-0 grid grid-cols-2 gap-[2cqw] p-[3.6cqw]"
      style={{ gridTemplateRows: "minmax(0,1.7fr) minmax(13cqw,0.62fr) minmax(0,1fr)" }}
    >
      <div className={cn(tile, "col-span-2 flex flex-col justify-between bg-(--accent) p-[5cqw] text-(--on-accent)")}>
        <span className={cn(styles.mono, "text-[2.2cqw] opacity-75")}>Logotype principal</span>
        <div className="flex items-center gap-[3.2cqw] self-start outline-dashed outline-[0.2cqw] outline-offset-[2.2cqw] outline-(--on-accent)/35">
          <Monogram
            motif={theme.motif}
            letters={theme.monogram}
            fill="var(--on-accent)"
            color="var(--accent)"
            className="size-[min(17cqw,15cqh)] shrink-0"
          />
          <div className="min-w-0">
            <div className={cn(styles.display, "whitespace-nowrap")} style={{ fontSize: `${nameSize}cqw` }}>
              {theme.brand}
            </div>
            <div className={cn(styles.mono, "mt-[1.8cqw] text-[2.2cqw] opacity-80")}>{theme.line}</div>
          </div>
        </div>
        <Seal text={`${theme.line} · ${theme.brand} · `} />
      </div>

      <div className="col-span-2 flex gap-[1.4cqw]">
        {swatches.map((s) => (
          <div
            key={s.name}
            className={cn(tile, "flex flex-col justify-between p-[2.2cqw]")}
            style={{
              flexGrow: s.grow,
              flexBasis: 0,
              background: s.hex,
              color: readableOn(s.hex, [theme.ink, theme.bg, theme.surface]),
              boxShadow: s.hex === theme.bg ? `inset 0 0 0 0.25cqw color-mix(in srgb, ${theme.ink} 14%, transparent)` : undefined,
            }}
          >
            <span className="text-[2.4cqw] font-semibold leading-none">{s.name}</span>
            <span className={cn(styles.mono, "text-[1.9cqw] opacity-80")}>{s.hex.replace("#", "")}</span>
          </div>
        ))}
      </div>

      <div className={cn(tile, "flex flex-col justify-between bg-(--surface) p-[3.4cqw]")}>
        <span className={cn(styles.mono, "text-[2cqw] opacity-60")}>Typographie</span>
        <span className={cn(styles.display, "text-[length:min(15cqw,12cqh)] normal-case leading-[0.8]")}>
          Aa<span className="text-(--accent)">.</span>
        </span>
        <span className={cn(styles.mono, "text-[1.9cqw] leading-[1.25] opacity-70")}>{voiceFontName[theme.voice]}</span>
      </div>

      <div className={cn(tile, "bg-(--ink)")}>
        <span className={cn(styles.mono, "absolute left-[3.4cqw] top-[3.4cqw] z-10 text-[2cqw] text-(--bg) opacity-70")}>
          Applications
        </span>
        <Application kind={copy.application} theme={theme} />
      </div>
    </div>
  );
}

/** Rotating circular text badge, a classic of brand boards. */
function Seal({ text }: { text: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(styles.spin, "absolute right-[3.4cqw] top-[3.4cqw] size-[min(18cqw,14cqh)]")}
      aria-hidden
      focusable="false"
    >
      <path id={id} d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" fill="none" />
      <text className={styles.mono} fontSize="9.4" fill="currentColor" letterSpacing="0.6">
        <textPath href={`#${id}`} textLength="236" lengthAdjust="spacing">
          {text.toUpperCase()}
        </textPath>
      </text>
      <path d="M50 38v24M38 50h24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function Application({ kind, theme }: { kind: DeliverableCopy["application"]; theme: ClientTheme }) {
  const letter = theme.monogram;
  if (kind === "cup") {
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-0 h-[88%] w-full" aria-hidden focusable="false">
        <path d="M30 24h40l-2 8H32Z" fill="var(--accent2)" />
        <path d="M33 32h34l-5 70H38Z" fill="var(--surface)" />
        <path d="M34.6 50h30.8l-1.5 22H36.1Z" fill="var(--accent)" />
        <text x="50" y="62" textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="var(--on-accent)" className={styles.display}>
          {letter}
        </text>
      </svg>
    );
  }
  if (kind === "bag") {
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-0 h-[88%] w-full" aria-hidden focusable="false">
        <path d="M40 40v-9a10 10 0 0 1 20 0v9" fill="none" stroke="var(--accent2)" strokeWidth="3" />
        <path d="M24 38h52v66H24Z" fill="var(--surface)" />
        <path d="M24 38h52v8H24Z" fill="var(--accent)" />
        <text x="50" y="72" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="var(--ink)" className={styles.display}>
          {letter}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 size-full" aria-hidden focusable="false">
      <rect x="24" y="30" width="60" height="38" rx="2.5" fill="var(--accent)" transform="rotate(-14 54 49)" />
      <rect x="16" y="40" width="60" height="38" rx="2.5" fill="var(--surface)" transform="rotate(4 46 59)" />
      <g transform="rotate(4 46 59)">
        <text x="24" y="56" fontSize="9" fill="var(--ink)" className={styles.display}>
          {letter}
        </text>
        <rect x="24" y="66" width="22" height="2" rx="1" fill="var(--ink)" opacity="0.45" />
        <rect x="24" y="70.5" width="14" height="2" rx="1" fill="var(--ink)" opacity="0.25" />
      </g>
    </svg>
  );
}
