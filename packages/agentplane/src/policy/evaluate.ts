import { mergeResults, okResult, policyError } from "./result.js";
import type { PolicyContext, PolicyResult } from "./types.js";
import { allowlistRule } from "./rules/allowlist.js";
import { branchPrBaseRule } from "./rules/branch-pr-base.js";
import { cleanTreeRule } from "./rules/clean-tree.js";
import { commitSubjectRule } from "./rules/commit-subject.js";
import { protectedPathsRule } from "./rules/protected-paths.js";

export function evaluatePolicy(ctx: PolicyContext): PolicyResult {
  const taskId = (ctx.taskId ?? "").trim();
  if (!taskId && (ctx.action === "guard_commit" || ctx.action === "commit")) {
    return { ok: false, errors: [policyError("Task id is required")], warnings: [] };
  }

  switch (ctx.action) {
    case "hook_commit_msg": {
      return commitSubjectRule(ctx);
    }
    case "hook_pre_commit": {
      return mergeResults(protectedPathsRule(ctx), branchPrBaseRule(ctx));
    }
    case "guard_commit":
    case "commit": {
      return mergeResults(
        commitSubjectRule(ctx),
        cleanTreeRule(ctx),
        branchPrBaseRule(ctx),
        protectedPathsRule(ctx),
        allowlistRule(ctx),
      );
    }
    default: {
      return okResult();
    }
  }
}
