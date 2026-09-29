import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ROOT = process.cwd();
const PRODUCTION_ROOTS = [
  "packages/core/src",
  "packages/agentplane/src",
  "packages/agentplane/assets",
  "packages/recipes/src",
  "packages/testkit/src",
  "scripts/generate",
];
const RETIRED_PATHS = [
  "packages/agentplane/src/commands/blueprints/blueprints.command.ts",
  "packages/agentplane/src/blueprints/registry.ts",
  "packages/agentplane/src/blueprints/execution.ts",
  "packages/agentplane/src/blueprints/snapshot.ts",
  "packages/agentplane/src/commands/blueprint/blueprint.command.ts",
  "packages/agentplane/src/runner/usecases/task-run-blueprint-plan.ts",
  "packages/recipes/src/blueprint-extensions.ts",
];
const COLD_READER_ALLOWLIST = new Map([
  [
    "packages/agentplane/src/commands/blueprint/historical-audit.ts",
    "bounded decoder for a retired task-local snapshot",
  ],
  [
    "packages/agentplane/src/commands/task/kernel-migrate.command.ts",
    "explicit migration command that invokes the bounded historical decoder",
  ],
  [
    "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts",
    "version-labelled evaluator work-order v1 decoder",
  ],
  [
    "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts",
    "version-labelled evaluator evidence packet decoder",
  ],
  [
    "packages/core/src/runner/state-fingerprint.ts",
    "version-labelled state-fingerprint v1 decoder",
  ],
  [
    "packages/core/src/tasks/task-artifact-schema.task.ts",
    "bounded legacy task-field decoder that removes retired fields before validation",
  ],
]);

function walk(relativeRoot) {
  const absoluteRoot = path.join(ROOT, relativeRoot);
  if (!existsSync(absoluteRoot)) return [];
  const files = [];
  for (const entry of readdirSync(absoluteRoot, { withFileTypes: true })) {
    const relative = path.join(relativeRoot, entry.name);
    if (entry.isDirectory()) files.push(...walk(relative));
    if (entry.isFile()) files.push(relative.split(path.sep).join("/"));
  }
  return files;
}

function isProductionFile(file) {
  return (
    /\.(?:ts|json)$/u.test(file) &&
    !file.endsWith(".test.ts") &&
    !file.endsWith(".testkit.ts") &&
    !file.includes("/__snapshots__/")
  );
}

test("active Blueprint engine and mutation surfaces are absent", () => {
  for (const retiredPath of RETIRED_PATHS) {
    assert.equal(
      existsSync(path.join(ROOT, retiredPath)),
      false,
      `retired path exists: ${retiredPath}`,
    );
  }

  const forbiddenImport =
    /(?:from|import\()\s*["'][^"']*(?:blueprints|blueprint-extensions|task-run-blueprint-plan)[^"']*["']/u;
  const forbiddenRuntimeSymbol =
    /\b(?:resolveBlueprint|BlueprintRegistry|BlueprintExecutionPlan|BlueprintExecutionState)\b/u;
  const violations = [];
  for (const file of PRODUCTION_ROOTS.flatMap((root) => walk(root)).filter((file) =>
    isProductionFile(file),
  )) {
    const text = readFileSync(path.join(ROOT, file), "utf8");
    if (forbiddenImport.test(text) || forbiddenRuntimeSymbol.test(text)) violations.push(file);
  }
  assert.deepEqual(violations, [], `active Blueprint engine references:\n${violations.join("\n")}`);
});

test("remaining production Blueprint mentions are explicit cold-reader exceptions", () => {
  const mentions = PRODUCTION_ROOTS.flatMap((root) => walk(root))
    .filter((file) => isProductionFile(file))
    .filter((file) => /blueprint/iu.test(readFileSync(path.join(ROOT, file), "utf8")))
    .toSorted();
  assert.deepEqual(
    mentions,
    [...COLD_READER_ALLOWLIST.keys()].toSorted(),
    `unexpected production Blueprint mentions:\n${mentions.join("\n")}`,
  );
  for (const [file, reason] of COLD_READER_ALLOWLIST) {
    assert.ok(reason.length > 0, `${file}: missing cold-reader rationale`);
  }
});

test("generated live schemas expose no Blueprint inputs", () => {
  const violations = walk("schemas")
    .filter((file) => file.endsWith(".json"))
    .filter((file) => /blueprint/iu.test(readFileSync(path.join(ROOT, file), "utf8")))
    .toSorted();
  assert.deepEqual(
    violations,
    [],
    `generated Blueprint schema surfaces:\n${violations.join("\n")}`,
  );
});
