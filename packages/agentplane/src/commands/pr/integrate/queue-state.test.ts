import { mkdir, mkdtemp, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import type { CliError } from "../../../shared/errors.js";
import {
  claimNextQueuedEntry,
  emptyIntegrationQueue,
  expireClaimedEntries,
  markQueueEntry,
  queueBaseConflictReason,
  inspectIntegrationQueueMutex,
  readIntegrationQueue,
  reserveQueueEntryForIntegration,
  withIntegrationQueueMutex,
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

async function makeRoot(name: string): Promise<string> {
  return mkdtemp(path.join(tmpdir(), `agentplane-${name}-`));
}

async function waitForQueueLock(root: string): Promise<string> {
  const locksDir = path.join(root, ".agentplane", "cache", "locks");
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const entries = await readdir(locksDir);
      const lock = entries.find((entry) => entry === "integration-queue.lock");
      if (lock) return path.join(locksDir, lock);
    } catch {
      // keep polling until the holder creates the lock directory
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error("Timed out waiting for integration queue mutex");
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

  it("uses a legacy-compatible handoff as the non-expiring integration reservation", () => {
    const queued = upsertQueuedEntry(
      upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1"), clock("2026-01-01T00:00:00Z")),
      enqueue("T-2"),
      clock("2026-01-01T00:00:01Z"),
    );
    const claimed = claimNextQueuedEntry(queued, {
      worker: "integrator",
      leaseMs: 1,
      clock: clock("2026-01-01T00:00:02Z"),
    });
    const reserved = reserveQueueEntryForIntegration(
      claimed.state,
      "T-1",
      clock("2026-01-01T00:00:03Z"),
    );

    const legacySeesActive = reserved.entries.some(
      (entry) => entry.status === "claimed" || entry.status === "handoff",
    );
    const secondClaim = claimNextQueuedEntry(reserved, {
      worker: "legacy-worker",
      clock: clock("2030-01-01T00:00:00Z"),
    });

    expect(legacySeesActive).toBe(true);
    const reservedEntry = reserved.entries.find((entry) => entry.task_id === "T-1");
    expect(reservedEntry).toMatchObject({
      status: "handoff",
      active_operation: "integration",
    });
    expect(typeof reservedEntry?.claim_token).toBe("string");
    expect(secondClaim.entry).toBeNull();
  });

  it("rejects same-task refresh for every active lane status", () => {
    const queued = upsertQueuedEntry(
      emptyIntegrationQueue(),
      enqueue("T-1"),
      clock("2026-01-01T00:00:00Z"),
    );
    const claimed = claimNextQueuedEntry(queued, {
      worker: "integrator",
      clock: clock("2026-01-01T00:00:01Z"),
    }).state;
    const handoff = reserveQueueEntryForIntegration(claimed, "T-1", clock("2026-01-01T00:00:02Z"));

    for (const active of [claimed, handoff]) {
      expect(() => upsertQueuedEntry(active, enqueue("T-1"))).toThrowError(
        expect.objectContaining({ code: "E_HANDOFF" }),
      );
    }
  });

  it("uses a unique claim token even for same-worker same-timestamp reclaim", () => {
    const now = clock("2026-01-01T00:00:01Z");
    const queued = upsertQueuedEntry(emptyIntegrationQueue(), enqueue("T-1"), now);
    const first = claimNextQueuedEntry(queued, { worker: "integrator", clock: now });
    const released = markQueueEntry(first.state, "T-1", "queued", "retry", now);
    const second = claimNextQueuedEntry(released, { worker: "integrator", clock: now });

    expect(first.entry?.claim_token).toEqual(expect.any(String));
    expect(second.entry?.claim_token).toEqual(expect.any(String));
    expect(second.entry?.claim_token).not.toBe(first.entry?.claim_token);
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

  it("invalidates a queued entry whenever the pinned base moves", () => {
    const entry = {
      ...enqueue("T-1"),
      base_sha: "base-before",
      changed_paths: ["src/shared.ts", "docs/readme.md"],
    };

    expect(
      queueBaseConflictReason({
        entry,
        currentBaseSha: "base-after",
        baseChangedPaths: ["src/shared.ts", "src/other.ts"],
      }),
    ).toContain("overlapping paths: src/shared.ts");
    expect(
      queueBaseConflictReason({
        entry,
        currentBaseSha: "base-after",
        baseChangedPaths: ["src/other.ts"],
      }),
    ).toBe("base branch advanced after enqueue: queued=base-before current=base-after");
    expect(
      queueBaseConflictReason({
        entry,
        currentBaseSha: "base-before",
        baseChangedPaths: ["src/shared.ts"],
      }),
    ).toBeNull();
  });

  it("serializes integration queue writers with a queue-owned mutex", async () => {
    const root = await makeRoot("integration-queue");
    try {
      let release!: () => void;
      const holder = withIntegrationQueueMutex(root, async () => {
        await new Promise<void>((resolve) => {
          release = resolve;
        });
      });

      const lockPath = await waitForQueueLock(root);
      await expect(
        withIntegrationQueueMutex(root, () => Promise.resolve(null)),
      ).rejects.toMatchObject<CliError>({
        code: "E_GIT_RACE",
        context: {
          mutation_kind: "integration",
          integration_queue_lock_path: lockPath,
          remediation:
            "Inspect the lock with `agentplane integrate queue doctor --json`, reconcile queue state against provider/base evidence, then manually remove the exact lock path only after confirming no active writer.",
        },
      });

      release();
      await holder;
      await expect(stat(lockPath)).rejects.toMatchObject({ code: "ENOENT" });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("rolls back the mutex directory when owner metadata cannot be written", async () => {
    const root = await makeRoot("integration-owner-write");
    const lockPath = path.join(root, ".agentplane", "cache", "locks", "integration-queue.lock");
    try {
      await expect(
        withIntegrationQueueMutex(root, () => Promise.resolve(null), {
          writeOwner: () => Promise.reject(new Error("disk full")),
        }),
      ).rejects.toThrow("disk full");
      await expect(stat(lockPath)).rejects.toMatchObject({ code: "ENOENT" });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("reports a proven dead same-host mutex without deleting it", async () => {
    const root = await makeRoot("integration-stale-lock");
    const lockPath = path.join(root, ".agentplane", "cache", "locks", "integration-queue.lock");
    await mkdir(lockPath, { recursive: true });
    await writeFile(
      path.join(lockPath, "owner.json"),
      `${JSON.stringify({ pid: 424_242, host: "local-test" })}\n`,
      "utf8",
    );

    await expect(
      inspectIntegrationQueueMutex(root, {
        currentHost: "local-test",
        isProcessAlive: () => false,
      }),
    ).resolves.toEqual({
      state: "dead_same_host",
      owner: { pid: 424_242, host: "local-test" },
    });
    await expect(stat(lockPath)).resolves.toBeDefined();
  });

  it("keeps live, foreign-host, and invalid mutex owners fail-closed", async () => {
    const root = await makeRoot("integration-live-lock");
    const lockPath = path.join(root, ".agentplane", "cache", "locks", "integration-queue.lock");
    await mkdir(lockPath, { recursive: true });
    await writeFile(
      path.join(lockPath, "owner.json"),
      `${JSON.stringify({ pid: 42, host: "local-test" })}\n`,
      "utf8",
    );
    await expect(
      inspectIntegrationQueueMutex(root, {
        currentHost: "local-test",
        isProcessAlive: () => true,
      }),
    ).resolves.toMatchObject({ state: "live" });
    await expect(
      inspectIntegrationQueueMutex(root, {
        currentHost: "other-host",
        isProcessAlive: () => false,
      }),
    ).resolves.toMatchObject({ state: "foreign_host" });

    await writeFile(path.join(lockPath, "owner.json"), "{invalid", "utf8");
    await expect(
      inspectIntegrationQueueMutex(root, {
        currentHost: "local-test",
        isProcessAlive: () => false,
      }),
    ).resolves.toMatchObject({ state: "invalid" });
    await expect(stat(lockPath)).resolves.toBeDefined();
  });

  it.each([
    {
      name: "unsupported schema",
      payload: { schema_version: 2, entries: [] },
    },
    {
      name: "unknown status",
      payload: {
        schema_version: 1,
        entries: [
          {
            ...enqueue("T-1"),
            status: "future_active",
            enqueued_at: "2026-01-01T00:00:00.000Z",
            updated_at: "2026-01-01T00:00:00.000Z",
          },
        ],
      },
    },
    {
      name: "malformed active entry",
      payload: {
        schema_version: 1,
        entries: [
          {
            ...enqueue("T-1"),
            status: "claimed",
            enqueued_at: "2026-01-01T00:00:00.000Z",
            updated_at: "2026-01-01T00:00:00.000Z",
          },
        ],
      },
    },
    {
      name: "duplicate task id",
      payload: {
        schema_version: 1,
        entries: [
          {
            ...enqueue("T-1"),
            status: "queued",
            enqueued_at: "2026-01-01T00:00:00.000Z",
            updated_at: "2026-01-01T00:00:00.000Z",
          },
          {
            ...enqueue("T-1"),
            status: "rework",
            enqueued_at: "2026-01-01T00:00:01.000Z",
            updated_at: "2026-01-01T00:00:01.000Z",
          },
        ],
      },
    },
  ])("fails closed for $name", async ({ payload }) => {
    const root = await makeRoot("integration-invalid-state");
    const queuePath = path.join(root, ".agentplane", "cache", "integration-queue.json");
    await mkdir(path.dirname(queuePath), { recursive: true });
    await writeFile(queuePath, `${JSON.stringify(payload)}\n`, "utf8");

    await expect(readIntegrationQueue(root)).rejects.toMatchObject({
      code: "E_GIT_RACE",
      context: { reason_code: "integration_queue_state_invalid" },
    });
  });
});
