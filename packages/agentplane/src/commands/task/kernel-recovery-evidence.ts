import path from "node:path";
import { readdir } from "node:fs/promises";
import { z } from "zod";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import {
  kernelValidationSchema,
  type KernelRecord,
} from "../../adapters/task-backend/kernel-record.js";
import { isRecord } from "../../shared/guards.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import {
  authenticReworkEvent,
  findReworkLineage,
  historicalAmendment,
  historicalAmendmentWithFailedCheck,
} from "./kernel-rework-lineage.js";

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
    semantic_stop: z.strictObject({
      work_order_id: digest,
      result_digest: digest,
      result_authentication: z
        .enum(["native_stop_receipt", "legacy_current_retained_content"])
        .optional(),
    }),
  }),
  z.strictObject({
    ...recoveryFields,
    native_validation: nativeStopSchema,
    transition: transitionSchema,
  }),
]);

function authenticatedPlanApproval(record: KernelRecord, plan: k.PlanRecord) {
  const matches: k.DomainEvent[] = [];
  for (const entry of record.aggregate.authority_lineage ?? []) {
    const parent = entry.authority;
    if (
      entry.observation !== null ||
      entry.approval_mode === null ||
      parent.plan_digest !== plan.digest ||
      parent.plan_revision !== plan.revision ||
      parent.provenance.kind !== "USER" ||
      parent.provenance.actor_id !== plan.approval_actor_id ||
      parent.provenance.evidence_digest !== plan.approval_evidence_digest
    )
      continue;
    for (const event of record.events.filter((event) => event.kind === "plan_approved")) {
      const command: k.TaskCommand = {
        kind: "approve_plan",
        task_id: record.aggregate.id,
        expected_task_revision: event.task_revision - 1,
        expected_state_fingerprint: parent.repository_fingerprint,
        plan_revision: plan.revision,
        plan_digest: plan.digest,
        approval_evidence_digest: plan.approval_evidence_digest,
        authority_mode: entry.approval_mode,
      };
      if (authenticReworkEvent(record, event, command)) matches.push(event);
    }
  }
  return matches.length === 1 &&
    record.events.filter((event) => event.mutation_id === matches[0]!.mutation_id).length === 1
    ? matches[0]
    : null;
}

function unchangedApprovedPlanHistory(
  record: KernelRecord,
  binding: Extract<NonNullable<AgentWorkOrderV2["canonical_binding"]>, { phase: "implementation" }>,
  orderId: string,
) {
  const aggregate = record.aggregate;
  const plans = [...aggregate.plan_history, aggregate.current_plan!];
  const authorities = new Set<k.Sha256Digest>();
  for (const { authority } of aggregate.authority_lineage ?? []) {
    if (
      authority.digest !== k.authorityDigest(authority) ||
      authority.task_id !== aggregate.id ||
      authority.repository_identity !== record.repository_identity ||
      !plans.some(
        (plan) =>
          plan.digest === authority.plan_digest && plan.revision === authority.plan_revision,
      ) ||
      (authority.provenance.parent_authority_digest !== null &&
        !authorities.has(authority.provenance.parent_authority_digest))
    )
      return false;
    authorities.add(authority.digest);
  }
  const indices = plans.flatMap((plan, index) =>
    plan.digest === binding.plan_digest && plan.revision === binding.plan_revision ? [index] : [],
  );
  if (indices.length !== 1) return false;
  const history = plans.slice(indices[0]);
  const definition = aggregate.work_items[binding.work_item_id]?.definition;
  if (!definition) return false;
  const authenticated: k.DomainEvent[] = [];
  for (const [index, plan] of history.entries()) {
    const historicalDefinition = plan.work_items.find((item) => item.id === binding.work_item_id);
    if (
      plan.revision !== binding.plan_revision + index ||
      plan.digest !== k.kernelDigest({ revision: plan.revision, work_items: plan.work_items }) ||
      !/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(plan.approval_actor_id ?? "") ||
      !historicalDefinition ||
      k.kernelDigest(historicalDefinition) !== k.kernelDigest(definition)
    )
      return false;
    const approval = authenticatedPlanApproval(record, plan);
    if (approval) {
      authenticated.push(approval);
      continue;
    }
    if (index === 0) return false;
    const amended: k.DomainEvent[] = [];
    for (const entry of aggregate.authority_lineage ?? []) {
      if (
        entry.observation?.kind !== "plan_amendment" ||
        entry.authority.plan_digest !== plan.digest
      )
        continue;
      for (const event of record.events.filter((event) => event.kind === "plan_amended")) {
        const command = historicalAmendment(
          record,
          plan,
          event,
          entry.authority.repository_fingerprint,
        );
        const previous = history[index - 1]!;
        if (
          command &&
          plan.approval_evidence_digest ===
            k.planScopeExpansionApprovalDigest({
              task_id: aggregate.id,
              current_plan_digest: previous.digest,
              amended_plan_digest: plan.digest,
              actor_id: plan.approval_actor_id!,
            })
        )
          amended.push(event);
      }
    }
    if (
      amended.length !== 1 ||
      record.events.filter((event) => event.mutation_id === amended[0]!.mutation_id).length !== 1
    )
      return false;
    authenticated.push(amended[0]!);
  }
  const initial = authenticated[0];
  const current = authenticated.at(-1);
  const stop = aggregate.mutation_receipts[String(`semantic-stop:${orderId}`)];
  return (
    !!initial &&
    !!current &&
    !!stop &&
    initial.task_revision <= stop.before_revision &&
    current.task_revision > stop.after_revision &&
    current.task_revision <= aggregate.revision
  );
}

