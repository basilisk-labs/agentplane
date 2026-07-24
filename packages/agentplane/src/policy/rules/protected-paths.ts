import {
  getProtectedPathOverride,
  protectedPathKindForFile,
} from "../../shared/protected-paths.js";
import {
  gitPathIsUnderPrefix,
  normalizeGitPathCandidate,
  normalizeGitPathPrefix,
} from "../../shared/git-path.js";

import { gitError, okResult } from "../result.js";
import type { PolicyAction, PolicyContext, PolicyResult } from "../model.js";

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

function isHookAllowedTaskArtifact(opts: {
  filePath: string;
  tasksPath: string;
  workflowDir: string;
  taskId: string | undefined;
}): boolean {
  if (!opts.taskId) return false;
  const filePath = normalizeGitPathCandidate(opts.filePath);
  const tasksPath = normalizeGitPathPrefix(opts.tasksPath);
  if (filePath === tasksPath) return false;
  return gitPathIsUnderPrefix(
    filePath,
    `${normalizeGitPathPrefix(opts.workflowDir)}/${opts.taskId}`,
  );
}

function isExplicitlyAllowedSameTaskArtifact(opts: {
  filePath: string;
  prefixes: string[];
  tasksPath: string;
  workflowDir: string;
  taskId: string | undefined;
}): boolean {
  if (
    !isHookAllowedTaskArtifact({
      filePath: opts.filePath,
      tasksPath: opts.tasksPath,
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
    })
  ) {
    return false;
  }
  const filePath = normalizeGitPathCandidate(opts.filePath);
  const taskPrefix = `${normalizeGitPathPrefix(opts.workflowDir)}/${opts.taskId}`;
  if (
    !["blueprint", "quality"].some((dir) => gitPathIsUnderPrefix(filePath, `${taskPrefix}/${dir}`))
  ) {
    return false;
  }
  return opts.prefixes
    .map((prefix) => normalizeGitPathPrefix(prefix))
    .some((prefix) => gitPathIsUnderPrefix(filePath, prefix));
}

export function protectedPathsRule(ctx: PolicyContext): PolicyResult {
  const staged = ctx.git.stagedPaths ?? [];
  if (staged.length === 0) return okResult();

  const tasksPath = ctx.config.paths.tasks_path;
  const allowPrefixes = ctx.allow?.prefixes ?? [];
  const allowTasks = ctx.allow?.allowTasks === true;
  const allowPolicy = ctx.allow?.allowPolicy === true;
  const allowConfig = ctx.allow?.allowConfig === true;
  const allowHooks = ctx.allow?.allowHooks === true;
  const allowCI = ctx.allow?.allowCI === true;

  const errors: string[] = [];

  for (const filePath of staged) {
    const kind = protectedPathKindForFile({
      filePath,
      tasksPath,
      workflowDir: ctx.config.paths.workflow_dir,
      taskId: ctx.taskId,
    });
    if (!kind) continue;

    if (
      ctx.action === "hook_pre_commit" &&
      kind === "tasks" &&
      isHookAllowedTaskArtifact({
        filePath,
        tasksPath,
        workflowDir: ctx.config.paths.workflow_dir,
        taskId: ctx.taskId,
      })
    ) {
      continue;
    }

    if (
      kind === "tasks" &&
      !allowTasks &&
      !isExplicitlyAllowedSameTaskArtifact({
        filePath,
        prefixes: allowPrefixes,
        tasksPath,
        workflowDir: ctx.config.paths.workflow_dir,
        taskId: ctx.taskId,
      })
    ) {
      const override = getProtectedPathOverride(kind);
      errors.push(
        ctx.action === "hook_pre_commit"
          ? `${filePath} is protected by agentplane hooks (set ${override.envVar}=1 to override)`
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
