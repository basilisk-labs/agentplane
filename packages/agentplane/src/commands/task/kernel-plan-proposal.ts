import { taskKernel as k, type KernelPlanProposal } from "@agentplaneorg/core/tasks";

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
