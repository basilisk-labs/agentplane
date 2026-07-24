import { isRecord } from "../../shared/guards.js";
import { applyCloudCacheEffects, type CloudCacheEffectsPort } from "./cloud-cache-effects.js";
import {
  assertCloudCacheProjectionUnchanged,
  readStrictCloudCacheTasks,
} from "./cloud-cache-snapshot.js";
import type { CloudBackendState, readCloudBackendState } from "./cloud-backend-state.js";
import {
  assertCloudPushAcknowledged,
  cloudTaskProjectionSha256,
  requestCloudPush,
  type CloudPushReceipt,
} from "./cloud-backend-push.js";
import {
  buildCloudPullPlan,
  emitCloudPullDiffSummary,
  readMergedOpenConflicts,
  type CloudPullPlan,
  type CloudRemoteCreatePolicy,
} from "./cloud-pull.js";
import { BackendError, type TaskData } from "./shared.js";
import {
  CLOUD_PULL_REQUEST_TIMEOUT_MS,
  CLOUD_REQUEST_TIMEOUT_MS,
  cloudConflictMessage,
  cloudHttpErrorMessage,
  createTimeoutSignal,
  isOptionalSyncStateFailure,
  normalizeCloudPullResponse,
  readCloudLastCheckedAt,
  readCloudJson,
  readCloudSyncStateDiagnostics,
  readSafeCommand,
  unavailableCloudSyncStateDiagnostics,
  type CloudSyncResponse,
  type CloudSyncStateDiagnostics,
} from "./cloud-backend-utils.js";

export type CloudSyncStateSnapshot = {
  conflicts: unknown[];
  safeCommand: string | null;
  unavailable: boolean;
  diagnostics: CloudSyncStateDiagnostics;
};

type CloudSyncDeps = {
  provider: string | null;
  projectId: string;
  projectionIdentitySha256: string;
  repositoryRoot: string;
  cache: CloudCacheEffectsPort;
  request: <T>(pathname: string, init: RequestInit, opts?: { timeoutMs?: number }) => Promise<T>;
  readState: () => ReturnType<typeof readCloudBackendState>;
  assertCheckpointUnchanged: () => Promise<void>;
  commitState: (
    state: CloudBackendState,
    opts?: { beforePublicationCheck?: () => Promise<void> },
  ) => Promise<void>;
  assertNoPendingPushForPull: () => Promise<void>;
  requestCloudSyncState: (
    projectId: string,
    opts?: { timeoutMs?: number },
  ) => Promise<CloudSyncStateSnapshot>;
};

