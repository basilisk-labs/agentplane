import { gitError, internalError, okResult, usageError } from "../result.js";
import type { PolicyContext, PolicyResult } from "../model.js";

export function branchPrBaseRule(ctx: PolicyContext): PolicyResult {
  if (ctx.config.workflow_mode !== "branch_pr") return okResult();

  const baseBranch = ctx.git.baseBranch;
  const currentBranch = ctx.git.currentBranch;
  const staged = ctx.git.stagedPaths ?? [];

  if (!baseBranch) {
    return {
      ok: false,
      errors: [usageError("Base branch could not be resolved (use `agentplane branch base set`).")],
      warnings: [],
    };
  }
  if (!currentBranch) {
    return {
      ok: false,
      errors: [internalError("Internal error: current branch is required in branch_pr mode")],
      warnings: [],
    };
  }

  const allowBase = ctx.allow?.allowBase === true;
  if (staged.length > 0 && currentBranch === baseBranch && !allowBase) {
    return {
      ok: false,
      errors: [gitError(`Code commits are forbidden on ${baseBranch} in branch_pr mode`)],
      warnings: [],
    };
  }
  if (staged.includes(ctx.config.paths.tasks_path) && currentBranch !== baseBranch) {
    return {
      ok: false,
      errors: [
        gitError(`${ctx.config.paths.tasks_path} updates are allowed only on ${baseBranch}`),
      ],
      warnings: [],
    };
  }
  return okResult();
}
