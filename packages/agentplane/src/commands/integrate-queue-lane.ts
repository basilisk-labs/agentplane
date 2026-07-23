import os from "node:os";

import { gitDiffNames } from "@agentplaneorg/core/git";

import { createCliEmitter } from "../cli/output.js";
import { CliError } from "../shared/errors.js";
import { loadBackendTask, type CommandContext } from "./shared/task-backend.js";
import { gitBranchUpstream, gitRevParse } from "./shared/git-ops.js";
import { resolvePrFlowStatus } from "./pr/flow-status.js";
import { isProviderHeadUnavailableError, requireOpenGithubPrAtHead } from "./pr/provider-head.js";
import {
  markQueueEntry,
  integrationQueueEntryMatchesSnapshot,
  queueBaseConflictReason,
  readIntegrationQueue,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
  type IntegrationQueueEntry,
} from "./pr/integrate/queue-state.js";
import { decideIntegrationQueueRecovery } from "./integrate-queue-recovery.js";
import {
  assertTaskWorktreeClean,
  inspectTaskWorktreeCleanliness,
  summarizeTaskWorktreeChanges,
} from "./shared/task-worktree-cleanliness.js";

export function defaultIntegrationQueueWorker(): string {
  return `${os.userInfo().username}@${os.hostname()}`;
}

export function renderIntegrationQueueEntry(entry: IntegrationQueueEntry): string {
  const pr = entry.pr_number ? `#${entry.pr_number}` : "no-pr";
  return `${entry.status.padEnd(7)} ${entry.task_id} ${pr} priority=${entry.priority} branch=${entry.branch}`;
}

export function findActiveIntegrationLane(
  entries: IntegrationQueueEntry[],
): IntegrationQueueEntry | null {
  return entries.find((entry) => entry.status === "claimed" || entry.status === "handoff") ?? null;
}

export function hasQueuedIntegrationEntries(entries: IntegrationQueueEntry[]): boolean {
  return entries.some((entry) => entry.status === "queued");
}

