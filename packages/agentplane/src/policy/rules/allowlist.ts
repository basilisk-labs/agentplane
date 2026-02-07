import { gitPathIsUnderPrefix, normalizeGitPathPrefix } from "../../shared/git-path.js";

import { gitError, okResult } from "../result.js";
import type { PolicyContext, PolicyResult } from "../types.js";

export function allowlistRule(ctx: PolicyContext): PolicyResult {
  const allowRaw = ctx.allow?.prefixes ?? [];
  const staged = ctx.git.stagedPaths ?? [];

  if (staged.length === 0) {
    return { ok: false, errors: [gitError("No staged files (git index empty)")], warnings: [] };
  }
  if (allowRaw.length === 0) {
    const message =
      ctx.action === "guard_commit" || ctx.action === "commit"
        ? "Provide at least one --allow <path> prefix"
        : "Provide at least one allowlist prefix";
    return {
      ok: false,
      errors: [gitError(message)],
      warnings: [],
    };
  }

  const allow = allowRaw.map((p) => normalizeGitPathPrefix(p));

  const errors: string[] = [];
  for (const filePath of staged) {
    if (!allow.some((prefix) => gitPathIsUnderPrefix(filePath, prefix))) {
      errors.push(`Staged file is outside allowlist: ${filePath}`);
    }
  }
  if (errors.length > 0) {
    return { ok: false, errors: errors.map((msg) => gitError(msg)), warnings: [] };
  }
  return okResult();
}
