import {
  assertValidCloudBackendSyncCheckpoint,
  type CloudBackendSyncCheckpoint,
} from "./cloud-backend-state.js";
import {
  pendingCloudPushError,
  pendingCloudPushIdentityMismatchError,
} from "./cloud-pending-push.js";
import { BackendError } from "./shared.js";

export type CloudSyncIdentityTransition = "adopt_remote" | "bootstrap_local" | "routine";
export type CloudSyncIdentityOrigin = "automatic" | "explicit";

export type CloudSyncIdentityDecision = {
  bindProjectionIdentity: boolean;
  checkpoint: "legacy_unbound" | "mismatch" | "missing" | "same";
  projectionApply: "none" | "resume" | "start";
  projectionApplyRequiresAdoption: boolean;
};

export function resolveCloudSyncProjectionIdentity(opts: {
  direction: "push" | "pull";
  conflict: "diff" | "fail" | "prefer-local" | "prefer-remote";
  checkpoint: CloudBackendSyncCheckpoint;
  origin: CloudSyncIdentityOrigin;
  projectionIdentitySha256: string;
  transition: CloudSyncIdentityTransition;
}): CloudSyncIdentityDecision {
  assertValidCloudBackendSyncCheckpoint(opts.checkpoint);
  const checkpoint = classifyCheckpoint(opts.checkpoint, opts.projectionIdentitySha256);
  const pendingPush = opts.checkpoint.kind === "valid" ? opts.checkpoint.state.pending_push : null;
  if (pendingPush) {
    if (checkpoint !== "same") throw pendingCloudPushIdentityMismatchError(pendingPush);
    if (opts.direction === "pull") throw pendingCloudPushError(pendingPush);
  }
  const pendingProjectionApply =
    opts.checkpoint.kind === "valid" ? opts.checkpoint.state.pending_projection_apply : null;
  if (pendingProjectionApply) {
    if (
      opts.direction === "pull" &&
      opts.conflict === "prefer-remote" &&
      pendingProjectionApply.target_projection_identity_sha256 === opts.projectionIdentitySha256 &&
      (!pendingProjectionApply.requires_explicit_adoption ||
        (opts.origin === "explicit" && opts.transition === "adopt_remote"))
    ) {
      return {
        bindProjectionIdentity: true,
        checkpoint,
        projectionApply: "resume",
        projectionApplyRequiresAdoption: pendingProjectionApply.requires_explicit_adoption,
      };
    }
    throw cloudProjectionApplyIncompleteError();
  }
  if (checkpoint === "same") {
    return {
      bindProjectionIdentity: true,
      checkpoint,
      projectionApply:
        opts.direction === "pull" && opts.conflict === "prefer-remote" ? "start" : "none",
      projectionApplyRequiresAdoption: false,
    };
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
      return {
        bindProjectionIdentity: true,
        checkpoint,
        projectionApply: "none",
        projectionApplyRequiresAdoption: false,
      };
    }
    if (checkpoint === "missing") throw cloudProjectionBootstrapRequiredError();
    throw cloudProjectionIdentityMismatchError();
  }

  if (opts.transition === "adopt_remote" && opts.conflict === "prefer-remote") {
    return {
      bindProjectionIdentity: true,
      checkpoint,
      projectionApply: "start",
      projectionApplyRequiresAdoption: true,
    };
  }
  if (opts.transition === "routine" && (opts.conflict === "diff" || opts.conflict === "fail")) {
    return {
      bindProjectionIdentity: false,
      checkpoint,
      projectionApply: "none",
      projectionApplyRequiresAdoption: false,
    };
  }
  throw cloudProjectionAdoptionRequiredError();
}

export function cloudProjectionApplyIncompleteError(): BackendError {
  return new BackendError(
    [
      "Cloud projection apply is incomplete; refusing unrelated cache use.",
      "Why: a prior prefer-remote pull may have partially changed the local cache and must converge against the same target identity.",
      "Fix: repeat the same prefer-remote pull; include explicit adoption when the marker requires it.",
      "Safe command: agentplane backend sync cloud --direction pull --conflict=prefer-remote --yes",
      "Stop condition: do not read, mutate, push, or switch backends until the pull apply completes successfully.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_projection_apply_incomplete" },
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
