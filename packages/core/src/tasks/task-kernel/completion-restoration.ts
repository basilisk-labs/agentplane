import { kernelDigest } from "./digest.js";
import type {
  DomainEvent,
  KernelInput,
  TaskAggregate,
  TaskCommand,
  WorkItemRuntime,
} from "./model.js";

type CommandOf<K extends TaskCommand["kind"]> = Extract<TaskCommand, { kind: K }>;
export type CompletionRestorationProof = Readonly<{
  accepted: { mutation_id: string; command: CommandOf<"accept_work_item_result"> };
  validated: { mutation_id: string; command: CommandOf<"record_work_item_validation"> };
  completed: { mutation_id: string; command: CommandOf<"transition_work_item"> };
  reset_proposal: { mutation_id: string; command: CommandOf<"propose_plan"> };
  reset_materialization: { mutation_id: string; command: CommandOf<"materialize_work_items"> };
  inspection_digest: `sha256:${string}`;
  native_validation_digest: `sha256:${string}`;
  attempt: number;
  implementation_binding: Readonly<{
    task_id: string;
    plan_revision: number;
    plan_digest: `sha256:${string}`;
    work_item_id: string;
    contract_digest: `sha256:${string}`;
    attempt: number;
    claim_id: string;
    repository_fingerprint: `sha256:${string}`;
  }>;
  intervening_events: readonly DomainEvent[];
  later_results: readonly {
    mutation_id: string;
    command: CommandOf<"accept_work_item_result"> | CommandOf<"propose_plan">;
  }[];
}>;

