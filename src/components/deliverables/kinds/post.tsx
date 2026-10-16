import type { ClientTheme } from "@/content/projects";
import { cn } from "@/lib/cn";
import type { DeliverableCopy } from "../copy";
import { styles } from "../styles";
import { MockIcon } from "../icons";
import { Monogram, MotifArt } from "../motif";
import { handleOf } from "../theme";

const POST_W = "min(72cqw, 57cqh)";
const radius = "rounded-[calc(var(--r)*2.4cqw+1cqw)]";

/** Instagram post: header, square visual with the campaign headline, actions and caption. */
export function Post({ theme, copy }: { theme: ClientTheme; copy: DeliverableCopy }) {
  const handle = handleOf(theme.brand);

  return (
    <div className="absolute inset-0">
      {/* next slide of the carousel, peeking behind */}
      <div
        className={cn(radius, "absolute left-1/2 top-1/2 overflow-hidden")}
        style={{ width: POST_W, aspectRatio: "1 / 1.4", transform: "translate(-42%, -54%) rotate(7deg)" }}
      >
        <MotifArt
          motif={theme.motif}
          variant={1}
          palette={{ base: "var(--accent2)", a: "var(--surface)", b: "var(--accent)", c: "var(--ink)" }}
          className="size-full"
        />
      </div>

      <div
        className={cn(
          radius,
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-(--surface) font-sans shadow-[0_0_0_0.25cqw_color-mix(in_srgb,var(--ink)_8%,transparent),0_2.4cqw_5cqw_-2.6cqw_color-mix(in_srgb,var(--deep)_60%,transparent)]",
        )}
        style={{ width: POST_W, containerType: "inline-size" }}
      >
        <div className="flex items-center gap-[2.6cqw] px-[3.6cqw] py-[3cqw]">
          <span className="rounded-full border-[0.6cqw] border-(--accent) p-[0.6cqw]">
            <Monogram motif="circle" letters={theme.monogram} fill="var(--ink)" color="var(--surface)" className="size-[8cqw]" />
          </span>
          <span className="mr-auto leading-tight">
            <span className="block text-[3.7cqw] font-semibold">{handle}</span>
            <span className="block text-[3cqw] opacity-60">{copy.postMeta}</span>
          </span>
          <MockIcon name="more" className="size-[5.4cqw]" />
        </div>

        <div className="relative aspect-square overflow-hidden bg-(--accent) text-(--on-accent)">
          <div className={cn(styles.zoom, "absolute inset-x-0 bottom-0 h-[56%] origin-bottom")}>
            <MotifArt
              motif={theme.motif}
              variant={0}
              palette={{ a: "var(--surface)", b: "var(--ink)", c: "var(--accent2)" }}
              className="size-full"
            />
          </div>
          <div className="relative p-[6cqw]">
            <div className={cn(styles.display, "max-w-[80cqw] text-[11.5cqw] leading-[0.92]")}>{copy.postHeadline}</div>
            <span className={cn(styles.mono, "mt-[3.6cqw] inline-block rounded-full border-[0.4cqw] border-current px-[2.4cqw] py-[1.2cqw] text-[2.6cqw]")}>
              {copy.postTag}
            </span>
          </div>
          <span className="absolute right-[3.4cqw] top-[3.4cqw] rounded-full bg-(--deep)/60 px-[2.2cqw] py-[1cqw] text-[2.8cqw] font-medium text-white tabular">
            1/3
          </span>
        </div>

        <div className="relative flex items-center gap-[4cqw] px-[3.6cqw] pt-[3.4cqw]">
          <MockIcon name="heart" filled className={cn(styles.pop, "size-[6.6cqw] text-(--accent)")} strokeWidth={1.4} />
          <MockIcon name="comment" className="size-[6.2cqw]" />
          <MockIcon name="send" className="size-[6cqw]" />
          <span className="absolute left-1/2 flex -translate-x-1/2 gap-[1.2cqw]">
            <span className="size-[1.4cqw] rounded-full bg-(--accent)" />
            <span className="size-[1.4cqw] rounded-full bg-(--ink)/25" />
            <span className="size-[1.4cqw] rounded-full bg-(--ink)/25" />
          </span>
          <MockIcon name="bookmark" className="ml-auto size-[6cqw]" />
        </div>
        <p className="px-[3.6cqw] pt-[2.6cqw] text-[3.3cqw] leading-tight">
          Aimé par <b className="font-semibold">{copy.liker}</b> et d’autres personnes
        </p>
        <p className="line-clamp-2 px-[3.6cqw] pb-[4cqw] pt-[1.4cqw] text-[3.3cqw] leading-[1.35]">
          <b className="font-semibold">{handle}</b> <span className="opacity-80">{copy.postCaption}</span>
        </p>
      </div>
    </div>
  );
}
