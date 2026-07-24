import { mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import type { RunnerInvocation } from "../types.js";

import { claimRunnerPreSpawnDecision } from "./execution-control.js";

describe("runner immutable execution control", () => {
  let tempDir = "";

  afterEach(async () => {
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  it("keeps a published decision successful when temporary cleanup fails", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-execution-control-"));
    const runDir = path.join(tempDir, "run");
    await mkdir(runDir);
    const invocation = {
      adapter_id: "custom",
      run_id: "run-cleanup-after-publish",
      work_order_id: "run-cleanup-after-publish",
      repository_root: tempDir,
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      receipt_path: path.join(runDir, "receipt.json"),
      trace_path: path.join(runDir, "trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 1024,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 1000,
        idle_ms: 1000,
        terminate_grace_ms: 100,
      },
      argv: ["runner"],
      env: {},
      dry_run: false,
    } as RunnerInvocation;
    const decidedAt = "2026-07-24T10:00:00.000Z";
    const ownerLease = {
      owner_id: "cleanup-owner",
      owner_pid: process.pid,
      owner_command: "agentplane-test",
      owner_started_at: decidedAt,
      heartbeat_at: decidedAt,
      lease_expires_at: "2026-07-24T10:00:03.000Z",
    };

    const published = await claimRunnerPreSpawnDecision({
      invocation,
      decision: "start",
      decided_at: decidedAt,
      start_owner_lease: ownerLease,
      cleanup_temporary: () => {
        const error = new Error("injected cleanup failure") as NodeJS.ErrnoException;
        error.code = "EACCES";
        return Promise.reject(error);
      },
    });
    const retry = await claimRunnerPreSpawnDecision({
      invocation,
      decision: "cancel",
    });

    expect(published.won).toBe(true);
    expect(published.record).toMatchObject({
      decision: "start",
      decided_at: decidedAt,
      owner_lease: ownerLease,
    });
    expect(published.cleanup_error).toMatchObject({
      code: "EACCES",
      message: "injected cleanup failure",
    });
    expect(retry.won).toBe(false);
    expect(retry.record).toEqual(published.record);
  });
});
