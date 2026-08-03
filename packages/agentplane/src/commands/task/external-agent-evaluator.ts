import { readFile } from "node:fs/promises";
import path from "node:path";

import type { AgentSemanticResult } from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import { applyEvaluatorSgrReview } from "../evaluator/evaluator-review-apply.js";
import { readWorkOrder } from "../evaluator/evaluator-review-usecase.js";
import { cmdCommit } from "../guard/impl/commit.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import type { ExternalAgentExchange } from "./external-agent-exchange.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";

function evidencePathMatches(exchange: ExternalAgentExchange, evidenceRef: string): boolean {
  if (!exchange.evaluator_work_order_ref) return false;
  return (
    path.resolve(exchange.checkout, evidenceRef) === path.resolve(exchange.evaluator_work_order_ref)
  );
}

export async function isExternalEvaluatorResultApplied(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
}): Promise<boolean> {
  const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id });
  return Boolean(
    task.quality_review?.updated_by === "EVALUATOR" &&
    task.quality_review.evidence_refs?.some((ref) => evidencePathMatches(opts.exchange, ref)),
  );
}

function hasChangedTaskArtifacts(statusLines: readonly string[], taskId: string): boolean {
  const prefix = `.agentplane/tasks/${taskId}/`;
  return statusLines.some((line) => line.slice(3).trim().replaceAll("\\", "/").startsWith(prefix));
}

export async function applyExternalEvaluatorResult(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  semantic: AgentSemanticResult;
}): Promise<void> {
  const review = opts.semantic.review;
  if (!review || !opts.exchange.evaluator_work_order_ref) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Issued EVALUATOR exchange is missing its typed review or frozen evidence.",
    });
  }
  const evaluatorWorkOrder = readWorkOrder(
    JSON.parse(await readFile(opts.exchange.evaluator_work_order_ref, "utf8")),
  );
  const evidence = evaluatorWorkOrder.evidence.find((entry) => entry.kind === "actual_diff");
  if (!evidence) throw new Error("External EVALUATOR work order has no frozen actual diff.");
  const findings = [
    ...opts.semantic.findings,
    ...review.residual_risks.map((risk) => `Residual risk: ${risk}`),
  ];
  const normalizedFindings = findings.length > 0 ? findings : [opts.semantic.summary];
  if (!(await isExternalEvaluatorResultApplied(opts))) {
    const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id });
    await applyEvaluatorSgrReview({
      ctx: opts.command,
      task,
      workOrderPath: opts.exchange.evaluator_work_order_ref,
      result: {
        schema_version: 1,
        kind: "evaluator_result",
        evaluator_id: evaluatorWorkOrder.evaluator.id,
        verdict: review.verdict,
        findings: normalizedFindings.map((summary, index) => ({
          id: `external-agent-finding-${String(index + 1)}`,
          severity: "medium",
          summary,
          broken_invariant:
            "External EVALUATOR review requires evidence-backed semantic judgement.",
          evidence_refs: [{ path: evidence.path }],
        })),
        missing_tests: review.missing_tests,
        hidden_assumptions: review.hidden_assumptions,
        ...(review.verdict === "pass"
          ? {}
          : { recovery_context: review.recovery_context ?? opts.semantic.summary }),
      },
    });
  }
  const status = await readDirectRepositoryStatus(opts.exchange.checkout);
  if (!hasChangedTaskArtifacts(status?.lines ?? [], opts.exchange.task_id)) return;
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record external evaluator result`,
    close: false,
    allow: [],
    autoAllow: false,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: false,
    quiet: true,
    closeUnstageOthers: false,
    closeCheckOnly: false,
  });
  if (exitCode !== 0) throw new Error(`External EVALUATOR evidence commit exited ${exitCode}.`);
}
