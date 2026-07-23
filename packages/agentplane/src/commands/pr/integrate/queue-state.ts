import path from "node:path";
import { hostname } from "node:os";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";

import { CliError } from "../../../shared/errors.js";
import { gitMutationDiagnosticContext } from "../../../shared/git-mutation.js";

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
  claim_token?: string;
  active_operation?: "integration";
  reason?: string;
};

type IntegrationQueueState = {
  schema_version: 1;
  entries: IntegrationQueueEntry[];
};

export type IntegrationQueueMutexContext = {
  gitRoot: string;
  locksDir: string;
  lockPath: string;
  queuePath: string;
};

export type IntegrationQueueMutexInspection =
  | { state: "absent" }
  | { state: "dead_same_host"; owner: { pid: number; host: string } }
  | { state: "live"; owner: { pid: number; host: string } }
  | { state: "foreign_host"; owner: { pid: number; host: string } }
  | { state: "invalid"; reason: string };

export type QueueClock = {
  now: () => Date;
};

const DEFAULT_QUEUE_LEASE_MS = 30 * 60 * 1000;
const DEFAULT_QUEUE_CLOCK: QueueClock = { now: () => new Date() };
const INTEGRATION_QUEUE_STATUSES = new Set<IntegrationQueueStatus>([
  "queued",
  "claimed",
  "handoff",
  "done",
  "rework",
]);

function integrationQueuePath(gitRoot: string): string {
  return path.join(gitRoot, ".agentplane", "cache", "integration-queue.json");
}

function resolveIntegrationQueueMutexContext(gitRoot: string): IntegrationQueueMutexContext {
  const locksDir = path.join(gitRoot, ".agentplane", "cache", "locks");
  return {
    gitRoot,
    locksDir,
    lockPath: path.join(locksDir, "integration-queue.lock"),
    queuePath: integrationQueuePath(gitRoot),
  };
}

export function emptyIntegrationQueue(): IntegrationQueueState {
  return { schema_version: 1, entries: [] };
}

export function integrationQueueEntryMatchesSnapshot(
  current: IntegrationQueueEntry | undefined,
  expected: IntegrationQueueEntry,
): current is IntegrationQueueEntry {
  return (
    current?.task_id === expected.task_id &&
    current.status === expected.status &&
    current.branch === expected.branch &&
    current.base === expected.base &&
    current.head_sha === expected.head_sha &&
    current.base_sha === expected.base_sha &&
    current.updated_at === expected.updated_at &&
    current.claimed_by === expected.claimed_by &&
    current.claimed_at === expected.claimed_at &&
    current.lease_expires_at === expected.lease_expires_at &&
    current.claim_token === expected.claim_token &&
    current.active_operation === expected.active_operation
  );
}

function parseQueueState(text: string): IntegrationQueueState {
  let parsed: Partial<IntegrationQueueState>;
  try {
    parsed = JSON.parse(text) as Partial<IntegrationQueueState>;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw invalidQueueState(`queue JSON is invalid: ${reason}`);
  }
  if (parsed.schema_version !== 1 || !Array.isArray(parsed.entries)) {
    throw invalidQueueState(
      `unsupported queue schema or entries payload: schema=${String(parsed.schema_version)}`,
    );
  }
  const entries: IntegrationQueueEntry[] = [];
  const taskIds = new Set<string>();
  let activeLanes = 0;
  for (const [index, entry] of parsed.entries.entries()) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw invalidQueueState(`entry ${index} is not an object`);
    }
    const maybe = entry as Partial<IntegrationQueueEntry>;
    const status = maybe.status;
    const valid =
      typeof maybe.task_id === "string" &&
      maybe.task_id.trim().length > 0 &&
      typeof maybe.branch === "string" &&
      maybe.branch.trim().length > 0 &&
      typeof maybe.base === "string" &&
      maybe.base.trim().length > 0 &&
      typeof maybe.head_sha === "string" &&
      maybe.head_sha.trim().length > 0 &&
      typeof maybe.base_sha === "string" &&
      maybe.base_sha.trim().length > 0 &&
      Array.isArray(maybe.changed_paths) &&
      maybe.changed_paths.every((value) => typeof value === "string") &&
      typeof maybe.priority === "number" &&
      Number.isFinite(maybe.priority) &&
      typeof maybe.enqueued_at === "string" &&
      typeof maybe.updated_at === "string" &&
      typeof status === "string" &&
      INTEGRATION_QUEUE_STATUSES.has(status as IntegrationQueueStatus);
    if (!valid) throw invalidQueueState(`entry ${index} is malformed or has an unknown status`);
    if (
      (status === "claimed" || status === "handoff") &&
      (typeof maybe.claimed_by !== "string" ||
        typeof maybe.claimed_at !== "string" ||
        typeof maybe.lease_expires_at !== "string")
    ) {
      throw invalidQueueState(`active entry ${index} is missing claim identity`);
    }
    if (taskIds.has(maybe.task_id!)) {
      throw invalidQueueState(`duplicate task_id ${maybe.task_id}`);
    }
    taskIds.add(maybe.task_id!);
    if (status === "claimed" || status === "handoff") activeLanes += 1;
    entries.push(maybe as IntegrationQueueEntry);
  }
  if (activeLanes > 1) {
    throw invalidQueueState(`multiple active integration lanes found: ${activeLanes}`);
  }
  return { schema_version: 1, entries };
}