export function semanticStopPlanMatches(
  record: KernelRecord,
  binding: NonNullable<AgentWorkOrderV2["canonical_binding"]>,
  orderId: string,
  resultDigest: string,
  precedingAttempt = false,
  nativeResultAuthenticated = false,
) {
  const aggregate = record.aggregate;
  const current = aggregate.current_plan;
  if (binding.plan_digest === current?.digest && binding.plan_revision === current.revision)
    return true;
  if (
    binding.phase !== "implementation" ||
    current?.state !== "APPROVED" ||
    current.revision <= binding.plan_revision
  )
    return false;
  const previous = aggregate.plan_history.find(
    (plan) => plan.digest === binding.plan_digest && plan.revision === binding.plan_revision,
  );
  const definition = previous?.work_items.find((item) => item.id === binding.work_item_id);
  const runtime = aggregate.work_items[binding.work_item_id];
  if (
    !definition ||
    runtime?.attempt !== binding.attempt + (precedingAttempt ? 1 : 0) ||
    (!precedingAttempt && runtime.claim_id !== binding.claim_id) ||
    k.kernelDigest(definition) !== k.kernelDigest(runtime.definition)
  )
    return false;
  return (
    (aggregate.authority_lineage?.some((entry) => {
      const request =
        entry.observation?.kind === "prospective_scope_request"
          ? entry.observation.scope_request
          : undefined;
      return (
        request?.task_id === aggregate.id &&
        request.plan_digest === binding.plan_digest &&
        request.plan_revision === binding.plan_revision &&
        request.work_item_id === binding.work_item_id &&
        request.attempt === binding.attempt &&
        request.claim_id === binding.claim_id &&
        request.contract_digest === binding.contract_digest &&
        request.work_order_id === orderId &&
        request.result_digest === resultDigest
      );
    }) ??
      false) ||
    (nativeResultAuthenticated && unchangedApprovedPlanHistory(record, binding, orderId))
  );
}

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
    (saved.command.semantic_result_digest !== undefined &&
      saved.command.semantic_result_digest !== k.kernelDigest(result)) ||
    binding?.phase !== "implementation" ||
    result.status === "completed" ||
    result.work_order_id !== orderId ||
    saved.command.task_id !== binding.task_id ||
    saved.command.work_item_id !== binding.work_item_id ||
    saved.command.claim_id !== binding.claim_id ||
    binding.task_id !== record.aggregate.id ||
    binding.repository_identity !== record.repository_identity ||
    (saved.command.semantic_result_digest !== undefined &&
      (record.events.filter((event) => event.mutation_id === mutationId).length !== 1 ||
        !authenticReworkEvent(
          record,
          record.events.find((event) => event.mutation_id === mutationId)!,
          saved.command as k.TaskCommand,
        )))
  )
    throw new Error("Semantic stop evidence does not match the canonical Task");
  return {
    result,
    binding,
    resultPath,
    mutation,
    result_authentication:
      saved.command.semantic_result_digest === undefined
        ? ("legacy_current_retained_content" as const)
        : ("native_stop_receipt" as const),
  };
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
    if (
      stop.binding.contract_digest !== item.definition.contract_digest ||
      !semanticStopPlanMatches(
        record,
        stop.binding,
        orderId,
        k.kernelDigest(stop.result),
        false,
        stop.result_authentication === "native_stop_receipt",
      )
    )
      throw new Error("Semantic stop evidence does not match the canonical Task");
    if (item.state !== "BLOCKED" || stop.binding.claim_id !== item.claim_id)
      throw new Error("Semantic stop claim is stale");
    return {
      work_order_id: orderId,
      result_digest: k.kernelDigest(stop.result),
      result_authentication: stop.result_authentication,
    };
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
  const implementationBinding = binding?.phase === "implementation" ? binding : null;
  const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(await read("work-order.json"));
  const originalPlan = [...record.aggregate.plan_history, record.aggregate.current_plan].find(
    (plan) =>
      plan !== null &&
      implementationBinding !== null &&
      plan.digest === implementationBinding.plan_digest &&
      plan.revision === implementationBinding.plan_revision,
  );
  const originalDefinition = originalPlan?.work_items.find(
    (item) => item.id === implementationBinding?.work_item_id,
  );
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
    !originalPlan ||
    (originalPlan.digest !== record.aggregate.current_plan?.digest &&
      originalPlan.digest !==
        k.kernelDigest({ revision: originalPlan.revision, work_items: originalPlan.work_items })) ||
    originalDefinition?.contract_digest !== binding.contract_digest ||
    order.work_order_id !== orderId ||
    order.task.id !== binding.task_id ||
    order.task.work_item_id !== binding.work_item_id ||
    order.task.revision === null ||
    order.task.revision > mutation.before_revision ||
    k.kernelDigest(order.canonical_binding) !== k.kernelDigest(binding) ||
    saved.command.work_item_id !== binding.work_item_id ||
    (binding.plan_digest === record.aggregate.current_plan?.digest &&
      binding.contract_digest !==
        record.aggregate.work_items[binding.work_item_id]?.definition.contract_digest) ||
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

