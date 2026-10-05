import {
  preserveCompletedRecipeContracts,
  validateKernelRecipeBindings,
} from "./kernel-recipe-admission.js";
import {
  taskKernel as k,
  kernelPlanInputSchema,
  resolveKernelPlanInput,
} from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { assertCanonicalPlanWithinExecutionContract } from "./kernel-plan-authority.js";
import { parseSuppliedPlanInput, prepareSuppliedPlan } from "./create-plan-input.js";
import { suppliedKernelProposal } from "./create-plan-proposal.js";
import { canonicalPlanFromProposal } from "./kernel-plan-proposal.js";
export { canonicalPlanFromProposal } from "./kernel-plan-proposal.js";

/** Explicit native planning entrypoint. The input describes intent and never carries approval. */
export async function setCanonicalPlan(
  command: CommandContext,
  taskId: string,
  value: unknown,
  options: { scopeExpansionApprovedBy?: string; expectedSuppliedInputDigest?: string } = {},
) {
  const supplied =
    typeof value === "object" &&
    value !== null &&
    "schema_version" in value &&
    !("kind" in value && value.kind === "plan_refinement")
      ? parseSuppliedPlanInput(value)
      : undefined;
  const direct = supplied ? undefined : kernelPlanInputSchema.parse(value);
  const runtime = await createKernelRuntime({
    command,
    task_id: taskId,
    transport: "manual",
    operation_id: `amend:${k.kernelDigest(supplied ?? direct)}`,
  });
  const read = await runtime.adapter.read(taskId);
  if (read.kind !== "canonical") throw new Error(`Explicit migration required: ${read.kind}`);
  const current = read.record.aggregate.current_plan;
  const currentContract = current?.work_items[0]?.contract_digest;
  const previousInputDigest = currentContract
    ? read.record.documents?.contracts[String(currentContract)]?.plan_input_digest
    : read.record.documents?.intent.plan_input_digest;
  const previousInput = previousInputDigest
    ? read.record.documents?.plan_inputs?.[previousInputDigest]
    : undefined;
  const input = supplied
    ? await prepareSuppliedPlan(command, taskId, supplied, previousInput)
    : undefined;
  const candidate = input
    ? suppliedKernelProposal(input, read.task)
    : resolveKernelPlanInput({
        task_id: taskId,
        value: direct,
        current: current ?? null,
        contracts: read.record.documents?.contracts ?? {},
      });
  const proposal = input?.recipe_provenance
    ? preserveCompletedRecipeContracts({
        proposal: candidate,
        aggregate: read.record.aggregate,
        documents: read.record.documents,
      })
    : candidate;
  if (
    options.expectedSuppliedInputDigest !== undefined &&
    (!input || k.kernelDigest(input) !== options.expectedSuppliedInputDigest)
  )
    throw new Error("Supplied Plan observation changed before proposal admission");
  const planInputs = input ? { [String(k.kernelDigest(input))]: input } : undefined;
  const plan = canonicalPlanFromProposal(proposal, (current?.revision ?? 0) + 1);
  assertCanonicalPlanWithinExecutionContract(read.task, plan);
  const contracts = proposal.work_items.map((item) => item.contract);
  await validateKernelRecipeBindings({
    command,
    task: read.task,
    plan,
    documents: read.record.documents
      ? {
          ...read.record.documents,
          plan_inputs: { ...read.record.documents.plan_inputs, ...planInputs },
          contracts: {
            ...read.record.documents.contracts,
            ...Object.fromEntries(
              contracts.map((contract) => [k.kernelDigest(contract), contract]),
            ),
          },
        }
      : undefined,
  });
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
  if (current?.state !== "APPROVED") {
    return requireKernelCommit(
      await runtime.lifecycle.apply(
        await runtime.input({ kind: "propose_plan", plan }, `plan:${plan.digest}`, true),
        contracts,
        planInputs,
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
      work_contracts: {
        ...read.record.documents?.contracts,
        ...Object.fromEntries(contracts.map((contract) => [k.kernelDigest(contract), contract])),
      },
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
  requireKernelCommit(
    await amendmentRuntime.lifecycle.apply(amendmentInput, contracts, planInputs),
  );
  // M1 compares all authority dimensions before native continuation binds the refined plan.
  return requireKernelCommit(await amendmentRuntime.authority.continue(taskId));
}
