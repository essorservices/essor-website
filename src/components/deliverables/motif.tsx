import { styles } from "./styles";
import type { Motif } from "./theme";

type Palette = { base?: string; a: string; b: string; c: string };

const gridLines = (step: number) => {
  let d = "";
  for (let i = step; i < 100; i += step) d += `M${i} 0V100M0 ${i}H100`;
  return d;
};

const wave = (y: number, amp = 7) => `M0 ${y}C17 ${y - amp} 33 ${y - amp} 50 ${y}S83 ${y + amp} 100 ${y}V100H0Z`;
const waveLine = (y: number, amp = 6) => `M-4 ${y}C13 ${y - amp} 33 ${y - amp} 50 ${y}S87 ${y + amp} 104 ${y}`;

/**
 * Brand motif drawn as a flat illustration (100 x 100, cropped to cover).
 * Three arrangements per motif so a single brand never repeats the same picture twice in a row.
 */
export function MotifArt({
  motif,
  palette,
  variant = 0,
  className,
  fit = "slice",
}: {
  motif: Motif;
  palette: Palette;
  variant?: 0 | 1 | 2;
  className?: string;
  fit?: "slice" | "meet";
}) {
  const { base, a, b, c } = palette;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio={`xMidYMid ${fit}`}
      className={className}
      style={base ? { background: base } : undefined}
      aria-hidden
      focusable="false"
    >
      {art[motif][variant]({ a, b, c })}
    </svg>
  );
}

type Draw = (p: Omit<Palette, "base">) => React.ReactNode;

const art: Record<Motif, [Draw, Draw, Draw]> = {
  arch: [
    ({ a, b, c }) => (
      <>
        <path d="M14 104V50a36 36 0 0 1 72 0v54Z" fill={a} />
        <path d="M31 104V60a19 19 0 0 1 38 0v44Z" fill={b} />
        <circle cx="74" cy="22" r="9" fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <>
        <path d="M6 104V58a21 21 0 0 1 42 0v46Z" fill={a} />
        <path d="M52 104V40a21 21 0 0 1 42 0v64Z" fill={b} />
        <circle cx="27" cy="30" r="7" fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <g fill="none" stroke={a} strokeWidth="3.2">
        <path d="M18 104V52a32 32 0 0 1 64 0v52" />
        <path d="M30 104V56a20 20 0 0 1 40 0v48" stroke={c} />
        <path d="M41 104V60a9 9 0 0 1 18 0v44Z" fill={b} stroke="none" />
      </g>
    ),
  ],
  circle: [
    ({ a, b, c }) => (
      <>
        <circle cx="50" cy="56" r="36" fill={a} />
        <circle cx="50" cy="56" r="22" fill={b} />
        <circle cx="80" cy="18" r="8" fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <>
        <circle cx="50" cy="62" r="30" fill={a} />
        <rect y="62" width="100" height="40" fill={b} />
        <circle cx="22" cy="26" r="6" fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <g fill="none" stroke={a} strokeWidth="3">
        <circle cx="50" cy="52" r="38" />
        <circle cx="50" cy="52" r="26" stroke={c} />
        <circle cx="50" cy="52" r="13" fill={b} stroke="none" />
      </g>
    ),
  ],
  wave: [
    ({ a, b, c }) => (
      <>
        <path d={wave(52)} fill={a} />
        <path d={wave(68, 6)} fill={b} />
        <path d={wave(84, 5)} fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <>
        <circle cx="66" cy="38" r="20" fill={c} />
        <path d={wave(60, 9)} fill={a} />
        <path d={wave(80, 6)} fill={b} />
      </>
    ),
    ({ a, b, c }) => (
      <g fill="none" stroke={a} strokeWidth="3" strokeLinecap="round">
        <path d={waveLine(30)} />
        <path d={waveLine(46)} stroke={c} />
        <path d={waveLine(62)} />
        <path d={wave(80, 6)} fill={b} stroke="none" />
      </g>
    ),
  ],
  stripe: [
    ({ a, b, c }) => (
      <>
        <path d="M0 0h10v100H0ZM20 0h10v100H20ZM40 0h10v100H40ZM60 0h10v100H60ZM80 0h10v100H80Z" fill={a} />
        <rect x="30" y="18" width="40" height="90" rx="20" fill={b} />
        <circle cx="50" cy="28" r="7" fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <>
        <g transform="rotate(-32 50 50)" fill={a}>
          <path d="M-40 6h180v10H-40ZM-40 30h180v10H-40ZM-40 54h180v10H-40ZM-40 78h180v10H-40Z" />
        </g>
        <circle cx="50" cy="50" r="22" fill={b} />
        <circle cx="50" cy="50" r="8" fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <>
        <path d="M8 0v100M20 0v100M32 0v100M44 0v100M56 0v100M68 0v100M80 0v100M92 0v100" stroke={a} strokeWidth="1.6" />
        <rect x="22" y="30" width="56" height="78" rx="4" fill={b} />
        <path d="M22 54h56" stroke={c} strokeWidth="3" />
      </>
    ),
  ],
  grid: [
    ({ a, b, c }) => (
      <>
        <path d={gridLines(12.5)} stroke={a} strokeWidth="0.6" />
        <rect x="50" y="25" width="37.5" height="37.5" fill={b} />
        <rect x="12.5" y="62.5" width="25" height="25" fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <>
        <path d={gridLines(20)} stroke={a} strokeWidth="0.6" />
        <path d="M14 100V58h16v42ZM42 100V30h16v70ZM70 100V44h16v56Z" fill={b} />
        <rect x="42" y="18" width="16" height="6" fill={c} />
      </>
    ),
    ({ a, b, c }) => (
      <>
        <path d={gridLines(10)} stroke={a} strokeWidth="0.5" />
        <path d="M40 14h20v26h26v20H60v26H40V60H14V40h26Z" fill={b} />
        <rect x="44" y="44" width="12" height="12" fill={c} />
      </>
    ),
  ],
};