export async function performCloudBackendSync(
  deps: CloudSyncDeps,
  opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    timeoutMs?: number;
    syncStateTimeoutMs?: number;
    remoteCreatePolicy: CloudRemoteCreatePolicy;
    bindProjectionIdentity: boolean;
    projectionApply: "none" | "resume" | "start";
    projectionApplyRequiresAdoption: boolean;
  },
): Promise<void> {
  const localTasks = await readStrictCloudCacheTasks(deps.cache, "initial cloud sync snapshot");
  const initialProjectionSha256 = cloudTaskProjectionSha256(localTasks);
  await deps.assertCheckpointUnchanged();
  const action = opts.direction === "pull" ? "pull" : "push";
  const state =
    opts.direction === "pull"
      ? await deps.requestCloudSyncState(deps.projectId, {
          timeoutMs: opts.syncStateTimeoutMs,
        })
      : {
          conflicts: [],
          safeCommand: null,
          unavailable: false,
          diagnostics: unavailableCloudSyncStateDiagnostics(false),
        };
  await deps.assertCheckpointUnchanged();
  if (state.unavailable && !opts.quiet) {
    process.stderr.write(
      "Warning: cloud sync-state preflight is unavailable; continuing with pull endpoint conflict data.\n",
    );
  }
  if (opts.direction === "pull" && state.conflicts.length > 0 && opts.conflict === "fail") {
    throw new BackendError(
      cloudConflictMessage({
        conflicts: state.conflicts,
        safeCommand:
          state.safeCommand ?? "agentplane backend sync cloud --direction pull --conflict=diff",
      }),
      "E_BACKEND",
    );
  }
  if (opts.direction === "pull") {
    await assertCloudCacheProjectionUnchanged({
      cache: deps.cache,
      expectedProjectionSha256: initialProjectionSha256,
      phase: "after sync-state preflight",
    });
  }
  let pushReceipt: CloudPushReceipt | null = null;
  const response = await (async (): Promise<CloudSyncResponse> => {
    if (opts.direction === "push") {
      const result = await requestCloudPush({
        provider: deps.provider,
        projectId: deps.projectId,
        localTasks,
        conflict: opts.conflict,
        quiet: opts.quiet,
        request: deps.request,
      });
      pushReceipt = result.receipt;
      return result.response;
    }
    return await deps.request<CloudSyncResponse>(
      `/v1/projects/${encodeURIComponent(deps.projectId)}/sync/${action}`,
      {
        method: "POST",
        body: JSON.stringify({
          provider: deps.provider,
          direction: opts.direction,
          conflict: opts.conflict,
          remote_create_policy: opts.remoteCreatePolicy,
        }),
      },
      { timeoutMs: opts.timeoutMs ?? CLOUD_PULL_REQUEST_TIMEOUT_MS },
    );
  })();
  await deps.assertCheckpointUnchanged();
  try {
    await assertCloudCacheProjectionUnchanged({
      cache: deps.cache,
      expectedProjectionSha256: initialProjectionSha256,
      phase: `after cloud ${opts.direction}`,
    });
  } catch (error) {
    if (opts.direction === "push") {
      await persistPushCacheDrift(deps, error);
    }
    throw error;
  }
  if (!isRecord(response)) {
    throw invalidCloudSyncResponseError(opts.direction);
  }
  if (response.data !== undefined && !isRecord(response.data)) {
    throw invalidCloudSyncResponseError(opts.direction, "response.data");
  }
  const data = isRecord(response.data) ? response.data : {};
  if (opts.direction === "pull") {
    const pull = normalizeCloudPullResponse(response, data);
    await applyCloudPullResponse({
      deps,
      opts,
      localTasks,
      state,
      response,
      data,
      pull,
    });
    return;
  }
  if (!pushReceipt) throw invalidCloudSyncResponseError("push");
  assertCloudPushAcknowledged(response, pushReceipt);
  const lastCheckedAt = readCloudLastCheckedAt(response, data);
  try {
    await assertCloudCacheProjectionUnchanged({
      cache: deps.cache,
      expectedProjectionSha256: initialProjectionSha256,
      phase: "before push checkpoint commit",
    });
  } catch (error) {
    await persistPushCacheDrift(deps, error);
    throw error;
  }
  const existing = await deps.readState();
  const committedState: CloudBackendState = {
    last_checked_at: lastCheckedAt ?? existing.last_checked_at,
    last_start_ready_pull_at: existing.last_start_ready_pull_at,
    pending_projection_apply: existing.pending_projection_apply,
    pending_push: null,
    projection_identity_sha256: deps.projectionIdentitySha256,
  };
  await commitStateForCloudCacheSnapshot({
    deps,
    expectedProjectionSha256: initialProjectionSha256,
    phase: "push checkpoint publication",
    state: committedState,
    compensationState: {
      ...committedState,
      pending_push: {
        failed_at: new Date().toISOString(),
        kind: "local_dirty",
        reason: "Local cloud cache changed while the push checkpoint was committed",
      },
    },
  });
}

function invalidCloudSyncResponseError(
  direction: "pull" | "push",
  subject = "response",
): BackendError {
  return new BackendError(
    [
      `Cloud ${direction} ${subject} is not a JSON object.`,
      "Why: a primitive or array response cannot satisfy the projection synchronization contract.",
      "Fix: repair the cloud endpoint to return the documented structured sync response.",
      "Safe command: agentplane backend inspect cloud --yes",
      "Stop condition: do not apply cache or checkpoint changes from an invalid response.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_sync_response_invalid" },
  );
}

