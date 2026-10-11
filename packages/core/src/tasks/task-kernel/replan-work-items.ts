import { kernelDigest } from "./digest.js";
import type {
  KernelInput,
  PlanRecord,
  TaskAggregate,
  TaskCommand,
  WorkItemRuntime,
} from "./model.js";

/** Replanning changes definitions, not the identity of already accepted work. */
export function reconcileReplannedWorkItems(
  aggregate: TaskAggregate,
  proposed: PlanRecord,
): { workItems: Record<string, WorkItemRuntime>; issues: string[] } {
  const originals = new Map(aggregate.current_plan?.work_items.map((item) => [item.id, item]));
  const definitions = new Map(proposed.work_items.map((item) => [item.id, item]));
  const workItems: Record<string, WorkItemRuntime> = {};
  const issues: string[] = [];
  for (const [id, runtime] of Object.entries(aggregate.work_items)) {
    const original = originals.get(id);
    const definition = definitions.get(id);
    if (!original || kernelDigest(original) !== kernelDigest(runtime.definition)) {
      issues.push(`${id}:runtime_definition_mismatch`);
      continue;
    }
    if (!definition) {
      if (!["PLANNED", "READY"].includes(runtime.state) || runtime.attempt !== 0)
        issues.push(`${id}:cannot_remove_started_work`);
      continue;
    }
    const changed = kernelDigest(original) !== kernelDigest(definition);
    if (
      !["PLANNED", "READY", "REWORK_READY", "BLOCKED", "COMPLETED", "CANCELLED"].includes(
        runtime.state,
      ) ||
      (changed && ["COMPLETED", "CANCELLED"].includes(runtime.state))
    ) {
      issues.push(`${id}:cannot_replace_${runtime.state.toLowerCase()}_work`);
      continue;
    }
    workItems[id] = changed
      ? {
          ...runtime,
          definition,
          state: "PLANNED",
          revision: runtime.revision + 1,
          claim_id: null,
          result_digest: null,
          output_manifests: [],
          validation: null,
        }
      : runtime;
  }
  for (const definition of proposed.work_items) {
    if (originals.has(definition.id) && !aggregate.work_items[definition.id])
      issues.push(`${definition.id}:missing_original_runtime`);
    if (!originals.has(definition.id)) {
      workItems[definition.id] = {
        definition,
        state: "PLANNED",
        revision: 1,
        attempt: 0,
        claim_id: null,
        result_digest: null,
        output_manifests: [],
        validation: null,
      };
    }
  }
  return { workItems, issues };
}

/** Only never-approved native proposals may intervene between a scope grant and its new Plan. */
export function authenticatedScopeReplanHistory(aggregate: TaskAggregate, approvedCurrent = false) {
  const current = aggregate.current_plan;
  if (current?.state !== (approvedCurrent ? "APPROVED" : "REJECTED")) return null;
  const plans = [...aggregate.plan_history, current];
  const candidates = (aggregate.authority_lineage ?? []).flatMap((grant) => {
    const request =
      grant.observation?.kind === "prospective_scope_request"
        ? grant.observation.scope_request
        : undefined;
    if (request?.task_id !== aggregate.id) return [];
    const index = plans.findIndex(
      (plan) => plan.digest === request.plan_digest && plan.revision === request.plan_revision,
    );
    if (index === -1) return [];
    const source = plans[index]!;
    const grantCommand: Extract<TaskCommand, { kind: "approve_scope_request" }> = {
      kind: "approve_scope_request",
      task_id: aggregate.id,
      expected_task_revision: request.task_revision,
      expected_state_fingerprint: grant.authority.repository_fingerprint,
      record: grant,
    };
    const grantMutationId = `scope-request:${kernelDigest(request)}`;
    const grantReceipt = aggregate.mutation_receipts[grantMutationId];
    if (
      source.digest !==
        kernelDigest({ revision: source.revision, work_items: source.work_items }) ||
      grantReceipt?.command_digest !== kernelDigest(grantCommand) ||
      grantReceipt.before_revision !== request.task_revision ||
      grantReceipt.after_revision !== request.task_revision + 1
    )
      return [];
    let revision = source.revision;
    let taskRevision = grantReceipt.after_revision;
    const proposals: {
      mutation_id: string;
      command: Extract<TaskCommand, { kind: "propose_plan" }>;
    }[] = [];
    for (const plan of plans.slice(index + 1)) {
      const finalApproved = approvedCurrent && plan === current;
      if (
        plan.revision !== ++revision ||
        plan.digest !== kernelDigest({ revision: plan.revision, work_items: plan.work_items }) ||
        (!finalApproved &&
          (plan.state !== "REJECTED" ||
            plan.approval_actor_id !== null ||
            plan.approval_evidence_digest !== null))
      )
        return [];
      const original: PlanRecord = {
        ...plan,
        state: "PROPOSED",
        approval_actor_id: null,
        approval_evidence_digest: null,
      };
      const matches = Object.values(aggregate.mutation_receipts).flatMap((receipt) => {
        const command: Extract<TaskCommand, { kind: "propose_plan" }> = {
          kind: "propose_plan",
          task_id: aggregate.id,
          expected_task_revision: receipt.before_revision,
          expected_state_fingerprint: grant.authority.repository_fingerprint,
          plan: original,
        };
        return receipt.mutation_id.startsWith("result:sha256:") &&
          receipt.before_revision >= taskRevision &&
          receipt.after_revision === receipt.before_revision + 1 &&
          receipt.command_digest === kernelDigest(command)
          ? [{ receipt, command }]
          : [];
      });
      if (matches.length !== 1) return [];
      const selected = matches[0]!;
      proposals.push({ mutation_id: selected.receipt.mutation_id, command: selected.command });
      taskRevision = selected.receipt.after_revision;
    }
    return [{ source, grant, grantCommand, proposals }];
  });
  return candidates.length === 1 ? candidates[0]! : null;
}

/** A USER may reject only the exact never-approved proposal descended from a scope grant. */
export function isScopeProposalRejection(
  input: Pick<KernelInput, "aggregate" | "actor" | "command">,
): boolean {
  const plan = input.aggregate.current_plan;
  return (
    input.command.kind === "reject_plan" &&
    input.aggregate.state === "AWAITING_PLAN_APPROVAL" &&
    plan?.state === "PROPOSED" &&
    input.actor.kind === "USER" &&
    input.actor.transport === "manual" &&
    /^sha256:[0-9a-f]{64}$/u.test(input.command.rejection_evidence_digest ?? "") &&
    input.command.plan_revision === plan.revision &&
    input.command.plan_digest === plan.digest &&
    authenticatedScopeReplanHistory({
      ...input.aggregate,
      current_plan: { ...plan, state: "REJECTED" },
    }) !== null
  );
}
