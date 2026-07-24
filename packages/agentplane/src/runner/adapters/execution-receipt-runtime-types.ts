import type { GitSnapshot } from "../observation/git-snapshot.js";
import type {
  ProtectedFilesystemCaptureMode,
  ProtectedFilesystemSnapshot,
} from "../observation/protected-filesystem.js";
import type { RunnerContextBundle } from "../types.js";

export type RunnerReceiptManifestState = "valid" | "missing_allowed" | "failed" | "not_reached";

export type RunnerExecutionObservationBefore = {
  git: GitSnapshot;
  bundle: RunnerContextBundle | null;
  prepared_artifact_digests: Map<string, string>;
  protected_filesystem: ProtectedFilesystemSnapshot | null;
  protected_paths: string[];
  filesystem_observation_prefixes: string[];
  filesystem_observation_mode: ProtectedFilesystemCaptureMode | null;
  errors: string[];
};