function invalidQueueState(reason: string): CliError {
  return new CliError({
    code: "E_GIT_RACE",
    message: `Integration queue state is invalid; refusing to continue: ${reason}`,
    context: {
      reason_code: "integration_queue_state_invalid",
      reason,
    },
  });
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

async function readQueueMutexOwner(lockPath: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8"));
  } catch {
    return null;
  }
}

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return (err as { code?: unknown } | null)?.code !== "ESRCH";
  }
}

export async function inspectIntegrationQueueMutex(
  gitRoot: string,
  opts: {
    currentHost?: string;
    isProcessAlive?: (pid: number) => boolean;
  } = {},
): Promise<IntegrationQueueMutexInspection> {
  const mutex = resolveIntegrationQueueMutexContext(gitRoot);
  try {
    await stat(mutex.lockPath);
  } catch (err) {
    if ((err as { code?: unknown } | null)?.code === "ENOENT") return { state: "absent" };
    throw err;
  }

  const rawOwner = await readQueueMutexOwner(mutex.lockPath);
  if (!rawOwner || typeof rawOwner !== "object") {
    return { state: "invalid", reason: "integration queue lock owner is missing or invalid" };
  }
  const pid = Number((rawOwner as { pid?: unknown }).pid);
  const rawHost = (rawOwner as { host?: unknown }).host;
  const host = typeof rawHost === "string" ? rawHost.trim() : "";
  if (!Number.isSafeInteger(pid) || pid <= 0 || !host) {
    return { state: "invalid", reason: "integration queue lock owner identity is invalid" };
  }
  const owner = { pid, host };
  if (host !== (opts.currentHost ?? hostname())) return { state: "foreign_host", owner };
  if ((opts.isProcessAlive ?? processIsAlive)(pid)) return { state: "live", owner };
  return { state: "dead_same_host", owner };
}

export async function withIntegrationQueueMutex<T>(
  gitRoot: string,
  run: (ctx: IntegrationQueueMutexContext) => Promise<T>,
  opts: {
    writeOwner?: (path: string, content: string) => Promise<void>;
  } = {},
): Promise<T> {
  const mutex = resolveIntegrationQueueMutexContext(gitRoot);
  await mkdir(mutex.locksDir, { recursive: true });

  try {
    await mkdir(mutex.lockPath);
  } catch (err) {
    const code = (err as { code?: unknown } | null)?.code;
    if (code !== "EEXIST") throw err;
    const owner = await readQueueMutexOwner(mutex.lockPath);
    throw new CliError({
      code: "E_GIT_RACE",
      message: `Integration queue mutex is already held: ${mutex.lockPath}`,
      context: {
        ...gitMutationDiagnosticContext({
          command: "agentplane integration queue mutex",
          cwd: gitRoot,
          repoRoot: gitRoot,
          workflowMode: "branch_pr",
          mutationKind: "integration",
          remediation:
            "Inspect the lock with `agentplane integrate queue doctor --json`, reconcile queue state against provider/base evidence, then manually remove the exact lock path only after confirming no active writer.",
        }),
        integration_queue_path: mutex.queuePath,
        integration_queue_lock_path: mutex.lockPath,
        integration_queue_lock_owner: owner,
      },
    });
  }

  const ownerPath = path.join(mutex.lockPath, "owner.json");
  const ownerContent =
    JSON.stringify(
      {
        pid: process.pid,
        host: hostname(),
        acquired_at: new Date().toISOString(),
        git_root: mutex.gitRoot,
        queue_path: mutex.queuePath,
        operation: "integration-queue",
        workflow_mode: "branch_pr",
        mutation_kind: "integration",
      },
      null,
      2,
    ) + "\n";
  try {
    if (opts.writeOwner) await opts.writeOwner(ownerPath, ownerContent);
    else await writeFile(ownerPath, ownerContent, "utf8");
  } catch (err) {
    await rm(mutex.lockPath, { recursive: true, force: true });
    throw err;
  }

  try {
    return await run(mutex);
  } finally {
    await rm(mutex.lockPath, { recursive: true, force: true });
  }
}

