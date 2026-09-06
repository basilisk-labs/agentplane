import { runProcess } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";
import { projectTaskCentricCompatibilityMutation } from "../../adapters/task-backend/task-centric-backend-projection.js";
import { cmdCommit } from "../guard/impl/commit.js";
import { commitRefreshedTaskArtifacts } from "../guard/impl/commit-refresh.js";
import { refreshBranchPrArtifactsAfterTaskCommit } from "../shared/post-commit-pr-artifacts.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  createTaskScopeExtensionRequestState,
  externalBlockerReceipt,
  requiresImplementationReworkReopen,
  TASK_SCOPE_EXTENSION_REQUEST_KEY,
} from "../shared/task-scope-extension-request.js";

import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { cmdTaskSetStatus } from "./set-status.js";

function blockerSubject(taskId: string): string {
  return `🚧 ${taskId.split("-").at(-1)} task: record external blocker`;
}

function scopeExtensionState(opts: {
  exchange: ExternalAgentExchange;
  semantic: ExternalAgentResultEnvelope["result"];
}) {
  const request = opts.semantic.blocker?.scope_extension_request;
  return request
    ? createTaskScopeExtensionRequestState({
        request,
        transition_id: opts.exchange.transition_id,
        state_fingerprint: opts.exchange.state_fingerprint,
      })
    : null;
}

function externalBlockedResultReceipt(opts: {
  exchange: ExternalAgentExchange;
  semantic: ExternalAgentResultEnvelope["result"];
}): string {
  const pending = scopeExtensionState(opts);
  return externalBlockerReceipt({
    transition_id: opts.exchange.transition_id,
    state_fingerprint: opts.exchange.state_fingerprint,
    ...(pending ? { request_digest: pending.request_digest } : {}),
  });
}

export function blockedResultBody(opts: {
  exchange: ExternalAgentExchange;
  semantic: ExternalAgentResultEnvelope["result"];
}): string {
  const recommendation = opts.semantic.blocker?.recommended_action?.trim();
  const pending = scopeExtensionState(opts);
  const requestedScope = pending
    ? ` Requested scope: roots=${pending.request.scope_roots.join(",") || "unchanged"}; ` +
      `repository effects=${pending.request.repository_effects.join(",") || "unchanged"}; ` +
      `request digest=${pending.request_digest}.`
    : "";
  return (
    `Blocked: external ${opts.exchange.role} could not complete the scoped implementation. ` +
    `${opts.semantic.summary.trim()}` +
    (recommendation ? ` Recommended action: ${recommendation}` : "") +
    requestedScope +
    ` ${externalBlockedResultReceipt(opts)}`
  );
}

export async function isExternalBlockedResultRecorded(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  semantic: ExternalAgentResultEnvelope["result"];
}): Promise<boolean> {
  const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id });
  const receipt = externalBlockedResultReceipt(opts);
  return Boolean(
    task.status === "BLOCKED" &&
    (task.comments ?? []).some(
      (comment) => comment.author === "SUPERVISOR" && comment.body.includes(receipt),
    ),
  );
}

async function persistScopeExtensionRequest(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  semantic: ExternalAgentResultEnvelope["result"];
}): Promise<void> {
  const pending = scopeExtensionState(opts);
  if (!pending) return;
  const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id });
  await opts.command.taskBackend.writeTask(
    projectTaskCentricCompatibilityMutation({
      current: task,
      next: {
        ...task,
        extensions: {
          ...(task.extensions ?? {}),
          [TASK_SCOPE_EXTENSION_REQUEST_KEY]: pending,
        },
      },
    }),
    task.revision ? { expectedRevision: task.revision } : undefined,
  );
}

function statusPath(line: string): string {
  const raw = line.length >= 4 ? line.slice(3).trim() : "";
  const renamed = raw.includes(" -> ") ? (raw.split(" -> ").at(-1) ?? raw) : raw;
  return renamed.replaceAll("\\", "/");
}

