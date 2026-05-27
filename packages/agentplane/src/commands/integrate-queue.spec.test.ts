import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../cli/spec/parse.js";
import { applyIntegrationQueueDoctorRepairs } from "./integrate-queue-doctor.js";
import { integrateQueueRunNextSpec } from "./integrate-queue.spec.js";
import {
  emptyIntegrationQueue,
  markQueueEntry,
  upsertQueuedEntry,
} from "./pr/integrate/queue-state.js";

function enqueue(taskId: string) {
  return {
    task_id: taskId,
    branch: `task/${taskId}/work`,
    base: "main",
    head_sha: `head-${taskId}`,
    base_sha: "base-1",
    changed_paths: [`src/${taskId}.ts`],
    pr_number: null,
    pr_url: null,
    priority: 0,
  };
}

describe("integrate queue spec parsing/validation", () => {
  it("parses bounded wait polling options for run-next", () => {
    const out = parseCommandArgv(integrateQueueRunNextSpec, [
      "--wait",
      "--hosted",
      "--poll-interval-ms",
      "30000",
      "--timeout-ms",
      "600000",
      "--stable-polls",
      "2",
      "--hosted-poll-interval-ms",
      "5000",
      "--hosted-timeout-ms",
      "120000",
      "--required-check",
      "PR verification",
    ]);

    expect(out.parsed.wait).toBe(true);
    expect(out.parsed.hosted).toBe(true);
    expect(out.parsed.pollIntervalMs).toBe(30_000);
    expect(out.parsed.timeoutMs).toBe(600_000);
    expect(out.parsed.stablePolls).toBe(2);
    expect(out.parsed.hostedPollIntervalMs).toBe(5000);
    expect(out.parsed.hostedTimeoutMs).toBe(120_000);
    expect(out.parsed.requiredChecks).toEqual(["PR verification"]);
  });

  it("rejects invalid wait polling values", () => {
    try {
      parseCommandArgv(integrateQueueRunNextSpec, ["--poll-interval-ms", "0"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("applies doctor repairs to a fresh queue snapshot without dropping concurrent entries", () => {
    const staleSnapshotFinding = {
      task_id: "T-1",
      status: "handoff",
      reason: "task is already DONE; queue entry is terminal stale",
      repair: "mark_done",
    };
    const latestQueue = upsertQueuedEntry(
      markQueueEntry(
        upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1")),
        "T-1",
        "handoff",
        "protected base handoff recorded",
      ),
      enqueue("T-2"),
    );

    const repaired = applyIntegrationQueueDoctorRepairs(latestQueue, [staleSnapshotFinding]);

    expect(repaired.entries.find((entry) => entry.task_id === "T-1")).toMatchObject({
      status: "done",
      reason: "task is already DONE; queue entry is terminal stale",
    });
    expect(repaired.entries.find((entry) => entry.task_id === "T-2")).toMatchObject({
      status: "queued",
    });
  });

  it("skips doctor repairs when the fresh queue entry has changed status", () => {
    const latestQueue = markQueueEntry(
      upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1")),
      "T-1",
      "rework",
      "operator already released the lane",
    );

    const repaired = applyIntegrationQueueDoctorRepairs(latestQueue, [
      {
        task_id: "T-1",
        status: "handoff",
        reason: "task is already DONE; queue entry is terminal stale",
        repair: "mark_done",
      },
    ]);

    expect(repaired.entries.find((entry) => entry.task_id === "T-1")).toMatchObject({
      status: "rework",
      reason: "operator already released the lane",
    });
  });
});
