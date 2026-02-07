import { okResult, policyError } from "../result.js";
import type { PolicyContext, PolicyResult } from "../types.js";

export function cleanTreeRule(ctx: PolicyContext): PolicyResult {
  if (ctx.requireClean !== true) return okResult();
  const unstaged = ctx.git.unstagedTrackedPaths ?? null;
  if (!unstaged) {
    return {
      ok: false,
      errors: [policyError("Internal error: unstaged tracked paths are required for requireClean")],
      warnings: [],
    };
  }
  if (unstaged.length > 0) {
    return { ok: false, errors: [policyError("Working tree is dirty")], warnings: [] };
  }
  return okResult();
}
