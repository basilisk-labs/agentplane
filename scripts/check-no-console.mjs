import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineScript, runScriptMain } from "./lib/script-runtime.mjs";

const SCRIPT_NAME = "check-no-console.mjs";
const MAX_CONSOLE_OCCURRENCES = 25;
const CONSOLE_PATTERN = /\bconsole\.(?:log|warn|error)\b/g;
const EXCLUDED_DIR_NAMES = new Set([".git", "dist", "node_modules"]);
const EXCLUDED_FILE_PATTERNS = [/\.test\.ts$/, /\.spec\.ts$/];

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function isExcludedFile(filePath) {
  return EXCLUDED_FILE_PATTERNS.some((pattern) => pattern.test(filePath));
}

function walkTypeScriptFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true }).toSorted((left, right) =>
    left.name.localeCompare(right.name),
  );

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIR_NAMES.has(entry.name)) {
        walkTypeScriptFiles(fullPath, files);
      }
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts") && !isExcludedFile(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function collectConsoleOccurrences() {
  const files = walkTypeScriptFiles(path.join(repoRoot, "packages"));
  const occurrences = [];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const lines = source.split("\n");
    for (const [index, line] of lines.entries()) {
      CONSOLE_PATTERN.lastIndex = 0;
      if (CONSOLE_PATTERN.test(line)) {
        occurrences.push(`${normalizePath(path.relative(repoRoot, file))}:${index + 1}`);
      }
    }
  }

  return occurrences;
}

function formatList(items) {
  return items.length === 0 ? "  - none" : items.map((item) => `  - ${item}`).join("\n");
}

const main = defineScript({
  name: SCRIPT_NAME,
  async run() {
    const occurrences = collectConsoleOccurrences();
    if (occurrences.length > MAX_CONSOLE_OCCURRENCES) {
      throw new Error(
        [
          `production console usage baseline exceeded: count=${occurrences.length}, max=${MAX_CONSOLE_OCCURRENCES}`,
          "Occurrences:",
          formatList(occurrences),
          "",
          "Use the structured logger for production code, or lower the baseline after removing console usage.",
        ].join("\n"),
      );
    }

    process.stdout.write(
      `production console usage OK (count=${occurrences.length}, max=${MAX_CONSOLE_OCCURRENCES})\n`,
    );
  },
});

runScriptMain(main);
