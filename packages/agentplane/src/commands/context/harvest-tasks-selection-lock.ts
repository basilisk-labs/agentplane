import { randomUUID } from "node:crypto";
import type { Stats } from "node:fs";
import { mkdir, open, readFile, rename, stat, unlink } from "node:fs/promises";
import { hostname } from "node:os";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { fileExists, isRecord } from "./context-utils.js";

const TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS = 10 * 60 * 1000;

type TaskKnowledgeLockOwner = { token: string; pid: number; hostname: string };

type TaskKnowledgeSelectionLock = {
  schema_version: 1;
  kind: "task_knowledge_proposal_selection_lock";
  owner: TaskKnowledgeLockOwner;
  acquired_at: string;
  expires_at: string;
};

type TaskKnowledgeSelectionReclaimGuard = {
  schema_version: 1;
  kind: "task_knowledge_proposal_selection_reclaim_guard";
  owner: TaskKnowledgeLockOwner;
  acquired_at: string;
  expires_at: string;
};

export type TaskKnowledgeSelectionLockTestHooks = {
  afterStaleLockRead?: (input: {
    target: string;
    ownerToken: string | null;
  }) => void | Promise<void>;
};

export async function acquireTaskKnowledgeSelectionLock(opts: {
  root: string;
  proposalId: string;
  testHooks?: TaskKnowledgeSelectionLockTestHooks;
}): Promise<() => Promise<void>> {
  const rel = `.agentplane/context/derived/proposals/task-knowledge/${opts.proposalId}.selection.lock`;
  const target = path.join(opts.root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  const owner = { token: randomUUID(), pid: process.pid, hostname: hostname() };
  let handle: Awaited<ReturnType<typeof open>> | null = null;
  while (!handle) {
    try {
      handle = await open(target, "wx");
      const acquiredAt = new Date();
      const lock: TaskKnowledgeSelectionLock = {
        schema_version: 1,
        kind: "task_knowledge_proposal_selection_lock",
        owner,
        acquired_at: acquiredAt.toISOString(),
        expires_at: new Date(
          acquiredAt.getTime() + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS,
        ).toISOString(),
      };
      await handle.writeFile(`${JSON.stringify(lock)}\n`, "utf8");
      await handle.sync();
      if (await fileExists(taskKnowledgeSelectionReclaimGuardPath(target))) {
        await handle.close();
        handle = null;
        await removeTaskKnowledgeSelectionLockIfOwned({ target, ownerToken: owner.token });
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            "CURATOR selection recovery is already in progress for this task knowledge proposal. Re-run after the recovery guard is released.",
        });
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      if (await reclaimStaleTaskKnowledgeSelectionLock({ target, testHooks: opts.testHooks }))
        continue;
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message:
          "A live CURATOR selection is already being created for this task knowledge proposal. Re-run after its lease expires or the active selection finishes.",
      });
    }
  }
  return async () => {
    await handle.close();
    await removeTaskKnowledgeSelectionLockIfOwned({ target, ownerToken: owner.token });
  };
}

function taskKnowledgeSelectionReclaimGuardPath(target: string): string {
  return `${target}.reclaim.lock`;
}

async function removeTaskKnowledgeSelectionLockIfOwned(opts: {
  target: string;
  ownerToken: string;
}): Promise<void> {
  const current = await readFile(opts.target, "utf8").catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (!current || parseTaskKnowledgeSelectionLock(current)?.owner.token !== opts.ownerToken) return;
  await unlink(opts.target).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
  });
}

function parseTaskKnowledgeSelectionReclaimGuard(
  value: string,
): TaskKnowledgeSelectionReclaimGuard | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (
      !isRecord(parsed) ||
      parsed.schema_version !== 1 ||
      parsed.kind !== "task_knowledge_proposal_selection_reclaim_guard" ||
      !isRecord(parsed.owner) ||
      typeof parsed.owner.token !== "string" ||
      typeof parsed.owner.pid !== "number" ||
      typeof parsed.owner.hostname !== "string" ||
      typeof parsed.acquired_at !== "string" ||
      typeof parsed.expires_at !== "string"
    )
      return null;
    return parsed as TaskKnowledgeSelectionReclaimGuard;
  } catch {
    return null;
  }
}

async function acquireTaskKnowledgeSelectionReclaimGuard(
  target: string,
): Promise<(() => Promise<void>) | null> {
  const guardPath = taskKnowledgeSelectionReclaimGuardPath(target);
  const owner: TaskKnowledgeLockOwner = {
    token: randomUUID(),
    pid: process.pid,
    hostname: hostname(),
  };
  let handle: Awaited<ReturnType<typeof open>> | null = null;
  while (!handle) {
    try {
      handle = await open(guardPath, "wx");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      if (!(await reclaimStaleTaskKnowledgeSelectionReclaimGuard(guardPath))) return null;
    }
  }
  const acquiredAt = new Date();
  const guard: TaskKnowledgeSelectionReclaimGuard = {
    schema_version: 1,
    kind: "task_knowledge_proposal_selection_reclaim_guard",
    owner,
    acquired_at: acquiredAt.toISOString(),
    expires_at: new Date(
      acquiredAt.getTime() + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS,
    ).toISOString(),
  };
  await handle.writeFile(`${JSON.stringify(guard)}\n`, "utf8");
  await handle.sync();
  return async () => {
    await handle.close();
    const current = await readFile(guardPath, "utf8").catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!current || parseTaskKnowledgeSelectionReclaimGuard(current)?.owner.token !== owner.token)
      return;
    await unlink(guardPath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  };
}

