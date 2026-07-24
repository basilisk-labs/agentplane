import { describe, expect, it } from "vitest";

import { createSupervisorExecutionReceiptLocator } from "./task-run-paths.js";
import type { RunnerRunState } from "./types.js";
import { buildTaskRunnerOutcome, renderRunnerOutcomeHistory } from "./task-state-render.js";

const RECEIPT_SHA = `sha256:${"a".repeat(64)}`;
const TASK_ID = "202607231000-RECEIPT";

function stateWithReceipt(
  runId: string,
  opts: { legacy_receipt_path?: boolean } = {},
): RunnerRunState {
  const timestamp = "2026-07-23T10:00:00.000Z";
  const localRunDir = `/Users/alice/project/.git/agentplane/runner/tasks/${TASK_ID}/runs/${runId}`;
  const receiptLocator = createSupervisorExecutionReceiptLocator({
    task_id: TASK_ID,
    run_id: runId,
  });
  return {
    schema_version: 1,
    runner_api_version: "1",
    run_id: runId,
    adapter_id: "custom",
    target: { kind: "task", task_id: TASK_ID },
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
      output_paths: [`${localRunDir}/agent-trace.jsonl`],
      artifacts: [{ path: `${localRunDir}/agent-trace.jsonl`, label: "raw-trace" }],
      evidence: {
        evidence_paths: [
          `${localRunDir}/agent-trace.jsonl`,
          "context/wiki/index.md",
          receiptLocator,
        ],
        changed_paths: ["context/wiki/index.md"],
        files_changed_count: 1,
      },
      execution_receipt: {
        path: opts.legacy_receipt_path ? `${localRunDir}/execution-receipt.json` : receiptLocator,
        sha256: RECEIPT_SHA,
        verification_state: "observed_success",
        observed_by: "agentplane",
      },
    },
  };
}

describe("task runner execution receipt projection", () => {
  it("preserves the receipt and supervisor provenance across outcome history", () => {
    const firstState = stateWithReceipt("run-receipt-1", { legacy_receipt_path: true });
    const first = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: firstState, result: firstState.result ?? null },
    });

    expect(first.evidence).toMatchObject({
      provenance: "supervisor_observed",
      evidence_paths: [
        "context/wiki/index.md",
        "agentplane-run://tasks/202607231000-RECEIPT/run-receipt-1/execution-receipt.json",
      ],
      changed_paths: ["context/wiki/index.md"],
    });
    expect(first.output_paths).toBeUndefined();
    expect(first.execution_receipt?.path).toBe(
      "agentplane-run://tasks/202607231000-RECEIPT/run-receipt-1/execution-receipt.json",
    );

    const secondState = stateWithReceipt("run-receipt-2");
    const second = buildTaskRunnerOutcome({
      task_id: TASK_ID,
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
      "ExecutionReceipt: agentplane-run://tasks/202607231000-RECEIPT/run-receipt-2/execution-receipt.json",
    );
    expect(rendered).toContain(
      "RunArtifacts: ap task run inspect 202607231000-RECEIPT --run-id run-receipt-2",
    );
    expect(rendered).not.toContain(
      "RunArtifacts: .agentplane/tasks/202607231000-RECEIPT/runs/run-receipt-2",
    );
    expect(rendered).not.toContain("/Users/alice/project");
    expect(rendered).not.toContain(".git/agentplane/runner/tasks");
    expect(rendered).toContain(`ExecutionReceiptSha256: ${RECEIPT_SHA}`);
    expect(rendered).toContain("ExecutionReceiptVerification: observed_success");
  });
});
