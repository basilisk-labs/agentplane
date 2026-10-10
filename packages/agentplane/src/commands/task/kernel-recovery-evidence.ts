import path from "node:path";
import { readdir } from "node:fs/promises";
import { z } from "zod";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import {
  kernelValidationSchema,
  type KernelRecord,
} from "../../adapters/task-backend/kernel-record.js";
import { isRecord } from "../../shared/guards.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const recoveryFields = {
  kind: z.literal("operator_work_item_resume"),
  task_id: z.string(),
  work_item_id: z.string(),
  state_digest: digest,
  actor: z.literal("USER"),
  note: z.string().trim().min(1),
};
const nativeEvidenceSchema = z.strictObject({
  task_id: z.string(),
  work_item_id: z.string(),
  attempt: z.number().int().positive(),
  contract_digest: digest,
  repository_fingerprint: digest,
  result_digest: digest,
  review_digest: z.null(),
  native_evidence_digest: digest,
  status: z.literal("BLOCKED"),
  checks: z.unknown(),
  repository_evidence: z.unknown(),
});
const nativeStopSchema = z.strictObject({ work_order_id: digest, validation_digest: digest });
const transitionSchema = z.strictObject({
  kind: z.literal("transition_work_item"),
  action: z.literal("rework"),
  task_id: z.string(),
  work_item_id: z.string(),
  claim_id: z.string(),
  expected_task_revision: z.number().int().nonnegative(),
  expected_state_fingerprint: digest,
});
const recoverySchema = z.union([
  z.strictObject({
    ...recoveryFields,
    semantic_stop: z.strictObject({ work_order_id: digest, result_digest: digest }),
  }),
  z.strictObject({
    ...recoveryFields,
    native_validation: nativeStopSchema,
    transition: transitionSchema,
  }),
]);

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

async function readNativeStop(kernelRoot: string, record: KernelRecord, orderId: string) {
  if (!/^sha256:[a-f0-9]{64}$/u.test(orderId))
    throw new Error("Invalid native validation WorkOrder");
  const mutationId = `validation:${orderId}`;
  const mutation = record.aggregate.mutation_receipts[mutationId];
  if (!mutation) throw new Error("Recorded native validation is missing");
  const directory = path.join(kernelRoot, "exchanges", record.aggregate.id, orderId.slice(7));
  const read = async (name: string): Promise<unknown> =>
    JSON.parse(
      await readStableRegularTextNoFollow(path.join(directory, name), "native validation recovery"),
    ) as unknown;
  const saved = await read("validation-command.json");
  if (
    !isRecord(saved) ||
    !isRecord(saved.command) ||
    k.kernelDigest(saved.command) !== mutation.command_digest ||
    saved.command.kind !== "record_work_item_validation" ||
    saved.command.task_id !== record.aggregate.id ||
    saved.command.expected_task_revision !== mutation.before_revision ||
    mutation.after_revision !== mutation.before_revision + 1
  )
    throw new Error("Native validation command does not match its applied receipt");
  const validation = kernelValidationSchema.parse(saved.command.validation);
  const result = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(await read("received-result.json"));
  const binding = result.canonical_binding;
  const evidence = nativeEvidenceSchema.parse(await read("validation.json"));
  if (
    binding?.phase !== "implementation" ||
    result.status !== "completed" ||
    result.work_order_id !== orderId ||
    validation.status !== "BLOCKED" ||
    validation.identity.check_id !== "canonical-native-checks" ||
    validation.identity.implementation_identity !== k.kernelDigest(result) ||
    binding.task_id !== record.aggregate.id ||
    binding.repository_identity !== record.repository_identity ||
    binding.plan_digest !== record.aggregate.current_plan?.digest ||
    binding.plan_revision !== record.aggregate.current_plan.revision ||
    saved.command.work_item_id !== binding.work_item_id ||
    binding.contract_digest !==
      record.aggregate.work_items[binding.work_item_id]?.definition.contract_digest ||
    !isRecord(evidence) ||
    evidence.task_id !== binding.task_id ||
    evidence.work_item_id !== binding.work_item_id ||
    evidence.attempt !== binding.attempt ||
    evidence.contract_digest !== binding.contract_digest ||
    evidence.result_digest !== k.kernelDigest(result) ||
    evidence.repository_fingerprint !== saved.command.expected_state_fingerprint ||
    evidence.status !== "BLOCKED" ||
    evidence.review_digest !== null ||
    !isRecord(evidence.checks) ||
    evidence.checks.status !== "unsupported" ||
    validation.evidence_digests.length !== 1 ||
    evidence.native_evidence_digest !== validation.evidence_digests[0]
  )
    throw new Error("Native validation evidence does not match the canonical Task");
  // Native check bytes are anchored by the applied validation command, not by the recovery caller.
  let retainedNative = false;
  for (const name of await readdir(directory)) {
    if (!/^native-validation-[a-f0-9]{64}\.json$/u.test(name)) continue;
    const native = await read(name);
    if (k.kernelDigest(native) !== evidence.native_evidence_digest) continue;
    if (
      !isRecord(native) ||
      native.schema_version !== 1 ||
      native.kind !== "kernel_native_validation" ||
      !isRecord(native.input) ||
      native.input_digest !== k.kernelDigest(native.input) ||
      name !== `native-validation-${String(native.input_digest).slice(7)}.json` ||
      native.input.task_id !== binding.task_id ||
      native.input.work_item_id !== binding.work_item_id ||
      native.input.result_digest !== evidence.result_digest ||
      native.input.repository_fingerprint !== evidence.repository_fingerprint ||
      k.kernelDigest(native.checks) !== k.kernelDigest(evidence.checks) ||
      k.kernelDigest(native.repository_evidence) !== k.kernelDigest(evidence.repository_evidence)
    )
      throw new Error("Native validation check evidence is inconsistent");
    retainedNative = true;
    break;
  }
  if (!retainedNative) throw new Error("Retained native validation checks are missing or tampered");
  return { binding, validation, evidence, mutation, path: path.join(directory, "validation.json") };
}

