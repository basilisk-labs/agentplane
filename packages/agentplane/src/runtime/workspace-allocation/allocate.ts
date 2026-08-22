import { createHash } from "node:crypto";
import { cp, mkdir } from "node:fs/promises";
import path from "node:path";

import { gitBranchExists, gitRevParse } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import {
  resolveCommandGitCommonDir,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "../../commands/shared/task-backend.js";
import type { TaskExecutionContext } from "../task-execution-context/index.js";
import {
  acquireWorkspaceLease,
  assertWorkspaceLeaseOwned,
  releaseWorkspaceLease,
} from "./lease.js";
import type { WorkspaceAllocationContext } from "./types.js";
import { findRelocatableWorktreeForBranch } from "./rediscover.js";

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function workspaceAllocationIdentity(execution: TaskExecutionContext): `sha256:${string}` {
  return sha256(
    JSON.stringify(
      canonicalizeJson({
        schema_version: 1,
        primary_task_id: execution.primary_task_id,
        task_ids: [...execution.task_ids].toSorted(),
        selected_mode: execution.selected_mode,
        base_ref: execution.base_ref,
        base_sha: execution.base_sha,
      }),
    ),
  );
}

function directWorkspaceBranch(taskId: string): string {
  return `agentplane/workspace/${taskId.replaceAll(/[^A-Za-z0-9._-]/gu, "-")}`;
}

async function primaryWorktreeRoot(gitRoot: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
    cwd: gitRoot,
  });
  const first = String(stdout)
    .split("\n")
    .find((line) => line.startsWith("worktree "));
  const primaryRoot = first?.slice("worktree ".length).trim();
  if (primaryRoot) return primaryRoot;
  return gitRoot;
}

async function ensureDirectWorkspace(opts: {
  ctx: CommandContext;
  execution: TaskExecutionContext;
  workspaceRoot: string;
  branch: string;
}): Promise<void> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  if (/^0+$/u.test(opts.execution.base_sha)) {
    throw new Error("An isolated workspace requires a committed task base.");
  }
  await gitRevParse(gitRoot, [`${opts.execution.base_sha}^{commit}`]);
  const existingWorktree = await findRelocatableWorktreeForBranch(gitRoot, opts.branch);
  if (existingWorktree) {
    if (path.resolve(existingWorktree) !== path.resolve(opts.workspaceRoot)) {
      throw new Error(
        `Workspace branch ${opts.branch} is already checked out at ${existingWorktree}.`,
      );
    }
    return;
  }
  if (await gitBranchExists(gitRoot, opts.branch)) {
    await execFileAsync("git", ["worktree", "add", opts.workspaceRoot, opts.branch], {
      cwd: gitRoot,
    });
    return;
  }
  await execFileAsync(
    "git",
    ["worktree", "add", "-b", opts.branch, opts.workspaceRoot, opts.execution.base_sha],
    { cwd: gitRoot },
  );
}

