import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DOT, LOGO_VIEWBOX, MARK_PATH, WORD_PATH } from "@/components/brand/logo-paths";
import type { ClientTheme } from "@/content/projects";

/*
  Share images for /projets and the case studies, in the same language as the site image
  (src/app/opengraph-image.tsx): sky grid page, white sheet, cards spilling out of its bottom edge.
  Client colours only appear inside the small brand cards, as on the site.
*/

export const ogSize = { width: 1200, height: 630 };

const navy = "#0F1045";
const coral = "#FF5C5C";
const sky = "#E3ECFF";
const shadow = "#07082A";

// Satori needs static font files (variable fonts render with the wrong weight).
const fontsDir = join(process.cwd(), "src/assets/fonts");
const fontsPromise = Promise.all([
  readFile(join(fontsDir, "bricolage-grotesque-latin-600-normal.woff")),
  readFile(join(fontsDir, "bricolage-grotesque-latin-500-normal.woff")),
]);

const [logoX, logoY, logoW, logoH] = LOGO_VIEWBOX.split(" ").map(Number);

function Logo({ height = 44 }: { height?: number }) {
  return (
    <svg width={(logoW / logoH) * height} height={height} viewBox={`${logoX} ${logoY} ${logoW} ${logoH}`}>
      <path d={MARK_PATH + WORD_PATH} fill={navy} />
      <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill={coral} />
    </svg>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 19,
        fontWeight: 500,
        letterSpacing: 2.4,
        textTransform: "uppercase",
        color: "rgba(15,16,69,0.65)",
      }}
    >
      <div style={{ width: 10, height: 10, borderRadius: 10, background: coral }} />
      {children}
    </div>
  );
}

function ConceptPill() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 18px",
        borderRadius: 40,
        border: "2px dashed rgba(15,16,69,0.4)",
        background: sky,
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 2.2,
        textTransform: "uppercase",
        color: navy,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: 8, background: coral }} />
      Projet concept
    </div>
  );
}

/** A small brand card in the client's colours: monogram, name, palette. */
function BrandCard({ theme, left, top, rotate, scale = 1 }: { theme: ClientTheme; left: number; top: number; rotate: number; scale?: number }) {
  const w = 270 * scale;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: w,
        height: w * 1.25,
        borderRadius: 28 * scale,
        background: theme.bg,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 24px 50px -18px rgba(15,16,69,0.5)",
        display: "flex",
        flexDirection: "column",
        padding: 22 * scale,
        gap: 14 * scale,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: w * 0.62,
          borderRadius: 18 * scale,
          background: theme.accent,
          padding: 18 * scale,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64 * scale,
            height: 64 * scale,
            borderRadius: 16 * scale,
            background: theme.surface,
            color: theme.accent,
            fontSize: 34 * scale,
            fontWeight: 600,
          }}
        >
          {theme.monogram}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 28 * scale, fontWeight: 600, letterSpacing: -0.8 * scale, color: theme.ink }}>
        {theme.brand}
      </div>
      <div style={{ display: "flex", gap: 8 * scale }}>
        {[theme.surface, theme.ink, theme.accent, theme.accent2].map((c, i) => (
          <div key={i} style={{ width: 40 * scale, height: 40 * scale, borderRadius: 12 * scale, background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
        ))}
      </div>
    </div>
  );
}

function Page({ children, cards }: { children: React.ReactNode; cards: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: sky,
        backgroundImage:
          "linear-gradient(to right, rgba(15,16,69,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,16,69,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        fontFamily: "Bricolage",
        color: navy,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 40,
          width: 1120,
          height: 494,
          borderRadius: 40,
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          padding: "52px 64px",
        }}
      >
        {children}
      </div>
      {cards}
    </div>
  );
}

async function respond(element: React.ReactElement) {
  const [semibold, medium] = await fontsPromise;
  return new ImageResponse(element, {
    ...ogSize,
    fonts: [
      { name: "Bricolage", data: semibold, weight: 600, style: "normal" },
      { name: "Bricolage", data: medium, weight: 500, style: "normal" },
    ],
  });
}

/** Case study: client, headline and the concept tag, with the client's brand card spilling out. */
export function caseStudyImage(project: {
  client: string;
  sector: string;
  year: string;
  headline: string;
  concept: boolean;
  theme: ClientTheme;
}) {
  return respond(
    <Page
      cards={
        <>
          <BrandCard theme={{ ...project.theme, bg: project.theme.accent2, accent: project.theme.surface }} left={846} top={250} rotate={-9} scale={0.9} />
          <BrandCard theme={project.theme} left={880} top={300} rotate={6} />
        </>
      }
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        {project.concept ? <ConceptPill /> : null}
      </div>
      <div style={{ display: "flex", marginTop: 52 }}>
        <Label>
          {project.client} · {project.sector} · {project.year}
        </Label>
      </div>
      <div style={{ display: "flex", width: 720, marginTop: 22, fontSize: 60, fontWeight: 600, lineHeight: 1, letterSpacing: -2.2 }}>
        {project.headline}
      </div>
    </Page>,
  );
}

/** Projects index: "Projets" with the sticker, and a fan of the clients' brand cards. */
export function projectsIndexImage(themes: ClientTheme[], sticker: string) {
  const fan = themes.slice(0, 5);
  const poses = [
    { left: 690, top: 372, rotate: -16 },
    { left: 778, top: 334, rotate: -7 },
    { left: 866, top: 318, rotate: 2 },
    { left: 952, top: 334, rotate: 10 },
    { left: 1032, top: 372, rotate: 18 },
  ];
  return respond(
    <Page
      cards={
        <>
          {fan.map((theme, i) => (
            <BrandCard key={theme.brand} theme={theme} {...poses[i]} scale={0.72} />
          ))}
        </>
      }
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        <Label>Portfolio</Label>
      </div>
      <div style={{ display: "flex", marginTop: 40, fontSize: 168, fontWeight: 600, lineHeight: 0.9, letterSpacing: -7 }}>Projets</div>
      <div style={{ display: "flex", marginTop: 6, marginLeft: 40 }}>
        <div
          style={{
            display: "flex",
            padding: "2px 22px 10px",
            borderRadius: 14,
            background: coral,
            color: navy,
            fontSize: 54,
            fontWeight: 600,
            letterSpacing: -1.6,
            lineHeight: 1.05,
            transform: "rotate(-4deg)",
            boxShadow: `0 6px 0 0 ${shadow}`,
          }}
        >
          {sticker}
        </div>
      </div>
    </Page>,
  );
}
