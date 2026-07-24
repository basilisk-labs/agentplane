import { randomUUID } from "node:crypto";
import { constants, type BigIntStats } from "node:fs";
import { link, lstat, mkdir, open, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

import { atomicWriteFile, syncDirectory } from "../fs/atomic-write.js";
import { runProcess } from "../process/run-process.js";

import { parseTaskReadme, renderTaskReadme, type ParsedTaskReadme } from "./task-readme.js";

const TASK_README_LOCK_TIMEOUT_MS = 5000;
const TASK_README_LOCK_RETRY_MS = 25;
const TASK_README_LOCK_MAX_BYTES = 16 * 1024;
const CURRENT_PROCESS_INSTANCE_ID = randomUUID();

type FileIdentity = {
  dev: bigint;
  ino: bigint;
};

type TaskReadmeLockRecord = {
  schema_version: 1;
  generation: string;
  process_instance_id: string;
  owner_pid: number;
  owner_command: string | null;
  owner_started_at: string | null;
  acquired_at: string;
};

type ObservedTaskReadmeLock = {
  identity: FileIdentity;
  record: TaskReadmeLockRecord;
};

type TaskReadmeLockLease = ObservedTaskReadmeLock & {
  lockPath: string;
};

export type TaskReadmeTransactionOptions = {
  timeoutMs?: number;
  retryMs?: number;
};

let currentProcessIdentity:
  | Promise<{ command: string | null; started_at: string | null }>
  | undefined;

function identity(stat: BigIntStats): FileIdentity {
  return { dev: BigInt(stat.dev), ino: BigInt(stat.ino) };
}

function sameIdentity(left: FileIdentity, right: FileIdentity): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}

function lockPathFor(readmePath: string): string {
  const taskDir = path.dirname(readmePath);
  return path.join(
    path.dirname(taskDir),
    `.${path.basename(taskDir)}.${path.basename(readmePath)}.lock`,
  );
}

function candidatePathFor(lockPath: string, generation: string): string {
  return `${lockPath}.candidate.${generation}`;
}

function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | null)?.code;
    if (code === "ESRCH" || code === "EINVAL") return false;
    if (code === "EPERM") return true;
    return false;
  }
}

