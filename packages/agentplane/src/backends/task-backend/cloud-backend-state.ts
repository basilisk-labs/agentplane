import { readFile } from "node:fs/promises";
import path from "node:path";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import {
  assertCloudProjectionDirectoryUnchanged,
  ensureContainedCloudProjectionDirectory,
} from "./cloud-projection-lock.js";
import { BackendError } from "./shared/errors.js";

const CLOUD_BACKEND_STATE_MAX_BYTES = 64 * 1024;
const SHA256_DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/u;
const CLOUD_BACKEND_STATE_KEYS = [
  "last_checked_at",
  "last_start_ready_pull_at",
  "pending_projection_apply",
  "pending_push",
  "projection_identity_sha256",
] as const;
const PENDING_PROJECTION_APPLY_KEYS = [
  "kind",
  "requires_explicit_adoption",
  "started_at",
  "target_projection_identity_sha256",
] as const;
const PENDING_PUSH_KEYS = ["failed_at", "kind", "reason"] as const;

export type CloudBackendPendingPush = {
  failed_at: string;
  kind: "local_dirty" | "push_failed";
  reason: string;
};

type CloudBackendPendingProjectionApply = {
  kind: "pull_apply";
  requires_explicit_adoption: boolean;
  started_at: string;
  target_projection_identity_sha256: string;
};

export type CloudBackendState = {
  last_checked_at: string | null;
  last_start_ready_pull_at: string | null;
  pending_projection_apply: CloudBackendPendingProjectionApply | null;
  pending_push: CloudBackendPendingPush | null;
  projection_identity_sha256: string | null;
};

export type CloudBackendSyncCheckpoint =
  | { kind: "missing" }
  | { kind: "invalid"; reason: "invalid_json" | "invalid_shape" }
  | { kind: "valid"; state: CloudBackendState };

function emptyCloudBackendState(): CloudBackendState {
  return {
    last_checked_at: null,
    last_start_ready_pull_at: null,
    pending_projection_apply: null,
    pending_push: null,
    projection_identity_sha256: null,
  };
}

function parseCloudBackendState(raw: unknown): CloudBackendState {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const state = raw as {
      last_checked_at?: unknown;
      last_start_ready_pull_at?: unknown;
      pending_projection_apply?: unknown;
      pending_push?: unknown;
      projection_identity_sha256?: unknown;
    };
    return {
      last_checked_at: typeof state.last_checked_at === "string" ? state.last_checked_at : null,
      last_start_ready_pull_at:
        typeof state.last_start_ready_pull_at === "string" ? state.last_start_ready_pull_at : null,
      pending_projection_apply: readPendingProjectionApply(state.pending_projection_apply),
      pending_push: readPendingPush(state.pending_push),
      projection_identity_sha256:
        typeof state.projection_identity_sha256 === "string" &&
        SHA256_DIGEST_PATTERN.test(state.projection_identity_sha256)
          ? state.projection_identity_sha256
          : null,
    };
  }
  return emptyCloudBackendState();
}

export async function readCloudBackendState(statePath: string): Promise<CloudBackendState> {
  try {
    return parseCloudBackendState(JSON.parse(await readFile(statePath, "utf8")) as unknown);
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT" && !(err instanceof SyntaxError)) throw err;
  }
  return emptyCloudBackendState();
}

export async function readContainedCloudBackendSyncCheckpoint(opts: {
  repositoryRoot: string;
  statePath: string;
}): Promise<CloudBackendSyncCheckpoint> {
  let text: string;
  try {
    text = await readContainedStableTextNoFollow({
      repository_root: opts.repositoryRoot,
      file_path: opts.statePath,
      label: "cloud backend projection state",
      max_bytes: CLOUD_BACKEND_STATE_MAX_BYTES,
    });
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return { kind: "missing" };
    throw err;
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text) as unknown;
  } catch (err) {
    if (err instanceof SyntaxError) return { kind: "invalid", reason: "invalid_json" };
    throw err;
  }
  if (!isValidCloudBackendStateShape(raw)) {
    return { kind: "invalid", reason: "invalid_shape" };
  }
  return { kind: "valid", state: parseCloudBackendState(raw) };
}

