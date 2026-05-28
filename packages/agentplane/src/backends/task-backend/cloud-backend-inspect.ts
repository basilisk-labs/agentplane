import { BackendError, type TaskBackendInspectionResult } from "./shared.js";
import { readCloudBackendState } from "./cloud-backend-state.js";
import { isStale, type CloudConfigOverride } from "./cloud-backend-utils.js";
import type { CloudSyncStateSnapshot } from "./cloud-backend-sync.js";

export type CloudBackendConfigSnapshot = {
  endpoint: string;
  token: string;
  projectId: string;
  provider: string | null;
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
  const state = await readCloudBackendState(opts.config.statePath);
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
      lastCheckedAt: state.last_checked_at,
      staleAfterSeconds: opts.config.staleAfterSeconds,
      stale: isStale(state.last_checked_at, opts.config.staleAfterSeconds),
      statePath: opts.config.statePath,
      pendingPush: state.pending_push,
    },
  };
}
