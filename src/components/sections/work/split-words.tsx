import { Fragment } from "react";
import "./work.css";

/**
 * Headline whose words slide up out of a mask on first paint (CSS, no hydration needed).
 * Assistive tech reads the plain sentence once; the animated words are hidden from it.
 */
export function SplitWords({
  text,
  as: Tag = "h1",
  delay = 0,
  stagger = 0.045,
  id,
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
  stagger?: number;
  id?: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
              <span className="work-word" style={{ "--d": `${delay + i * stagger}s` } as React.CSSProperties}>
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
