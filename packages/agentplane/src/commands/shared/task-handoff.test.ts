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
});
