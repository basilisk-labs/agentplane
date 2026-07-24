import { afterEach, describe, expect, it, vi } from "vitest";

import {
  cleanupSupervisedDirectChild,
  cleanupSupervisedProcessGroup,
  type SupervisedDirectChild,
} from "./process-tree.js";
import { createSupervisionClock } from "./clock.js";

function directChild(): SupervisedDirectChild {
  return {
    exitCode: null,
    signalCode: null,
    kill: vi.fn(),
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("runner direct-child cleanup", () => {
  it("uses the child handle when no process-group id is available", async () => {
    const child = directChild();
    vi.mocked(child.kill).mockImplementation((signal) => {
      child.signalCode = signal as NodeJS.Signals;
      return true;
    });

    const result = await cleanupSupervisedProcessGroup({
      pid: null,
      child,
      terminate_grace_ms: 50,
    });

    expect(child.kill).toHaveBeenCalledWith("SIGTERM");
    expect(result).toMatchObject({
      scope: "direct_child_only",
      cleanup_state: "terminated",
      residual_alive: false,
      error: null,
      containment_state: "limited",
    });
  });

  it("escalates direct-child cleanup through the retained handle", async () => {
    const child = directChild();
    vi.mocked(child.kill).mockImplementation((signal) => {
      if (signal === "SIGKILL") child.signalCode = "SIGKILL";
      return true;
    });

    const result = await cleanupSupervisedDirectChild({
      child,
      terminate_grace_ms: 0,
    });

    expect(child.kill).toHaveBeenNthCalledWith(1, "SIGTERM");
    expect(child.kill).toHaveBeenNthCalledWith(2, "SIGKILL");
    expect(result).toMatchObject({
      scope: "direct_child_only",
      cleanup_state: "force_killed",
      residual_alive: false,
      error: null,
    });
    expect(result.terminate_sent_at).not.toBeNull();
    expect(result.kill_sent_at).not.toBeNull();
  });

  it("keeps grace waiting and cleanup timestamps causal across wall-clock steps", async () => {
    const child = directChild();
    const anchor = Date.parse("2026-07-24T10:00:00.000Z");
    let wallNowMs = anchor;
    const clock = createSupervisionClock({
      wall_now_ms: () => wallNowMs,
    });
    vi.mocked(child.kill).mockImplementation((signal) => {
      if (signal === "SIGTERM") {
        setTimeout(() => {
          wallNowMs += 60_000;
          clock.nowIso();
          wallNowMs -= 120_000;
          child.signalCode = "SIGTERM";
        }, 10);
      }
      return true;
    });

    const result = await cleanupSupervisedDirectChild({
      child,
      terminate_grace_ms: 100,
      now_iso: clock.nowIso,
      monotonic_now_ms: clock.monotonicNowMs,
    });

    expect(result.cleanup_state).toBe("terminated");
    expect(Date.parse(result.completed_at)).toBeGreaterThanOrEqual(
      Date.parse(result.terminate_sent_at!),
    );
    expect(clock.diagnostic()?.wall_clock_regression_count).toBe(1);
  });

  it("reports a direct-child cleanup error without claiming termination", async () => {
    const child = directChild();
    vi.mocked(child.kill).mockImplementation(() => {
      throw new Error("handle failure");
    });

    const result = await cleanupSupervisedDirectChild({
      child,
      terminate_grace_ms: 0,
    });

    expect(result).toMatchObject({
      scope: "direct_child_only",
      cleanup_state: "failed",
      residual_alive: null,
      error: "handle failure",
    });
  });

  it.skipIf(process.platform === "win32")(
    "retains failed POSIX group scope when direct-child fallback succeeds",
    async () => {
      const child = directChild();
      vi.mocked(child.kill).mockImplementation((signal) => {
        child.signalCode = signal as NodeJS.Signals;
        return true;
      });
      const killSpy = vi.spyOn(process, "kill").mockImplementation((pid, signal) => {
        if (pid !== -4242) return true;
        if (signal === 0) return true;
        const error = new Error("group signal denied") as NodeJS.ErrnoException;
        error.code = "EACCES";
        throw error;
      });

      const result = await cleanupSupervisedProcessGroup({
        pid: 4242,
        child,
        terminate_grace_ms: 0,
      });

      expect(killSpy).toHaveBeenCalledWith(-4242, "SIGTERM");
      expect(child.kill).toHaveBeenCalledWith("SIGTERM");
      expect(result).toMatchObject({
        scope: "posix_process_group",
        group_id: 4242,
        cleanup_state: "failed",
        residual_alive: true,
        containment_state: "limited",
      });
      expect(result.error).toContain("process-group cleanup failed (group signal denied)");
      expect(result.error).toContain("direct-child fallback ended in terminated");
    },
  );
});
