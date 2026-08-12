import path from "node:path";

import { listWorktrees, parseTaskIdFromBranch } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { isPathWithin, resolvePathFallback } from "./path.js";

export type RegisteredWorktree = {
  path: string;
  branch: string | null;
};

export type NestedWorktreeRegistration = {
  path: string;
  branch: string | null;
  parentPath: string;
  parentBranch: string | null;
};

export type DuplicateTaskWorktreeRegistration = {
  taskId: string;
  worktrees: RegisteredWorktree[];
};

function normalizedPath(value: string): string {
  return path.resolve(value);
}

export function findNestedWorktreeRegistrations(opts: {
  projectRoot: string;
  worktrees: readonly RegisteredWorktree[];
}): NestedWorktreeRegistration[] {
  const normalized = opts.worktrees.map((entry) => ({
    ...entry,
    normalizedPath: normalizedPath(entry.path),
  }));
  const primaryRoot = normalized[0]?.normalizedPath ?? normalizedPath(opts.projectRoot);
  const nested: NestedWorktreeRegistration[] = [];

  for (const candidate of normalized) {
    const parent = normalized
      .filter(
        (entry) =>
          entry.normalizedPath !== primaryRoot &&
          entry.normalizedPath !== candidate.normalizedPath &&
          isPathWithin(entry.normalizedPath, candidate.normalizedPath),
      )
      .toSorted((a, b) => b.normalizedPath.length - a.normalizedPath.length)[0];
    if (!parent) continue;
    nested.push({
      path: candidate.path,
      branch: candidate.branch,
      parentPath: parent.path,
      parentBranch: parent.branch,
    });
  }

  return nested.toSorted((a, b) => a.path.localeCompare(b.path));
}

export function findDuplicateTaskWorktreeRegistrations(opts: {
  taskPrefix: string;
  worktrees: readonly RegisteredWorktree[];
}): DuplicateTaskWorktreeRegistration[] {
  const byTask = new Map<string, RegisteredWorktree[]>();
  for (const worktree of opts.worktrees) {
    if (!worktree.branch) continue;
    const taskId = parseTaskIdFromBranch(opts.taskPrefix, worktree.branch);
    if (!taskId) continue;
    const registrations = byTask.get(taskId) ?? [];
    registrations.push(worktree);
    byTask.set(taskId, registrations);
  }
  return [...byTask.entries()]
    .filter(([, registrations]) => registrations.length > 1)
    .map(([taskId, worktrees]) => ({
      taskId,
      worktrees: worktrees.toSorted((a, b) => a.path.localeCompare(b.path)),
    }))
    .toSorted((a, b) => a.taskId.localeCompare(b.taskId));
}

export async function assertCanonicalWorktreeCreationRoot(opts: {
  gitRoot: string;
  baseBranch: string;
}): Promise<void> {
  const worktrees = await listWorktrees(opts.gitRoot);
  const primary = worktrees[0];
  if (!primary) return;

  const [projectRoot, primaryRoot] = await Promise.all([
    resolvePathFallback(opts.gitRoot),
    resolvePathFallback(primary.path),
  ]);
  if (projectRoot === primaryRoot) return;

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      `Refusing to create task worktrees from internal control checkout ${projectRoot}. ` +
      `Run work start from the primary checkout ${primaryRoot} on ${opts.baseBranch}; recovery and task ` +
      "checkouts must not create a nested historical worktree graph.",
    context: {
      reason_code: "nested_control_worktree_creation_forbidden",
      project_root: projectRoot,
      canonical_project_root: primaryRoot,
      base_branch: opts.baseBranch,
    },
  });
}

export async function assertSingleTaskWorktreeRegistration(opts: {
  gitRoot: string;
  taskPrefix: string;
  taskId: string;
}): Promise<void> {
  const worktrees = await listWorktrees(opts.gitRoot);
  const owner = worktrees.find(
    (entry) =>
      entry.branch !== null && parseTaskIdFromBranch(opts.taskPrefix, entry.branch) === opts.taskId,
  );
  if (!owner) return;

  const branch = owner.branch?.replace(/^refs\/heads\//u, "") ?? "detached";
  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      `Task ${opts.taskId} already has authoritative worktree ${owner.path} on ${branch}. ` +
      `Resume that checkout with agentplane work resume ${opts.taskId}; AgentPlane permits one ` +
      "worktree per task while different active tasks may run in parallel.",
    context: {
      reason_code: "task_worktree_already_registered",
      task_id: opts.taskId,
      authoritative_worktree: owner.path,
      branch,
    },
  });
}
