import path from "node:path";
import { validateSupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import { readExternalAgentExchange } from "../task/external-agent-exchange.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "./supervisor-execution-episode.js";
import { resolveCommandGitCommonDir, type CommandContext } from "./task-backend.js";
import { hasAcceptedQualityReviewProvenance } from "../task/quality-review-gate.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import { resolveQualityReviewTargetSha } from "./quality-review-target.js";

export async function qualityReviewIsFreshForHead(opts: {
  ctx: CommandContext;
  task: TaskData;
  headSha: string | null;
  batchOwnership: RouteBatchOwnership;
  expectedState: "pass" | "rework" | "blocked";
  workflowMode: "direct" | "branch_pr";
}): Promise<boolean> {
  const review = opts.task.quality_review;
  if (review?.state !== opts.expectedState || !hasAcceptedQualityReviewProvenance(review)) {
    return false;
  }
  if (!review.evidence_refs.some((ref) => ref.endsWith("/quality-report.json"))) return false;
  if (review.findings.length === 0) return false;
  if (await qualityReviewHasRetiredExchange(opts)) return false;
  if (!opts.headSha) return true;
  if (!review.evaluated_sha) return false;
  if (review.evaluated_sha === opts.headSha) return true;
  const taskIds =
    opts.batchOwnership.role === "none" ? [opts.task.id] : opts.batchOwnership.allTaskIds;
  const expectedSha = await resolveQualityReviewTargetSha({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.task.id,
    taskIds,
    headSha: opts.headSha,
    previousEvaluatedSha: review.evaluated_sha,
    workflowMode: opts.workflowMode,
  }).catch(() => null);
  return expectedSha === review.evaluated_sha;
}

/** Historical verdicts remain immutable, but a retired exchange cannot authorize closeout. */
export async function qualityReviewHasRetiredExchange(opts: {
  ctx: CommandContext;
  task: TaskData;
}): Promise<boolean> {
  const refs = opts.task.quality_review?.evidence_refs ?? [];
  // External evaluator issuance always binds this frozen work-order artifact.
  // Legacy reviews without that reference cannot match an external exchange.
  if (!refs.some((ref) => path.basename(ref) === "evaluator-work-order.json")) return false;
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.ctx.resolvedProject.gitRoot,
    common_git_dir: await resolveCommandGitCommonDir(opts.ctx),
    task_id: opts.task.id,
  });
  const raw = await createSupervisorEpisodeStore(journalPath).read();
  if (!raw) return false;
  const journal = validateSupervisorExecutionEpisodeJournal(raw);
  for (const operation of journal.operations) {
    if (operation.role !== "EVALUATOR" || !operation.work_order_ref) continue;
    const exchange = await readExternalAgentExchange(
      path.join(path.dirname(operation.work_order_ref), "exchange.json"),
    );
    if (
      exchange?.task_id === opts.task.id &&
      exchange.role === "EVALUATOR" &&
      exchange.purpose === "quality_review" &&
      exchange.status === "retired" &&
      exchange.evaluator_work_order_ref &&
      refs.some(
        (ref) =>
          path.resolve(exchange.checkout, ref) ===
          path.resolve(exchange.checkout, exchange.evaluator_work_order_ref!),
      )
    )
      return true;
  }
  return false;
}
