import path from "node:path";
import {
  TASK_CENTRIC_EXTENSION_KEY,
  TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { PersistedTaskMutationResult } from "../shared/task-mutation.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { prepareSuppliedPlan } from "./create-plan-input.js";

/** Staged canonical creation is atomic. Controller transfer later removes the legacy creation path. */
export async function createCanonicalTask(
  ctx: CommandContext,
  materialized: TaskData,
  suppliedPlan?: unknown,
): Promise<PersistedTaskMutationResult> {
  const proposal =
    suppliedPlan === undefined
      ? undefined
      : await prepareSuppliedPlan(ctx, materialized.id, suppliedPlan);
  const proposalDigest = proposal ? k.kernelDigest(proposal) : undefined;
  const runtime = await createKernelRuntime({
    command: ctx,
    task_id: materialized.id,
    transport: "manual",
    operation_id: `capture:${materialized.id}`,
  });
  const intent = {
    objective: materialized.title,
    context: materialized.description ?? materialized.title,
    ...(proposalDigest ? { plan_input_digest: proposalDigest } : {}),
  };
  const extensions = { ...materialized.extensions };
  delete extensions[TASK_CENTRIC_EXTENSION_KEY];
  delete extensions[TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY];
  const task = { ...materialized, extensions };
  const input = await runtime.input(
    { kind: "capture_intent", intent_digest: k.kernelDigest(intent) },
    `capture:${task.id}`,
    true,
  );
  const committed = requireKernelCommit(
    await runtime.lifecycle.create(
      task,
      intent,
      input,
      proposal && proposalDigest ? { [String(proposalDigest)]: proposal } : undefined,
    ),
  );
  const read = await runtime.adapter.read(task.id);
  if (read.kind !== "canonical") throw new Error("Canonical creation readback unavailable");
  return {
    task_id: task.id,
    revision: read.task.revision ?? null,
    backend_id: ctx.backendId,
    artifact_paths: ctx.taskBackend.capabilities.writes_task_readmes
      ? [path.join(ctx.config.paths.workflow_dir, task.id, "README.md")]
      : [],
    task: read.task,
    changed: !committed.replayed,
  };
}
