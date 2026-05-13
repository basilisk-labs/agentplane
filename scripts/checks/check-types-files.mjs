import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-types-files.mjs";
const MAX_TYPES_FILES = 10;

const ALLOWED_TYPES_FILES = [
  "packages/agentplane/src/backends/task-backend/shared/types.ts",
  "packages/agentplane/src/commands/recipes/impl/types.ts",
  "packages/agentplane/src/commands/shared/task-store/types.ts",
  "packages/agentplane/src/commands/upgrade/types.ts",
  "packages/agentplane/src/runner/types.ts",
  "packages/agentplane/src/runtime/harness/types.ts",
  "packages/agentplane/src/runtime/incidents/types.ts",
  "packages/agentplane/src/runtime/task-intake/types.ts",
  "packages/agentplane/src/workflow-runtime/types.ts",
  "packages/recipes/src/types.ts",
];

const EXCLUDED_DIR_NAMES = new Set([".git", "dist", "node_modules"]);

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function walkTypesFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true }).toSorted((left, right) =>
    left.name.localeCompare(right.name),
  );

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIR_NAMES.has(entry.name)) {
        walkTypesFiles(fullPath, files);
      }
      continue;
    }
    if (entry.isFile() && entry.name === "types.ts") {
      files.push(normalizePath(path.relative(repoRoot, fullPath)));
    }
  }

  return files;
}

function formatList(items) {
  return items.length === 0 ? "  - none" : items.map((item) => `  - ${item}`).join("\n");
}

function checkTypesFiles() {
  const files = walkTypesFiles(path.join(repoRoot, "packages")).toSorted();
  const allowed = new Set(ALLOWED_TYPES_FILES);
  const unexpected = files.filter((file) => !allowed.has(file));
  const missing = ALLOWED_TYPES_FILES.filter((file) => !existsSync(path.join(repoRoot, file)));
  const failures = [];

  if (files.length > MAX_TYPES_FILES) {
    failures.push(`found ${files.length} types.ts files; expected <= ${MAX_TYPES_FILES}`);
  }
  if (unexpected.length > 0) {
    failures.push(`unexpected types.ts files:\n${formatList(unexpected)}`);
  }
  if (missing.length > 0) {
    failures.push(`stale allowlist entries:\n${formatList(missing)}`);
  }

  if (failures.length > 0) {
    throw new Error(
      [
        "types.ts guardrail failed.",
        ...failures,
        "",
        "Use semantic filenames such as model.ts, schema.ts, contracts.ts, or update the allowlist when a domain-level types barrel is justified.",
      ].join("\n"),
    );
  }

  process.stdout.write(`types.ts guardrail OK (count=${files.length}, max=${MAX_TYPES_FILES})\n`);
}

const main = defineScript({
  name: SCRIPT_NAME,
  async run() {
    checkTypesFiles();
  },
});

runScriptMain(main);
