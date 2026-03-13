import { gitPathIsUnderPrefix, normalizeGitPathPrefix } from "../../shared/git-path.js";
import { protectedPathAllowPrefixes } from "../../shared/protected-paths.js";

import { gitError, okResult } from "../result.js";
import type { PolicyContext, PolicyResult } from "../types.js";

export function allowlistRule(ctx: PolicyContext): PolicyResult {
  const allowRaw = ctx.allow?.prefixes ?? [];
  const staged = ctx.git.stagedPaths ?? [];
  const allow = allowRaw.map((p) => normalizeGitPathPrefix(p));
  const protectedAllow = protectedPathAllowPrefixes({
    tasksPath: ctx.config.paths.tasks_path,
    workflowDir: ctx.config.paths.workflow_dir,
    taskId: ctx.taskId,
    allowTasks: ctx.allow?.allowTasks === true,
    allowPolicy: ctx.allow?.allowPolicy === true,
    allowConfig: ctx.allow?.allowConfig === true,
    allowHooks: ctx.allow?.allowHooks === true,
    allowCI: ctx.allow?.allowCI === true,
  });
  const effectiveAllow = [...new Set([...allow, ...protectedAllow])];

  if (staged.length === 0) {
    return { ok: false, errors: [gitError("No staged files (git index empty)")], warnings: [] };
  }
  if (effectiveAllow.length === 0) {
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

  if (effectiveAllow.includes(".")) {
    return {
      ok: false,
      errors: [
        gitError(
          "Repo-wide allowlist ('.') is not allowed; choose minimal prefixes (tip: `agentplane guard suggest-allow --format args`).",
        ),
      ],
      warnings: [],
    };
  }

  const errors: string[] = [];
  for (const filePath of staged) {
    if (!effectiveAllow.some((prefix) => gitPathIsUnderPrefix(filePath, prefix))) {
      errors.push(`Staged file is outside allowlist: ${filePath}`);
    }
  }
  if (errors.length > 0) {
    return { ok: false, errors: errors.map((msg) => gitError(msg)), warnings: [] };
  }
  return okResult();
}
