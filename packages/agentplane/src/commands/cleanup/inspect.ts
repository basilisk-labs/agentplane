import { lstat, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { gitEnv, listWorktrees, parseTaskIdFromBranch } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";

import { isPathWithin } from "../shared/path.js";

type DiskInventoryEntry = {
  path: string;
  kind: "registered_worktree" | "nested_repository";
  branch: string | null;
  task_id: string | null;
  allocated_bytes: number | null;
  dirty: boolean | null;
  cleanup: "retain" | "proof_required";
  reason: string;
};

export type DiskInventory = {
  repository_root: string;
  agentplane_allocated_bytes: number | null;
  entries: DiskInventoryEntry[];
};

async function allocatedBytes(root: string): Promise<number> {
  const pending = [root];
  let total = 0;
  while (pending.length > 0) {
    const current = pending.pop()!;
    const stat = await lstat(current, { bigint: true });
    total += Number(stat.blocks * 512n);
    if (!stat.isDirectory() || stat.isSymbolicLink()) continue;
    const children = await readdir(current);
    for (const child of children) pending.push(path.join(current, child));
  }
  return total;
}

async function containedDirectory(root: string, candidate: string): Promise<string | null> {
  if (!isPathWithin(root, candidate)) return null;
  const stat = await lstat(candidate).catch(() => null);
  if (!stat?.isDirectory() || stat.isSymbolicLink()) return null;
  const resolved = await realpath(candidate).catch(() => null);
  return resolved && isPathWithin(root, resolved) ? resolved : null;
}

async function dirtyState(directory: string): Promise<boolean | null> {
  const status = await runProcess({
    command: "git",
    args: ["status", "--porcelain", "--untracked-files=all"],
    cwd: directory,
    env: gitEnv(),
    reject: false,
  }).catch(() => null);
  return status?.exitCode === 0 ? status.stdout.trim().length > 0 : null;
}

async function nestedRepositories(root: string, worktreesDir: string): Promise<string[]> {
  const candidates = new Set<string>();
  for (const parent of [path.join(root, ".agentplane"), worktreesDir]) {
    const safeParent = await containedDirectory(root, parent);
    if (!safeParent) continue;
    for (const child of await readdir(safeParent, { withFileTypes: true })) {
      if (!child.isDirectory() || child.isSymbolicLink()) continue;
      const candidate = path.join(safeParent, child.name);
      const gitMarker = await lstat(path.join(candidate, ".git")).catch(() => null);
      if (gitMarker && !gitMarker.isSymbolicLink()) candidates.add(candidate);
    }
  }
  return [...candidates].toSorted();
}

/** Read-only inventory. Only cleanup merged may turn a proof into a deletion. */
export async function inspectWorkspaceDisk(opts: {
  gitRoot: string;
  worktreesDir: string;
  taskPrefix: string;
  taskStatus: (taskId: string) => Promise<string | null>;
}): Promise<DiskInventory> {
  const worktrees = await listWorktrees(opts.gitRoot);
  const primary = worktrees[0];
  if (!primary) throw new Error("Primary Git worktree is unavailable.");
  const root = await realpath(primary.path);
  const worktreesDir = path.resolve(root, opts.worktreesDir);
  const registered = new Set(
    await Promise.all(
      worktrees.map(
        async (entry) => await realpath(entry.path).catch(() => path.resolve(entry.path)),
      ),
    ),
  );
  const entries: DiskInventoryEntry[] = [];
  for (const worktree of worktrees.slice(1)) {
    const candidate = await realpath(worktree.path).catch(() => path.resolve(worktree.path));
    const safe = await containedDirectory(root, candidate);
    const taskId = worktree.branch ? parseTaskIdFromBranch(opts.taskPrefix, worktree.branch) : null;
    const dirty = safe ? await dirtyState(safe) : null;
    const status = taskId ? await opts.taskStatus(taskId).catch(() => null) : null;
    let reason: string;
    if (safe === null) reason = "outside_repository_or_unavailable";
    else if (dirty === null) reason = "git_status_unavailable";
    else if (dirty) reason = "dirty_worktree";
    else if (taskId === null) reason = "task_owner_unproven";
    else if (status === null) reason = "task_state_unavailable";
    else if (status === "DONE") reason = "requires_cleanup_merged_proof";
    else reason = "task_not_done";
    entries.push({
      path: candidate,
      kind: "registered_worktree",
      branch: worktree.branch,
      task_id: taskId,
      allocated_bytes: safe ? await allocatedBytes(safe).catch(() => null) : null,
      dirty,
      cleanup: reason === "requires_cleanup_merged_proof" ? "proof_required" : "retain",
      reason,
    });
  }
  for (const candidate of await nestedRepositories(root, worktreesDir)) {
    if (registered.has(candidate)) continue;
    const safe = await containedDirectory(root, candidate);
    entries.push({
      path: candidate,
      kind: "nested_repository",
      branch: null,
      task_id: null,
      allocated_bytes: safe ? await allocatedBytes(safe).catch(() => null) : null,
      dirty: safe ? await dirtyState(safe) : null,
      cleanup: "retain",
      reason: "separate_repository_requires_manual_review",
    });
  }
  const agentplaneDir = await containedDirectory(root, path.join(root, ".agentplane"));
  return {
    repository_root: root,
    agentplane_allocated_bytes: agentplaneDir
      ? await allocatedBytes(agentplaneDir).catch(() => null)
      : null,
    entries: entries.toSorted((a, b) => a.path.localeCompare(b.path)),
  };
}
