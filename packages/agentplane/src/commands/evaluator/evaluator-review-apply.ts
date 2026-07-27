import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { projectEvaluatorQualityReportToContext } from "../../context/evaluator-projection.js";
import type { EvaluatorSgrResult } from "../../evaluators/sgr-result.js";
import { CliError } from "../../shared/errors.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import type { CommandContext } from "../shared/task-backend.js";
import { getHumanInputState, setHumanInputState } from "../task/human-input.js";

import {
  renderOpinionMarkdown,
  EVALUATOR_FOLLOW_UP_FILE,
  type EvaluatorQualityReport,
} from "./evaluator-quality-artifacts.js";
import {
  assertResultEvidenceIsFrozen,
  assertWorkOrderCurrent,
  evaluatorSummary,
  isWithinRoot,
  qualityState,
  readWorkOrder,
  relative,
  reportPaths,
  uniqueStrings,
  validateStrictEvaluatorResult,
  type EvaluatorWorkOrder,
  type HumanEvaluatorReviewInput,
} from "./evaluator-review-usecase.js";

async function persistReview(opts: {
  ctx: CommandContext;
  task: TaskData;
  workOrder: EvaluatorWorkOrder;
  workOrderPath: string;
  report: EvaluatorQualityReport;
  resultPayload: EvaluatorSgrResult | null;
}): Promise<{
  report_path: string;
  prompt_path: string;
  opinion_path: string;
  result_path: string | null;
}> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const reviewDir = path.dirname(opts.workOrderPath);
  const paths = reportPaths(reviewDir);
  if (!isWithinRoot(gitRoot, reviewDir)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order path is outside the project root.",
    });
  }
  if (opts.resultPayload !== null) {
    await writeFile(paths.result_path, `${JSON.stringify(opts.resultPayload, null, 2)}\n`, "utf8");
  }
  const followUp = evaluatorFollowUp({
    workOrder: opts.workOrder,
    result: opts.resultPayload,
    resultPath: relative(gitRoot, paths.result_path),
  });
  const followUpPath = path.join(reviewDir, EVALUATOR_FOLLOW_UP_FILE);
  if (followUp !== null) {
    await writeFile(followUpPath, `${JSON.stringify(followUp, null, 2)}\n`, "utf8");
  }
  await writeFile(paths.report_path, `${JSON.stringify(opts.report, null, 2)}\n`, "utf8");
  await writeFile(paths.opinion_path, renderOpinionMarkdown(opts.report), "utf8");
  const contextReportPath = await projectEvaluatorQualityReportToContext({
    root: gitRoot,
    task: opts.task,
    report: opts.report,
    reportPath: relative(gitRoot, paths.report_path),
  });
  const evidenceRefs = uniqueStrings([
    relative(gitRoot, opts.workOrderPath),
    relative(gitRoot, paths.report_path),
    relative(gitRoot, paths.prompt_path),
    relative(gitRoot, paths.opinion_path),
    ...(opts.resultPayload === null ? [] : [relative(gitRoot, paths.result_path)]),
    ...(followUp === null ? [] : [relative(gitRoot, followUpPath)]),
    ...opts.workOrder.evidence.map((entry) => entry.path),
    ...opts.report.evidence_refs,
    ...(contextReportPath ? [contextReportPath] : []),
  ]);
  const humanInput =
    opts.resultPayload?.verdict === "human_review"
      ? setHumanInputState(opts.task, {
          ...getHumanInputState(opts.task),
          openQuestion: {
            id: `evaluator-${opts.workOrder.work_order_id}`,
            question: opts.resultPayload.recovery_context!,
            askedAt: opts.report.generated_at,
            askedBy: "EVALUATOR",
            previousStatus: opts.task.status,
          },
        })
      : null;
  await applyTaskMutation({
    ctx: opts.ctx,
    taskId: opts.task.id,
    policyAction: "task_verify",
    phase: "verify",
    build: () => ({
      intents: setTaskFieldsIntent({
        quality_review: {
          state: opts.report.verdict,
          provenance: opts.report.provenance,
          updated_at: opts.report.generated_at,
          updated_by: opts.report.provenance === "human_supplied" ? "HUMAN" : "EVALUATOR",
          note: opts.report.summary,
          evaluated_sha: opts.report.evaluated_sha,
          blueprint_digest: opts.report.blueprint_digest,
          evidence_refs: evidenceRefs,
          findings: opts.report.findings,
        },
        ...(humanInput ? { extensions: humanInput } : {}),
      }),
    }),
  });
  return {
    report_path: relative(gitRoot, paths.report_path),
    prompt_path: relative(gitRoot, paths.prompt_path),
    opinion_path: relative(gitRoot, paths.opinion_path),
    result_path: opts.resultPayload === null ? null : relative(gitRoot, paths.result_path),
  };
}

