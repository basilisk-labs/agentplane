import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildTaskArtifactRefreshCommitSubject } from "@agentplaneorg/core/commit";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { resolveTaskIndexPath } from "../../../backends/task-index.js";
import { refreshBranchPrArtifactsAfterTaskCommit } from "../../shared/post-commit-pr-artifacts.js";
import { isTaskLocalAdvancePath } from "../../shared/task-local-freshness.js";
import { type CommandContext } from "../../shared/task-backend.js";
import { stageAllowlist } from "./allow.js";
import { buildGitCommitEnv, resolveCanonicalGitIdentity } from "./env.js";
import { guardCommitCheck } from "./policy.js";

type CommitRef = { hash: string; subject: string } | null;

export async function resetRebuildableTaskIndexCache(ctx: CommandContext): Promise<void> {
  const gitRoot = path.resolve(ctx.resolvedProject.gitRoot);
  const workflowDirAbs = path.resolve(gitRoot, ctx.config.paths.workflow_dir);
  const cachePath = path.resolve(resolveTaskIndexPath(workflowDirAbs));
  const relativeCachePath = path.relative(gitRoot, cachePath);
  if (!relativeCachePath || relativeCachePath.startsWith("..")) return;

  try {
    await execFileAsync("git", ["ls-files", "--error-unmatch", "--", relativeCachePath], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const gitPath = relativeCachePath.split(path.sep).join("/");
    const cacheBlob = await execFileAsync("git", ["show", `HEAD:${gitPath}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    await mkdir(path.dirname(cachePath), { recursive: true });
    await writeFile(cachePath, cacheBlob.stdout, "utf8");
    await execFileAsync("git", ["restore", "--staged", "--", relativeCachePath], {
      cwd: gitRoot,
      env: gitEnv(),
    });
  } catch {
    await rm(cachePath, { force: true });
  }
  ctx.git.invalidateStatus();
}

export function formatCommitRef(commit: CommitRef): string {
  if (!commit) return "";
  return `${commit.hash?.slice(0, 12) ?? ""} ${commit.subject ?? ""}`.trim();
}

export async function commitRefreshedTaskArtifacts(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  sourceMessage: string;
  quiet: boolean;
}): Promise<CommitRef> {
  const changedPaths = await opts.ctx.git.statusChangedPaths();
  const taskArtifactPaths = changedPaths.filter((relPath) =>
    isTaskLocalAdvancePath({
      workflowDir: opts.ctx.config.paths.workflow_dir,
      taskId: opts.taskId,
      tasksPath: opts.ctx.config.paths.tasks_path,
      relPath,
    }),
  );
  if (taskArtifactPaths.length === 0) return null;

  await stageAllowlist({
    ctx: opts.ctx,
    allow: [],
    allowTasks: true,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    tasksPath: opts.ctx.config.paths.tasks_path,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.taskId,
    allowTaskOnly: true,
    emptyAllowMessage:
      "PR artifact refresh produced no task-local files to stage for the follow-up commit.",
    noMatchMessage:
      "PR artifact refresh produced changes outside the active task artifact scope; inspect the working tree before retrying the commit flow.",
  });

  const message = buildTaskArtifactRefreshCommitSubject({
    taskId: opts.taskId,
    baseSubject: opts.sourceMessage,
  });
  await guardCommitCheck({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    baseBranchOverride: null,
    taskId: opts.taskId,
    message,
    allow: [],
    allowBase: false,
    allowTasks: true,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: true,
    quiet: opts.quiet,
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
  await opts.ctx.git.commit({ message, env });
  return await opts.ctx.git.headHashSubject();
}

export async function refreshBranchPrArtifactsForCloseCommit(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  quiet: boolean;
  refreshTaskArtifacts: boolean;
}): Promise<void> {
  if (opts.refreshTaskArtifacts) {
    await refreshBranchPrArtifactsAfterTaskCommit({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      quiet: opts.quiet,
    });
  }
  opts.ctx.git.invalidateStatus();
}
