export type CloudBackendSettings = {
  endpoint?: string;
  token?: string;
  project_id?: string;
  provider?: string;
  cache_dir?: string;
  stale_after_seconds?: number;
  state_path?: string;
  autosync_enabled?: boolean;
  autosync_pull_on_read?: boolean;
  autosync_pull_on_write?: boolean;
  autosync_pull_on_start_ready?: boolean;
  autosync_push_on_write?: boolean;
  auto_push_on_mutation?: boolean;
};
