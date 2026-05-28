import type { CommandCtx, CommandHandler } from "../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../cli/group-command.js";
import { createCliEmitter, emptyStateMessage } from "../cli/output.js";
import { CliError } from "../shared/errors.js";
import { sleep } from "../backends/task-backend/shared/concurrency.js";
import type { CommandContext } from "./shared/task-backend.js";
import { gitRevParse } from "./shared/git-ops.js";
import { cmdIntegrate } from "./pr/integrate/cmd.js";
import { prepareIntegrate } from "./pr/integrate/internal/prepare.js";
import {
  claimNextQueuedEntry,
  markQueueEntry,
  readIntegrationQueue,
  upsertQueuedEntry,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
} from "./pr/integrate/queue-state.js";
import { runIntegrationQueueDoctor } from "./integrate-queue-doctor-command.js";
import {
  defaultIntegrationQueueWorker,
  findActiveIntegrationLane,
  hasQueuedIntegrationEntries,
  normalizeTerminalQueueEntries,
  recoverStaleActiveLane,
  rejectIfQueuedEntryIsStale,
  renderIntegrationQueueEntry,
} from "./integrate-queue-lane.js";
import type {
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
    output.lines(active.map((entry) => renderIntegrationQueueEntry(entry)));
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
    const claimed = await withIntegrationQueueMutex(gitRoot, async () => {
      const queue = await readIntegrationQueue(gitRoot);
      const next = claimNextQueuedEntry(queue, {
        worker: p.worker ?? defaultIntegrationQueueWorker(),
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
          worker: p.worker ?? defaultIntegrationQueueWorker(),
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
