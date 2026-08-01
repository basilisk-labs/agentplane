import type { CommandCtx, CommandHandler } from "../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../cli/group-command.js";
import { createCliEmitter, emitCommandResults, emptyStateMessage } from "../cli/output.js";
import { CliError } from "../shared/errors.js";
import { sleep } from "../backends/task-backend/shared/concurrency.js";
import type { CommandContext } from "./shared/task-backend.js";
import { loadBackendTask } from "./shared/task-backend.js";
import { gitRevParse } from "./shared/git-ops.js";
import { isExternalStateUnavailableError } from "./shared/external-unavailability.js";
import { cmdIntegrate } from "./pr/integrate/cmd.js";
import { prepareIntegrate } from "./pr/integrate/internal/prepare.js";
import {
  claimNextQueuedEntry,
  createLegacyProtectedConflictAdoptionReceipt,
  markQueueEntry,
  readIntegrationQueue,
  recordLegacyProtectedConflictAdoption,
  recordSupersededQueueEntry,
  upsertQueuedEntry,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
} from "./pr/integrate/queue-state.js";
import { prepareConflictReworkPacket } from "./pr/conflict-rework.js";
import { resolvePrFlowStatus } from "./pr/flow-status.js";
import {
  inspectTaskWorktreeCleanliness,
  type TaskWorktreeCleanliness,
} from "./shared/task-worktree-cleanliness.js";
import {
  assertIntegrationReservationStillFresh,
  completeIntegrationReservation,
  reserveClaimedEntryForIntegration,
  runReservedIntegrationCriticalSection,
  validateClaimedEntryPublication,
} from "./integrate-queue-reservation.js";
import { runIntegrationQueueDoctor } from "./integrate-queue-doctor-command.js";
import { inspectIntegrationQueueList } from "./integrate-queue-list.js";
import { renderIntegrationQueueListResult } from "./integrate-queue-render.js";
import {
  defaultIntegrationQueueWorker,
  findActiveIntegrationLane,
  hasQueuedIntegrationEntries,
  recoverStaleActiveLane,
  rejectIfQueuedEntryIsStale,
} from "./integrate-queue-lane.js";
import type {
  IntegrateQueueAdoptLegacyProtectedConflictParsed,
  IntegrateQueueClaimParsed,
  IntegrateQueueDoctorParsed,
  IntegrateQueueEnqueueParsed,
  IntegrateQueueListParsed,
  IntegrateQueueReleaseParsed,
  IntegrateQueueRunNextParsed,
} from "./integrate-queue.spec.js";
import { integrateQueueSpec } from "./integrate-queue.spec.js";
import { waitForHostedChecks } from "./pr/hosted-checks.js";

const DEFAULT_QUEUE_POLL_INTERVAL_MS = 30_000;
const DEFAULT_QUEUE_WAIT_TIMEOUT_MS = 10 * 60_000;

async function claimFreshIntegrationQueueEntry(opts: {
  gitRoot: string;
  worker: string;
  leaseMs: number | null;
}) {
  return await withIntegrationQueueMutex(opts.gitRoot, async () => {
    const queue = await readIntegrationQueue(opts.gitRoot);
    const next = claimNextQueuedEntry(queue, {
      worker: opts.worker,
      ...(opts.leaseMs === null ? {} : { leaseMs: opts.leaseMs }),
    });
    if (!next.entry) {
      await writeIntegrationQueue(opts.gitRoot, next.state);
      return next;
    }
    const stale = await rejectIfQueuedEntryIsStale({
      gitRoot: opts.gitRoot,
      entry: next.entry,
    });
    if (stale) {
      await writeIntegrationQueue(
        opts.gitRoot,
        markQueueEntry(next.state, stale.task_id, "rework", stale.reason),
      );
      throw new CliError({
        code: "E_VALIDATION",
        message: stale.reason ?? "queued entry stale",
      });
    }
    await writeIntegrationQueue(opts.gitRoot, next.state);
    return next;
  });
}

