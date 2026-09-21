import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const ownerMap = JSON.parse(
  readFileSync(path.join(ROOT, "scripts/checks/lifecycle-owner-map.json"), "utf8"),
);
const retirement = JSON.parse(
  readFileSync(path.join(ROOT, "scripts/checks/lifecycle-engine-retirement.json"), "utf8"),
);

function source(relativePath) {
  return readFileSync(path.join(ROOT, relativePath), "utf8");
}

function productionTypeScriptFiles(relativeRoot) {
  const files = [];
  for (const entry of readdirSync(path.join(ROOT, relativeRoot), { withFileTypes: true })) {
    const relativePath = path.join(relativeRoot, entry.name);
    if (entry.isDirectory()) files.push(...productionTypeScriptFiles(relativePath));
    else if (
      entry.name.endsWith(".ts") &&
      !entry.name.endsWith(".test.ts") &&
      !entry.name.endsWith(".testkit.ts")
    ) {
      files.push(relativePath);
    }
  }
  return files;
}

test("one observed Kernel reducer, writer, and application coordinator remain", () => {
  assert.equal(ownerMap.convergence_state.status, "converged");
  assert.deepEqual(ownerMap.convergence_state.current_parallel_owners, []);
  assert.deepEqual(ownerMap.canonical_owners.map(({ role }) => role).toSorted(), [
    "application_coordinator",
    "domain_reducer",
    "state_writer",
  ]);
  assert.ok(
    ownerMap.canonical_owners.every(
      ({ ownership_state }) => ownership_state === "observed_current",
    ),
  );
  assert.equal(
    ownerMap.canonical_owners.find(({ role }) => role === "application_coordinator")?.symbol,
    "advanceTaskStep",
  );
});

test("retired lifecycle owners are absent from the production import graph", () => {
  assert.equal(
    existsSync(path.join(ROOT, "packages/core/src/tasks/task-centric/orchestrator.ts")),
    false,
  );
  const production = productionTypeScriptFiles("packages/agentplane/src")
    .map((file) => `${file}\n${source(file)}`)
    .join("\n");
  assert.doesNotMatch(production, /import[^\n]+kernel-advance\.js/u);
  assert.doesNotMatch(production, /\brunCanonicalTask\b/u);
  assert.doesNotMatch(production, /\bcoordinateKernelEffect\b/u);
  assert.doesNotMatch(source("packages/core/src/tasks/task-centric/index.ts"), /orchestrator\.js/u);
});

test("public task exports cannot acquire a lifecycle engine through a wildcard", () => {
  const publicTasks = source("packages/core/src/tasks/index.ts");
  assert.match(publicTasks, /export \* as taskKernel from "\.\/task-kernel\/index\.js"/u);
  assert.doesNotMatch(publicTasks, /export \* from "\.\/task-centric\/index\.js"/u);
  for (const retired of retirement.removed_production_exports) {
    const symbol = retired.split("@")[0];
    assert.doesNotMatch(publicTasks, new RegExp(`\\b${symbol}\\b`, "u"));
  }
});

test("current guides pin one owner and label the historical conversion boundary", () => {
  const workflow = source("docs/user/workflow.mdx");
  const lifecycle = source("docs/user/task-lifecycle.mdx");
  for (const guide of [workflow, lifecycle]) {
    assert.match(guide, /sole pure (?:domain )?reducer/u);
    assert.match(guide, /sole\s+application coordinator/u);
    assert.match(guide, /0\.7\.10(?:-or-earlier| and earlier)/u);
    assert.match(
      guide,
      /0\.7\.11 does not make\s+(?:any of those\s+|a\s+)?policy-required semantic stage/u,
    );
  }
  assert.doesNotMatch(
    `${workflow}\n${lifecycle}`,
    /(?:^|\n)(?:Choose|Select|Switch)\b(?:[^.\n]{0,80})(?:lifecycle )?engine/u,
  );
});

test("retained lifecycle helpers have named current consumers", () => {
  const consumers = [
    ["applyKernelEffectStep", "packages/agentplane/src/commands/task/advance-task-step.ts"],
    ["executeKernelPacket", "packages/agentplane/src/commands/task/run.command.ts"],
    ["runManagedTransportStep", "packages/agentplane/src/commands/task/run.command.ts"],
    ["issueKernelInspection", "packages/agentplane/src/commands/task/advance-task-step.ts"],
    ["resumeKernelInspection", "packages/agentplane/src/commands/task/advance-task-step.ts"],
    ["acceptKernelInspection", "packages/agentplane/src/commands/task/kernel-semantic-result.ts"],
  ];
  for (const [symbol, consumer] of consumers) {
    assert.match(source(consumer), new RegExp(`\\b${symbol}\\b`, "u"), `${symbol}: no consumer`);
  }
  for (const bridge of retirement.test_only_compatibility) {
    assert.ok(bridge.consumers.length > 0, `${bridge.export}: unnamed test consumer`);
    for (const consumer of bridge.consumers) assert.match(source(consumer), /kernel-advance\.js/u);
  }
});

test("cold migration still decodes exact historical bytes", async () => {
  const result = await execFileAsync(
    "bun",
    [
      "run",
      "test:project",
      "agentplane",
      "--maxWorkers=1",
      "packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts",
      "-t",
      "is byte-deterministic, read-only, and needs no agent",
    ],
    { cwd: ROOT },
  );
  assert.match(result.stdout, /Tests\s+1 passed/u);
});

test("retirement ledger records boundary deltas without a performance claim", () => {
  assert.ok(retirement.removed_production_modules.length > 0);
  assert.ok(retirement.removed_production_exports.length > 0);
  assert.ok(retirement.retained_cold_readers.length > 0);
  assert.equal(retirement.performance_claim, null);
});
