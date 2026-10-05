import { z } from "zod";
import {
  kernelPlanProposalSchema,
  kernelWorkContractSchema,
  type KernelPlanProposal,
} from "./kernel-semantic.js";
import { kernelDigest } from "./task-kernel/digest.js";
import { validateWorkItemDefinitions } from "./task-kernel/invariants.js";
import type { PlanRecord, WorkItemDefinition } from "./task-kernel/model.js";

const item = kernelPlanProposalSchema.shape.work_items.element;
/** A common proposal input, not a state transition or a grant of authority. */
export const kernelPlanRefinementSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("plan_refinement"),
  task_id: z.string().min(1),
  base_plan_digest: z.string().regex(/^sha256:[a-f0-9]{64}$/u),
  operations: z
    .array(
      z.discriminatedUnion("kind", [
        z.strictObject({ kind: z.literal("add"), work_item: item }),
        z.strictObject({ kind: z.literal("replace"), work_item: item }),
        z.strictObject({ kind: z.literal("remove"), work_item_id: item.shape.id }),
      ]),
    )
    .min(1)
    .max(256),
});
export const kernelPlanInputSchema = z.union([
  kernelPlanProposalSchema,
  kernelPlanRefinementSchema,
]);
export type KernelPlanRefinement = z.infer<typeof kernelPlanRefinementSchema>;
export type KernelWorkContract = z.infer<typeof kernelWorkContractSchema>;

/** Validate mandatory obligations by exact digest-bound contents, including transferred work. */
export function planObligationIssues(
  before: readonly WorkItemDefinition[],
  after: readonly WorkItemDefinition[],
  contracts: Readonly<Record<string, KernelWorkContract>>,
): string[] {
  const issues: string[] = [];
  const read = (definition: WorkItemDefinition) => {
    const value = definition.contract_digest && contracts[String(definition.contract_digest)];
    if (
      !value ||
      !kernelWorkContractSchema.safeParse(value).success ||
      kernelDigest(value) !== definition.contract_digest
    ) {
      issues.push(`work_contract_missing_or_invalid:${definition.id}`);
      return;
    }
    return value;
  };
  const previous = before.map((definition) => ({ definition, contract: read(definition) }));
  const next = after.map((definition) => ({ definition, contract: read(definition) }));
  const mandatory = next.filter(({ definition }) => !definition.optional);
  for (const { definition, contract } of previous.filter(
    ({ definition }) => !definition.optional,
  )) {
    for (const output of definition.expected_outputs)
      if (!mandatory.some(({ definition }) => definition.expected_outputs.includes(output)))
        issues.push(`mandatory_output_removed:${output}`);
    for (const criterion of contract?.acceptance_criteria ?? [])
      if (!mandatory.some(({ contract }) => contract?.acceptance_criteria.includes(criterion)))
        issues.push(`mandatory_criterion_removed:${criterion}`);
    for (const command of contract?.verification_commands ?? [])
      if (!mandatory.some(({ contract }) => contract?.verification_commands.includes(command)))
        issues.push(`mandatory_check_removed:${command}`);
  }
  return issues;
}

export function resolveKernelPlanInput(opts: {
  task_id: string;
  value: unknown;
  current: PlanRecord | null;
  contracts: Readonly<Record<string, KernelWorkContract>>;
}): KernelPlanProposal {
  const value = kernelPlanInputSchema.parse(opts.value);
  if (!("kind" in value)) return value;
  const current = opts.current;
  if (value.task_id !== opts.task_id) throw new Error("Plan refinement task mismatch");
  if (current?.digest !== value.base_plan_digest)
    throw new Error("Plan refinement base digest mismatch");
  const items = new Map(
    current.work_items.map(({ contract_digest, ...definition }) => {
      const contract = contract_digest && opts.contracts[String(contract_digest)];
      if (!contract || kernelDigest(contract) !== contract_digest)
        throw new Error(`Plan refinement contract unavailable: ${definition.id}`);
      return [definition.id, { ...definition, contract }] as const;
    }),
  );
  const seen = new Set<string>();
  for (const operation of value.operations) {
    const id = operation.kind === "remove" ? operation.work_item_id : operation.work_item.id;
    if (seen.has(id)) throw new Error(`Duplicate Plan refinement operation: ${id}`);
    seen.add(id);
    if (operation.kind === "add" ? items.has(id) : !items.has(id))
      throw new Error(`Invalid Plan refinement target: ${id}`);
    if (operation.kind === "remove") items.delete(id);
    else items.set(id, operation.work_item);
  }
  const proposal = kernelPlanProposalSchema.parse({ work_items: [...items.values()] });
  const definitions = proposal.work_items.map(({ contract, ...definition }) => ({
    ...definition,
    contract_digest: kernelDigest(contract),
  }));
  const contracts = {
    ...opts.contracts,
    ...Object.fromEntries(
      proposal.work_items.map(({ contract }) => [kernelDigest(contract), contract]),
    ),
  };
  const issues = [
    ...validateWorkItemDefinitions(definitions),
    ...planObligationIssues(current.work_items, definitions, contracts),
  ];
  if (issues.length > 0) throw new Error(`Invalid Plan refinement: ${issues.join(", ")}`);
  return proposal;
}
