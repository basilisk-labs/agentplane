import { taskKernel as k, type KernelPlanProposal } from "@agentplaneorg/core/tasks";
import type { KernelDocuments } from "../../adapters/task-backend/kernel-documents.js";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { validateRecipePlanForAdmission } from "../../runner/context/recipe-plan-binding.js";
import { createNativeRecipeApplicabilityObservers } from "../../runner/context/recipe-native-observers.js";
import { suppliedKernelProposal } from "./create-plan-proposal.js";
import { canonicalPlanFromProposal } from "./kernel-plan-proposal.js";

/** Current admission reads committed pinned bytes, never an installed catalogue or version label.
 * Native authority/policy admission still decides whether the exact Plan may execute.
 */
export async function validateKernelRecipeBindings(opts: {
  command: CommandContext;
  task: TaskData;
  plan: k.PlanRecord | null;
  documents: KernelDocuments | undefined;
}) {
  const inputs = opts.documents?.plan_inputs ?? {};
  if (!Object.values(inputs).some((input) => input.recipe_provenance)) return;
  const checked = new Map<string, k.PlanRecord>();
  for (const definition of opts.plan?.work_items ?? []) {
    const contract = opts.documents?.contracts[String(definition.contract_digest)];
    const digest = contract?.plan_input_digest;
    const source = digest ? inputs[digest] : undefined;
    if (
      !digest ||
      !source?.recipe_provenance ||
      k.kernelDigest(source) !== digest ||
      source.task_id !== opts.task.id
    )
      throw new Error(
        `Recipe dependency rebind required: ${definition.id} has no exact bound source Plan`,
      );
    let expected = checked.get(digest);
    if (!expected) {
      await validateRecipePlanForAdmission({
        gitRoot: opts.command.resolvedProject.gitRoot,
        proposal: source,
        observers: createNativeRecipeApplicabilityObservers(opts.command),
      });
      expected = canonicalPlanFromProposal(
        suppliedKernelProposal(source, opts.task),
        opts.plan!.revision,
      );
      checked.set(digest, expected);
    }
    const item = expected.work_items.find((entry) => entry.id === definition.id);
    if (!item || k.kernelDigest(item) !== k.kernelDigest(definition))
      throw new Error(
        `Recipe dependency rebind required: ${definition.id} differs from its pinned source Plan`,
      );
  }
  if (
    opts.plan &&
    ![...checked.entries()].some(([digest, expected]) => {
      if (expected.work_items.length !== opts.plan!.work_items.length) return false;
      const expectedProposal = suppliedKernelProposal(inputs[digest]!, opts.task);
      return opts.plan!.work_items.every((definition) => {
        const actual = opts.documents!.contracts[String(definition.contract_digest)]!;
        const wanted = expectedProposal.work_items.find((item) => item.id === definition.id);
        if (!wanted) return false;
        const { contract_digest: _digest, ...actualDefinition } = definition;
        const { contract: wantedContract, ...wantedDefinition } = wanted;
        const { plan_input_digest: _actualSource, ...actualSemantics } = actual;
        const { plan_input_digest: _wantedSource, ...wantedSemantics } = wantedContract;
        return (
          k.kernelDigest({ ...actualDefinition, contract: actualSemantics }) ===
          k.kernelDigest({ ...wantedDefinition, contract: wantedSemantics })
        );
      });
    })
  )
    throw new Error(
      "Recipe dependency rebind required: no retained source covers the complete specialized Plan",
    );
}

/** Rebinding future work does not rewrite completed evidence or its original source identity. */
export function preserveCompletedRecipeContracts(opts: {
  proposal: KernelPlanProposal;
  aggregate: k.TaskAggregate;
  documents: KernelDocuments | undefined;
}): KernelPlanProposal {
  return {
    work_items: opts.proposal.work_items.map((item) => {
      const runtime = opts.aggregate.work_items[item.id];
      if (!runtime || !["COMPLETED", "CANCELLED"].includes(runtime.state)) return item;
      const old = opts.documents?.contracts[String(runtime.definition.contract_digest)];
      const source = old?.plan_input_digest
        ? opts.documents?.plan_inputs?.[old.plan_input_digest]
        : undefined;
      if (!old || !source?.recipe_provenance) return item;
      const { plan_input_digest: _oldSource, ...oldContract } = old;
      const { plan_input_digest: _newSource, ...newContract } = item.contract;
      const { contract: _contract, ...definition } = item;
      const { contract_digest: _digest, ...oldDefinition } = runtime.definition;
      if (
        k.kernelDigest(oldContract) !== k.kernelDigest(newContract) ||
        k.kernelDigest(oldDefinition) !== k.kernelDigest(definition)
      )
        throw new Error(`Recipe rebind cannot change completed WorkItem: ${item.id}`);
      return { ...item, contract: old };
    }),
  };
}
