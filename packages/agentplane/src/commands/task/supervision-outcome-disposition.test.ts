import { describe, expect, it } from "vitest";

import type { BranchTaskSupervisorStopCode } from "./branch-task-supervisor.js";
import type { DirectTaskSupervisorStopCode } from "./direct-task-supervisor-result.js";
import {
  branchStopOutcome,
  branchTaskSupervisionDisposition,
  directStopOutcome,
  directTaskSupervisionDisposition,
} from "./supervision-outcome-disposition.js";

const DIRECT_PAUSES = [
  "approval_required",
  "semantic_input_required",
  "human_input_required",
  "wait_required",
  "evaluator_rework",
  "evaluator_blocked",
  "evaluator_human_review",
] as const satisfies readonly DirectTaskSupervisorStopCode[];

const DIRECT_NONZERO = [
  "verification_check_failed",
  "implementation_scope_violation",
  "stale_route",
  "route_refresh_failed",
  "executor_semantic_failed",
] as const satisfies readonly DirectTaskSupervisorStopCode[];

const BRANCH_PAUSES = [
  "approval_required",
  "semantic_input_required",
  "human_input_required",
  "wait_required",
  "evaluator_rework",
  "evaluator_blocked",
  "evaluator_human_review",
] as const satisfies readonly BranchTaskSupervisorStopCode[];

describe("task supervision outcome dispositions", () => {
  it.each(DIRECT_PAUSES)("classifies direct pause %s without false failure", (code) => {
    const outcome = directStopOutcome(code);
    expect(["awaiting_plan_approval", "external_wait", "human_required"]).toContain(outcome);
    expect(
      directTaskSupervisionDisposition({
        status: "stopped",
        stop: { code, reason: code, route_step_id: "step", operation_id: null },
      }),
    ).toMatchObject({
      kind: expect.stringMatching(/pause|wait/u) as unknown,
      exit_code: 0,
      terminal: false,
    });
  });

  it.each(DIRECT_NONZERO)("fails closed for direct deterministic stop %s", (code) => {
    expect(
      directTaskSupervisionDisposition({
        status: "stopped",
        stop: { code, reason: code, route_step_id: "step", operation_id: null },
      }).exit_code,
    ).toBeGreaterThan(0);
  });

  it.each(BRANCH_PAUSES)("classifies branch pause %s consistently", (code) => {
    const outcome = branchStopOutcome(code);
    expect(["awaiting_plan_approval", "external_wait", "human_required"]).toContain(outcome);
    expect(
      branchTaskSupervisionDisposition({
        status: "stopped",
        stop: { code, reason: code, route_step_id: "step", operation_id: null },
      }).exit_code,
    ).toBe(0);
  });

  it("treats terminal attention as blocked and finalized results as success", () => {
    expect(branchStopOutcome("terminal_attention")).toBe("blocked");
    expect(
      branchTaskSupervisionDisposition({
        status: "stopped",
        stop: {
          code: "terminal_attention",
          reason: "attention",
          route_step_id: "terminal",
          operation_id: null,
        },
      }).exit_code,
    ).toBe(2);
    expect(directTaskSupervisionDisposition({ status: "finalized", stop: null })).toMatchObject({
      kind: "success",
      exit_code: 0,
      terminal: true,
    });
    expect(branchTaskSupervisionDisposition({ status: "finalized", stop: null }).exit_code).toBe(0);
  });
});
