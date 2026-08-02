import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import { resolveQualityReviewTargetSha } from "./quality-review-target.js";
import type { CommandContext } from "./task-backend.js";
import { hasAcceptedVerificationRecord } from "./task-verification-records.js";

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

export async function hasAcceptedVerificationForCurrentImplementation(opts: {
  ctx: CommandContext;
  task: TaskData;
  resume: TaskResumeContext;
  prFlow: PrFlowStatusReport | null;
  batchOwnership: RouteBatchOwnership;
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
  if (!evaluatedSha) return false;
  const taskRoot = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.task.id,
  );
  return await hasAcceptedVerificationRecord({
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
  }).catch(() => false);
}
