import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { successMessage } from "../../cli/output.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { applyTaskCollectionMutation } from "../shared/task-mutation.js";
import { backendUsesLocalTaskStore } from "../shared/task-backend.js";
import { isRecord } from "../../shared/guards.js";
import { CliError } from "../../shared/errors.js";
import type { TaskData } from "../../backends/task-backend.js";
import { cmdTaskNormalize } from "../task/normalize.js";
import { buildLocallySyncedTask } from "../task/hosted-merge-sync/builders.js";
import {
  readPrMetaIfPresent,
  resolveLocalMergedPrMeta,
} from "../task/hosted-merge-sync/pr-meta.js";
import type { LocalBranchPrSyncCandidate } from "../task/hosted-merge-sync/model.js";

export type ReleaseTasksReconcileParsed = {
  taskIds: string[];
  quiet: boolean;
};

export const releaseTasksReconcileSpec: CommandSpec<ReleaseTasksReconcileParsed> = {
  id: ["release", "tasks", "reconcile"],
  group: "Release",
  summary: "Reconcile release-blocking branch_pr task closure metadata.",
  options: [
    {
      kind: "string",
      name: "task-id",
      valueHint: "<task-id>",
      repeatable: true,
      description: "Repeatable. Limit reconciliation to explicit release-blocking task ids.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    {
      cmd: "agentplane release tasks reconcile --task-id 202605281707-6MNB2K",
      why: "Reconcile a known verified branch_pr task whose landed commit reached the base branch.",
    },
  ],
  validateRaw: (raw) => {
    const taskIds = (raw.opts["task-id"] as string[] | undefined) ?? [];
    for (const taskId of taskIds) {
      if (typeof taskId !== "string" || taskId.trim().length === 0) {
        throw usageError({
          spec: releaseTasksReconcileSpec,
          message: "Invalid value for --task-id: empty.",
        });
      }
    }
  },
  parse: (raw) => ({
    taskIds: ((raw.opts["task-id"] as string[] | undefined) ?? []).map((taskId) => taskId.trim()),
    quiet: raw.opts.quiet === true,
  }),
};

type IncludedBatchInfo = {
  base: string;
  branch: string;
  primaryTaskId: string;
};

type IncludedReconcileUnresolved = {
  taskId: string;
  reason: string;
};

function readIncludedBatchInfo(task: TaskData): IncludedBatchInfo | null {
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  if (batch?.role !== "included") return null;
  const primaryTaskId =
    typeof batch.primary_task_id === "string" ? batch.primary_task_id.trim() : "";
  const branch = typeof batch.branch === "string" ? batch.branch.trim() : "";
  const base = typeof batch.base === "string" ? batch.base.trim() : "";
  if (!primaryTaskId || !branch || !base) return null;
  return { base, branch, primaryTaskId };
}

function isIncludedClosureCandidate(task: TaskData): boolean {
  if (normalizeTaskStatus(task.status) !== "DOING") return false;
  if (task.verification?.state !== "ok") return false;
  if (task.commit?.hash?.trim()) return false;
  return readIncludedBatchInfo(task) !== null;
}

async function gitCommitExists(cwd: string, ref: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["cat-file", "-e", `${ref}^{commit}`], { cwd, env: process.env });
    return true;
  } catch {
    return false;
  }
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

async function resolvePrimaryLandedCommit(opts: {
  ctx: CommandContext;
  primaryTask: TaskData | null;
  primaryTaskId: string;
}): Promise<string> {
  const primaryMeta = await readPrMetaIfPresent({ ctx: opts.ctx, taskId: opts.primaryTaskId });
  const mergeCommit = resolveLocalMergedPrMeta(primaryMeta?.meta ?? null)?.mergeCommit ?? "";
  if (mergeCommit) return mergeCommit;
  const primaryCommit = opts.primaryTask?.commit?.hash?.trim() ?? "";
  if (primaryCommit) return primaryCommit;
  return primaryMeta?.meta.head_sha?.trim() ?? "";
}