function evaluatorFollowUp(opts: {
  workOrder: EvaluatorWorkOrder;
  result: EvaluatorSgrResult | null;
  resultPath: string;
}): Record<string, unknown> | null {
  if (!opts.result || opts.result.verdict === "pass") return null;
  const nextOwner = opts.result.verdict === "rework" ? "CODER" : "USER";
  const kind =
    opts.result.verdict === "rework" ? "evaluator_rework_work_order" : "evaluator_escalation";
  return {
    schema_version: 1,
    kind,
    source_work_order_id: opts.workOrder.work_order_id,
    task_id: opts.workOrder.task.id,
    verdict: opts.result.verdict,
    next_owner: nextOwner,
    instruction: opts.result.recovery_context,
    findings: opts.result.findings.map((finding) => ({
      id: finding.id,
      summary: finding.summary,
      evidence_refs: finding.evidence_refs,
    })),
    source_result: opts.resultPath,
  };
}

export async function applyEvaluatorSgrReview(opts: {
  ctx: CommandContext;
  task: TaskData;
  workOrderPath: string;
  result: unknown;
}): Promise<{ work_order: EvaluatorWorkOrder; report_path: string; result_path: string }> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const workOrderPath = path.resolve(gitRoot, opts.workOrderPath);
  if (!isWithinRoot(gitRoot, workOrderPath)) {
    throw new CliError({
      code: "E_USAGE",
      message: "Evaluator work order must be inside the project root.",
    });
  }
  const workOrder = readWorkOrder(JSON.parse(await readFile(workOrderPath, "utf8")));
  if (workOrder.task.id !== opts.task.id) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order task does not match the requested task.",
    });
  }
  const result = validateStrictEvaluatorResult(opts.result);
  if (result.evaluator_id !== workOrder.evaluator.id) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator result id does not match the prepared work order.",
    });
  }
  assertResultEvidenceIsFrozen({ workOrder, result });
  if (result.verdict === "human_review" && !result.recovery_context) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator human_review requires a bounded recovery_context question.",
    });
  }
  await assertWorkOrderCurrent({ ctx: opts.ctx, task: opts.task, workOrder });
  const at = new Date().toISOString();
  const report: EvaluatorQualityReport = {
    schema_version: 1,
    task_id: opts.task.id,
    evaluator_id: result.evaluator_id,
    evaluator_profile: workOrder.evaluator.profile,
    generated_at: at,
    provenance: "evaluator_supplied",
    verdict: qualityState(result.verdict),
    summary: evaluatorSummary(result),
    evaluated_sha: workOrder.evaluated_sha,
    blueprint_digest: workOrder.blueprint_digest,
    findings: result.findings.map((finding) => finding.summary),
    evidence_refs: uniqueStrings(
      result.findings.flatMap((finding) => finding.evidence_refs.map((entry) => entry.path)),
    ),
    missing_tests: result.missing_tests,
    hidden_assumptions: result.hidden_assumptions,
    residual_risks: result.recovery_context ? [result.recovery_context] : [],
  };
  const persisted = await persistReview({
    ctx: opts.ctx,
    task: opts.task,
    workOrder,
    workOrderPath,
    report,
    resultPayload: result,
  });
  return {
    work_order: workOrder,
    report_path: persisted.report_path,
    result_path: persisted.result_path!,
  };
}

export async function applyHumanEvaluatorReview(opts: {
  ctx: CommandContext;
  task: TaskData;
  workOrderPath: string;
  input: HumanEvaluatorReviewInput;
}): Promise<{ work_order: EvaluatorWorkOrder; report_path: string }> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const workOrderPath = path.resolve(gitRoot, opts.workOrderPath);
  const workOrder = readWorkOrder(JSON.parse(await readFile(workOrderPath, "utf8")));
  if (workOrder.task.id !== opts.task.id) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order task does not match the requested task.",
    });
  }
  await assertWorkOrderCurrent({ ctx: opts.ctx, task: opts.task, workOrder });
  const at = new Date().toISOString();
  const report: EvaluatorQualityReport = {
    schema_version: 1,
    task_id: opts.task.id,
    evaluator_id: workOrder.evaluator.id,
    evaluator_profile: workOrder.evaluator.profile,
    generated_at: at,
    provenance: "human_supplied",
    verdict: opts.input.verdict,
    summary: opts.input.summary,
    evaluated_sha: workOrder.evaluated_sha,
    blueprint_digest: workOrder.blueprint_digest,
    findings: opts.input.findings,
    evidence_refs: opts.input.evidence_refs,
    missing_tests: opts.input.missing_tests,
    hidden_assumptions: opts.input.hidden_assumptions,
    residual_risks: opts.input.residual_risks,
  };
  const persisted = await persistReview({
    ctx: opts.ctx,
    task: opts.task,
    workOrder,
    workOrderPath,
    report,
    resultPayload: null,
  });
  return { work_order: workOrder, report_path: persisted.report_path };
}
