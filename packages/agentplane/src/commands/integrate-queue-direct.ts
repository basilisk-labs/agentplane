import path from "node:path";
import { gitCurrentBranch, gitDiffNames } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { loadTaskCommandContext } from "../runtime/task-execution-context/index.js";
import { CliError } from "../shared/errors.js";
import type { CommandContext } from "./shared/task-backend.js";
import { gitRevParse } from "./shared/git-ops.js";
import {
  claimNextQueuedEntry,
  markQueueEntry,
  readIntegrationQueue,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
  type IntegrationQueueEntry,
} from "./pr/integrate/queue-state.js";
import { rejectIfQueuedEntryIsStale } from "./integrate-queue-lane.js";
import { assessLocalVerificationRecords } from "./shared/task-verification-records.js";

export const DEFAULT_QUEUE_POLL_INTERVAL_MS = 30_000;
export const DEFAULT_QUEUE_WAIT_TIMEOUT_MS = 10 * 60_000;

function nonEmptyRef(value: string | undefined, fallback: string): string {
  const normalized = value?.trim();
  if (normalized) return normalized;
  return fallback;
}

export async function prepareDirectQueueCandidate(opts: {
  commandCtx: CommandContext;
  taskId: string;
  branch?: string;
  base?: string;
}) {
  const taskCommand = await loadTaskCommandContext({
    ctx: opts.commandCtx,
    taskIds: [opts.taskId],
  });
  const { execution, primary_task: task } = taskCommand;
  if (execution.selected_mode !== "direct") return null;
  if (String(task.status).toUpperCase() !== "DONE") {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Direct integration candidate ${task.id} must be DONE before enqueue.`,
    });
  }
  if (task.verification?.state !== "ok" || task.quality_review?.state !== "pass") {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Direct integration candidate ${task.id} requires current verification and passing EVALUATOR review.`,
    });
  }
  const branch = nonEmptyRef(opts.branch, `agentplane/workspace/${task.id}`);
  const base = nonEmptyRef(opts.base, execution.base_ref);
  const [branchHeadSha, currentBaseSha] = await Promise.all([
    gitRevParse(opts.commandCtx.resolvedProject.gitRoot, [branch]),
    gitRevParse(opts.commandCtx.resolvedProject.gitRoot, [base]),
  ]);
  const verificationAssessment = await assessLocalVerificationRecords({
    taskRoot: path.join(
      taskCommand.command.resolvedProject.gitRoot,
      taskCommand.command.config.paths.workflow_dir,
      task.id,
    ),
    task,
    evaluatedSha: branchHeadSha,
    targetContext: {
      gitRoot: taskCommand.command.resolvedProject.gitRoot,
      workflowDir: taskCommand.command.config.paths.workflow_dir,
      taskIds: execution.task_ids,
      execution,
    },
  });
  if (!verificationAssessment.accepted || !verificationAssessment.currentInputDigest) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Direct integration candidate ${task.id} has no current v4 verification identity (${verificationAssessment.reason}).`,
      context: {
        reason_code: verificationAssessment.reason,
        task_id: task.id,
      },
    });
  }
  if (currentBaseSha !== execution.base_sha) {
    const baseChangedPaths = await gitDiffNames(
      opts.commandCtx.resolvedProject.gitRoot,
      execution.base_sha,
      currentBaseSha,
    );
    const candidateChangedPaths = await gitDiffNames(
      opts.commandCtx.resolvedProject.gitRoot,
      execution.base_sha,
      branchHeadSha,
    );
    if (baseChangedPaths.some((changedPath) => candidateChangedPaths.includes(changedPath))) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Direct integration candidate ${task.id} conflicts with base changes after ${execution.base_sha}.`,
      });
    }
  }
  return {
    task,
    branch,
    base,
    branchHeadSha,
    baseSha: execution.base_sha,
    implementationCommit: branchHeadSha,
    verifiedInputDigest: verificationAssessment.currentInputDigest,
    workspaceId: `task:${task.id}:base:${execution.base_sha}`,
    changedPaths: await gitDiffNames(
      opts.commandCtx.resolvedProject.gitRoot,
      execution.base_sha,
      branchHeadSha,
    ),
  };
}

export async function integrateDirectQueueEntry(opts: {
  commandCtx: CommandContext;
  entry: IntegrationQueueEntry;
  dryRun: boolean;
}): Promise<number> {
  const gitRoot = opts.commandCtx.resolvedProject.gitRoot;
  const currentBranch = await gitCurrentBranch(gitRoot);
  if (currentBranch !== opts.entry.base) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Direct integration must run from base checkout ${opts.entry.base}; current=${currentBranch}.`,
    });
  }
  if (opts.dryRun) return 0;
  try {
    await execFileAsync("git", ["merge", "--no-ff", "--no-edit", opts.entry.branch], {
      cwd: gitRoot,
    });
  } catch (error) {
    await execFileAsync("git", ["merge", "--abort"], { cwd: gitRoot }).catch(() => null);
    throw new CliError({
      code: "E_VALIDATION",
      message: `Direct integration candidate ${opts.entry.task_id} requires conflict rework; the merge was aborted.`,
      context: {
        reason_code: "semantic_conflict_rework_required",
        task_id: opts.entry.task_id,
        cause: error instanceof Error ? error.message : String(error),
      },
    });
  }
  if (opts.entry.changed_paths.length > 0) {
    const { stdout } = await execFileAsync(
      "git",
      ["diff", "--name-only", opts.entry.head_sha, "HEAD", "--", ...opts.entry.changed_paths],
      { cwd: gitRoot },
    );
    if (stdout.trim()) {
      throw new CliError({
        code: "E_GIT_RACE",
        message: `Direct integration changed verified candidate content for ${opts.entry.task_id}: ${stdout.trim()}`,
        context: {
          reason_code: "verification_implementation_changed",
          task_id: opts.entry.task_id,
          verified_input_digest: opts.entry.verified_input_digest ?? null,
        },
      });
    }
  }
  return 0;
}

export async function claimFreshIntegrationQueueEntry(opts: {
  gitRoot: string;
  worker: string;
  leaseMs: number | null;
}) {
  return await withIntegrationQueueMutex(opts.gitRoot, async () => {
    const queue = await readIntegrationQueue(opts.gitRoot);
    const next = claimNextQueuedEntry(queue, {
      worker: opts.worker,
      ...(opts.leaseMs === null ? {} : { leaseMs: opts.leaseMs }),
    });
    if (!next.entry) {
      await writeIntegrationQueue(opts.gitRoot, next.state);
      return next;
    }
    const stale = await rejectIfQueuedEntryIsStale({ gitRoot: opts.gitRoot, entry: next.entry });
    if (stale) {
      await writeIntegrationQueue(
        opts.gitRoot,
        markQueueEntry(next.state, stale.task_id, "rework", stale.reason),
      );
      throw new CliError({ code: "E_VALIDATION", message: stale.reason ?? "queued entry stale" });
    }
    await writeIntegrationQueue(opts.gitRoot, next.state);
    return next;
  });
}