async function reconcileIncludedBatchTasks(opts: {
  ctx: CommandContext;
  taskIds: readonly string[];
}): Promise<{
  synced: number;
  unresolved: IncludedReconcileUnresolved[];
}> {
  if (!backendUsesLocalTaskStore(opts.ctx) || opts.ctx.config.workflow_mode !== "branch_pr") {
    return { synced: 0, unresolved: [] };
  }

  const scoped = new Set(opts.taskIds.map((taskId) => taskId.trim()).filter(Boolean));
  let synced = 0;
  const unresolved: IncludedReconcileUnresolved[] = [];
  const cwd = opts.ctx.resolvedProject.gitRoot;

  await applyTaskCollectionMutation({
    ctx: opts.ctx,
    build: async (tasks) => {
      const byId = new Map(tasks.map((task) => [task.id, task] as const));
      const nextTasks = await Promise.all(
        tasks.map(async (task): Promise<TaskData> => {
          if (scoped.size > 0 && !scoped.has(task.id)) return task;
          if (!isIncludedClosureCandidate(task)) return task;

          const batch = readIncludedBatchInfo(task);
          if (!batch) return task;
          const commitHash = await resolvePrimaryLandedCommit({
            ctx: opts.ctx,
            primaryTask: byId.get(batch.primaryTaskId) ?? null,
            primaryTaskId: batch.primaryTaskId,
          });
          if (!commitHash) {
            unresolved.push({
              taskId: task.id,
              reason: `primary task ${batch.primaryTaskId} has no landed commit metadata`,
            });
            return task;
          }
          if (!(await gitCommitExists(cwd, commitHash))) {
            unresolved.push({
              taskId: task.id,
              reason: `landed commit ${commitHash.slice(0, 12)} is not present locally`,
            });
            return task;
          }
          if (!(await gitCommitExists(cwd, batch.base))) {
            unresolved.push({
              taskId: task.id,
              reason: `base ref ${batch.base} is not present locally`,
            });
            return task;
          }
          if (!(await gitIsAncestor({ cwd, ancestor: commitHash, descendant: batch.base }))) {
            unresolved.push({
              taskId: task.id,
              reason: `landed commit ${commitHash.slice(0, 12)} is not an ancestor of ${batch.base}`,
            });
            return task;
          }

          const candidate: LocalBranchPrSyncCandidate = {
            taskId: task.id,
            branch: batch.branch,
            base: batch.base,
            commitHash,
            verificationSource: "task",
            metaPath: null,
            meta: null,
            taskStatus: normalizeTaskStatus(task.status),
          };
          synced += 1;
          return buildLocallySyncedTask({ task, candidate });
        }),
      );
      return {
        result: null,
        tasksToWrite: nextTasks.filter(
          (task) => JSON.stringify(byId.get(task.id)) !== JSON.stringify(task),
        ),
      };
    },
  });

  return { synced, unresolved };
}

export function makeRunReleaseTasksReconcileHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: ReleaseTasksReconcileParsed): Promise<number> => {
    const commandCtx = await getCtx("release tasks reconcile");
    const normalizeCode = await cmdTaskNormalize({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      quiet: p.quiet,
      force: false,
      yes: false,
      syncHostedMerges: true,
      syncBranchPrState: true,
      taskIds: p.taskIds,
    });
    if (normalizeCode !== 0) return normalizeCode;

    const included = await reconcileIncludedBatchTasks({
      ctx: commandCtx,
      taskIds: p.taskIds,
    });
    if (included.unresolved.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: [
          "Release task reconciliation could not close included batch task metadata.",
          ...included.unresolved.map((entry) => `- ${entry.taskId}: ${entry.reason}`),
        ].join("\n"),
      });
    }
    if (!p.quiet) {
      process.stdout.write(
        `${successMessage(
          "reconciled release tasks",
          undefined,
          `included_batch_tasks=${included.synced}`,
        )}\n`,
      );
    }
    return 0;
  };
}
