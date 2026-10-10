import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { authenticReworkEvent, retainedIssuanceAuthority } from "./kernel-rework-lineage.js";
import { writeKernelArtifact } from "./kernel-exchange.js";

/** A new approved definition continues the retained scope stop, not an invented failed review. */
export async function scopeReplanInputs(
  order: AgentWorkOrderV2,
  directory: string,
  record?: KernelRecord,
): Promise<AgentWorkOrderV2["required_inputs"]> {
  const binding = order.canonical_binding;
  if (!record || binding?.phase !== "implementation" || binding.attempt < 2) return [];
  const aggregate = record.aggregate;
  const current = aggregate.current_plan;
  const runtime = aggregate.work_items[binding.work_item_id];
  if (
    current?.state !== "APPROVED" ||
    current.digest !== binding.plan_digest ||
    current.revision !== binding.plan_revision ||
    order.task.revision !== aggregate.revision ||
    binding.task_id !== aggregate.id ||
    binding.repository_identity !== record.repository_identity ||
    runtime?.state !== "EXECUTING" ||
    runtime.attempt !== binding.attempt ||
    runtime.claim_id !== binding.claim_id ||
    runtime.result_digest !== null ||
    runtime.validation !== null ||
    runtime.output_manifests.length > 0 ||
    runtime.definition.contract_digest !== binding.contract_digest ||
    k.canonicalAuthorityIssues(aggregate).length > 0
  )
    return [];
  const history = k.authenticatedScopeReplanHistory(aggregate, true);
  const source = history?.source;
  const previous = source?.work_items.find((item) => item.id === binding.work_item_id);
  if (
    !history ||
    !source ||
    !previous ||
    k.kernelDigest(previous) === k.kernelDigest(runtime.definition)
  )
    return [];
  const grant = history.grant;
  const request = grant.observation!.scope_request!;
  if (
    request.work_item_id !== binding.work_item_id ||
    request.contract_digest !== previous.contract_digest ||
    request.attempt !== binding.attempt - 1
  )
    return [];
  const grantEvent = record.events.find(
    (event) => event.mutation_id === `scope-request:${k.kernelDigest(request)}`,
  );
  if (!grantEvent || !authenticReworkEvent(record, grantEvent, history.grantCommand))
    throw new Error("Scope replan grant has no authentic native receipt");
  const root = path.dirname(directory);
  const oldDirectory = path.join(root, request.work_order_id.slice(7));
  const read = async (file: string): Promise<unknown> =>
    JSON.parse(
      await readStableRegularTextNoFollow(file, "scope replan evidence", {
        max_bytes: 1024 * 1024,
      }),
    );
  const oldOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
    await read(path.join(oldDirectory, "work-order.json")),
  );
  const stopPath = path.join(oldDirectory, "received-result.json");
  const stop = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(await read(stopPath));
  const saved = (await read(path.join(oldDirectory, "semantic-stop-command.json"))) as {
    command: k.TaskCommand;
  };
  const stopEvent = record.events.find(
    (event) => event.mutation_id === `semantic-stop:${request.work_order_id}`,
  );
  const old = stop.canonical_binding;
  if (
    !stopEvent ||
    !authenticReworkEvent(record, stopEvent, saved.command) ||
    saved.command.kind !== "transition_work_item" ||
    saved.command.action !== "block" ||
    saved.command.work_item_id !== binding.work_item_id ||
    saved.command.claim_id !== request.claim_id ||
    (saved.command.semantic_result_digest !== undefined &&
      saved.command.semantic_result_digest !== request.result_digest) ||
    stopEvent.task_revision > request.task_revision ||
    !retainedIssuanceAuthority(record, oldOrder) ||
    oldOrder.work_order_id !== request.work_order_id ||
    stop.work_order_id !== request.work_order_id ||
    k.kernelDigest(oldOrder.canonical_binding) !== k.kernelDigest(old) ||
    k.kernelDigest(stop) !== request.result_digest ||
    stop.status !== "blocked" ||
    old?.phase !== "implementation" ||
    old.task_id !== aggregate.id ||
    old.repository_identity !== record.repository_identity ||
    old.plan_digest !== source.digest ||
    old.plan_revision !== source.revision ||
    old.work_item_id !== binding.work_item_id ||
    old.contract_digest !== previous.contract_digest ||
    old.attempt !== request.attempt ||
    old.claim_id !== request.claim_id
  )
    throw new Error("Scope replan stop does not bind the preceding attempt");
  const proposalEvents: k.DomainEvent[] = [];
  for (const proposal of history.proposals) {
    const matches = record.events.filter(
      (event) => event.kind === "plan_proposed" && event.mutation_id === proposal.mutation_id,
    );
    if (matches.length !== 1 || !authenticReworkEvent(record, matches[0]!, proposal.command))
      throw new Error("Scope replan proposal receipt is missing or ambiguous");
    const savedProposal = (await read(
      path.join(root, proposal.mutation_id.slice("result:sha256:".length), "command-input.json"),
    )) as { command: k.TaskCommand };
    if (k.kernelDigest(savedProposal.command) !== k.kernelDigest(proposal.command))
      throw new Error("Scope replan proposal command changed");
    proposalEvents.push(matches[0]!);
  }
  const last = history.proposals.at(-1)?.command.plan;
  if (
    last?.digest !== current.digest ||
    last.revision !== current.revision ||
    !current.approval_actor_id ||
    !current.approval_evidence_digest
  )
    throw new Error("Scope replan current approved Plan is not the authenticated successor");
  const context = {
    kind: "approved_scope_replan",
    grants_authority: false,
    request,
    grant,
    source_plan: source,
    approved_plan: current,
    grant_event: grantEvent,
    proposal_events: proposalEvents,
    result_authentication: request.result_authentication,
  };
  const filename = "scope-replan-context.json";
  await writeKernelArtifact(directory, filename, context);
  return [
    {
      id: `scope-stop:${request.work_order_id}`,
      kind: "source_artifact",
      path: stopPath,
      digest: request.result_digest,
      required: true,
      description:
        "Retained scope blocker from the preceding attempt. Canonical JSON digest; preserve stated authentication provenance.",
    },
    {
      id: "approved-scope-replan",
      kind: "source_artifact",
      path: path.join(directory, filename),
      digest: k.kernelDigest(context),
      required: true,
      description:
        "Native scope grant and freshly approved replacement Plan. This is scope replanning, not a failed check or review. Canonical JSON digest.",
    },
  ];
}
