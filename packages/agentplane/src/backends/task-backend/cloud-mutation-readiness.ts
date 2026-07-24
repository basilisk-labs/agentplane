import { BackendError } from "./shared.js";
import {
  pendingCloudPushError,
  pendingCloudPushIdentityMismatchError,
} from "./cloud-pending-push.js";
import type { CloudBackendState } from "./cloud-backend-state.js";
import { isStale } from "./cloud-backend-utils.js";
import { cloudProjectionApplyIncompleteError } from "./cloud-sync-identity.js";

type CloudMutationReadinessDeps = {
  autoSyncEnabled: boolean;
  autoSyncPullOnWrite: boolean;
  projectionIdentitySha256: string;
  staleAfterSeconds: number | null;
  readState: () => Promise<CloudBackendState>;
  maybeAutoPull: (opts: { mode: "write"; reason: string }) => Promise<void>;
};

export async function ensureCloudProjectionFreshForLocalMutation(
  deps: CloudMutationReadinessDeps,
  opts: { reason: string },
): Promise<void> {
  let state = await deps.readState();
  if (state.pending_projection_apply) throw cloudProjectionApplyIncompleteError();
  if (state.pending_push) {
    if (state.projection_identity_sha256 !== deps.projectionIdentitySha256) {
      throw pendingCloudPushIdentityMismatchError(state.pending_push);
    }
    if (state.pending_push.kind === "local_dirty") {
      if (!isStale(state.last_checked_at, deps.staleAfterSeconds)) return;
      throw pendingCloudPushError(state.pending_push);
    }
    throw pendingCloudPushError(state.pending_push);
  }
  if (
    state.projection_identity_sha256 === deps.projectionIdentitySha256 &&
    !isStale(state.last_checked_at, deps.staleAfterSeconds)
  ) {
    return;
  }

  if (deps.autoSyncEnabled && deps.autoSyncPullOnWrite) {
    await deps.maybeAutoPull({ mode: "write", reason: `mutation_preflight:${opts.reason}` });
    const refreshed = await deps.readState();
    if (refreshed.pending_push) {
      throw pendingCloudPushError(refreshed.pending_push);
    }
    if (
      refreshed.projection_identity_sha256 === deps.projectionIdentitySha256 &&
      !isStale(refreshed.last_checked_at, deps.staleAfterSeconds)
    ) {
      return;
    }
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
