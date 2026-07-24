import { describe, expect, it } from "vitest";

import { captureStdIO } from "@agentplane/testkit";
import { readObservedProcessIdentity } from "../../runner/process-supervision/signals.js";
import type { LoadedTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import {
  reportRunnerStatus,
  renderRunnerStatusPayload,
  renderTaskRunPayload,
  runnerReconciliationWarning,
} from "./run-render.js";

describe("task run rendering", () => {
  it("keeps execution status and verification confidence distinct", () => {
    expect(
      renderTaskRunPayload({
        taskId: "TASK-1",
        mode: "execute",
        adapterId: "codex",
        runId: "run-1",
        runDir: "/repo/runs/run-1",
        bundlePath: "/repo/runs/run-1/bundle.json",
        bootstrapPath: "/repo/runs/run-1/bootstrap.md",
        resultPath: "/repo/runs/run-1/result.json",
        status: "success",
        verificationState: "unverified",
        receiptPath: ".agentplane/tasks/TASK-1/runs/run-1/execution-receipt.json",
        exitCode: 0,
        summary: "Agent completed the requested work.",
      }),
    ).toMatchObject({
      status: "success",
      verification_state: "unverified",
      receipt_path: ".agentplane/tasks/TASK-1/runs/run-1/execution-receipt.json",
    });
  });

  it("renders persisted receipt trust in status JSON and human report entries", async () => {
    const inspection = {
      task_id: "TASK-1",
      run_id: "run-1",
      selection: "latest",
      paths: {
        run_dir: "/repo/runs/run-1",
        state_path: "/repo/runs/run-1/state.json",
        events_path: "/repo/runs/run-1/events.jsonl",
        trace_path: "/repo/runs/run-1/trace.jsonl",
        stderr_path: "/repo/runs/run-1/stderr.log",
        result_path: "/repo/runs/run-1/result.json",
        receipt_path: "/repo/runs/run-1/default-execution-receipt.json",
        bundle_path: "/repo/runs/run-1/bundle.json",
        bootstrap_path: "/repo/runs/run-1/bootstrap.md",
      },
      state: {
        status: "success",
        mode: "execute",
        adapter_id: "codex",
        target: { kind: "task", task_id: "TASK-1" },
        created_at: "2026-07-24T08:00:00.000Z",
        updated_at: "2026-07-24T08:01:00.000Z",
        result: {
          status: "success",
          exit_code: 0,
          started_at: "2026-07-24T08:00:00.000Z",
          ended_at: "2026-07-24T08:01:00.000Z",
          summary: "Completed.",
          execution_receipt: {
            path: ".agentplane/tasks/TASK-1/runs/run-1/observed-receipt.json",
            sha256: `sha256:${"1".repeat(64)}`,
            verification_state: "unverified",
            observed_by: "agentplane",
          },
        },
      },
    } as unknown as LoadedTaskRunnerInspection;

    const payload = await renderRunnerStatusPayload(inspection);
    expect(payload).toMatchObject({
      verification_state: "unverified",
      receipt_path: ".agentplane/tasks/TASK-1/runs/run-1/observed-receipt.json",
    });
    expect(payload.receipt_path).not.toBe(payload.paths.receipt);
    const io = captureStdIO();
    try {
      reportRunnerStatus(payload, "TASK-1");
      expect(io.stdout).toMatch(/verification:\s+unverified/u);
      expect(io.stdout).toMatch(
        /receipt:\s+\.agentplane\/tasks\/TASK-1\/runs\/run-1\/observed-receipt\.json/u,
      );
    } finally {
      io.restore();
    }
  });

  it("exposes a retained terminal claim and pending TaskData projection", async () => {
    const inspection = {
      task_id: "TASK-CLAIM",
      run_id: "run-terminal",
      selection: "latest",
      storage: "supervisor",
      paths: {
        run_dir: "/repo/runs/run-terminal",
        state_path: "/repo/runs/run-terminal/state.json",
        events_path: "/repo/runs/run-terminal/events.jsonl",
        trace_path: "/repo/runs/run-terminal/trace.jsonl",
        stderr_path: "/repo/runs/run-terminal/stderr.log",
        result_path: "/repo/runs/run-terminal/result.json",
        receipt_path: "/repo/runs/run-terminal/execution-receipt.json",
        bundle_path: "/repo/runs/run-terminal/bundle.json",
        bootstrap_path: "/repo/runs/run-terminal/bootstrap.md",
      },
      state: {
        status: "success",
        mode: "execute",
        adapter_id: "codex",
        target: { kind: "task", task_id: "TASK-CLAIM" },
        created_at: "2026-07-24T08:00:00.000Z",
        updated_at: "2026-07-24T08:01:00.000Z",
        result: {
          status: "success",
          exit_code: 0,
          started_at: "2026-07-24T08:00:00.000Z",
          ended_at: "2026-07-24T08:01:00.000Z",
          summary: "Completed.",
        },
      },
      active_claim: {
        schema_version: 1,
        claim_id: "claim-terminal",
        generation: "claim-terminal",
        task_id: "TASK-CLAIM",
        run_id: "run-terminal",
        operation: "execute",
        claimed_at: "2026-07-24T08:00:00.000Z",
        owner_pid: 999_999,
        owner_command: "/missing/agentplane",
        owner_started_at: "2000-01-01T00:00:00.000Z",
      },
      active_claim_owner_status: "stale",
      task_runner_outcome: null,
    } as unknown as LoadedTaskRunnerInspection;

    const pendingPayload = await renderRunnerStatusPayload(inspection);
    expect(pendingPayload).toMatchObject({
      active_claim_present: true,
      active_claim_retained: true,
      active_claim_selected_run: true,
      active_claim: {
        run_id: "run-terminal",
        owner_status: "stale",
      },
      projection_pending: true,
      reconcile_required: true,
    });
    expect(runnerReconciliationWarning(pendingPayload)).toContain("TaskData projection is pending");

    inspection.task_runner_outcome = {
      run_id: "run-terminal",
      status: "success",
      adapter_id: "codex",
      mode: "execute",
      updated_at: "2026-07-24T08:01:00.000Z",
      exit_code: 0,
      target: { kind: "task", task_id: "TASK-CLAIM" },
    };
    await expect(renderRunnerStatusPayload(inspection)).resolves.toMatchObject({
      projection_pending: false,
      reconcile_required: true,
    });
  });

  it("reports process identity mismatch and unverified liveness without trusting kill(0)", async () => {
    const observed = await readObservedProcessIdentity(process.pid);
    expect(observed).not.toBeNull();
    const base = {
      task_id: "TASK-PID",
      run_id: "run-pid",
      selection: "latest",
      storage: "supervisor",
      paths: {
        run_dir: "/repo/runs/run-pid",
        state_path: "/repo/runs/run-pid/state.json",
        events_path: "/repo/runs/run-pid/events.jsonl",
        trace_path: "/repo/runs/run-pid/trace.jsonl",
        stderr_path: "/repo/runs/run-pid/stderr.log",
        result_path: "/repo/runs/run-pid/result.json",
        receipt_path: "/repo/runs/run-pid/execution-receipt.json",
        bundle_path: "/repo/runs/run-pid/bundle.json",
        bootstrap_path: "/repo/runs/run-pid/bootstrap.md",
      },
      active_claim: null,
      active_claim_owner_status: null,
      task_runner_outcome: null,
      state: {
        status: "running",
        mode: "execute",
        adapter_id: "codex",
        target: { kind: "task", task_id: "TASK-PID" },
        created_at: "2026-07-24T08:00:00.000Z",
        updated_at: "2026-07-24T08:01:00.000Z",
        supervision: {
          pid: process.pid,
        },
      },
    } as unknown as LoadedTaskRunnerInspection;

    await expect(renderRunnerStatusPayload(base)).resolves.toMatchObject({
      pid_alive: "unverified",
    });
    base.state.supervision!.process_identity = {
      pid: process.pid,
      command: `${observed!.command ?? ""}-different`,
      started_at: observed!.started_at ?? "2000-01-01T00:00:00.000Z",
      observed_at: "2026-07-24T08:00:00.000Z",
    };
    await expect(renderRunnerStatusPayload(base)).resolves.toMatchObject({
      pid_alive: "mismatch",
    });
  });
});
