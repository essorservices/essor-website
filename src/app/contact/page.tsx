import type { Metadata } from "next";
import { BriefPage } from "@/components/brief/brief-page";
import { briefPage } from "@/content/brief";
import { hero } from "@/content/home";
import { site } from "@/content/site";

const title = briefPage.label;
// Page-level openGraph/twitter replace the root ones, so the root image is named again here.
const image = "/opengraph-image";
const imageAlt = `${site.name} | ${site.tagline} ${hero.sticker}`;
const description =
  "Parlez-nous de votre business : identité visuelle, stratégie, vidéos, site web, application ou automatisations. Quatre étapes, environ trois minutes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/contact",
    title: `${title} | ${site.name}`,
    description,
    images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
    images: [{ url: image, alt: imageAlt }],
  },
};

export default function ContactPage() {
  return <BriefPage />;
}
