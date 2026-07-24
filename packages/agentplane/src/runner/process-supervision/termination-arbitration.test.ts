import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import type { RunnerProcessSignal, RunnerTimeoutReason } from "../types.js";

import { createCancellationController } from "./cancellation-controller.js";
import { createRunnerTerminationArbiter } from "./termination-arbiter.js";
import { createTimeoutController } from "./timeout-controller.js";

function mutableState() {
  return {
    heartbeat_at: "2026-07-24T00:00:00.000Z",
    cancelRequestedAt: null as string | null,
    cancelSignal: null as RunnerProcessSignal | null,
    timeoutReason: null as RunnerTimeoutReason | null,
    timeoutRequestedAt: null as string | null,
    terminateSentAt: null as string | null,
    killSentAt: null as string | null,
  };
}

describe("runner termination arbitration", () => {
  let tempDir = "";

  afterEach(async () => {
    vi.restoreAllMocks();
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  it("sends only cancellation TERM when cancellation wins before timeout", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cancel-first-"));
    const eventsPath = path.join(tempDir, "events.jsonl");
    const arbiter = createRunnerTerminationArbiter();
    const mutable = mutableState();
    const childKill = vi.fn(() => true);
    const processKill = vi.spyOn(process, "kill").mockImplementation(() => true);
    const effects: Promise<void>[] = [];
    const cancellation = createCancellationController({
      child: { kill: childKill },
      pid: 42,
      events_path: eventsPath,
      terminate_grace_ms: 10_000,
      read_intent: () =>
        Promise.resolve({
          requested_at: "2026-07-24T00:00:01.000Z",
          signal: "SIGTERM",
        }),
      mutable,
      is_settled: () => false,
      finish_with_error: (error) => {
        throw error;
      },
      reserve_termination: (cause) => arbiter.reserve(cause),
      commit_termination: (cause) => arbiter.commit(cause),
      release_termination: (cause) => arbiter.release(cause),
      track_effect: (effect) => effects.push(effect),
    });
    const timeout = createTimeoutController({
      pid: 42,
      signal_pid: 42,
      events_path: eventsPath,
      state_path: path.join(tempDir, "state.json"),
      timeout_policy: {
        wall_clock_ms: 100,
        idle_ms: 100,
        terminate_grace_ms: 10_000,
      },
      mutable,
      is_settled: () => false,
      finish_with_error: (error) => {
        throw error;
      },
      write_supervision_patch: () => Promise.resolve(),
      reserve_termination: (cause) => arbiter.reserve(cause),
      commit_termination: (cause) => arbiter.commit(cause),
      release_termination: (cause) => arbiter.release(cause),
      track_effect: (effect) => effects.push(effect),
    });

    await cancellation.pollNow();
    timeout.requestTimeout("wall_clock");
    await Promise.all(effects);
    cancellation.clearTimers();
    timeout.clearTimers();

    expect(arbiter.cause()).toBe("cancel");
    expect(childKill).toHaveBeenCalledTimes(1);
    expect(childKill).toHaveBeenCalledWith("SIGTERM");
    expect(processKill).not.toHaveBeenCalled();
    expect(mutable.cancelRequestedAt).toBeTruthy();
    expect(mutable.timeoutReason).toBeNull();
  });

  it("sends only timeout TERM when timeout wins before cancellation", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-timeout-first-"));
    const eventsPath = path.join(tempDir, "events.jsonl");
    const arbiter = createRunnerTerminationArbiter();
    const mutable = mutableState();
    const childKill = vi.fn(() => true);
    const processKill = vi.spyOn(process, "kill").mockImplementation(() => true);
    const effects: Promise<void>[] = [];
    const timeout = createTimeoutController({
      pid: 42,
      signal_pid: 42,
      events_path: eventsPath,
      state_path: path.join(tempDir, "state.json"),
      timeout_policy: {
        wall_clock_ms: 100,
        idle_ms: 100,
        terminate_grace_ms: 10_000,
      },
      mutable,
      is_settled: () => false,
      finish_with_error: (error) => {
        throw error;
      },
      write_supervision_patch: () => Promise.resolve(),
      reserve_termination: (cause) => arbiter.reserve(cause),
      commit_termination: (cause) => arbiter.commit(cause),
      release_termination: (cause) => arbiter.release(cause),
      track_effect: (effect) => effects.push(effect),
    });
    const cancellation = createCancellationController({
      child: { kill: childKill },
      pid: 42,
      events_path: eventsPath,
      terminate_grace_ms: 10_000,
      read_intent: () =>
        Promise.resolve({
          requested_at: "2026-07-24T00:00:02.000Z",
          signal: "SIGTERM",
        }),
      mutable,
      is_settled: () => false,
      finish_with_error: (error) => {
        throw error;
      },
      reserve_termination: (cause) => arbiter.reserve(cause),
      commit_termination: (cause) => arbiter.commit(cause),
      release_termination: (cause) => arbiter.release(cause),
      track_effect: (effect) => effects.push(effect),
    });

    timeout.requestTimeout("wall_clock");
    await cancellation.pollNow();
    await Promise.all(effects);
    timeout.clearTimers();
    cancellation.clearTimers();

    expect(arbiter.cause()).toBe("timeout");
    expect(processKill).toHaveBeenCalledTimes(1);
    expect(processKill).toHaveBeenCalledWith(42, "SIGTERM");
    expect(childKill).not.toHaveBeenCalled();
    expect(mutable.timeoutReason).toBe("wall_clock");
    expect(mutable.cancelRequestedAt).toBeNull();
  });
});
