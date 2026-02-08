import { extractTaskSuffix, type AgentplaneConfig } from "@agentplaneorg/core";

import { invalidValueMessage, successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import {
  formatCommentBodyForCommit,
  normalizeCommentBodyForCommit,
} from "../../../shared/comment-format.js";
import { protectedPathKindForFile } from "../../../shared/protected-paths.js";
import { loadCommandContext, type CommandContext } from "../../shared/task-backend.js";

import { buildGitCommitEnv } from "./env.js";
import { stageAllowlist, suggestAllowPrefixes } from "./allow.js";
import { guardCommitCheck } from "./policy.js";

function deriveCommitMessageFromComment(opts: {
  taskId: string;
  body: string;
  emoji: string;
  formattedComment?: string | null;
  config: AgentplaneConfig;
}): string {
  const raw = (opts.formattedComment ?? formatCommentBodyForCommit(opts.body, opts.config))
    .trim()
    .replaceAll(/\s+/g, " ");
  if (!raw) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Comment body is required to build a commit message from the task comment",
    });
  }
  const summary = raw.replace(/^(start|blocked|verified):\s+/i, "").trim();
  if (!summary) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Comment body is required to build a commit message from the task comment",
    });
  }
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
  return `${prefix} ${suffix} task: ${summary}`;
}

function deriveCommitBodyFromComment(opts: {
  taskId: string;
  author?: string;
  statusFrom?: string;
  statusTo?: string;
  commentBody: string;
  formattedComment: string;
}): string {
  const lines = [
    `Task: ${opts.taskId}`,
    ...(opts.author ? [`Agent: ${opts.author}`] : []),
    ...(opts.statusFrom && opts.statusTo ? [`Status: ${opts.statusFrom} -> ${opts.statusTo}`] : []),
    `Comment: ${normalizeCommentBodyForCommit(opts.formattedComment || opts.commentBody)}`,
  ];

  return lines.join("\n").trimEnd();
}

export async function commitFromComment(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
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
  let allowPrefixes = opts.allow.map((prefix) => prefix.trim()).filter(Boolean);
  if (opts.autoAllow && allowPrefixes.length === 0) {
    const changed = await ctx.git.statusChangedPaths();
    const tasksPath = opts.config.paths.tasks_path;
    // Auto-allow is for ergonomic status commits. It must never silently
    // broaden into policy/config/CI changes (those require explicit intent).
    const eligible = changed.filter((filePath) => {
      const kind = protectedPathKindForFile({ filePath, tasksPath });
      if (!kind) return true;
      if (kind === "tasks") return opts.allowTasks;
      return false;
    });
    allowPrefixes = suggestAllowPrefixes(eligible);
  }
  if (allowPrefixes.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide at least one --commit-allow prefix or enable --commit-auto-allow",
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
    body: opts.commentBody,
    emoji: opts.emoji,
    formattedComment: opts.formattedComment,
    config: opts.config,
  });
  const formattedComment =
    opts.formattedComment ?? formatCommentBodyForCommit(opts.commentBody, opts.config);
  const body = deriveCommitBodyFromComment({
    taskId: opts.taskId,
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
