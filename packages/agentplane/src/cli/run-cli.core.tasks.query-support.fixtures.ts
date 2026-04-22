import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  installRunCliIntegrationHarness,
  pathExists,
  writeDefaultConfig,
} from "@agentplane/testkit";

import type * as taskBackend from "../backends/task-backend.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";

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
  const started = Date.now();
  const runsRoot = path.join(opts.root, ".agentplane", "tasks", opts.taskId, "runs");
  while (Date.now() - started < timeoutMs) {
    if (await pathExists(runsRoot)) {
      const runEntries = await readdir(runsRoot);
      const sortedRunEntries = runEntries.toSorted();
      for (const runId of sortedRunEntries) {
        const statePath = path.join(runsRoot, runId, "run-state.json");
        if (!(await pathExists(statePath))) continue;
        const state = JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>;
        if (opts.predicate(state)) return { runId, statePath, state };
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for runner state in ${runsRoot}`);
}

async function seedTaskQueryFixture(root: string, tasks: taskBackend.TaskData[]): Promise<void> {
  await writeDefaultConfig(root);
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  for (const task of tasks) {
    await ctx.taskBackend.writeTask(task);
  }
}

export { seedTaskQueryFixture, useRunCliIntegrationHarness, waitForRunnerState };
