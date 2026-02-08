import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { promptInitBaseBranch, resolveInitBaseBranch } from "../../../../commands/workflow.js";

export async function resolveInitBaseBranchForInit(opts: {
  gitRoot: string;
  baseBranchFallback: string;
  isInteractive: boolean;
  workflow: WorkflowMode;
  gitRootExisted: boolean;
}): Promise<string> {
  let initBaseBranch = await resolveInitBaseBranch(opts.gitRoot, opts.baseBranchFallback);
  if (opts.isInteractive && opts.workflow === "branch_pr" && opts.gitRootExisted) {
    initBaseBranch = await promptInitBaseBranch({
      gitRoot: opts.gitRoot,
      fallback: initBaseBranch,
    });
  }
  return initBaseBranch;
}
