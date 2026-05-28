import os from "node:os";

import { gitDiffNames } from "@agentplaneorg/core/git";
import type { CommandCtx, CommandHandler } from "../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../cli/group-command.js";
import { createCliEmitter, emptyStateMessage } from "../cli/output.js";
import { CliError } from "../shared/errors.js";
import { sleep } from "../backends/task-backend/shared/concurrency.js";
import { loadBackendTask, type CommandContext } from "./shared/task-backend.js";
import { gitRevParse } from "./shared/git-ops.js";
import { cmdIntegrate } from "./pr/integrate/cmd.js";
import { resolvePrFlowStatus } from "./pr/flow-status.js";
import { prepareIntegrate } from "./pr/integrate/internal/prepare.js";
import {
  claimNextQueuedEntry,
  markQueueEntry,
  queueBaseConflictReason,
  readIntegrationQueue,
  upsertQueuedEntry,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
  type IntegrationQueueEntry,
} from "./pr/integrate/queue-state.js";
import { applyIntegrationQueueDoctorRepairs } from "./integrate-queue-doctor.js";
import type {
  IntegrateQueueClaimParsed,
  IntegrateQueueDoctorParsed,
  IntegrateQueueEnqueueParsed,
  IntegrateQueueListParsed,
  IntegrateQueueReleaseParsed,
  IntegrateQueueRunNextParsed,
} from "./integrate-queue.spec.js";
import { integrateQueueSpec } from "./integrate-queue.spec.js";
import { decideIntegrationQueueRecovery } from "./integrate-queue-recovery.js";
import { waitForHostedChecks } from "./pr/hosted-checks.js";

const DEFAULT_QUEUE_POLL_INTERVAL_MS = 30_000;
const DEFAULT_QUEUE_WAIT_TIMEOUT_MS = 10 * 60_000;

export {
  integrateQueueClaimSpec,
  integrateQueueDoctorSpec,
  integrateQueueEnqueueSpec,
  integrateQueueListSpec,
  integrateQueueReleaseSpec,
  integrateQueueRunNextSpec,
  integrateQueueSpec,
} from "./integrate-queue.spec.js";

async function runIntegrateQueueRootGroup(
  _ctx: CommandCtx,
  p: GroupCommandParsed,
): Promise<number> {
  throwGroupCommandUsage({
    spec: integrateQueueSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["integrate", "queue"]),
    command: "integrate queue",
  });
}

function defaultWorker(): string {
  return `${os.userInfo().username}@${os.hostname()}`;
}

function renderEntry(entry: IntegrationQueueEntry): string {
  const pr = entry.pr_number ? `#${entry.pr_number}` : "no-pr";
  return `${entry.status.padEnd(7)} ${entry.task_id} ${pr} priority=${entry.priority} branch=${entry.branch}`;
}

function findActiveLane(entries: IntegrationQueueEntry[]): IntegrationQueueEntry | null {
  return entries.find((entry) => entry.status === "claimed" || entry.status === "handoff") ?? null;
}

