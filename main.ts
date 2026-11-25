// One Emoji, One Smile — make.fun bounty
// u-0xkianno-one-emoji-one-smile-5470751f
//
// Writes exactly one emoji to /output/entry.txt: the hugging face.
// Why this emoji, against the judge's brief (most important first):
//   1. Warm and friendly at first glance: open arms offering a hug is the
//      plainest warm gesture a stranger can send — it aims to warm, not
//      just to look cheerful.
//   2. Warmth with no context needed: a hug reads instantly, in any
//      language, with no joke or reference to get.
//   3. Universal: every age and background reads a hug the same way.
//   4. Chosen, not default: it is not the first smiley that comes to
//      mind (🙂 / 😊), yet it stays instantly readable.
//   5. Right for a stranger: a hug emoji is platonic warmth — no
//      intimacy, sarcasm or flirtation the way a hearts-face (🥰)
//      could read from someone unknown.
//
// Gate: /output/entry.txt must be UTF-8 text of 1 to 8 characters,
// not only white space. One emoji, no trailing newline, nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EMOJI = "🤗";
const OUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

// Guard: exactly one grapheme cluster, inside the 1–8 character gate.
// (A single emoji can be several UTF-16 code units, so count graphemes,
// not string length, when checking the "one emoji" rule.)
const clusters = [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(EMOJI)];
if (clusters.length !== 1) {
  throw new Error(`expected exactly one emoji, got ${clusters.length} grapheme clusters`);
}
if ([...EMOJI].length < 1 || [...EMOJI].length > 8) {
  throw new Error("emoji outside the 1–8 character gate");
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, EMOJI, "utf8");
console.log(`wrote ${EMOJI} to ${OUT_PATH}`);
