import { CliError } from "../shared/errors.js";
import {
  rejectIfQueuedEntryIsStale,
  rejectIfQueuedEntryPublicationIsStale,
} from "./integrate-queue-lane.js";
import {
  markQueueEntry,
  readIntegrationQueue,
  reserveQueueEntryForIntegration,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
  type IntegrationQueueEntry,
} from "./pr/integrate/queue-state.js";
import { isExternalStateUnavailableError } from "./shared/external-unavailability.js";

function queueEntryMatchesClaimIdentity(
  current: IntegrationQueueEntry | undefined,
  expected: IntegrationQueueEntry,
): current is IntegrationQueueEntry {
  return (
    current?.task_id === expected.task_id &&
    current.branch === expected.branch &&
    current.base === expected.base &&
    current.head_sha === expected.head_sha &&
    current.claimed_by === expected.claimed_by &&
    current.claimed_at === expected.claimed_at &&
    current.lease_expires_at === expected.lease_expires_at &&
    current.claim_token === expected.claim_token
  );
}

function queueEntryRetainsClaim(
  current: IntegrationQueueEntry | undefined,
  expected: IntegrationQueueEntry,
): current is IntegrationQueueEntry {
  return (
    current?.status === "claimed" &&
    queueEntryMatchesClaimIdentity(current, expected) &&
    Date.parse(current.lease_expires_at ?? "") > Date.now()
  );
}

function queueEntryRetainsIntegrationReservation(
  current: IntegrationQueueEntry | undefined,
  expected: IntegrationQueueEntry,
): current is IntegrationQueueEntry {
  return (
    current?.status === "handoff" &&
    current.active_operation === "integration" &&
    queueEntryMatchesClaimIdentity(current, expected)
  );
}

async function requireRetainedQueueClaim(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<IntegrationQueueEntry> {
  return await withIntegrationQueueMutex(opts.gitRoot, async () => {
    const queue = await readIntegrationQueue(opts.gitRoot);
    const current = queue.entries.find((entry) => entry.task_id === opts.entry.task_id);
    if (queueEntryRetainsClaim(current, opts.entry)) return current;
    throw new CliError({
      code: "E_HANDOFF",
      message:
        `Integration queue claim was lost while validating provider state for ${opts.entry.task_id}; ` +
        "reclaim the queue lane before integrating",
    });
  });
}

export async function reserveClaimedEntryForIntegration(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<IntegrationQueueEntry> {
  return await withIntegrationQueueMutex(opts.gitRoot, async () => {
    const queue = await readIntegrationQueue(opts.gitRoot);
    const current = queue.entries.find((entry) => entry.task_id === opts.entry.task_id);
    if (!queueEntryRetainsClaim(current, opts.entry)) {
      throw new CliError({
        code: "E_HANDOFF",
        message:
          `Integration queue claim was lost before reserving ${opts.entry.task_id}; ` +
          "reclaim the queue lane before integrating",
      });
    }
    const stale = await rejectIfQueuedEntryIsStale({
      gitRoot: opts.gitRoot,
      entry: current,
    });
    if (stale) {
      await writeIntegrationQueue(
        opts.gitRoot,
        markQueueEntry(queue, stale.task_id, "rework", stale.reason),
      );
      throw new CliError({
        code: "E_VALIDATION",
        message: stale.reason ?? "queued entry became stale before reservation",
      });
    }
    const reservedState = reserveQueueEntryForIntegration(queue, opts.entry.task_id);
    const reserved = reservedState.entries.find((entry) => entry.task_id === opts.entry.task_id);
    if (!queueEntryRetainsIntegrationReservation(reserved, opts.entry)) {
      throw new CliError({
        code: "E_GIT_RACE",
        message: `Unable to reserve integration queue entry ${opts.entry.task_id}`,
      });
    }
    await writeIntegrationQueue(opts.gitRoot, reservedState);
    return reserved;
  });
}

export async function completeIntegrationReservation(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
  status: Extract<IntegrationQueueEntry["status"], "queued" | "handoff" | "done" | "rework">;
  reason?: string;
}): Promise<boolean> {
  return await withIntegrationQueueMutex(opts.gitRoot, async () => {
    const queue = await readIntegrationQueue(opts.gitRoot);
    const current = queue.entries.find((entry) => entry.task_id === opts.entry.task_id);
    if (!queueEntryRetainsIntegrationReservation(current, opts.entry)) return false;
    await writeIntegrationQueue(
      opts.gitRoot,
      markQueueEntry(queue, opts.entry.task_id, opts.status, opts.reason),
    );
    return true;
  });
}

export async function assertIntegrationReservationStillFresh(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
}): Promise<void> {
  const localBeforeProvider = await rejectIfQueuedEntryIsStale(opts);
  if (localBeforeProvider) {
    throw new CliError({
      code: "E_VALIDATION",
      message: localBeforeProvider.reason ?? "queued entry became stale before integration",
    });
  }
  const publicationStale = await rejectIfQueuedEntryPublicationIsStale(opts);
  if (publicationStale) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        publicationStale.reason ?? "queued entry publication became stale before integration",
    });
  }
  const localAfterProvider = await rejectIfQueuedEntryIsStale(opts);
  if (localAfterProvider) {
    throw new CliError({
      code: "E_VALIDATION",
      message: localAfterProvider.reason ?? "queued entry became stale during provider validation",
    });
  }
}

