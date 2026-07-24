export const PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE = "supervisor_observed" as const;

type ProtectedFilesystemObservationState = "available" | "unavailable";

export type ProtectedFilesystemCaptureMode = "content_hash" | "metadata_only";

export type ProtectedFilesystemObservationOperation =
  | "input"
  | "repository_root"
  | "budget"
  | "lstat"
  | "read_directory"
  | "read_file"
  | "read_symlink"
  | "unsupported_entry"
  | "comparison_input"
  | "snapshot_unavailable";

export type ProtectedFilesystemObservationError = {
  source: "capture" | "before" | "after" | "comparison";
  operation: ProtectedFilesystemObservationOperation;
  path: string | null;
  message: string;
  code: string | number | null;
};

export type ProtectedFilesystemEntry = {
  path: string;
  kind: "file" | "symlink" | "directory";
  mode: number;
  size_bytes: number | null;
  metadata_sha256: string | null;
  sha256: string | null;
  symlink_target: string | null;
};

export type ProtectedFilesystemSnapshot = {
  schema_version: 1;
  provenance: typeof PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE;
  state: ProtectedFilesystemObservationState;
  repository_root: string;
  capture_mode: ProtectedFilesystemCaptureMode;
  protected_prefixes: string[];
  excluded_paths: string[];
  entries: ProtectedFilesystemEntry[];
  snapshot_sha256: string | null;
  errors: ProtectedFilesystemObservationError[];
};

export type CaptureProtectedFilesystemSnapshotInput = {
  repository_root: string;
  protected_prefixes: readonly string[];
  capture_mode?: ProtectedFilesystemCaptureMode;
  excluded_roots?: readonly string[];
  limits?: Partial<ProtectedFilesystemObservationLimits>;
};

export type ProtectedFilesystemObservationLimits = {
  max_entries: number;
  max_bytes: number;
  timeout_ms: number;
};

export const DEFAULT_PROTECTED_FILESYSTEM_OBSERVATION_LIMITS: Readonly<ProtectedFilesystemObservationLimits> =
  Object.freeze({
    max_entries: 100_000,
    max_bytes: 512 * 1024 * 1024,
    timeout_ms: 30_000,
  });

export type ProtectedFilesystemDeltaEntry = {
  path: string;
  change: "added" | "modified" | "deleted";
  before: ProtectedFilesystemEntry | null;
  after: ProtectedFilesystemEntry | null;
};

export type ProtectedFilesystemDelta = {
  schema_version: 1;
  provenance: typeof PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE;
  state: ProtectedFilesystemObservationState;
  repository_root: string;
  capture_mode: ProtectedFilesystemCaptureMode;
  protected_prefixes: string[];
  excluded_paths: string[];
  before_snapshot_sha256: string | null;
  after_snapshot_sha256: string | null;
  changed_paths: string[];
  entries: ProtectedFilesystemDeltaEntry[];
  sha256: string | null;
  errors: ProtectedFilesystemObservationError[];
};

export type CompareProtectedFilesystemSnapshotsInput = {
  repository_root: string;
  before: ProtectedFilesystemSnapshot;
  after: ProtectedFilesystemSnapshot;
};
