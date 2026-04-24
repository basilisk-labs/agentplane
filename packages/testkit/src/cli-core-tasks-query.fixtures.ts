import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadCommandContext, type taskBackend } from "agentplane/internal/testing";

import { installRunCliIntegrationHarness, pathExists, writeDefaultConfig } from "./cli-harness.js";
import { waitForCondition } from "./wait.js";

function useRunCliIntegrationHarness(): void {
  installRunCliIntegrationHarness();
}

async function waitForRunnerState(opts: {
  root: string;
  taskId: string;
  predicate: (state: Record<string, unknown>) => boolean;
  timeoutMs?: number;
}): Promise<{ runId: string; statePath: string; state: Record<string, unknown> }> {
  const timeoutMs = opts.timeoutMs ?? 5000;
  const runsRoot = path.join(opts.root, ".agentplane", "tasks", opts.taskId, "runs");

  const match = await waitForCondition({
    description: `runner state in ${runsRoot}`,
    timeoutMs,
    read: async () => {
      if (!(await pathExists(runsRoot))) return null;
      const runEntries = await readdir(runsRoot);
      const sortedRunEntries = runEntries.toSorted();
      for (const runId of sortedRunEntries) {
        const statePath = path.join(runsRoot, runId, "run-state.json");
        if (!(await pathExists(statePath))) continue;
        const state = JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>;
        if (opts.predicate(state)) return { runId, statePath, state };
      }
      return null;
    },
    predicate: (match) => match !== null,
    onTimeout: () => new Error(`Timed out waiting for runner state in ${runsRoot}`),
  });
  if (!match) {
    throw new Error(`Timed out waiting for runner state in ${runsRoot}`);
  }
  return match;
}

async function seedTaskQueryFixture(root: string, tasks: taskBackend.TaskData[]): Promise<void> {
  await writeDefaultConfig(root);
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  for (const task of tasks) {
    await ctx.taskBackend.writeTask(task);
  }
}

export { seedTaskQueryFixture, useRunCliIntegrationHarness, waitForRunnerState };
