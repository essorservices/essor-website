import { deliverableLabels } from "@/components/deliverables";
import { projectBySlug, projects, type ClientTheme, type DeliverableKind } from "@/content/projects";
import type { ServiceKey } from "@/content/services";

export type ServicePreview = {
  kind: DeliverableKind;
  theme: ClientTheme;
  /** Kind of mockup, e.g. "Identité visuelle" */
  label: string;
  /** Brand drawn on the mockup, e.g. "Café Nour" */
  client: string;
  concept: boolean;
};

/** Which mockup illustrates each métier, drawn in the colours of one (concept) project. */
const sources: Record<ServiceKey, { kind: DeliverableKind; project: string }> = {
  branding: { kind: "identity", project: "cafe-nour" },
  strategie: { kind: "post", project: "maison-safran" },
  contenu: { kind: "reel", project: "atelier-lina" },
  web: { kind: "website", project: "clinique-azur" },
  automatisation: { kind: "automation", project: "pulse" },
};

function resolve({ kind, project: slug }: { kind: DeliverableKind; project: string }): ServicePreview {
  // Falls back to the first project if a slug is renamed in content/projects.ts
  const project = projectBySlug(slug) ?? projects[0];
  return {
    kind,
    theme: project.theme,
    label: deliverableLabels[kind],
    client: project.client,
    concept: project.concept,
  };
}

export const servicePreviews = {
  branding: resolve(sources.branding),
  strategie: resolve(sources.strategie),
  contenu: resolve(sources.contenu),
  web: resolve(sources.web),
  automatisation: resolve(sources.automatisation),
} satisfies Record<ServiceKey, ServicePreview>;
