// How Many Tabs Do You Have Open?
// The honest count, tallied window by window this morning and not
// rounded for anyone. Every pile below is still open and still,
// in theory, meant to be read.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The tally, exactly as counted:
//   96  the work window, three projects deep
//   78  the research spiral that was only supposed to take an hour
//   63  the "later" window, untouched since the month before last
const TABS_BY_WINDOW: readonly number[] = [96, 78, 63];

function countTabs(): number {
  return TABS_BY_WINDOW.reduce((sum, n) => sum + n, 0);
}

function renderEntry(): string {
  const text = String(countTabs());
  // The gate: digits only, 1 to 5 characters, nothing else.
  if (!/^\d{1,5}$/.test(text)) {
    throw new Error(`entry is not a bare tab count: ${JSON.stringify(text)}`);
  }
  return text;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), renderEntry(), "utf8");
}

main();
