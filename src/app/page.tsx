import type { Metadata } from "next";
import { Faq } from "@/components/sections/faq/faq";
import { Hero } from "@/components/sections/hero/hero";
import { MarqueeBand } from "@/components/sections/marquee-band/marquee-band";
import { OneRoof } from "@/components/sections/one-roof/one-roof";
import { Process } from "@/components/sections/process/process";
import { Services } from "@/components/sections/services/services";
import { Studio } from "@/components/sections/studio/studio";
import { SelectedWork } from "@/components/sections/work/selected-work";
import { site } from "@/content/site";

/** Canonical and og:url live here, not in the root layout, so other routes (and the 404) never inherit "/". */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

/** Home: section order and ids are fixed in DESIGN.md (the navigation links to them). */
export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <OneRoof />
      <Services />
      <SelectedWork />
      <Studio />
      <Process />
      <Faq />
    </>
  );
}