export async function captureKernelNativeValidation(
  kernelRoot: string,
  record: KernelRecord,
  workItemId: string,
) {
  const item = record.aggregate.work_items[workItemId];
  for (const [id] of Object.entries(record.aggregate.mutation_receipts)
    .filter(([id]) => /^validation:sha256:[a-f0-9]{64}$/u.test(id))
    .toSorted((a, b) => b[1].after_revision - a[1].after_revision)) {
    const orderId = id.slice("validation:".length);
    const candidate: unknown = JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(
          kernelRoot,
          "exchanges",
          record.aggregate.id,
          orderId.slice(7),
          "validation-command.json",
        ),
        "native validation command",
      ),
    );
    if (!isRecord(candidate) || !isRecord(candidate.command))
      throw new Error("Malformed retained validation command");
    if (candidate.command.work_item_id !== workItemId) continue;
    const candidateValidation = kernelValidationSchema.parse(candidate.command.validation);
    if (candidateValidation.identity.implementation_identity !== item?.result_digest) continue;
    const stop = await readNativeStop(kernelRoot, record, orderId);
    if (stop.binding.work_item_id !== workItemId || stop.binding.attempt !== item?.attempt)
      continue;
    if (
      item.state !== "VALIDATING" ||
      item.claim_id !== stop.binding.claim_id ||
      item.result_digest !== stop.validation.identity.implementation_identity ||
      k.kernelDigest(item.validation) !== k.kernelDigest(stop.validation)
    )
      throw new Error("Native validation recovery claim is stale");
    return { work_order_id: orderId, validation_digest: k.kernelDigest(stop.evidence) };
  }
  throw new Error("Recovery requires retained BLOCKED native validation for this attempt");
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
    if ("native_validation" in receipt) {
      const stop = await readNativeStop(
        kernelRoot,
        record,
        receipt.native_validation.work_order_id,
      );
      if (stop.binding.attempt !== binding.attempt - 1) continue;
      if (
        stop.binding.work_item_id !== binding.work_item_id ||
        stop.binding.repository_identity !== binding.repository_identity ||
        stop.binding.plan_digest !== binding.plan_digest ||
        stop.binding.plan_revision !== binding.plan_revision ||
        stop.binding.contract_digest !== binding.contract_digest ||
        k.kernelDigest(stop.evidence) !== receipt.native_validation.validation_digest ||
        receipt.transition.task_id !== binding.task_id ||
        receipt.transition.work_item_id !== binding.work_item_id ||
        receipt.transition.claim_id !== stop.binding.claim_id ||
        receipt.transition.expected_task_revision !== mutation.before_revision ||
        k.kernelDigest(receipt.transition) !== mutation.command_digest ||
        stop.mutation.after_revision > mutation.before_revision ||
        order.task.revision === null ||
        mutation.after_revision >= order.task.revision
      )
        throw new Error("Operator recovery does not bind the preceding native validation attempt");
      return [
        {
          id: `native-validation:${receipt.native_validation.work_order_id}`,
          kind: "source_artifact",
          path: stop.path,
          digest: receipt.native_validation.validation_digest,
          required: true,
          description:
            "Retained BLOCKED native infrastructure validation from the preceding attempt. Digest uses canonical JSON.",
        },
        {
          id,
          kind: "source_artifact",
          path: receiptPath,
          digest: receiptDigest,
          required: true,
          description:
            "Native-recorded USER resolution of the preceding infrastructure blocker. Digest uses canonical JSON.",
        },
      ];
    }
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