async function applyCloudPullResponse(opts: {
  deps: CloudSyncDeps;
  opts: {
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    remoteCreatePolicy: CloudRemoteCreatePolicy;
    bindProjectionIdentity: boolean;
    projectionApply: "none" | "resume" | "start";
    projectionApplyRequiresAdoption: boolean;
  };
  localTasks: TaskData[];
  state: CloudSyncStateSnapshot;
  response: CloudSyncResponse;
  data: Record<string, unknown>;
  pull: ReturnType<typeof normalizeCloudPullResponse>;
}): Promise<void> {
  const conflicts = [
    ...opts.state.conflicts,
    ...readMergedOpenConflicts(
      opts.response.conflicts,
      opts.response.openConflicts,
      opts.response.open_conflicts,
      opts.data.conflicts,
      opts.data.openConflicts,
      opts.data.open_conflicts,
    ),
  ];
  if (conflicts.length > 0 && opts.opts.conflict === "fail") {
    throw new BackendError(
      cloudConflictMessage({
        conflicts,
        safeCommand: opts.state.safeCommand ?? readSafeCommand(opts.response, opts.data),
      }),
      "E_BACKEND",
    );
  }
  if (opts.pull.tasks === null && !opts.pull.noProjectionChanges) {
    throw new BackendError(
      [
        "Cloud backend pull response did not include projection tasks.",
        "Why: the cloud service did not return response.tasks or response.data.tasks and did not mark the pull as a no-op.",
        "Fix: retry after the service exposes a projection payload or explicit no_projection_changes=true.",
        "Safe command: agentplane backend inspect cloud --yes",
        "Stop condition: stop if the service cannot provide a task projection contract.",
      ].join("\n"),
      "E_BACKEND",
    );
  }
  if (
    (opts.opts.projectionApplyRequiresAdoption || opts.opts.projectionApply === "resume") &&
    (opts.pull.tasks === null || !opts.pull.projectionComplete)
  ) {
    throw new BackendError(
      [
        "Cloud identity adoption requires a complete task projection.",
        "Why: the response did not include both response.tasks and projection_complete=true, so a partial or paginated payload could delete local tasks or bind the wrong cache.",
        "Fix: retry after the cloud service returns the full validated task projection and an explicit completeness marker.",
        "Safe command: agentplane backend sync cloud --direction pull --conflict=diff --yes",
        "Stop condition: do not bind the target identity from a no-op, partial, or unmarked response.",
      ].join("\n"),
      "E_BACKEND",
      { reasonCode: "cloud_projection_adoption_snapshot_required" },
    );
  }
  if (
    opts.opts.conflict === "prefer-remote" &&
    (opts.pull.tasks === null || !opts.pull.projectionComplete)
  ) {
    throw new BackendError(
      [
        "Cloud prefer-remote requires a complete task projection.",
        "Why: response.tasks without projection_complete=true may be partial, so missing ids cannot safely be interpreted as deletions.",
        "Fix: retry after the cloud service returns the full validated task projection with projection_complete=true.",
        "Safe command: agentplane backend sync cloud --direction pull --conflict=diff --yes",
        "Stop condition: do not apply remote changes or deletions from a partial projection.",
      ].join("\n"),
      "E_BACKEND",
      { reasonCode: "cloud_pull_complete_snapshot_required" },
    );
  }
  const plan = opts.pull.tasks
    ? buildCloudPullPlan(opts.localTasks, opts.pull.tasks, {
        provider: opts.deps.provider,
        remoteCreatePolicy: opts.opts.remoteCreatePolicy,
      })
    : null;
  let expectedCacheTasks = opts.localTasks;
  if (plan && opts.opts.conflict === "fail" && hasCloudPullPendingChanges(plan)) {
    throw new BackendError(
      [
        "Cloud pull has pending projection changes.",
        "Why: --conflict=fail refuses to advance local freshness when remote task fields, local-only tasks, or remote-only tasks need a policy decision.",
        "Fix: run agentplane backend sync cloud --direction pull --conflict=diff --yes and review the summary.",
        "Safe command: agentplane backend sync cloud --direction pull --conflict=diff --yes",
        "Stop condition: stop if the diff shows unexpected provider authority or remote-only tasks.",
      ].join("\n"),
      "E_BACKEND",
    );
  }
  if (opts.opts.conflict === "diff") {
    emitCloudPullDiffSummary({
      plan,
      conflicts,
      quiet: opts.opts.quiet,
    });
    const hasPendingProjectionChanges = conflicts.length > 0 || (plan?.changed.length ?? 0) > 0;
    const hasPendingTaskSetChanges =
      (plan?.added.length ?? 0) > 0 ||
      (plan?.removedIds.length ?? 0) > 0 ||
      (plan?.remoteOnly.length ?? 0) > 0;
    if (hasPendingProjectionChanges || hasPendingTaskSetChanges) return;
  } else if (
    plan &&
    (opts.opts.conflict === "prefer-remote" || opts.opts.conflict === "prefer-local")
  ) {
    await opts.deps.assertNoPendingPushForPull();
    if (plan.remoteCreatePolicy === "diff" && plan.remoteOnly.length > 0) {
      throw new BackendError(
        [
          "Cloud pull has remote-only tasks.",
          "Why: remote_create_policy=diff requires an explicit review before materializing provider tasks into AgentPlane README files.",
          "Fix: set remote_create_policy to import or ignore in the cloud backend config, then retry the pull.",
          "Safe command: agentplane backend sync cloud --direction pull --conflict=diff --yes",
          "Stop condition: stop if remote-only tasks should not become local AgentPlane tasks.",
        ].join("\n"),
        "E_BACKEND",
      );
    }
    if (
      opts.opts.conflict === "prefer-local" &&
      plan.remoteCreatePolicy === "import" &&
      plan.remoteOnly.length > 0
    ) {
      throw new BackendError(
        [
          "Cloud prefer-local cannot leave importable remote-only tasks unresolved.",
          "Why: remote_create_policy=import requires materializing those tasks, while prefer-local does not authorize remote cache writes.",
          "Fix: review the diff, then use prefer-remote to import the remote-only tasks or change the policy to ignore.",
          "Safe command: agentplane backend sync cloud --direction pull --conflict=diff --yes",
          "Stop condition: do not advance projection freshness while remote-only tasks remain unresolved.",
        ].join("\n"),
        "E_BACKEND",
      );
    }
    if (opts.opts.conflict === "prefer-remote") {
      const hasCacheEffects =
        plan.changed.length > 0 || plan.added.length > 0 || plan.removedIds.length > 0;
      if (hasCacheEffects && opts.opts.projectionApply === "start") {
        const state = await opts.deps.readState();
        await opts.deps.commitState(
          {
            last_checked_at: state.last_checked_at,
            last_start_ready_pull_at: state.last_start_ready_pull_at,
            pending_projection_apply: {
              kind: "pull_apply",
              requires_explicit_adoption: opts.opts.projectionApplyRequiresAdoption,
              started_at: new Date().toISOString(),
              target_projection_identity_sha256: opts.deps.projectionIdentitySha256,
            },
            pending_push: state.pending_push,
            projection_identity_sha256: state.projection_identity_sha256,
          },
          {
            beforePublicationCheck: async () => {
              await assertCloudCacheProjectionUnchanged({
                cache: opts.deps.cache,
                expectedProjectionSha256: cloudTaskProjectionSha256(expectedCacheTasks),
                phase: "pull apply marker publication",
              });
            },
          },
        );
      }
      if (hasCacheEffects) {
        expectedCacheTasks = await applyCloudCacheEffects({
          cache: opts.deps.cache,
          expectedTasks: expectedCacheTasks,
          writes: [...plan.changed, ...plan.added],
          removedIds: plan.removedIds,
          repositoryRoot: opts.deps.repositoryRoot,
        });
      }
    }
  }
  const freshnessAuthoritative =
    opts.pull.tasks === null ? opts.pull.noProjectionChanges : opts.pull.projectionComplete;
  if (!freshnessAuthoritative) return;
  if (opts.opts.bindProjectionIdentity) {
    await assertCloudCacheProjectionUnchanged({
      cache: opts.deps.cache,
      expectedProjectionSha256: cloudTaskProjectionSha256(expectedCacheTasks),
      phase: "before pull checkpoint commit",
    });
    const state = await opts.deps.readState();
    const resetFreshness =
      opts.opts.projectionApplyRequiresAdoption || opts.opts.projectionApply === "resume";
    const committedState: CloudBackendState = {
      last_checked_at: opts.pull.lastCheckedAt ?? (resetFreshness ? null : state.last_checked_at),
      last_start_ready_pull_at: state.last_start_ready_pull_at,
      pending_projection_apply: null,
      pending_push: state.pending_push,
      projection_identity_sha256: opts.deps.projectionIdentitySha256,
    };
    const pendingProjectionApply = state.pending_projection_apply;
    await commitStateForCloudCacheSnapshot({
      deps: opts.deps,
      expectedProjectionSha256: cloudTaskProjectionSha256(expectedCacheTasks),
      phase: "pull checkpoint publication",
      state: committedState,
      compensationState: pendingProjectionApply
        ? { ...committedState, pending_projection_apply: pendingProjectionApply }
        : {
            ...committedState,
            pending_push: {
              failed_at: new Date().toISOString(),
              kind: "local_dirty",
              reason: "Local cloud cache changed while the pull checkpoint was committed",
            },
          },
    });
  }
}

