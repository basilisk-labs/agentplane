import { describe, expect, it } from "vitest";

import { classifyCodexSmokeRun } from "./codex-smoke.js";
import type { RunnerRunState } from "./types.js";

function makeState(
  overrides: Partial<RunnerRunState> & { status: RunnerRunState["status"] },
): RunnerRunState {
  return {
    schema_version: 1,
    runner_api_version: "1",
    run_id: "run-smoke",
    adapter_id: "codex",
    target: { kind: "task", task_id: "202603241111-SMOKE" },
    status: overrides.status,
    mode: "execute",
    bundle_path: "/tmp/bundle.json",
    result_path: "/tmp/result.json",
    bootstrap_path: "/tmp/bootstrap.md",
    events_path: "/tmp/events.jsonl",
    trace_path: "/tmp/agent-trace.jsonl",
    stderr_path: "/tmp/stderr.log",
    trace_policy: {
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
    },
    timeout_policy: {
      wall_clock_ms: 900_000,
      idle_ms: 180_000,
      terminate_grace_ms: 1500,
    },
    created_at: "2026-03-24T00:00:00.000Z",
    updated_at: "2026-03-24T00:00:01.000Z",
    ...overrides,
  };
}

describe("classifyCodexSmokeRun", () => {
  it("classifies successful runs", () => {
    const classification = classifyCodexSmokeRun(
      makeState({
        status: "success",
        result: {
          status: "success",
          exit_code: 0,
          started_at: "2026-03-24T00:00:00.000Z",
          ended_at: "2026-03-24T00:00:01.000Z",
        },
      }),
    );

    expect(classification.outcome).toBe("success");
    expect(classification.summary).toContain("completed successfully");
  });

  it("classifies timeout failures", () => {
    const classification = classifyCodexSmokeRun(
      makeState({
        status: "failed",
        result: {
          status: "failed",
          exit_code: 124,
          started_at: "2026-03-24T00:00:00.000Z",
          ended_at: "2026-03-24T00:00:01.000Z",
          timeout_reason: "idle",
        },
      }),
    );

    expect(classification.outcome).toBe("timeout");
    expect(classification.timeout_reason).toBe("idle");
  });

  it("classifies policy refusals before spawn", () => {
    const classification = classifyCodexSmokeRun(
      makeState({
        status: "failed",
        policy_decision: {
          adapter_id: "codex",
          requested: { requires_human_approval: true },
          effective: {},
          fields: {},
          refusal_reason: {
            code: "E_RUNTIME",
            message: "refused",
            policy_field: "requires_human_approval",
            declared_value: true,
          },
        },
      }),
    );

    expect(classification.outcome).toBe("policy_refusal");
    expect(classification.refusal_reason?.policy_field).toBe("requires_human_approval");
  });

  it("classifies non-timeout failures as runner failures", () => {
    const classification = classifyCodexSmokeRun(
      makeState({
        status: "failed",
        result: {
          status: "failed",
          exit_code: 1,
          started_at: "2026-03-24T00:00:00.000Z",
          ended_at: "2026-03-24T00:00:01.000Z",
        },
      }),
    );

    expect(classification.outcome).toBe("runner_failure");
  });
});
