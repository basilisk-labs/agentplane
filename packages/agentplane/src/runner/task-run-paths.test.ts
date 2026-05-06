import { describe, expect, it } from "vitest";

import {
  RUNNER_BOOTSTRAP_FILENAME,
  RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME,
  RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME,
  RUNNER_BLUEPRINT_PLAN_FILENAME,
  RUNNER_BUNDLE_FILENAME,
  RUNNER_CONTEXT_MANIFEST_FILENAME,
  RUNNER_EVENTS_FILENAME,
  RUNNER_RESULT_FILENAME,
  RUNNER_STATE_FILENAME,
  RUNNER_STDERR_FILENAME,
  RUNNER_TRACE_FILENAME,
  resolveTaskRunnerPaths,
} from "./task-run-paths.js";

describe("resolveTaskRunnerPaths", () => {
  it("derives task-local runner artifact paths under runs/<run-id>", () => {
    const paths = resolveTaskRunnerPaths({
      git_root: "/repo",
      workflow_dir: ".agentplane/tasks",
      task_id: "202603231310-NT5V5C",
      run_id: "2026-03-23T13-00-00-000Z",
    });

    expect(paths.task_dir).toBe("/repo/.agentplane/tasks/202603231310-NT5V5C");
    expect(paths.runs_dir).toBe("/repo/.agentplane/tasks/202603231310-NT5V5C/runs");
    expect(paths.run_dir).toBe(
      "/repo/.agentplane/tasks/202603231310-NT5V5C/runs/2026-03-23T13-00-00-000Z",
    );
    expect(paths.bundle_path).toBe(`${paths.run_dir}/${RUNNER_BUNDLE_FILENAME}`);
    expect(paths.blueprint_plan_path).toBe(`${paths.run_dir}/${RUNNER_BLUEPRINT_PLAN_FILENAME}`);
    expect(paths.blueprint_execution_plan_path).toBe(
      `${paths.run_dir}/${RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME}`,
    );
    expect(paths.blueprint_execution_state_path).toBe(
      `${paths.run_dir}/${RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME}`,
    );
    expect(paths.context_manifest_path).toBe(
      `${paths.run_dir}/${RUNNER_CONTEXT_MANIFEST_FILENAME}`,
    );
    expect(paths.bootstrap_path).toBe(`${paths.run_dir}/${RUNNER_BOOTSTRAP_FILENAME}`);
    expect(paths.state_path).toBe(`${paths.run_dir}/${RUNNER_STATE_FILENAME}`);
    expect(paths.events_path).toBe(`${paths.run_dir}/${RUNNER_EVENTS_FILENAME}`);
    expect(paths.result_path).toBe(`${paths.run_dir}/${RUNNER_RESULT_FILENAME}`);
    expect(paths.trace_path).toBe(`${paths.run_dir}/${RUNNER_TRACE_FILENAME}`);
    expect(paths.stderr_path).toBe(`${paths.run_dir}/${RUNNER_STDERR_FILENAME}`);
  });
});
