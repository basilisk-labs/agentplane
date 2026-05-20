import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { extractTaskSuffix } from "@agentplaneorg/core/commit";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { invalidValueMessage, successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import {
  resolveGitIndexLockInfo,
  resolveGitMutationDiagnosticContext,
  withGitMutationMutex,
  type GitMutationKind,
} from "../../../shared/git-mutation.js";
import { asCommitFailure } from "./commit-diagnostics.js";
import {
  formatCommentBodyForCommit,
  normalizeCommentBodyForCommit,
} from "../../shared/comment-format.js";
import { loadCommandContext, type CommandContext } from "../../shared/task-backend.js";

import { appendDcoSignoff } from "./dco.js";
import { buildGitCommitEnv, resolveCanonicalGitIdentity } from "./env.js";
import { stageAllowlist } from "./allow.js";
import { guardCommitCheck } from "./policy.js";

const GIT_COMMIT_LOCK_REMEDIATION =
  "Wait for the active AgentPlane or external git process to release index lock, then retry.";

async function commitFromCommentWithLock(opts: {
  ctx: CommandContext;
  taskId: string;
  message: string;
  body: string;
  env?: NodeJS.ProcessEnv;
  allowPrefixes: string[];
  changedPaths: string[];
  stagedPaths: string[];
  mutationKind: GitMutationKind;
}): Promise<void> {
  const lockInfo = await resolveGitIndexLockInfo({ repoRoot: opts.ctx.resolvedProject.gitRoot });
  if (lockInfo) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT_LOCKED"),
      code: "E_GIT_LOCKED",
      message: `Git index is locked; refusing comment-driven commit: ${lockInfo.lockPath}`,
      context: {
        ...(await resolveGitMutationDiagnosticContext({
          command: "git commit",
          cwd: opts.ctx.resolvedProject.gitRoot,
          repoRoot: opts.ctx.resolvedProject.gitRoot,
          workflowMode: opts.ctx.config.workflow_mode,
          mutationKind: opts.mutationKind,
          taskId: opts.taskId,
          allowPrefixes: opts.allowPrefixes,
          changedPaths: opts.changedPaths,
          stagedPaths: opts.stagedPaths,
        })),
        remediation: GIT_COMMIT_LOCK_REMEDIATION,
        git_index_lock_path: lockInfo.lockPath,
        git_index_lock_age_ms: lockInfo.ageMs,
      },
    });
  }

  await withGitMutationMutex(
    {
      repoRoot: opts.ctx.resolvedProject.gitRoot,
      operation: "git-commit",
      workflowMode: opts.ctx.config.workflow_mode,
      mutationKind: opts.mutationKind,
      taskId: opts.taskId,
    },
    async () => {
      try {
        await opts.ctx.git.commit({ message: opts.message, body: opts.body, env: opts.env });
      } catch (err) {
        const failureContext = await resolveGitMutationDiagnosticContext({
          command: "git commit",
          cwd: opts.ctx.resolvedProject.gitRoot,
          repoRoot: opts.ctx.resolvedProject.gitRoot,
          workflowMode: opts.ctx.config.workflow_mode,
          mutationKind: opts.mutationKind,
          taskId: opts.taskId,
          allowPrefixes: opts.allowPrefixes,
          changedPaths: opts.changedPaths,
          stagedPaths: opts.stagedPaths,
        });

        const failure = asCommitFailure(err, "task_commit", failureContext);
        if (failure) throw failure;

        const message = err instanceof Error ? err.message : "git commit failed";
        const errorContext = await resolveGitMutationDiagnosticContext({
          command: "git commit",
          cwd: opts.ctx.resolvedProject.gitRoot,
          repoRoot: opts.ctx.resolvedProject.gitRoot,
          workflowMode: opts.ctx.config.workflow_mode,
          mutationKind: opts.mutationKind,
          taskId: opts.taskId,
          allowPrefixes: opts.allowPrefixes,
          changedPaths: opts.changedPaths,
          stagedPaths: opts.stagedPaths,
        });
        throw new CliError({
          exitCode: exitCodeForError("E_GIT"),
          code: "E_GIT",
          message,
          context: errorContext,
        });
      }
    },
  );
}

