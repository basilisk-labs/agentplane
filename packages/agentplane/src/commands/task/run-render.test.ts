import { describe, expect, it } from "vitest";

import { captureStdIO } from "@agentplane/testkit";
import type { LoadedTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import {
  reportRunnerStatus,
  renderRunnerStatusPayload,
  renderTaskRunPayload,
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

  it("renders persisted receipt trust in status JSON and human report entries", () => {
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

    const payload = renderRunnerStatusPayload(inspection);
    expect(payload).toMatchObject({
      verification_state: "unverified",
      receipt_path: ".agentplane/tasks/TASK-1/runs/run-1/observed-receipt.json",
    });
    expect(payload.receipt_path).not.toBe(payload.paths.receipt);
    const io = captureStdIO();
    try {
      reportRunnerStatus(payload, "TASK-1");
      expect(io.stdout).toContain("verification: unverified");
      expect(io.stdout).toMatch(
        /receipt:\s+\.agentplane\/tasks\/TASK-1\/runs\/run-1\/observed-receipt\.json/u,
      );
    } finally {
      io.restore();
    }
  });
});
