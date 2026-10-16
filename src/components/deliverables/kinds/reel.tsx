import type { ClientTheme } from "@/content/projects";
import { cn } from "@/lib/cn";
import type { DeliverableCopy } from "../copy";
import { styles } from "../styles";
import { Phone } from "../device";
import { MockIcon } from "../icons";
import { Monogram, MotifArt } from "../motif";
import { handleOf } from "../theme";

const PHONE_W = "min(54cqw, 46cqh)";

/** Vertical video in a phone, with the full Reels interface on top. */
export function Reel({ theme, copy }: { theme: ClientTheme; copy: DeliverableCopy }) {
  const handle = handleOf(theme.brand);
  const audio = `Son original · ${handle}`;

  return (
    <div className="absolute inset-0">
      <MotifArt
        motif={theme.motif}
        variant={1}
        palette={{ a: "var(--surface)", b: "var(--surface)", c: "var(--accent)" }}
        className="absolute inset-0 size-full"
      />

      <Phone width={PHONE_W} ratio="9 / 17" island={false} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* the "video" */}
        <div className="absolute inset-0 bg-(--accent)">
          <div className={cn(styles.drift, "absolute -inset-[8%]")}>
            <MotifArt
              motif={theme.motif}
              variant={0}
              palette={{ a: "var(--deep)", b: "var(--accent2)", c: "var(--surface)" }}
              className="size-full"
            />
          </div>
          <div
            className={cn(
              styles.driftAlt,
              "absolute right-[-12cqw] top-[18cqw] size-[38cqw] rounded-full border-[2.6cqw] border-(--surface)/85",
            )}
          />
        </div>

        <div className="absolute inset-x-0 top-0 h-[26%] bg-linear-to-b from-(--deep)/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[36%] bg-linear-to-t from-(--deep)/70 via-(--deep)/25 to-transparent" />

        {/* text overlay, as edited in the Reel */}
        <div className="absolute left-[8cqw] top-[34%] max-w-[72cqw] -rotate-3">
          <span
            className={cn(
              styles.display,
              "box-decoration-clone rounded-[calc(var(--r)*2cqw+0.6cqw)] bg-(--surface) px-[2.6cqw] py-[1cqw] text-[9.5cqw] leading-[1.32] text-(--ink)",
            )}
          >
            {copy.reelOverlay}
          </span>
        </div>

        {/* top UI */}
        <div className="absolute inset-x-[5cqw] top-[5cqw] flex gap-[1.4cqw]">
          <span className="h-[0.9cqw] flex-1 rounded-full bg-white" />
          <span className="relative h-[0.9cqw] flex-1 overflow-hidden rounded-full bg-white/35">
            <span className={cn(styles.progress, "absolute inset-0 rounded-full bg-white")} />
          </span>
          <span className="h-[0.9cqw] flex-1 rounded-full bg-white/35" />
        </div>
        <div className="absolute inset-x-[6cqw] top-[10cqw] flex items-center justify-between font-sans text-white">
          <span className="text-[6.4cqw] font-bold tracking-[-0.02em]">Reels</span>
          <MockIcon name="camera" className="size-[7cqw]" />
        </div>

        {/* right column */}
        <div className="absolute bottom-[20cqw] right-[4.4cqw] flex flex-col items-center gap-[6cqw] text-white">
          <MockIcon name="heart" filled className="size-[8cqw] text-(--accent2)" strokeWidth={1.4} />
          <MockIcon name="comment" className="size-[7.6cqw]" />
          <MockIcon name="send" className="size-[7.4cqw]" />
          <MockIcon name="more" className="size-[7cqw]" />
          <span className="size-[7.4cqw] rounded-[1.8cqw] border-[0.6cqw] border-white bg-(--accent)" />
        </div>

        {/* bottom UI */}
        <div className="absolute inset-x-[5.6cqw] bottom-[6cqw] font-sans text-white">
          <div className="flex items-center gap-[2.4cqw]">
            <Monogram motif="circle" letters={theme.monogram} fill="#fff" color="var(--deep)" className="size-[8.6cqw] shrink-0" />
            <span className="text-[4.4cqw] font-semibold">{handle}</span>
            <span className="rounded-[1.6cqw] border-[0.35cqw] border-white/70 px-[2cqw] py-[0.7cqw] text-[3.6cqw] font-semibold leading-none">
              Suivre
            </span>
          </div>
          <p className={cn(styles.ellipsis, "mt-[3cqw] max-w-[74cqw] text-[3.9cqw] leading-tight")}>{copy.reelCaption}</p>
          <div className="mt-[2.6cqw] flex max-w-[60cqw] items-center gap-[1.6cqw] text-[3.5cqw]">
            <MockIcon name="music" className="size-[3.6cqw] shrink-0" />
            <span className="relative min-w-0 overflow-hidden [mask-image:linear-gradient(90deg,#000_80%,transparent)]">
              <span className={cn(styles.ticker, "flex w-max gap-[6cqw] whitespace-nowrap")}>
                <span>{audio}</span>
                <span>{audio}</span>
              </span>
            </span>
          </div>
        </div>
      </Phone>

      {/* edit timeline floating over the phone: we film and we edit */}
      <Timeline />
    </div>
  );
}

function Timeline() {
  const clips = [
    { w: 26, c: "var(--accent)" },
    { w: 18, c: "var(--accent2)" },
    { w: 32, c: "var(--ink)" },
    { w: 24, c: "var(--accent)" },
  ];
  return (
    <div className="absolute left-[max(4cqw,calc(50cqw-40cqh))] top-[56%] w-[min(44cqw,38cqh)] rotate-[-5deg] rounded-[calc(var(--r)*1.6cqw+0.6cqw)] bg-(--surface) p-[1.4cqw] shadow-[0_1.4cqw_3cqw_-1.6cqw_color-mix(in_srgb,var(--deep)_60%,transparent)]">
      <div className="mb-[1.2cqw] flex items-center justify-between px-[0.4cqw]">
        <span className={cn(styles.mono, "flex items-center gap-[0.8cqw] text-[1.7cqw]")}>
          <span className={cn(styles.blink, "size-[1.3cqw] rounded-full bg-(--accent)")} />
          Montage
        </span>
        <span className={cn(styles.mono, "tabular text-[1.7cqw] opacity-60")}>00:24</span>
      </div>
      <div className="relative flex h-[4.6cqw] gap-[0.5cqw]">
        {clips.map((clip, i) => (
          <span key={i} className="h-full rounded-[0.7cqw]" style={{ flexGrow: clip.w, flexBasis: 0, background: clip.c }} />
        ))}
        <span className={cn(styles.playhead, "absolute -inset-y-[0.6cqw] left-0 w-full border-l-[0.4cqw] border-(--ink)")} />
      </div>
    </div>
  );
}
