import {
  getProtectedPathOverride,
  protectedPathKindForFile,
} from "../../shared/protected-paths.js";

import { gitError, okResult } from "../result.js";
import type { PolicyAction, PolicyContext, PolicyResult } from "../types.js";

function renderProtectedMessage(opts: {
  action: PolicyAction;
  filePath: string;
  overrideFlag: string;
  overrideEnvVar: string;
}): string {
  if (opts.action === "hook_pre_commit") {
    return `${opts.filePath} is protected by agentplane hooks (set ${opts.overrideEnvVar}=1 to override)`;
  }
  return `Staged file is protected by default: ${opts.filePath} (use ${opts.overrideFlag} to override)`;
}

export function protectedPathsRule(ctx: PolicyContext): PolicyResult {
  const staged = ctx.git.stagedPaths ?? [];
  if (staged.length === 0) return okResult();

  const tasksPath = ctx.config.paths.tasks_path;
  const allowTasks = ctx.allow?.allowTasks === true;
  const allowPolicy = ctx.allow?.allowPolicy === true;
  const allowConfig = ctx.allow?.allowConfig === true;
  const allowHooks = ctx.allow?.allowHooks === true;
  const allowCI = ctx.allow?.allowCI === true;

  const errors: string[] = [];

  for (const filePath of staged) {
    const kind = protectedPathKindForFile({ filePath, tasksPath });
    if (!kind) continue;

    if (kind === "tasks" && !allowTasks) {
      const override = getProtectedPathOverride(kind);
      errors.push(
        ctx.action === "hook_pre_commit"
          ? `${tasksPath} is protected by agentplane hooks (set ${override.envVar}=1 to override)`
          : `Staged file is forbidden by default: ${filePath} (use ${override.cliFlag} to override)`,
      );
      continue;
    }

    if (kind === "policy" && allowPolicy) continue;
    if (kind === "config" && allowConfig) continue;
    if (kind === "hooks" && allowHooks) continue;
    if (kind === "ci" && allowCI) continue;
    if (kind !== "tasks") {
      const override = getProtectedPathOverride(kind);
      errors.push(
        renderProtectedMessage({
          action: ctx.action,
          filePath,
          overrideFlag: override.cliFlag,
          overrideEnvVar: override.envVar,
        }),
      );
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors: errors.map((msg) => gitError(msg)), warnings: [] };
  }
  return okResult();
}
