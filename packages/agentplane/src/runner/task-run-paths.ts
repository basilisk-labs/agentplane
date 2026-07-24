import { realpath } from "node:fs/promises";
import path from "node:path";
import { gitRevParse } from "@agentplaneorg/core/git";

import type { RunnerArtifactPaths } from "./types.js";

export const RUNNER_BUNDLE_FILENAME = "bundle.json";
export const RUNNER_BLUEPRINT_PLAN_FILENAME = "blueprint-plan.json";
export const RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME = "blueprint-execution-plan.json";
export const RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME = "blueprint-execution-state.json";
export const RUNNER_CONTEXT_MANIFEST_FILENAME = "context-manifest.json";
export const RUNNER_BOOTSTRAP_FILENAME = "bootstrap.md";
export const RUNNER_STATE_FILENAME = "run-state.json";
export const RUNNER_EVENTS_FILENAME = "events.jsonl";
export const RUNNER_RESULT_FILENAME = "result.json";
export const RUNNER_EXECUTION_RECEIPT_FILENAME = "execution-receipt.json";
export const RUNNER_TRACE_FILENAME = "agent-trace.jsonl";
export const RUNNER_STDERR_FILENAME = "stderr.log";
const RUNNER_ARTIFACT_LOCATOR_PROTOCOL = "agentplane-run:";
const RUNNER_ARTIFACT_LOCATOR_HOST = "tasks";

export type TaskRunnerPaths = RunnerArtifactPaths & {
  artifact_root: string;
  task_dir: string;
  runs_dir: string;
};

export function createRunnerRunId(date: Date = new Date()): string {
  return date.toISOString().replaceAll(":", "-").replaceAll(".", "-");
}

export function assertSafeRunnerRunId(runId: string): string {
  const normalized = runId.trim();
  if (
    normalized.length === 0 ||
    normalized === "." ||
    normalized === ".." ||
    normalized.includes("\0") ||
    normalized.includes("/") ||
    normalized.includes("\\") ||
    path.basename(normalized) !== normalized
  ) {
    throw new Error(`runner run_id must be a non-empty path segment: ${JSON.stringify(runId)}`);
  }
  return normalized;
}

function assertSafeRunnerTaskId(taskId: string): string {
  const normalized = taskId.trim();
  if (
    normalized.length === 0 ||
    normalized === "." ||
    normalized === ".." ||
    normalized.includes("\0") ||
    normalized.includes("/") ||
    normalized.includes("\\") ||
    path.basename(normalized) !== normalized
  ) {
    throw new Error(`runner task_id must be a non-empty path segment: ${JSON.stringify(taskId)}`);
  }
  return normalized;
}

export function resolveTaskRunnerPaths(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  run_id: string;
  artifact_root?: string;
}): TaskRunnerPaths {
  const runId = assertSafeRunnerRunId(opts.run_id);
  const taskId = assertSafeRunnerTaskId(opts.task_id);
  const artifact_root = path.resolve(opts.artifact_root ?? opts.git_root);
  const task_dir = opts.artifact_root
    ? path.join(artifact_root, "agentplane", "runner", "tasks", taskId)
    : path.join(artifact_root, opts.workflow_dir, taskId);
  const runs_dir = path.join(task_dir, "runs");
  const run_dir = path.join(runs_dir, runId);
  return {
    artifact_root,
    task_dir,
    runs_dir,
    run_dir,
    bundle_path: path.join(run_dir, RUNNER_BUNDLE_FILENAME),
    blueprint_plan_path: path.join(run_dir, RUNNER_BLUEPRINT_PLAN_FILENAME),
    blueprint_execution_plan_path: path.join(run_dir, RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME),
    blueprint_execution_state_path: path.join(run_dir, RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME),
    context_manifest_path: path.join(run_dir, RUNNER_CONTEXT_MANIFEST_FILENAME),
    bootstrap_path: path.join(run_dir, RUNNER_BOOTSTRAP_FILENAME),
    state_path: path.join(run_dir, RUNNER_STATE_FILENAME),
    events_path: path.join(run_dir, RUNNER_EVENTS_FILENAME),
    result_path: path.join(run_dir, RUNNER_RESULT_FILENAME),
    receipt_path: path.join(run_dir, RUNNER_EXECUTION_RECEIPT_FILENAME),
    trace_path: path.join(run_dir, RUNNER_TRACE_FILENAME),
    stderr_path: path.join(run_dir, RUNNER_STDERR_FILENAME),
  };
}

function resolveGitPath(gitRoot: string, rawPath: string): string {
  return path.isAbsolute(rawPath) ? path.resolve(rawPath) : path.resolve(gitRoot, rawPath);
}

/**
 * Production runner artifacts live under the repository's protected common
 * Git administrative directory. The common directory is outside
 * provider-writable workspace roots and survives linked-worktree cleanup.
 */
export async function resolveSupervisorTaskRunnerPaths(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  run_id: string;
}): Promise<TaskRunnerPaths> {
  const rawCommonGitDir = await gitRevParse(opts.git_root, ["--git-common-dir"]);
  const commonGitDir = await realpath(resolveGitPath(opts.git_root, rawCommonGitDir));
  return resolveTaskRunnerPaths({
    ...opts,
    artifact_root: commonGitDir,
  });
}

export function createSupervisorExecutionReceiptLocator(opts: {
  task_id: string;
  run_id: string;
}): string {
  const taskId = assertSafeRunnerTaskId(opts.task_id);
  const runId = assertSafeRunnerRunId(opts.run_id);
  return (
    `${RUNNER_ARTIFACT_LOCATOR_PROTOCOL}//${RUNNER_ARTIFACT_LOCATOR_HOST}/` +
    `${encodeURIComponent(taskId)}/${encodeURIComponent(runId)}/` +
    RUNNER_EXECUTION_RECEIPT_FILENAME
  );
}

function parseSupervisorExecutionReceiptLocator(locator: string): {
  task_id: string;
  run_id: string;
} {
  let parsed: URL;
  try {
    parsed = new URL(locator);
  } catch {
    throw new Error(`Invalid supervisor execution receipt locator: ${JSON.stringify(locator)}`);
  }
  const segments = parsed.pathname.split("/").filter(Boolean);
  if (
    parsed.protocol !== RUNNER_ARTIFACT_LOCATOR_PROTOCOL ||
    parsed.host !== RUNNER_ARTIFACT_LOCATOR_HOST ||
    parsed.username ||
    parsed.password ||
    parsed.port ||
    parsed.search ||
    parsed.hash ||
    segments.length !== 3 ||
    segments[2] !== RUNNER_EXECUTION_RECEIPT_FILENAME
  ) {
    throw new Error(`Invalid supervisor execution receipt locator: ${JSON.stringify(locator)}`);
  }
  try {
    return {
      task_id: assertSafeRunnerTaskId(decodeURIComponent(segments[0]!)),
      run_id: assertSafeRunnerRunId(decodeURIComponent(segments[1]!)),
    };
  } catch {
    throw new Error(`Invalid supervisor execution receipt locator: ${JSON.stringify(locator)}`);
  }
}

export async function resolveSupervisorExecutionReceiptLocator(opts: {
  git_root: string;
  workflow_dir: string;
  locator: string;
}): Promise<string> {
  const reference = parseSupervisorExecutionReceiptLocator(opts.locator);
  const paths = await resolveSupervisorTaskRunnerPaths({
    git_root: opts.git_root,
    workflow_dir: opts.workflow_dir,
    task_id: reference.task_id,
    run_id: reference.run_id,
  });
  return paths.receipt_path;
}