function parseTaskKnowledgeSelectionLock(value: string): TaskKnowledgeSelectionLock | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (
      !isRecord(parsed) ||
      parsed.schema_version !== 1 ||
      parsed.kind !== "task_knowledge_proposal_selection_lock" ||
      !isRecord(parsed.owner) ||
      typeof parsed.owner.token !== "string" ||
      typeof parsed.owner.pid !== "number" ||
      typeof parsed.owner.hostname !== "string" ||
      typeof parsed.acquired_at !== "string" ||
      typeof parsed.expires_at !== "string"
    )
      return null;
    return parsed as TaskKnowledgeSelectionLock;
  } catch {
    return null;
  }
}

function taskKnowledgeLockOwnerLiveness(
  owner: TaskKnowledgeLockOwner,
): "alive" | "dead" | "unknown" {
  if (owner.hostname !== hostname()) return "unknown";
  try {
    process.kill(owner.pid, 0);
    return "alive";
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return code === "EPERM" ? "alive" : code === "ESRCH" ? "dead" : "unknown";
  }
}

async function reclaimStaleTaskKnowledgeSelectionReclaimGuard(guardPath: string): Promise<boolean> {
  let content: string;
  let metadata: Stats;
  try {
    [content, metadata] = await Promise.all([readFile(guardPath, "utf8"), stat(guardPath)]);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return true;
    throw error;
  }
  const guard = parseTaskKnowledgeSelectionReclaimGuard(content);
  const expiresAt = guard ? Date.parse(guard.expires_at) : Number.NaN;
  const expired = Number.isFinite(expiresAt)
    ? expiresAt <= Date.now()
    : metadata.mtimeMs + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS <= Date.now();
  const liveness = guard ? taskKnowledgeLockOwnerLiveness(guard.owner) : "unknown";
  if (liveness === "alive" || (!expired && liveness !== "dead")) return false;
  const recoveryPath = `${guardPath}.recovered-${randomUUID()}`;
  try {
    await rename(guardPath, recoveryPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return true;
    throw error;
  }
  await unlink(recoveryPath).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
  });
  return true;
}

async function reclaimStaleTaskKnowledgeSelectionLock(opts: {
  target: string;
  testHooks?: TaskKnowledgeSelectionLockTestHooks;
}): Promise<boolean> {
  const observed = await readTaskKnowledgeSelectionLock(opts.target);
  if (!observed) return true;
  if (!isReclaimableTaskKnowledgeSelectionLock(observed)) return false;
  await opts.testHooks?.afterStaleLockRead?.({
    target: opts.target,
    ownerToken: observed.lock?.owner.token ?? null,
  });
  const releaseGuard = await acquireTaskKnowledgeSelectionReclaimGuard(opts.target);
  if (!releaseGuard) return false;
  try {
    const current = await readTaskKnowledgeSelectionLock(opts.target);
    if (!current) return true;
    if (current.content !== observed.content || !isReclaimableTaskKnowledgeSelectionLock(current))
      return false;
    const recoveryPath = `${opts.target}.recovered-${randomUUID()}`;
    try {
      await rename(opts.target, recoveryPath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return true;
      throw error;
    }
    await unlink(recoveryPath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
    return true;
  } finally {
    await releaseGuard();
  }
}

async function readTaskKnowledgeSelectionLock(
  target: string,
): Promise<{ content: string; metadata: Stats; lock: TaskKnowledgeSelectionLock | null } | null> {
  try {
    const [content, metadata] = await Promise.all([readFile(target, "utf8"), stat(target)]);
    return { content, metadata, lock: parseTaskKnowledgeSelectionLock(content) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function isReclaimableTaskKnowledgeSelectionLock(lockFile: {
  metadata: Stats;
  lock: TaskKnowledgeSelectionLock | null;
}): boolean {
  const expiresAt = lockFile.lock ? Date.parse(lockFile.lock.expires_at) : Number.NaN;
  const expired = Number.isFinite(expiresAt)
    ? expiresAt <= Date.now()
    : lockFile.metadata.mtimeMs + TASK_KNOWLEDGE_SELECTION_LOCK_LEASE_MS <= Date.now();
  const liveness = lockFile.lock ? taskKnowledgeLockOwnerLiveness(lockFile.lock.owner) : "unknown";
  return liveness !== "alive" && (expired || liveness === "dead");
}
