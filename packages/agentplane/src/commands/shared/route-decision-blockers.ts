import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import type { RouteBlocker } from "./route-oracle.js";
import { isTaskLocalOnlyAdvance } from "./task-local-freshness.js";
import type { CommandContext } from "./task-backend.js";
import { isRecord } from "../../shared/guards.js";
import { getHumanInputState } from "../task/human-input.js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasClosedPreMergeClosureMarker, parsePrMeta } from "./pr-meta.js";

function addBlocker(blockers: RouteBlocker[], code: string, summary: string): void {
  if (blockers.some((blocker) => blocker.code === code)) return;
  blockers.push({ code, summary });
}

async function isPrMetaOnlyTaskLocalAdvance(opts: {
  ctx: CommandContext;
  taskId: string;
  prFlow: PrFlowStatusReport | null;
}): Promise<boolean> {
  const branchHeadSha = opts.prFlow?.branch.headSha ?? null;
  const metaHeadSha = opts.prFlow?.branch.metaHeadSha ?? null;
  if (!branchHeadSha || !metaHeadSha || branchHeadSha === metaHeadSha) return false;
  return isTaskLocalOnlyAdvance({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    tasksPath: opts.ctx.config.paths.tasks_path,
    taskId: opts.taskId,
    fromRef: metaHeadSha,
    toRef: branchHeadSha,
  }).catch(() => false);
}

async function qualityReviewIsFreshForHead(opts: {
  ctx: CommandContext;
  task: TaskData;
  headSha: string | null;
}): Promise<boolean> {
  const review = opts.task.quality_review;
  if (review?.state !== "pass" || review.updated_by !== "EVALUATOR") return false;
  if (!review.evidence_refs.some((ref) => ref.endsWith("/quality-report.json"))) return false;
  if (review.findings.length === 0) return false;
  if (!opts.headSha || !review.evaluated_sha) return true;
  if (review.evaluated_sha === opts.headSha) return true;
  return isTaskLocalOnlyAdvance({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    tasksPath: opts.ctx.config.paths.tasks_path,
    taskId: opts.task.id,
    fromRef: review.evaluated_sha,
    toRef: opts.headSha,
  }).catch(() => false);
}

async function readLocalPreMergeState(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<{ open: boolean; closed: boolean }> {
  const metaPath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "pr",
    "meta.json",
  );
  try {
    const meta = parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
    return { open: meta.status === "OPEN", closed: hasClosedPreMergeClosureMarker(meta) };
  } catch {
    return { open: false, closed: false };
  }
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
  taskId: string;
  relPath: string;
}): boolean {
  const workflowDir = opts.workflowDir.replaceAll("\\", "/").replace(/\/+$/u, "");
  const relPath = opts.relPath.replaceAll("\\", "/");
  const prefix = `${workflowDir}/${opts.taskId}/`;
  return relPath === `${workflowDir}/${opts.taskId}` || relPath.startsWith(prefix);
}

export async function deriveBlockers(opts: {
  ctx: CommandContext;
  task: TaskData;
  resume: TaskResumeContext;
  workflowMode: string;
  prFlow: PrFlowStatusReport | null;
  batchOwnership: RouteBatchOwnership;
}): Promise<RouteBlocker[]> {
  const blockers: RouteBlocker[] = [];
  if (opts.task.status === "DONE") {
    if (opts.workflowMode !== "branch_pr") {
      const [staged, unstaged] = await Promise.all([
        opts.ctx.git.statusStagedPaths(),
        opts.ctx.git.statusUnstagedTrackedPaths(),
      ]);
      const dirtyTaskArtifacts = [...staged, ...unstaged].filter((relPath) =>
        isTaskArtifactPath({
          workflowDir: opts.ctx.config.paths.workflow_dir,
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
        taskId: opts.task.id,
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
    if (
      opts.task.verification?.state === "ok" &&
      String(opts.task.status).toUpperCase() === "DOING"
    ) {
      const review = opts.task.quality_review;
      const headSha = opts.prFlow?.branch.headSha ?? opts.resume.head_sha;
      if (review) {
        const reviewIsFresh = await qualityReviewIsFreshForHead({
          ctx: opts.ctx,
          task: opts.task,
          headSha,
        });
        if (reviewIsFresh) {
          const preMerge = await readLocalPreMergeState({ ctx: opts.ctx, taskId: opts.task.id });
          if ((opts.prFlow?.pr.state === "OPEN" || preMerge.open) && !preMerge.closed) {
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
