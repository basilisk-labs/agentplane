import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const TASK = path.join(ROOT, "packages/agentplane/src/commands/task");

async function source(name) {
  return await readFile(path.join(TASK, name), "utf8");
}

test("new-task entrypoints have one live Kernel supervisor", async () => {
  const [advanceCommand, runCommand, advanceCoordinator, runCoordinator] = await Promise.all([
    source("advance.command.ts"),
    source("run.command.ts"),
    source("advance-task-step.ts"),
    source("kernel-run.ts"),
  ]);
  const entrypoints = `${advanceCommand}\n${runCommand}`;

  assert.match(advanceCommand, /advanceTaskStep/u);
  assert.match(runCommand, /advanceTaskStep/u);
  assert.doesNotMatch(runCommand, /runCanonicalTask/u);
  assert.doesNotMatch(entrypoints, /(?:direct|branch)-task-supervisor/u);
  assert.doesNotMatch(advanceCoordinator, /supervise(?:Direct|Branch)TaskRun/u);
  assert.doesNotMatch(runCoordinator, /supervise(?:Direct|Branch)TaskRun/u);
});

test("retired outer owners contribute no production runtime imports", async () => {
  await assert.rejects(access(path.join(TASK, "direct-task-supervisor.ts")));

  const branchContract = await source("branch-task-supervisor.ts");
  const runtimeImports = branchContract.match(/^import\s+(?!type\b).+$/gmu) ?? [];
  assert.deepEqual(runtimeImports, []);
  assert.doesNotMatch(branchContract, /export\s+(?:async\s+)?function/u);
  assert.doesNotMatch(branchContract, /superviseBranchTaskRun/u);
});

test("retained branch episode adapter has an explicit production consumer", async () => {
  const [adapter, consumer] = await Promise.all([
    source("branch-task-supervisor-episodes.ts"),
    source("external-agent-verification.ts"),
  ]);

  assert.match(adapter, /export async function executeProductionBranchEpisode/u);
  assert.match(consumer, /executeProductionBranchEpisode/u);
});
