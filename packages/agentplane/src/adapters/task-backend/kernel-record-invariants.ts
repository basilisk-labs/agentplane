import { taskKernel } from "@agentplaneorg/core/tasks";

/** Validate persisted relationships in addition to the transport schema. Never repair guessed state. */
export function kernelRecordIssues(
  aggregate: taskKernel.TaskAggregate,
  events: readonly taskKernel.DomainEvent[],
): string[] {
  const issues: string[] = [];
  const plan = aggregate.current_plan;
  if (
    [
      "ACTIVE",
      "FINAL_VALIDATION",
      "COMPLETED",
      "HUMAN_REQUIRED",
      "BLOCKED",
      "EFFECT_IN_DOUBT",
    ].includes(aggregate.state) &&
    plan?.state !== "APPROVED"
  )
    issues.push("current_plan");
  if (plan?.state === "APPROVED" && (!plan.approval_actor_id || !plan.approval_evidence_digest))
    issues.push("plan_approval");
  if (aggregate.state === "AWAITING_PLAN_APPROVAL" && plan?.state !== "PROPOSED")
    issues.push("proposed_plan");
  if (new Set(events.map((event) => event.id)).size !== events.length)
    issues.push("duplicate_events");
  if (
    events.some(
      (event, index) => index > 0 && events[index - 1]!.task_revision >= event.task_revision,
    )
  )
    issues.push("event_order");
  for (const [id, receipt] of Object.entries(aggregate.mutation_receipts)) {
    const owned = events.filter((event) => event.mutation_id === id);
    if (
      id !== receipt.mutation_id ||
      receipt.after_revision !== receipt.before_revision + 1 ||
      receipt.after_revision > aggregate.revision ||
      owned.length === 0 ||
      taskKernel.kernelDigest(owned.map((event) => taskKernel.kernelDigest(event))) !==
        taskKernel.kernelDigest(receipt.event_digests) ||
      owned.some(
        (event) =>
          event.command_digest !== receipt.command_digest ||
          event.task_revision !== receipt.after_revision,
      )
    ) {
      issues.push(`mutation_receipts.${id}`);
    }
  }
  if (
    new Set(aggregate.effects.map((effect) => effect.id)).size !== aggregate.effects.length ||
    new Set(aggregate.effects.map((effect) => effect.idempotency_key)).size !==
      aggregate.effects.length
  )
    issues.push("duplicate_effects");
  for (const [id, item] of Object.entries(aggregate.work_items)) {
    if (
      item.output_manifests.some(
        (output) =>
          output.task_id !== aggregate.id ||
          output.work_item_id !== id ||
          ![...(plan ? [plan] : []), ...aggregate.plan_history].some(
            (sourcePlan) =>
              sourcePlan.revision === output.plan_revision &&
              ["APPROVED", "SUPERSEDED"].includes(sourcePlan.state) &&
              sourcePlan.approval_actor_id !== null &&
              sourcePlan.approval_evidence_digest !== null &&
              sourcePlan.work_items.some(
                (definition) =>
                  definition.id === id &&
                  taskKernel.kernelDigest(definition) === taskKernel.kernelDigest(item.definition),
              ),
          ) ||
          output.attempt !== item.attempt,
      )
    )
      issues.push(`work_items.${id}.outputs`);
    if (
      item.state === "COMPLETED" &&
      (!item.result_digest ||
        item.validation?.status !== "PASSED" ||
        item.validation.identity.implementation_identity !== item.result_digest ||
        !item.definition.expected_outputs.every((output) =>
          item.output_manifests.some((manifest) => manifest.id === output),
        ))
    )
      issues.push(`work_items.${id}.completion`);
  }
  if (
    aggregate.state === "COMPLETED" &&
    (!aggregate.final_validation ||
      !taskKernel.isTaskCompletionEligible(
        { ...aggregate, state: "FINAL_VALIDATION" },
        aggregate.final_validation.identity.implementation_identity,
      ))
  )
    issues.push("completion");
  return issues;
}
