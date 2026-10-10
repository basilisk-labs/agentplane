import { gitIsAncestor } from "@agentplaneorg/core/git";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { hasValidRecordDigest, parseVerificationInput } from "./task-verification-record-parser.js";
import { qualityReviewReworkIsFreshForHead } from "./quality-review-retirement.js";
import path from "node:path";

import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
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

export function qualityReviewRequiresImplementationRework(task: TaskData): boolean {
  return (
    !qualityReviewPredatesTaskDocument(task) &&
    (task.quality_review?.state === "rework" ||
      (task.quality_review?.state === "blocked" &&
        task.quality_review.recovery_reason !== "deterministic_evidence_gap"))
  );
}

export function qualityReviewPredatesTaskDocument(task: TaskData): boolean {
  const reviewUpdatedAt = Date.parse(task.quality_review?.updated_at ?? "");
  const documentUpdatedAt = Date.parse(task.doc_updated_at ?? "");
  const aggregate = taskCentricAggregateFromExtensions(task.extensions);
  const hasLaterExternalClarification =
    aggregate?.plan_amendments?.some((amendment) => {
      const amendmentAt = Date.parse(amendment.created_at);
      return (
        amendment.actor_id.startsWith("external:") &&
        amendment.refinement.operations.includes("clarify") &&
        Number.isFinite(amendmentAt) &&
        amendmentAt > reviewUpdatedAt &&
        amendmentAt <= documentUpdatedAt
      );
    }) === true;
  return (
    Number.isFinite(reviewUpdatedAt) &&
    Number.isFinite(documentUpdatedAt) &&
    documentUpdatedAt > reviewUpdatedAt &&
    hasLaterExternalClarification
  );
}

export function qualityReworkHasNewVerification(task: TaskData): boolean {
  const reviewUpdatedAt = task.quality_review?.updated_at;
  const verificationUpdatedAt = task.verification?.updated_at;
  if (
    !qualityReviewRequiresImplementationRework(task) ||
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
  if (task.verification?.state !== "needs_rework" || !verificationUpdatedAt) {
    return false;
  }
  const verificationTime = Date.parse(verificationUpdatedAt);
  if (!Number.isFinite(verificationTime)) return false;
  return (task.events ?? []).some((event) => {
    const eventCommit = event.commit?.trim() ?? "";
    if (
      event.type !== "status" ||
      event.to !== "DOING" ||
      !eventCommit ||
      (!currentCommit && event.author !== "SUPERVISOR") ||
      (currentCommit && eventCommit !== currentCommit)
    ) {
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
  execution?: TaskExecutionContext;
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
      ...(opts.execution ? { execution: opts.execution } : {}),
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

/** Completed kernel tasks can need source repair without reopening their lifecycle. */
export async function completedBranchRequiresImplementationRework(
  opts: Parameters<typeof hasAcceptedVerificationForCurrentImplementation>[0] & {
    workflowMode: "direct" | "branch_pr";
  },
): Promise<boolean> {
  if (
    opts.workflowMode !== "branch_pr" ||
    opts.task.status !== "DONE" ||
    (opts.prFlow?.pr.state === "MERGED" && opts.prFlow.closeTail.state === "recorded_on_base")
  )
    return false;
  if (opts.task.verification?.state === "needs_rework") {
    const assessments: VerificationRecordAssessment[] = [];
    // A failed record remains failure evidence. Only the existing authenticated
    // input comparison can establish that different source now needs checking.
    // Missing or invalid evidence never substitutes for implementation work.
    await hasAcceptedVerificationForCurrentImplementation({
      ...opts,
      onAssessment: (assessment) => {
        assessments.push(assessment);
      },
    });
    const assessment = assessments.at(-1);
    const head = opts.prFlow?.branch.headSha ?? opts.resume.head_sha;
    if (
      assessment?.reason !== "verification_implementation_changed" ||
      !assessment.recordPath ||
      !head
    )
      return true;
    try {
      const record = JSON.parse(
        await readStableRegularTextNoFollow(assessment.recordPath, "failed verification record"),
      ) as Record<string, unknown>;
      const input = parseVerificationInput(record.input);
      if (!hasValidRecordDigest(record) || input?.digest !== assessment.recordedInputDigest)
        return true;
      const failedTarget =
        input.schema_version === 5
          ? input.checked_input.implementation.target_sha
          : input.implementation.target_sha;
      // A different checkout or rewritten failure target cannot establish a newer
      // implementation. Keep such ambiguous recovery on the bounded semantic path.
      if (!(await gitIsAncestor(opts.ctx.resolvedProject.gitRoot, failedTarget, head))) return true;
    } catch {
      return true;
    }
  }
  return (
    qualityReviewRequiresImplementationRework(opts.task) &&
    (await qualityReviewReworkIsFreshForHead({
      ...opts,
      headSha: opts.prFlow?.branch.headSha ?? opts.resume.head_sha,
    }))
  );
}
