import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import type { RouteCleanupProbe } from "./route-decision-types.js";
import type { RouteBlocker, RouteBlockerCode } from "./route-oracle.js";
import { isTaskSetLocalOnlyAdvance } from "./task-local-freshness.js";
import type { CommandContext } from "./task-backend.js";
import { isRecord } from "../../shared/guards.js";
import { getHumanInputState } from "../task/human-input.js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parsePrMeta, type PrMeta } from "./pr-meta.js";
import { hasAcceptedQualityReviewProvenance } from "../task/quality-review-gate.js";
import { assessPreMergeClosureFreshness } from "../task/hosted-close-premerge.js";
import {
  summarizeTaskWorktreeChanges,
  type TaskWorktreeCleanliness,
} from "./task-worktree-cleanliness.js";

function addBlocker(blockers: RouteBlocker[], code: RouteBlockerCode, summary: string): void {
  if (blockers.some((blocker) => blocker.code === code)) return;
  blockers.push({ code, summary });
}

function addPublicationBlockers(blockers: RouteBlocker[], prFlow: PrFlowStatusReport | null): void {
  if (prFlow?.pr.state !== "OPEN") return;
  switch (prFlow.publication?.state) {
    case "unpublished": {
      addBlocker(
        blockers,
        "pr_head_unpublished",
        "local task branch head is not published to its upstream tracking branch",
      );
      break;
    }
    case "hosted_mismatch": {
      addBlocker(
        blockers,
        "hosted_pr_head_mismatch",
        "hosted PR head differs from the local task branch head",
      );
      break;
    }
    case "unavailable": {
      addBlocker(
        blockers,
        "provider_pr_unavailable",
        `GitHub PR head could not be confirmed: ${prFlow.publication.reason}`,
      );
      break;
    }
    default: {
      break;
    }
  }
}

function addCloseTailProviderBlocker(
  blockers: RouteBlocker[],
  prFlow: PrFlowStatusReport | null,
): void {
  if (prFlow?.closeTail.state !== "unavailable") return;
  addBlocker(
    blockers,
    "provider_pr_unavailable",
    `GitHub close-tail PR state could not be confirmed: ${prFlow.closeTail.reason}`,
  );
}

async function isPrMetaOnlyTaskLocalAdvance(opts: {
  ctx: CommandContext;
  taskIds: readonly string[];
  prFlow: PrFlowStatusReport | null;
}): Promise<boolean> {
  const branchHeadSha = opts.prFlow?.branch.headSha ?? null;
  const metaHeadSha = opts.prFlow?.branch.metaHeadSha ?? null;
  if (!branchHeadSha || !metaHeadSha || branchHeadSha === metaHeadSha) return false;
  return isTaskSetLocalOnlyAdvance({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    tasksPath: opts.ctx.config.paths.tasks_path,
    taskIds: opts.taskIds,
    fromRef: metaHeadSha,
    toRef: branchHeadSha,
  }).catch(() => false);
}

async function qualityReviewIsFreshForHead(opts: {
  ctx: CommandContext;
  task: TaskData;
  headSha: string | null;
  batchOwnership: RouteBatchOwnership;
  expectedState: "pass" | "rework";
}): Promise<boolean> {
  const review = opts.task.quality_review;
  if (review?.state !== opts.expectedState || !hasAcceptedQualityReviewProvenance(review)) {
    return false;
  }
  if (!review.evidence_refs.some((ref) => ref.endsWith("/quality-report.json"))) return false;
  if (review.findings.length === 0) return false;
  if (!opts.headSha || !review.evaluated_sha) return true;
  if (review.evaluated_sha === opts.headSha) return true;
  const taskIds =
    opts.batchOwnership.role === "none" ? [opts.task.id] : opts.batchOwnership.allTaskIds;
  return isTaskSetLocalOnlyAdvance({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    tasksPath: opts.ctx.config.paths.tasks_path,
    taskIds,
    fromRef: review.evaluated_sha,
    toRef: opts.headSha,
  }).catch(() => false);
}

