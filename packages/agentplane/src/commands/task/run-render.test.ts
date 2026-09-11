import { mkdtemp, rm, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { captureStdIO } from "@agentplane/testkit";
import { readObservedProcessIdentity } from "../../runner/process-supervision/signals.js";
import type { LoadedTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import {
  projectExecutedTaskRunnerLifecycleResult,
  type TaskRunnerLifecycleResult,
} from "../../runner/usecases/task-run-lifecycle-result.js";
import {
  reportExecutedTaskRun,
  reportRunnerStatus,
  renderTaskRunnerLifecyclePayload,
  renderRunnerStatusPayload,
  renderTaskRunPayload,
  runnerReconciliationWarning,
} from "./run-render.js";

describe("task run rendering", () => {
  it("renders the typed effect lifecycle without parsing a runner report", () => {
    const lifecycle = {
      schema: "agentplane.task_runner_lifecycle_result.v1",
      phase: "executed",
      task_id: "TASK-EFFECT",
      invocation: {
        adapter_id: "codex",
        run_id: "run-effect",
        work_order_id: "work-order-effect",
        run_dir: "/repo/runs/run-effect",
        bundle_path: "/repo/runs/run-effect/bundle.json",
        bootstrap_path: "/repo/runs/run-effect/bootstrap.md",
        result_path: "/repo/runs/run-effect/result.json",
      },
      lifecycle: {
        mode: "execute",
        status: "failed",
        state_fingerprint: null,
        effect: {
          state: "effect_in_doubt",
          operation: {
            operation_key: `sha256:${"a".repeat(64)}`,
            operation_digest: `sha256:${"b".repeat(64)}`,
            claim_generation: `sha256:${"c".repeat(64)}`,
          },
          authority: {
            ref: "work-order:work-order-effect",
            digest: `sha256:${"e".repeat(64)}`,
          },
          observed_evidence: {
            code: "runner_adapter_effect_error",
            digest: `sha256:${"f".repeat(64)}`,
          },
          claim_generation: `sha256:${"c".repeat(64)}`,
          resolution: null,
          resolution_provenance: null,
          source_resolution: null,
          source_resolution_provenance: null,
        },
        work_order_authority: null,
      },
      result: {
        status: "failed",
        exit_code: 1,
        started_at: "2026-07-28T00:00:00.000Z",
        ended_at: "2026-07-28T00:00:01.000Z",
        summary: "provider outcome is uncertain",
      },
      active_claim_cleanup: null,
    } as unknown as TaskRunnerLifecycleResult;

    const payload = renderTaskRunnerLifecyclePayload(lifecycle);
    expect(payload).toMatchObject({
      task_id: "TASK-EFFECT",
      work_order_id: "work-order-effect",
      lifecycle_result: {
        lifecycle: {
          effect: {
            state: "effect_in_doubt",
            operation: { claim_generation: `sha256:${"c".repeat(64)}` },
            authority: { digest: `sha256:${"e".repeat(64)}` },
            observed_evidence: { digest: `sha256:${"f".repeat(64)}` },
            resolution: null,
          },
        },
      },
    });

    const io = captureStdIO();
    try {
      reportExecutedTaskRun(payload, "TASK-EFFECT");
      expect(io.stdout).toMatch(/work_order:\s+work-order-effect/u);
      expect(io.stdout).toMatch(/effect:\s+effect_in_doubt/u);
      expect(io.stdout).toMatch(new RegExp(`effect_authority:\\s+sha256:${"e".repeat(64)}`, "u"));
      expect(io.stdout).toMatch(new RegExp(`effect_evidence:\\s+sha256:${"f".repeat(64)}`, "u"));
      expect(io.stdout).toMatch(
        new RegExp(`effect_claim_generation:\\s+sha256:${"c".repeat(64)}`, "u"),
      );
    } finally {
      io.restore();
    }

    for (const verdict of ["applied", "not_applied"] as const) {
      const resolved = projectExecutedTaskRunnerLifecycleResult({
        task_id: "TASK-EFFECT",
        execution: {
          ...lifecycle,
          bundle: {},
          state: {
            mode: "execute",
            status: "blocked",
            effect_resolution: {
              verdict,
              digest: `sha256:${"d".repeat(64)}`,
            },
          },
          effect_operation: {
            operation: {
              authority_ref: "work-order:work-order-effect",
              authority_digest: `sha256:${"e".repeat(64)}`,
              claim_generation: `sha256:${"c".repeat(64)}`,
            },
            journal: {
              observed_evidence: {
                code: "operator_resolution_evidence",
                digest: `sha256:${"f".repeat(64)}`,
              },
            },
          },
          source_effect_resolution: {
            verdict: "not_applied",
            digest: `sha256:${"g".repeat(64)}`,
          },
        } as unknown as Parameters<typeof projectExecutedTaskRunnerLifecycleResult>[0]["execution"],
        source_effect_resolution: {
          verdict: "not_applied",
          digest: `sha256:${"g".repeat(64)}`,
        } as unknown as TaskRunnerLifecycleResult["lifecycle"]["effect"]["source_resolution"],
      });
      expect(resolved.lifecycle.effect).toMatchObject({
        state: verdict,
        resolution: { verdict },
        resolution_provenance: "operator_supplied",
        authority: { digest: `sha256:${"e".repeat(64)}` },
        observed_evidence: { digest: `sha256:${"f".repeat(64)}` },
        claim_generation: `sha256:${"c".repeat(64)}`,
        source_resolution: { verdict: "not_applied" },
        source_resolution_provenance: "operator_supplied",
      });
    }
  });

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

  it("reports trace-backed health and suppresses unsafe reclaim guidance", async () => {
    const now = Date.parse("2026-07-24T08:10:00.000Z");
    const traceAt = "2026-07-24T08:09:30.000Z";
    const inspection = {
      task_id: "TASK-ACTIVITY",
      run_id: "run-activity",
      selection: "latest",
      storage: "supervisor",
      paths: {
        run_dir: "/repo/runs/run-activity",
        state_path: "/repo/runs/run-activity/state.json",
        events_path: "/repo/runs/run-activity/events.jsonl",
        trace_path: "/repo/runs/run-activity/trace.jsonl",
        stderr_path: "/repo/runs/run-activity/stderr.log",
        result_path: "/repo/runs/run-activity/result.json",
        receipt_path: "/repo/runs/run-activity/execution-receipt.json",
        bundle_path: "/repo/runs/run-activity/bundle.json",
        bootstrap_path: "/repo/runs/run-activity/bootstrap.md",
      },
      repository: {
        readTraceTextRequired: () =>
          Promise.resolve(
            `${JSON.stringify({ ts: traceAt, seq: 41 })}\n${JSON.stringify({ ts: traceAt, seq: 42 })}\n`,
          ),
        readStderrTextRequired: () => Promise.resolve(""),
      },
      state: {
        status: "running",
        mode: "execute",
        adapter_id: "codex",
        target: { kind: "task", task_id: "TASK-ACTIVITY" },
        created_at: "2026-07-24T08:00:00.000Z",
        updated_at: "2026-07-24T08:00:00.000Z",
        timeout_policy: { wall_clock_ms: 0, idle_ms: 180_000, terminate_grace_ms: 30_000 },
        supervision: {
          pid: 999_997,
          heartbeat_at: "2026-07-24T08:00:00.000Z",
        },
      },
      active_claim: {
        run_id: "run-activity",
        operation: "execute",
        generation: "activity-generation",
        claimed_at: "2026-07-24T08:00:00.000Z",
      },
      active_claim_owner_status: "stale",
      claimed_run_authority: "running_child_unverified",
      recovery_lease: null,
      task_runner_outcome: null,
    } as unknown as LoadedTaskRunnerInspection;

    const active = await renderRunnerStatusPayload(inspection, now);
    expect(active).toMatchObject({
      last_trace_at: traceAt,
      last_trace_seq: 42,
      seconds_since_activity: 30,
      health: "active",
      next_safe_action: "wait_for_active_run",
    });

    inspection.state.supervision!.pid = undefined;
    inspection.state.created_at = "2026-07-24T08:00:00.000Z";
    inspection.state.updated_at = "2026-07-24T08:00:00.000Z";
    inspection.state.supervision!.heartbeat_at = "2026-07-24T08:00:00.000Z";
    inspection.repository.readTraceTextRequired = () =>
      Promise.resolve(`${JSON.stringify({ ts: "2026-07-24T08:05:00.000Z", seq: 40 })}\n`);
    await expect(renderRunnerStatusPayload(inspection, now)).resolves.toMatchObject({
      seconds_since_activity: 300,
      health: "idle",
      next_safe_action: "inspect_run_state",
    });

    inspection.state.status = "success";
    await expect(renderRunnerStatusPayload(inspection, now)).resolves.toMatchObject({
      health: "exited",
    });

    inspection.state.status = "running";
    inspection.state.timeout_policy.idle_ms = 0;
    inspection.state.created_at = "unavailable";
    inspection.state.updated_at = "unavailable";
    inspection.state.supervision!.heartbeat_at = undefined;
    inspection.repository.readTraceTextRequired = () => Promise.resolve("");
    await expect(renderRunnerStatusPayload(inspection, now)).resolves.toMatchObject({
      last_trace_at: null,
      last_trace_seq: null,
      seconds_since_activity: null,
      health: "unknown",
    });
  });

  it("keeps reclaim guidance safe while stderr is recent", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-run-activity-"));
    const stderrPath = path.join(root, "stderr.log");
    const tracePath = path.join(root, "trace.jsonl");
    const now = Date.parse("2026-07-24T08:10:00.000Z");
    try {
      await writeFile(stderrPath, "runner is still progressing\n", "utf8");
      await utimes(stderrPath, new Date(now - 30_000), new Date(now - 30_000));
      const inspection = {
        task_id: "TASK-STDERR-ACTIVITY",
        run_id: "run-stderr-activity",
        selection: "latest",
        storage: "supervisor",
        paths: {
          run_dir: root,
          state_path: path.join(root, "state.json"),
          events_path: path.join(root, "events.jsonl"),
          trace_path: tracePath,
          stderr_path: stderrPath,
          result_path: path.join(root, "result.json"),
          receipt_path: path.join(root, "execution-receipt.json"),
          bundle_path: path.join(root, "bundle.json"),
          bootstrap_path: path.join(root, "bootstrap.md"),
        },
        repository: {
          readTraceTextRequired: () => Promise.resolve(""),
          readStderrTextRequired: () => Promise.resolve("runner is still progressing\n"),
        },
        state: {
          status: "running",
          mode: "execute",
          adapter_id: "codex",
          target: { kind: "task", task_id: "TASK-STDERR-ACTIVITY" },
          created_at: "2026-07-24T08:00:00.000Z",
          updated_at: "2026-07-24T08:00:00.000Z",
          timeout_policy: { wall_clock_ms: 0, idle_ms: 180_000, terminate_grace_ms: 30_000 },
          supervision: { heartbeat_at: "2026-07-24T08:00:00.000Z" },
        },
        active_claim: {
          run_id: "run-stderr-activity",
          operation: "execute",
          generation: "stderr-generation",
          claimed_at: "2026-07-24T08:00:00.000Z",
        },
        active_claim_owner_status: "stale",
        claimed_run_authority: "running_child_unverified",
        recovery_lease: null,
        task_runner_outcome: null,
      } as unknown as LoadedTaskRunnerInspection;

      await expect(renderRunnerStatusPayload(inspection, now)).resolves.toMatchObject({
        last_trace_at: null,
        last_trace_seq: null,
        seconds_since_activity: 30,
        health: "active",
        next_safe_action: "wait_for_active_run",
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
