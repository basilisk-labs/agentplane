import type { CloudBackendSyncCheckpoint } from "./cloud-backend-state.js";
import { pendingCloudPushIdentityMismatchError } from "./cloud-pending-push.js";
import { BackendError } from "./shared.js";

export type CloudSyncIdentityTransition = "adopt_remote" | "bootstrap_local" | "routine";
export type CloudSyncIdentityOrigin = "automatic" | "explicit";

export type CloudSyncIdentityDecision = {
  bindProjectionIdentity: boolean;
  checkpoint: "legacy_unbound" | "mismatch" | "missing" | "same";
};

export function resolveCloudSyncProjectionIdentity(opts: {
  direction: "push" | "pull";
  conflict: "diff" | "fail" | "prefer-local" | "prefer-remote";
  checkpoint: CloudBackendSyncCheckpoint;
  origin: CloudSyncIdentityOrigin;
  projectionIdentitySha256: string;
  transition: CloudSyncIdentityTransition;
}): CloudSyncIdentityDecision {
  if (opts.checkpoint.kind === "invalid") {
    throw invalidCloudSyncCheckpointError();
  }
  const checkpoint = classifyCheckpoint(opts.checkpoint, opts.projectionIdentitySha256);
  if (checkpoint === "same") return { bindProjectionIdentity: true, checkpoint };
  if (opts.checkpoint.kind === "valid" && opts.checkpoint.state.pending_push) {
    throw pendingCloudPushIdentityMismatchError(opts.checkpoint.state.pending_push);
  }
  if (opts.origin === "automatic") {
    if (opts.direction === "push" && checkpoint === "missing") {
      throw cloudProjectionBootstrapRequiredError();
    }
    throw cloudProjectionAdoptionRequiredError();
  }

  if (opts.direction === "push") {
    if (
      checkpoint === "missing" &&
      opts.transition === "bootstrap_local" &&
      opts.conflict === "fail"
    ) {
      return { bindProjectionIdentity: true, checkpoint };
    }
    if (checkpoint === "missing") throw cloudProjectionBootstrapRequiredError();
    throw cloudProjectionIdentityMismatchError();
  }

  if (opts.transition === "adopt_remote" && opts.conflict === "prefer-remote") {
    return { bindProjectionIdentity: true, checkpoint };
  }
  if (opts.transition === "routine" && (opts.conflict === "diff" || opts.conflict === "fail")) {
    return {
      bindProjectionIdentity: checkpoint !== "mismatch",
      checkpoint,
    };
  }
  throw cloudProjectionAdoptionRequiredError();
}

function invalidCloudSyncCheckpointError(): BackendError {
  return new BackendError(
    [
      "Cloud backend sync checkpoint is invalid; refusing network synchronization.",
      "Why: malformed or structurally invalid state cannot prove which endpoint, project, and provider produced the local projection.",
      "Fix: inspect the cloud configuration and restore or deliberately replace the invalid checkpoint before syncing.",
      "Safe command: agentplane backend inspect cloud --yes",
      "Stop condition: do not push or pull while the checkpoint cannot be validated.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_projection_checkpoint_invalid" },
  );
}

function cloudProjectionAdoptionRequiredError(): BackendError {
  return new BackendError(
    [
      "Cloud projection identity change requires explicit adoption.",
      "Why: this sync can replace the local cache or bind it to a different endpoint, project, or provider.",
      "Fix: review a read-only diff, then explicitly adopt the intended remote.",
      "Safe command: agentplane backend sync cloud --direction pull --conflict=diff --yes",
      "Stop condition: do not adopt if the active remote or diff is unexpected.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_projection_adoption_required" },
  );
}

function cloudProjectionBootstrapRequiredError(): BackendError {
  return new BackendError(
    [
      "Cloud projection identity is not established; refusing to push cached tasks.",
      "Why: no trusted checkpoint binds the local cache to the active endpoint, project, and provider.",
      "Fix: bootstrap this projection explicitly after confirming the remote and local cache ownership.",
      "Safe command: agentplane backend sync cloud --direction push --conflict=fail --bootstrap-projection --yes",
      "Stop condition: do not bootstrap if the cache may belong to another cloud project.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_projection_bootstrap_required" },
  );
}

function cloudProjectionIdentityMismatchError(): BackendError {
  return new BackendError(
    [
      "Cloud backend checkpoint identity does not match the active remote; refusing to push.",
      "Why: the endpoint, project, or provider changed after the local projection was synchronized, so pushing could send cached tasks to the wrong remote.",
      "Fix: review the intended remote with a read-only pull, then explicitly adopt it before pushing.",
      "Safe command: agentplane backend sync cloud --direction pull --conflict=diff --yes",
      "Stop condition: do not push until the local projection is explicitly bound to the intended remote.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_projection_identity_mismatch" },
  );
}

function classifyCheckpoint(
  checkpoint: Exclude<CloudBackendSyncCheckpoint, { kind: "invalid" }>,
  projectionIdentitySha256: string,
): CloudSyncIdentityDecision["checkpoint"] {
  if (checkpoint.kind === "missing") return "missing";
  if (checkpoint.state.projection_identity_sha256 === projectionIdentitySha256) return "same";
  if (checkpoint.state.projection_identity_sha256 === null) return "legacy_unbound";
  return "mismatch";
}
