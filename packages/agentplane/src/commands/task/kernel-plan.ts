import {
  taskKernel as k,
  kernelPlanProposalSchema,
  type KernelPlanProposal,
} from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { assertCanonicalPlanWithinExecutionContract } from "./kernel-plan-authority.js";

export function canonicalPlanFromProposal(
  proposal: KernelPlanProposal,
  revision: number,
): k.PlanRecord {
  const definitions: k.WorkItemDefinition[] = proposal.work_items.map(
    ({ contract, ...definition }) => ({ ...definition, contract_digest: k.kernelDigest(contract) }),
  );
  const issues = k.validateWorkItemDefinitions(definitions);
  if (issues.length > 0) throw new Error(`Invalid canonical plan: ${issues.join(", ")}`);
  return {
    revision,
    digest: k.kernelDigest({ revision, work_items: definitions }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items: definitions,
  };
}

/** Explicit native planning entrypoint. The input describes intent and never carries approval. */
export async function setCanonicalPlan(
  command: CommandContext,
  taskId: string,
  value: unknown,
  options: { scopeExpansionApprovedBy?: string } = {},
) {
  const proposal = kernelPlanProposalSchema.parse(value);
  const runtime = await createKernelRuntime({
    command,
    task_id: taskId,
    transport: "manual",
    operation_id: `amend:${k.kernelDigest(proposal)}`,
  });
  const read = await runtime.adapter.read(taskId);
  if (read.kind !== "canonical") throw new Error(`Explicit migration required: ${read.kind}`);
  const current = read.record.aggregate.current_plan;
  if (
    current &&
    k.kernelDigest(canonicalPlanFromProposal(proposal, current.revision).work_items) ===
      k.kernelDigest(current.work_items)
  ) {
    const parent = read.record.aggregate.authority_lineage?.at(-1)?.authority;
    if (current.state === "APPROVED" && parent?.plan_digest !== current.digest)
      return requireKernelCommit(await runtime.authority.continue(taskId));
    return { kind: "committed" as const, record: read.record, receipts: [], replayed: true };
  }
  const plan = canonicalPlanFromProposal(proposal, (current?.revision ?? 0) + 1);
  assertCanonicalPlanWithinExecutionContract(read.task, plan);
  const contracts = proposal.work_items.map((item) => item.contract);
  if (current?.state !== "APPROVED") {
    return requireKernelCommit(
      await runtime.lifecycle.apply(
        await runtime.input({ kind: "propose_plan", plan }, `plan:${plan.digest}`, true),
        contracts,
      ),
    );
  }
  const amended = { revision: plan.revision, digest: plan.digest, work_items: plan.work_items };
  const approvalDigest = options.scopeExpansionApprovedBy
    ? k.planScopeExpansionApprovalDigest({
        task_id: taskId,
        current_plan_digest: current.digest,
        amended_plan_digest: amended.digest,
        actor_id: options.scopeExpansionApprovedBy,
      })
    : null;
  const amendmentRuntime = approvalDigest
    ? await createKernelRuntime({
        command,
        task_id: taskId,
        transport: "manual",
        operation_id: `amend-user:${approvalDigest}`,
        approval: {
          kind: "manual_operator",
          actor_id: options.scopeExpansionApprovedBy!,
          invocation_id: approvalDigest,
        },
      })
    : runtime;
  let amendmentInput = await amendmentRuntime.input(
    {
      kind: "amend_plan",
      plan_revision: current.revision,
      plan_digest: current.digest,
      amended_plan: amended,
      amendment_digest: k.kernelDigest(amended),
      authority_delta_digest: approvalDigest,
    },
    `amend:${plan.digest}`,
  );
  if (approvalDigest) {
    const approval = await amendmentRuntime.native.readApproval(taskId);
    if (
      approval?.kind !== "manual_operator" ||
      approval.actor_id !== options.scopeExpansionApprovedBy ||
      approval.invocation_id !== approvalDigest
    )
      throw new Error("Canonical plan scope expansion requires exact manual USER approval");
    amendmentInput = {
      ...amendmentInput,
      actor: { ...amendmentInput.actor, id: approval.actor_id, kind: "USER" },
    };
  }
  requireKernelCommit(await amendmentRuntime.lifecycle.apply(amendmentInput, contracts));
  // M1 compares all authority dimensions before native continuation binds the refined plan.
  return requireKernelCommit(await amendmentRuntime.authority.continue(taskId));
}
