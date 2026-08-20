import { randomUUID } from "node:crypto";
import { mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";

import type { WorkspaceLease } from "./types.js";

function leaseDirectory(commonGitDir: string): string {
  return path.join(commonGitDir, "agentplane", "workspace-leases");
}

function leasePath(commonGitDir: string, taskId: string): string {
  return path.join(leaseDirectory(commonGitDir), `${taskId}.json`);
}

function processAlive(pid: number): boolean {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

async function readLease(filePath: string): Promise<WorkspaceLease | null> {
  try {
    const value = JSON.parse(await readFile(filePath, "utf8")) as WorkspaceLease;
    return value?.schema_version === 1 && typeof value.generation === "string" ? value : null;
  } catch {
    return null;
  }
}

export async function acquireWorkspaceLease(opts: {
  commonGitDir: string;
  taskId: string;
  allocationIdentity: `sha256:${string}`;
  workspaceRoot: string;
  now?: string;
  ownerPid?: number;
}): Promise<WorkspaceLease> {
  const directory = leaseDirectory(opts.commonGitDir);
  const filePath = leasePath(opts.commonGitDir, opts.taskId);
  await mkdir(directory, { recursive: true });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const lease: WorkspaceLease = Object.freeze({
      schema_version: 1,
      task_id: opts.taskId,
      generation: randomUUID(),
      owner_pid: opts.ownerPid ?? process.pid,
      acquired_at: opts.now ?? new Date().toISOString(),
      allocation_identity: opts.allocationIdentity,
      workspace_root: opts.workspaceRoot,
      lease_path: filePath,
    });
    try {
      const handle = await open(filePath, "wx", 0o600);
      try {
        await handle.writeFile(`${JSON.stringify(lease)}\n`, "utf8");
        await handle.sync();
      } finally {
        await handle.close();
      }
      return lease;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const existing = await readLease(filePath);
      if (existing && processAlive(existing.owner_pid)) {
        throw new Error(
          `Task ${opts.taskId} already owns workspace lease ${existing.generation} (pid=${String(existing.owner_pid)}).`,
        );
      }
      const staleGeneration = existing?.generation ?? randomUUID();
      await rename(
        filePath,
        path.join(directory, `${opts.taskId}.stale-${staleGeneration}.json`),
      ).catch(() => null);
    }
  }
  throw new Error(`Unable to acquire workspace lease for task ${opts.taskId}.`);
}

export async function assertWorkspaceLeaseOwned(lease: WorkspaceLease): Promise<void> {
  const current = await readLease(lease.lease_path);
  if (current?.generation !== lease.generation) {
    throw new Error(`Workspace lease ownership changed for task ${lease.task_id}.`);
  }
}

export async function releaseWorkspaceLease(lease: WorkspaceLease): Promise<void> {
  await assertWorkspaceLeaseOwned(lease);
  await unlink(lease.lease_path);
}
