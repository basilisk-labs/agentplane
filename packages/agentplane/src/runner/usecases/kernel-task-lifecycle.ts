import { taskKernel } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import type {
  KernelBackendAdapter,
  KernelAdapterResult,
  KernelCommandInput,
} from "../../adapters/task-backend/kernel-backend-adapter.js";
import {
  kernelIntentSchema,
  kernelWorkContractSchema,
  type KernelIntent,
  type KernelWorkContract,
} from "../../adapters/task-backend/kernel-documents.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readKernelNextAction } from "../../adapters/task-backend/kernel-next-action.js";

export type KernelWorkBinding = Readonly<{
  task_id: string;
  plan_revision: number;
  plan_digest: taskKernel.Sha256Digest;
  work_item_id: string;
  contract_digest: taskKernel.Sha256Digest;
  attempt: number;
  claim_id: string;
  repository_fingerprint: taskKernel.Sha256Digest;
}>;

export type KernelWorkOrder = Readonly<{
  schema_version: 1;
  kind: "kernel_work_order";
  id: taskKernel.Sha256Digest;
  binding: KernelWorkBinding;
  contract: KernelWorkContract;
  inputs: readonly taskKernel.OutputManifest[];
  expected_outputs: readonly string[];
  authority: taskKernel.ExecutionAuthority;
}>;

function unavailable(code: string): KernelAdapterResult {
  return { kind: "unavailable", code: "malformed", facts: [code] };
}

const lifecycleCommands = new Set<taskKernel.TaskCommand["kind"]>([
  "propose_plan",
  "reject_plan",
  "approve_plan",
  "materialize_work_items",
  "amend_plan",
  "transition_work_item",
  "accept_work_item_result",
  "record_work_item_validation",
  "record_final_validation",
  "transition_task",
  "complete_task",
]);

/** Shared application boundary for host and managed transports. It never issues user authority. */
export class KernelTaskLifecycle {
  constructor(private readonly adapter: KernelBackendAdapter) {}

  async read(taskId: string, fingerprint: taskKernel.Sha256Digest | null) {
    const read = await this.adapter.read(taskId);
    return { read, next_action: readKernelNextAction(read, fingerprint) };
  }

  async create(
    task: TaskData,
    intent: KernelIntent,
    input: KernelCommandInput,
  ): Promise<KernelAdapterResult> {
    if (!kernelIntentSchema.safeParse(intent).success) return unavailable("invalid_intent");
    if (
      input.command.kind !== "capture_intent" ||
      input.command.intent_digest !== taskKernel.kernelDigest(intent)
    )
      return unavailable("intent_binding_mismatch");
    return this.adapter.create(task, input, { intent, contracts: {} });
  }

  async apply(
    input: KernelCommandInput,
    contracts: readonly KernelWorkContract[] = [],
  ): Promise<KernelAdapterResult> {
    if (input.command.kind === "transition_work_item" && input.command.action === "begin")
      return unavailable("begin_boundary_required");
    return this.applyInput(input, contracts);
  }

  private async applyInput(
    input: KernelCommandInput,
    contracts: readonly KernelWorkContract[] = [],
  ): Promise<KernelAdapterResult> {
    if (!lifecycleCommands.has(input.command.kind)) return unavailable("not_a_lifecycle_command");
    const read = await this.adapter.read(input.command.task_id);
    if (read.kind !== "canonical") return this.adapter.execute(input);
    if (!read.record.documents) return unavailable("document_migration_required");
    if (input.command.kind === "accept_work_item_result")
      return unavailable("result_binding_required");
    if (contracts.length === 0) return this.adapter.execute(input);
    if (input.command.kind !== "propose_plan" && input.command.kind !== "amend_plan")
      return unavailable("unexpected_contracts");
    if (contracts.some((contract) => !kernelWorkContractSchema.safeParse(contract).success))
      return unavailable("invalid_work_contract");
    const documents = {
      intent: read.record.documents.intent,
      contracts: {
        ...read.record.documents.contracts,
        ...Object.fromEntries(
          contracts.map((contract) => [taskKernel.kernelDigest(contract), contract]),
        ),
      },
    };
    return this.adapter.execute(input, documents);
  }

