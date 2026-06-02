import { BackendError } from "./shared.js";
import { pendingCloudPushError } from "./cloud-pending-push.js";
import type { CloudBackendState } from "./cloud-backend-state.js";
import type { CloudSyncStateSnapshot } from "./cloud-backend-sync.js";
import { CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS, isStale } from "./cloud-backend-utils.js";

type CloudMutationReadinessDeps = {
  autoSyncEnabled: boolean;
  autoSyncNetworkAllowed: boolean;
  autoSyncPullOnWrite: boolean;
  projectId: string;
  staleAfterSeconds: number | null;
  missingConfigKeys: () => string[];
  readState: () => Promise<CloudBackendState>;
  clearPendingPush: () => Promise<void>;
  maybeAutoPull: (opts: { mode: "write"; reason: string }) => Promise<void>;
  requestCloudSyncState: (
    projectId: string,
    opts?: { timeoutMs?: number },
  ) => Promise<CloudSyncStateSnapshot>;
};

export async function ensureCloudProjectionFreshForLocalMutation(
  deps: CloudMutationReadinessDeps,
  opts: { reason: string },
): Promise<void> {
  let state = await deps.readState();
  if (state.pending_push) {
    const recovered = await tryRecoverPendingPushFromSyncState(deps);
    if (!recovered) throw pendingCloudPushError(state.pending_push);
    state = await deps.readState();
  }
  if (!isStale(state.last_checked_at, deps.staleAfterSeconds)) return;

  if (deps.autoSyncEnabled && deps.autoSyncPullOnWrite) {
    await deps.maybeAutoPull({ mode: "write", reason: `mutation_preflight:${opts.reason}` });
    const refreshed = await deps.readState();
    if (refreshed.pending_push) {
      throw pendingCloudPushError(refreshed.pending_push);
    }
    if (!isStale(refreshed.last_checked_at, deps.staleAfterSeconds)) return;
  }

  throw new BackendError(
    [
      "Cloud projection is stale; refusing local task mutation.",
      "Why: the active cloud backend projection may not include recent remote task changes.",
      "Fix: pull the cloud projection before mutating local task state.",
      "Safe command: agentplane backend sync cloud --direction pull --yes",
      "Stop condition: stop if pull reports open conflicts or cannot refresh the projection.",
    ].join("\n"),
    "E_BACKEND",
  );
}

async function tryRecoverPendingPushFromSyncState(
  deps: CloudMutationReadinessDeps,
): Promise<boolean> {
  if (!deps.autoSyncEnabled || !deps.autoSyncNetworkAllowed) return false;
  if (deps.missingConfigKeys().length > 0) return false;
  const syncState = await deps.requestCloudSyncState(deps.projectId, {
    timeoutMs: CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS,
  });
  if (
    syncState.unavailable ||
    syncState.conflicts.length > 0 ||
    syncState.diagnostics.degraded === true ||
    syncState.diagnostics.projectionHealth !== "current" ||
    syncState.diagnostics.activeBlockers !== 0
  ) {
    return false;
  }
  await deps.clearPendingPush();
  return true;
}
