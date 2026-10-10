import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
} from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import type { KernelNativeValidationEvidence } from "./kernel-inspection-validation.js";

async function readJson(file: string): Promise<unknown> {
  return JSON.parse(
    await readStableRegularTextNoFollow(file, "completion restoration evidence", {
      max_bytes: 1024 * 1024,
    }),
  );
}

function boundReceipt(record: KernelRecord, mutationId: string, command: k.TaskCommand) {
  const receipt = record.aggregate.mutation_receipts[mutationId];
  if (
    receipt?.command_digest !== k.kernelDigest(command) ||
    receipt.before_revision !== command.expected_task_revision ||
    command.task_id !== record.aggregate.id
  )
    throw new Error("Completion restoration command has no matching native receipt");
  return { mutation_id: mutationId, command };
}

/** Inspect only the selected inspection and a bounded set of retained command receipts. */
export async function readCompletionRestorationProof(
  kernelRoot: string,
  record: KernelRecord,
  workItemId: string,
  inspectionWorkOrder: string,
): Promise<k.CompletionRestorationProof> {
  if (!/^sha256:[a-f0-9]{64}$/u.test(inspectionWorkOrder))
    throw new Error("Invalid inspection selector");
  const root = path.join(kernelRoot, "exchanges", record.aggregate.id);
  const directory = path.join(root, inspectionWorkOrder.slice(7));
  const review = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
    await readJson(path.join(directory, "inspection-result.json")),
  );
  const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
    await readJson(path.join(directory, "work-order.json")),
  );
  const binding = review.canonical_binding;
  if (
    review.work_order_id !== inspectionWorkOrder ||
    order.work_order_id !== inspectionWorkOrder ||
    review.status !== "completed" ||
    review.review?.verdict !== "pass" ||
    binding?.phase !== "inspection" ||
    binding.task_id !== record.aggregate.id ||
    binding.work_item_id !== workItemId ||
    k.kernelDigest(order.canonical_binding) !== k.kernelDigest(binding)
  )
    throw new Error("Selected inspection is not a matching independent PASS");
  const inputPath = (id: string, basename: RegExp) => {
    const input = order.required_inputs.find((entry) => entry.id === id);
    if (
      !input?.path ||
      path.dirname(path.dirname(input.path)) !== root ||
      !/^[a-f0-9]{64}$/u.test(path.basename(path.dirname(input.path))) ||
      !basename.test(path.basename(input.path))
    )
      throw new Error("Inspection input is outside its retained native exchange");
    return input as typeof input & { path: string };
  };
  const implementationRef = inputPath("implementation-result", /^received-result\.json$/u);
  const nativeRef = inputPath("native-validation", /^native-validation-[a-f0-9]{64}\.json$/u);
  const implementation = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
    await readJson(implementationRef.path),
  );
  const native = (await readJson(nativeRef.path)) as KernelNativeValidationEvidence;
  const nativeDigest = k.kernelDigest(native);
  if (
    k.kernelDigest(implementation) !== implementationRef.digest ||
    implementationRef.digest !== binding.result_digest ||
    implementation.status !== "completed" ||
    implementation.canonical_binding?.phase !== "implementation" ||
    implementation.canonical_binding.task_id !== binding.task_id ||
    implementation.canonical_binding.work_item_id !== binding.work_item_id ||
    implementation.canonical_binding.plan_digest !== binding.plan_digest ||
    implementation.canonical_binding.attempt !== binding.attempt ||
    implementation.canonical_binding.claim_id !== binding.claim_id ||
    implementation.canonical_binding.contract_digest !== binding.contract_digest ||
    nativeDigest !== nativeRef.digest ||
    native.input_digest !== k.kernelDigest(native.input) ||
    native.checks.status !== "passed" ||
    native.input.task_id !== binding.task_id ||
    native.input.work_item_id !== binding.work_item_id ||
    native.input.result_digest !== binding.result_digest ||
    native.input.repository_fingerprint !== binding.repository_fingerprint
  )
    throw new Error("Historical implementation or native checks do not bind the inspection");
  const acceptedInput = (await readJson(
    path.join(path.dirname(implementationRef.path), "command-input.json"),
  )) as KernelCommandInput;
  const validatedInput = (await readJson(
    path.join(directory, "validation-command.json"),
  )) as KernelCommandInput;
  if (
    acceptedInput.command.kind !== "accept_work_item_result" ||
    validatedInput.command.kind !== "record_work_item_validation"
  )
    throw new Error("Historical command kinds changed");
  const {
    phase: _phase,
    repository_identity: _repository,
    authority_digest: _authority,
    ...workBinding
  } = implementation.canonical_binding;
  const acceptedCommand = { ...acceptedInput.command, binding_digest: k.kernelDigest(workBinding) };
  if (
    acceptedInput.command.binding_digest !== undefined &&
    acceptedInput.command.binding_digest !== acceptedCommand.binding_digest
  )
    throw new Error("Historical result binding was changed");
  const accepted = {
    ...boundReceipt(record, acceptedInput.mutation_id, acceptedCommand),
    command: acceptedCommand,
  };
  const validated = {
    ...boundReceipt(record, validatedInput.mutation_id, validatedInput.command),
    command: validatedInput.command,
  };
  if (
    accepted.mutation_id !== `result:${implementation.work_order_id}` ||
    validated.mutation_id !== `validation:${inspectionWorkOrder}` ||
    accepted.command.result_digest !== binding.result_digest ||
    accepted.command.plan_digest !== binding.plan_digest ||
    k.kernelDigest(
      accepted.command.output_manifests.map(({ id, kind, digest }) => ({ id, kind, digest })),
    ) !== k.kernelDigest(implementation.canonical_outputs)
  )
    throw new Error("Historical accepted output differs from its native command");
  const completedId = `validation-resolution:${k.kernelDigest(validated.command.validation)}`;
  const completedReceipt = record.aggregate.mutation_receipts[completedId];
  if (!completedReceipt) throw new Error("Historical completion receipt is missing");
  const completion: Extract<k.TaskCommand, { kind: "transition_work_item" }> = {
    kind: "transition_work_item",
    task_id: record.aggregate.id,
    expected_task_revision: completedReceipt.before_revision,
    expected_state_fingerprint: validated.command.expected_state_fingerprint,
    work_item_id: workItemId,
    action: "complete",
    claim_id: binding.claim_id,
  };
  const completed = { ...boundReceipt(record, completedId, completion), command: completion };
  const receipts = Object.values(record.aggregate.mutation_receipts);
  if (receipts.length > 4096)
    throw new Error("Restoration receipt inventory exceeds bounded limit");
  const proposals: k.CompletionRestorationProof["reset_proposal"][] = [];
  const resultCommands: k.CompletionRestorationProof["later_results"][number][] = [];
  const resultEventIds = new Set(
    record.events
      .filter((event) => ["work_item_result_accepted", "plan_proposed"].includes(event.kind))
      .map((event) => event.mutation_id),
  );
  const candidates = receipts.filter(
    (receipt) =>
      receipt.before_revision >= completedReceipt.after_revision &&
      resultEventIds.has(receipt.mutation_id),
  );
  if (candidates.length > 64)
    throw new Error("Restoration command inventory exceeds bounded limit");
  for (const receipt of candidates) {
    if (!/^result:sha256:[a-f0-9]{64}$/u.test(receipt.mutation_id))
      throw new Error("Later result command has no supported retained evidence locator");
    const candidate = (await readJson(
      path.join(root, receipt.mutation_id.slice("result:sha256:".length), "command-input.json"),
    )) as KernelCommandInput;
    let candidateCommand = candidate.command;
    if (candidateCommand.kind === "accept_work_item_result") {
      const later = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
        await readJson(
          path.join(
            root,
            receipt.mutation_id.slice("result:sha256:".length),
            "received-result.json",
          ),
        ),
      );
      if (
        later.canonical_binding?.phase !== "implementation" ||
        k.kernelDigest(later) !== candidateCommand.result_digest
      )
        throw new Error("Later implementation binding is missing");
      const {
        phase: _laterPhase,
        repository_identity: _laterRepository,
        authority_digest: _laterAuthority,
        ...laterBinding
      } = later.canonical_binding;
      const digest = k.kernelDigest(laterBinding);
      if (
        candidateCommand.binding_digest !== undefined &&
        candidateCommand.binding_digest !== digest
      )
        throw new Error("Later implementation binding changed");
      candidateCommand = { ...candidateCommand, binding_digest: digest };
    }
    boundReceipt(record, receipt.mutation_id, candidateCommand);
    if (!["propose_plan", "accept_work_item_result"].includes(candidateCommand.kind))
      throw new Error("Unexpected later result command");
    if (candidateCommand.kind === "propose_plan") {
      proposals.push({ mutation_id: receipt.mutation_id, command: candidateCommand });
      resultCommands.push({ mutation_id: receipt.mutation_id, command: candidateCommand });
    } else if (candidateCommand.kind === "accept_work_item_result")
      resultCommands.push({ mutation_id: receipt.mutation_id, command: candidateCommand });
  }
  const materializations = new Set(
    record.events
      .filter((event) => event.kind === "work_items_materialized")
      .map((event) => event.mutation_id),
  );
  for (const proposal of proposals) {
    for (const receipt of receipts) {
      if (
        !materializations.has(receipt.mutation_id) ||
        receipt.before_revision <= proposal.command.expected_task_revision
      )
        continue;
      const command: Extract<k.TaskCommand, { kind: "materialize_work_items" }> = {
        kind: "materialize_work_items",
        task_id: record.aggregate.id,
        expected_task_revision: receipt.before_revision,
        expected_state_fingerprint: proposal.command.expected_state_fingerprint,
        plan_revision: proposal.command.plan.revision,
        plan_digest: proposal.command.plan.digest,
      };
      if (receipt.command_digest !== k.kernelDigest(command)) continue;
      const proof: k.CompletionRestorationProof = {
        accepted,
        validated,
        completed,
        reset_proposal: proposal,
        reset_materialization: { mutation_id: receipt.mutation_id, command },
        inspection_digest: k.kernelDigest(review),
        native_validation_digest: nativeDigest,
        attempt: binding.attempt,
        implementation_binding:
          workBinding as k.CompletionRestorationProof["implementation_binding"],
        intervening_events: record.events.filter(
          (event) => event.task_revision > completedReceipt.after_revision,
        ),
        later_results: resultCommands.filter(
          (entry) =>
            record.aggregate.mutation_receipts[entry.mutation_id]!.after_revision >
            command.expected_task_revision,
        ),
      };
      if (k.completionRestorationIssues(record.aggregate, workItemId, proof).length === 0)
        return proof;
    }
  }
  throw new Error("No authenticated scope-plan materialization reset matches this completion");
}
