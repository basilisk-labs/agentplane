import { gitPathIsUnderPrefix, normalizeGitPathPrefix } from "../../shared/git-path.js";

import { okResult, policyError } from "../result.js";
import type { PolicyContext, PolicyResult } from "../types.js";

export function allowlistRule(ctx: PolicyContext): PolicyResult {
  const allowRaw = ctx.allow?.prefixes ?? [];
  const staged = ctx.git.stagedPaths ?? [];

  if (staged.length === 0) {
    return { ok: false, errors: [policyError("No staged files (git index empty)")], warnings: [] };
  }
  if (allowRaw.length === 0) {
    return {
      ok: false,
      errors: [policyError("Provide at least one allowlist prefix")],
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
    return { ok: false, errors: errors.map((msg) => policyError(msg)), warnings: [] };
  }
  return okResult();
}