async function materializeTaskArtifacts(opts: {
  ctx: CommandContext;
  execution: TaskExecutionContext;
  workspaceRoot: string;
}): Promise<void> {
  const repositoryRoot = opts.ctx.resolvedProject.gitRoot;
  if (path.resolve(repositoryRoot) === path.resolve(opts.workspaceRoot)) return;
  const roots = [opts.ctx.config.paths.workflow_dir, opts.ctx.config.paths.tasks_path]
    .map((entry) => entry.trim())
    .filter(Boolean);
  for (const relativeRoot of new Set(roots)) {
    for (const taskId of opts.execution.task_ids) {
      const source = path.join(repositoryRoot, relativeRoot, taskId);
      const target = path.join(opts.workspaceRoot, relativeRoot, taskId);
      await mkdir(path.dirname(target), { recursive: true });
      await cp(source, target, { recursive: true, force: true }).catch((error) => {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      });
    }
  }
  const agentplaneRoot = path.relative(
    repositoryRoot,
    opts.ctx.resolvedProject.agentplaneDir ?? path.join(repositoryRoot, ".agentplane"),
  );
  for (const relativePath of [
    path.join(agentplaneRoot, "WORKFLOW.md"),
    path.join(agentplaneRoot, "policy"),
    path.join(agentplaneRoot, "blueprints"),
    path.join(agentplaneRoot, "recipes"),
    path.join(agentplaneRoot, "context"),
    path.join(agentplaneRoot, "cache.sqlite"),
    path.join(agentplaneRoot, "user-instructions.md"),
  ]) {
    const source = path.join(repositoryRoot, relativePath);
    const target = path.join(opts.workspaceRoot, relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(source, target, { recursive: true, force: true }).catch((error) => {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    });
  }
}

export async function allocateTaskWorkspace(opts: {
  ctx: CommandContext;
  execution: TaskExecutionContext;
}): Promise<WorkspaceAllocationContext> {
  const taskId = opts.execution.primary_task_id;
  const identity = workspaceAllocationIdentity(opts.execution);
  let allocationKind: WorkspaceAllocationContext["allocation_kind"];
  let branch: string;
  let workspaceRoot: string;
  if (opts.execution.selected_mode === "branch_pr") {
    const taskBranch = await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId });
    if (!taskBranch) {
      throw new Error(`branch_pr task ${taskId} has no prepared task branch.`);
    }
    const taskWorktree = await findRelocatableWorktreeForBranch(
      opts.ctx.resolvedProject.gitRoot,
      taskBranch,
    );
    if (!taskWorktree) {
      throw new Error(`branch_pr task ${taskId} has no prepared task worktree.`);
    }
    allocationKind = "existing_task_worktree";
    branch = taskBranch;
    workspaceRoot = taskWorktree;
  } else {
    allocationKind = "direct_workspace";
    branch = directWorkspaceBranch(taskId);
    workspaceRoot =
      (await findRelocatableWorktreeForBranch(opts.ctx.resolvedProject.gitRoot, branch)) ??
      path.join(
        await primaryWorktreeRoot(opts.ctx.resolvedProject.gitRoot),
        ".agentplane",
        "workspaces",
        `${taskId}-${opts.execution.base_sha.slice(0, 12)}`,
      );
  }
  const lease = await acquireWorkspaceLease({
    commonGitDir: await resolveCommandGitCommonDir(opts.ctx),
    taskId,
    allocationIdentity: identity,
    workspaceRoot,
  });
  try {
    if (allocationKind === "direct_workspace") {
      await ensureDirectWorkspace({
        ctx: opts.ctx,
        execution: opts.execution,
        workspaceRoot,
        branch,
      });
      await materializeTaskArtifacts({
        ctx: opts.ctx,
        execution: opts.execution,
        workspaceRoot,
      });
    }
    return Object.freeze({
      schema_version: 1,
      task_id: taskId,
      task_ids: Object.freeze([...opts.execution.task_ids]),
      allocation_kind: allocationKind,
      repository_root: await primaryWorktreeRoot(opts.ctx.resolvedProject.gitRoot),
      workspace_root: workspaceRoot,
      branch,
      base_ref: opts.execution.base_ref,
      base_sha: opts.execution.base_sha,
      identity,
      execution: opts.execution,
      lease,
    });
  } catch (error) {
    await releaseWorkspaceLease(lease).catch(() => null);
    throw error;
  }
}

export async function cleanupTaskWorkspace(
  allocation: WorkspaceAllocationContext,
  proof: { evidence_persisted?: boolean; closeout_completed?: boolean } = {},
): Promise<void> {
  await assertWorkspaceLeaseOwned(allocation.lease);
  if (allocation.allocation_kind === "direct_workspace") {
    const { stdout } = await execFileAsync("git", ["status", "--porcelain"], {
      cwd: allocation.workspace_root,
    });
    if (String(stdout).trim()) {
      throw new Error(`Workspace ${allocation.workspace_root} is dirty; cleanup refused.`);
    }
    const [workspaceHead, baseHead] = await Promise.all([
      gitRevParse(allocation.workspace_root, ["HEAD"]),
      gitRevParse(allocation.repository_root, [allocation.base_ref]),
    ]);
    if (workspaceHead !== allocation.base_sha) {
      if (!proof.evidence_persisted || !proof.closeout_completed) {
        throw new Error(
          `Workspace ${allocation.workspace_root} has implementation commits without persisted evidence and completed closeout; cleanup refused.`,
        );
      }
      const integrated = await execFileAsync(
        "git",
        ["merge-base", "--is-ancestor", workspaceHead, baseHead],
        { cwd: allocation.repository_root },
      )
        .then(() => true)
        .catch(() => false);
      if (!integrated) {
        throw new Error(
          `Workspace ${allocation.workspace_root} has unpublished commits; cleanup refused.`,
        );
      }
    }
    await execFileAsync("git", ["worktree", "remove", allocation.workspace_root], {
      cwd: allocation.repository_root,
    });
  }
  await releaseWorkspaceLease(allocation.lease);
}