  /** Only a fresh successful begin owns dispatch. A replay never launches a second agent. */
  async begin(
    input: KernelCommandInput,
  ): Promise<{ result: KernelAdapterResult; work_order: KernelWorkOrder | null }> {
    if (input.command.kind !== "transition_work_item" || input.command.action !== "begin")
      return { result: unavailable("begin_command_required"), work_order: null };
    const read = await this.adapter.read(input.command.task_id);
    if (
      read.kind === "canonical" &&
      Object.hasOwn(read.record.aggregate.mutation_receipts, input.mutation_id)
    )
      return { result: await this.applyInput(input), work_order: null };
    if (
      read.kind === "canonical" &&
      read.record.aggregate.work_items[input.command.work_item_id]?.claim_id !==
        input.command.claim_id
    )
      return { result: unavailable("claim_binding_mismatch"), work_order: null };
    const prepared =
      read.kind === "canonical" && input.authority && input.repository_fingerprint
        ? this.workOrder(
            read.record,
            input.command.work_item_id,
            input.authority,
            input.repository_fingerprint,
          )
        : null;
    if (read.kind === "canonical" && input.authority && input.repository_fingerprint && !prepared)
      return { result: unavailable("work_order_contract_or_authority_invalid"), work_order: null };
    const result = await this.applyInput(input);
    if (
      result.kind !== "committed" ||
      result.replayed ||
      !input.authority ||
      !input.repository_fingerprint
    )
      return { result, work_order: null };
    return {
      result,
      work_order: prepared,
    };
  }

  private workOrder(
    record: KernelRecord,
    workItemId: string,
    authority: taskKernel.ExecutionAuthority,
    fingerprint: taskKernel.Sha256Digest,
  ): KernelWorkOrder | null {
    const aggregate = record.aggregate;
    const plan = aggregate.current_plan;
    const item = aggregate.work_items[workItemId];
    const digest = item?.definition.contract_digest;
    const contractKey: string = digest ?? "";
    const contract = record.documents?.contracts[contractKey];
    if (
      !plan ||
      !item?.claim_id ||
      !digest ||
      !contract ||
      !["CLAIMED", "EXECUTING"].includes(item.state)
    )
      return null;
    const binding: KernelWorkBinding = {
      task_id: aggregate.id,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      work_item_id: workItemId,
      contract_digest: digest,
      attempt: item.attempt,
      claim_id: item.claim_id,
      repository_fingerprint: fingerprint,
    };
    const inputs = Object.values(aggregate.work_items)
      .filter((source) => source.state === "COMPLETED")
      .flatMap((source) => source.output_manifests)
      .filter((manifest) => item.definition.required_inputs.includes(manifest.id));
    const delegated = {
      ...authority,
      ...item.definition.execution_requirements,
      work_item_id: workItemId,
      provenance: {
        ...authority.provenance,
        kind: "DELEGATED" as const,
        parent_authority_digest: authority.digest,
      },
    };
    const { digest: parentDigest, ...authorityContents } = delegated;
    void parentDigest;
    const boundedAuthority = {
      ...authorityContents,
      digest: taskKernel.kernelDigest(authorityContents),
    };
    if (!taskKernel.compareExecutionAuthority(authority, boundedAuthority).ok) return null;
    const contents = {
      schema_version: 1 as const,
      kind: "kernel_work_order" as const,
      binding,
      contract,
      inputs,
      expected_outputs: item.definition.expected_outputs,
      authority: boundedAuthority,
    };
    return { ...contents, id: taskKernel.kernelDigest(contents) };
  }

  async receiveResult(
    input: KernelCommandInput,
    binding: KernelWorkBinding,
  ): Promise<KernelAdapterResult> {
    const command = input.command;
    if (command.kind !== "accept_work_item_result") return unavailable("result_command_required");
    const read = await this.adapter.read(command.task_id);
    if (read.kind !== "canonical") return this.adapter.execute(input);
    if (!read.record.documents) return unavailable("document_migration_required");
    const aggregate = read.record.aggregate;
    const bindingDigest = taskKernel.kernelDigest(binding);
    if (command.binding_digest !== undefined && command.binding_digest !== bindingDigest)
      return unavailable("result_binding_digest_mismatch");
    const boundInput = { ...input, command: { ...command, binding_digest: bindingDigest } };
    if (Object.hasOwn(aggregate.mutation_receipts, input.mutation_id))
      return this.adapter.execute(boundInput);
    const item = aggregate.work_items[command.work_item_id];
    if (
      !item ||
      binding.task_id !== command.task_id ||
      binding.work_item_id !== command.work_item_id ||
      binding.plan_revision !== command.plan_revision ||
      binding.plan_digest !== command.plan_digest ||
      binding.contract_digest !== item.definition.contract_digest ||
      binding.attempt !== item.attempt ||
      binding.claim_id !== item.claim_id ||
      binding.repository_fingerprint !== input.repository_fingerprint ||
      command.output_manifests.some(
        (output) =>
          output.attempt !== binding.attempt ||
          output.repository_fingerprint !== binding.repository_fingerprint,
      )
    )
      return unavailable("result_binding_mismatch");
    return this.adapter.execute(boundInput);
  }
}