function hasCloudPullPendingChanges(plan: CloudPullPlan): boolean {
  return (
    plan.changed.length > 0 ||
    plan.added.length > 0 ||
    plan.removedIds.length > 0 ||
    (plan.remoteCreatePolicy !== "ignore" && plan.remoteOnly.length > 0)
  );
}

async function commitStateForCloudCacheSnapshot(opts: {
  deps: Pick<CloudSyncDeps, "cache" | "commitState">;
  expectedProjectionSha256: string;
  phase: string;
  state: CloudBackendState;
  compensationState: CloudBackendState;
}): Promise<void> {
  const assertCacheUnchanged = async () => {
    await assertCloudCacheProjectionUnchanged({
      cache: opts.deps.cache,
      expectedProjectionSha256: opts.expectedProjectionSha256,
      phase: opts.phase,
    });
  };
  try {
    await opts.deps.commitState(opts.state, {
      beforePublicationCheck: assertCacheUnchanged,
    });
  } catch (publicationError) {
    try {
      await assertCacheUnchanged();
    } catch (cacheError) {
      await commitCloudCacheCompensation(opts.deps, opts.compensationState, cacheError);
      throw cacheError;
    }
    throw publicationError;
  }
  try {
    await assertCacheUnchanged();
  } catch (cacheError) {
    await commitCloudCacheCompensation(opts.deps, opts.compensationState, cacheError);
    throw cacheError;
  }
}

