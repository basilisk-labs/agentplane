import path from "node:path";

import {
  buildTaskArtifactRefreshCommitSubject,
  extractTaskSuffix,
  parseTaskSubjectTemplate,
} from "@agentplaneorg/core/commit";

import { appendDcoSignoff } from "../../guard/impl/dco.js";
import { buildGitCommitEnv, resolveCanonicalGitIdentity } from "../../guard/impl/env.js";
import { toGitPath, gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitCurrentBranch } from "../../shared/git-ops.js";
import type { CommandContext } from "../../shared/task-backend.js";

type TaskPrArtifactCommitStrategy = "auto" | "commit" | "amend";

function taskPrDirPrefix(workflowDir: string, taskId: string): string {
  return `${toGitPath(path.join(workflowDir, taskId, "pr"))}/`;
}

function taskReadmePath(workflowDir: string, taskId: string): string {
  return toGitPath(path.join(workflowDir, taskId, "README.md"));
}

function isTaskPacketPath(opts: { workflowDir: string; taskId: string; relPath: string }): boolean {
  const normalized = toGitPath(opts.relPath);
  return (
    normalized === taskReadmePath(opts.workflowDir, opts.taskId) ||
    normalized.startsWith(taskPrDirPrefix(opts.workflowDir, opts.taskId))
  );
}

async function readCachedPaths(gitRoot: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["diff", "--cached", "--name-only", "--relative"], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

async function readHeadSubject(gitRoot: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const subject = stdout.trim();
    return subject.length > 0 ? subject : null;
  } catch {
    return null;
  }
}

async function headCommitIsTaskOwned(opts: { gitRoot: string; taskId: string }): Promise<boolean> {
  const subject = await readHeadSubject(opts.gitRoot);
  if (!subject) return false;

  const parsed = parseTaskSubjectTemplate(subject);
  if (!parsed) return false;

  return parsed.suffix.toLowerCase() === extractTaskSuffix(opts.taskId).toLowerCase();
}

async function resolveTaskPrArtifactCommitStrategy(opts: {
  gitRoot: string;
  taskId: string;
  strategy?: TaskPrArtifactCommitStrategy;
  baseBranch?: string | null;
}): Promise<"commit" | "amend"> {
  if (opts.strategy === "commit" || opts.strategy === "amend") return opts.strategy;

  return (await headCommitIsTaskOwned({ gitRoot: opts.gitRoot, taskId: opts.taskId }))
    ? "amend"
    : "commit";
}

export async function maybeAutoCommitTaskPrArtifacts(opts: {
  ctx: CommandContext;
  taskId: string;
  branch: string;
  baseBranch?: string | null;
  strategy?: TaskPrArtifactCommitStrategy;
}): Promise<boolean> {
  if (opts.ctx.config.workflow_mode !== "branch_pr") return false;

  const branchText = await gitCurrentBranch(opts.ctx.resolvedProject.gitRoot);
  const currentBranch = branchText.trim();
  if (!currentBranch || currentBranch !== opts.branch.trim()) return false;

  const changedPaths = await opts.ctx.git.statusChangedPaths();
  const taskPacketPaths = changedPaths.filter((relPath) =>
    isTaskPacketPath({
      workflowDir: opts.ctx.config.paths.workflow_dir,
      taskId: opts.taskId,
      relPath,
    }),
  );
  if (taskPacketPaths.length === 0) return false;

  const cachedPaths = await readCachedPaths(opts.ctx.resolvedProject.gitRoot);
  if (
    cachedPaths.some(
      (relPath) =>
        !isTaskPacketPath({
          workflowDir: opts.ctx.config.paths.workflow_dir,
          taskId: opts.taskId,
          relPath,
        }),
    )
  ) {
    return false;
  }

  await opts.ctx.git.stage(taskPacketPaths);
  const strategy = await resolveTaskPrArtifactCommitStrategy({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    taskId: opts.taskId,
    strategy: opts.strategy,
    baseBranch: opts.baseBranch,
  });
  const env = buildGitCommitEnv({
    taskId: opts.taskId,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    gitIdentity: await resolveCanonicalGitIdentity(),
  });
  await (strategy === "amend"
    ? opts.ctx.git.commitAmendNoEdit({ env })
    : opts.ctx.git.commit({
        message: buildTaskArtifactRefreshCommitSubject({ taskId: opts.taskId }),
        body: appendDcoSignoff({ config: opts.ctx.config }),
        env,
      }));
  opts.ctx.git.invalidateStatus();
  return true;
}