async function readLocalPrMeta(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<PrMeta | null> {
  const metaPath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "pr",
    "meta.json",
  );
  try {
    return parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
  } catch {
    return null;
  }
}

async function readLocalPreMergeState(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<{ open: boolean }> {
  const meta = await readLocalPrMeta(opts);
  return { open: meta?.status === "OPEN" };
}

function hasStructuredIncludedBatchMetadata(task: TaskData): boolean {
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  return batch?.role === "included";
}

function hasIncludedBatchProse(task: TaskData): boolean {
  const haystack = [
    task.title,
    task.description,
    typeof task.doc === "string" ? task.doc : "",
    ...(Array.isArray(task.comments) ? task.comments.map((comment) => comment.body) : []),
  ]
    .join("\n")
    .toLowerCase();
  return (
    haystack.includes("included in batch") ||
    haystack.includes("included in the batch") ||
    haystack.includes("included task from merged") ||
    haystack.includes("closed included batch task") ||
    haystack.includes("batch worktree") ||
    haystack.includes("included tasks in batch")
  );
}

function isTaskArtifactPath(opts: {
  workflowDir: string;
  tasksPath: string;
  taskId?: string;
  relPath: string;
}): boolean {
  const workflowDir = opts.workflowDir.replaceAll("\\", "/").replace(/\/+$/u, "");
  const tasksPath = opts.tasksPath.replaceAll("\\", "/").replace(/\/+$/u, "");
  const relPath = opts.relPath.replaceAll("\\", "/");
  const workflowPath = opts.taskId ? `${workflowDir}/${opts.taskId}` : workflowDir;
  return (
    relPath === workflowPath || relPath.startsWith(`${workflowPath}/`) || relPath === tasksPath
  );
}

export function addTaskWorktreeCleanlinessBlocker(opts: {
  blockers: RouteBlocker[];
  cleanliness: TaskWorktreeCleanliness;
  workflowDir: string;
  tasksPath: string;
  requireAllChanges: boolean;
}): void {
  if (opts.cleanliness.state === "unavailable") {
    addBlocker(
      opts.blockers,
      "task_worktree_state_unavailable",
      `task worktree state could not be inspected: ${opts.cleanliness.reason}`,
    );
    return;
  }
  if (opts.cleanliness.state !== "dirty") return;
  const blockingPaths = opts.requireAllChanges
    ? opts.cleanliness.changedPaths
    : opts.cleanliness.changedPaths.filter(
        (relPath) =>
          !isTaskArtifactPath({
            workflowDir: opts.workflowDir,
            tasksPath: opts.tasksPath,
            relPath,
          }),
      );
  if (blockingPaths.length === 0) return;
  addBlocker(
    opts.blockers,
    "task_worktree_dirty",
    `task worktree contains uncommitted changes (${summarizeTaskWorktreeChanges(blockingPaths)})`,
  );
}

export function addVerificationRequiredBlocker(opts: {
  blockers: RouteBlocker[];
  task: TaskData;
}): void {
  const status = String(opts.task.status).toUpperCase();
  if ((status !== "DOING" && status !== "DONE") || opts.task.verification?.state === "ok") {
    return;
  }
  addBlocker(
    opts.blockers,
    "verification_required",
    "the committed task implementation does not have a passing verification record",
  );
}

export async function deriveBlockers(opts: {
  ctx: CommandContext;
  task: TaskData;
  resume: TaskResumeContext;
  workflowMode: string;
  prFlow: PrFlowStatusReport | null;
  batchOwnership: RouteBatchOwnership;
  cleanupProbe: RouteCleanupProbe;
  taskWorktreeCleanliness: TaskWorktreeCleanliness;
}): Promise<RouteBlocker[]> {
  const blockers: RouteBlocker[] = [];
  const normalizedTaskStatus = String(opts.task.status).toUpperCase();
  if (
    opts.workflowMode === "branch_pr" &&
    (normalizedTaskStatus === "DOING" || normalizedTaskStatus === "DONE")
  ) {
    addTaskWorktreeCleanlinessBlocker({
      blockers,
      cleanliness: opts.taskWorktreeCleanliness,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      tasksPath: opts.ctx.config.paths.tasks_path,
      requireAllChanges: normalizedTaskStatus === "DONE",
    });
  }
  if (opts.workflowMode === "branch_pr" && opts.task.status === "DONE") {
    addPublicationBlockers(blockers, opts.prFlow);
    addCloseTailProviderBlocker(blockers, opts.prFlow);
  }
  if (
    opts.workflowMode === "branch_pr" &&
    opts.task.status === "DONE" &&
    opts.prFlow?.pr.state === "OPEN" &&
    opts.prFlow.pr.prNumber !== null &&
    opts.prFlow.branch.name &&
    opts.prFlow.branch.headSha
  ) {
    const meta = await readLocalPrMeta({ ctx: opts.ctx, taskId: opts.task.id });
    const freshness = meta
      ? await assessPreMergeClosureFreshness({
          gitRoot: opts.ctx.resolvedProject.gitRoot,
          task: opts.task,
          meta,
          branch: opts.prFlow.branch.name,
          prNumber: opts.prFlow.pr.prNumber,
          branchHeadSha: opts.prFlow.branch.headSha,
        })
      : { fresh: false as const, reason: "PR metadata is unavailable" };
    if (!freshness.fresh) {
      addBlocker(
        blockers,
        "pre_merge_closure_stale",
        `pre-merge closure cannot authorize integration: ${freshness.reason}`,
      );
    }
  }
  if (opts.task.status === "DONE") {
    if (opts.workflowMode === "branch_pr" && opts.task.quality_review?.state === "rework") {
      addBlocker(
        blockers,
        "implementation_rework_required",
        "latest EVALUATOR result requires implementation rework before integration",
      );
    }
    if (opts.workflowMode === "branch_pr" && opts.cleanupProbe.state === "blocked") {
      addBlocker(
        blockers,
        "cleanup_blocked",
        `targeted cleanup proof is blocked: ${opts.cleanupProbe.reasons.join("; ")}`,
      );
    }
    if (opts.workflowMode !== "branch_pr") {
      const [staged, unstaged] = await Promise.all([
        opts.ctx.git.statusStagedPaths(),
        opts.ctx.git.statusUnstagedTrackedPaths(),
      ]);
      const dirtyTaskArtifacts = [...staged, ...unstaged].filter((relPath) =>
        isTaskArtifactPath({
          workflowDir: opts.ctx.config.paths.workflow_dir,
          tasksPath: opts.ctx.config.paths.tasks_path,
          taskId: opts.task.id,
          relPath,
        }),
      );
      if (dirtyTaskArtifacts.length > 0) {
        addBlocker(
          blockers,
          "dirty_task_artifacts",
          `tracked task artifacts still need a cleanup commit (${dirtyTaskArtifacts.slice(0, 3).join(", ")}${dirtyTaskArtifacts.length > 3 ? ` +${dirtyTaskArtifacts.length - 3} more` : ""})`,
        );
      }
    }
    return blockers;
  }
  const humanInput = getHumanInputState(opts.task);
  if (humanInput.openQuestion) {
    addBlocker(
      blockers,
      "human_input_required",
      `waiting on user answer to: ${humanInput.openQuestion.question}`,
    );
  }
  if (opts.task.plan_approval?.state !== "approved") {
    addBlocker(blockers, "plan_not_approved", "task plan is not approved");
  }
  if (opts.workflowMode === "branch_pr") {
    const taskIsDoing = String(opts.task.status).toUpperCase() === "DOING";
    let implementationReworkRequired =
      taskIsDoing && opts.task.verification?.state === "needs_rework";
    if (
      !implementationReworkRequired &&
      taskIsDoing &&
      opts.task.verification?.state === "ok" &&
      opts.task.quality_review?.state === "rework"
    ) {
      implementationReworkRequired = await qualityReviewIsFreshForHead({
        ctx: opts.ctx,
        task: opts.task,
        headSha: opts.prFlow?.branch.headSha ?? opts.resume.head_sha,
        batchOwnership: opts.batchOwnership,
        expectedState: "rework",
      });
    }
    if (implementationReworkRequired) {
      addBlocker(
        blockers,
        "implementation_rework_required",
        "implementation rework is required before PR publication or integration",
      );
    }
    if (
      opts.batchOwnership.role !== "included" &&
      !opts.resume.pr_branch &&
      !opts.prFlow?.branch.name
    ) {
      addBlocker(blockers, "missing_pr_branch", "branch_pr task has no recorded PR branch");
    }
    if (opts.resume.branch === opts.resume.base_branch) {
      addBlocker(blockers, "on_base_checkout", "current checkout appears to be the base branch");
    }
    if (opts.prFlow?.pr.state === "not_found") {
      addBlocker(blockers, "remote_pr_missing", "task branch is not linked to a remote PR");
    }
    if (opts.prFlow?.branch.name && !opts.prFlow.branch.headSha) {
      addBlocker(
        blockers,
        "branch_head_missing",
        "recorded task branch cannot be resolved locally",
      );
    }
    if (
      opts.prFlow?.branch.headSha &&
      opts.prFlow.branch.metaHeadSha &&
      opts.prFlow.branch.headSha !== opts.prFlow.branch.metaHeadSha &&
      !(await isPrMetaOnlyTaskLocalAdvance({
        ctx: opts.ctx,
        taskIds:
          opts.batchOwnership.role === "none" ? [opts.task.id] : opts.batchOwnership.allTaskIds,
        prFlow: opts.prFlow,
      }))
    ) {
      addBlocker(blockers, "pr_meta_stale", "PR metadata head differs from local branch head");
    }
    if (opts.prFlow?.closeTail.state === "open") {
      addBlocker(blockers, "close_tail_open", "hosted close-tail PR is still open");
    }
    if (opts.prFlow?.closeTail.state === "not_found") {
      addBlocker(
        blockers,
        "close_tail_missing",
        "implementation PR is merged but close-tail is missing",
      );
    }
    if (opts.task.verification?.state === "ok" && taskIsDoing && !implementationReworkRequired) {
      const review = opts.task.quality_review;
      const headSha = opts.prFlow?.branch.headSha ?? opts.resume.head_sha;
      if (review) {
        const reviewIsFresh = await qualityReviewIsFreshForHead({
          ctx: opts.ctx,
          task: opts.task,
          headSha,
          batchOwnership: opts.batchOwnership,
          expectedState: "pass",
        });
        if (reviewIsFresh) {
          const preMerge = await readLocalPreMergeState({ ctx: opts.ctx, taskId: opts.task.id });
          if (opts.prFlow?.pr.state === "OPEN" || preMerge.open) {
            addBlocker(
              blockers,
              "pre_merge_closure_missing",
              "open branch_pr task requires pre-merge closure on the task branch before integration",
            );
          }
        } else {
          addBlocker(
            blockers,
            "quality_review_stale",
            "EVALUATOR quality review is missing required evidence or does not cover the current implementation head",
          );
        }
      } else {
        addBlocker(
          blockers,
          "quality_review_missing",
          "verified branch_pr task requires EVALUATOR quality review before PR publication or integration",
        );
      }
    }
    addPublicationBlockers(blockers, opts.prFlow);
    addCloseTailProviderBlocker(blockers, opts.prFlow);
    if (
      opts.batchOwnership.role === "none" &&
      opts.task.verification?.state === "ok" &&
      String(opts.task.status).toUpperCase() === "DOING" &&
      !opts.task.commit?.hash &&
      !hasStructuredIncludedBatchMetadata(opts.task) &&
      hasIncludedBatchProse(opts.task)
    ) {
      addBlocker(
        blockers,
        "missing_included_batch_metadata",
        "task text mentions included batch closure but structured branch_pr batch metadata is missing",
      );
    }
  }
  if (opts.resume.runner.next_action === "wait") {
    addBlocker(blockers, "runner_alive", "latest runner still appears alive");
  }
  return blockers;
}
