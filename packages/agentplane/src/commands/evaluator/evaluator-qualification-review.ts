import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { normalizeBranchPrBatchIncludedTaskIds } from "../pr/internal/sync-batch-ownership.js";
import { resolveQualityReviewTargetSha } from "../shared/quality-review-target.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  isQualificationTask,
  readCurrentQualificationPacket,
  type QualificationPacket,
} from "../task/qualification-packet.js";

export type ResolvedEvaluatorReviewTarget = {
  evaluatedSha: string | null;
  qualificationPacket: { path: string; packet: QualificationPacket } | null;
};

export async function resolveEvaluatorReviewTarget(opts: {
  ctx: CommandContext;
  task: TaskData;
  reason: "preparation" | "staleness";
}): Promise<ResolvedEvaluatorReviewTarget> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const workflowDir = opts.ctx.config.paths.workflow_dir;
  const qualificationPacket = await readCurrentQualificationPacket({
    gitRoot,
    workflowDir,
    task: opts.task,
  });
  if (isQualificationTask(opts.task) && !qualificationPacket) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        opts.reason === "preparation"
          ? "Qualification review requires a current SHA-bound qualification packet created by task verification."
          : "Evaluator work order is stale because the qualification packet is missing or invalid.",
    });
  }
  const evaluatedSha =
    qualificationPacket?.packet.reviewed_sha ??
    (await resolveQualityReviewTargetSha({
      gitRoot,
      workflowDir,
      taskId: opts.task.id,
      taskIds: [opts.task.id, ...normalizeBranchPrBatchIncludedTaskIds(opts.task, opts.task.id)],
      previousEvaluatedSha: opts.task.quality_review?.evaluated_sha ?? null,
    }));
  return { evaluatedSha, qualificationPacket };
}
