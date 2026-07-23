export const GIT_OBSERVATION_PROVENANCE = "supervisor_observed" as const;

type GitObservationState = "available" | "unavailable";

export type GitObservationError = {
  operation: string;
  message: string;
  code: string | number | null;
  stderr: string | null;
};

export type GitStatusEntry = {
  index_status: string;
  worktree_status: string;
  path: string;
  original_path: string | null;
};

export type GitIndexEntry = {
  path: string;
  mode: string;
  object_id: string;
  stage: number;
};

type GitPathFingerprintKind =
  | "file"
  | "symlink"
  | "directory"
  | "missing"
  | "other"
  | "unavailable";

export type GitPathFingerprint = {
  path: string;
  kind: GitPathFingerprintKind;
  mode: number | null;
  size_bytes: number | null;
  sha256: string | null;
  symlink_target: string | null;
  error: GitObservationError | null;
};

export type GitSnapshot = {
  schema_version: 1;
  provenance: typeof GIT_OBSERVATION_PROVENANCE;
  state: GitObservationState;
  repository_root: string;
  captured_at: string;
  head_commit: string | null;
  snapshot_sha256: string | null;
  dirty_paths: string[];
  excluded_paths: string[];
  status_entries: GitStatusEntry[];
  index_entries: GitIndexEntry[];
  path_fingerprints: GitPathFingerprint[];
  errors: GitObservationError[];
};

export type CaptureGitSnapshotInput = {
  repository_root: string;
  excluded_roots?: readonly string[];
};

export type GitCommitPathChange = {
  status_code: string;
  path: string;
  original_path: string | null;
};

export type GitSnapshotPathState = {
  path: string;
  status_entries: GitStatusEntry[];
  index_entries: GitIndexEntry[];
  fingerprint: GitPathFingerprint | null;
};

export type GitSnapshotDeltaChange =
  | "added"
  | "modified"
  | "deleted"
  | "renamed"
  | "index"
  | "head";

export type GitSnapshotDeltaEntry = {
  path: string;
  original_path: string | null;
  change: GitSnapshotDeltaChange;
  change_kinds: ("content" | "status" | "index" | "head")[];
  before_sha256: string | null;
  after_sha256: string | null;
  before: GitSnapshotPathState;
  after: GitSnapshotPathState;
  head_changes: GitCommitPathChange[];
};

export type GitSnapshotSummary = {
  head_commit: string | null;
  snapshot_sha256: string | null;
  dirty_paths: string[];
};

export type GitSnapshotDelta = {
  schema_version: 1;
  provenance: typeof GIT_OBSERVATION_PROVENANCE;
  state: GitObservationState;
  repository_root: string;
  before: GitSnapshotSummary;
  after: GitSnapshotSummary;
  head_changed: boolean;
  changed_paths: string[];
  entries: GitSnapshotDeltaEntry[];
  head_changes: GitCommitPathChange[];
  sha256: string | null;
  excluded_paths: string[];
  errors: GitObservationError[];
};

export type CompareGitSnapshotsInput = {
  repository_root: string;
  before: GitSnapshot;
  after: GitSnapshot;
  excluded_roots?: readonly string[];
};
