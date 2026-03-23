import path from "node:path";

import { renderTaskDocFromSections, taskDocToSectionMap } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  taskDataToFrontmatter,
} from "../../commands/shared/task-backend.js";
import { gitCurrentBranch } from "../../commands/shared/git-ops.js";
import { resolveTaskDependencyState } from "../../commands/task/shared.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import type {
  RunnerDependencyState,
  RunnerRepositoryContext,
  RunnerTaskContext,
} from "../types.js";

export type RunnerTaskContextEnvelope = {
  repository: RunnerRepositoryContext;
  task: RunnerTaskContext;
};

function toRunnerDependencyState(dep: {
  dependsOn: string[];
  missing: string[];
  incomplete: string[];
}): RunnerDependencyState {
  const missing = [...dep.missing];
  const incomplete = [...dep.incomplete];
  const completed = dep.dependsOn.filter(
    (taskId) => !missing.includes(taskId) && !incomplete.includes(taskId),
  );
  return {
    ready: missing.length === 0 && incomplete.length === 0,
    missing,
    incomplete,
    completed,
  };
}

async function resolveTaskReadmePath(
  ctx: CommandContext,
  taskId: string,
): Promise<string | undefined> {
  const readmePath = path.join(
    ctx.resolvedProject.gitRoot,
    ctx.config.paths.workflow_dir,
    taskId,
    "README.md",
  );
  return (await fileExists(readmePath)) ? readmePath : undefined;
}

async function readOptionalBranch(gitRoot: string): Promise<string | null> {
  try {
    return await gitCurrentBranch(gitRoot);
  } catch {
    return null;
  }
}

async function readOptionalHeadCommit(ctx: CommandContext): Promise<string | null> {
  try {
    return await ctx.git.headCommit();
  } catch {
    return null;
  }
}

export async function assembleRunnerTaskContext(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
}): Promise<RunnerTaskContextEnvelope> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const task = await loadTaskFromContext({ ctx, taskId: opts.task_id });
    const dependencyState = toRunnerDependencyState(
      await resolveTaskDependencyState(task, ctx.taskBackend),
    );
    const frontmatter = taskDataToFrontmatter(task);
    const doc =
      typeof task.doc === "string"
        ? task.doc
        : task.sections
          ? renderTaskDocFromSections(task.sections)
          : "";
    const sections = task.sections ?? (doc ? taskDocToSectionMap(doc) : {});
    const [branch, head_commit, readme_path] = await Promise.all([
      readOptionalBranch(ctx.resolvedProject.gitRoot),
      readOptionalHeadCommit(ctx),
      resolveTaskReadmePath(ctx, task.id),
    ]);

    return {
      repository: {
        git_root: ctx.resolvedProject.gitRoot,
        workflow_dir: ctx.config.paths.workflow_dir,
        backend_id: ctx.backendId,
        backend_config_path: ctx.backendConfigPath,
        branch,
        head_commit,
      },
      task: {
        task_id: task.id,
        data: task,
        frontmatter,
        doc,
        sections,
        comments: task.comments ?? [],
        events: task.events ?? [],
        readme_path,
        dependency_state: dependencyState,
      },
    };
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { task_id: opts.task_id });
  }
}