function assertRetryWorkspaceState(opts: {
  exchange: ExternalAgentExchange;
  status_lines: readonly string[];
  blocker_commit_exists: boolean;
}): void {
  const baseline = new Set(opts.exchange.baseline.changed_paths);
  const taskPrefix = `.agentplane/tasks/${opts.exchange.task_id}/`;
  for (const line of baseline) {
    const committedTaskArtifact =
      opts.blocker_commit_exists && statusPath(line).startsWith(taskPrefix);
    if (!committedTaskArtifact && !opts.status_lines.includes(line)) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "A pre-existing repository change moved while recovering the external blocker.",
      });
    }
  }
  const escaped = opts.status_lines
    .filter((line) => !baseline.has(line))
    .map((line) => statusPath(line))
    .filter((entry) => entry && !entry.startsWith(taskPrefix));
  if (escaped.length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `External blocker recovery found changes outside task evidence: ${escaped.join(", ")}.`,
    });
  }
}

async function assertRecoverableBlockerCommit(opts: {
  exchange: ExternalAgentExchange;
  head: string;
}): Promise<void> {
  const baseline = opts.exchange.baseline.head;
  if (!baseline) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External blocker recovery requires a recorded baseline commit.",
    });
  }
  const [subject, count, changedPaths] = await Promise.all([
    runProcess({
      command: "git",
      args: ["show", "-s", "--format=%s", opts.head],
      cwd: opts.exchange.checkout,
      reject: false,
    }),
    runProcess({
      command: "git",
      args: ["rev-list", "--count", `${baseline}..${opts.head}`],
      cwd: opts.exchange.checkout,
      reject: false,
    }),
    runProcess({
      command: "git",
      args: ["diff", "--name-only", "--diff-filter=ACDMRTUXB", `${baseline}..${opts.head}`],
      cwd: opts.exchange.checkout,
      reject: false,
    }),
  ]);
  const taskPrefix = `.agentplane/tasks/${opts.exchange.task_id}/`;
  const committedPaths = changedPaths.stdout.split("\n").filter(Boolean);
  if (
    subject.exitCode !== 0 ||
    subject.stdout.trim() !== blockerSubject(opts.exchange.task_id) ||
    count.exitCode !== 0 ||
    count.stdout.trim() !== "1" ||
    changedPaths.exitCode !== 0 ||
    committedPaths.length === 0 ||
    committedPaths.some((entry) => !entry.replaceAll("\\", "/").startsWith(taskPrefix))
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Git history changed outside the recoverable Agentplane blocker effect.",
    });
  }
}

async function commitExternalBlocker(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
}): Promise<void> {
  const [head, status] = await Promise.all([
    readDirectTaskHead(opts.exchange.checkout),
    readDirectRepositoryStatus(opts.exchange.checkout),
  ]);
  assertRetryWorkspaceState({
    exchange: opts.exchange,
    status_lines: status?.lines ?? [],
    blocker_commit_exists: head !== opts.exchange.baseline.head,
  });
  if (head !== opts.exchange.baseline.head) {
    if (!head) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "External blocker recovery could not resolve the current task head.",
      });
    }
    await assertRecoverableBlockerCommit({ exchange: opts.exchange, head });
    await refreshBranchPrArtifactsAfterTaskCommit({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      quiet: true,
    });
    opts.command.git.invalidateStatus();
    await commitRefreshedTaskArtifacts({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      sourceMessage: blockerSubject(opts.exchange.task_id),
      quiet: true,
    });
    return;
  }
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    message: blockerSubject(opts.exchange.task_id),
    close: false,
    allow: [],
    autoAllow: false,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: false,
    quiet: true,
    closeUnstageOthers: false,
    closeCheckOnly: false,
  });
  if (exitCode !== 0) throw new Error(`External-agent blocker commit exited ${exitCode}.`);
}

export async function recordExternalBlockedResult(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  semantic: ExternalAgentResultEnvelope["result"];
}): Promise<void> {
  if (!(await isExternalBlockedResultRecorded(opts))) {
    const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.exchange.task_id });
    const reopenDone = requiresImplementationReworkReopen({
      purpose: opts.exchange.purpose,
      task_status: task.status,
      work_item_id: null,
      work_item_is_required: false,
    });
    await cmdTaskSetStatus({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      status: "BLOCKED",
      author: "SUPERVISOR",
      body: blockedResultBody({ exchange: opts.exchange, semantic: opts.semantic }),
      force: reopenDone,
      yes: reopenDone,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
  }
  await persistScopeExtensionRequest(opts);
  await commitExternalBlocker({ command: opts.command, exchange: opts.exchange });
}
