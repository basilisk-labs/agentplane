import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import {
  authenticReworkEvent,
  precedingStopContinuation,
  retainedIssuanceAuthority,
} from "./kernel-rework-lineage.js";

/** A rejected blocked Plan supplies context, never a substitute approval or failed review. */
export async function rejectedPlanInputs(
  order: AgentWorkOrderV2,
  directory: string,
  record: KernelRecord | undefined,
  writeArtifact: (directory: string, name: string, value: unknown) => Promise<boolean>,
): Promise<AgentWorkOrderV2["required_inputs"]> {
  const binding = order.canonical_binding;
  if (!record || binding?.phase !== "implementation" || binding.attempt < 2) return [];
  const state = record.aggregate;
  const current = state.current_plan;
  const source = state.plan_history.at(-1);
  const runtime = state.work_items[binding.work_item_id];
  if (
    current?.state !== "APPROVED" ||
    source?.state !== "REJECTED" ||
    current.revision !== source.revision + 1 ||
    current.digest !== binding.plan_digest ||
    current.revision !== binding.plan_revision ||
    state.id !== binding.task_id ||
    order.task.id !== binding.task_id ||
    order.task.work_item_id !== binding.work_item_id ||
    record.repository_identity !== binding.repository_identity ||
    order.task.revision !== state.revision ||
    runtime?.state !== "EXECUTING" ||
    runtime.attempt !== binding.attempt ||
    runtime.claim_id !== binding.claim_id ||
    runtime.definition.contract_digest !== binding.contract_digest ||
    runtime.result_digest !== null ||
    runtime.validation !== null ||
    runtime.output_manifests.length > 0 ||
    k.canonicalAuthorityIssues(state).length > 0 ||
    !retainedIssuanceAuthority(record, order)
  )
    return [];
  const previous = source.work_items.find((item) => item.id === binding.work_item_id);
  if (
    !previous ||
    source.digest !==
      k.kernelDigest({ revision: source.revision, work_items: source.work_items }) ||
    current.digest !==
      k.kernelDigest({ revision: current.revision, work_items: current.work_items })
  )
    return [];
  const candidates = record.events.filter(
    (event) =>
      event.kind === "plan_rejected" && /^reject:sha256:[a-f0-9]{64}$/u.test(event.mutation_id),
  );
  const fingerprint = binding.repository_fingerprint as k.Sha256Digest;
  const rejection = candidates.filter((event) =>
    authenticReworkEvent(record, event, {
      kind: "reject_plan",
      task_id: state.id,
      expected_task_revision: event.task_revision - 1,
      expected_state_fingerprint: fingerprint,
      plan_revision: source.revision,
      plan_digest: source.digest,
      rejection_evidence_digest: event.mutation_id.slice("reject:".length) as k.Sha256Digest,
    }),
  );
  if (rejection.length !== 1) return [];
  const rejected = rejection[0]!;
  const stops = record.events.filter(
    (event) =>
      event.task_revision === rejected.task_revision - 1 &&
      /^semantic-stop:sha256:[a-f0-9]{64}$/u.test(event.mutation_id),
  );
  if (stops.length !== 1) return [];
  const stopped = stops[0]!;
  const oldId = stopped.mutation_id.slice("semantic-stop:".length);
  const oldDirectory = path.join(path.dirname(directory), oldId.slice(7));
  const read = async (name: string): Promise<unknown> =>
    JSON.parse(
      await readStableRegularTextNoFollow(path.join(oldDirectory, name), "rejected Plan evidence", {
        max_bytes: 1024 * 1024,
      }),
    );
  const oldOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(await read("work-order.json"));
  const result = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(await read("received-result.json"));
  const saved = (await read("semantic-stop-command.json")) as { command: k.TaskCommand };
  const old = oldOrder.canonical_binding;
  if (
    old?.phase !== "implementation" ||
    oldOrder.work_order_id !== oldId ||
    oldOrder.role !== "EXECUTOR" ||
    oldOrder.task.id !== binding.task_id ||
    oldOrder.task.work_item_id !== binding.work_item_id ||
    result.work_order_id !== oldId ||
    result.status !== "blocked" ||
    k.kernelDigest(result.canonical_binding) !== k.kernelDigest(old) ||
    old.task_id !== binding.task_id ||
    old.repository_identity !== binding.repository_identity ||
    old.plan_digest !== source.digest ||
    old.plan_revision !== source.revision ||
    old.work_item_id !== binding.work_item_id ||
    old.contract_digest !== previous.contract_digest ||
    old.attempt !== binding.attempt - 1 ||
    !retainedIssuanceAuthority(record, oldOrder) ||
    saved.command.kind !== "transition_work_item" ||
    saved.command.action !== "block" ||
    saved.command.work_item_id !== old.work_item_id ||
    saved.command.claim_id !== old.claim_id ||
    saved.command.semantic_result_digest !== k.kernelDigest(result) ||
    !authenticReworkEvent(record, stopped, saved.command) ||
    !precedingStopContinuation(
      record,
      oldOrder,
      stopped.task_revision - 1,
      fingerprint,
      previous.execution_requirements.scope_roots,
    )
  ) {
    throw new Error("Rejected Plan stop does not authenticate the preceding blocked attempt");
  }
  const issued = record.events.filter((event) => event.task_revision === oldOrder.task.revision);
  if (
    issued.length !== 1 ||
    !authenticReworkEvent(record, issued[0]!, {
      kind: "transition_work_item",
      task_id: state.id,
      expected_task_revision: issued[0]!.task_revision - 1,
      expected_state_fingerprint: old.repository_fingerprint as k.Sha256Digest,
      work_item_id: old.work_item_id,
      action: "begin",
      claim_id: old.claim_id,
    })
  )
    throw new Error("Rejected Plan stop lacks its native implementation begin receipt");
  const entry = state.authority_lineage?.find(
    (candidate) =>
      candidate.authority.plan_digest === current.digest &&
      candidate.authority.provenance.parent_authority_digest === null,
  );
  if (
    !entry?.approval_mode ||
    !current.approval_evidence_digest ||
    !current.approval_actor_id ||
    entry.authority.provenance.actor_id !== current.approval_actor_id ||
    entry.authority.provenance.evidence_digest !== current.approval_evidence_digest
  )
    return [];
  const events = record.events.filter((event) => event.task_revision > rejected.task_revision);
  const kinds = [
    "plan_proposed",
    "plan_approved",
    "work_item_transitioned",
    "work_item_transitioned",
  ];
  if (events.length !== kinds.length) return [];
  for (const [index, event] of events.entries()) {
    if (event.kind !== kinds[index] || event.task_revision !== rejected.task_revision + index + 1)
      return [];
    const base = {
      task_id: state.id,
      expected_task_revision: event.task_revision - 1,
      expected_state_fingerprint: fingerprint,
    };
    const command: k.TaskCommand =
      index === 0
        ? {
            ...base,
            kind: "propose_plan",
            plan: {
              ...current,
              state: "PROPOSED",
              approval_actor_id: null,
              approval_evidence_digest: null,
            },
          }
        : index === 1
          ? {
              ...base,
              kind: "approve_plan",
              plan_revision: current.revision,
              plan_digest: current.digest,
              approval_evidence_digest: current.approval_evidence_digest,
              authority_mode: entry.approval_mode,
            }
          : {
              ...base,
              kind: "transition_work_item",
              work_item_id: binding.work_item_id,
              action: index === 2 ? "claim" : "begin",
              claim_id: binding.claim_id,
            };
    if (!authenticReworkEvent(record, event, command)) return [];
  }
  if (events.at(-1)?.task_revision !== state.revision) return [];
  const context = {
    kind: "approved_rejected_plan",
    grants_authority: false,
    source_plan: source,
    approved_plan: current,
    rejected,
    stop: stopped,
    events,
  };
  const name = "rejected-plan-context.json";
  await writeArtifact(directory, name, context);
  return [
    {
      id: "preceding-blocked-result",
      kind: "source_artifact",
      path: path.join(oldDirectory, "received-result.json"),
      digest: k.kernelDigest(result),
      description: "Authentic preceding blocked semantic result. Digest uses canonical JSON.",
      required: true,
    },
    {
      id: "approved-rejected-plan",
      kind: "source_artifact",
      path: path.join(directory, name),
      digest: k.kernelDigest(context),
      description:
        "Native blocked Plan rejection and approved successor context. This grants no authority. Digest uses canonical JSON.",
      required: true,
    },
  ];
}
