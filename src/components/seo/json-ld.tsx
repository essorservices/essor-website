import { services } from "@/content/services";
import { site, socialLinks } from "@/content/site";

/**
 * schema.org description of the agency, rendered once in the root layout.
 * Optional fields (e-mail, phone, area, social profiles) only appear once filled in `site`.
 */
export function OrganizationJsonLd() {
  const { email, phone, city } = site.contact;
  const absolute = (path: string) => new URL(path, site.url).toString();

  const data = {
    "@context": "https://schema.org",
    // TODO: switch back to "ProfessionalService" (a LocalBusiness) with a PostalAddress `address`
    // once the agency address is filled in; Google requires it for that type.
    "@type": "Organization",
    "@id": absolute("/#organisation"),
    name: site.name,
    ...(site.legalName !== site.name ? { legalName: site.legalName } : {}),
    url: absolute("/"),
    logo: absolute("/apple-icon.png"),
    image: absolute("/opengraph-image"),
    description: site.description,
    slogan: site.tagline,
    knowsAbout: services.map((s) => s.title),
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(city ? { areaServed: city } : {}),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map((s) => s.href) } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps the payload from closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