function hasQueuedEntries(entries: IntegrationQueueEntry[]): boolean {
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

async function rejectIfQueuedEntryIsStale(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<IntegrationQueueEntry | null> {
  return (await rejectIfQueuedHeadChanged(opts)) ?? (await rejectIfQueuedBaseConflicts(opts));
}

async function recoverStaleActiveLane(opts: {
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
    if (current?.status !== "handoff") return false;
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

async function normalizeTerminalQueueEntries(opts: {
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
    fromStatus: IntegrationQueueEntry["status"];
    reason: string;
  }[] = [];

  for (const entry of candidates) {
    const loaded = await loadBackendTask({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: entry.task_id,
    }).catch(() => null);
    if (loaded?.task.status === "DONE") {
      decisions.push({
        taskId: entry.task_id,
        fromStatus: entry.status,
        reason: "task is already DONE; queue entry is terminal stale",
      });
      continue;
    }

    if (entry.status !== "handoff") continue;
    const report = await resolvePrFlowStatus({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? undefined,
      taskId: entry.task_id,
    }).catch(() => null);
    if (!report) continue;
    const decision = decideIntegrationQueueRecovery({ entry, report });
    if (decision.action !== "mark" || decision.status !== "done") continue;
    decisions.push({ taskId: entry.task_id, fromStatus: entry.status, reason: decision.reason });
  }

  if (decisions.length === 0) return;

  const normalized = await withIntegrationQueueMutex(opts.gitRoot, async () => {
    let queue = await readIntegrationQueue(opts.gitRoot);
    const applied: { taskId: string; reason: string }[] = [];
    for (const decision of decisions) {
      const current = queue.entries.find((entry) => entry.task_id === decision.taskId);
      if (current?.status !== decision.fromStatus) continue;
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

export function makeRunIntegrateQueueHandler(
  _getCtx: (cmd: string) => Promise<CommandContext>,
): CommandHandler<GroupCommandParsed> {
  return runIntegrateQueueRootGroup;
}

export function makeRunIntegrateQueueEnqueueHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: IntegrateQueueEnqueueParsed): Promise<number> => {
    const commandCtx = await getCtx("integrate queue enqueue");
    const prepared = await prepareIntegrate({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      branch: p.branch ?? undefined,
      base: p.base ?? undefined,
      runVerify: false,
    });
    const baseSha = await gitRevParse(prepared.resolved.gitRoot, [prepared.base]);
    await withIntegrationQueueMutex(prepared.resolved.gitRoot, async () => {
      const queue = await readIntegrationQueue(prepared.resolved.gitRoot);
      await writeIntegrationQueue(
        prepared.resolved.gitRoot,
        upsertQueuedEntry(queue, {
          task_id: prepared.task.id,
          branch: prepared.branch,
          base: prepared.base,
          head_sha: prepared.branchHeadSha,
          base_sha: baseSha,
          changed_paths: prepared.changedPaths,
          pr_number:
            typeof prepared.metaSource.pr_number === "number"
              ? prepared.metaSource.pr_number
              : null,
          pr_url:
            typeof prepared.metaSource.pr_url === "string" ? prepared.metaSource.pr_url : null,
          priority: p.priority,
        }),
      );
    });
    createCliEmitter().success("queued integration", prepared.task.id, `branch=${prepared.branch}`);
    return 0;
  };
}

export function makeRunIntegrateQueueListHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: IntegrateQueueListParsed): Promise<number> => {
    const commandCtx = await getCtx("integrate queue list");
    const gitRoot = commandCtx.resolvedProject.gitRoot;
    await normalizeTerminalQueueEntries({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      gitRoot,
      quiet: p.json,
    });
    const queue = await readIntegrationQueue(gitRoot);
    const output = createCliEmitter();
    if (p.json) {
      output.json(queue);
      return 0;
    }
    const active = queue.entries.filter((entry) => entry.status !== "done");
    if (active.length === 0) {
      output.line(emptyStateMessage("integration queue entries"));
      return 0;
    }
    output.lines(active.map((entry) => renderEntry(entry)));
    return 0;
  };
}

export function makeRunIntegrateQueueDoctorHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: IntegrateQueueDoctorParsed): Promise<number> => {
    const commandCtx = await getCtx("integrate queue doctor");
    const gitRoot = commandCtx.resolvedProject.gitRoot;
    const before = await readIntegrationQueue(gitRoot);
    const findings: { task_id: string; status: string; reason: string; repair: string | null }[] =
      [];
    let nextQueue = before;

    for (const entry of before.entries) {
      const loaded = await loadBackendTask({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
        taskId: entry.task_id,
      }).catch(() => null);
      if (loaded?.task.status === "DONE" && entry.status !== "done") {
        const reason = "task is already DONE; queue entry is terminal stale";
        findings.push({
          task_id: entry.task_id,
          status: entry.status,
          reason,
          repair: "mark_done",
        });
        nextQueue = markQueueEntry(nextQueue, entry.task_id, "done", reason);
        continue;
      }
      if (entry.status !== "handoff") continue;
      const report = await resolvePrFlowStatus({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? undefined,
        taskId: entry.task_id,
      }).catch(() => null);
      if (!report) continue;
      const decision = decideIntegrationQueueRecovery({ entry, report });
      if (decision.action !== "mark") continue;
      findings.push({
        task_id: entry.task_id,
        status: entry.status,
        reason: decision.reason,
        repair: `mark_${decision.status}`,
      });
      nextQueue = markQueueEntry(nextQueue, entry.task_id, decision.status, decision.reason);
    }

    if (p.fix && !p.dryRun) {
      await withIntegrationQueueMutex(gitRoot, async () => {
        await writeIntegrationQueue(
          gitRoot,
          applyIntegrationQueueDoctorRepairs(await readIntegrationQueue(gitRoot), findings),
        );
      });
    }

    const output = createCliEmitter();
    if (p.json) {
      output.json({ findings, applied: p.fix && !p.dryRun });
      return 0;
    }
    if (findings.length === 0) {
      output.success("integration queue doctor", undefined, "no stale entries detected");
      return 0;
    }
    output.lines(
      findings.map((finding) => {
        const suffix =
          p.fix && !p.dryRun ? "applied" : p.fix && p.dryRun ? "would_apply" : "not_applied";
        return `${finding.task_id} ${finding.status}: ${finding.reason} repair=${finding.repair ?? "none"} ${suffix}`;
      }),
    );
    return 0;
  };
}

export function makeRunIntegrateQueueClaimHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, p: IntegrateQueueClaimParsed): Promise<number> => {
    const commandCtx = await getCtx("integrate queue claim");
    const gitRoot = commandCtx.resolvedProject.gitRoot;
    const claimed = await withIntegrationQueueMutex(gitRoot, async () => {
      const queue = await readIntegrationQueue(gitRoot);
      const next = claimNextQueuedEntry(queue, {
        worker: p.worker ?? defaultWorker(),
        ...(p.leaseMs === null ? {} : { leaseMs: p.leaseMs }),
      });
      if (!next.entry) {
        await writeIntegrationQueue(gitRoot, next.state);
        return next;
      }
      const stale = await rejectIfQueuedEntryIsStale({ gitRoot, entry: next.entry });
      if (stale) {
        await writeIntegrationQueue(
          gitRoot,
          markQueueEntry(next.state, stale.task_id, "rework", stale.reason),
        );
        throw new CliError({ code: "E_VALIDATION", message: stale.reason ?? "queued entry stale" });
      }
      await writeIntegrationQueue(gitRoot, next.state);
      return next;
    });
    if (!claimed.entry) {
      createCliEmitter().line(emptyStateMessage("queued integration entries"));
      return 0;
    }
    const output = createCliEmitter();
    if (p.json) output.json(claimed.entry);
    else
      output.success(
        "claimed integration",
        claimed.entry.task_id,
        `branch=${claimed.entry.branch}`,
      );
    return 0;
  };
}

export function makeRunIntegrateQueueReleaseHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, p: IntegrateQueueReleaseParsed): Promise<number> => {
    const commandCtx = await getCtx("integrate queue release");
    const gitRoot = commandCtx.resolvedProject.gitRoot;
    await withIntegrationQueueMutex(gitRoot, async () => {
      const queue = await readIntegrationQueue(gitRoot);
      await writeIntegrationQueue(
        gitRoot,
        markQueueEntry(queue, p.taskId, p.status, p.reason ?? undefined),
      );
    });
    createCliEmitter().success("queue entry", p.taskId, `status=${p.status}`);
    return 0;
  };
}

export function makeRunIntegrateQueueRunNextHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: IntegrateQueueRunNextParsed): Promise<number> => {
    const commandCtx = await getCtx("integrate queue run-next");
    const gitRoot = commandCtx.resolvedProject.gitRoot;
    let lastResult = 0;
    let ranEntry = false;
    const startedAt = Date.now();
    const pollIntervalMs = p.pollIntervalMs ?? DEFAULT_QUEUE_POLL_INTERVAL_MS;
    const timeoutMs = p.timeoutMs ?? DEFAULT_QUEUE_WAIT_TIMEOUT_MS;

    do {
      const claimed = await withIntegrationQueueMutex(gitRoot, async () => {
        const queue = await readIntegrationQueue(gitRoot);
        const next = claimNextQueuedEntry(queue, {
          worker: p.worker ?? defaultWorker(),
          ...(p.leaseMs === null ? {} : { leaseMs: p.leaseMs }),
        });
        if (!next.entry) {
          await writeIntegrationQueue(gitRoot, next.state);
          return next;
        }

        const stale = await rejectIfQueuedEntryIsStale({ gitRoot, entry: next.entry });
        if (stale) {
          await writeIntegrationQueue(
            gitRoot,
            markQueueEntry(next.state, stale.task_id, "rework", stale.reason),
          );
          throw new CliError({
            code: "E_VALIDATION",
            message: stale.reason ?? "queued entry stale",
          });
        }

        await writeIntegrationQueue(gitRoot, next.state);
        return next;
      });
      if (!claimed.entry) {
        const activeLane = findActiveLane(claimed.state.entries);
        if (p.wait && (activeLane || hasQueuedEntries(claimed.state.entries))) {
          if (
            activeLane &&
            (await recoverStaleActiveLane({
              ctx: commandCtx,
              cwd: ctx.cwd,
              rootOverride: ctx.rootOverride,
              gitRoot,
              entry: activeLane,
              quiet: p.quiet,
            }))
          ) {
            continue;
          }
          const elapsedMs = Date.now() - startedAt;
          if (elapsedMs >= timeoutMs) {
            throw new CliError({
              code: "E_HANDOFF",
              message: activeLane
                ? `Integration queue lane is still occupied by ${activeLane.task_id} (${activeLane.status}) after ${timeoutMs}ms.`
                : `No integration queue entry became claimable after ${timeoutMs}ms.`,
            });
          }
          if (!p.quiet) {
            const lane = activeLane
              ? `${activeLane.task_id} (${activeLane.status})`
              : "queued entries";
            createCliEmitter().line(
              `integration queue waiting: lane=${lane} retry_in_ms=${pollIntervalMs}`,
            );
          }
          await sleep(Math.min(pollIntervalMs, Math.max(1, timeoutMs - elapsedMs)));
          continue;
        }
        createCliEmitter().line(emptyStateMessage("queued integration entries"));
        return lastResult;
      }

      ranEntry = true;
      const claimedEntry = claimed.entry;
      try {
        if (p.hosted) {
          await waitForHostedChecks({
            gitRoot,
            prNumber: claimedEntry.pr_number,
            stablePolls: p.stablePolls ?? 2,
            pollIntervalMs: p.hostedPollIntervalMs,
            timeoutMs: p.hostedTimeoutMs,
            requiredChecks: p.requiredChecks,
            quiet: p.quiet,
          });
        }
        lastResult = await cmdIntegrate({
          ctx: commandCtx,
          cwd: ctx.cwd,
          rootOverride: ctx.rootOverride,
          taskId: claimedEntry.task_id,
          branch: claimedEntry.branch,
          base: claimedEntry.base,
          mergeStrategy: "merge",
          runVerify: p.runVerify,
          dryRun: p.dryRun,
          quiet: p.quiet,
        });
        await withIntegrationQueueMutex(gitRoot, async () => {
          const nextQueue = await readIntegrationQueue(gitRoot);
          await writeIntegrationQueue(
            gitRoot,
            markQueueEntry(nextQueue, claimedEntry.task_id, p.dryRun ? "queued" : "done"),
          );
        });
      } catch (err) {
        const handoff = err instanceof CliError && err.code === "E_HANDOFF";
        await withIntegrationQueueMutex(gitRoot, async () => {
          const nextQueue = await readIntegrationQueue(gitRoot);
          await writeIntegrationQueue(
            gitRoot,
            markQueueEntry(
              nextQueue,
              claimedEntry.task_id,
              handoff ? "handoff" : "rework",
              handoff
                ? "GitHub PR merge pending; wait for hosted merge/close before releasing lane"
                : err instanceof Error
                  ? err.message
                  : String(err),
            ),
          );
        });
        throw err;
      }
    } while (p.drain && !p.dryRun);

    return ranEntry ? lastResult : 0;
  };
}
