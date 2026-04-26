import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import { defineScript, runScriptMain } from "./lib/script-runtime.mjs";

const SCRIPT_NAME = "check-no-console.mjs";
const MAX_CONSOLE_OCCURRENCES = 0;
const CONSOLE_METHODS = new Set(["log", "warn", "error"]);
const EXCLUDED_DIR_NAMES = new Set([".git", "dist", "node_modules"]);
const EXCLUDED_FILE_PATTERNS = [/\.test\.ts$/, /\.spec\.ts$/];

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "..");

function parseArgs(argv) {
  const opts = {
    root: defaultRepoRoot,
    max: MAX_CONSOLE_OCCURRENCES,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--root") {
      const value = argv[index + 1];
      if (!value) throw new Error("--root requires a value");
      opts.root = path.resolve(value);
      index += 1;
      continue;
    }
    if (arg === "--max") {
      const value = argv[index + 1];
      if (!value) throw new Error("--max requires a value");
      const parsed = Number.parseInt(value, 10);
      if (!Number.isSafeInteger(parsed) || parsed < 0) {
        throw new Error("--max must be a non-negative integer");
      }
      opts.max = parsed;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return opts;
}

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

function collectConsoleOccurrences(repoRoot) {
  const files = walkTypeScriptFiles(path.join(repoRoot, "packages"));
  const occurrences = [];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const visit = (node) => {
      if (
        ts.isPropertyAccessExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "console" &&
        CONSOLE_METHODS.has(node.name.text)
      ) {
        const location = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        occurrences.push(`${normalizePath(path.relative(repoRoot, file))}:${location.line + 1}`);
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }

  return occurrences;
}

function formatList(items) {
  return items.length === 0 ? "  - none" : items.map((item) => `  - ${item}`).join("\n");
}

const main = defineScript({
  name: SCRIPT_NAME,
  async run() {
    const opts = parseArgs(process.argv.slice(2));
    const occurrences = collectConsoleOccurrences(opts.root);
    if (occurrences.length > opts.max) {
      throw new Error(
        [
          `production console usage baseline exceeded: count=${occurrences.length}, max=${opts.max}`,
          "Occurrences:",
          formatList(occurrences),
          "",
          "Use the structured logger for production code, or lower the baseline after removing console usage.",
        ].join("\n"),
      );
    }

    process.stdout.write(
      `production console usage OK (count=${occurrences.length}, max=${opts.max})\n`,
    );
  },
});

runScriptMain(main);
