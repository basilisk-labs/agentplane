import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import type { TaskData, TaskEvent } from "../../../backends/task-backend.js";
import { CliError } from "../../../shared/errors.js";

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

export function resolveCommentCommitWarning(opts: {
  enabled: boolean;
  config: AgentplaneConfig;
  action: string;
  confirmed: boolean;
  quiet: boolean;
  statusFrom: string;
  statusTo: string;
}): string | null {
  if (!opts.enabled) return null;
  if (opts.config.commit_automation === "finish_only") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: --commit-from-comment is disabled by commit_automation='finish_only' ` +
        "(allowed only in finish).",
    });
  }
  return resolveStatusCommitPolicyWarning({
    policy: opts.config.status_commit_policy,
    action: opts.action,
    confirmed: opts.confirmed,
    quiet: opts.quiet,
    statusFrom: opts.statusFrom,
    statusTo: opts.statusTo,
  });
}

export function resolveStatusCommitPolicyWarning(opts: {
  policy: AgentplaneConfig["status_commit_policy"];
  action: string;
  confirmed: boolean;
  quiet: boolean;
  statusFrom: string;
  statusTo: string;
}): string | null {
  if (!isMajorStatusCommitTransition(opts.statusFrom, opts.statusTo)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: status/comment-driven commit is allowed only for major transitions ` +
        `(got ${opts.statusFrom.toUpperCase()} -> ${opts.statusTo.toUpperCase()})`,
    });
  }
  if (opts.policy === "off") return null;
  if (opts.policy === "warn") {
    return opts.quiet || opts.confirmed
      ? null
      : `${opts.action}: status/comment-driven commit requested; policy=warn ` +
          "(pass --confirm-status-commit to acknowledge)";
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
  return null;
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
