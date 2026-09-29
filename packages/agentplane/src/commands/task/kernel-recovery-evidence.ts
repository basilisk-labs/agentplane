import path from "node:path";
import { z } from "zod";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { isRecord } from "../../shared/guards.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const recoverySchema = z.strictObject({
  kind: z.literal("operator_work_item_resume"),
  task_id: z.string(),
  work_item_id: z.string(),
  state_digest: digest,
  actor: z.literal("USER"),
  note: z.string().trim().min(1),
  semantic_stop: z.strictObject({ work_order_id: digest, result_digest: digest }),
});

async function readStop(kernelRoot: string, record: KernelRecord, orderId: string) {
  const mutationId = `semantic-stop:${orderId}`;
  const mutation = record.aggregate.mutation_receipts[mutationId];
  if (!mutation || !/^sha256:[a-f0-9]{64}$/u.test(orderId))
    throw new Error("Recorded semantic stop is missing");
  const directory = path.join(kernelRoot, "exchanges", record.aggregate.id, orderId.slice(7));
  const resultPath = path.join(directory, "received-result.json");
  const result = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
    JSON.parse(await readStableRegularTextNoFollow(resultPath, "semantic stop result")),
  );
  const saved: unknown = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "semantic-stop-command.json"),
      "semantic stop command",
    ),
  );
  const binding = result.canonical_binding;
  if (
    !isRecord(saved) ||
    !isRecord(saved.command) ||
    k.kernelDigest(saved.command) !== mutation.command_digest ||
    saved.command.kind !== "transition_work_item" ||
    saved.command.action !== "block" ||
    binding?.phase !== "implementation" ||
    result.status === "completed" ||
    result.work_order_id !== orderId ||
    saved.command.task_id !== binding.task_id ||
    saved.command.work_item_id !== binding.work_item_id ||
    saved.command.claim_id !== binding.claim_id ||
    binding.task_id !== record.aggregate.id ||
    binding.repository_identity !== record.repository_identity ||
    binding.plan_digest !== record.aggregate.current_plan?.digest ||
    binding.plan_revision !== record.aggregate.current_plan.revision ||
    binding.contract_digest !==
      record.aggregate.work_items[binding.work_item_id]?.definition.contract_digest
  )
    throw new Error("Semantic stop evidence does not match the canonical Task");
  return { result, binding, resultPath, mutation };
}

export async function captureKernelSemanticStop(
  kernelRoot: string,
  record: KernelRecord,
  workItemId: string,
) {
  const item = record.aggregate.work_items[workItemId];
  const stops = Object.entries(record.aggregate.mutation_receipts)
    .filter(([id]) => /^semantic-stop:sha256:[a-f0-9]{64}$/u.test(id))
    .toSorted((a, b) => b[1].after_revision - a[1].after_revision);
  for (const [id] of stops) {
    const orderId = id.slice("semantic-stop:".length);
    const stop = await readStop(kernelRoot, record, orderId);
    if (stop.binding.work_item_id !== workItemId || stop.binding.attempt !== item?.attempt)
      continue;
    if (item.state !== "BLOCKED" || stop.binding.claim_id !== item.claim_id)
      throw new Error("Semantic stop claim is stale");
    return { work_order_id: orderId, result_digest: k.kernelDigest(stop.result) };
  }
  throw new Error("Recovery requires a retained semantic stop for this WorkItem attempt");
}

export async function kernelRecoveryInputs(
  order: AgentWorkOrderV2,
  directory: string,
  record?: KernelRecord,
): Promise<AgentWorkOrderV2["required_inputs"]> {
  const binding = order.canonical_binding;
  if (!record || binding?.phase !== "implementation" || binding.attempt < 2) return [];
  const kernelRoot = path.resolve(directory, "../../..");
  for (const [id, mutation] of Object.entries(record.aggregate.mutation_receipts)) {
    if (!/^work-item-resume:sha256:[a-f0-9]{64}$/u.test(id)) continue;
    const receiptDigest = id.slice("work-item-resume:".length);
    const receiptPath = path.join(
      kernelRoot,
      "recoveries",
      binding.task_id,
      `${receiptDigest.slice(7)}.json`,
    );
    const raw: unknown = JSON.parse(
      await readStableRegularTextNoFollow(receiptPath, "operator recovery"),
    );
    const parsed = recoverySchema.safeParse(raw);
    if (!parsed.success || k.kernelDigest(raw) !== receiptDigest)
      throw new Error("Invalid operator recovery evidence");
    const receipt = parsed.data;
    if (receipt.task_id !== binding.task_id || receipt.work_item_id !== binding.work_item_id)
      continue;
    const stop = await readStop(kernelRoot, record, receipt.semantic_stop.work_order_id);
    if (stop.binding.attempt !== binding.attempt - 1) continue;
    if (
      stop.binding.work_item_id !== binding.work_item_id ||
      stop.binding.repository_identity !== binding.repository_identity ||
      stop.binding.plan_digest !== binding.plan_digest ||
      stop.binding.plan_revision !== binding.plan_revision ||
      stop.binding.contract_digest !== binding.contract_digest ||
      k.kernelDigest(stop.result) !== receipt.semantic_stop.result_digest ||
      stop.mutation.after_revision > mutation.before_revision ||
      order.task.revision === null ||
      mutation.after_revision >= order.task.revision
    )
      throw new Error("Operator recovery does not bind the preceding semantic attempt");
    return [
      {
        id: `semantic-stop:${receipt.semantic_stop.work_order_id}`,
        kind: "source_artifact",
        path: stop.resultPath,
        digest: receipt.semantic_stop.result_digest,
        description: "Retained stop reason from the preceding attempt. Digest uses canonical JSON.",
        required: true,
      },
      {
        id,
        kind: "source_artifact",
        path: receiptPath,
        digest: receiptDigest,
        description:
          "Native-recorded USER resolution of the preceding semantic stop. Digest uses canonical JSON.",
        required: true,
      },
    ];
  }
  return [];
}
