import { describe, expect, it, vi } from "vitest";

import type { LoadedTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import type { RunnerLifecycleStatus } from "../../runner/types.js";
import { followRunnerLogs } from "./run-logs-follow.js";

function makeInspection(opts: {
  status: RunnerLifecycleStatus;
  events_text: string;
  mode?: "execute" | "dry_run";
  claim_run_id?: string | null;
  owner_status?: "active" | "stale" | "unverified";
}): LoadedTaskRunnerInspection {
  const runId = "run-followed";
  const claimRunId = opts.claim_run_id === undefined ? runId : opts.claim_run_id;
  const activeClaim = claimRunId
    ? {
        schema_version: 1 as const,
        claim_id: "claim-followed",
        generation: "claim-followed",
        task_id: "TASK-FOLLOW",
        run_id: claimRunId,
        operation: "execute" as const,
        claimed_at: "2026-07-24T10:00:00.000Z",
        owner_pid: 123,
        owner_command: "agentplane task run",
        owner_started_at: "2026-07-24T10:00:00.000Z",
      }
    : null;
  const runDir = `/repo/runs/${runId}`;
  return {
    task_id: "TASK-FOLLOW",
    run_id: runId,
    selection: "latest",
    storage: "supervisor",
    active_claim: activeClaim,
    active_claim_owner_status: activeClaim ? (opts.owner_status ?? "active") : null,
    claimed_run_authority: activeClaim ? "running" : null,
    recovery_lease: null,
    task_runner_outcome: null,
    events: [],
    events_text: opts.events_text,
    paths: {
      artifact_root: "/repo",
      task_dir: "/repo/runs",
      runs_dir: "/repo/runs",
      run_dir: runDir,
      state_path: `${runDir}/run-state.json`,
      events_path: `${runDir}/events.jsonl`,
      trace_path: `${runDir}/trace.jsonl`,
      stderr_path: `${runDir}/stderr.log`,
      result_path: `${runDir}/result.json`,
      receipt_path: `${runDir}/execution-receipt.json`,
      bundle_path: `${runDir}/bundle.json`,
      bootstrap_path: `${runDir}/bootstrap.md`,
      blueprint_plan_path: `${runDir}/blueprint-plan.json`,
      blueprint_execution_plan_path: `${runDir}/blueprint-execution-plan.json`,
      blueprint_execution_state_path: `${runDir}/blueprint-execution-state.json`,
      context_manifest_path: `${runDir}/context-manifest.json`,
    },
    state: {
      run_id: runId,
      status: opts.status,
      mode: opts.mode ?? "execute",
      adapter_id: "codex",
      target: { kind: "task", task_id: "TASK-FOLLOW" },
      created_at: "2026-07-24T10:00:00.000Z",
      updated_at: "2026-07-24T10:00:01.000Z",
      result:
        opts.status === "success"
          ? {
              status: "success",
              exit_code: 0,
              started_at: "2026-07-24T10:00:00.000Z",
              ended_at: "2026-07-24T10:00:01.000Z",
            }
          : undefined,
    },
  } as unknown as LoadedTaskRunnerInspection;
}

function makeOutput() {
  return {
    lines: vi.fn(),
    warn: vi.fn(),
  };
}

describe("task runner log following", () => {
  it("follows a claimed execute run from prepared through running to terminal", async () => {
    const prepared = makeInspection({ status: "prepared", events_text: "prepared\n" });
    const running = makeInspection({
      status: "running",
      events_text: "prepared\nrunning\n",
    });
    const success = makeInspection({
      status: "success",
      events_text: "prepared\nrunning\nsuccess\n",
      claim_run_id: null,
    });
    const pending = [running, success];
    const reload = vi.fn(() => Promise.resolve(pending.shift() ?? success));
    const output = makeOutput();
    let monotonicMs = 0;

    await expect(
      followRunnerLogs({
        initial_inspection: prepared,
        stream: "events",
        emitted_chars: prepared.events_text.length,
        output,
        reload,
        dependencies: {
          wait: (ms) => {
            monotonicMs += ms;
            return Promise.resolve();
          },
          monotonic_now: () => monotonicMs,
          load_log_text: (inspection) => Promise.resolve(inspection.events_text),
        },
      }),
    ).resolves.toBe(0);

    expect(reload).toHaveBeenCalledTimes(2);
    expect(reload).toHaveBeenNthCalledWith(1, "run-followed");
    expect(reload).toHaveBeenNthCalledWith(2, "run-followed");
    expect(output.lines).toHaveBeenNthCalledWith(1, ["running"]);
    expect(output.lines).toHaveBeenNthCalledWith(2, ["success"]);
    expect(output.warn).not.toHaveBeenCalled();
  });

  it("bounds the prepared wait with a monotonic deadline", async () => {
    const prepared = makeInspection({ status: "prepared", events_text: "prepared\n" });
    const output = makeOutput();
    const waits: number[] = [];
    let monotonicMs = 0;

    await expect(
      followRunnerLogs({
        initial_inspection: prepared,
        stream: "events",
        emitted_chars: prepared.events_text.length,
        output,
        reload: () => Promise.resolve(prepared),
        prepared_timeout_ms: 250,
        poll_interval_ms: 100,
        dependencies: {
          wait: (ms) => {
            waits.push(ms);
            monotonicMs += ms;
            return Promise.resolve();
          },
          monotonic_now: () => monotonicMs,
          load_log_text: (inspection) => Promise.resolve(inspection.events_text),
        },
      }),
    ).resolves.toBe(1);

    expect(waits).toEqual([100, 100, 50]);
    expect(output.warn).toHaveBeenCalledWith(
      expect.stringContaining("bounded follow wait"),
      "stderr",
    );
  });

  it("fails closed when prepared state and active claim identify different runs", async () => {
    const prepared = makeInspection({
      status: "prepared",
      events_text: "prepared\n",
      claim_run_id: "run-other",
    });
    const reload = vi.fn();
    const output = makeOutput();

    await expect(
      followRunnerLogs({
        initial_inspection: prepared,
        stream: "events",
        emitted_chars: prepared.events_text.length,
        output,
        reload,
      }),
    ).resolves.toBe(1);

    expect(reload).not.toHaveBeenCalled();
    expect(output.warn).toHaveBeenCalledWith(
      expect.stringContaining("not the claimed run"),
      "stderr",
    );
  });

  it("returns failure for a terminal run with a degraded retained claim", async () => {
    const terminal = makeInspection({
      status: "success",
      events_text: "success\n",
      owner_status: "stale",
    });
    const output = makeOutput();

    await expect(
      followRunnerLogs({
        initial_inspection: terminal,
        stream: "events",
        emitted_chars: terminal.events_text.length,
        output,
        reload: () => Promise.resolve(terminal),
      }),
    ).resolves.toBe(1);

    expect(output.warn).toHaveBeenCalledWith(
      expect.stringContaining("retains the active claim"),
      "stderr",
    );
  });
});
