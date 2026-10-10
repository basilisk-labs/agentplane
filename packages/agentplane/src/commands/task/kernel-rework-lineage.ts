import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA, type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { isRecord } from "../../shared/guards.js";

type Plan = NonNullable<KernelRecord["aggregate"]["current_plan"]>;

export function authenticReworkEvent(
  record: KernelRecord,
  event: k.DomainEvent,
  command: k.TaskCommand,
): boolean {
  const receipt = record.aggregate.mutation_receipts[event.mutation_id];
  return (
    event.task_id === record.aggregate.id &&
    event.id === `${event.mutation_id}:${event.kind}` &&
    event.command_digest === k.kernelDigest(command) &&
    event.payload_digest ===
      k.kernelDigest({ kind: command.kind, aggregate_revision: event.task_revision }) &&
    receipt?.mutation_id === event.mutation_id &&
    receipt.command_digest === event.command_digest &&
    receipt.before_revision === command.expected_task_revision &&
    receipt.after_revision === event.task_revision &&
    event.task_revision === command.expected_task_revision + 1 &&
    receipt.event_digests.length === 1 &&
    receipt.event_digests[0] === k.kernelDigest(event)
  );
}

/** Find the last material target amendment, retaining every target-preserving successor. */
export function findReworkLineage(record: KernelRecord, target: string) {
  const current = record.aggregate.current_plan;
  if (current?.state !== "APPROVED") return null;
  const all = [...record.aggregate.plan_history, current];
  let originIndex = -1;
  for (let index = all.length - 1; index > 0; index--) {
    const before = all[index - 1]!.work_items.find((item) => item.id === target);
    const after = all[index]!.work_items.find((item) => item.id === target);
    if (!before || !after) return null;
    if (k.kernelDigest(before) !== k.kernelDigest(after)) {
      originIndex = index;
      break;
    }
  }
  if (originIndex < 1) return null;
  for (let index = originIndex; index < all.length; index++) {
    const source = all[index - 1]!,
      amended = all[index]!;
    const lineage = record.aggregate.authority_lineage ?? [];
    const continuation = lineage.findIndex(
      (entry) =>
        entry.observation?.kind === "plan_amendment" &&
        entry.authority.plan_digest === amended.digest,
    );
    const parent = lineage[continuation - 1]?.authority;
    if (
      !parent ||
      source.state !== "SUPERSEDED" ||
      amended.revision !== source.revision + 1 ||
      !/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(amended.approval_actor_id ?? "") ||
      source.digest !==
        k.kernelDigest({ revision: source.revision, work_items: source.work_items }) ||
      amended.digest !==
        k.kernelDigest({ revision: amended.revision, work_items: amended.work_items }) ||
      parent.plan_digest !== source.digest ||
      parent.plan_revision !== source.revision ||
      amended.approval_evidence_digest !==
        k.planScopeExpansionApprovalDigest({
          task_id: record.aggregate.id,
          current_plan_digest: source.digest,
          amended_plan_digest: amended.digest,
          actor_id: amended.approval_actor_id!,
        }) ||
      k.planAmendmentScopeRoots({ current: source, amended, authority: parent }) === null
    )
      return null;
  }
  return {
    source: all[originIndex - 1]!,
    origin: all[originIndex]!,
    current,
    plans: all.slice(originIndex),
  };
}

/** No contract subset search: the complete historical union must reproduce the native receipt. */
export function historicalAmendment(
  record: KernelRecord,
  plan: Plan,
  event: k.DomainEvent,
  fingerprint: k.Sha256Digest,
): k.TaskCommand | null {
  const plans = [
    ...record.aggregate.plan_history,
    ...(record.aggregate.current_plan ? [record.aggregate.current_plan] : []),
  ];
  const index = plans.findIndex((entry) => entry.digest === plan.digest);
  const source = plans[index - 1];
  if (!source || event.kind !== "plan_amended") return null;
  const contracts: NonNullable<KernelRecord["documents"]>["contracts"] = {};
  for (const historical of plans.slice(0, index + 1))
    for (const item of historical.work_items) {
      const contract = record.documents?.contracts[String(item.contract_digest)];
      if (!contract || k.kernelDigest(contract) !== item.contract_digest) return null;
      contracts[String(item.contract_digest)] = contract;
    }
  const amended = { revision: plan.revision, digest: plan.digest, work_items: plan.work_items };
  const command: k.TaskCommand = {
    kind: "amend_plan",
    task_id: record.aggregate.id,
    expected_task_revision: event.task_revision - 1,
    expected_state_fingerprint: fingerprint,
    plan_revision: source.revision,
    plan_digest: source.digest,
    amended_plan: amended,
    amendment_digest: k.kernelDigest(amended),
    authority_delta_digest: plan.approval_evidence_digest,
    work_contracts: contracts,
  };
  return authenticReworkEvent(record, event, command) ? command : null;
}

