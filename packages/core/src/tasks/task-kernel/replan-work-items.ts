import { kernelDigest } from "./digest.js";
import {
  authorityDigest,
  planScopeExpansionApprovalDigest,
  planAmendmentScopeRoots,
} from "./authority-lineage.js";
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

/** Retain native proposals and their authenticated approvals, without granting execution authority. */
export function authenticatedScopeReplanHistory(
  aggregate: TaskAggregate,
  approvedCurrent = false,
  workItemId?: string,
) {
  const current = aggregate.current_plan;
  if (current?.state !== (approvedCurrent ? "APPROVED" : "REJECTED")) return null;
  const plans = [...aggregate.plan_history, current];
  const candidates = (aggregate.authority_lineage ?? []).flatMap((grant) => {
    const request =
      grant.observation?.kind === "prospective_scope_request"
        ? grant.observation.scope_request
        : undefined;
    if (
      request?.task_id !== aggregate.id ||
      (workItemId !== undefined && request.work_item_id !== workItemId)
    )
      return [];
    const index = plans.findIndex(
      (plan) => plan.digest === request.plan_digest && plan.revision === request.plan_revision,
    );
    if (index === -1) return [];
    const runtime = aggregate.work_items[request.work_item_id];
    if (
      approvedCurrent &&
      (!request.contract_digest ||
        runtime?.state !== "EXECUTING" ||
        runtime.attempt !== request.attempt + 1 ||
        plans[index]!.work_items.find((item) => item.id === request.work_item_id)
          ?.contract_digest !== request.contract_digest)
    )
      return [];
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
      grantReceipt?.mutation_id !== grantMutationId ||
      grantReceipt.command_digest !== kernelDigest(grantCommand) ||
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
    const approvals: {
      mutation_id: string;
      command: Extract<TaskCommand, { kind: "approve_plan" }>;
    }[] = [];
    const amendments: {
      plan: PlanRecord;
      fingerprint: typeof grant.authority.repository_fingerprint;
    }[] = [];
    const target = current.work_items.find((item) => item.id === request.work_item_id);
    let previous = source;
    for (const plan of plans.slice(index + 1)) {
      const finalApproved = approvedCurrent && plan === current;
      const definition = plan.work_items.find((item) => item.id === request.work_item_id);
      if (
        plan.revision !== ++revision ||
        plan.digest !== kernelDigest({ revision: plan.revision, work_items: plan.work_items }) ||
        (!finalApproved &&
          (approvedCurrent
            ? !["REJECTED", "SUPERSEDED"].includes(plan.state)
            : plan.state !== "REJECTED" ||
              plan.approval_actor_id !== null ||
              plan.approval_evidence_digest !== null)) ||
        (approvedCurrent &&
          (!target || !definition || kernelDigest(definition) !== kernelDigest(target)))
      )
        return [];
      if (approvedCurrent && previous.state === "SUPERSEDED") {
        const lineage = aggregate.authority_lineage ?? [];
        const entries = lineage.flatMap((entry, position) => {
          const parent = lineage[position - 1]?.authority;
          return entry.observation?.kind === "plan_amendment" &&
            entry.authority.plan_digest === plan.digest &&
            entry.authority.plan_revision === plan.revision &&
            entry.authority.digest === authorityDigest(entry.authority) &&
            entry.authority.task_id === aggregate.id &&
            parent?.plan_digest === previous.digest &&
            parent.plan_revision === previous.revision &&
            entry.authority.provenance.parent_authority_digest === parent.digest &&
            entry.observation.previous_fingerprint === parent.repository_fingerprint &&
            planAmendmentScopeRoots({ current: previous, amended: plan, authority: parent }) !==
              null &&
            /^USER(?::[A-Za-z0-9._@-]+)?$/u.test(plan.approval_actor_id ?? "") &&
            plan.approval_evidence_digest ===
              planScopeExpansionApprovalDigest({
                task_id: aggregate.id,
                current_plan_digest: previous.digest,
                amended_plan_digest: plan.digest,
                actor_id: plan.approval_actor_id!,
              })
            ? [entry]
            : [];
        });
        if (entries.length !== 1) return [];
        // The adapter authenticates the full amendment command against retained contracts and events.
        amendments.push({ plan, fingerprint: entries[0]!.observation!.previous_fingerprint });
        previous = plan;
        continue;
      }
      const original: PlanRecord = {
        ...plan,
        state: "PROPOSED",
        approval_actor_id: null,
        approval_evidence_digest: null,
      };
      const fingerprints = approvedCurrent
        ? [
            ...new Set(
              (aggregate.authority_lineage ?? []).map(
                (entry) => entry.authority.repository_fingerprint,
              ),
            ),
          ]
        : [grant.authority.repository_fingerprint];
      const matches = Object.values(aggregate.mutation_receipts).flatMap((receipt) =>
        fingerprints.flatMap((fingerprint) => {
          const command: Extract<TaskCommand, { kind: "propose_plan" }> = {
            kind: "propose_plan",
            task_id: aggregate.id,
            expected_task_revision: receipt.before_revision,
            expected_state_fingerprint: fingerprint,
            plan: original,
          };
          return (receipt.mutation_id === `plan:${plan.digest}` ||
            receipt.mutation_id.startsWith("result:sha256:")) &&
            receipt.before_revision >= taskRevision &&
            receipt.after_revision === receipt.before_revision + 1 &&
            receipt.command_digest === kernelDigest(command)
            ? [{ receipt, command }]
            : [];
        }),
      );
      if (matches.length !== 1) return [];
      const selected = matches[0]!;
      proposals.push({ mutation_id: selected.receipt.mutation_id, command: selected.command });
      taskRevision = selected.receipt.after_revision;
      if (approvedCurrent) {
        if (!/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(plan.approval_actor_id ?? "")) return [];
        const approved = (aggregate.authority_lineage ?? []).flatMap((entry) => {
          const authority = entry.authority;
          const approvalMode = entry.approval_mode;
          const approvalEvidence = plan.approval_evidence_digest;
          if (
            entry.observation !== null ||
            !approvalMode ||
            !approvalEvidence ||
            authority.digest !== authorityDigest(authority) ||
            authority.task_id !== aggregate.id ||
            authority.plan_digest !== plan.digest ||
            authority.plan_revision !== plan.revision ||
            authority.provenance.kind !== "USER" ||
            authority.provenance.parent_authority_digest !== null ||
            authority.provenance.actor_id !== plan.approval_actor_id ||
            authority.provenance.evidence_digest !== plan.approval_evidence_digest
          )
            return [];
          return Object.values(aggregate.mutation_receipts).flatMap((receipt) => {
            const command: Extract<TaskCommand, { kind: "approve_plan" }> = {
              kind: "approve_plan",
              task_id: aggregate.id,
              expected_task_revision: receipt.before_revision,
              expected_state_fingerprint: authority.repository_fingerprint,
              plan_revision: plan.revision,
              plan_digest: plan.digest,
              approval_evidence_digest: approvalEvidence,
              authority_mode: approvalMode,
            };
            return receipt.before_revision >= taskRevision &&
              receipt.after_revision === receipt.before_revision + 1 &&
              receipt.command_digest === kernelDigest(command)
              ? [{ mutation_id: receipt.mutation_id, command, revision: receipt.after_revision }]
              : [];
          });
        });
        if (approved.length !== 1) return [];
        const approval = approved[0]!;
        approvals.push({ mutation_id: approval.mutation_id, command: approval.command });
        taskRevision = approval.revision;
      }
      previous = plan;
    }
    return [{ source, grant, grantCommand, proposals, approvals, amendments }];
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
