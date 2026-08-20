import path from "node:path";

import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { EvaluatorPacketArtifact } from "./evaluator-evidence-store.js";
import type {
  EvaluatorEvidenceKind,
  FrozenEvaluatorEvidence,
} from "./evaluator-review-artifacts.js";
import { uniqueStrings } from "./evaluator-review-shared.js";
import {
  EVALUATOR_OPINION_FILE,
  EVALUATOR_PROMPT_FILE,
  QUALITY_REPORT_FILE,
} from "./evaluator-quality-artifacts.js";
import type { EvaluatorWorkOrder } from "./evaluator-work-order.js";

const EVALUATOR_WORK_ORDER_FILE = "evaluator-work-order.json";
const EVALUATOR_RESULT_FILE = "evaluator-result.json";

export async function assertTaskReviewWorkspaceClean(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<void> {
  const [staged, unstaged] = await Promise.all([
    opts.ctx.git.statusStagedPaths(),
    opts.ctx.git.statusUnstagedTrackedPaths(),
  ]);
  const taskPrefix = `${opts.ctx.config.paths.workflow_dir.replaceAll(/\/+$/gu, "")}/${opts.taskId}/`;
  const blocking = [...staged, ...unstaged].filter(
    (entry) => !entry.replaceAll("\\", "/").startsWith(taskPrefix),
  );
  if (blocking.length === 0) return;
  throw new CliError({
    code: "E_VALIDATION",
    message:
      "Evaluator preparation requires committed implementation evidence; tracked paths outside the current task artifact subtree are dirty.",
    context: { task_id: opts.taskId, blocking_paths: uniqueStrings(blocking) },
  });
}

export function frozenObjectEvidence(opts: {
  id: string;
  kind: EvaluatorEvidenceKind;
  artifact: EvaluatorPacketArtifact;
  required: boolean;
}): FrozenEvaluatorEvidence {
  return {
    id: opts.id,
    kind: opts.kind,
    path: opts.artifact.path,
    sha256: opts.artifact.sha256 as `sha256:${string}`,
    required: opts.required,
  };
}

export function reportPaths(reviewDir: string) {
  return {
    work_order_path: path.join(reviewDir, EVALUATOR_WORK_ORDER_FILE),
    report_path: path.join(reviewDir, QUALITY_REPORT_FILE),
    prompt_path: path.join(reviewDir, EVALUATOR_PROMPT_FILE),
    opinion_path: path.join(reviewDir, EVALUATOR_OPINION_FILE),
    result_path: path.join(reviewDir, EVALUATOR_RESULT_FILE),
  };
}

export function resolveEvaluatorPromptPath(opts: {
  gitRoot: string;
  reviewDir: string;
  workOrder: EvaluatorWorkOrder;
}): string {
  return opts.workOrder.packet
    ? path.resolve(opts.gitRoot, opts.workOrder.packet.prompt_path)
    : reportPaths(opts.reviewDir).prompt_path;
}
