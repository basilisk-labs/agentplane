import { BackendError } from "./shared.js";
import { readCloudBackendState, writeCloudBackendState } from "./cloud-backend-state.js";
import { cloudConflictMessage } from "./cloud-backend-utils.js";
import { pendingCloudPushError } from "./cloud-pending-push.js";

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
  statePath: string;
  requestCloudSyncState: (projectId: string) => Promise<CloudTaskStartSyncState>;
  sync: (syncOpts: {
    direction: "pull";
    conflict: "prefer-remote";
    quiet: true;
    confirm: true;
  }) => Promise<void>;
}): Promise<void> {
  if (!opts.autoSyncEnabled || !opts.autoSyncPullOnStartReady) return;
  if (opts.missingConfigKeys().length > 0) return;

  const state = await readCloudBackendState(opts.statePath);
  if (sameLocalDate(state.last_start_ready_pull_at, new Date())) return;
  if (state.pending_push) {
    throw pendingCloudPushError(state.pending_push);
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

  const syncState = await opts.requestCloudSyncState(opts.projectId);
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
  });
  const refreshed = await readCloudBackendState(opts.statePath);
  await writeCloudBackendState(opts.statePath, {
    last_checked_at: refreshed.last_checked_at,
    last_start_ready_pull_at: new Date().toISOString(),
    pending_push: refreshed.pending_push,
  });
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
