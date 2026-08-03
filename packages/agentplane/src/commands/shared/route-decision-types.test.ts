import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { taskSummary } from "./route-decision-types.js";

describe("task route summary", () => {
  it("projects the canonical hash from structured task commit evidence", () => {
    const task = {
      id: "202608030100-C0MM1T",
      title: "Structured commit",
      status: "DOING",
      owner: "CODER",
      commit: { hash: "a".repeat(40), message: "feat: implementation" },
    } as TaskData;

    expect(taskSummary(task).commit).toBe("a".repeat(40));
  });

  it("projects completed-task token usage without changing its provenance", () => {
    const tokenUsage = {
      schema_version: 1 as const,
      state: "partial" as const,
      input_tokens: 120,
      output_tokens: null,
      reasoning_tokens: null,
      total_tokens: 150,
      agent_runs: 2,
      observed_agent_runs: 1,
      source: "supervisor_journal" as const,
      observed_by: "agentplane" as const,
      journal_digest: `sha256:${"a".repeat(64)}`,
      unavailable_reason: "some_agent_runs_lack_provider_token_telemetry",
      updated_at: "2026-08-03T12:00:00.000Z",
    };
    const task = {
      id: "202608030101-T0KENS",
      title: "Token projection",
      status: "DONE",
      owner: "CODER",
      token_usage: tokenUsage,
    } as TaskData;

    expect(taskSummary(task).token_usage).toEqual(tokenUsage);
  });
});
