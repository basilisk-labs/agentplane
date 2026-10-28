import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  authenticReworkEvent,
  findReworkLineage,
  historicalAmendment,
  historicalAmendmentWithFailedCheck,
} from "./kernel-rework-lineage.js";

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

export function unchangedApprovedPlanHistory(
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