async function persistPushCacheDrift(deps: CloudSyncDeps, cause: unknown): Promise<void> {
  const state = await deps.readState();
  if (state.pending_push) return;
  await commitCloudCacheCompensation(
    deps,
    {
      ...state,
      pending_push: {
        failed_at: new Date().toISOString(),
        kind: "local_dirty",
        reason: "Local cloud cache changed after the submitted push snapshot",
      },
    },
    cause,
  );
}

async function commitCloudCacheCompensation(
  deps: Pick<CloudSyncDeps, "commitState">,
  state: CloudBackendState,
  cause: unknown,
): Promise<void> {
  try {
    await deps.commitState(state);
  } catch (compensationError) {
    throw new AggregateError(
      [cause, compensationError],
      "Cloud cache changed and the pending-state compensation failed",
    );
  }
}

export async function requestCloudSyncStateSnapshot(opts: {
  endpoint: string;
  projectId: string;
  fetchImpl: typeof fetch;
  headers: Headers;
  timeoutMs?: number;
}): Promise<CloudSyncStateSnapshot> {
  let res: Response;
  try {
    res = await opts.fetchImpl(
      `${opts.endpoint}/v1/projects/${encodeURIComponent(opts.projectId)}/sync/state`,
      {
        method: "GET",
        headers: opts.headers,
        signal: createTimeoutSignal(opts.timeoutMs ?? CLOUD_REQUEST_TIMEOUT_MS),
      },
    );
  } catch {
    return {
      conflicts: [],
      safeCommand: null,
      unavailable: true,
      diagnostics: unavailableCloudSyncStateDiagnostics(true),
    };
  }
  if (!res.ok) {
    if (isOptionalSyncStateFailure(res.status)) {
      return {
        conflicts: [],
        safeCommand: null,
        unavailable: true,
        diagnostics: unavailableCloudSyncStateDiagnostics(true),
      };
    }
    throw new BackendError(await cloudHttpErrorMessage(res), "E_BACKEND");
  }
  let response: Record<string, unknown>;
  try {
    response = await readCloudJson<Record<string, unknown>>(res, CLOUD_REQUEST_TIMEOUT_MS);
  } catch {
    return {
      conflicts: [],
      safeCommand: null,
      unavailable: true,
      diagnostics: unavailableCloudSyncStateDiagnostics(true),
    };
  }
  const data = isRecord(response.data) ? response.data : {};
  const conflicts = readMergedOpenConflicts(
    response.openConflicts,
    response.open_conflicts,
    response.conflicts,
    data.openConflicts,
    data.open_conflicts,
    data.conflicts,
  );
  return {
    conflicts,
    safeCommand:
      readSafeCommand(response, data) ??
      "agentplane backend sync cloud --direction pull --conflict=diff",
    unavailable: false,
    diagnostics: readCloudSyncStateDiagnostics(data, conflicts.length),
  };
}
