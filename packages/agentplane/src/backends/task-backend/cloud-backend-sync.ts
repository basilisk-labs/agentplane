import { isRecord } from "../../shared/guards.js";
import type { LocalBackend } from "./local-backend.js";
import { type readCloudBackendState, writeCloudBackendState } from "./cloud-backend-state.js";
import { requestCloudPush } from "./cloud-backend-push.js";
import { buildCloudPullPlan, emitCloudPullDiffSummary, readOpenConflicts } from "./cloud-pull.js";
import { BackendError, type TaskData } from "./shared.js";
import {
  CLOUD_PULL_REQUEST_TIMEOUT_MS,
  CLOUD_REQUEST_TIMEOUT_MS,
  cloudConflictMessage,
  cloudHttpErrorMessage,
  createTimeoutSignal,
  isOptionalSyncStateFailure,
  normalizeCloudPullResponse,
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
  statePath: string;
  cache: Pick<LocalBackend, "listTasks" | "writeTasks" | "deleteTask">;
  request: <T>(pathname: string, init: RequestInit, opts?: { timeoutMs?: number }) => Promise<T>;
  readState: () => ReturnType<typeof readCloudBackendState>;
  clearPendingPush: () => Promise<void>;
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
  },
): Promise<void> {
  const localTasks = await deps.cache.listTasks();
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
  const response =
    opts.direction === "push"
      ? await requestCloudPush({
          provider: deps.provider,
          projectId: deps.projectId,
          localTasks,
          conflict: opts.conflict,
          quiet: opts.quiet,
          request: deps.request,
        })
      : await deps.request<CloudSyncResponse>(
          `/v1/projects/${encodeURIComponent(deps.projectId)}/sync/${action}`,
          {
            method: "POST",
            body: JSON.stringify({
              provider: deps.provider,
              direction: opts.direction,
              conflict: opts.conflict,
            }),
          },
          { timeoutMs: opts.timeoutMs ?? CLOUD_PULL_REQUEST_TIMEOUT_MS },
        );
  const data = isRecord(response.data) ? response.data : {};
  const pull = normalizeCloudPullResponse(response, data);
  if (opts.direction === "pull") {
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
  if (!pull.lastCheckedAt) {
    await deps.clearPendingPush();
    return;
  }
  const existing = await deps.readState();
  await writeCloudBackendState(deps.statePath, {
    last_checked_at: pull.lastCheckedAt,
    last_start_ready_pull_at: existing.last_start_ready_pull_at,
    pending_push: null,
  });
}

async function applyCloudPullResponse(opts: {
  deps: CloudSyncDeps;
  opts: {
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
  };
  localTasks: TaskData[];
  state: CloudSyncStateSnapshot;
  response: CloudSyncResponse;
  data: Record<string, unknown>;
  pull: ReturnType<typeof normalizeCloudPullResponse>;
}): Promise<void> {
  const conflicts = [...opts.state.conflicts, ...readOpenConflicts(opts.pull.conflicts)];
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
  const plan = opts.pull.tasks ? buildCloudPullPlan(opts.localTasks, opts.pull.tasks) : null;
  if (opts.opts.conflict === "diff") {
    emitCloudPullDiffSummary({
      plan,
      conflicts,
      quiet: opts.opts.quiet,
    });
    const hasPendingProjectionChanges = conflicts.length > 0 || (plan?.changed.length ?? 0) > 0;
    const hasPendingTaskSetChanges =
      (plan?.added.length ?? 0) > 0 || (plan?.removedIds.length ?? 0) > 0;
    if (hasPendingProjectionChanges || hasPendingTaskSetChanges) return;
  } else if (plan && opts.opts.conflict === "prefer-remote") {
    await opts.deps.assertNoPendingPushForPull();
    if (plan.changed.length > 0 || plan.added.length > 0) {
      await opts.deps.cache.writeTasks([...plan.changed, ...plan.added]);
    }
    await Promise.all(plan.removedIds.map((taskId) => opts.deps.cache.deleteTask(taskId)));
  }
  if (opts.pull.lastCheckedAt) {
    const state = await opts.deps.readState();
    await writeCloudBackendState(opts.deps.statePath, {
      last_checked_at: opts.pull.lastCheckedAt,
      last_start_ready_pull_at: state.last_start_ready_pull_at,
      pending_push: state.pending_push,
    });
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
  const conflicts = readOpenConflicts(
    response.openConflicts ??
      response.open_conflicts ??
      response.conflicts ??
      data.openConflicts ??
      data.open_conflicts ??
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
