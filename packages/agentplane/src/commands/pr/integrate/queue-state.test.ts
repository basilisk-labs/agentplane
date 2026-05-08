import { describe, expect, it } from "vitest";

import {
  claimNextQueuedEntry,
  emptyIntegrationQueue,
  expireClaimedEntries,
  markQueueEntry,
  upsertQueuedEntry,
  type QueueClock,
} from "./queue-state.js";

function clock(iso: string): QueueClock {
  return { now: () => new Date(iso) };
}

function enqueue(taskId: string, priority = 0) {
  return {
    task_id: taskId,
    branch: `task/${taskId}/work`,
    base: "main",
    head_sha: `head-${taskId}`,
    base_sha: "base-1",
    changed_paths: [`src/${taskId}.ts`],
    pr_number: null,
    pr_url: null,
    priority,
  };
}

describe("integration queue state", () => {
  it("claims the highest priority queued entry first", () => {
    const state = upsertQueuedEntry(
      upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1", 0), clock("2026-01-01T00:00:00Z")),
      enqueue("T-2", 5),
      clock("2026-01-01T00:00:01Z"),
    );

    const claimed = claimNextQueuedEntry(state, {
      worker: "integrator",
      clock: clock("2026-01-01T00:00:02Z"),
    });

    expect(claimed.entry?.task_id).toBe("T-2");
    expect(claimed.entry?.status).toBe("claimed");
    expect(claimed.entry?.claimed_by).toBe("integrator");
  });

  it("returns expired claims to the queue", () => {
    const state = claimNextQueuedEntry(
      upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1"), clock("2026-01-01T00:00:00Z")),
      { worker: "integrator", leaseMs: 1000, clock: clock("2026-01-01T00:00:01Z") },
    ).state;

    const expired = expireClaimedEntries(state, clock("2026-01-01T00:00:03Z"));

    expect(expired.entries[0]?.status).toBe("queued");
    expect(expired.entries[0]?.reason).toBe("lease expired");
  });

  it("does not claim another entry while the merge lane is occupied", () => {
    const state = upsertQueuedEntry(
      upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1"), clock("2026-01-01T00:00:00Z")),
      enqueue("T-2"),
      clock("2026-01-01T00:00:01Z"),
    );
    const firstClaim = claimNextQueuedEntry(state, {
      worker: "integrator",
      clock: clock("2026-01-01T00:00:02Z"),
    });

    const secondClaim = claimNextQueuedEntry(firstClaim.state, {
      worker: "other-integrator",
      clock: clock("2026-01-01T00:00:03Z"),
    });

    expect(secondClaim.entry).toBeNull();
    expect(secondClaim.state.entries.filter((entry) => entry.status === "claimed")).toHaveLength(1);
    expect(secondClaim.state.entries.find((entry) => entry.task_id === "T-2")?.status).toBe(
      "queued",
    );
  });

  it("does not claim another entry while a protected-base handoff is unresolved", () => {
    const state = upsertQueuedEntry(
      upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1"), clock("2026-01-01T00:00:00Z")),
      enqueue("T-2"),
      clock("2026-01-01T00:00:01Z"),
    );
    const claimed = claimNextQueuedEntry(state, {
      worker: "integrator",
      clock: clock("2026-01-01T00:00:02Z"),
    }).state;
    const handoff = markQueueEntry(
      claimed,
      "T-1",
      "handoff",
      "protected base handoff recorded",
      clock("2026-01-01T00:00:03Z"),
    );

    const secondClaim = claimNextQueuedEntry(handoff, {
      worker: "other-integrator",
      clock: clock("2026-01-01T00:00:04Z"),
    });

    expect(secondClaim.entry).toBeNull();
    expect(secondClaim.state.entries.find((entry) => entry.task_id === "T-1")?.status).toBe(
      "handoff",
    );
    expect(secondClaim.state.entries.find((entry) => entry.task_id === "T-2")?.status).toBe(
      "queued",
    );
  });

  it("keeps handoff entries out of automatic lease expiry", () => {
    const claimed = claimNextQueuedEntry(
      upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1"), clock("2026-01-01T00:00:00Z")),
      { worker: "integrator", leaseMs: 1000, clock: clock("2026-01-01T00:00:01Z") },
    ).state;
    const handoff = markQueueEntry(
      claimed,
      "T-1",
      "handoff",
      "protected base handoff recorded",
      clock("2026-01-01T00:00:02Z"),
    );

    const expired = expireClaimedEntries(handoff, clock("2026-01-01T00:30:00Z"));

    expect(expired.entries[0]?.status).toBe("handoff");
  });

  it("marks claimed work as rework without dropping queue evidence", () => {
    const state = upsertQueuedEntry(
      emptyIntegrationQueue(),
      enqueue("T-1"),
      clock("2026-01-01T00:00:00Z"),
    );

    const rework = markQueueEntry(
      state,
      "T-1",
      "rework",
      "branch head changed after enqueue",
      clock("2026-01-01T00:00:02Z"),
    );

    expect(rework.entries[0]).toMatchObject({
      task_id: "T-1",
      status: "rework",
      reason: "branch head changed after enqueue",
      branch: "task/T-1/work",
      head_sha: "head-T-1",
    });
  });
});
