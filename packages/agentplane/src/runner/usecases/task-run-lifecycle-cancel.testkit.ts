import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { waitForCondition, writeConfig } from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";

import { readRunnerRunState } from "../artifacts.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";

import { createDoingRunnerTask } from "./task-run-lifecycle.testkit.js";

export async function createDoingTask(root: string, title: string): Promise<string> {
  return await createDoingRunnerTask({
    root,
    title,
    plan_text: `Execute lifecycle test task: ${title}.`,
  });
}

export async function configureCustomRunner(root: string, scriptLines: string[]): Promise<void> {
  const config = defaultConfig();
  config.runner.default_adapter = "custom";
  config.runner.custom = {
    command: ["custom-runner"],
  };
  await writeConfig(root, config);

  const fakeBinDir = path.join(root, "bin");
  await writeRunnerExecutable(root, "custom-runner", scriptLines);
  process.env.PATH = `${fakeBinDir}${path.delimiter}${process.env.PATH ?? ""}`;
}

export async function waitForState(
  statePath: string,
  predicate: (state: Awaited<ReturnType<typeof readRunnerRunState>>) => boolean,
  timeoutMs = 5000,
): Promise<Awaited<ReturnType<typeof readRunnerRunState>>> {
  return await waitForCondition({
    description: `runner state in ${statePath}`,
    timeoutMs,
    read: async () => await readRunnerRunState(statePath),
    predicate,
    onTimeout: (lastState) =>
      new Error(
        `Timed out waiting for runner state in ${statePath}: ${lastState?.status ?? "unknown"}`,
      ),
  });
}

export async function resolveTestRunnerPaths(root: string, taskId: string, runId: string) {
  return await resolveSupervisorTaskRunnerPaths({
    git_root: root,
    workflow_dir: ".agentplane/tasks",
    task_id: taskId,
    run_id: runId,
  });
}
