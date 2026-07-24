import { describe, expect, it, vi } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import type { TaskData, TaskWriteOptions } from "../backends/task-backend.js";
import { cloudBackendCapabilities } from "../backends/task-backend/cloud-backend-capabilities.js";
import type { CommandContext } from "../commands/shared/task-backend.js";
import type { RunnerRunState } from "./types.js";

import { persistRunnerOutcomeToTask } from "./task-state.js";

const TASK_ID = "202607240600-PROJECTION";

function task(revision = 7): TaskData {
  return {
    id: TASK_ID,
    title: "Projection concurrency",
    description: "Projection concurrency",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    revision,
    depends_on: [],
    tags: ["runner"],
    verify: [],
    doc: "",
  };
}

function state(runId: string, createdAt: string): RunnerRunState {
  return {
    schema_version: 1,
    runner_api_version: "1",
    run_id: runId,
    adapter_id: "custom",
    target: { kind: "task", task_id: TASK_ID },
    status: "success",
    mode: "execute",
    bundle_path: `/tmp/${runId}/bundle.json`,
    result_path: `/tmp/${runId}/result.json`,
    events_path: `/tmp/${runId}/events.jsonl`,
    trace_path: `/tmp/${runId}/trace.jsonl`,
    stderr_path: `/tmp/${runId}/stderr.log`,
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
    created_at: createdAt,
    updated_at: createdAt,
    result: {
      status: "success",
      exit_code: 0,
      started_at: createdAt,
      ended_at: createdAt,
      summary: runId,
    },
  };
}

function context(opts: {
  current: TaskData;
  getTask?: () => Promise<TaskData>;
  writeTask: (next: TaskData, write?: TaskWriteOptions) => Promise<void>;
  revisionGuarded?: boolean;
}): CommandContext {
  const config = defaultConfig();
  return {
    resolvedProject: { gitRoot: "/repo" },
    config,
    backendId: "cloud",
    backendConfigPath: "/repo/.agentplane/backend.json",
    taskBackend: {
      id: "cloud",
      capabilities: {
        ...cloudBackendCapabilities,
        supports_revision_guarded_writes: opts.revisionGuarded ?? true,
      },
      getTask: opts.getTask ?? (() => Promise.resolve(structuredClone(opts.current))),
      writeTask: opts.writeTask,
    },
    git: {},
    memo: {},
  } as unknown as CommandContext;
}

describe("runner task outcome projection", () => {
  it("passes the observed revision to a non-local backend write", async () => {
    const current = task();
    const writeTask = vi.fn(() => Promise.resolve());
    const ctx = context({ current, writeTask });

    await persistRunnerOutcomeToTask({
      ctx,
      task_id: TASK_ID,
      state: state("run-revision-guard", "2026-07-24T06:00:00.000Z"),
      ordering_authority: "current_active_claim",
    });

    expect(writeTask).toHaveBeenCalledTimes(1);
    expect(writeTask.mock.calls[0]?.[1]).toEqual({ expectedRevision: 7 });
  });

  it("allows only one of two projections built from the same backend revision", async () => {
    let current = task();
    let reads = 0;
    let releaseReads!: () => void;
    const bothRead = new Promise<void>((resolve) => {
      releaseReads = resolve;
    });
    const getTask = async () => {
      const snapshot = structuredClone(current);
      reads += 1;
      if (reads === 2) releaseReads();
      await bothRead;
      return snapshot;
    };
    const writeTask = (next: TaskData, write?: TaskWriteOptions) => {
      if (write?.expectedRevision !== current.revision) {
        throw new Error("task_revision_conflict");
      }
      current = { ...next, revision: (current.revision ?? 0) + 1 };
      return Promise.resolve();
    };
    const ctx = context({ current, getTask, writeTask });

    const results = await Promise.allSettled([
      persistRunnerOutcomeToTask({
        ctx,
        task_id: TASK_ID,
        state: state("run-a", "2026-07-24T06:00:00.000Z"),
        ordering_authority: "current_active_claim",
      }),
      persistRunnerOutcomeToTask({
        ctx,
        task_id: TASK_ID,
        state: state("run-b", "2026-07-24T06:00:01.000Z"),
        ordering_authority: "current_active_claim",
      }),
    ]);

    expect(results.map((result) => result.status).toSorted()).toEqual(["fulfilled", "rejected"]);
    expect(current.revision).toBe(8);
  });

  it("fails closed when the backend cannot guard the observed revision", async () => {
    const current = task();
    const writeTask = vi.fn(() => Promise.resolve());
    const ctx = context({ current, writeTask, revisionGuarded: false });

    await expect(
      persistRunnerOutcomeToTask({
        ctx,
        task_id: TASK_ID,
        state: state("run-unsupported", "2026-07-24T06:00:00.000Z"),
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: { reason: "runner_projection_revision_guard_unsupported" },
    });
    expect(writeTask).not.toHaveBeenCalled();
  });
});
