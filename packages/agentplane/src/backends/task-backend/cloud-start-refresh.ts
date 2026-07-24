import { BackendError } from "./shared.js";
import type { CloudBackendState } from "./cloud-backend-state.js";
import { CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS, cloudConflictMessage } from "./cloud-backend-utils.js";
import {
  pendingCloudPushError,
  pendingCloudPushIdentityMismatchError,
} from "./cloud-pending-push.js";

type CloudTaskStartSyncState = {
  conflicts: unknown[];
  safeCommand: string | null;
};

export async function refreshCloudProjectionBeforeTaskStart(opts: {
  autoSyncEnabled: boolean;
  autoSyncPullOnStartReady: boolean;
  autoSyncNetworkAllowed: boolean;
  missingConfigKeys: () => string[];
  projectId: string;
  projectionIdentitySha256: string;
  readState: () => Promise<CloudBackendState>;
  commitState: (update: (state: CloudBackendState) => CloudBackendState) => Promise<void>;
  requestCloudSyncState: (
    projectId: string,
    opts?: { timeoutMs?: number },
  ) => Promise<CloudTaskStartSyncState>;
  assertSyncIdentityReady: () => Promise<void>;
  sync: (syncOpts: {
    direction: "pull";
    conflict: "prefer-remote";
    quiet: true;
    confirm: true;
    timeoutMs?: number;
    syncStateTimeoutMs?: number;
  }) => Promise<void>;
}): Promise<void> {
  if (!opts.autoSyncEnabled || !opts.autoSyncPullOnStartReady) return;
  if (opts.missingConfigKeys().length > 0) return;

  const state = await opts.readState();
  if (state.pending_push) {
    if (state.projection_identity_sha256 !== opts.projectionIdentitySha256) {
      throw pendingCloudPushIdentityMismatchError(state.pending_push);
    }
    throw pendingCloudPushError(state.pending_push);
  }
  if (
    !state.pending_projection_apply &&
    state.projection_identity_sha256 === opts.projectionIdentitySha256 &&
    sameLocalDate(state.last_start_ready_pull_at, new Date())
  ) {
    return;
  }
  if (!opts.autoSyncNetworkAllowed) {
    throw new BackendError(
      [
        "Cloud projection daily task-start refresh requires network access approval.",
        "Why: task start-ready should see cloud-imported GitHub issue intake tasks before local work begins.",
        "Fix: pull the cloud projection before starting task work.",
        "Safe command: agentplane backend sync cloud --direction pull --conflict=prefer-remote --yes",
        "Stop condition: stop if pull reports open conflicts or cannot refresh the projection.",
      ].join("\n"),
      "E_BACKEND",
    );
  }

  await opts.assertSyncIdentityReady();
  const syncState = await opts.requestCloudSyncState(opts.projectId, {
    timeoutMs: CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS,
  });
  if (syncState.conflicts.length > 0) {
    throw new BackendError(
      cloudConflictMessage({
        conflicts: syncState.conflicts,
        safeCommand:
          syncState.safeCommand ??
          "agentplane backend sync cloud --direction pull --conflict=diff --yes",
      }),
      "E_BACKEND",
    );
  }

  await opts.sync({
    direction: "pull",
    conflict: "prefer-remote",
    quiet: true,
    confirm: true,
    timeoutMs: CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS,
    syncStateTimeoutMs: CLOUD_AUTO_SYNC_REQUEST_TIMEOUT_MS,
  });
  await opts.commitState((refreshed) => ({
    ...refreshed,
    last_start_ready_pull_at: new Date().toISOString(),
  }));
}

function sameLocalDate(value: string | null, now: Date): boolean {
  if (!value) return false;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return false;
  return (
    parsed.getFullYear() === now.getFullYear() &&
    parsed.getMonth() === now.getMonth() &&
    parsed.getDate() === now.getDate()
  );
}
