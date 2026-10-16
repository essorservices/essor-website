import { site } from "@/content/site";

export type ContactLink = { key: string; label: string; value: string; href?: string; external?: boolean };

/** Agency contact details, keeping only the values the team has filled in `site.contact`. */
export function contactLinks(): ContactLink[] {
  // Widened: the content file types these as literal "" until the team fills them in.
  const { email, phone, whatsapp, city }: Record<keyof typeof site.contact, string> = site.contact;
  const links: ContactLink[] = [];
  if (email) links.push({ key: "email", label: "E-mail", value: email, href: `mailto:${email}` });
  if (phone) links.push({ key: "phone", label: "Téléphone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` });
  if (whatsapp)
    links.push({
      key: "whatsapp",
      label: "WhatsApp",
      value: "Écrire sur WhatsApp",
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
      external: true,
    });
  if (city) links.push({ key: "city", label: "Ville", value: city });
  return links;
}