/** Outline of the monogram badge, one per motif (viewBox 0 0 100 100). */
export const badgePath: Record<Motif, string> = {
  arch: "M12 100V48a38 38 0 0 1 76 0v52Z",
  circle: "M50 0a50 50 0 1 1 0 100A50 50 0 1 1 50 0Z",
  wave: "M30 0h40a30 30 0 0 1 30 30v40a30 30 0 0 1-30 30H30A30 30 0 0 1 0 70V30A30 30 0 0 1 30 0Z",
  stripe: "M50 0a32 32 0 0 1 32 32v36a32 32 0 0 1-64 0V32A32 32 0 0 1 50 0Z",
  grid: "M0 0h100v100H0Z",
};

/** Monogram inside the motif shape. Size follows font-size (1em square). */
export function Monogram({
  motif,
  letters,
  fill,
  color,
  className,
}: {
  motif: Motif;
  letters: string;
  fill: string;
  color: string;
  className?: string;
}) {
  const size = letters.length > 1 ? 44 : 60;
  const y = motif === "arch" ? 64 : 53;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <path d={badgePath[motif]} fill={fill} />
      <text
        x="50"
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={size}
        className={styles.display}
      >
        {letters}
      </text>
    </svg>
  );
}

/**
 * The motif as a CSS background (no DOM nodes), for small thumbnails in lists and grids.
 * `a` draws the shape, `b` the detail, on top of `base`.
 */
export function motifTile(motif: Motif, { base, a, b }: { base: string; a: string; b: string }): string {
  switch (motif) {
    case "arch":
      return `radial-gradient(circle at 50% 58%, ${a} 0 30%, transparent 30.5%), linear-gradient(${a}, ${a}) 50% 100% / 60% 42% no-repeat, radial-gradient(circle at 74% 24%, ${b} 0 9%, transparent 9.5%), ${base}`;
    case "circle":
      return `radial-gradient(circle at 50% 54%, ${b} 0 18%, ${a} 18.5% 36%, transparent 36.5%), ${base}`;
    case "wave":
      return `radial-gradient(70% 46% at 22% 100%, ${a} 0 99%, transparent 100%), radial-gradient(70% 34% at 84% 100%, ${b} 0 99%, transparent 100%), ${base}`;
    case "stripe":
      return `radial-gradient(circle at 50% 46%, ${b} 0 14%, transparent 14.5%), repeating-linear-gradient(90deg, ${a} 0 14%, transparent 14% 28%), ${base}`;
    case "grid":
      return `linear-gradient(${b}, ${b}) 72% 30% / 34% 34% no-repeat, linear-gradient(90deg, ${a} 0 1.5%, transparent 1.5%) 0 0 / 25% 100%, linear-gradient(${a} 0 1.5%, transparent 1.5%) 0 0 / 100% 25%, ${base}`;
  }
}
