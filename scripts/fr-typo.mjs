// Applies French typographic spacing inside string literals of content files.
// Run: node scripts/fr-typo.mjs
import fs from "node:fs";
import path from "node:path";
const dir = path.resolve(import.meta.dirname, "../src/content");
const NB = " ";
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
  const file = path.join(dir, f);
  const src = fs.readFileSync(file, "utf8");
  const out = src.replace(/"(?:[^"\\\n]|\\.)*"/g, (s) =>
    s
      .replace(/ ([?!:;»])/g, `${NB}$1`)
      .replace(/« /g, `«${NB}`)
      .replace(/(\d) (\d{3})/g, `$1${NB}$2`)
      .replace(/(\d) (DA|h\b|%)/g, `$1${NB}$2`),
  );
  if (out !== src) { fs.writeFileSync(file, out); console.log("updated", f); }
}