export {
  integrateQueueAdoptLegacyProtectedConflictSpec,
  integrateQueueClaimSpec,
  integrateQueueDoctorSpec,
  integrateQueueEnqueueSpec,
  integrateQueueListSpec,
  integrateQueueReleaseSpec,
  integrateQueueRunNextSpec,
  integrateQueueSpec,
} from "./integrate-queue.spec.js";

export const runIntegrateQueueGroup: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: integrateQueueSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["integrate", "queue"]),
    command: "integrate queue",
  });
};

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
      const refreshed = upsertQueuedEntry(queue, {
        task_id: prepared.task.id,
        branch: prepared.branch,
        base: prepared.base,
        head_sha: prepared.branchHeadSha,
        base_sha: baseSha,
        changed_paths: prepared.changedPaths,
        pr_number: prepared.hostedPr.prNumber,
        pr_url: prepared.hostedPr.prUrl,
        priority: p.priority,
      });
      const candidate = refreshed.entries.find((entry) => entry.task_id === prepared.task.id);
      if (!candidate) {
        throw new CliError({
          code: "E_GIT_RACE",
          message: `Unable to materialize integration queue entry ${prepared.task.id}`,
        });
      }
      const stale = await rejectIfQueuedEntryIsStale({
        gitRoot: prepared.resolved.gitRoot,
        entry: candidate,
      });
      if (stale) {
        await writeIntegrationQueue(
          prepared.resolved.gitRoot,
          markQueueEntry(refreshed, stale.task_id, "rework", stale.reason),
        );
        throw new CliError({
          code: "E_VALIDATION",
          message: stale.reason ?? "queued entry became stale before enqueue",
        });
      }
      await writeIntegrationQueue(prepared.resolved.gitRoot, refreshed);
    });
    if (!p.quiet) {
      createCliEmitter().success(
        "queued integration",
        prepared.task.id,
        `branch=${prepared.branch}`,
      );
    }
    return 0;
  };
}

export function makeRunIntegrateQueueListHandler(getGitRoot: (cmd: string) => Promise<string>) {
  return async (_ctx: CommandCtx, p: IntegrateQueueListParsed): Promise<number> => {
    const gitRoot = await getGitRoot("integrate queue list");
    const result = await inspectIntegrationQueueList(gitRoot);
    emitCommandResults(createCliEmitter(), renderIntegrationQueueListResult(result, p.json));
    return 0;
  };
}

export function makeRunIntegrateQueueDoctorHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: IntegrateQueueDoctorParsed): Promise<number> => {
    const commandCtx = await getCtx("integrate queue doctor");
    return runIntegrationQueueDoctor({ commandCtx, ctx, parsed: p });
  };
}

export function makeRunIntegrateQueueClaimHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, p: IntegrateQueueClaimParsed): Promise<number> => {
    const commandCtx = await getCtx("integrate queue claim");
    const gitRoot = commandCtx.resolvedProject.gitRoot;
    const claimed = await claimFreshIntegrationQueueEntry({
      gitRoot,
      worker: p.worker ?? defaultIntegrationQueueWorker(),
      leaseMs: p.leaseMs,
    });
    const retainedEntry = await validateClaimedEntryPublication({ gitRoot, entry: claimed.entry });
    if (!retainedEntry) {
      createCliEmitter().line(emptyStateMessage("queued integration entries"));
      return 0;
    }
    const output = createCliEmitter();
    if (p.json) output.json(retainedEntry);
    else
      output.success(
        "claimed integration",
        retainedEntry.task_id,
        `branch=${retainedEntry.branch}`,
      );
    return 0;
  };
}

