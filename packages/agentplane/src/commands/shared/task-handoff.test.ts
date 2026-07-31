import { describe, expect, it } from "vitest";

import { buildRunnerHintCommands } from "./task-handoff.js";

describe("task handoff runner hints", () => {
  it("routes blocked runner states to recovery instead of verification", () => {
    expect(
      buildRunnerHintCommands({
        task_id: "202606041738-A531FX",
        run_id: "run-blocked",
        status: "blocked",
      }),
    ).toEqual({
      next_action: "retry",
      next_command: "agentplane task run 202606041738-A531FX",
      resume_command: "agentplane task run status 202606041738-A531FX --run-id run-blocked",
      retry_command: "agentplane task run 202606041738-A531FX",
    });
  });

  it("does not present a read-only diagnostic as a terminal runner transition", () => {
    expect(
      buildRunnerHintCommands({
        task_id: "202607311055-ST7XZY",
        run_id: "run-succeeded",
        status: "succeeded",
      }),
    ).toEqual({
      next_action: "none",
      next_command: null,
      resume_command: "agentplane task run status 202607311055-ST7XZY --run-id run-succeeded",
      retry_command: "agentplane task run 202607311055-ST7XZY",
    });
  });

  it("keeps every runner transition free of the state-neutral verify-show command", () => {
    const states = [
      { run_id: null, status: null },
      { run_id: "run-prepared", status: "prepared" },
      { run_id: "run-running", status: "running", pid_alive: true },
      { run_id: "run-stale", status: "running", pid_alive: false },
      { run_id: "run-failed", status: "failed" },
      { run_id: "run-blocked", status: "blocked" },
      { run_id: "run-cancelled", status: "cancelled" },
      { run_id: "run-succeeded", status: "succeeded" },
    ] as const;

    for (const state of states) {
      const hints = buildRunnerHintCommands({
        task_id: "202607311055-ST7XZY",
        ...state,
      });
      expect(hints.next_command ?? "").not.toContain("verify-show");
    }
  });
});
