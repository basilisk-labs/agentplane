import path from "node:path";
import { readFile } from "node:fs/promises";
import { validateAgentWorkOrderV2, type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { createEvaluatorArtifactPreparationPort } from "../evaluator/evaluator-artifact-port.js";
import { authorizeCompletedNativeReviewPreparation } from "./kernel-completed-native-review.js";
import { externalAgentExchangeDigest } from "./external-agent-exchange.js";

function evaluatorInput(opts: {
  work_order: AgentWorkOrderV2;
  git_root: string;
  work_order_path: string;
  digest: string;
}): AgentWorkOrderV2 {
  const relative = path.relative(opts.git_root, opts.work_order_path).replaceAll("\\", "/");
  return validateAgentWorkOrderV2({
    ...opts.work_order,
    required_inputs: [
      ...opts.work_order.required_inputs,
      {
        id: "evaluator-work-order",
        kind: "source_artifact",
        description: "Frozen evaluator diff, checks, policy, and acceptance evidence.",
        path: relative,
        digest: opts.digest,
        required: true,
      },
    ],
  });
}

export async function prepareEvaluatorInput(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  work_order: AgentWorkOrderV2;
}): Promise<{ work_order: AgentWorkOrderV2; evaluator_work_order_ref: string }> {
  const task = await opts.command.taskBackend.getTask(opts.task_id);
  if (!task) throw new Error("Native evaluator task is unavailable");
  const nativePermit = await authorizeCompletedNativeReviewPreparation(
    opts.command,
    task,
    opts.work_order,
  );
  const packet = await createEvaluatorArtifactPreparationPort(opts.command).prepare({
    nativePermit,
    ctx: opts.ctx,
    taskId: opts.task_id,
    evaluatorId: "recovery-context",
    provenance: "evaluator_supplied",
  });
  const prepared = packet.prepared;
  const serialized = await readFile(prepared.work_order_path, "utf8");
  return {
    work_order: evaluatorInput({
      work_order: opts.work_order,
      git_root: packet.git_root,
      work_order_path: prepared.work_order_path,
      digest: externalAgentExchangeDigest(serialized),
    }),
    evaluator_work_order_ref: prepared.work_order_path,
  };
}
