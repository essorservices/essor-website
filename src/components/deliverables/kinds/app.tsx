import type { ClientTheme } from "@/content/projects";
import { cn } from "@/lib/cn";
import type { DeliverableCopy } from "../copy";
import { styles } from "../styles";
import { Phone, StatusBar } from "../device";
import { mockIconPath, type MockIconName } from "../icons";
import { MotifArt, motifTile } from "../motif";

const tabs: MockIconName[] = ["home", "calendar", "bag", "user"];

/** Mobile app screen with a progress widget popped out of the phone. */
export function App({ theme, copy }: { theme: ClientTheme; copy: DeliverableCopy }) {
  const { appCard, appRing } = copy;
  const firstName = copy.greeting.split(" ").at(-1) ?? "";

  return (
    <div className="absolute inset-0">
      <MotifArt
        motif={theme.motif}
        variant={2}
        palette={{ a: "var(--surface)", b: "var(--surface)", c: "var(--accent)" }}
        className="absolute inset-0 size-full"
      />

      <Phone
        width="min(50cqw, 40cqh)"
        className="right-[max(8cqw,calc(50cqw-30cqh))] top-1/2 -translate-y-1/2"
        screenClassName="bg-(--bg)"
      >
        <StatusBar />

        <div className="mt-[7cqw] flex items-center justify-between px-[7cqw]">
          <div>
            <div className={cn(styles.mono, "text-[3.2cqw] opacity-60")}>{theme.brand}</div>
            <div className={cn(styles.display, "mt-[2cqw] whitespace-nowrap text-[7.6cqw]")}>{copy.greeting}</div>
          </div>
          <span className="grid size-[10.5cqw] place-items-center rounded-full bg-(--accent2) font-sans text-[4.4cqw] font-semibold text-(--on-accent2)">
            {firstName.slice(0, 1)}
          </span>
        </div>

        <div className="relative mx-[6cqw] mt-[6cqw] overflow-hidden rounded-[calc(var(--r)*6cqw+1.6cqw)] bg-(--accent) p-[6cqw] text-(--on-accent)">
          <MotifArt
            motif={theme.motif}
            variant={2}
            palette={{ a: "var(--on-accent)", b: "var(--on-accent)", c: "var(--on-accent)" }}
            className="absolute -right-[10cqw] -top-[8cqw] size-[46cqw] opacity-20"
          />
          <div className={cn(styles.mono, "relative text-[3cqw] opacity-80")}>{appCard.label}</div>
          <div className={cn(styles.display, "relative mt-[3cqw] max-w-[64cqw] text-[8.6cqw] leading-[1]")}>{appCard.title}</div>
          <div className="relative mt-[2.4cqw] font-sans text-[3.8cqw] opacity-85">{appCard.meta}</div>
          <div className="relative mt-[5cqw] flex items-center justify-between">
            <span className="rounded-[calc(var(--r)*10cqw+1.2cqw)] bg-(--on-accent) px-[4cqw] py-[2.2cqw] font-sans text-[3.6cqw] font-semibold text-(--accent)">
              {appCard.action}
            </span>
            <span className="grid size-[9cqw] place-items-center rounded-full border-[0.5cqw] border-(--on-accent)/40 font-sans text-[4.4cqw] font-semibold leading-none">
              →
            </span>
          </div>
        </div>

        <div className="mt-[7cqw] flex items-baseline justify-between px-[7cqw]">
          <span className={cn(styles.display, "text-[5.4cqw]")}>{copy.appListTitle}</span>
          <span className="font-sans text-[3.4cqw] opacity-60">Tout voir</span>
        </div>
        <div className="mt-[2.4cqw] px-[6cqw]">
          {copy.appRows.map(([title, meta], i) => (
            <div key={title} className="flex items-center gap-[3.4cqw] border-b-[0.3cqw] border-(--ink)/8 py-[2.8cqw] last:border-0">
              <span
                className="size-[11cqw] shrink-0 rounded-[calc(var(--r)*3cqw+0.8cqw)]"
                style={{
                  background: motifTile(
                    theme.motif,
                    i === 1
                      ? { base: "var(--accent2)", a: "var(--accent)", b: "var(--surface)" }
                      : { base: "var(--surface)", a: "var(--accent2)", b: "var(--accent)" },
                  ),
                }}
              />
              <span className="min-w-0 flex-1 font-sans">
                <span className={cn(styles.ellipsis, "block text-[4cqw] font-semibold")}>{title}</span>
                <span className="mt-[0.8cqw] block text-[3.3cqw] opacity-60">{meta}</span>
              </span>
              <span className="text-[4.4cqw] opacity-40">›</span>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t-[0.3cqw] border-(--ink)/8 bg-(--surface) pb-[6cqw] pt-[3.4cqw]">
          <svg
            viewBox="0 0 334 30"
            className="mx-auto h-[7cqw] w-[78cqw]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            focusable="false"
          >
            {tabs.map((t, i) => (
              <path
                key={t}
                d={mockIconPath[t]}
                transform={`translate(${i * 103.3} 0)`}
                fill={i === 0 ? "var(--accent)" : "none"}
                stroke={i === 0 ? "var(--accent)" : "currentColor"}
                strokeOpacity={i === 0 ? 1 : 0.45}
              />
            ))}
            <circle cx="12" cy="28.4" r="1.6" fill="var(--accent)" stroke="none" />
          </svg>
          <span className="absolute bottom-[1.8cqw] left-1/2 h-[1.1cqw] w-[32cqw] -translate-x-1/2 rounded-full bg-(--ink)/80" />
        </div>
      </Phone>

      <RingWidget ring={appRing} />
    </div>
  );
}

function RingWidget({ ring }: { ring: DeliverableCopy["appRing"] }) {
  const rest = 100 - (ring.done / ring.total) * 100;
  return (
    <div
      className={cn(
        styles.float,
        "absolute left-[max(5cqw,calc(50cqw-44cqh))] top-[54%] w-[min(40cqw,33cqh)] rotate-[-6deg] rounded-[calc(var(--r)*2.6cqw+0.8cqw)] bg-(--surface) shadow-[0_0_0_0.25cqw_color-mix(in_srgb,var(--ink)_8%,transparent),0_2cqw_4cqw_-2cqw_color-mix(in_srgb,var(--deep)_55%,transparent)]",
      )}
      style={{ containerType: "inline-size" }}
    >
      <div className="p-[8cqw]">
        <div className="flex items-center justify-between">
          <span className={cn(styles.mono, "text-[5.4cqw] opacity-70")}>{ring.label}</span>
          <span className="size-[3.4cqw] rounded-full bg-(--accent)" />
        </div>
        <div className="relative mx-auto mt-[7cqw] size-[62cqw]">
          <svg viewBox="0 0 40 40" className="size-full -rotate-90" aria-hidden focusable="false">
            <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="5" />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap={ring.done === ring.total ? "butt" : "round"}
              pathLength={100}
              strokeDasharray="100"
              className={styles.ring}
              style={{ "--ring-rest": rest } as React.CSSProperties}
            />
          </svg>
          <span className={cn(styles.display, "tabular absolute inset-0 grid place-items-center text-[17cqw]")}>
            {ring.done}
          </span>
        </div>
        <div className="mt-[6cqw] text-center font-sans text-[6cqw] leading-tight">
          <span className="font-semibold">
            {ring.done} {ring.unit}
          </span>{" "}
          <span className="opacity-60">sur {ring.total}</span>
        </div>
      </div>
    </div>
  );
}
