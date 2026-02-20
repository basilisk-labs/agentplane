import { extractTaskSuffix, type AgentplaneConfig } from "@agentplaneorg/core";

import { invalidValueMessage, successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import {
  formatCommentBodyForCommit,
  normalizeCommentBodyForCommit,
} from "../../../shared/comment-format.js";
import { loadCommandContext, type CommandContext } from "../../shared/task-backend.js";

import { buildGitCommitEnv } from "./env.js";
import { stageAllowlist } from "./allow.js";
import { guardCommitCheck } from "./policy.js";

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

  const staged = await stageAllowlist({
    ctx,
    allow: allowPrefixes,
    allowTasks: opts.allowTasks,
    tasksPath: opts.config.paths.tasks_path,
  });

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
  });
  await ctx.git.commit({ message, body, env });

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