export async function retainedPrerequisiteStops(
  directory: string,
  record: KernelRecord,
  after: number,
) {
  const stops: { order: AgentWorkOrderV2; event: k.DomainEvent; command: k.TaskCommand }[] = [];
  for (const event of record.events.filter(
    (entry) => entry.task_revision > after && entry.mutation_id.startsWith("semantic-stop:"),
  )) {
    const id = event.mutation_id.slice("semantic-stop:".length);
    if (!/^sha256:[a-f0-9]{64}$/u.test(id)) throw new Error("Invalid retained stop identifier");
    const source = path.join(path.dirname(directory), id.slice(7));
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(source, "work-order.json"),
          "retained stop WorkOrder",
        ),
      ),
    );
    const saved: unknown = JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(source, "semantic-stop-command.json"),
        "retained stop command",
      ),
    );
    const binding = order.canonical_binding;
    if (
      !retainedIssuanceAuthority(record, order) ||
      !isRecord(saved) ||
      !isRecord(saved.command) ||
      order.work_order_id !== id ||
      binding?.phase !== "implementation" ||
      binding.task_id !== record.aggregate.id ||
      order.task.id !== binding.task_id ||
      order.task.work_item_id !== binding.work_item_id ||
      binding.repository_identity !== record.repository_identity ||
      saved.command.kind !== "transition_work_item" ||
      saved.command.action !== "block" ||
      saved.command.work_item_id !== binding.work_item_id ||
      saved.command.claim_id !== binding.claim_id ||
      !authenticReworkEvent(record, event, saved.command as k.TaskCommand)
    )
      throw new Error("Unauthenticated prerequisite stop");
    stops.push({ order, event, command: saved.command as k.TaskCommand });
  }
  return stops;
}

/** Authenticate the issuance candidate's actual root before inspecting its Plan epoch. */
function retainedApprovalRevision(
  record: KernelRecord,
  candidateIndex: number,
  issuedRevision: number,
): { rootIndex: number; revision: number } | null {
  const lineage = record.aggregate.authority_lineage ?? [];
  let index = candidateIndex;
  for (;;) {
    const entry = lineage[index];
    if (
      !entry ||
      lineage.filter((value) => value.authority.digest === entry.authority.digest).length !== 1
    )
      return null;
    const parent = entry.authority.provenance.parent_authority_digest;
    if (parent === null) break;
    const parentIndex = lineage.findIndex((value) => value.authority.digest === parent);
    if (parentIndex === -1 || parentIndex >= index) return null;
    index = parentIndex;
  }
  const entry = lineage[index]!;
  // Preserve the original initial-root contract for retained legacy histories.
  if (index === 0) return { rootIndex: index, revision: 0 };
  const plan = [...record.aggregate.plan_history, record.aggregate.current_plan].find(
    (value) =>
      value?.digest === entry.authority.plan_digest &&
      value.revision === entry.authority.plan_revision,
  );
  if (
    !plan?.approval_evidence_digest ||
    entry.observation !== null ||
    !entry.approval_mode ||
    entry.authority.provenance.actor_id !== plan.approval_actor_id ||
    entry.authority.provenance.evidence_digest !== plan.approval_evidence_digest
  )
    return null;
  const evidence = plan.approval_evidence_digest;
  const mode = entry.approval_mode;
  const approvals = record.events.filter(
    (event) =>
      event.kind === "plan_approved" &&
      event.task_revision <= issuedRevision &&
      authenticReworkEvent(record, event, {
        kind: "approve_plan",
        task_id: record.aggregate.id,
        expected_task_revision: event.task_revision - 1,
        expected_state_fingerprint: entry.authority.repository_fingerprint,
        plan_revision: plan.revision,
        plan_digest: plan.digest,
        approval_evidence_digest: evidence,
        authority_mode: mode,
      }),
  );
  return approvals.length === 1
    ? { rootIndex: index, revision: approvals[0]!.task_revision }
    : null;
}

