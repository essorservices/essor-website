// CONTRACT (stable API, implementation owned by the deliverables builder):
//   <Deliverable kind theme className animate />
//   - fills its parent (width/height 100%); the parent sets size and aspect (4/5 recommended)
//   - purely decorative: renders aria-hidden; the parent provides the accessible label
//   - `animate` (default true) enables subtle loops when in view; off under reduced motion
//
// Every composition is drawn in container units of the card (the root is a size container),
// so it scales like an image from ~150px to ~700px wide and works at 4/5, 1/1 and 5/4.
// The parent must therefore have a definite size: a width plus aspect-ratio (or a height).
import type { ClientTheme, DeliverableKind } from "@/content/projects";
import { copyFor, type DeliverableCopy } from "./copy";
import { DeliverableFrame } from "./frame";
import { App } from "./kinds/app";
import { Automation } from "./kinds/automation";
import { Identity } from "./kinds/identity";
import { Post } from "./kinds/post";
import { Reel } from "./kinds/reel";
import { Website } from "./kinds/website";

export type DeliverableProps = {
  kind: DeliverableKind;
  theme: ClientTheme;
  className?: string;
  animate?: boolean;
};

export const deliverableLabels: Record<DeliverableKind, string> = {
  identity: "Identité visuelle",
  reel: "Reels & vidéo",
  website: "Site web",
  app: "Application",
  post: "Réseaux sociaux",
  automation: "Automatisation",
};

type Composition = (props: { theme: ClientTheme; copy: DeliverableCopy }) => React.ReactNode;

const compositions: Record<DeliverableKind, Composition> = {
  identity: Identity,
  reel: Reel,
  website: Website,
  app: App,
  post: Post,
  automation: Automation,
};

/** Themed mockup of a deliverable (brand sheet, Reel, website, app, post, workflow). */
export function Deliverable({ kind, theme, className, animate = true }: DeliverableProps) {
  const Composition = compositions[kind];
  return (
    <DeliverableFrame kind={kind} theme={theme} animate={animate} className={className}>
      <Composition theme={theme} copy={copyFor(theme)} />
    </DeliverableFrame>
  );
}
