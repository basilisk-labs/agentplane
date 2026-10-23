import path from "node:path";

import { gitRevParse, listWorktrees, parseTaskIdFromBranch } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { isSameBranchIdentity } from "./branch-identity.js";
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

function invalidPreparationTopology(reasonCode: string, message: string): never {
  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message,
    context: { reason_code: reasonCode },
  });
}

async function gitCommonDir(checkout: string): Promise<string> {
  const commonDir = await gitRevParse(checkout, ["--path-format=absolute", "--git-common-dir"]);
  if (!commonDir) {
    invalidPreparationTopology(
      "worktree_preparation_common_dir_missing",
      `Cannot establish the Git common directory for ${checkout}.`,
    );
  }
  return await resolvePathFallback(path.resolve(checkout, commonDir));
}

/** Keep the admitted base for task identity while creating its sibling from the primary checkout. */
export async function resolveCanonicalWorktreePreparationRoot(opts: {
  routedCheckout: string;
  registeredBaseCheckout: string | null;
  baseBranch: string;
}): Promise<string> {
  if (!opts.registeredBaseCheckout || !opts.baseBranch) {
    invalidPreparationTopology(
      "worktree_preparation_base_missing",
      "Worktree preparation requires a registered development-base checkout and branch.",
    );
  }
  const [routedPath, basePath] = await Promise.all([
    resolvePathFallback(opts.routedCheckout),
    resolvePathFallback(opts.registeredBaseCheckout),
  ]);
  if (routedPath !== basePath) {
    invalidPreparationTopology(
      "worktree_preparation_route_base_mismatch",
      "The routed checkout does not match the registered development-base checkout.",
    );
  }

  const worktrees = await listWorktrees(routedPath);
  const primary = worktrees[0];
  if (!primary) {
    invalidPreparationTopology(
      "worktree_preparation_primary_missing",
      "Git has no registered primary checkout for worktree preparation.",
    );
  }
  const registrations = await Promise.all(
    worktrees.map(async (worktree) => ({
      ...worktree,
      normalizedPath: await resolvePathFallback(worktree.path),
    })),
  );
  const baseRegistrations = registrations.filter((entry) => entry.normalizedPath === basePath);
  const primaryPath = registrations[0]?.normalizedPath;
  if (
    !primaryPath ||
    baseRegistrations.length !== 1 ||
    registrations.filter((entry) => entry.normalizedPath === primaryPath).length !== 1
  ) {
    invalidPreparationTopology(
      "worktree_preparation_registration_ambiguous",
      "Git worktree registration does not uniquely identify the primary and development-base checkouts.",
    );
  }
  const registeredBranch = baseRegistrations[0]?.branch;
  if (!registeredBranch || !isSameBranchIdentity(registeredBranch, opts.baseBranch)) {
    invalidPreparationTopology(
      "worktree_preparation_base_branch_mismatch",
      "The registered development-base checkout does not own the admitted base branch.",
    );
  }
  const commonDirs = await Promise.all([gitCommonDir(routedPath), gitCommonDir(primaryPath)]);
  if (commonDirs[0] !== commonDirs[1]) {
    invalidPreparationTopology(
      "worktree_preparation_foreign_repository",
      "The registered development base and primary checkout do not share a Git common directory.",
    );
  }
  return primaryPath;
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
