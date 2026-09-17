import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ROOT = process.cwd();
const ROOTS = [
  "packages/core/src",
  "packages/agentplane/src",
  "packages/recipes/src",
  "packages/testkit/src",
  "scripts/generate",
];
const HISTORICAL_DECODERS = new Set([
  "packages/agentplane/src/commands/blueprint/historical-audit.ts",
  "packages/agentplane/src/commands/task/kernel-migrate.command.ts",
  "packages/core/src/runner/state-fingerprint.ts",
  "packages/core/src/tasks/task-artifact-schema.task.ts",
]);

function walk(relativeRoot) {
  const absoluteRoot = path.join(ROOT, relativeRoot);
  if (!existsSync(absoluteRoot)) return [];
  return readdirSync(absoluteRoot, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(relativeRoot, entry.name).split(path.sep).join("/");
    if (entry.isDirectory()) return walk(relative);
    return entry.isFile() ? [relative] : [];
  });
}

test("production code has no active Blueprint cursor, plan, snapshot, or state", () => {
  const forbidden =
    /(?:blueprint[_-]?(?:cursor|plan|snapshot|state|execution)|(?:cursor|plan|snapshot|state|execution)[_-]?blueprint)/iu;
  const violations = ROOTS.flatMap(walk)
    .filter((file) => file.endsWith(".ts"))
    .filter((file) => !file.endsWith(".test.ts") && !file.endsWith(".testkit.ts"))
    .filter((file) => !HISTORICAL_DECODERS.has(file))
    .filter((file) => forbidden.test(readFileSync(path.join(ROOT, file), "utf8")))
    .toSorted();
  assert.deepEqual(violations, [], `active Blueprint cursor artifacts:\n${violations.join("\n")}`);
});

test("runner artifact contract has no retired Blueprint paths", () => {
  const text = readFileSync(
    path.join(ROOT, "packages/agentplane/src/runner/task-run-paths.ts"),
    "utf8",
  );
  assert.doesNotMatch(text, /blueprint/iu);
});
