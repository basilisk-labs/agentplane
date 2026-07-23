import { beforeEach, describe, expect, it, vi } from "vitest";

import type { IntegrationQueueEntry } from "./pr/integrate/queue-state.js";

const mocks = vi.hoisted(() => ({
  markQueueEntry: vi.fn(),
  readIntegrationQueue: vi.fn(),
  rejectIfQueuedEntryIsStale: vi.fn(),
  reserveQueueEntryForIntegration: vi.fn(),
  withIntegrationQueueMutex: vi.fn(),
  writeIntegrationQueue: vi.fn(),
}));

vi.mock("./integrate-queue-lane.js", () => ({
  rejectIfQueuedEntryIsStale: mocks.rejectIfQueuedEntryIsStale,
  rejectIfQueuedEntryPublicationIsStale: vi.fn(),
}));

vi.mock("./pr/integrate/queue-state.js", () => ({
  markQueueEntry: mocks.markQueueEntry,
  readIntegrationQueue: mocks.readIntegrationQueue,
  reserveQueueEntryForIntegration: mocks.reserveQueueEntryForIntegration,
  withIntegrationQueueMutex: mocks.withIntegrationQueueMutex,
  writeIntegrationQueue: mocks.writeIntegrationQueue,
}));

import {
  reserveClaimedEntryForIntegration,
  runReservedIntegrationCriticalSection,
} from "./integrate-queue-reservation.js";

function claimedEntry(): IntegrationQueueEntry {
  return {
    task_id: "T-1",
    branch: "task/T-1/work",
    base: "main",
    head_sha: "head",
    base_sha: "base",
    changed_paths: ["src/work.ts"],
    pr_number: 101,
    pr_url: "https://example.invalid/pull/101",
    priority: 0,
    status: "claimed",
    enqueued_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    claimed_by: "worker",
    claimed_at: "2026-01-01T00:00:00.000Z",
    lease_expires_at: "2999-01-01T00:00:00.000Z",
    claim_token: "claim-token",
  };
}

describe("integration reservation task-worktree gates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.withIntegrationQueueMutex.mockImplementation(
      async (_gitRoot: string, run: () => Promise<unknown>) => await run(),
    );
    mocks.markQueueEntry.mockImplementation(
      (
        queue: { schema_version: 1; entries: IntegrationQueueEntry[] },
        taskId: string,
        status: IntegrationQueueEntry["status"],
        reason?: string,
      ) => ({
        ...queue,
        entries: queue.entries.map((entry) =>
          entry.task_id === taskId ? { ...entry, status, reason: reason ?? null } : entry,
        ),
      }),
    );
    mocks.writeIntegrationQueue.mockResolvedValue();
  });

  it("rechecks the actual worktree before converting a claim into a reservation", async () => {
    const entry = claimedEntry();
    mocks.readIntegrationQueue.mockResolvedValue({ schema_version: 1, entries: [entry] });
    mocks.rejectIfQueuedEntryIsStale.mockResolvedValue({
      ...entry,
      status: "rework",
      reason: "task worktree contains uncommitted changes",
    });

    await expect(
      reserveClaimedEntryForIntegration({ gitRoot: "/repo", entry }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      message: "task worktree contains uncommitted changes",
    });
    expect(mocks.reserveQueueEntryForIntegration).not.toHaveBeenCalled();
    expect(mocks.writeIntegrationQueue).toHaveBeenCalledWith(
      "/repo",
      expect.objectContaining({
        entries: [expect.objectContaining({ status: "rework" })],
      }),
    );
  });

  it("rechecks the actual worktree before entering the integration critical section", async () => {
    const entry = {
      ...claimedEntry(),
      status: "handoff" as const,
      active_operation: "integration" as const,
    };
    const run = vi.fn();
    mocks.readIntegrationQueue.mockResolvedValue({ schema_version: 1, entries: [entry] });
    mocks.rejectIfQueuedEntryIsStale.mockResolvedValue({
      ...entry,
      status: "rework",
      reason: "task worktree contains uncommitted changes",
    });

    await expect(
      runReservedIntegrationCriticalSection({
        gitRoot: "/repo",
        entry,
        terminalStatus: "done",
        run,
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      message: "task worktree contains uncommitted changes",
    });
    expect(run).not.toHaveBeenCalled();
    expect(mocks.writeIntegrationQueue).toHaveBeenCalledWith(
      "/repo",
      expect.objectContaining({
        entries: [expect.objectContaining({ status: "rework" })],
      }),
    );
  });
});