/** Every command preimage must authenticate against native receipts already in this aggregate. */
export function completionRestorationIssues(
  aggregate: TaskAggregate,
  workItemId: string,
  proof: CompletionRestorationProof,
): string[] {
  const issues: string[] = [];
  const current = aggregate.work_items[workItemId];
  if (aggregate.state !== "ACTIVE" || aggregate.current_plan?.state !== "APPROVED")
    issues.push("approved_active_plan_required");
  if (
    !current ||
    !["PLANNED", "READY", "BLOCKED"].includes(current.state) ||
    current.result_digest !== null ||
    current.validation !== null ||
    current.output_manifests.length > 0
  )
    issues.push("empty_reset_runtime_required");
  if (
    Object.values(aggregate.work_items).some((item) =>
      [
        "CLAIMED",
        "EXECUTING",
        "RESULT_RECEIVED",
        "INSPECTING",
        "VALIDATING",
        "EFFECT_IN_DOUBT",
      ].includes(item.state),
    )
  )
    issues.push("active_execution_present");
  if (
    aggregate.effects.some((effect) => ["PREPARED", "PENDING", "IN_DOUBT"].includes(effect.state))
  )
    issues.push("unresolved_effects");
  const chain = [
    proof.accepted,
    proof.validated,
    proof.completed,
    proof.reset_proposal,
    proof.reset_materialization,
  ];
  if (
    proof.accepted.command.kind !== "accept_work_item_result" ||
    proof.validated.command.kind !== "record_work_item_validation" ||
    proof.completed.command.kind !== "transition_work_item" ||
    proof.reset_proposal.command.kind !== "propose_plan" ||
    proof.reset_materialization.command.kind !== "materialize_work_items"
  )
    return ["proof_command_kinds"];
  let previous = -1;
  for (const entry of chain) {
    const receipt = aggregate.mutation_receipts[entry.mutation_id];
    if (
      receipt?.command_digest !== kernelDigest(entry.command) ||
      receipt.before_revision !== entry.command.expected_task_revision ||
      receipt.after_revision !== receipt.before_revision + 1 ||
      receipt.before_revision < previous ||
      receipt.effect_ids.length > 0 ||
      entry.command.task_id !== aggregate.id
    ) {
      issues.push(`unbound_receipt:${entry.mutation_id}`);
    }
    previous = receipt?.after_revision ?? previous;
  }
  const accepted = proof.accepted.command;
  const validation = proof.validated.command.validation;
  const completion = proof.completed.command;
  const oldPlan = aggregate.plan_history.find(
    (plan) => plan.digest === accepted.plan_digest && plan.revision === accepted.plan_revision,
  );
  const oldDefinition = oldPlan?.work_items.find((item) => item.id === workItemId);
  if (
    oldPlan?.digest !==
    (oldPlan ? kernelDigest({ revision: oldPlan.revision, work_items: oldPlan.work_items }) : null)
  )
    issues.push("historical_plan_content_mismatch");
  const binding = proof.implementation_binding;
  if (
    accepted.binding_digest !== kernelDigest(binding) ||
    binding.task_id !== aggregate.id ||
    binding.plan_digest !== accepted.plan_digest ||
    binding.plan_revision !== accepted.plan_revision ||
    binding.work_item_id !== workItemId ||
    binding.contract_digest !== oldDefinition?.contract_digest ||
    binding.attempt !== proof.attempt ||
    binding.claim_id !== completion.claim_id
  )
    issues.push("accepted_attempt_binding");
  if (
    !oldPlan?.approval_actor_id ||
    !oldPlan.approval_evidence_digest ||
    !oldDefinition ||
    kernelDigest(oldDefinition ?? null) !== kernelDigest(current?.definition ?? null) ||
    accepted.work_item_id !== workItemId ||
    proof.validated.command.work_item_id !== workItemId ||
    completion.work_item_id !== workItemId ||
    completion.action !== "complete" ||
    !completion.claim_id ||
    !Number.isInteger(proof.attempt) ||
    proof.attempt < 1
  )
    issues.push("completion_identity_mismatch");
  if (
    validation.status !== "PASSED" ||
    validation.identity.implementation_identity !== accepted.result_digest ||
    validation.identity.check_id !== "canonical-contract-and-inspection" ||
    !validation.evidence_digests.includes(proof.inspection_digest) ||
    !validation.evidence_digests.includes(proof.native_validation_digest) ||
    proof.completed.mutation_id !== `validation-resolution:${kernelDigest(validation)}`
  )
    issues.push("independent_pass_required");
  if (
    !oldDefinition?.expected_outputs.every((id) =>
      accepted.output_manifests.some((output) => output.id === id),
    ) ||
    accepted.output_manifests.some(
      (output) =>
        output.task_id !== aggregate.id ||
        output.work_item_id !== workItemId ||
        output.plan_revision !== accepted.plan_revision ||
        output.attempt !== proof.attempt ||
        output.repository_fingerprint !== accepted.expected_state_fingerprint,
    )
  )
    issues.push("accepted_output_binding");
  const reset = proof.reset_proposal.command.plan;
  if (reset.digest !== kernelDigest({ revision: reset.revision, work_items: reset.work_items }))
    issues.push("reset_plan_content_mismatch");
  const materialized = proof.reset_materialization.command;
  const retainedReset = [aggregate.current_plan, ...aggregate.plan_history].find(
    (plan) => plan?.digest === reset.digest && plan.revision === reset.revision,
  );
  if (
    !retainedReset ||
    kernelDigest(retainedReset.work_items) !== kernelDigest(reset.work_items) ||
    reset.revision <= accepted.plan_revision ||
    materialized.plan_digest !== reset.digest ||
    materialized.plan_revision !== reset.revision ||
    kernelDigest(reset.work_items.find((item) => item.id === workItemId) ?? null) !==
      kernelDigest(oldDefinition ?? null)
  )
    issues.push("reset_plan_mismatch");
  const predecessor = aggregate.plan_history.find((plan) => plan.revision === reset.revision - 1);
  if (
    predecessor?.digest !==
    (predecessor
      ? kernelDigest({ revision: predecessor.revision, work_items: predecessor.work_items })
      : null)
  )
    issues.push("reset_predecessor_content_mismatch");
  const scope = aggregate.authority_lineage?.find(
    (entry) =>
      entry.observation?.kind === "prospective_scope_request" &&
      entry.observation.scope_request?.plan_digest === predecessor?.digest &&
      entry.observation.scope_request!.task_revision >=
        proof.completed.command.expected_task_revision + 1 &&
      entry.observation.scope_request!.task_revision <
        proof.reset_proposal.command.expected_task_revision,
  );
  if (
    !scope ||
    kernelDigest(predecessor?.work_items.find((item) => item.id === workItemId) ?? null) !==
      kernelDigest(oldDefinition ?? null)
  )
    issues.push("scope_reset_lineage_missing");
  const afterCompletion = Object.values(aggregate.mutation_receipts).filter(
    (receipt) => receipt.before_revision >= completion.expected_task_revision + 1,
  );
  if (
    proof.intervening_events.length > 4096 ||
    new Set(proof.intervening_events.map((event) => event.id)).size !==
      proof.intervening_events.length
  )
    issues.push("invalid_event_inventory");
  for (const receipt of afterCompletion) {
    const events = proof.intervening_events.filter(
      (event) => event.mutation_id === receipt.mutation_id,
    );
    if (
      kernelDigest(events.map((event) => kernelDigest(event))) !==
        kernelDigest(receipt.event_digests) ||
      events.some(
        (event) =>
          event.task_id !== aggregate.id ||
          event.task_revision !== receipt.after_revision ||
          event.command_digest !== receipt.command_digest,
      )
    )
      issues.push("incomplete_authenticated_history");
  }
  if (
    proof.intervening_events.some(
      (event) => !afterCompletion.some((receipt) => receipt.mutation_id === event.mutation_id),
    )
  )
    issues.push("extraneous_history");
  // COMPLETED has no outgoing work transition; amendments cannot replace its definition.
  // An earlier proposal is the one native operation that could have discarded that state.
  if (
    proof.intervening_events.some(
      (event) =>
        event.kind === "plan_proposed" &&
        event.task_revision < proof.reset_proposal.command.expected_task_revision + 1,
    )
  )
    issues.push("earlier_reset_invalidates_selected_completion");
  const laterResultIds = new Set(
    proof.intervening_events
      .filter((event) => ["work_item_result_accepted", "plan_proposed"].includes(event.kind))
      .map((event) => event.mutation_id),
  );
  const laterReceipts = afterCompletion.filter(
    (receipt) =>
      laterResultIds.has(receipt.mutation_id) &&
      receipt.after_revision > materialized.expected_task_revision,
  );
  if (
    proof.later_results.length !== laterReceipts.length ||
    new Set(proof.later_results.map((entry) => entry.mutation_id)).size !==
      proof.later_results.length
  )
    issues.push("later_result_inventory_mismatch");
  for (const receipt of laterReceipts) {
    const entry = proof.later_results.find(
      (candidate) => candidate.mutation_id === receipt.mutation_id,
    );
    if (
      !entry ||
      receipt.command_digest !== kernelDigest(entry.command) ||
      entry.command.task_id !== aggregate.id ||
      !["accept_work_item_result", "propose_plan"].includes(entry.command.kind)
    )
      issues.push("unbound_later_result");
    else if (
      entry.command.kind === "accept_work_item_result" &&
      entry.command.work_item_id === workItemId
    )
      issues.push("newer_accepted_execution_present");
  }
  return issues;
}

export function restoredCompletionRuntime(
  current: WorkItemRuntime,
  proof: CompletionRestorationProof,
): WorkItemRuntime {
  return {
    ...current,
    state: "COMPLETED",
    revision: current.revision + 1,
    attempt: proof.attempt,
    claim_id: proof.completed.command.claim_id,
    result_digest: proof.accepted.command.result_digest,
    output_manifests: proof.accepted.command.output_manifests,
    validation: proof.validated.command.validation,
  };
}

export function completionRestorationAdmissionIssues(input: KernelInput): string[] {
  if (input.command.kind !== "restore_work_item_completion") return ["wrong_command"];
  const command = input.command;
  return [
    ...(input.actor.kind !== "USER" ||
    input.actor.transport !== "manual" ||
    input.actor.id !== "USER" ||
    !command.note.trim()
      ? ["explicit_user_required"]
      : []),
    ...(command.proof_digest === kernelDigest(command.proof) ? [] : ["proof_digest_mismatch"]),
    ...completionRestorationIssues(input.aggregate, command.work_item_id, command.proof),
  ];
}
