import type { TaskBackendCapabilities } from "./shared.js";

export const cloudBackendCapabilities = {
  canonical_source: "remote",
  projection: "cache",
  projection_read_mode: "native",
  reads_from_projection_by_default: true,
  writes_task_readmes: true,
  supports_task_revisions: true,
  supports_revision_guarded_writes: true,
  may_access_network_on_read: true,
  may_access_network_on_write: true,
  supports_projection_refresh: true,
  supports_push_sync: true,
  supports_snapshot_export: false,
} as const satisfies TaskBackendCapabilities;
