import { describe, expect, it } from "vitest";

import { selectTaskRunnerInspectionRun } from "./task-run-inspect.js";

describe("task runner inspection run selection", () => {
  it("gives an explicit run id precedence over every persisted default", () => {
    expect(
      selectTaskRunnerInspectionRun({
        explicit_run_id: "run-explicit",
        active_claim_run_id: "run-active",
        task_projection_run_id: "run-projected",
      }),
    ).toEqual({ source: "explicit", run_id: "run-explicit" });
  });

  it("pins default inspection to the active claim despite a later wall-clock run", () => {
    expect(
      selectTaskRunnerInspectionRun({
        active_claim_run_id: "run-before-clock-rollback",
        task_projection_run_id: "run-with-later-timestamp",
      }),
    ).toEqual({
      source: "active_claim",
      run_id: "run-before-clock-rollback",
    });
  });

  it("uses the TaskData projection when no active claim exists", () => {
    expect(
      selectTaskRunnerInspectionRun({
        task_projection_run_id: "run-projected",
      }),
    ).toEqual({ source: "task_projection", run_id: "run-projected" });
  });

  it("uses timestamp ordering only when no authoritative run id exists", () => {
    expect(selectTaskRunnerInspectionRun({})).toEqual({
      source: "timestamp",
      run_id: null,
    });
  });
});
