import path from "node:path";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";

export type IntegrationQueueStatus = "queued" | "claimed" | "handoff" | "done" | "rework";

export type IntegrationQueueEntry = {
  task_id: string;
  branch: string;
  base: string;
  head_sha: string;
  base_sha: string;
  changed_paths: string[];
  pr_number: number | null;
  pr_url: string | null;
  priority: number;
  status: IntegrationQueueStatus;
  enqueued_at: string;
  updated_at: string;
  claimed_by?: string;
  claimed_at?: string;
  lease_expires_at?: string;
  reason?: string;
};

export type IntegrationQueueState = {
  schema_version: 1;
  entries: IntegrationQueueEntry[];
};

export type QueueClock = {
  now: () => Date;
};

export const DEFAULT_QUEUE_LEASE_MS = 30 * 60 * 1000;

export function integrationQueuePath(gitRoot: string): string {
  return path.join(gitRoot, ".agentplane", "cache", "integration-queue.json");
}

export function emptyIntegrationQueue(): IntegrationQueueState {
  return { schema_version: 1, entries: [] };
}

function parseQueueState(text: string): IntegrationQueueState {
  const parsed = JSON.parse(text) as Partial<IntegrationQueueState>;
  if (parsed.schema_version !== 1 || !Array.isArray(parsed.entries)) {
    return emptyIntegrationQueue();
  }
  return {
    schema_version: 1,
    entries: parsed.entries.filter((entry): entry is IntegrationQueueEntry => {
      const maybe = entry as Partial<IntegrationQueueEntry>;
      return (
        typeof maybe.task_id === "string" &&
        typeof maybe.branch === "string" &&
        typeof maybe.base === "string" &&
        typeof maybe.head_sha === "string" &&
        typeof maybe.base_sha === "string" &&
        Array.isArray(maybe.changed_paths) &&
        typeof maybe.priority === "number" &&
        typeof maybe.status === "string"
      );
    }),
  };
}

export async function readIntegrationQueue(gitRoot: string): Promise<IntegrationQueueState> {
  try {
    return parseQueueState(await readFile(integrationQueuePath(gitRoot), "utf8"));
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "ENOENT") {
      return emptyIntegrationQueue();
    }
    throw err;
  }
}

export async function writeIntegrationQueue(
  gitRoot: string,
  state: IntegrationQueueState,
): Promise<void> {
  const queuePath = integrationQueuePath(gitRoot);
  await mkdir(path.dirname(queuePath), { recursive: true });
  const tmpPath = `${queuePath}.${process.pid}.tmp`;
  await writeFile(tmpPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  await rename(tmpPath, queuePath);
}

export function upsertQueuedEntry(
  state: IntegrationQueueState,
  entry: Omit<IntegrationQueueEntry, "status" | "enqueued_at" | "updated_at">,
  clock: QueueClock = { now: () => new Date() },
): IntegrationQueueState {
  const now = clock.now().toISOString();
  const existing = state.entries.find((candidate) => candidate.task_id === entry.task_id);
  const nextEntry: IntegrationQueueEntry = {
    ...entry,
    status: "queued",
    enqueued_at: existing?.enqueued_at ?? now,
    updated_at: now,
  };
  const entries = state.entries.filter((candidate) => candidate.task_id !== entry.task_id);
  return {
    schema_version: 1,
    entries: [...entries, nextEntry],
  };
}

export function expireClaimedEntries(
  state: IntegrationQueueState,
  clock: QueueClock = { now: () => new Date() },
): IntegrationQueueState {
  const nowMs = clock.now().getTime();
  return {
    schema_version: 1,
    entries: state.entries.map((entry) => {
      if (
        entry.status !== "claimed" ||
        !entry.lease_expires_at ||
        Date.parse(entry.lease_expires_at) > nowMs
      ) {
        return entry;
      }
      const { claimed_by, claimed_at, lease_expires_at, ...rest } = entry;
      void claimed_by;
      void claimed_at;
      void lease_expires_at;
      return {
        ...rest,
        status: "queued",
        updated_at: clock.now().toISOString(),
        reason: "lease expired",
      };
    }),
  };
}

export function claimNextQueuedEntry(
  state: IntegrationQueueState,
  opts: { worker: string; leaseMs?: number; clock?: QueueClock },
): { state: IntegrationQueueState; entry: IntegrationQueueEntry | null } {
  const clock = opts.clock ?? { now: () => new Date() };
  const current = expireClaimedEntries(state, clock);
  const activeLane = current.entries.find(
    (entry) => entry.status === "claimed" || entry.status === "handoff",
  );
  if (activeLane) return { state: current, entry: null };

  const queued = current.entries
    .filter((entry) => entry.status === "queued")
    .toSorted((left, right) => {
      if (right.priority !== left.priority) return right.priority - left.priority;
      return left.enqueued_at.localeCompare(right.enqueued_at);
    })[0];
  if (!queued) return { state: current, entry: null };

  const now = clock.now();
  const claimed: IntegrationQueueEntry = {
    ...queued,
    status: "claimed",
    claimed_by: opts.worker,
    claimed_at: now.toISOString(),
    lease_expires_at: new Date(
      now.getTime() + (opts.leaseMs ?? DEFAULT_QUEUE_LEASE_MS),
    ).toISOString(),
    updated_at: now.toISOString(),
    reason: undefined,
  };
  return {
    state: {
      schema_version: 1,
      entries: current.entries.map((entry) =>
        entry.task_id === claimed.task_id ? claimed : entry,
      ),
    },
    entry: claimed,
  };
}

export function markQueueEntry(
  state: IntegrationQueueState,
  taskId: string,
  status: IntegrationQueueStatus,
  reason: string | undefined,
  clock: QueueClock = { now: () => new Date() },
): IntegrationQueueState {
  return {
    schema_version: 1,
    entries: state.entries.map((entry) =>
      entry.task_id === taskId ? markEntryStatus(entry, status, reason, clock) : entry,
    ),
  };
}

function markEntryStatus(
  entry: IntegrationQueueEntry,
  status: IntegrationQueueStatus,
  reason: string | undefined,
  clock: QueueClock,
): IntegrationQueueEntry {
  const next = {
    ...entry,
    status,
    updated_at: clock.now().toISOString(),
    reason,
  };
  if (status === "claimed" || status === "handoff") return next;
  const { claimed_by, claimed_at, lease_expires_at, ...released } = next;
  void claimed_by;
  void claimed_at;
  void lease_expires_at;
  return released;
}
