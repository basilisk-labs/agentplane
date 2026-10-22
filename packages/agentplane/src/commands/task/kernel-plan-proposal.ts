import { taskKernel as k, type KernelPlanProposal } from "@agentplaneorg/core/tasks";
import { CliError } from "../../shared/errors.js";

export function canonicalPlanFromProposal(
  proposal: KernelPlanProposal,
  revision: number,
): k.PlanRecord {
  const definitions: k.WorkItemDefinition[] = proposal.work_items.map(
    ({ contract, ...definition }) => ({ ...definition, contract_digest: k.kernelDigest(contract) }),
  );
  const issues = k.validateWorkItemDefinitions(definitions);
  if (issues.length > 0)
    throw new CliError({
      code: "E_VALIDATION",
      message: `Invalid canonical plan: ${issues.join(", ")}. Correct the proposed WorkItems; lifecycle operations remain supervisor-owned.`,
      context: {
        reason_code: "invalid_canonical_plan",
        violations: issues,
        required_action: "correct_plan_proposal",
      },
    });
  return {
    revision,
    digest: k.kernelDigest({ revision, work_items: definitions }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items: definitions,
  };
}
