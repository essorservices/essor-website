import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Mono, DM_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { Providers } from "@/components/providers/providers";
import { site } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const mono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Agence de branding, marketing & développement`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#E3ECFF",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <OrganizationJsonLd />
        <a
          href="#contenu"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-navy px-5 py-3 font-semibold text-white transition-transform focus-visible:translate-y-0"
        >
          Aller au contenu
        </a>
        <Providers>
          <Header />
          <main id="contenu" className="flex flex-1 flex-col gap-2 pb-2 pt-2 sm:gap-3 sm:pb-3 sm:pt-3">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
