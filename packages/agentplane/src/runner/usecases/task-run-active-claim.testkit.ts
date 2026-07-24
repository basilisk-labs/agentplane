import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import { expect } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { waitForCondition, writeConfig } from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { evolveRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerInvocation, RunnerRunState } from "../types.js";

import type { TaskRunnerActiveClaim } from "./task-run-active-claim.js";
import { prepareTaskRunnerExecution, type PreparedTaskRunnerExecution } from "./task-run.js";
import {
  createDoingRunnerTask,
  recordFailedExternalRunnerAnchor,
} from "./task-run-lifecycle.testkit.js";

export { mkGitRepoRoot } from "@agentplane/testkit";

export async function createDoingTask(root: string, title: string): Promise<string> {
  return await createDoingRunnerTask({
    root,
    title,
    plan_text: `Execute active-claim test task: ${title}.`,
  });
}

export async function configureCustomRunner(opts: {
  root: string;
  script_lines: string[];
  env?: Record<string, string>;
}): Promise<void> {
  const executablePath = await writeRunnerExecutable(opts.root, "custom-runner", opts.script_lines);
  const config = defaultConfig();
  config.runner.default_adapter = "custom";
  config.runner.custom = {
    command: [executablePath],
    env: opts.env ?? {},
  };
  await writeConfig(opts.root, config);
}

export async function createFailedSource(opts: { root: string; task_id: string; run_id: string }) {
  const ctx = await loadCommandContext({ cwd: opts.root, rootOverride: opts.root });
  const prepared = await prepareTaskRunnerExecution({
    ctx,
    cwd: opts.root,
    rootOverride: opts.root,
    task_id: opts.task_id,
    mode: "execute",
    run_id: opts.run_id,
  });
  const failedAt = new Date().toISOString();
  await writeRunnerRunState({
    state_path: prepared.invocation.state_path,
    state: evolveRunnerRunState({
      state: prepared.state,
      status: "failed",
      updated_at: failedAt,
      result: {
        status: "failed",
        exit_code: 1,
        started_at: failedAt,
        ended_at: failedAt,
        stderr_summary: "simulated source failure",
      },
    }),
  });
  await recordFailedExternalRunnerAnchor({
    ctx,
    taskId: opts.task_id,
    prepared,
    updatedAt: failedAt,
  });
  return { ctx, prepared };
}

export async function writeTerminalSuccess(
  prepared: PreparedTaskRunnerExecution,
  summary: string,
): Promise<RunnerRunState> {
  const completedAt = new Date().toISOString();
  const state = evolveRunnerRunState({
    state: prepared.state,
    status: "success",
    updated_at: completedAt,
    result: {
      status: "success",
      exit_code: 0,
      started_at: completedAt,
      ended_at: completedAt,
      summary,
    },
  });
  await writeRunnerRunState({
    state_path: prepared.invocation.state_path,
    state,
  });
  return state;
}

export function staleClaim(opts: {
  task_id: string;
  run_id: string;
  generation?: string;
}): TaskRunnerActiveClaim {
  const generation = opts.generation ?? "00000000-0000-4000-8000-000000000001";
  return {
    schema_version: 1,
    claim_id: generation,
    generation,
    task_id: opts.task_id,
    run_id: opts.run_id,
    operation: "execute",
    claimed_at: new Date(0).toISOString(),
    owner_pid: 2_147_483_647,
    owner_command: "terminated-agentplane-supervisor",
    owner_started_at: new Date(0).toISOString(),
  };
}

export async function writeActiveClaim(root: string, claim: TaskRunnerActiveClaim) {
  const paths = await resolveSupervisorTaskRunnerPaths({
    git_root: root,
    workflow_dir: ".agentplane/tasks",
    task_id: claim.task_id,
    run_id: claim.run_id,
  });
  await mkdir(paths.task_dir, { recursive: true });
  const claimPath = path.join(paths.task_dir, "active-run-claim.json");
  await writeFile(claimPath, `${JSON.stringify(claim)}\n`, "utf8");
  return { paths, claim_path: claimPath };
}

export async function replaceActiveClaim(
  invocation: RunnerInvocation,
  taskId: string,
  generation: string,
): Promise<void> {
  const claimPath = path.join(
    path.dirname(path.dirname(invocation.run_dir)),
    "active-run-claim.json",
  );
  await rename(claimPath, `${claimPath}.${generation}.original`);
  await writeFile(
    claimPath,
    `${JSON.stringify(staleClaim({ task_id: taskId, run_id: "replacement-run", generation }))}\n`,
    "utf8",
  );
}

export function gateRunnerScript(): string[] {
  return [
    "#!/bin/sh",
    "set -eu",
    String.raw`printf '%s\n' "$AGENTPLANE_RUNNER_RUN_DIR" >> "$TEST_CLAIM_STARTED"`,
    String.raw`while [ ! -f "$TEST_CLAIM_RELEASE" ]; do sleep 0.02; done`,
    "cat >/dev/null",
    "exit 0",
  ];
}

export async function waitForStartedRun(markerPath: string): Promise<string> {
  return await waitForCondition({
    description: "custom runner claim marker",
    timeoutMs: 10_000,
    pollMs: 10,
    read: async () => await readFile(markerPath, "utf8").catch(() => ""),
    predicate: (contents) => contents.trim().length > 0,
  });
}

export type SettledObservation<T> =
  | { kind: "resolved"; value: T }
  | { kind: "rejected"; error: unknown }
  | { kind: "timeout" };

export async function observeSettlement<T>(
  promise: Promise<T>,
  timeoutMs = 1500,
): Promise<SettledObservation<T>> {
  return await Promise.race([
    promise.then(
      (value): SettledObservation<T> => ({ kind: "resolved", value }),
      (error: unknown): SettledObservation<T> => ({ kind: "rejected", error }),
    ),
    delay(timeoutMs).then((): SettledObservation<T> => ({ kind: "timeout" })),
  ]);
}

export function expectClaimRejection(
  observation: SettledObservation<unknown>,
  opts: {
    task_id: string;
    operation: "resume" | "retry";
    competing_operation: "execute" | "resume" | "retry";
    competing_run_id: string;
  },
): CliError {
  expect(observation.kind).toBe("rejected");
  if (observation.kind !== "rejected") {
    throw new Error(`Expected active-claim rejection, observed ${observation.kind}.`);
  }
  expect(observation.error).toBeInstanceOf(CliError);
  expect(observation.error).toMatchObject({
    code: "E_USAGE",
    context: {
      task_id: opts.task_id,
      runner_operation: opts.operation,
      active_run_authority: "supervisor_active_run_claim",
      competing_run_id: opts.competing_run_id,
      competing_operation: opts.competing_operation,
    },
  });
  return observation.error as CliError;
}
