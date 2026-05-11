import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { resolveBaseBranch } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { infoMessage, warnMessage } from "../../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { readDirectWorkLock } from "./direct-work-lock.js";
import { CliError } from "../../../shared/errors.js";
import { parseGitLogHashSubject } from "./git-log.js";
import type { TaskData } from "../../../backends/task-backend.js";
import { commitFromComment } from "../../guard/impl/comment-commit.js";
import { gitCurrentBranch } from "../../shared/git-ops.js";
import { refreshBranchPrArtifactsAfterTaskCommit } from "../../shared/post-commit-pr-artifacts.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { requiresVerificationByPrimary, toStringArray } from "./tags.js";
import {
  resolveCommentCommitWarning,
  resolveStatusCommitPolicyWarning,
} from "./transition-rules.js";

export function ensurePlanApprovedIfRequired(task: TaskData, config: AgentplaneConfig): void {
  if (config.agents?.approvals?.require_plan !== true) return;

  const state = task.plan_approval?.state ?? "missing";
  if (state === "approved") return;

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `${task.id}: plan approval is required before work can proceed ` +
      `(plan_approval.state=${JSON.stringify(state)}; use \`agentplane task plan approve ${task.id} --by <USER>\` ` +
      "or set agents.approvals.require_plan=false).",
  });
}

export function ensureVerificationSatisfiedIfRequired(
  task: TaskData,
  config: AgentplaneConfig,
): void {
  if (config.agents?.approvals?.require_verify !== true) return;
  if (!requiresVerificationByPrimary(toStringArray(task.tags), config)) return;

  const state = task.verification?.state ?? "missing";
  if (state === "ok") return;

  const hint =
    `use \`agentplane verify ${task.id} --ok|--rework --by <ID> --note <TEXT>\` ` +
    `and add \`--observation <TEXT> --impact <TEXT> --resolution <TEXT>\` when you want a structured finding ` +
    `or \`agentplane task verify ok|rework ${task.id} --by <ID> --note <TEXT>\``;

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `${task.id}: verification result is required before integration/closure can proceed ` +
      `(verification.state=${JSON.stringify(state)}; ${hint} or set agents.approvals.require_verify=false).`,
  });
}

export function ensureCommentCommitAllowed(opts: {
  enabled: boolean;
  config: AgentplaneConfig;
  action: string;
  confirmed: boolean;
  quiet: boolean;
  statusFrom: string;
  statusTo: string;
}): void {
  const warning = resolveCommentCommitWarning(opts);
  if (warning) {
    process.stderr.write(`${warnMessage(warning)}\n`);
  }
}

