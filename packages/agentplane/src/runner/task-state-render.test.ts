import { describe, expect, it } from "vitest";

import type { RunnerRunState } from "./types.js";
import { buildTaskRunnerOutcome, renderRunnerOutcomeHistory } from "./task-state-render.js";

const RECEIPT_SHA = `sha256:${"a".repeat(64)}`;

function stateWithReceipt(runId: string): RunnerRunState {
  const timestamp = "2026-07-23T10:00:00.000Z";
  return {
    schema_version: 1,
    runner_api_version: "1",
    run_id: runId,
    adapter_id: "custom",
    target: { kind: "task", task_id: "202607231000-RECEIPT" },
    status: "success",
    mode: "execute",
    bundle_path: "/repo/run/bundle.json",
    result_path: "/repo/run/result.json",
    events_path: "/repo/run/events.jsonl",
    trace_path: "/repo/run/trace.jsonl",
    stderr_path: "/repo/run/stderr.log",
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
    created_at: timestamp,
    updated_at: timestamp,
    result: {
      status: "success",
      exit_code: 0,
      started_at: timestamp,
      ended_at: timestamp,
      evidence: {
        changed_paths: ["context/wiki/index.md"],
        files_changed_count: 1,
      },
      execution_receipt: {
        path: `.agentplane/tasks/202607231000-RECEIPT/runs/${runId}/execution-receipt.json`,
        sha256: RECEIPT_SHA,
        verification_state: "observed_success",
        observed_by: "agentplane",
      },
    },
  };
}

describe("task runner execution receipt projection", () => {
  it("preserves the receipt and supervisor provenance across outcome history", () => {
    const firstState = stateWithReceipt("run-receipt-1");
    const first = buildTaskRunnerOutcome({
      projection: { state: firstState, result: firstState.result ?? null },
    });

    expect(first.evidence).toMatchObject({
      provenance: "supervisor_observed",
      changed_paths: ["context/wiki/index.md"],
    });
    expect(first.execution_receipt).toEqual(firstState.result?.execution_receipt);

    const secondState = stateWithReceipt("run-receipt-2");
    const second = buildTaskRunnerOutcome({
      projection: { state: secondState, result: secondState.result ?? null },
      previous: first,
    });

    expect(second.history?.[1]?.execution_receipt).toEqual(first.execution_receipt);
    const rendered = renderRunnerOutcomeHistory({
      task_id: "202607231000-RECEIPT",
      outcome: second,
      projection: { state: secondState, result: secondState.result ?? null },
    });
    expect(rendered).toContain(
      "ExecutionReceipt: .agentplane/tasks/202607231000-RECEIPT/runs/run-receipt-2/execution-receipt.json",
    );
    expect(rendered).toContain(`ExecutionReceiptSha256: ${RECEIPT_SHA}`);
    expect(rendered).toContain("ExecutionReceiptVerification: observed_success");
  });
});
