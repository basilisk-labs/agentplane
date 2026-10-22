import { kernelDigest } from "./digest.js";
import type { KernelInput } from "./model.js";

/** Manual operator boundary. No plan or work-item history is rewritten. */
export function cancellationIssues(input: KernelInput): string[] {
  const { aggregate, command, actor } = input;
  if (command.kind !== "cancel_withdrawn_scope") return ["cancellation_command_required"];
  if (
    actor.kind !== "USER" ||
    actor.transport !== "manual" ||
    !/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(actor.id) ||
    !actor.capabilities.includes("task.cancel") ||
    input.authority !== null
  )
    return ["manual_user_cancellation_required"];
  if (!command.reason.trim() || !Number.isFinite(Date.parse(input.occurred_at)))
    return ["cancellation_reason_and_time_required"];
  if (
    aggregate.current_plan?.state !== "APPROVED" ||
    command.plan_digest !== aggregate.current_plan.digest ||
    !["ACTIVE", "BLOCKED", "HUMAN_REQUIRED"].includes(aggregate.state)
  )
    return ["approved_stopped_plan_required"];
  const items = Object.values(aggregate.work_items);
  if (
    items.some(
      (item) => !["PLANNED", "READY", "BLOCKED", "COMPLETED", "CANCELLED"].includes(item.state),
    )
  )
    return ["active_work_item_requires_reconciliation"];
  if (!items.some((item) => item.state === "BLOCKED" && item.attempt > 0 && item.claim_id !== null))
    return ["started_blocked_work_required"];
  if (
    aggregate.effects.some((effect) => ["PREPARED", "PENDING", "IN_DOUBT"].includes(effect.state))
  )
    return ["effect_reconciliation_required"];
  for (const item of items.filter((entry) => entry.state === "BLOCKED" && entry.attempt > 0)) {
    const proofs = command.stops.filter(
      (proof) => proof.command.work_item_id === item.definition.id,
    );
    if (proofs.length !== 1) return ["authenticated_blocked_result_required"];
    const proof = proofs[0]!;
    const stop = proof.command;
    const mutationId = `semantic-stop:${proof.work_order_id}`;
    const receipt = aggregate.mutation_receipts[mutationId];
    if (
      receipt?.command_digest !== kernelDigest(stop) ||
      stop.kind !== "transition_work_item" ||
      stop.action !== "block" ||
      stop.task_id !== aggregate.id ||
      stop.claim_id !== item.claim_id ||
      !/^sha256:[a-f0-9]{64}$/u.test(stop.semantic_result_digest ?? "")
    )
      return ["authenticated_blocked_result_required"];
  }
  const request = kernelDigest({
    kind: "withdrawn_scope_cancellation",
    task_id: aggregate.id,
    record_digest: command.record_digest,
    aggregate_digest: kernelDigest(aggregate),
    task_revision: aggregate.revision,
    plan_digest: command.plan_digest,
    repository_fingerprint: input.repository_fingerprint,
    reason: command.reason,
  });
  if (
    request !== command.request_digest ||
    command.approval_evidence_digest !==
      kernelDigest({
        kind: "manual_user_cancellation_approval",
        request_digest: request,
        actor_id: actor.id,
      })
  )
    return ["cancellation_approval_binding"];
  return [];
}