/** A historical BLOCKED check may cross a Plan boundary only through native USER amendments. */
export async function authenticNativePlanCorrection(
  directory: string,
  record: KernelRecord,
  old: Extract<NonNullable<AgentWorkOrderV2["canonical_binding"]>, { phase: "implementation" }>,
  current: Extract<NonNullable<AgentWorkOrderV2["canonical_binding"]>, { phase: "implementation" }>,
  stopRevision: number,
  oldOrderId: string,
) {
  if (old.plan_digest === current.plan_digest && old.plan_revision === current.plan_revision)
    return old.contract_digest === current.contract_digest;
  const history = findReworkLineage(record, old.work_item_id);
  const plans = [...record.aggregate.plan_history, record.aggregate.current_plan];
  const oldIndex = plans.findIndex(
    (plan) => plan?.digest === old.plan_digest && plan.revision === old.plan_revision,
  );
  const originalDefinition = plans[oldIndex]?.work_items.find(
    (item) => item.id === old.work_item_id,
  );
  if (
    !history ||
    oldIndex === -1 ||
    originalDefinition?.contract_digest !== old.contract_digest ||
    current.attempt !== old.attempt + 1 ||
    plans.at(-1)?.digest !== current.plan_digest ||
    plans.at(-1)?.revision !== current.plan_revision ||
    oldIndex >= plans.length - 1 ||
    old.task_id !== current.task_id ||
    old.repository_identity !== current.repository_identity ||
    old.work_item_id !== current.work_item_id ||
    record.aggregate.current_plan?.state !== "APPROVED" ||
    record.aggregate.work_items[current.work_item_id]?.definition.contract_digest !==
      current.contract_digest
  )
    return false;
  let previousRevision = stopRevision;
  let previousPlan = plans[oldIndex]!;
  for (const [index, plan] of plans.slice(oldIndex + 1).entries()) {
    if (!plan) return false;
    const lineage = record.aggregate.authority_lineage ?? [];
    const authorityIndex = lineage.findIndex(
      (entry) =>
        entry.observation?.kind === "plan_amendment" && entry.authority.plan_digest === plan.digest,
    );
    const authority = lineage[authorityIndex];
    const parent = lineage[authorityIndex - 1]?.authority;
    if (authority?.observation?.kind !== "plan_amendment") return false;
    if (
      !parent ||
      previousPlan.state !== "SUPERSEDED" ||
      plan.revision !== previousPlan.revision + 1 ||
      plan.digest !== k.kernelDigest({ revision: plan.revision, work_items: plan.work_items }) ||
      !/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(plan.approval_actor_id ?? "") ||
      plan.approval_evidence_digest !==
        k.planScopeExpansionApprovalDigest({
          task_id: record.aggregate.id,
          current_plan_digest: previousPlan.digest,
          amended_plan_digest: plan.digest,
          actor_id: plan.approval_actor_id!,
        }) ||
      parent.plan_digest !== previousPlan.digest ||
      parent.plan_revision !== previousPlan.revision ||
      k.planAmendmentScopeRoots({ current: previousPlan, amended: plan, authority: parent }) ===
        null
    )
      return false;
    const matches = [];
    for (const event of record.events.filter(
      (candidate) =>
        candidate.kind === "plan_amended" && candidate.task_revision > previousRevision,
    )) {
      const command = await historicalAmendmentWithFailedCheck(
        record,
        plan,
        event,
        authority.observation.previous_fingerprint,
        directory,
      );
      if (
        command &&
        (index > 0 ||
          (command.kind === "amend_plan" &&
            command.required_check_correction?.failed_work_order_id === oldOrderId))
      )
        matches.push(event);
    }
    if (matches.length !== 1) return false;
    previousRevision = matches[0]!.task_revision;
    previousPlan = plan;
  }
  return true;
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
    if (
      !(await authenticNativePlanCorrection(
        path.join(kernelRoot, "exchanges", record.aggregate.id, orderId.slice(7)),
        record,
        stop.binding,
        {
          ...stop.binding,
          plan_digest: record.aggregate.current_plan!.digest,
          plan_revision: record.aggregate.current_plan!.revision,
          contract_digest: item.definition.contract_digest!,
        },
        stop.mutation.after_revision,
        orderId,
      ))
    )
      throw new Error("Native validation Plan correction is not authenticated");
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
  if (
    binding.plan_digest !== record.aggregate.current_plan?.digest ||
    binding.plan_revision !== record.aggregate.current_plan.revision
  )
    throw new Error("Incoming recovery WorkOrder does not bind the current Plan");
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
        !(await authenticNativePlanCorrection(
          path.join(
            kernelRoot,
            "exchanges",
            record.aggregate.id,
            receipt.native_validation.work_order_id.slice(7),
          ),
          record,
          stop.binding,
          binding,
          stop.mutation.after_revision,
          receipt.native_validation.work_order_id,
        )) ||
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
      !semanticStopPlanMatches(
        record,
        stop.binding,
        receipt.semantic_stop.work_order_id,
        k.kernelDigest(stop.result),
        true,
        stop.result_authentication === "native_stop_receipt",
      ) ||
      stop.binding.contract_digest !== binding.contract_digest ||
      k.kernelDigest(stop.result) !== receipt.semantic_stop.result_digest ||
      (receipt.semantic_stop.result_authentication !== undefined &&
        receipt.semantic_stop.result_authentication !== stop.result_authentication) ||
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
  // A USER-approved required-check correction resets the changed WorkItem to PLANNED.
  // It creates no work-item-resume receipt, so bind the next attempt to the old native
  // BLOCKED validation and the authenticated amendment instead of inventing a resume.
  for (const [id, mutation] of Object.entries(record.aggregate.mutation_receipts)
    .filter(([id]) => /^validation:sha256:[a-f0-9]{64}$/u.test(id))
    .toSorted((a, b) => b[1].after_revision - a[1].after_revision)) {
    const oldOrderId = id.slice("validation:".length);
    const oldDirectory = path.join(kernelRoot, "exchanges", binding.task_id, oldOrderId.slice(7));
    const saved: unknown = JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(oldDirectory, "validation-command.json"),
        "historical native validation command",
      ),
    );
    if (!isRecord(saved) || !isRecord(saved.command))
      throw new Error("Malformed retained native validation command");
    if (saved.command.work_item_id !== binding.work_item_id) continue;
    const stop = await readNativeStop(kernelRoot, record, oldOrderId);
    if (stop.binding.attempt !== binding.attempt - 1) continue;
    if (stop.binding.plan_digest === binding.plan_digest) continue;
    if (
      mutation.after_revision >= (order.task.revision ?? 0) ||
      !(await authenticNativePlanCorrection(
        oldDirectory,
        record,
        stop.binding,
        binding,
        mutation.after_revision,
        oldOrderId,
      ))
    )
      throw new Error("Required-check correction does not bind the preceding native validation");
    return [
      {
        id: `native-validation:${oldOrderId}`,
        kind: "source_artifact",
        path: stop.path,
        digest: k.kernelDigest(stop.evidence),
        required: true,
        description: "Retained BLOCKED native validation before the approved Plan correction.",
      },
      {
        id: `native-work-order:${oldOrderId}`,
        kind: "source_artifact",
        path: path.join(oldDirectory, "work-order.json"),
        digest: k.kernelDigest(
          AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
            JSON.parse(
              await readStableRegularTextNoFollow(
                path.join(oldDirectory, "work-order.json"),
                "historical native WorkOrder",
              ),
            ),
          ),
        ),
        required: true,
        description: "Original issued WorkOrder authenticated by the native correction receipt.",
      },
    ];
  }
  return [];
}