export async function runReservedIntegrationCriticalSection(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry;
  terminalStatus: Extract<IntegrationQueueEntry["status"], "queued" | "done">;
  run: () => Promise<number>;
}): Promise<number> {
  return await withIntegrationQueueMutex(opts.gitRoot, async () => {
    const queue = await readIntegrationQueue(opts.gitRoot);
    const current = queue.entries.find((entry) => entry.task_id === opts.entry.task_id);
    if (!queueEntryRetainsIntegrationReservation(current, opts.entry)) {
      throw new CliError({
        code: "E_HANDOFF",
        message:
          `Integration queue reservation was lost for ${opts.entry.task_id}; ` +
          "inspect the active lane before integrating",
      });
    }
    const stale = await rejectIfQueuedEntryIsStale({
      gitRoot: opts.gitRoot,
      entry: current,
    });
    if (stale) {
      await writeIntegrationQueue(
        opts.gitRoot,
        markQueueEntry(queue, stale.task_id, "rework", stale.reason),
      );
      throw new CliError({
        code: "E_VALIDATION",
        message: stale.reason ?? "queued entry became stale before integration",
      });
    }
    let result: number;
    try {
      result = await opts.run();
    } catch (err) {
      await writeIntegrationQueue(
        opts.gitRoot,
        markQueueEntry(
          queue,
          opts.entry.task_id,
          "handoff",
          err instanceof Error ? err.message : String(err),
        ),
      ).catch(() => null);
      throw err;
    }
    try {
      await writeIntegrationQueue(
        opts.gitRoot,
        markQueueEntry(queue, opts.entry.task_id, opts.terminalStatus),
      );
    } catch (err) {
      const reconciliationError = new CliError({
        code: "E_HANDOFF",
        message:
          `Integration completed for ${opts.entry.task_id}, but terminal queue state could not be persisted: ` +
          (err instanceof Error ? err.message : String(err)),
        context: {
          reason_code: "integration_queue_outcome_requires_reconciliation",
          task_id: opts.entry.task_id,
        },
      });
      await writeIntegrationQueue(
        opts.gitRoot,
        markQueueEntry(queue, opts.entry.task_id, "handoff", reconciliationError.message),
      ).catch(() => null);
      throw reconciliationError;
    }
    return result;
  });
}

async function markRetainedClaimRework(opts: {
  gitRoot: string;
  expected: IntegrationQueueEntry;
  stale: IntegrationQueueEntry;
}): Promise<void> {
  await withIntegrationQueueMutex(opts.gitRoot, async () => {
    const queue = await readIntegrationQueue(opts.gitRoot);
    const current = queue.entries.find((entry) => entry.task_id === opts.expected.task_id);
    if (current?.status !== "claimed" || !queueEntryMatchesClaimIdentity(current, opts.expected)) {
      return;
    }
    await writeIntegrationQueue(
      opts.gitRoot,
      markQueueEntry(
        queue,
        opts.stale.task_id,
        "rework",
        opts.stale.reason ?? "queued entry is stale",
      ),
    );
  });
}

export async function validateClaimedEntryPublication(opts: {
  gitRoot: string;
  entry: IntegrationQueueEntry | null;
}): Promise<IntegrationQueueEntry | null> {
  if (!opts.entry) return null;
  let stale: IntegrationQueueEntry | null;
  try {
    stale = await rejectIfQueuedEntryPublicationIsStale({
      gitRoot: opts.gitRoot,
      entry: opts.entry,
    });
  } catch (err) {
    if (isExternalStateUnavailableError(err)) {
      await withIntegrationQueueMutex(opts.gitRoot, async () => {
        const queue = await readIntegrationQueue(opts.gitRoot);
        const current = queue.entries.find((entry) => entry.task_id === opts.entry?.task_id);
        if (!queueEntryRetainsClaim(current, opts.entry!)) return;
        await writeIntegrationQueue(
          opts.gitRoot,
          markQueueEntry(queue, opts.entry!.task_id, "handoff", err.message),
        );
      });
    }
    throw err;
  }
  if (stale) {
    await markRetainedClaimRework({
      gitRoot: opts.gitRoot,
      expected: opts.entry,
      stale,
    });
    throw new CliError({
      code: "E_VALIDATION",
      message: stale.reason ?? "queued entry publication is stale",
    });
  }

  const localStale = await rejectIfQueuedEntryIsStale({
    gitRoot: opts.gitRoot,
    entry: opts.entry,
  });
  if (localStale) {
    await markRetainedClaimRework({
      gitRoot: opts.gitRoot,
      expected: opts.entry,
      stale: localStale,
    });
    throw new CliError({
      code: "E_VALIDATION",
      message: localStale.reason ?? "queued entry became stale during provider validation",
    });
  }

  return await requireRetainedQueueClaim({ gitRoot: opts.gitRoot, entry: opts.entry });
}
