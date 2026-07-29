import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { compareDirectTaskSupervisionGoldenPath } from "./direct-task-supervision-benchmark.js";

function frozenV0624DirectBaseline() {
  const baseline = JSON.parse(
    readFileSync(
      path.resolve(process.cwd(), "scripts/baselines/agent-efficiency-pre-v0.7-replay.json"),
      "utf8",
    ),
  ) as {
    diagnostics: {
      scenarios: {
        id: string;
        metrics: {
          lifecycle_calls: { median: number };
          duplicate_input_bytes: { median: number };
        };
      }[];
    };
  };
  const fixtures = JSON.parse(
    readFileSync(
      path.resolve(process.cwd(), "scripts/bench/agent-efficiency-fixtures.json"),
      "utf8",
    ),
  ) as {
    scenarios: { id: string; expected_lifecycle_trace: string[] }[];
  };
  const measured = baseline.diagnostics.scenarios.find((entry) => entry.id === "direct");
  const control = fixtures.scenarios.find((entry) => entry.id === "direct");
  if (!measured || !control) throw new Error("missing frozen 0.6.24 direct baseline");
  return {
    lifecycle_calls: measured.metrics.lifecycle_calls.median,
    tool_calls: control.expected_lifecycle_trace.length,
    duplicate_executor_context_bytes: measured.metrics.duplicate_input_bytes.median,
  };
}

describe("direct task supervision golden cost", () => {
  it("accepts an observed comparison only when every cost and safety input passes", () => {
    const baseline = frozenV0624DirectBaseline();
    const comparison = compareDirectTaskSupervisionGoldenPath({
      baseline,
      candidate: {
        lifecycle_calls: baseline.lifecycle_calls - 1,
        tool_calls: baseline.tool_calls - 1,
        duplicate_executor_context_bytes: baseline.duplicate_executor_context_bytes - 1,
      },
      quality_safety: {
        verified_success: true,
        executor_lifecycle_event_delta: 0,
        committed_scope_enforced: true,
      },
    });

    expect(baseline).toEqual({
      lifecycle_calls: 7,
      tool_calls: 7,
      duplicate_executor_context_bytes: 20_562,
    });
    expect(comparison).toEqual({
      lifecycle_calls_reduced: true,
      tool_calls_reduced: true,
      duplicate_executor_context_reduced: true,
      verified_success_preserved: true,
      lifecycle_ownership_preserved: true,
      committed_scope_enforced: true,
      passed: true,
    });
  });

  it("fails closed when a safety invariant or a cost threshold regresses", () => {
    const comparison = compareDirectTaskSupervisionGoldenPath({
      baseline: frozenV0624DirectBaseline(),
      candidate: {
        lifecycle_calls: 7,
        tool_calls: 7,
        duplicate_executor_context_bytes: 20_562,
      },
      quality_safety: {
        verified_success: true,
        executor_lifecycle_event_delta: 1,
        committed_scope_enforced: false,
      },
    });

    expect(comparison.passed).toBe(false);
    expect(comparison.lifecycle_ownership_preserved).toBe(false);
    expect(comparison.committed_scope_enforced).toBe(false);
  });
});
