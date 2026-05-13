import { node } from "./builtin-builder.js";
import { CODE_WORKFLOW_LIFECYCLE_CONTRACTS } from "../workflow-lifecycle/contract.js";
import type { LifecycleBlueprintNodeSpec } from "../workflow-lifecycle/contract.js";
import type { WorkflowMode } from "./model.js";

export const branchPrPolicyModules = [
  ".agentplane/policy/security.must.md",
  ".agentplane/policy/dod.core.md",
  ".agentplane/policy/dod.code.md",
  ".agentplane/policy/workflow.branch_pr.md",
] as const;

function codeLifecycleNodes(mode: WorkflowMode) {
  const specs: readonly LifecycleBlueprintNodeSpec[] =
    CODE_WORKFLOW_LIFECYCLE_CONTRACTS[mode].blueprintNodes;
  return specs.map((spec) =>
    node({
      kind: spec.kind,
      ...(spec.evidence ? { evidence: spec.evidence } : {}),
      ...(spec.protected ? { protected: true } : {}),
      ...(spec.allowedCommands ? { allowedCommands: spec.allowedCommands } : {}),
      ...(spec.policyModules ? { policyModules: spec.policyModules } : {}),
    }),
  );
}

export const codeDirectNodes = codeLifecycleNodes("direct");
export const codeBranchPrNodes = codeLifecycleNodes("branch_pr");
