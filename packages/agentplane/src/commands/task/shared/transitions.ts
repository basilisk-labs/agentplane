import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import type { AgentplaneConfig } from "@agentplaneorg/core";

import { warnMessage } from "../../../cli/output.js";
import { resolveCommitEmojiForAgent } from "../../../shared/agent-emoji.js";
import { CliError } from "../../../shared/errors.js";
import { parseGitLogHashSubject } from "../../../shared/git-log.js";
import type { TaskData, TaskEvent } from "../../../backends/task-backend.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { requiresVerificationByPrimary, toStringArray } from "./tags.js";

const execFileAsync = promisify(execFile);

export function appendTaskEvent(task: TaskData, event: TaskEvent): TaskEvent[] {
  const existing = Array.isArray(task.events)
    ? task.events.filter(
        (entry): entry is TaskEvent =>
          !!entry &&
          typeof entry.type === "string" &&
          typeof entry.at === "string" &&
          typeof entry.author === "string",
      )
    : [];
  return [...existing, event];
}

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
    `or \`agentplane task verify ok|rework ${task.id} --by <ID> --note <TEXT>\``;

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `${task.id}: verification result is required before integration/closure can proceed ` +
      `(verification.state=${JSON.stringify(state)}; ${hint} or set agents.approvals.require_verify=false).`,
  });
}

export function isTransitionAllowed(current: string, next: string): boolean {
  if (current === next) return true;
  if (current === "TODO") return next === "DOING" || next === "BLOCKED";
  if (current === "DOING") return next === "DONE" || next === "BLOCKED";
  if (current === "BLOCKED") return next === "TODO" || next === "DOING";
  if (current === "DONE") return false;
  return false;
}

export function ensureStatusTransitionAllowed(opts: {
  currentStatus: string;
  nextStatus: string;
  force: boolean;
}): void {
  if (opts.force) return;
  if (isTransitionAllowed(opts.currentStatus, opts.nextStatus)) return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `Refusing status transition ${opts.currentStatus} -> ${opts.nextStatus} ` +
      "(use --force to override)",
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
  if (!opts.enabled) return;
  if (opts.config.commit_automation === "finish_only") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: --commit-from-comment is disabled by commit_automation='finish_only' ` +
        "(allowed only in finish).",
    });
  }
  enforceStatusCommitPolicy({
    policy: opts.config.status_commit_policy,
    action: opts.action,
    confirmed: opts.confirmed,
    quiet: opts.quiet,
    statusFrom: opts.statusFrom,
    statusTo: opts.statusTo,
  });
}

export function requireStructuredComment(body: string, prefix: string, minChars: number): void {
  const normalized = body.trim();
  if (!normalized.toLowerCase().startsWith(prefix.toLowerCase())) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Comment body must start with ${prefix}`,
    });
  }
  if (normalized.length < minChars) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Comment body must be at least ${minChars} characters`,
    });
  }
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
  if (!isMajorStatusCommitTransition(opts.statusFrom, opts.statusTo)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: status/comment-driven commit is allowed only for major transitions ` +
        `(got ${opts.statusFrom.toUpperCase()} -> ${opts.statusTo.toUpperCase()})`,
    });
  }
  if (opts.policy === "off") return;
  if (opts.policy === "warn") {
    if (!opts.quiet && !opts.confirmed) {
      process.stderr.write(
        `${warnMessage(
          `${opts.action}: status/comment-driven commit requested; policy=warn (pass --confirm-status-commit to acknowledge)`,
        )}\n`,
      );
    }
    return;
  }
  if (opts.policy === "confirm" && !opts.confirmed) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: status/comment-driven commit blocked by status_commit_policy='confirm' ` +
        "(pass --confirm-status-commit to proceed)",
    });
  }
}

const MAJOR_STATUS_COMMIT_TRANSITIONS = new Set([
  "READY->DOING",
  "TODO->DOING",
  "DOING->BLOCKED",
  "BLOCKED->DOING",
  "DOING->DONE",
]);

export function isMajorStatusCommitTransition(statusFrom: string, statusTo: string): boolean {
  const from = statusFrom.trim().toUpperCase();
  const to = statusTo.trim().toUpperCase();
  if (!from || !to) return false;
  return MAJOR_STATUS_COMMIT_TRANSITIONS.has(`${from}->${to}`);
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
  const normalized = status.trim().toUpperCase();
  if (normalized === "DOING") return "🚧";
  if (normalized === "DONE") return "✅";
  if (normalized === "BLOCKED") return "⛔";
  return "🧩";
}

export async function defaultCommitEmojiForAgentId(
  ctx: CommandContext,
  agentId: string,
): Promise<string> {
  const agentsDir = path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.agents_dir);
  return await resolveCommitEmojiForAgent({ agentsDirAbs: agentsDir, agentId });
}