function deriveCommitMessageFromComment(opts: {
  taskId: string;
  primaryTag: string;
  statusTo?: string;
  emoji: string;
}): string {
  const prefix = opts.emoji.trim();
  if (!prefix) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Emoji prefix is required when deriving commit messages from task comments",
    });
  }
  const suffix = extractTaskSuffix(opts.taskId);
  if (!suffix) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: invalidValueMessage("task id", opts.taskId, "valid task id"),
    });
  }
  const primary = opts.primaryTag.trim().toLowerCase();
  if (!primary) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Primary tag is required when deriving commit messages from task comments",
    });
  }
  const status = (opts.statusTo?.trim().toLowerCase() ?? "status-transition").replaceAll(
    /\s+/g,
    "-",
  );
  return `${prefix} ${suffix} ${primary}: ${status}`;
}

function deriveCommitBodyFromComment(opts: {
  taskId: string;
  primaryTag: string;
  executorAgent?: string;
  author?: string;
  statusFrom?: string;
  statusTo?: string;
  commentBody: string;
  formattedComment: string;
}): string {
  const lines = [
    `Task: ${opts.taskId}`,
    `Primary: ${opts.primaryTag}`,
    ...(opts.executorAgent ? [`Agent: ${opts.executorAgent}`] : []),
    ...(opts.author ? [`Author: ${opts.author}`] : []),
    ...(opts.statusTo ? [`Status: ${opts.statusTo}`] : []),
    `Comment: ${normalizeCommentBodyForCommit(opts.formattedComment ?? opts.commentBody)}`,
  ];

  return lines.join("\n").trimEnd();
}

export async function commitFromComment(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  primaryTag: string;
  executorAgent?: string;
  author?: string;
  statusFrom?: string;
  statusTo?: string;
  commentBody: string;
  formattedComment: string | null;
  emoji: string;
  allow: string[];
  autoAllow: boolean;
  allowTasks: boolean;
  requireClean: boolean;
  quiet: boolean;
  config: AgentplaneConfig;
}): Promise<{ hash: string; message: string; staged: string[] }> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  if (opts.autoAllow) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--commit-auto-allow is disabled; pass explicit --commit-allow <path-prefix>.",
    });
  }
  let allowPrefixes = opts.allow.map((prefix) => prefix.trim()).filter(Boolean);
  if (allowPrefixes.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide at least one --commit-allow prefix",
    });
  }

  const message = deriveCommitMessageFromComment({
    taskId: opts.taskId,
    primaryTag: opts.primaryTag,
    statusTo: opts.statusTo,
    emoji: opts.emoji,
  });
  const formattedComment =
    opts.formattedComment ?? formatCommentBodyForCommit(opts.commentBody, opts.config);
  const body = deriveCommitBodyFromComment({
    taskId: opts.taskId,
    primaryTag: opts.primaryTag,
    executorAgent: opts.executorAgent,
    author: opts.author,
    statusFrom: opts.statusFrom,
    statusTo: opts.statusTo,
    commentBody: opts.commentBody,
    formattedComment,
  });

  const staged = await stageAllowlist({
    ctx,
    allow: allowPrefixes,
    allowTasks: opts.allowTasks,
    tasksPath: opts.config.paths.tasks_path,
    workflowDir: opts.config.paths.workflow_dir,
    taskId: opts.taskId,
    mutationKind: "lifecycle_commit",
  });

  await guardCommitCheck({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    message,
    allow: allowPrefixes,
    allowBase: false,
    allowTasks: opts.allowTasks,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: opts.requireClean,
    quiet: opts.quiet,
  });

  // Never allow base-branch code commits implicitly from comment-driven commits.
  // Base overrides must be explicit via the `commit` command's --allow-base flag.
  const env = buildGitCommitEnv({
    taskId: opts.taskId,
    agentId: opts.executorAgent,
    statusTo: opts.statusTo,
    allowTasks: opts.allowTasks,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    gitIdentity: await resolveCanonicalGitIdentity(),
  });
  const [changedPaths, stagedPaths] = await Promise.all([
    ctx.git.statusChangedPaths(),
    ctx.git.statusStagedPaths(),
  ]);
  await commitFromCommentWithLock({
    ctx,
    taskId: opts.taskId,
    message,
    body: appendDcoSignoff({ config: opts.config, body }) ?? body,
    env,
    allowPrefixes: allowPrefixes,
    changedPaths,
    stagedPaths,
    mutationKind: "lifecycle_commit",
  });

  const { hash, subject } = await ctx.git.headHashSubject();
  if (!opts.quiet) {
    process.stdout.write(
      `${successMessage(
        "committed",
        `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim(),
        `staged=${staged.join(", ")}`,
      )}\n`,
    );
  }
  return { hash, message: subject, staged };
}
