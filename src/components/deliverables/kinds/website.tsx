import type { ClientTheme } from "@/content/projects";
import { cn } from "@/lib/cn";
import type { DeliverableCopy } from "../copy";
import { styles } from "../styles";
import { Browser, Phone, StatusBar } from "../device";
import { Monogram, MotifArt, motifTile } from "../motif";
import { domainOf } from "../theme";

const pill = "rounded-[calc(var(--r)*10cqw+0.5cqw)]";
const soft = "rounded-[calc(var(--r)*1.8cqw+0.3cqw)]";

/** Landing page in a desktop browser, with its mobile version overlapping the corner. */
export function Website({ theme, copy }: { theme: ClientTheme; copy: DeliverableCopy }) {
  return (
    <div className="absolute inset-0">
      <Browser url={domainOf(theme.brand)} width="88cqw" className="bottom-[-8cqw] left-[6cqw] top-[7cqw]">
        <nav className="flex h-[9cqw] items-center gap-[3.4cqw] px-[5cqw]">
          <Monogram motif={theme.motif} letters={theme.monogram} fill="var(--ink)" color="var(--bg)" className="size-[4.4cqw] shrink-0" />
          <span className={cn(styles.display, "mr-auto whitespace-nowrap text-[3cqw]")}>{theme.brand}</span>
          {copy.nav.map((l) => (
            <span key={l} className="whitespace-nowrap font-sans text-[2.1cqw] font-medium tracking-normal opacity-70">
              {l}
            </span>
          ))}
          <span className={cn(pill, "bg-(--ink) px-[2.4cqw] py-[1.3cqw] font-sans text-[2.1cqw] font-semibold tracking-normal text-(--bg)")}>
            {copy.cta}
          </span>
        </nav>

        <div className="grid grid-cols-[1.12fr_1fr] items-center gap-[4cqw] px-[5cqw] pt-[4cqw]">
          <div>
            <span
              className={cn(
                styles.mono,
                "flex items-center gap-[1cqw] text-[1.8cqw] opacity-70 before:size-[1.3cqw] before:rounded-full before:bg-(--accent) before:content-['']",
              )}
            >
              {copy.eyebrow}
            </span>
            <div className={cn(styles.display, "mt-[3cqw] text-[9.4cqw] leading-[0.92]")}>{theme.line}</div>
            <p className="mt-[3cqw] max-w-[38cqw] font-sans text-[2.3cqw] font-normal leading-[1.45] tracking-normal normal-case opacity-70">
              {copy.heroSub}
            </p>
            <div className="mt-[4cqw] flex items-center gap-[3cqw] font-sans tracking-normal normal-case">
              <span className="relative">
                <span className={cn(styles.press, pill, "block bg-(--accent) px-[3.4cqw] py-[1.9cqw] text-[2.4cqw] font-semibold text-(--on-accent)")}>
                  {copy.cta}
                </span>
                <Cursor />
              </span>
              <span className="text-[2.3cqw] font-semibold">{copy.secondary}&nbsp;→</span>
            </div>
          </div>
          <MotifArt
            motif={theme.motif}
            variant={0}
            palette={{ base: "var(--accent2)", a: "var(--accent)", b: "var(--surface)", c: "var(--ink)" }}
            className={cn(soft, "aspect-[1/1.08] w-full")}
          />
        </div>

        <div className="mt-[7cqw] px-[5cqw]">
          <div className="flex items-end justify-between border-t-[0.2cqw] border-(--ink)/12 pt-[2.6cqw]">
            <span className={cn(styles.display, "text-[3.4cqw]")}>{copy.nav[0]}</span>
            <span className={cn(styles.mono, "text-[1.7cqw] opacity-60")}>Tout voir</span>
          </div>
          <div className="mt-[2.6cqw] grid grid-cols-3 gap-[2.4cqw]">
            {copy.cards.map((c, i) => (
              <div key={c}>
                {i < 2 ? (
                  <MotifArt
                    motif={theme.motif}
                    variant={((i + 1) % 3) as 0 | 1 | 2}
                    palette={
                      i === 1
                        ? { base: "var(--ink)", a: "var(--accent)", b: "var(--accent2)", c: "var(--surface)" }
                        : { base: "var(--surface)", a: "var(--accent2)", b: "var(--accent)", c: "var(--ink)" }
                    }
                    className={cn(soft, "aspect-[4/3] w-full")}
                  />
                ) : (
                  <div
                    className={cn(soft, "aspect-[4/3]")}
                    style={{ background: motifTile(theme.motif, { base: "var(--surface)", a: "var(--accent2)", b: "var(--accent)" }) }}
                  />
                )}
                <div className="mt-[1.4cqw] font-sans text-[2.2cqw] font-semibold tracking-normal normal-case">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </Browser>

      <Phone width="27cqw" className="right-[3.4cqw] top-[58cqh]" screenClassName="bg-(--bg)">
        <StatusBar />
        <div className="mt-[6cqw] flex items-center gap-[2.6cqw] px-[7cqw]">
          <Monogram motif={theme.motif} letters={theme.monogram} fill="var(--ink)" color="var(--bg)" className="size-[9cqw] shrink-0" />
          <span className={cn(styles.display, "mr-auto whitespace-nowrap text-[6cqw]")}>{theme.brand}</span>
          <span className="h-[3.4cqw] w-[6cqw] border-y-[0.7cqw] border-current" />
        </div>
        <MotifArt
          motif={theme.motif}
          variant={0}
          palette={{ base: "var(--accent2)", a: "var(--accent)", b: "var(--surface)", c: "var(--ink)" }}
          className="mx-[7cqw] mt-[7cqw] aspect-[1/0.86] w-[86cqw] rounded-[calc(var(--r)*5cqw+1cqw)]"
        />
        <div className={cn(styles.display, "mt-[7cqw] px-[7cqw] text-[13cqw] leading-[0.92]")}>{theme.line}</div>
        <div className={cn("mx-[7cqw] mt-[7cqw] py-[3.6cqw] text-center font-sans text-[5cqw] font-semibold tracking-normal normal-case", "rounded-[calc(var(--r)*20cqw+1.4cqw)] bg-(--accent) text-(--on-accent)")}>
          {copy.cta}
        </div>
      </Phone>
    </div>
  );
}

/** Pointer that glides to the call to action and clicks it. */
function Cursor() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(styles.cursor, "absolute left-[72%] top-[58%] size-[3.6cqw]")}
      aria-hidden
      focusable="false"
    >
      <path d="M4 2.5 19.5 12l-6.9 1.6-3.4 6.4Z" fill="var(--ink)" stroke="var(--surface)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