export function assertValidCloudBackendSyncCheckpoint(
  checkpoint: CloudBackendSyncCheckpoint,
): asserts checkpoint is Exclude<CloudBackendSyncCheckpoint, { kind: "invalid" }> {
  if (checkpoint.kind !== "invalid") return;
  throw new BackendError(
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

export function cloudBackendStateFromSyncCheckpoint(
  checkpoint: CloudBackendSyncCheckpoint,
): CloudBackendState {
  assertValidCloudBackendSyncCheckpoint(checkpoint);
  return checkpoint.kind === "missing" ? emptyCloudBackendState() : checkpoint.state;
}

export async function writeContainedCloudBackendState(opts: {
  expectedCheckpoint: CloudBackendSyncCheckpoint;
  repositoryRoot: string;
  state: CloudBackendState;
  statePath: string;
  /** @internal Deterministic race injection for security regression tests. */
  beforePublicationCheck?: () => Promise<void>;
  beforePublicationGuard?: () => Promise<void>;
}): Promise<void> {
  assertValidCloudBackendSyncCheckpoint(opts.expectedCheckpoint);
  const label = "cloud backend projection state directory";
  const directoryChain = await ensureContainedCloudProjectionDirectory({
    directoryPath: path.dirname(opts.statePath),
    label,
    repositoryRoot: opts.repositoryRoot,
  });
  const expectedToken = cloudBackendSyncCheckpointToken(opts.expectedCheckpoint);
  await atomicWriteFile(opts.statePath, `${JSON.stringify(opts.state, null, 2)}\n`, "utf8", {
    beforePublication: async () => {
      await opts.beforePublicationCheck?.();
      await assertCloudProjectionDirectoryUnchanged(directoryChain, label);
      const current = await readContainedCloudBackendSyncCheckpoint(opts);
      if (cloudBackendSyncCheckpointToken(current) !== expectedToken) {
        throw cloudProjectionCheckpointChangedError();
      }
      await opts.beforePublicationGuard?.();
      const guardedCurrent = await readContainedCloudBackendSyncCheckpoint(opts);
      if (cloudBackendSyncCheckpointToken(guardedCurrent) !== expectedToken) {
        throw cloudProjectionCheckpointChangedError();
      }
      await assertCloudProjectionDirectoryUnchanged(directoryChain, label);
    },
  });
  await assertCloudProjectionDirectoryUnchanged(directoryChain, label);
  const published = await readContainedCloudBackendSyncCheckpoint(opts);
  if (
    cloudBackendSyncCheckpointToken(published) !==
    cloudBackendSyncCheckpointToken({ kind: "valid", state: opts.state })
  ) {
    throw cloudProjectionCheckpointChangedError();
  }
}

export function cloudBackendSyncCheckpointToken(checkpoint: CloudBackendSyncCheckpoint): string {
  if (checkpoint.kind !== "valid") return JSON.stringify(checkpoint);
  const state = checkpoint.state;
  return JSON.stringify({
    kind: "valid",
    state: {
      last_checked_at: state.last_checked_at,
      last_start_ready_pull_at: state.last_start_ready_pull_at,
      pending_projection_apply: state.pending_projection_apply
        ? {
            kind: state.pending_projection_apply.kind,
            requires_explicit_adoption: state.pending_projection_apply.requires_explicit_adoption,
            started_at: state.pending_projection_apply.started_at,
            target_projection_identity_sha256:
              state.pending_projection_apply.target_projection_identity_sha256,
          }
        : null,
      pending_push: state.pending_push
        ? {
            failed_at: state.pending_push.failed_at,
            kind: state.pending_push.kind,
            reason: state.pending_push.reason,
          }
        : null,
      projection_identity_sha256: state.projection_identity_sha256,
    },
  });
}

export function cloudProjectionCheckpointChangedError(): BackendError {
  return new BackendError(
    [
      "Cloud projection checkpoint changed during synchronization; refusing to commit stale effects.",
      "Why: another process or operation updated cloud projection state after this sync was prepared.",
      "Fix: inspect the current checkpoint and repeat the intended sync from fresh state.",
      "Safe command: agentplane backend inspect cloud --yes",
      "Stop condition: do not clear pending state or retry against a different cloud identity.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_projection_checkpoint_changed" },
  );
}

function readPendingPush(input: unknown): CloudBackendPendingPush | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const pending = input as { failed_at?: unknown; reason?: unknown };
  if (typeof pending.failed_at !== "string" || typeof pending.reason !== "string") return null;
  return {
    failed_at: pending.failed_at,
    kind: (pending as { kind?: unknown }).kind === "local_dirty" ? "local_dirty" : "push_failed",
    reason: pending.reason,
  };
}

function readPendingProjectionApply(input: unknown): CloudBackendPendingProjectionApply | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const transition = input as {
    kind?: unknown;
    requires_explicit_adoption?: unknown;
    started_at?: unknown;
    target_projection_identity_sha256?: unknown;
  };
  if (
    transition.kind !== "pull_apply" ||
    typeof transition.requires_explicit_adoption !== "boolean" ||
    !isTimestampString(transition.started_at) ||
    typeof transition.target_projection_identity_sha256 !== "string" ||
    !SHA256_DIGEST_PATTERN.test(transition.target_projection_identity_sha256)
  ) {
    return null;
  }
  return {
    kind: transition.kind,
    requires_explicit_adoption: transition.requires_explicit_adoption,
    started_at: transition.started_at,
    target_projection_identity_sha256: transition.target_projection_identity_sha256,
  };
}

