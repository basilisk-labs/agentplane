import type {
  RunnerTimeoutConfig,
  RunnerTimeoutReason,
  RunnerTraceConfig,
} from "@agentplaneorg/core/config";

export type { RunnerTimeoutReason } from "@agentplaneorg/core/config";

export type RunnerTracePolicy = RunnerTraceConfig;
export type RunnerTimeoutPolicy = RunnerTimeoutConfig;

export type RunnerInvocation = {
  adapter_id: string;
  run_id: string;
  run_dir: string;
  bundle_path: string;
  state_path: string;
  events_path: string;
  result_path: string;
  trace_path: string;
  stderr_path: string;
  trace_policy: RunnerTracePolicy;
  timeout_policy: RunnerTimeoutPolicy;
  bootstrap_path?: string | null;
  output_last_message_path?: string | null;
  argv: string[];
  env: Record<string, string>;
  dry_run: boolean;
};

export type RunnerExecutionMetrics = {
  duration_ms?: number;
  stdout_bytes?: number;
  stderr_bytes?: number;
  output_last_message_bytes?: number | null;
};

export type RunnerResultEvidence = {
  evidence_paths?: string[];
  changed_paths?: string[];
  conflict_paths?: string[];
  files_changed_count?: number;
  tests_run?: string[];
  verification_candidates?: string[];
  blocked_reason?: string;
  recommended_parent_action?: string;
};

export type RunnerResultArtifact = {
  path: string;
  label?: string;
};

export type RunnerResultStatus = "success" | "failed" | "cancelled";

export type RunnerResultManifest = {
  schema_version: 1;
  status?: RunnerResultStatus;
  exit_code?: number | null;
  summary?: string;
  stdout_summary?: string;
  stderr_summary?: string;
  timeout_reason?: RunnerTimeoutReason | null;
  artifacts?: RunnerResultArtifact[];
  findings?: string[];
  verification_hints?: string[];
  capabilities_used?: string[];
  metrics?: RunnerExecutionMetrics;
  evidence?: RunnerResultEvidence;
};

export type RunnerResult = {
  status: RunnerResultStatus;
  exit_code: number | null;
  started_at: string;
  ended_at: string;
  summary?: string;
  stdout_summary?: string;
  stderr_summary?: string;
  timeout_reason?: RunnerTimeoutReason | null;
  output_paths?: string[];
  artifacts?: RunnerResultArtifact[];
  findings?: string[];
  verification_hints?: string[];
  capabilities_used?: string[];
  metrics?: RunnerExecutionMetrics;
  evidence?: RunnerResultEvidence;
};
