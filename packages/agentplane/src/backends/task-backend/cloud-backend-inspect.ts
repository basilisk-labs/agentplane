import { BackendError, type TaskBackendInspectionResult } from "./shared.js";
import {
  readContainedCloudBackendSyncCheckpoint,
  type CloudBackendSyncCheckpoint,
} from "./cloud-backend-state.js";
import { isStale, type CloudConfigOverride } from "./cloud-backend-utils.js";
import type { CloudSyncStateSnapshot } from "./cloud-backend-sync.js";

export type CloudBackendConfigSnapshot = {
  endpoint: string;
  token: string;
  projectId: string;
  provider: string | null;
  projectionIdentitySha256: string;
  repositoryRoot: string;
  statePath: string;
  staleAfterSeconds: number | null;
  configOverrides: CloudConfigOverride[];
  dotEnv: {
    root: string;
    path: string;
    loaded: boolean;
  };
};

export function missingCloudConfigKeys(
  config: Pick<CloudBackendConfigSnapshot, "endpoint" | "token" | "projectId">,
): string[] {
  const required = [
    [config.endpoint, "AGENTPLANE_CLOUD_ENDPOINT"],
    [config.token, "AGENTPLANE_CLOUD_TOKEN"],
    [config.projectId, "AGENTPLANE_CLOUD_PROJECT_ID"],
  ] as const;
  return required.flatMap(([value, key]) => (value ? [] : [key]));
}

export function assertCloudBackendConfigured(config: CloudBackendConfigSnapshot): void {
  const missing = missingCloudConfigKeys(config);
  if (missing.length > 0) {
    throw new BackendError(
      [
        `Cloud backend is not configured: missing ${missing.join(", ")}`,
        `Canonical env root: ${config.dotEnv.root}`,
        `Checked .env: ${config.dotEnv.path}${config.dotEnv.loaded ? "" : " (not found)"}`,
        "Fix: add the missing AGENTPLANE_CLOUD_* values to the canonical repository root .env or export them explicitly in the shell.",
      ].join("\n"),
      "E_BACKEND",
    );
  }
}

export async function inspectCloudBackendConfiguration(opts: {
  config: CloudBackendConfigSnapshot;
  requestCloudSyncState: (projectId: string) => Promise<CloudSyncStateSnapshot>;
}): Promise<TaskBackendInspectionResult> {
  const missing = missingCloudConfigKeys(opts.config);
  const checkpoint = await inspectCheckpoint(opts.config);
  const state = checkpoint.kind === "valid" ? checkpoint.state : null;
  const syncState =
    missing.length === 0
      ? await opts.requestCloudSyncState(opts.config.projectId).catch(() => null)
      : null;
  return {
    backendId: "cloud",
    visibleCustomFields: [],
    canonicalState: { configuredFieldId: null, visibleFieldId: null },
    configuredFieldNameDrift: [],
    connection: {
      endpoint: opts.config.endpoint || null,
      projectId: opts.config.projectId || null,
      connected: missing.length === 0,
      missing,
      provider: opts.config.provider,
      envOverrides: opts.config.configOverrides,
      syncState: syncState?.diagnostics ?? null,
    },
    freshness: {
      lastCheckedAt: state?.last_checked_at ?? null,
      staleAfterSeconds: opts.config.staleAfterSeconds,
      stale:
        state?.projection_identity_sha256 !== opts.config.projectionIdentitySha256 ||
        isStale(state.last_checked_at, opts.config.staleAfterSeconds),
      statePath: opts.config.statePath,
      checkpoint: checkpointInspection(checkpoint),
      pendingPush: state?.pending_push ?? null,
    },
  };
}

type InspectedCheckpoint = CloudBackendSyncCheckpoint | { kind: "unsafe"; reason: string };

async function inspectCheckpoint(config: CloudBackendConfigSnapshot): Promise<InspectedCheckpoint> {
  try {
    return await readContainedCloudBackendSyncCheckpoint({
      repositoryRoot: config.repositoryRoot,
      statePath: config.statePath,
    });
  } catch (error) {
    return {
      kind: "unsafe",
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

function checkpointInspection(
  checkpoint: InspectedCheckpoint,
): NonNullable<TaskBackendInspectionResult["freshness"]>["checkpoint"] {
  if (checkpoint.kind === "valid" || checkpoint.kind === "missing") {
    return { status: checkpoint.kind, repair: null };
  }
  const status = checkpoint.kind === "invalid" ? checkpoint.reason : "unsafe";
  return {
    status,
    repair:
      status === "unsafe"
        ? "Restore the configured state path as a regular repository-contained file before syncing."
        : "Restore state.json from a trusted checkpoint, or remove it only as part of an explicit projection bootstrap or remote adoption.",
  };
}
