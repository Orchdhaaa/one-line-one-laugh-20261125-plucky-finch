import { writeFileSync, mkdirSync } from "node:fs";

// One funny line for make.fun's "One Line, One Laugh".
// A houseplant, praised for thriving, dies out of petty spite: the
// punchline is the plant's motive, "just to keep me humble". The laugh
// lands inside the line, needs no setup, and reads cleanly aloud.
const LINE = "I told my houseplant it was doing great. It died anyway, just to keep me humble.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, so verify the line meets the gate before writing it.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
}

// The brief wants one line: an em dash would break the clean
// read-aloud rhythm the judge weighs, and a newline would make it two
// lines, so refuse either.
if (LINE.includes("\u2014") || LINE.includes("\u2013")) {
  throw new Error("line must not contain a dash");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
