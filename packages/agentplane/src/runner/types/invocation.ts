import type {
  RunnerTimeoutConfig,
  RunnerTimeoutReason,
  RunnerTraceConfig,
} from "@agentplaneorg/core/config";
import type { AgentSemanticResult } from "@agentplaneorg/core/schemas";

export type { RunnerTimeoutReason } from "@agentplaneorg/core/config";

export type RunnerTracePolicy = RunnerTraceConfig;
export type RunnerTimeoutPolicy = RunnerTimeoutConfig;

export type RunnerInvocation = {
  adapter_id: string;
  run_id: string;
  work_order_id: string;
  repository_root: string;
  run_dir: string;
  bundle_path: string;
  state_path: string;
  events_path: string;
  result_path: string;
  receipt_path: string;
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

type RunnerResultEvidence = {
  provenance?: "supervisor_observed";
  evidence_paths?: string[];
  changed_paths?: string[];
  conflict_paths?: string[];
  files_changed_count?: number;
  tests_run?: string[];
  observed_checks?: {
    id: string;
    status: "passed" | "failed" | "not_run";
  }[];
  receipt_path?: string;
  receipt_sha256?: string;
  verification_candidates?: string[];
  blocked_reason?: string;
  recommended_parent_action?: string;
};

export type RunnerResultArtifact = {
  path: string;
  label?: string;
};

export type RunnerResultStatus = "success" | "failed" | "blocked" | "cancelled";

type AgentReportProvenance = "agent_reported";

export type AgentReportedSemanticResult = {
  provenance: AgentReportProvenance;
  value: AgentSemanticResult | LegacyAgentSemanticResult;
};

export type LegacyAgentSemanticResult = {
  schema_version: 2;
  kind: "legacy_agent_semantic_result";
  work_order_id: string;
  status?: "completed" | "blocked" | "failed";
  summary?: string;
  findings?: string[];
  blocker?: {
    summary: string;
    recommended_action?: string;
  };
};

export type AgentReportedLegacyClaim = {
  field: string;
  value: unknown;
  provenance: AgentReportProvenance;
};

export type RunnerResultManifestWarning =
  | {
      code: "legacy_manifest_v1";
      message: string;
    }
  | {
      code: "legacy_agent_observed_claim";
      field: string;
      message: string;
    };

export type AgentReportedClaimConflict = {
  field: string;
  agent_reported: unknown;
  observed: unknown;
  resolution: "observed_wins";
};

export type RunnerResultManifest = {
  source_schema_version: 1 | 2;
  semantic_result: AgentReportedSemanticResult;
  legacy_claims: AgentReportedLegacyClaim[];
  warnings: RunnerResultManifestWarning[];
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
  semantic_result?: AgentReportedSemanticResult;
  agent_reported_claims?: AgentReportedLegacyClaim[];
  claim_conflicts?: AgentReportedClaimConflict[];
  manifest_warnings?: RunnerResultManifestWarning[];
  execution_receipt?: {
    path: string;
    sha256: string;
    verification_state: "observed_success" | "rejected" | "unverified" | "compatibility_unverified";
    observed_by: "agentplane";
  };
};

export type RunnerResultRecord = RunnerResult & {
  schema_version: 1;
  kind: "runner_result_record";
  observed_by: "agentplane";
};
