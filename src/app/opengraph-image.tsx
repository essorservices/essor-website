import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DISC, DOT, LOGO_VIEWBOX, MARK_PATH, WORD_PATH } from "@/components/brand/logo-paths";
import { hero } from "@/content/home";
import { site } from "@/content/site";

export const alt = `${site.name} | ${site.tagline} ${hero.sticker}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs static font files (variable fonts render with the wrong weight).
// Bricolage Grotesque, SIL Open Font License (src/assets/fonts/OFL.txt).
const fontsDir = join(process.cwd(), "src/assets/fonts");
const [semibold, medium] = await Promise.all([
  readFile(join(fontsDir, "bricolage-grotesque-latin-600-normal.woff")),
  readFile(join(fontsDir, "bricolage-grotesque-latin-500-normal.woff")),
]);

const navy = "#0F1045";
const coral = "#FF5C5C";
const sky = "#E3ECFF";
const shadow = "#07082A";

const [logoX, logoY, logoW, logoH] = LOGO_VIEWBOX.split(" ").map(Number);
const logoHeight = 46;

/** A deliverable card for the fan spilling out of the white sheet (as on the hero). */
function Card({ left, top, rotate, bg, children }: { left: number; top: number; rotate: number; bg: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 190,
        height: 250,
        borderRadius: 26,
        background: bg,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 24px 50px -18px rgba(15,16,69,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

export default async function OpengraphImage() {
  return new ImageResponse(
    (
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
        {/* The white sheet */}
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
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <svg width={(logoW / logoH) * logoHeight} height={logoHeight} viewBox={`${logoX} ${logoY} ${logoW} ${logoH}`}>
              <path d={MARK_PATH + WORD_PATH} fill={navy} />
              <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill={coral} />
            </svg>
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
              {hero.eyebrow}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 64, fontSize: 92, fontWeight: 600, lineHeight: 0.96, letterSpacing: -3.4 }}>
            <div style={{ display: "flex" }}>{hero.line1}</div>
            <div style={{ display: "flex" }}>{hero.line2}</div>
          </div>

          <div style={{ display: "flex", marginTop: 30 }}>
            <div
              style={{
                display: "flex",
                padding: "4px 22px 12px",
                borderRadius: 16,
                background: coral,
                color: navy,
                fontSize: 66,
                fontWeight: 600,
                letterSpacing: -2,
                lineHeight: 1.05,
                transform: "rotate(-4deg)",
                boxShadow: `0 6px 0 0 ${shadow}`,
              }}
            >
              {hero.sticker}
            </div>
          </div>
        </div>

        {/* Fan of deliverables spilling out of the bottom of the sheet */}
        <Card left={738} top={398} rotate={-15} bg={navy}>
          <svg width={112} height={112} viewBox={`${-DISC.r} ${DISC.cy - DISC.r} ${DISC.r * 2} ${DISC.r * 2}`}>
            <path d={MARK_PATH} fill="#FFFFFF" />
            <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill={coral} />
          </svg>
        </Card>
        <Card left={878} top={350} rotate={-3} bg={coral}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 92,
              background: navy,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={34} height={38} viewBox="0 0 34 38">
              <path d="M4 3.5v31a2 2 0 0 0 3 1.7l25-15.5a2 2 0 0 0 0-3.4L7 1.8a2 2 0 0 0-3 1.7Z" fill={coral} />
            </svg>
          </div>
        </Card>
        <Card left={1012} top={386} rotate={12} bg="#FFFFFF">
          <div style={{ display: "flex", flexDirection: "column", width: 136, gap: 11 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: 9, background: coral }} />
              <div style={{ width: 9, height: 9, borderRadius: 9, background: "rgba(15,16,69,0.2)" }} />
              <div style={{ width: 9, height: 9, borderRadius: 9, background: "rgba(15,16,69,0.2)" }} />
            </div>
            <div style={{ width: 136, height: 66, borderRadius: 12, background: sky }} />
            <div style={{ width: 108, height: 11, borderRadius: 11, background: navy }} />
            <div style={{ width: 84, height: 11, borderRadius: 11, background: "rgba(15,16,69,0.25)" }} />
            <div style={{ width: 70, height: 26, borderRadius: 26, background: coral }} />
          </div>
        </Card>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: semibold, weight: 600, style: "normal" },
        { name: "Bricolage", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
