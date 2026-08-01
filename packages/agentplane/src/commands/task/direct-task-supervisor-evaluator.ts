import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { loadEvaluatorCatalog } from "../../evaluators/catalog.js";
import { CliError } from "../../shared/errors.js";
import { applyEvaluatorSgrReview } from "../evaluator/evaluator-review-apply.js";
import { executeEvaluatorSupervisorEpisode } from "../evaluator/evaluator-execute-supervisor.js";
import { createEvaluatorArtifactPreparationPort } from "../evaluator/evaluator-artifact-port.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import type { CommandCtx } from "../../cli/spec/spec.js";

export async function runAndApplyDirectTaskEvaluator(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task: TaskData;
  task_id: string;
  evaluator_id: string;
}): Promise<{
  execution: Awaited<ReturnType<typeof executeEvaluatorSupervisorEpisode>>;
  result: {
    evaluator_id: string;
    verdict: "pass" | "rework" | "blocked" | "human_review";
    result_path: string;
    report_path: string;
    receipt_path: string;
  };
}> {
  const evaluators = await loadEvaluatorCatalog({
    projectRoot: opts.command.resolvedProject.gitRoot,
    includeBuiltin: true,
  });
  const evaluator = evaluators.find((entry) => entry.id === opts.evaluator_id);
  if (!evaluator) {
    throw new CliError({
      code: "E_RUNTIME",
      message: `Direct task supervision requires evaluator ${opts.evaluator_id}.`,
    });
  }
  const execution = await executeEvaluatorSupervisorEpisode({
    ctx: opts.ctx,
    command: opts.command,
    task: opts.task,
    evaluator,
    task_id: opts.task_id,
    replacement: false,
    artifacts: createEvaluatorArtifactPreparationPort(opts.command),
  });
  const currentTask = await loadTaskFromContext({ ctx: opts.command, taskId: opts.task_id });
  const resultRef = path.relative(opts.command.resolvedProject.gitRoot, execution.result_path);
  const alreadyApplied = currentTask.quality_review?.evidence_refs?.includes(resultRef) ?? false;
  const applied = alreadyApplied
    ? {
        report_path: path.relative(opts.command.resolvedProject.gitRoot, execution.report_path),
        result_path: resultRef,
      }
    : await applyEvaluatorSgrReview({
        ctx: opts.command,
        task: currentTask,
        workOrderPath: execution.work_order_path,
        result: execution.result,
      });
  return {
    execution,
    result: {
      evaluator_id: execution.result.evaluator_id,
      verdict: execution.result.verdict,
      result_path: applied.result_path,
      report_path: applied.report_path,
      receipt_path: path.relative(
        opts.command.resolvedProject.gitRoot,
        path.join(path.dirname(execution.result_path), "evaluator-episode.json"),
      ),
    },
  };
}
