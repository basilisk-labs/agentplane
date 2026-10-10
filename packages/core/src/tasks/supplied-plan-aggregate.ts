import * as k from "./task-kernel/index.js";
import type { KernelPlanProposal } from "./kernel-semantic.js";
import type { ParsedTaskPlanProposal } from "./task-centric/schema.js";

/** A native validation stage, never an authored WorkItem or additional mutation grant. */
export function suppliedAggregateValidationItem(
  source: ParsedTaskPlanProposal,
): KernelPlanProposal["work_items"][number] {
  const digest = k.kernelDigest(source);
  const items = source.work_items.work_items;
  const ids = new Set(items.map((item) => item.id));
  const prefix = `aggregate-validation-${digest.slice(7, 23)}`;
  let id = prefix;
  for (let suffix = 1; ids.has(id); suffix++) id = `${prefix}-${suffix}`;
  return {
    id,
    depends_on: items.filter((item) => !item.optional).map((item) => item.id),
    required_inputs: [],
    expected_outputs: [`${id}-evidence`],
    optional: false,
    execution_requirements: {
      scope_roots: [],
      repository_effects: [],
      external_effects: [],
      capabilities: [],
      resources: [
        ...new Set(
          items.flatMap((item) =>
            item.resource_claims
              .filter((claim) => claim.mode === "read")
              .map((claim) => `${claim.kind}:${claim.resource}:${claim.mode}`),
          ),
        ),
      ],
    },
    contract: {
      objective:
        "Validate the complete task against the retained top-level criteria and checks. Inspect completed required work and any completed optional work. Report unmet requirements without modifying implementation. This is a native generated aggregate validation stage, not an authored WorkItem. Independent native inspection remains mandatory.",
      acceptance_criteria: [
        ...new Set(source.top_level_validation.criteria.map((criterion) => criterion.description)),
      ],
      verification_commands: [
        ...new Set(
          source.top_level_validation.checks.flatMap((check) =>
            check.command ? [check.command] : [],
          ),
        ),
      ],
      role: "EXECUTOR",
      plan_input_digest: digest,
      generated_origin: "supplied_plan_aggregate_validation",
    },
  };
}

/** A marker alone cannot authorize special projection or substitute an authored item. */
export function assertSuppliedAggregateDefinition(
  source: ParsedTaskPlanProposal,
  definition: k.WorkItemDefinition,
  contract: KernelPlanProposal["work_items"][number]["contract"],
): void {
  const { contract: expectedContract, ...expected } = suppliedAggregateValidationItem(source);
  if (
    source.work_items.work_items.length < 2 ||
    k.kernelDigest(contract) !== k.kernelDigest(expectedContract) ||
    k.kernelDigest(definition) !==
      k.kernelDigest({ ...expected, contract_digest: k.kernelDigest(expectedContract) })
  )
    throw new Error("Generated aggregate validation has no exact retained source binding.");
}
