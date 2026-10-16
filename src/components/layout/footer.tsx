import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { finalCta } from "@/content/home";
import { site } from "@/content/site";
import { CopyrightYear } from "./copyright-year";
import { FooterCta } from "./footer-cta";
import { HideOnPath } from "./hide-on-path";

/**
 * Site footer: the final call to action and the legal line. Not shown on /contact,
 * where the form already is.
 */
export function Footer() {
  return (
    <HideOnPath paths={["/contact"]}>
      <footer data-site-footer>
        <Panel tone="navy" grid className="mb-2 sm:mb-3">
          <FooterCta cta={finalCta} />

          <Container>
            <div className="flex flex-col gap-3 py-6 text-[0.9rem] text-sky/75 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="tabular">
                  © <CopyrightYear /> {site.name}
                </span>
                <Link
                  href="/mentions-legales"
                  className="text-sky/75 underline-offset-4 transition-colors hover:text-coral hover:underline"
                >
                  Mentions légales
                </Link>
              </p>
              <p className="flex items-center gap-2.5">
                <span aria-hidden className="size-1.5 rounded-full bg-coral" />
                {site.tagline}
              </p>
            </div>
          </Container>
        </Panel>
      </footer>
    </HideOnPath>
  );
}