export function upsertQueuedEntry(
  state: IntegrationQueueState,
  entry: Omit<IntegrationQueueEntry, "status" | "enqueued_at" | "updated_at">,
  clock?: QueueClock,
): IntegrationQueueState {
  const resolvedClock = clock ?? DEFAULT_QUEUE_CLOCK;
  const now = resolvedClock.now().toISOString();
  const existing = state.entries.find((candidate) => candidate.task_id === entry.task_id);
  if (existing?.status === "claimed" || existing?.status === "handoff") {
    throw new CliError({
      code: "E_HANDOFF",
      message:
        `Integration queue entry ${entry.task_id} is active (${existing.status}); ` +
        "release or recover the active lane before enqueueing it again",
      context: {
        reason_code: "integration_queue_entry_active",
        task_id: entry.task_id,
        queue_status: existing.status,
      },
    });
  }
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
  clock?: QueueClock,
): IntegrationQueueState {
  const resolvedClock = clock ?? DEFAULT_QUEUE_CLOCK;
  const nowMs = resolvedClock.now().getTime();
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
      const { claimed_by, claimed_at, lease_expires_at, claim_token, active_operation, ...rest } =
        entry;
      void claimed_by;
      void claimed_at;
      void lease_expires_at;
      void claim_token;
      void active_operation;
      return {
        ...rest,
        status: "queued",
        updated_at: resolvedClock.now().toISOString(),
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
    claim_token: randomUUID(),
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
  reason?: string,
  clock?: QueueClock,
): IntegrationQueueState {
  const resolvedClock = clock ?? DEFAULT_QUEUE_CLOCK;
  return {
    schema_version: 1,
    entries: state.entries.map((entry) =>
      entry.task_id === taskId ? markEntryStatus(entry, status, reason, resolvedClock) : entry,
    ),
  };
}

export function reserveQueueEntryForIntegration(
  state: IntegrationQueueState,
  taskId: string,
  clock?: QueueClock,
): IntegrationQueueState {
  const resolvedClock = clock ?? DEFAULT_QUEUE_CLOCK;
  return {
    schema_version: 1,
    entries: state.entries.map((entry) =>
      entry.task_id === taskId
        ? {
            ...entry,
            status: "handoff",
            active_operation: "integration",
            updated_at: resolvedClock.now().toISOString(),
            reason: "integration in progress",
          }
        : entry,
    ),
  };
}

export function queueBaseConflictReason(opts: {
  entry: IntegrationQueueEntry;
  currentBaseSha: string;
  baseChangedPaths: string[];
}): string | null {
  if (opts.currentBaseSha === opts.entry.base_sha) return null;

  const queuedPaths = new Set(opts.entry.changed_paths);
  const overlappingPaths = opts.baseChangedPaths
    .filter((changedPath) => queuedPaths.has(changedPath))
    .toSorted();
  const reason =
    `base branch advanced after enqueue: queued=${opts.entry.base_sha} ` +
    `current=${opts.currentBaseSha}`;
  return overlappingPaths.length > 0
    ? `${reason}; overlapping paths: ${overlappingPaths.join(", ")}`
    : reason;
}

function markEntryStatus(
  entry: IntegrationQueueEntry,
  status: IntegrationQueueStatus,
  reason: string | undefined,
  clock: QueueClock,
): IntegrationQueueEntry {
  const { active_operation, ...entryWithoutActiveOperation } = entry;
  void active_operation;
  const next = {
    ...entryWithoutActiveOperation,
    status,
    updated_at: clock.now().toISOString(),
    reason,
  };
  if (status === "claimed" || status === "handoff") return next;
  const { claimed_by, claimed_at, lease_expires_at, claim_token, ...released } = next;
  void claimed_by;
  void claimed_at;
  void lease_expires_at;
  void claim_token;
  return released;
}
