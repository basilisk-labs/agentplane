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
  historicalAmendment,
  retainedIssuanceAuthority,
} from "./kernel-rework-lineage.js";

/** A new approved definition continues the retained scope stop, not an invented failed review. */
export async function scopeReplanInputs(
  order: AgentWorkOrderV2,
  directory: string,
  writeArtifact: (directory: string, name: string, value: unknown) => Promise<boolean>,
  record?: KernelRecord,
): Promise<AgentWorkOrderV2["required_inputs"]> {
  const binding = order.canonical_binding;
  if (!record || binding?.phase !== "implementation" || binding.attempt < 2) return [];
  const aggregate = record.aggregate;
  const current = aggregate.current_plan;
  const runtime = aggregate.work_items[binding.work_item_id];
  const definition = current?.work_items.find((item) => item.id === binding.work_item_id);
  if (
    current?.state !== "APPROVED" ||
    current.digest !== binding.plan_digest ||
    current.revision !== binding.plan_revision ||
    order.task.revision !== aggregate.revision ||
    binding.task_id !== aggregate.id ||
    binding.repository_identity !== record.repository_identity ||
    runtime?.state !== "EXECUTING" ||
    !definition ||
    k.kernelDigest(runtime.definition) !== k.kernelDigest(definition) ||
    runtime.attempt !== binding.attempt ||
    runtime.claim_id !== binding.claim_id ||
    runtime.result_digest !== null ||
    runtime.validation !== null ||
    runtime.output_manifests.length > 0 ||
    runtime.definition.contract_digest !== binding.contract_digest ||
    k.canonicalAuthorityIssues(aggregate).length > 0 ||
    !retainedIssuanceAuthority(record, order)
  )
    return [];
  const history = k.authenticatedScopeReplanHistory(aggregate, true, binding.work_item_id);
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
  if (
    !grantEvent ||
    record.events.filter((event) => event.mutation_id === grantEvent.mutation_id).length !== 1 ||
    !authenticReworkEvent(record, grantEvent, history.grantCommand)
  )
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
    if (
      matches.length !== 1 ||
      record.events.filter((event) => event.mutation_id === matches[0]!.mutation_id).length !== 1 ||
      !authenticReworkEvent(record, matches[0]!, proposal.command)
    )
      throw new Error("Scope replan proposal receipt is missing or ambiguous");
    if (proposal.mutation_id !== `plan:${proposal.command.plan.digest}`) {
      const savedProposal = (await read(
        path.join(root, proposal.mutation_id.slice("result:sha256:".length), "command-input.json"),
      )) as { command: k.TaskCommand };
      if (k.kernelDigest(savedProposal.command) !== k.kernelDigest(proposal.command))
        throw new Error("Scope replan proposal command changed");
    }
    proposalEvents.push(matches[0]!);
  }
  const approvalEvents: k.DomainEvent[] = [];
  for (const approval of history.approvals) {
    const events = record.events.filter(
      (event) => event.kind === "plan_approved" && event.mutation_id === approval.mutation_id,
    );
    if (
      events.length !== 1 ||
      record.events.filter((event) => event.mutation_id === events[0]!.mutation_id).length !== 1 ||
      !authenticReworkEvent(record, events[0]!, approval.command)
    )
      throw new Error("Scope replan approval receipt is missing or ambiguous");
    approvalEvents.push(events[0]!);
  }
  const amendmentEvents: k.DomainEvent[] = [];
  const plans = [...aggregate.plan_history, current];
  for (const amendment of history.amendments) {
    const plan = plans.find(
      (entry) =>
        entry.digest === amendment.plan.digest && entry.revision === amendment.plan.revision,
    );
    if (!plan) throw new Error("Scope replan amendment Plan is missing");
    const events = record.events.filter(
      (event) =>
        event.kind === "plan_amended" &&
        historicalAmendment(record, plan, event, amendment.fingerprint),
    );
    if (
      events.length !== 1 ||
      record.events.filter((event) => event.mutation_id === events[0]!.mutation_id).length !== 1
    )
      throw new Error("Scope replan amendment receipt is missing or ambiguous");
    amendmentEvents.push(events[0]!);
  }
  let revision = grantEvent.task_revision;
  for (const plan of plans.filter((plan) => plan.revision > source.revision)) {
    const proposal = history.proposals.find((entry) => entry.command.plan.digest === plan.digest);
    const event = proposal
      ? proposalEvents.find((entry) => entry.mutation_id === proposal.mutation_id)
      : amendmentEvents.find((entry) =>
          historicalAmendment(
            record,
            plan,
            entry,
            history.amendments.find((amendment) => amendment.plan.digest === plan.digest)!
              .fingerprint,
          ),
        );
    if (!event || event.task_revision <= revision)
      throw new Error("Scope replan history is out of order");
    revision = event.task_revision;
    if (proposal) {
      const approval = history.approvals.find((entry) => entry.command.plan_digest === plan.digest);
      const approved = approvalEvents.find((entry) => entry.mutation_id === approval?.mutation_id);
      if (!approved || approved.task_revision <= revision)
        throw new Error("Scope replan approval is out of order");
      revision = approved.task_revision;
    }
  }
  if (revision > aggregate.revision) throw new Error("Scope replan history is in the future");
  const context = {
    kind: "approved_scope_replan",
    grants_authority: false,
    request,
    grant,
    source_plan: source,
    approved_plan: current,
    grant_event: grantEvent,
    proposal_events: proposalEvents,
    approval_events: approvalEvents,
    amendment_events: amendmentEvents,
    result_authentication: request.result_authentication,
  };
  const filename = "scope-replan-context.json";
  await writeArtifact(directory, filename, context);
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
