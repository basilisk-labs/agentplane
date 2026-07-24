import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { createCancellationController } from "./cancellation-controller.js";

function cancellationState() {
  return {
    heartbeat_at: "2026-07-24T00:00:00.000Z",
    cancelRequestedAt: null,
    cancelSignal: null,
    terminateSentAt: null,
    killSentAt: null,
  };
}

describe("runner cancellation controller", () => {
  let tempDir = "";

  afterEach(async () => {
    vi.restoreAllMocks();
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  it("keeps success eligibility when intent arrives after the owned child has exited", async () => {
    const mutable = cancellationState();
    const kill = vi.fn(() => false);
    let reserved = false;
    const releaseTermination = vi.fn(() => {
      reserved = false;
    });
    const controller = createCancellationController({
      child: { kill },
      pid: 42,
      events_path: "/unused/events.jsonl",
      terminate_grace_ms: 100,
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
      reserve_termination: () => {
        if (reserved) return false;
        reserved = true;
        return true;
      },
      commit_termination: () => false,
      release_termination: releaseTermination,
    });

    await controller.pollNow();

    expect(kill).toHaveBeenCalledWith("SIGTERM");
    expect(mutable.cancelRequestedAt).toBeNull();
    expect(mutable.cancelSignal).toBeNull();
    expect(mutable.terminateSentAt).toBeNull();
    expect(releaseTermination).toHaveBeenCalledWith("cancel");
    expect(reserved).toBe(false);
  });

  it("persists TERM and force-kill cancellation metadata through the supplied writer", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cancel-metadata-"));
    const mutable = cancellationState();
    const patches: Record<string, unknown>[] = [];
    const effects: Promise<void>[] = [];
    const controller = createCancellationController({
      child: { kill: vi.fn(() => true) },
      pid: 42,
      events_path: path.join(tempDir, "events.jsonl"),
      terminate_grace_ms: 0,
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
      write_supervision_patch: (patch) => {
        patches.push(patch);
        return Promise.resolve();
      },
      track_effect: (effect) => effects.push(effect),
    });

    await controller.pollNow();
    await Promise.all(effects);

    expect(patches).toHaveLength(2);
    expect(patches[0]).toMatchObject({
      cancel_requested_at: "2026-07-24T00:00:01.000Z",
      cancel_signal: "SIGTERM",
    });
    expect(typeof patches[0]?.terminate_sent_at).toBe("string");
    expect(typeof patches[0]?.heartbeat_at).toBe("string");
    expect(patches[1]).toMatchObject({
      cancel_requested_at: "2026-07-24T00:00:01.000Z",
      cancel_signal: "SIGKILL",
      force_killed: true,
    });
    expect(typeof patches[1]?.terminate_sent_at).toBe("string");
    expect(typeof patches[1]?.kill_sent_at).toBe("string");
    expect(typeof patches[1]?.heartbeat_at).toBe("string");
  });
});
