import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import { resolveQualityReviewTargetSha } from "./quality-review-target.js";
import type { CommandContext } from "./task-backend.js";
import { hasAcceptedVerificationRecord } from "./task-verification-records.js";
import type { VerificationRecordAssessment } from "./task-verification-records.js";

function hostedCloseVerificationTarget(
  task: TaskData,
  prFlow: PrFlowStatusReport | null,
): string | null {
  const evaluatedSha = task.quality_review?.evaluated_sha?.trim() ?? "";
  return task.status === "DONE" &&
    task.quality_review?.state === "pass" &&
    prFlow?.pr.state === "MERGED" &&
    prFlow.closeTail.state === "recorded_on_base" &&
    /^[0-9a-f]{40,64}$/u.test(evaluatedSha)
    ? evaluatedSha
    : null;
}

export function qualityReworkHasNewVerification(task: TaskData): boolean {
  const reviewUpdatedAt = task.quality_review?.updated_at;
  const verificationUpdatedAt = task.verification?.updated_at;
  if (
    task.quality_review?.state !== "rework" ||
    task.verification?.state !== "ok" ||
    !reviewUpdatedAt ||
    !verificationUpdatedAt
  ) {
    return false;
  }
  const reviewTime = Date.parse(reviewUpdatedAt);
  const verificationTime = Date.parse(verificationUpdatedAt);
  return (
    Number.isFinite(reviewTime) &&
    Number.isFinite(verificationTime) &&
    verificationTime > reviewTime
  );
}

export function verificationReworkHasNewImplementation(task: TaskData): boolean {
  const verificationUpdatedAt = task.verification?.updated_at;
  const currentCommit = task.commit?.hash?.trim() ?? "";
  if (task.verification?.state !== "needs_rework" || !verificationUpdatedAt || !currentCommit) {
    return false;
  }
  const verificationTime = Date.parse(verificationUpdatedAt);
  if (!Number.isFinite(verificationTime)) return false;
  return (task.events ?? []).some((event) => {
    if (event.type !== "status" || event.to !== "DOING" || event.commit?.trim() !== currentCommit) {
      return false;
    }
    const eventTime = Date.parse(event.at);
    return Number.isFinite(eventTime) && eventTime > verificationTime;
  });
}

export async function hasAcceptedVerificationForCurrentImplementation(opts: {
  ctx: CommandContext;
  task: TaskData;
  resume: TaskResumeContext;
  prFlow: PrFlowStatusReport | null;
  batchOwnership: RouteBatchOwnership;
  onAssessment?: (assessment: VerificationRecordAssessment) => void;
}): Promise<boolean> {
  const taskIds =
    opts.batchOwnership.role === "none" ? [opts.task.id] : opts.batchOwnership.allTaskIds;
  const finalizedEvaluatedSha = hostedCloseVerificationTarget(opts.task, opts.prFlow);
  const liveBranchHead = opts.prFlow?.branch.headSha?.trim() ?? null;
  const headSha =
    (liveBranchHead ??
      finalizedEvaluatedSha ??
      opts.resume.head_sha ??
      (typeof opts.task.commit?.hash === "string" ? opts.task.commit.hash.trim() : "")) ||
    null;
  if (!headSha) return false;
  const evaluatedSha =
    (liveBranchHead ? null : finalizedEvaluatedSha) ??
    (await resolveQualityReviewTargetSha({
      gitRoot: opts.ctx.resolvedProject.gitRoot,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      taskId: opts.task.id,
      taskIds,
      lifecycleTaskIds: taskIds,
      headSha,
      previousEvaluatedSha:
        opts.task.quality_review?.evaluated_sha ??
        (typeof opts.task.commit?.hash === "string" ? opts.task.commit.hash : null),
      workflowMode: "branch_pr",
    }).catch(() => null));
  const taskRoot = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.task.id,
  );
  const requireConcreteCheckDetails =
    opts.task.status === "DONE" || Boolean(opts.task.commit?.hash?.trim());
  const recordOptions: Parameters<typeof hasAcceptedVerificationRecord>[0] = {
    taskRoot,
    task: opts.task,
    evaluatedSha,
    targetContext: {
      gitRoot: opts.ctx.resolvedProject.gitRoot,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      taskIds,
      workflowMode: "branch_pr",
    },
    snapshotRef:
      liveBranchHead ??
      (opts.prFlow?.pr.state === "MERGED" ? opts.prFlow.pr.headSha : null) ??
      opts.resume.head_sha ??
      null,
    requireConcreteCheckDetails,
  };
  if (opts.onAssessment) recordOptions.onAssessment = opts.onAssessment;
  return await hasAcceptedVerificationRecord(recordOptions).catch(() => false);
}