async function observeProcessIdentity(
  pid: number,
): Promise<{ command: string | null; started_at: string | null } | null> {
  try {
    const { stdout } = await runProcess({
      command: "ps",
      args: ["-o", "lstart=,command=", "-p", String(pid)],
      env: { ...process.env, LANG: "C", LC_ALL: "C" },
      encoding: "utf8",
    });
    const line = String(stdout)
      .split("\n")
      .map((entry) => entry.trim())
      .find((entry) => entry.length > 0);
    if (!line) return null;
    const match =
      /^([A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d\d:\d\d:\d\d\s+\d{4})\s+(.*)$/u.exec(line);
    const startedAtRaw = match?.[1]?.trim() ?? null;
    return {
      command: match?.[2]?.trim() ?? null,
      started_at:
        startedAtRaw && !Number.isNaN(Date.parse(startedAtRaw))
          ? new Date(startedAtRaw).toISOString()
          : null,
    };
  } catch (error) {
    const errno = (error as NodeJS.ErrnoException | null)?.code;
    const exitCode = (error as { code?: number } | null)?.code;
    if (errno === "ESRCH" || exitCode === 1) return null;
    throw error;
  }
}

async function resolveCurrentProcessIdentity(): Promise<{
  command: string | null;
  started_at: string | null;
}> {
  currentProcessIdentity ??= observeProcessIdentity(process.pid).then(
    (observed) => observed ?? { command: null, started_at: null },
    () => ({ command: null, started_at: null }),
  );
  return await currentProcessIdentity;
}

function parseLockRecord(raw: string): TaskReadmeLockRecord | null {
  let parsed: Partial<TaskReadmeLockRecord>;
  try {
    parsed = JSON.parse(raw) as Partial<TaskReadmeLockRecord>;
  } catch {
    return null;
  }
  if (
    parsed.schema_version !== 1 ||
    typeof parsed.generation !== "string" ||
    parsed.generation.length === 0 ||
    typeof parsed.process_instance_id !== "string" ||
    parsed.process_instance_id.length === 0 ||
    typeof parsed.owner_pid !== "number" ||
    !Number.isInteger(parsed.owner_pid) ||
    parsed.owner_pid <= 0 ||
    (parsed.owner_command !== null && typeof parsed.owner_command !== "string") ||
    (parsed.owner_started_at !== null && typeof parsed.owner_started_at !== "string") ||
    typeof parsed.acquired_at !== "string" ||
    !Number.isFinite(Date.parse(parsed.acquired_at))
  ) {
    return null;
  }
  return parsed as TaskReadmeLockRecord;
}

async function readObservedLock(lockPath: string): Promise<ObservedTaskReadmeLock | null> {
  try {
    const before = await lstat(lockPath, { bigint: true });
    if (
      !before.isFile() ||
      before.isSymbolicLink() ||
      before.size > BigInt(TASK_README_LOCK_MAX_BYTES)
    ) {
      return null;
    }
    const record = parseLockRecord(await readFile(lockPath, "utf8"));
    if (!record) return null;
    const after = await lstat(lockPath, { bigint: true });
    if (
      !after.isFile() ||
      after.isSymbolicLink() ||
      !sameIdentity(identity(before), identity(after))
    ) {
      return null;
    }
    return { identity: identity(after), record };
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}

async function lockOwnerStatus(
  lock: ObservedTaskReadmeLock | null,
): Promise<"active" | "stale" | "unverified"> {
  if (!lock) return "unverified";
  if (
    lock.record.owner_pid === process.pid &&
    lock.record.process_instance_id === CURRENT_PROCESS_INSTANCE_ID
  ) {
    return "active";
  }
  let observed: Awaited<ReturnType<typeof observeProcessIdentity>>;
  try {
    observed = await observeProcessIdentity(lock.record.owner_pid);
  } catch {
    return "unverified";
  }
  if (!observed) return isProcessAlive(lock.record.owner_pid) ? "unverified" : "stale";
  if (!lock.record.owner_command || !lock.record.owner_started_at) return "unverified";
  if (!observed.command || !observed.started_at) return "unverified";
  return observed.command === lock.record.owner_command &&
    observed.started_at === lock.record.owner_started_at
    ? "active"
    : "stale";
}

async function writeLockCandidate(
  candidatePath: string,
  record: TaskReadmeLockRecord,
): Promise<void> {
  const handle = await open(
    candidatePath,
    constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0),
    0o600,
  );
  try {
    await handle.writeFile(`${JSON.stringify(record)}\n`, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
}

async function acquireTaskReadmeLock(
  readmePath: string,
  options: TaskReadmeTransactionOptions,
): Promise<TaskReadmeLockLease> {
  const lockPath = lockPathFor(readmePath);
  await mkdir(path.dirname(lockPath), { recursive: true });
  const generation = randomUUID();
  const owner = await resolveCurrentProcessIdentity();
  const record: TaskReadmeLockRecord = {
    schema_version: 1,
    generation,
    process_instance_id: CURRENT_PROCESS_INSTANCE_ID,
    owner_pid: process.pid,
    owner_command: owner.command,
    owner_started_at: owner.started_at,
    acquired_at: new Date().toISOString(),
  };
  const candidatePath = candidatePathFor(lockPath, generation);
  await writeLockCandidate(candidatePath, record);
  const timeoutMs = options.timeoutMs ?? TASK_README_LOCK_TIMEOUT_MS;
  const retryMs = options.retryMs ?? TASK_README_LOCK_RETRY_MS;
  const deadline = Date.now() + timeoutMs;

  try {
    for (;;) {
      try {
        await link(candidatePath, lockPath);
        await syncDirectory(path.dirname(lockPath));
        const observed = await readObservedLock(lockPath);
        if (observed?.record.generation !== generation) {
          throw new Error(`Task README lock publication could not be verified: ${lockPath}`);
        }
        return { ...observed, lockPath };
      } catch (error) {
        if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
      }

      if (Date.now() >= deadline) {
        const observed = await readObservedLock(lockPath);
        const ownerStatus = await lockOwnerStatus(observed);
        throw new Error(
          `Timed out waiting for task README lock: ${lockPath} ` +
            `(owner_status=${ownerStatus}; stale locks are retained fail-closed)`,
        );
      }
      await sleep(retryMs);
    }
  } finally {
    await unlink(candidatePath).catch(() => null);
    await syncDirectory(path.dirname(lockPath));
  }
}

async function releaseTaskReadmeLock(lease: TaskReadmeLockLease): Promise<void> {
  const observed = await readObservedLock(lease.lockPath);
  const ownsLock =
    observed?.record.generation === lease.record.generation &&
    sameIdentity(observed.identity, lease.identity);
  if (!ownsLock) {
    throw new Error(`Task README lock ownership changed before release: ${lease.lockPath}`);
  }
  await unlink(lease.lockPath);
  await syncDirectory(path.dirname(lease.lockPath));
}

export async function withTaskReadmeTransaction<T>(
  readmePath: string,
  operation: () => Promise<T> | T,
  options: TaskReadmeTransactionOptions = {},
): Promise<T> {
  const lease = await acquireTaskReadmeLock(readmePath, options);
  let result: T;
  try {
    result = await operation();
  } catch (operationError) {
    try {
      await releaseTaskReadmeLock(lease);
    } catch (releaseError) {
      throw new AggregateError(
        [operationError, releaseError],
        `Task README operation and lock release both failed: ${readmePath}`,
      );
    }
    throw operationError;
  }
  await releaseTaskReadmeLock(lease);
  return result;
}

export async function readTaskReadme(readmePath: string): Promise<ParsedTaskReadme> {
  const text = await readFile(readmePath, "utf8");
  return parseTaskReadme(text);
}

export async function updateTaskReadmeAtomic(
  readmePath: string,
  updater: (
    parsed: ParsedTaskReadme,
  ) =>
    | { frontmatter: Record<string, unknown>; body: string }
    | Promise<{ frontmatter: Record<string, unknown>; body: string }>,
): Promise<void> {
  await withTaskReadmeTransaction(readmePath, async () => {
    const text = await readFile(readmePath, "utf8");
    const parsed = parseTaskReadme(text);
    const next = await updater(parsed);
    const currentRevision =
      typeof parsed.frontmatter.revision === "number" &&
      Number.isInteger(parsed.frontmatter.revision) &&
      parsed.frontmatter.revision > 0
        ? parsed.frontmatter.revision
        : 1;
    const candidate = {
      ...next.frontmatter,
      revision: currentRevision,
    };
    let rendered = renderTaskReadme(candidate, next.body);
    rendered = rendered.endsWith("\n") ? rendered : `${rendered}\n`;
    if (rendered === text) return;
    rendered = renderTaskReadme({ ...candidate, revision: currentRevision + 1 }, next.body);
    await atomicWriteFile(readmePath, rendered.endsWith("\n") ? rendered : `${rendered}\n`);
  });
}