export async function ensureLifecycleCommentCommitLocation(opts: {
  enabled: boolean;
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  command: "task start-ready" | "task set-status" | "finish";
  taskId: string;
}): Promise<void> {
  if (!opts.enabled) return;
  if (opts.ctx.config.workflow_mode === "direct") return;

  if (opts.command === "finish") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: [
        "finish --commit-from-comment is not supported in branch_pr.",
        "Why: finish runs on the base checkout; implementation commits belong to task worktrees.",
        'Use: agentplane finish <task-id> --author INTEGRATOR --body "Verified: ..." --result "..." --commit <hash> --close-commit',
      ].join("\n"),
    });
  }

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: null,
    mode: opts.ctx.config.workflow_mode,
  });
  if (!baseBranch) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.command} --commit-from-comment requires a resolved branch_pr base branch; ` +
        "run `agentplane branch base set <branch>` first.",
    });
  }

  const currentBranch = await gitCurrentBranch(opts.ctx.resolvedProject.gitRoot);
  if (currentBranch !== baseBranch) return;

  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: [
      `${opts.command} --commit-from-comment is not supported on the branch_pr base checkout.`,
      "Why: lifecycle comment commits for task execution belong to the task worktree.",
      `Use: agentplane work start ${opts.taskId} --agent <ROLE> --slug <slug> --worktree, then rerun from the task worktree.`,
    ].join("\n"),
  });
}

export function emitTransitionWarnings(warnings: readonly string[], quiet: boolean): void {
  if (quiet) return;
  for (const warning of new Set(warnings.filter((item) => item.trim().length > 0))) {
    process.stderr.write(`${warnMessage(warning)}\n`);
  }
}

export function requireStructuredComment(body: string, prefix: string, minChars: number): void {
  const normalized = body.trim();
  if (!normalized.toLowerCase().startsWith(prefix.toLowerCase())) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: [
        `Comment body must start with ${prefix}`,
        `actual_start=${JSON.stringify(normalized.slice(0, Math.max(prefix.length, 1)))}`,
        `actual_length=${normalized.length}; minimum_length=${minChars}`,
        `Fix: pass --body "${prefix} <specific verification or start note at least ${minChars} characters long>"`,
      ].join("\n"),
    });
  }
  if (normalized.length < minChars) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: [
        `Comment body must be at least ${minChars} characters`,
        `actual_length=${normalized.length}; minimum_length=${minChars}; required_prefix=${prefix}`,
        `Fix: expand --body "${prefix} <specific verification or start note at least ${minChars} characters long>"`,
      ].join("\n"),
    });
  }
}

export function prepareTaskTransitionComment(opts: {
  body?: string;
  enabled: boolean;
  config: AgentplaneConfig;
}): {
  formattedComment: string | null;
  commentBody: string | undefined;
} {
  if (typeof opts.body !== "string") {
    return { formattedComment: null, commentBody: undefined };
  }
  const formattedComment = opts.enabled ? formatCommentBodyForCommit(opts.body, opts.config) : null;
  return {
    formattedComment,
    commentBody: formattedComment ?? opts.body,
  };
}

export type TaskTransitionCommentCommandOptions = {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  force: boolean;
  yes?: boolean;
  quiet: boolean;
};

export async function resolveTaskTransitionExecutorAgent(opts: {
  ctx: Pick<CommandContext, "config" | "resolvedProject">;
  taskId: string;
  author?: string;
}): Promise<string | undefined> {
  const author = opts.author?.trim() ?? "";
  if (opts.ctx.config.workflow_mode !== "direct") {
    return author || undefined;
  }
  const lock = await readDirectWorkLock(opts.ctx.resolvedProject.agentplaneDir);
  const lockAgent = lock?.task_id === opts.taskId ? (lock.agent?.trim() ?? "") : "";
  return lockAgent || author || undefined;
}

export async function runTaskTransitionCommentCommit(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  primaryTag: string;
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
  progressMessage?: string;
  resolveExecutorAgent?: boolean;
}): Promise<{ hash: string; message: string; staged: string[] }> {
  if (opts.progressMessage && !opts.quiet) {
    process.stdout.write(`${infoMessage(opts.progressMessage)}\n`);
  }
  const executorAgent = opts.resolveExecutorAgent
    ? await resolveTaskTransitionExecutorAgent({
        ctx: opts.ctx,
        taskId: opts.taskId,
        author: opts.author,
      })
    : undefined;
  const result = await commitFromComment({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    primaryTag: opts.primaryTag,
    executorAgent,
    author: opts.author,
    statusFrom: opts.statusFrom,
    statusTo: opts.statusTo,
    commentBody: opts.commentBody,
    formattedComment: opts.formattedComment,
    emoji: opts.emoji,
    allow: opts.allow,
    autoAllow: opts.autoAllow,
    allowTasks: opts.allowTasks,
    requireClean: opts.requireClean,
    quiet: opts.quiet,
    config: opts.ctx.config,
  });
  await refreshBranchPrArtifactsAfterTaskCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    quiet: opts.quiet,
  });
  return result;
}

export async function runOptionalTaskTransitionCommentCommit(opts: {
  enabled: boolean;
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  primaryTag: string;
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
  progressMessage?: string;
  resolveExecutorAgent?: boolean;
}): Promise<{ hash: string; message: string; staged: string[] } | null> {
  if (!opts.enabled) return null;
  return runTaskTransitionCommentCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    primaryTag: opts.primaryTag,
    author: opts.author,
    statusFrom: opts.statusFrom,
    statusTo: opts.statusTo,
    commentBody: opts.commentBody,
    formattedComment: opts.formattedComment,
    emoji: opts.emoji,
    allow: opts.allow,
    autoAllow: opts.autoAllow,
    allowTasks: opts.allowTasks,
    requireClean: opts.requireClean,
    quiet: opts.quiet,
    progressMessage: opts.progressMessage,
    resolveExecutorAgent: opts.resolveExecutorAgent,
  });
}

export async function readHeadCommit(cwd: string): Promise<{ hash: string; message: string }> {
  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H%x00%s"], { cwd });
  const { hash, subject } = parseGitLogHashSubject(stdout);
  return { hash, message: subject };
}

export function enforceStatusCommitPolicy(opts: {
  policy: AgentplaneConfig["status_commit_policy"];
  action: string;
  confirmed: boolean;
  quiet: boolean;
  statusFrom: string;
  statusTo: string;
}): void {
  const warning = resolveStatusCommitPolicyWarning(opts);
  if (warning) {
    process.stderr.write(`${warnMessage(warning)}\n`);
  }
}

export async function readCommitInfo(
  cwd: string,
  rev: string,
): Promise<{ hash: string; message: string }> {
  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H%x00%s", rev], { cwd });
  const { hash, subject } = parseGitLogHashSubject(stdout);
  return { hash, message: subject };
}

export function defaultCommitEmojiForStatus(status: string): string {
  const normalized = normalizeTaskStatus(status);
  if (normalized === "DOING") return "🚧";
  if (normalized === "DONE") return "✅";
  if (normalized === "BLOCKED") return "⛔";
  return "🧩";
}
