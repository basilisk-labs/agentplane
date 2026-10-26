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
import { readdir } from "node:fs/promises";
import path from "node:path";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { kernelExchangeDirectory } from "./kernel-exchange.js";
export { canonicalPlanFromProposal } from "./kernel-plan-proposal.js";

async function failedRequiredCheckEvidence(
  command: CommandContext,
  taskId: string,
  workOrderId: string,
  current: { work_items: readonly { id: string; contract_digest?: string }[] },
  proposal: {
    work_items: readonly { id: string; contract: { verification_commands: readonly string[] } }[];
  },
  contracts: Readonly<Record<string, { verification_commands: readonly string[] }>>,
) {
  const changed = proposal.work_items.flatMap((item) => {
    const original = current.work_items.find((candidate) => candidate.id === item.id);
    const before = original?.contract_digest && contracts[original.contract_digest];
    if (!before) return [];
    const differences = before.verification_commands.flatMap((check, index) =>
      check === item.contract.verification_commands[index]
        ? []
        : [
            {
              work_item_id: item.id,
              previous_command: check,
              replacement_command: item.contract.verification_commands[index],
            },
          ],
    );
    return differences;
  });
  if (changed.length !== 1 || !changed[0]?.replacement_command)
    throw new Error("Required check correction must replace exactly one command");
  const directory = await kernelExchangeDirectory(command, taskId, workOrderId);
  const acceptedResultCommand = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "command-input.json"),
      "accepted result command for failed check",
    ),
  ) as unknown;
  const failedWorkOrder = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "work-order.json"),
      "issued WorkOrder for failed check",
    ),
  ) as unknown;
  const validationCommand = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "validation-command.json"),
      "failed required check validation command",
    ),
  ) as { command?: { validation?: { evidence_digests?: string[] } } };
  const evidenceDigest = validationCommand.command?.validation?.evidence_digests?.[0];
  const files = await readdir(directory);
  const nativeFiles = files.filter((name) => /^native-validation-[a-f0-9]{64}\.json$/u.test(name));
  const matching = [];
  for (const name of nativeFiles) {
    const value: unknown = JSON.parse(
      await readStableRegularTextNoFollow(path.join(directory, name), "native failed check"),
    );
    if (k.kernelDigest(value) === evidenceDigest) matching.push(value);
  }
  if (matching.length !== 1) throw new Error("Native failed-check evidence is unavailable");
  return {
    work_item_id: changed[0].work_item_id,
    failed_work_order_id: workOrderId as k.Sha256Digest,
    previous_command: changed[0].previous_command,
    replacement_command: changed[0].replacement_command,
    failed_work_order: failedWorkOrder,
    accepted_result_command_input: acceptedResultCommand,
    validation_command_input: validationCommand,
    native_validation: matching[0],
  };
}

/** Explicit native planning entrypoint. The input describes intent and never carries approval. */
export async function setCanonicalPlan(
  command: CommandContext,
  taskId: string,
  value: unknown,
  options: {
    scopeExpansionApprovedBy?: string;
    expectedSuppliedInputDigest?: string;
    correctiveGrantDigest?: k.Sha256Digest;
    failedCheckWorkOrder?: string;
  } = {},
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
  if (options.failedCheckWorkOrder && options.scopeExpansionApprovedBy !== "USER")
    throw new Error("Required check correction requires exact USER authority");
  const checkCorrection = options.failedCheckWorkOrder
    ? await failedRequiredCheckEvidence(
        command,
        taskId,
        options.failedCheckWorkOrder,
        current,
        proposal,
        read.record.documents?.contracts ?? {},
      )
    : null;
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
      ...(checkCorrection ? { required_check_correction: checkCorrection } : {}),
      ...(options.correctiveGrantDigest
        ? {
            corrective_grant_digest: options.correctiveGrantDigest,
            verification_contract_digest: k.kernelDigest(read.task.execution_contract ?? null),
          }
        : {}),
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