function isValidCloudBackendStateShape(input: unknown): boolean {
  if (!input || typeof input !== "object" || Array.isArray(input)) return false;
  if (!hasOnlyKeys(input, CLOUD_BACKEND_STATE_KEYS)) return false;
  const state = input as {
    last_checked_at?: unknown;
    last_start_ready_pull_at?: unknown;
    pending_projection_apply?: unknown;
    pending_push?: unknown;
    projection_identity_sha256?: unknown;
  };
  return (
    isOptionalNullableTimestamp(state.last_checked_at) &&
    isOptionalNullableTimestamp(state.last_start_ready_pull_at) &&
    isOptionalPendingProjectionApply(state.pending_projection_apply) &&
    isOptionalPendingPush(state.pending_push) &&
    (state.projection_identity_sha256 === undefined ||
      state.projection_identity_sha256 === null ||
      (typeof state.projection_identity_sha256 === "string" &&
        SHA256_DIGEST_PATTERN.test(state.projection_identity_sha256)))
  );
}

function isOptionalPendingProjectionApply(input: unknown): boolean {
  if (input === undefined || input === null) return true;
  if (typeof input !== "object" || Array.isArray(input)) return false;
  return (
    hasOnlyKeys(input, PENDING_PROJECTION_APPLY_KEYS) && readPendingProjectionApply(input) !== null
  );
}

function isOptionalNullableTimestamp(input: unknown): boolean {
  return input === undefined || input === null || isTimestampString(input);
}

function isOptionalPendingPush(input: unknown): boolean {
  if (input === undefined || input === null) return true;
  if (typeof input !== "object" || Array.isArray(input)) return false;
  if (!hasOnlyKeys(input, PENDING_PUSH_KEYS)) return false;
  const pending = input as { failed_at?: unknown; kind?: unknown; reason?: unknown };
  return (
    isTimestampString(pending.failed_at) &&
    (pending.kind === undefined ||
      pending.kind === "local_dirty" ||
      pending.kind === "push_failed") &&
    typeof pending.reason === "string"
  );
}

function hasOnlyKeys(input: object, allowed: readonly string[]): boolean {
  const allowedKeys = new Set(allowed);
  return Object.keys(input).every((key) => allowedKeys.has(key));
}

function isTimestampString(input: unknown): input is string {
  return typeof input === "string" && Number.isFinite(Date.parse(input));
}
