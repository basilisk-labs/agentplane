import { mkdtemp, rm, unlink, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import type { LoadedTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import { renderRunnerStatusPayload } from "./run-render.js";

describe("task run rendering", () => {
  it("derives runner health from durable trace activity", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-run-activity-"));
    const tracePath = path.join(root, "trace.jsonl");
    const stderrPath = path.join(root, "stderr.log");
    const now = Date.parse("2026-07-24T08:10:00.000Z");
    const traceAt = "2026-07-24T08:09:30.000Z";
    const inspection = {
      task_id: "TASK-ACTIVITY",
      run_id: "run-activity",
      selection: "latest",
      paths: {
        run_dir: root,
        state_path: path.join(root, "state.json"),
        events_path: path.join(root, "events.jsonl"),
        trace_path: tracePath,
        stderr_path: stderrPath,
        result_path: path.join(root, "result.json"),
        bundle_path: path.join(root, "bundle.json"),
        bootstrap_path: path.join(root, "bootstrap.md"),
      },
      state: {
        status: "running",
        mode: "execute",
        adapter_id: "codex",
        target: { kind: "task", task_id: "TASK-ACTIVITY" },
        created_at: "2026-07-24T08:00:00.000Z",
        updated_at: "2026-07-24T08:00:00.000Z",
        timeout_policy: { wall_clock_ms: 0, idle_ms: 180_000, terminate_grace_ms: 30_000 },
        supervision: { heartbeat_at: "2026-07-24T08:00:00.000Z" },
      },
    } as unknown as LoadedTaskRunnerInspection;

    try {
      await writeFile(
        tracePath,
        `${JSON.stringify({ ts: traceAt, seq: 41 })}\n${JSON.stringify({ ts: traceAt, seq: 42 })}\n{"partial":`,
        "utf8",
      );
      await utimes(tracePath, new Date(traceAt), new Date(traceAt));

      await expect(renderRunnerStatusPayload(inspection, now)).resolves.toMatchObject({
        last_trace_at: traceAt,
        last_trace_seq: 42,
        seconds_since_activity: 30,
        health: "active",
      });

      const idleTraceAt = "2026-07-24T08:05:00.000Z";
      await writeFile(tracePath, `${JSON.stringify({ ts: idleTraceAt, seq: 40 })}\n`, "utf8");
      await utimes(tracePath, new Date(idleTraceAt), new Date(idleTraceAt));
      await expect(renderRunnerStatusPayload(inspection, now)).resolves.toMatchObject({
        last_trace_at: idleTraceAt,
        last_trace_seq: 40,
        seconds_since_activity: 300,
        health: "idle",
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
      await unlink(tracePath);
      await expect(renderRunnerStatusPayload(inspection, now)).resolves.toMatchObject({
        last_trace_at: null,
        last_trace_seq: null,
        seconds_since_activity: null,
        health: "unknown",
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("treats recent stderr writes as runner activity", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-run-stderr-"));
    const stderrPath = path.join(root, "stderr.log");
    const now = Date.parse("2026-07-24T08:10:00.000Z");
    const stderrAt = new Date(now - 30_000);
    const inspection = {
      task_id: "TASK-STDERR",
      run_id: "run-stderr",
      selection: "latest",
      paths: {
        run_dir: root,
        state_path: path.join(root, "state.json"),
        events_path: path.join(root, "events.jsonl"),
        trace_path: path.join(root, "trace.jsonl"),
        stderr_path: stderrPath,
        result_path: path.join(root, "result.json"),
        bundle_path: path.join(root, "bundle.json"),
        bootstrap_path: path.join(root, "bootstrap.md"),
      },
      state: {
        status: "running",
        mode: "execute",
        adapter_id: "codex",
        target: { kind: "task", task_id: "TASK-STDERR" },
        created_at: "2026-07-24T08:00:00.000Z",
        updated_at: "2026-07-24T08:00:00.000Z",
        timeout_policy: { wall_clock_ms: 0, idle_ms: 180_000, terminate_grace_ms: 30_000 },
        supervision: { heartbeat_at: "2026-07-24T08:00:00.000Z" },
      },
    } as unknown as LoadedTaskRunnerInspection;

    try {
      await writeFile(stderrPath, "runner is still progressing\n", "utf8");
      await utimes(stderrPath, stderrAt, stderrAt);

      await expect(renderRunnerStatusPayload(inspection, now)).resolves.toMatchObject({
        last_trace_at: null,
        last_trace_seq: null,
        seconds_since_activity: 30,
        health: "active",
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
