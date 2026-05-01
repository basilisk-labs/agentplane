import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadCommandContext, runCli, type taskBackend } from "./agentplane-internal.js";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  pathExists,
  runCliSilent,
  writeDefaultConfig,
} from "./cli-harness.js";
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

async function createTaskQueryCliTask(
  root: string,
  opts: {
    title: string;
    description: string;
    owner?: string;
    tag?: string;
  },
): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      opts.title,
      "--description",
      opts.description,
      "--owner",
      opts.owner ?? "CODER",
      "--tag",
      opts.tag ?? "docs",
      "--root",
      root,
    ]);
    if (code !== 0) {
      throw new Error(`task new failed with exit code ${code}: ${io.stderr}`);
    }
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

async function approveAndStartTaskQueryCliTask(
  root: string,
  taskId: string,
  startBody: string,
): Promise<void> {
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
  await runCliSilent([
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    startBody,
    "--root",
    root,
  ]);
}

export {
  approveAndStartTaskQueryCliTask,
  createTaskQueryCliTask,
  seedTaskQueryFixture,
  useRunCliIntegrationHarness,
  waitForRunnerState,
};
