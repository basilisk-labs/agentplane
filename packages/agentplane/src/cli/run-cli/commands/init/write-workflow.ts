import { ensureWorkflowArtifacts } from "../../../../shared/workflow-artifacts.js";

export async function ensureInitWorkflow(opts: {
  gitRoot: string;
  workflowMode: "direct" | "branch_pr";
  approvals: {
    requirePlanApproval: boolean;
    requireVerifyApproval: boolean;
    requireNetworkApproval: boolean;
  };
}): Promise<{ installPaths: string[] }> {
  const ensured = await ensureWorkflowArtifacts({
    gitRoot: opts.gitRoot,
    workflowMode: opts.workflowMode,
    approvals: opts.approvals,
  });
  return { installPaths: ensured.installPaths };
}
