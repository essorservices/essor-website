"use client";

import { AnimatePresence } from "motion/react";
import type { Business } from "@/content/one-roof";
import type { ServiceKey } from "@/content/services";
import { BusinessCard } from "./business-card";
import { Connectors } from "./connectors";
import { CARD, SLOTS, STAGE } from "./geometry";
import { Pill } from "./pill";

/**
 * The diagram. One DOM for every breakpoint:
 * - < md: card on top, then the pills as a timeline list
 * - md: card on the left, joined to the timeline by a horizontal branch
 * - lg+: a fixed 1000×600 box (1u = 100cqw / 1000) with the card in the middle,
 *   pills on an ellipse and the connectors in a single SVG using the same units.
 * Typography inside is in em: 15px on mobile, 15u on desktop.
 */
export function Stage({
  uid,
  business,
  index,
  total,
  focus,
  revealed,
  playing,
  reduced,
  desktop,
}: {
  uid: string;
  business: Business;
  index: number;
  total: number;
  focus: ServiceKey | null;
  revealed: boolean;
  /** Section on screen: the dash loop pauses otherwise */
  playing: boolean;
  reduced: boolean;
  desktop: boolean;
}) {
  return (
    <div className="lg:@container lg:mx-auto lg:max-w-[1120px]">
      <div
        style={
          {
            "--stage-w": STAGE.w,
            "--card-w": CARD.w,
          } as React.CSSProperties
        }
        className="relative text-[15px] md:grid md:grid-cols-[16.5rem_minmax(0,1fr)] md:items-center md:gap-x-12 lg:block lg:aspect-[1000/600] lg:text-[length:calc(var(--u)*15)] lg:[--u:calc(100cqw/var(--stage-w))]"
      >
        <Connectors
          uid={uid}
          business={business.key}
          services={business.items.map((it) => it.service)}
          focus={focus}
          revealed={revealed}
          playing={playing}
          reduced={reduced}
        />

        <div className="relative z-10 w-full max-w-[20rem] md:max-w-none lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[calc(var(--u)*var(--card-w))] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
          <BusinessCard business={business} index={index} total={total} revealed={revealed} reduced={reduced} />
        </div>

        <div className="relative mt-9 md:mt-0 lg:static">
          {/* Timeline (< lg): one dashed line down the list. On mobile it starts under the card;
              on tablets the card sits on the left and joins it with a horizontal branch. */}
          <span aria-hidden className="absolute -top-12 bottom-7 left-[19px] w-0.5 overflow-hidden md:top-7 lg:hidden">
            <span className="or-spine absolute inset-x-0 -top-3 bottom-0" />
          </span>
          <span aria-hidden className="or-branch absolute -left-12 top-1/2 hidden h-0.5 w-[calc(3rem+20px)] -translate-y-1/2 md:block lg:hidden" />
          <ul className="flex flex-col gap-3 pl-12 lg:block lg:p-0">
            <AnimatePresence mode="popLayout" initial={false}>
              {business.items.map((item, i) => (
                <Pill
                  key={`${business.key}-${i}`}
                  item={item}
                  slot={SLOTS[i]}
                  index={i}
                  focus={focus}
                  revealed={revealed}
                  desktop={desktop}
                  floating={revealed}
                />
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
