import path from "node:path";

import type { RunnerArtifactPaths } from "./types.js";

export const RUNNER_BUNDLE_FILENAME = "bundle.json";
export const RUNNER_BOOTSTRAP_FILENAME = "bootstrap.md";
export const RUNNER_STATE_FILENAME = "run-state.json";
export const RUNNER_EVENTS_FILENAME = "events.jsonl";
export const RUNNER_RESULT_FILENAME = "result.json";
export const RUNNER_TRACE_FILENAME = "agent-trace.jsonl";
export const RUNNER_STDERR_FILENAME = "stderr.log";

export type TaskRunnerPaths = RunnerArtifactPaths & {
  task_dir: string;
  runs_dir: string;
};

export function createRunnerRunId(date: Date = new Date()): string {
  return date.toISOString().replaceAll(":", "-").replaceAll(".", "-");
}

export function resolveTaskRunnerPaths(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  run_id: string;
}): TaskRunnerPaths {
  const task_dir = path.join(opts.git_root, opts.workflow_dir, opts.task_id);
  const runs_dir = path.join(task_dir, "runs");
  const run_dir = path.join(runs_dir, opts.run_id);
  return {
    task_dir,
    runs_dir,
    run_dir,
    bundle_path: path.join(run_dir, RUNNER_BUNDLE_FILENAME),
    bootstrap_path: path.join(run_dir, RUNNER_BOOTSTRAP_FILENAME),
    state_path: path.join(run_dir, RUNNER_STATE_FILENAME),
    events_path: path.join(run_dir, RUNNER_EVENTS_FILENAME),
    result_path: path.join(run_dir, RUNNER_RESULT_FILENAME),
    trace_path: path.join(run_dir, RUNNER_TRACE_FILENAME),
    stderr_path: path.join(run_dir, RUNNER_STDERR_FILENAME),
  };
}
