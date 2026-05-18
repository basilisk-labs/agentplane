import type { TaskPrMeta } from "@agentplaneorg/core/schemas";
import {
  DEFAULT_TASK_BRANCH_PREFIX,
  resolveBaseBranch,
  parseTaskIdFromBranch,
} from "@agentplaneorg/core/git";

import type { TaskData } from "../../../backends/task-backend.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import type { CommandContext } from "../../shared/task-backend.js";
import { backendUsesLocalTaskStore } from "../../shared/task-backend.js";
import { readPrMetaIfPresent } from "./pr-meta.js";
import type { LocalBranchPrSyncCandidate, LocalDoneBranchPrDrift } from "./model.js";

function hasTaskVerificationForLocalSync(opts: {
  task: TaskData;
  meta: TaskPrMeta | null;
}): "task" | "pr" | null {
  if (opts.task.verification?.state === "ok") return "task";
  if (opts.meta?.verify?.status === "pass") return "pr";
  return null;
}

async function gitRefExists(opts: { cwd: string; ref: string }): Promise<boolean> {
  try {
    await execFileAsync("git", ["cat-file", "-e", `${opts.ref}^{commit}`], {
      cwd: opts.cwd,
      env: process.env,
    });
    return true;
  } catch {
    return false;
  }
}

type BranchPrGitProbe = {
  refExists(ref: string): Promise<boolean>;
  resolveBase(meta: TaskPrMeta | null): Promise<string | null>;
  isAncestor(ancestor: string, descendant: string): Promise<boolean>;
};

function createBranchPrGitProbe(ctx: CommandContext): BranchPrGitProbe {
  const cwd = ctx.resolvedProject.gitRoot;
  const refExistsCache = new Map<string, Promise<boolean>>();
  const baseCache = new Map<string, Promise<string | null>>();
  const ancestryCache = new Map<string, Promise<boolean>>();

  return {
    async refExists(ref: string): Promise<boolean> {
      const cached = refExistsCache.get(ref) ?? gitRefExists({ cwd, ref });
      refExistsCache.set(ref, cached);
      return await cached;
    },
    async resolveBase(meta: TaskPrMeta | null): Promise<string | null> {
      const fromMeta = meta?.base?.trim() ?? "";
      const key = fromMeta || "__resolved__";
      const cached = baseCache.get(key) ?? resolveSyncBaseBranch({ ctx, meta });
      baseCache.set(key, cached);
      return await cached;
    },
    async isAncestor(ancestor: string, descendant: string): Promise<boolean> {
      const key = `${ancestor}\u0000${descendant}`;
      const cached = ancestryCache.get(key) ?? gitIsAncestor({ cwd, ancestor, descendant });
      ancestryCache.set(key, cached);
      return await cached;
    },
  };
}

async function gitIsAncestor(opts: {
  cwd: string;
  ancestor: string;
  descendant: string;
}): Promise<boolean> {
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", opts.ancestor, opts.descendant], {
      cwd: opts.cwd,
      env: process.env,
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    throw err;
  }
}

async function resolveSyncBaseBranch(opts: {
  ctx: CommandContext;
  meta: TaskPrMeta | null;
}): Promise<string | null> {
  const fromMeta = opts.meta?.base?.trim() ?? "";
  if (fromMeta.length > 0) return fromMeta;
  return await resolveBaseBranch({
    cwd: opts.ctx.resolvedProject.gitRoot,
    rootOverride: opts.ctx.resolvedProject.gitRoot,
    cliBaseOpt: null,
    mode: opts.ctx.config.workflow_mode,
  });
}

function isStackedBranchAliasDoneTask(opts: {
  task: TaskData;
  branch: string;
  taskPrefix: string;
}): boolean {
  const branchTaskId = parseTaskIdFromBranch(opts.taskPrefix, opts.branch);
  if (!branchTaskId || branchTaskId === opts.task.id) return false;
  const summary = opts.task.result_summary?.trim().toLowerCase() ?? "";
  if (!summary.includes("stacked branch_pr merge rooted at")) return false;
  return summary.includes(branchTaskId.toLowerCase());
}

export async function findLocallyShippedBranchPrTasks(opts: {
  ctx: CommandContext;
  tasks: TaskData[];
}): Promise<LocalBranchPrSyncCandidate[]> {
  if (!backendUsesLocalTaskStore(opts.ctx) || opts.ctx.config.workflow_mode !== "branch_pr") {
    return [];
  }

  const matches: LocalBranchPrSyncCandidate[] = [];
  const git = createBranchPrGitProbe(opts.ctx);
  for (const task of opts.tasks) {
    const currentStatus = normalizeTaskStatus(task.status);
    const prMetaRecord = await readPrMetaIfPresent({ ctx: opts.ctx, taskId: task.id });
    const meta = prMetaRecord?.meta ?? null;
    const branch = meta?.branch?.trim() ?? "";
    if (!branch) continue;

    const verificationSource = hasTaskVerificationForLocalSync({ task, meta });
    const metaNeedsSync = Boolean(meta && meta.status !== "MERGED");
    const taskNeedsSync = currentStatus !== "DONE" && verificationSource !== null;
    if (!taskNeedsSync && !metaNeedsSync) continue;
    if (!taskNeedsSync && currentStatus !== "DONE") continue;

    const commitHash =
      task.commit?.hash?.trim() ?? meta?.merge_commit?.trim() ?? meta?.head_sha?.trim() ?? "";
    if (!commitHash) continue;
    if (!(await git.refExists(commitHash))) {
      continue;
    }

    const base = await git.resolveBase(meta);
    if (!base) continue;
    if (!(await git.refExists(base))) continue;
    if (!(await git.isAncestor(commitHash, base))) {
      continue;
    }

    matches.push({
      taskId: task.id,
      branch,
      base,
      commitHash,
      verificationSource,
      metaPath: prMetaRecord?.metaPath ?? null,
      meta,
      taskStatus: currentStatus,
    });
  }

  return matches;
}

export async function findDoneBranchPrTasksWithOpenPrArtifacts(opts: {
  ctx: CommandContext;
  tasks: TaskData[];
}): Promise<LocalDoneBranchPrDrift[]> {
  if (!backendUsesLocalTaskStore(opts.ctx) || opts.ctx.config.workflow_mode !== "branch_pr") {
    return [];
  }

  const matches: LocalDoneBranchPrDrift[] = [];
  const git = createBranchPrGitProbe(opts.ctx);
  for (const task of opts.tasks) {
    const currentStatus = normalizeTaskStatus(task.status);
    if (currentStatus !== "DONE") continue;

    const prMetaRecord = await readPrMetaIfPresent({ ctx: opts.ctx, taskId: task.id });
    const meta = prMetaRecord?.meta ?? null;
    if (!meta || meta.status === "MERGED") continue;

    const branch = meta.branch?.trim() ?? "";
    if (!branch) continue;
    const branchStillExists =
      (await git.refExists(branch)) || (await git.refExists(`origin/${branch}`));
    if (!branchStillExists) continue;
    if (
      isStackedBranchAliasDoneTask({
        task,
        branch,
        taskPrefix: opts.ctx.config.branch?.task_prefix ?? DEFAULT_TASK_BRANCH_PREFIX,
      })
    ) {
      continue;
    }

    const commitHash = task.commit?.hash?.trim() ?? "";
    if (!commitHash) continue;

    const base = await git.resolveBase(meta);
    if (!base) continue;

    matches.push({
      taskId: task.id,
      branch,
      base,
      commitHash,
    });
  }

  return matches;
}
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";
