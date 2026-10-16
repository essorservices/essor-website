import { Doodle } from "@/components/ui/doodle";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { Headword } from "./headword";

type Entry = {
  word: string;
  definitions: readonly string[];
  ours: string;
  body: string;
};

/** "Sens. « Exemple. »" → the sense, and the usage example set apart (dictionary style). */
function splitExample(definition: string) {
  const at = definition.indexOf("«");
  if (at === -1) return { sense: definition, example: "" };
  return { sense: definition.slice(0, at).trim(), example: definition.slice(at) };
}

/** The last `count` words, which get the hand-drawn underline. */
function splitTail(text: string, count = 2) {
  const words = text.split(" ");
  return { head: words.slice(0, -count).join(" "), tail: words.slice(-count).join(" ") };
}

const number = "font-mono text-[0.95rem] tabular leading-[1.9] sm:text-base sm:leading-[2]";

/**
 * "Pourquoi essor ?" told as a dictionary entry: the headword set huge with the logo dot
 * as its full stop, the two real senses of the word, then a third sense, the studio itself.
 */
export function DictionaryEntry({ entry, titleId, className }: { entry: Entry; titleId: string; className?: string }) {
  const ours = splitTail(entry.ours);

  return (
    <div className={className}>
      <h2 id={titleId} className="text-mega leading-[0.82] text-white [font-variation-settings:'opsz'_96,'wdth'_100]">
        <span className="sr-only">{`Pourquoi ${entry.word}\u00A0?`}</span>
        <Headword text={entry.word} />
      </h2>

      <ol className="mt-10 max-w-[40rem] border-t border-sky/15 pt-8 sm:mt-12 sm:pt-10">
        {entry.definitions.map((definition, i) => {
          const { sense, example } = splitExample(definition);
          return (
            <Reveal
              as="li"
              key={definition}
              delay={0.2 + i * 0.08}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] pb-5 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:pb-6"
            >
              <span aria-hidden className={cn(number, "text-sky/70")}>
                {i + 1}.
              </span>
              <p className="text-xl leading-snug text-sky/80 sm:text-2xl">
                {sense}
                {example ? <span className="mt-1 block italic text-sky/70">{example}</span> : null}
              </p>
            </Reveal>
          );
        })}

        {/* The third sense: the studio itself */}
        <Reveal
          as="li"
          delay={0.36}
          className="grid grid-cols-[2.25rem_minmax(0,1fr)] pt-3 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:pt-4"
        >
          <span aria-hidden className={cn(number, "text-coral")}>
            {entry.definitions.length + 1}.
          </span>
          <p className="font-display text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.022em] text-white [font-variation-settings:'opsz'_48] sm:text-[2.15rem] lg:text-[2.35rem]">
            {ours.head}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {ours.tail}
              <Doodle
                name="underline"
                strokeWidth={3}
                delay={0.6}
                duration={0.8}
                className="absolute left-[-0.04em] top-[86%] aspect-[220/22] h-auto w-[calc(100%+0.08em)] text-coral"
              />
            </span>
          </p>
        </Reveal>
      </ol>

      <Reveal delay={0.1} className="mt-12 sm:mt-14">
        <p className="max-w-[36rem] text-lg leading-relaxed text-sky/75 sm:text-[1.2rem]">{entry.body}</p>
      </Reveal>
    </div>
  );
}
