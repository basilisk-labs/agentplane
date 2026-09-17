import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  buildNativeQualityReviewIdentity,
  latestVerificationInputDigest,
} from "../shared/native-task-identity.js";

import { assertEvaluatorPacketCurrent } from "./evaluator-evidence-store.js";
import { resolveEvaluatorReviewTarget } from "./evaluator-qualification-review.js";
import { readEvaluatorFileDigest } from "./evaluator-review-artifacts.js";
import { evaluatorAcceptanceCriteria, isWithinRoot } from "./evaluator-review-shared.js";
import type { EvaluatorWorkOrder } from "./evaluator-work-order.js";

export async function assertFrozenEvaluatorArtifactsCurrent(opts: {
  gitRoot: string;
  workOrder: EvaluatorWorkOrder;
}): Promise<void> {
  if (opts.workOrder.packet) {
    await assertEvaluatorPacketCurrent({
      gitRoot: opts.gitRoot,
      taskId: opts.workOrder.task.id,
      manifestPath: opts.workOrder.packet.manifest_path,
      manifestSha256: opts.workOrder.packet.manifest_sha256,
      promptPath: opts.workOrder.packet.prompt_path,
      resultSchemaPath: opts.workOrder.packet.result_schema_path,
    });
  }
  for (const evidence of opts.workOrder.evidence) {
    if (opts.workOrder.schema_version === 2 && evidence.kind === "task_document") continue;
    const evidencePath = path.resolve(opts.gitRoot, evidence.path);
    if (
      !isWithinRoot(opts.gitRoot, evidencePath) ||
      (await readEvaluatorFileDigest(evidencePath)) !== evidence.sha256
    ) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Evaluator work order is stale because frozen evidence changed: ${evidence.path}`,
      });
    }
  }
}

export async function assertWorkOrderCurrent(opts: {
  ctx: CommandContext;
  task: TaskData;
  workOrder: EvaluatorWorkOrder;
}): Promise<void> {
  if (
    opts.workOrder.schema_version === 1 &&
    (opts.task.revision ?? null) !== opts.workOrder.task.revision
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order is stale because the task revision changed after preparation.",
    });
  }
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const execution = await resolveTaskExecutionContext({
    ctx: opts.ctx,
    tasks: [opts.task],
    primaryTaskId: opts.task.id,
  });
  const { evaluatedSha: currentSha } = await resolveEvaluatorReviewTarget({
    ctx: opts.ctx,
    task: opts.task,
    reason: "staleness",
    execution,
  });
  if (currentSha !== opts.workOrder.evaluated_sha) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order is stale because the evaluated SHA changed after preparation.",
    });
  }
  if (opts.workOrder.schema_version !== 2) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Legacy evaluator work orders cannot execute; prepare a canonical v2 work order.",
    });
  }
  const currentIdentity = buildNativeQualityReviewIdentity({
    task: opts.task,
    verification_input_digest: latestVerificationInputDigest(opts.task),
    acceptance_criteria: evaluatorAcceptanceCriteria(opts.task),
    implementation_sha: currentSha,
  });
  if (currentIdentity?.digest !== opts.workOrder.review_identity.digest) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order is stale because the native review identity changed.",
    });
  }
  await assertFrozenEvaluatorArtifactsCurrent({ gitRoot, workOrder: opts.workOrder });
}
