import { readFile } from "node:fs/promises";
import path from "node:path";

const CONFIG_PATH = path.resolve("vitest.config.ts");

const EXPECTED_THRESHOLDS = {
  lines: 80,
  functions: 80,
  branches: 72,
  statements: 80,
};

function extractThresholds(source) {
  const thresholdsMatch = source.match(/thresholds:\s*\{(?<body>[\s\S]*?)\n\s*\}/);
  if (!thresholdsMatch?.groups?.body) {
    throw new Error("Missing coverage.thresholds block in vitest.config.ts");
  }

  const thresholds = new Map();
  for (const match of thresholdsMatch.groups.body.matchAll(
    /^\s*(?<key>lines|functions|branches|statements):\s*(?<value>\d+),?\s*$/gm,
  )) {
    thresholds.set(match.groups.key, Number(match.groups.value));
  }
  return thresholds;
}

const source = await readFile(CONFIG_PATH, "utf8");
const actual = extractThresholds(source);
const mismatches = [];

for (const [key, expected] of Object.entries(EXPECTED_THRESHOLDS)) {
  const value = actual.get(key);
  if (value !== expected) {
    mismatches.push(`${key}: expected ${expected}, got ${value ?? "missing"}`);
  }
}

if (mismatches.length > 0) {
  console.error("Coverage threshold guard failed:");
  for (const mismatch of mismatches) {
    console.error(`- ${mismatch}`);
  }
  console.error("If thresholds must change, update this guard in the same reviewed task.");
  process.exitCode = 1;
} else {
  console.log("Coverage threshold guard passed (lines=80 functions=80 branches=72 statements=80).");
}
