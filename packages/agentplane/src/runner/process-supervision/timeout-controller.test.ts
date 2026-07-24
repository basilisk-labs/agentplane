import { afterEach, describe, expect, it, vi } from "vitest";

import { createRunnerTerminationArbiter } from "./termination-arbiter.js";
import { createTimeoutController } from "./timeout-controller.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("runner timeout controller", () => {
  it("does not relabel natural exit when TERM delivery reports ESRCH", () => {
    const arbiter = createRunnerTerminationArbiter();
    const timeoutState = {
      heartbeat_at: "2026-07-24T00:00:00.000Z",
      timeoutReason: null,
      timeoutRequestedAt: null,
      terminateSentAt: null,
      killSentAt: null,
    };
    const signalError = new Error("process already exited") as NodeJS.ErrnoException;
    signalError.code = "ESRCH";
    vi.spyOn(process, "kill").mockImplementation(() => {
      throw signalError;
    });
    const writeSupervisionPatch = vi.fn(() => Promise.resolve());
    const controller = createTimeoutController({
      pid: 42,
      signal_pid: 42,
      events_path: "/unused/events.jsonl",
      state_path: "/unused/run-state.json",
      timeout_policy: {
        wall_clock_ms: 100,
        idle_ms: 100,
        terminate_grace_ms: 100,
      },
      mutable: timeoutState,
      is_settled: () => false,
      finish_with_error: (error) => {
        throw error;
      },
      write_supervision_patch: writeSupervisionPatch,
      reserve_termination: (cause) => arbiter.reserve(cause),
      commit_termination: (cause) => arbiter.commit(cause),
      release_termination: (cause) => arbiter.release(cause),
    });

    controller.requestTimeout("wall_clock");
    expect(arbiter.claimExit()).toBe(true);
    expect(arbiter.cause()).toBe("exit");
    expect(timeoutState.timeoutReason).toBeNull();
    expect(timeoutState.timeoutRequestedAt).toBeNull();
    expect(timeoutState.terminateSentAt).toBeNull();
    expect(writeSupervisionPatch).not.toHaveBeenCalled();
  });
});