export function makeRunIntegrateQueueReleaseHandler(deps: {
  getGitRoot: (cmd: string) => Promise<string>;
  getCtx?: (cmd: string) => Promise<CommandContext>;
}) {
  return async (_ctx: CommandCtx, p: IntegrateQueueReleaseParsed): Promise<number> => {
    const command = "integrate queue release";
    const gitRoot = await deps.getGitRoot(command);
    if (p.status === "superseded") {
      const commandCtx = await deps.getCtx?.(command);
      if (!commandCtx) {
        throw new CliError({
          code: "E_INTERNAL",
          message: "integrate queue release superseded requires provider read context",
        });
      }
      const [legacy, successor, report] = await Promise.all([
        loadBackendTask({
          ctx: commandCtx,
          cwd: _ctx.cwd,
          rootOverride: _ctx.rootOverride ?? null,
          taskId: p.taskId,
          preferBranchSnapshot: false,
        }),
        loadBackendTask({
          ctx: commandCtx,
          cwd: _ctx.cwd,
          rootOverride: _ctx.rootOverride ?? null,
          taskId: p.supersededByTaskId ?? "",
          preferBranchSnapshot: false,
        }),
        resolvePrFlowStatus({
          ctx: commandCtx,
          cwd: _ctx.cwd,
          rootOverride: _ctx.rootOverride ?? undefined,
          taskId: p.taskId,
        }),
      ]);
      if (p.supersededByTaskId === p.taskId) {
        throw new CliError({
          code: "E_VALIDATION",
          message: "A task cannot supersede its own provider-conflict outcome.",
          context: { reason_code: "superseded_queue_self_reference", task_id: p.taskId },
        });
      }
      if (String(legacy.task.status).toUpperCase() !== "BLOCKED") {
        throw new CliError({
          code: "E_VALIDATION",
          message:
            `Task ${p.taskId} must be BLOCKED on the current base before recording ` +
            "a superseded provider-conflict outcome.",
          context: {
            reason_code: "superseded_queue_requires_blocked_task",
            task_id: p.taskId,
            task_status: legacy.task.status,
          },
        });
      }
      if (String(successor.task.status).toUpperCase() !== "DONE") {
        throw new CliError({
          code: "E_VALIDATION",
          message:
            `Successor task ${successor.task.id} must be DONE before it can supersede ` +
            `${p.taskId}.`,
          context: {
            reason_code: "superseded_queue_successor_not_done",
            task_id: p.taskId,
            successor_task_id: successor.task.id,
            successor_status: successor.task.status,
          },
        });
      }
      if (
        report.pr.source !== "lookup" ||
        report.pr.state !== "CLOSED" ||
        report.providerObservation?.state !== "found" ||
        report.providerObservation.pr.status !== "CLOSED"
      ) {
        throw new CliError({
          code: "E_VALIDATION",
          message:
            `Task ${p.taskId} requires a currently observed closed provider PR before ` +
            "recording semantic supersession.",
          context: {
            reason_code: "superseded_queue_requires_closed_provider_pr",
            task_id: p.taskId,
            provider_state: report.pr.state,
            provider_source: report.pr.source,
          },
        });
      }
      await withIntegrationQueueMutex(gitRoot, async () => {
        const queue = await readIntegrationQueue(gitRoot);
        await writeIntegrationQueue(
          gitRoot,
          recordSupersededQueueEntry(queue, {
            taskId: p.taskId,
            supersededByTaskId: successor.task.id,
            reason: p.reason ?? "",
          }),
        );
      });
      createCliEmitter().success(
        "queue entry",
        p.taskId,
        `status=superseded successor=${successor.task.id}`,
      );
      return 0;
    }
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

export function makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (
    ctx: CommandCtx,
    p: IntegrateQueueAdoptLegacyProtectedConflictParsed,
  ): Promise<number> => {
    const commandCtx = await getCtx("integrate queue adopt-legacy-protected-conflict");
    const gitRoot = commandCtx.resolvedProject.gitRoot;
    const result = await withIntegrationQueueMutex(gitRoot, async () => {
      const report = await resolvePrFlowStatus({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride,
        taskId: p.taskId,
      });
      const branch = report.branch.name?.trim() ?? "";
      const taskWorktree: TaskWorktreeCleanliness = branch
        ? await inspectTaskWorktreeCleanliness({ gitRoot, branch })
        : { state: "not_present", branch: "", worktreePath: null, changedPaths: [] };
      const preparation = await prepareConflictReworkPacket({
        gitRoot,
        taskId: p.taskId,
        report,
        taskWorktree,
      });
      if (
        preparation.state === "ready" &&
        preparation.packet.route_evidence.kind === "legacy_adopted_protected_base_handoff" &&
        preparation.packet.route_evidence.adoption.evidence_token === p.expectedAdoptionToken
      ) {
        return { state: "already_recorded" as const };
      }
      if (preparation.state !== "adoption_required") {
        const reason =
          preparation.state === "ready"
            ? "the current route is already eligible without this legacy adoption"
            : preparation.reason;
        throw new CliError({
          code: "E_VALIDATION",
          message:
            `Cannot adopt legacy protected-conflict context for ${p.taskId}: ` +
            `${reason}. Recompute task next-action before any semantic resolution.`,
          context: {
            reason_code: "legacy_protected_conflict_adoption_unavailable",
            task_id: p.taskId,
            preparation_state: preparation.state,
          },
        });
      }
      if (preparation.adoption.token !== p.expectedAdoptionToken) {
        throw new CliError({
          code: "E_VALIDATION",
          message:
            `Legacy protected-conflict adoption token is stale for ${p.taskId}. ` +
            "Recompute task next-action and retry with its exact token.",
          context: {
            reason_code: "legacy_protected_conflict_adoption_stale",
            task_id: p.taskId,
            expected_adoption_token: p.expectedAdoptionToken,
            current_adoption_token: preparation.adoption.token,
          },
        });
      }
      const receipt = createLegacyProtectedConflictAdoptionReceipt({
        evidence: preparation.adoption.evidence,
      });
      const queue = await readIntegrationQueue(gitRoot);
      await writeIntegrationQueue(gitRoot, recordLegacyProtectedConflictAdoption(queue, receipt));
      return { state: "recorded" as const };
    });
    if (!p.quiet) {
      createCliEmitter().success(
        "legacy protected-conflict adoption",
        p.taskId,
        result.state === "already_recorded"
          ? "already recorded"
          : "recorded; recompute task next-action",
      );
    }
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
      const claimed = await claimFreshIntegrationQueueEntry({
        gitRoot,
        worker: p.worker ?? defaultIntegrationQueueWorker(),
        leaseMs: p.leaseMs,
      });
      const retainedEntry = await validateClaimedEntryPublication({
        gitRoot,
        entry: claimed.entry,
      });
      if (!retainedEntry) {
        const activeLane = findActiveIntegrationLane(claimed.state.entries);
        if (p.wait && (activeLane || hasQueuedIntegrationEntries(claimed.state.entries))) {
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
      const claimedEntry = retainedEntry;
      const integrationEntry = await reserveClaimedEntryForIntegration({
        gitRoot,
        entry: claimedEntry,
      });
      let criticalSectionStarted = false;
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
        await assertIntegrationReservationStillFresh({
          gitRoot,
          entry: integrationEntry,
        });
        criticalSectionStarted = true;
        lastResult = await runReservedIntegrationCriticalSection({
          gitRoot,
          entry: integrationEntry,
          terminalStatus: p.dryRun ? "queued" : "done",
          run: () =>
            cmdIntegrate({
              ctx: commandCtx,
              cwd: ctx.cwd,
              rootOverride: ctx.rootOverride,
              taskId: integrationEntry.task_id,
              branch: integrationEntry.branch,
              base: integrationEntry.base,
              expectedHeadSha: integrationEntry.head_sha,
              expectedBaseSha: integrationEntry.base_sha,
              mergeStrategy: "merge",
              runVerify: p.runVerify,
              dryRun: p.dryRun,
              quiet: p.quiet,
            }),
        });
      } catch (err) {
        if (criticalSectionStarted) throw err;
        const handoff =
          (err instanceof CliError && err.code === "E_HANDOFF") ||
          isExternalStateUnavailableError(err);
        await completeIntegrationReservation({
          gitRoot,
          entry: integrationEntry,
          status: handoff ? "handoff" : "rework",
          reason: err instanceof Error ? err.message : String(err),
        });
        throw err;
      }
    } while (p.drain && !p.dryRun);

    return ranEntry ? lastResult : 0;
  };
}