/** Bind retained issuance authority to native lineage, including the real delegated projection. */
export function retainedIssuanceAuthority(record: KernelRecord, order: AgentWorkOrderV2): boolean {
  const binding = order.canonical_binding;
  if (binding?.phase !== "implementation" || order.task.revision === null) return false;
  const plan = [...record.aggregate.plan_history, record.aggregate.current_plan].find(
    (entry) => entry?.digest === binding.plan_digest,
  );
  const definition = plan?.work_items.find((item) => item.id === binding.work_item_id);
  if (!definition || !plan) return false;
  return (record.aggregate.authority_lineage ?? []).some((entry, index) => {
    const parent = entry.authority;
    if (
      parent.plan_digest !== binding.plan_digest ||
      parent.plan_revision !== binding.plan_revision ||
      parent.repository_fingerprint !== binding.repository_fingerprint
    )
      return false;
    const approval = retainedApprovalRevision(record, index, order.task.revision!);
    if (!approval) return false;
    const latest = record.events.findLast(
      (event) =>
        event.kind === "authority_continued" &&
        event.task_revision > approval.revision &&
        event.task_revision <= order.task.revision!,
    );
    if (
      latest
        ? !authenticReworkEvent(record, latest, {
            kind: "continue_authority",
            task_id: binding.task_id,
            expected_task_revision: latest.task_revision - 1,
            expected_state_fingerprint: parent.repository_fingerprint,
            record: entry,
          })
        : index !== approval.rootIndex
    )
      return false;
    const delegated = {
      ...parent,
      ...definition.execution_requirements,
      work_item_id: definition.id,
      provenance: {
        ...parent.provenance,
        kind: "DELEGATED" as const,
        actor_id: "agentplane:kernel-controller",
        parent_authority_digest: parent.digest,
      },
    };
    return (
      (binding.authority_digest === parent.digest ||
        binding.authority_digest === k.authorityDigest(delegated)) &&
      order.state_fingerprint.components.authority.digest ===
        k.kernelDigest({
          state: "present",
          source: "canonical_authority",
          value: { issued: binding.authority_digest, lineage: parent.digest },
        })
    );
  });
}

export function precedingStopContinuation(
  record: KernelRecord,
  prior: AgentWorkOrderV2,
  revision: number,
  fingerprint: unknown,
  roots: readonly string[],
): boolean {
  const binding = prior.canonical_binding!;
  let cursor = prior.task.revision!;
  let observed = binding.repository_fingerprint;
  const events = record.events.filter(
    (event) => event.task_revision > cursor && event.task_revision <= revision,
  );
  for (const event of events) {
    const receipt = record.aggregate.mutation_receipts[event.mutation_id];
    const continuation = record.aggregate.authority_lineage?.find(
      (entry) =>
        entry.observation?.kind === "repository_implementation" &&
        entry.observation.previous_fingerprint === observed &&
        entry.authority.plan_digest === binding.plan_digest &&
        entry.observation.changed_paths.every((changed) =>
          roots.some((root) => root === "." || changed === root || changed.startsWith(`${root}/`)),
        ) &&
        event.command_digest ===
          k.kernelDigest({
            kind: "continue_authority",
            task_id: binding.task_id,
            expected_task_revision: cursor,
            expected_state_fingerprint: entry.authority.repository_fingerprint,
            record: entry,
          }),
    );
    if (
      event.kind !== "authority_continued" ||
      event.task_revision !== cursor + 1 ||
      receipt?.before_revision !== cursor ||
      receipt.after_revision !== event.task_revision ||
      receipt.command_digest !== event.command_digest ||
      !continuation ||
      !authenticReworkEvent(record, event, {
        kind: "continue_authority",
        task_id: binding.task_id,
        expected_task_revision: cursor,
        expected_state_fingerprint: continuation.authority.repository_fingerprint,
        record: continuation,
      })
    )
      return false;
    cursor = event.task_revision;
    observed = continuation.authority.repository_fingerprint;
  }
  return cursor === revision && observed === fingerprint;
}