async function rejectIfQueuedHeadChanged(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<IntegrationQueueEntry | null> {
  const currentHead = await gitRevParse(opts.gitRoot, [opts.entry.branch]);
  if (currentHead === opts.entry.head_sha) return null;
  return {
    ...opts.entry,
    status: "rework",
    updated_at: new Date().toISOString(),
    reason: `branch head changed after enqueue: queued=${opts.entry.head_sha} current=${currentHead}`,
  };
}

async function rejectIfQueuedBaseConflicts(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<IntegrationQueueEntry | null> {
  const currentBaseSha = await gitRevParse(opts.gitRoot, [opts.entry.base]);
  const baseChangedPaths =
    currentBaseSha === opts.entry.base_sha
      ? []
      : await gitDiffNames(opts.gitRoot, opts.entry.base_sha, opts.entry.base);
  const reason = queueBaseConflictReason({
    entry: opts.entry,
    currentBaseSha,
    baseChangedPaths,
  });
  if (!reason) return null;
  return {
    ...opts.entry,
    status: "rework",
    updated_at: new Date().toISOString(),
    reason,
  };
}

async function rejectIfQueuedTaskWorktreeIsDirty(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<IntegrationQueueEntry | null> {
  const probe = await inspectTaskWorktreeCleanliness({
    gitRoot: opts.gitRoot,
    branch: opts.entry.branch,
  });
  if (probe.state === "dirty") {
    return {
      ...opts.entry,
      status: "rework",
      updated_at: new Date().toISOString(),
      reason:
        `task worktree contains uncommitted changes after enqueue: ` +
        summarizeTaskWorktreeChanges(probe.changedPaths),
    };
  }
  assertTaskWorktreeClean({ taskId: opts.entry.task_id, probe });
  return null;
}

export async function rejectIfQueuedEntryPublicationIsStale(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<IntegrationQueueEntry | null> {
  let upstreamRef: string | null = null;
  let upstreamHead: string | null = null;
  try {
    upstreamRef = await gitBranchUpstream(opts.gitRoot, opts.entry.branch);
    upstreamHead = upstreamRef ? await gitRevParse(opts.gitRoot, [upstreamRef]) : null;
  } catch (err) {
    return {
      ...opts.entry,
      status: "rework",
      updated_at: new Date().toISOString(),
      reason: `queued branch upstream could not be resolved: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
  if (!upstreamRef || upstreamHead !== opts.entry.head_sha) {
    return {
      ...opts.entry,
      status: "rework",
      updated_at: new Date().toISOString(),
      reason:
        `queued branch head is not published upstream: queued=${opts.entry.head_sha} ` +
        `upstream=${upstreamHead ?? "<missing>"}`,
    };
  }
  try {
    await requireOpenGithubPrAtHead({
      gitRoot: opts.gitRoot,
      branch: opts.entry.branch,
      base: opts.entry.base,
      expectedHeadSha: opts.entry.head_sha,
      prNumber: opts.entry.pr_number,
    });
    return null;
  } catch (err) {
    if (isProviderHeadUnavailableError(err)) {
      throw new CliError({
        code: "E_HANDOFF",
        message:
          `queued provider validation is temporarily unavailable for ${opts.entry.task_id}: ` +
          (err instanceof Error ? err.message : String(err)),
        context: {
          reason_code: "integration_queue_provider_unavailable",
          task_id: opts.entry.task_id,
          branch: opts.entry.branch,
        },
      });
    }
    return {
      ...opts.entry,
      status: "rework",
      updated_at: new Date().toISOString(),
      reason: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function rejectIfQueuedEntryIsStale(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<IntegrationQueueEntry | null> {
  return (
    (await rejectIfQueuedTaskWorktreeIsDirty(opts)) ??
    (await rejectIfQueuedHeadChanged(opts)) ??
    (await rejectIfQueuedBaseConflicts(opts))
  );
}

export async function recoverStaleActiveLane(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  entry: IntegrationQueueEntry;
  quiet: boolean;
}): Promise<boolean> {
  const report = await resolvePrFlowStatus({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? undefined,
    taskId: opts.entry.task_id,
  });
  const decision = decideIntegrationQueueRecovery({ entry: opts.entry, report });
  if (decision.action === "keep") {
    if (!opts.quiet) {
      createCliEmitter().line(
        `integration queue lane retained: task=${opts.entry.task_id} status=${opts.entry.status} reason=${decision.reason}`,
      );
    }
    return false;
  }

  const updated = await withIntegrationQueueMutex(opts.gitRoot, async () => {
    const queue = await readIntegrationQueue(opts.gitRoot);
    const current = queue.entries.find((entry) => entry.task_id === opts.entry.task_id);
    if (!integrationQueueEntryMatchesSnapshot(current, opts.entry)) return false;
    await writeIntegrationQueue(
      opts.gitRoot,
      markQueueEntry(queue, opts.entry.task_id, decision.status, decision.reason),
    );
    return true;
  });
  if (!updated) return false;
  if (!opts.quiet) {
    createCliEmitter().line(
      `integration queue recovered: task=${opts.entry.task_id} status=${decision.status} reason=${decision.reason}`,
    );
  }
  return true;
}

export async function normalizeTerminalQueueEntries(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  quiet: boolean;
}): Promise<void> {
  const snapshot = await readIntegrationQueue(opts.gitRoot);
  const candidates = snapshot.entries.filter(
    (entry) => entry.status !== "done" && entry.status !== "claimed",
  );
  const decisions: {
    taskId: string;
    snapshot: IntegrationQueueEntry;
    reason: string;
  }[] = [];

  for (const entry of candidates) {
    const loaded = await loadBackendTask({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: entry.task_id,
    }).catch(() => null);
    if (loaded?.task.status !== "DONE" && entry.status !== "handoff") {
      continue;
    }
    const report = await resolvePrFlowStatus({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? undefined,
      taskId: entry.task_id,
    }).catch(() => null);
    if (!report) continue;
    const decision = decideIntegrationQueueRecovery({ entry, report });
    if (decision.action !== "mark" || decision.status !== "done") continue;
    decisions.push({ taskId: entry.task_id, snapshot: entry, reason: decision.reason });
  }

  if (decisions.length === 0) return;

  const normalized = await withIntegrationQueueMutex(opts.gitRoot, async () => {
    let queue = await readIntegrationQueue(opts.gitRoot);
    const applied: { taskId: string; reason: string }[] = [];
    for (const decision of decisions) {
      const current = queue.entries.find((entry) => entry.task_id === decision.taskId);
      if (!integrationQueueEntryMatchesSnapshot(current, decision.snapshot)) continue;
      queue = markQueueEntry(queue, decision.taskId, "done", decision.reason);
      applied.push({ taskId: decision.taskId, reason: decision.reason });
    }
    if (applied.length > 0) await writeIntegrationQueue(opts.gitRoot, queue);
    return applied;
  });

  if (!opts.quiet) {
    for (const item of normalized) {
      createCliEmitter().line(
        `integration queue normalized: task=${item.taskId} status=done reason=${item.reason}`,
      );
    }
  }
}
