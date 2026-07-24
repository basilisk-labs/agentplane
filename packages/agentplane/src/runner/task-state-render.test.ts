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
    secondState.created_at = "2026-07-23T10:00:01.000Z";
    secondState.updated_at = "2026-07-23T10:00:01.000Z";
    const second = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: secondState, result: secondState.result ?? null },
      previous: first,
      ordering_authority: "current_active_claim",
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

  it("keeps a newer run latest when an older terminal projection arrives late", () => {
    const olderState = stateWithReceipt("2026-07-23T10-00-00-000Z");
    olderState.created_at = "2026-07-23T10:00:00.000Z";
    olderState.updated_at = "2026-07-23T10:00:05.000Z";
    const newerState = stateWithReceipt("2026-07-23T10-00-02-000Z");
    newerState.created_at = "2026-07-23T10:00:02.000Z";
    newerState.updated_at = "2026-07-23T10:00:03.000Z";
    const newer = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: newerState, result: newerState.result ?? null },
    });

    const reconciled = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: olderState, result: olderState.result ?? null },
      previous: newer,
    });

    expect(reconciled.run_id).toBe(newerState.run_id);
    expect(reconciled.updated_at).toBe(newerState.updated_at);
    expect(reconciled.history?.map((entry) => entry.run_id)).toEqual([
      newerState.run_id,
      olderState.run_id,
    ]);
    const rendered = renderRunnerOutcomeHistory({
      task_id: TASK_ID,
      outcome: reconciled,
      projection: { state: olderState, result: olderState.result ?? null },
    });
    expect(rendered.indexOf(`RunId: ${newerState.run_id}`)).toBeLessThan(
      rendered.indexOf(`RunId: ${olderState.run_id}`),
    );
  });

  it("uses active-claim authority instead of lexical run ids for equal creation times", () => {
    const olderState = stateWithReceipt("z-older-run");
    const older = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: olderState, result: olderState.result ?? null },
    });
    const newerState = stateWithReceipt("a-newer-run");
    const newer = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: newerState, result: newerState.result ?? null },
      previous: older,
      ordering_authority: "current_active_claim",
    });

    expect(newer.run_id).toBe(newerState.run_id);
    const delayedOlder = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: olderState, result: olderState.result ?? null },
      previous: newer,
    });
    expect(delayedOlder.run_id).toBe(newerState.run_id);
    expect(delayedOlder.history?.map((entry) => entry.run_id)).toEqual([
      newerState.run_id,
      olderState.run_id,
    ]);
  });

  it("uses current active-claim authority when a newer run has an earlier wall-clock time", () => {
    const previousState = stateWithReceipt("previous-run");
    previousState.created_at = "2026-07-23T10:00:00.000Z";
    const previous = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: previousState, result: previousState.result ?? null },
    });
    const currentState = stateWithReceipt("current-run-after-clock-step");
    currentState.created_at = "2026-07-23T09:59:59.000Z";
    currentState.updated_at = "2026-07-23T09:59:59.000Z";

    const current = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: currentState, result: currentState.result ?? null },
      previous,
      ordering_authority: "current_active_claim",
    });

    expect(current.run_id).toBe(currentState.run_id);
    expect(current.history?.map((entry) => entry.run_id)).toEqual([
      currentState.run_id,
      previousState.run_id,
    ]);
  });

  it("keeps the current run latest when a prior run reconciles after a clock rollback", () => {
    const priorState = stateWithReceipt("prior-terminal-run");
    priorState.created_at = "2026-07-23T10:00:00.000Z";
    priorState.updated_at = "2026-07-23T10:00:01.000Z";
    const prior = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: priorState, result: priorState.result ?? null },
    });
    const currentState = stateWithReceipt("current-run-after-clock-rollback");
    currentState.status = "prepared";
    currentState.result = null;
    currentState.created_at = "2026-07-23T09:59:00.000Z";
    currentState.updated_at = "2026-07-23T09:59:00.000Z";
    const current = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: currentState, result: null },
      previous: prior,
      ordering_authority: "current_active_claim",
    });

    const delayedPrior = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: priorState, result: priorState.result ?? null },
      previous: current,
    });

    expect(delayedPrior.run_id).toBe(currentState.run_id);
    expect(delayedPrior.status).toBe("prepared");
    expect(delayedPrior.history?.map((entry) => entry.run_id)).toEqual([
      currentState.run_id,
      priorState.run_id,
    ]);
  });

  it("allows an initial projection without active-claim authority", () => {
    const initialState = stateWithReceipt("initial-historical-run");

    const initial = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: initialState, result: initialState.result ?? null },
    });

    expect(initial.run_id).toBe(initialState.run_id);
    expect(initial.status).toBe("success");
    expect(initial.history).toBeUndefined();
  });

  it("lets a current active claim supersede a legacy outcome without created_at", () => {
    const legacyState = stateWithReceipt("legacy-run");
    const legacy = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: legacyState, result: legacyState.result ?? null },
    });
    delete legacy.created_at;
    const currentState = stateWithReceipt("current-run");
    currentState.created_at = "2026-07-23T09:59:59.000Z";
    const current = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: currentState, result: currentState.result ?? null },
      previous: legacy,
      ordering_authority: "current_active_claim",
    });

    expect(current.run_id).toBe(currentState.run_id);
    expect(current.history?.map((entry) => entry.run_id)).toEqual([
      currentState.run_id,
      legacyState.run_id,
    ]);
  });

  it("advances the same run by lifecycle state when the wall clock moves backwards", () => {
    const preparedState = stateWithReceipt("clock-regression-run");
    preparedState.status = "prepared";
    preparedState.result = null;
    preparedState.updated_at = "2026-07-23T10:00:00.000Z";
    const prepared = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: preparedState, result: null },
    });
    const terminalState = stateWithReceipt("clock-regression-run");
    terminalState.updated_at = "2026-07-23T09:59:59.000Z";

    const terminal = buildTaskRunnerOutcome({
      task_id: TASK_ID,
      projection: { state: terminalState, result: terminalState.result ?? null },
      previous: prepared,
    });

    expect(terminal.run_id).toBe(terminalState.run_id);
    expect(terminal.status).toBe("success");
    expect(terminal.updated_at).toBe(terminalState.updated_at);
  });
});
