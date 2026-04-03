import type {
  RunnerTimeoutConfig,
  RunnerTimeoutReason,
  RunnerTraceConfig,
} from "@agentplaneorg/core";
export type { RunnerTimeoutReason } from "@agentplaneorg/core";

import type { BehaviorResolutionTrace } from "../runtime/behavior/index.js";
import type { TaskData, TaskEvent } from "../backends/task-backend.js";
import type { AgentplaneCapabilityRegistry } from "../runtime/capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../runtime/execution-profile/index.js";
import type { FrameworkExplainPayload } from "../runtime/explain/index.js";
import type { FrameworkProtocolSurface } from "../runtime/protocol/index.js";

export const RUNNER_BUNDLE_SCHEMA_VERSION = 1 as const;
export const RUNNER_API_VERSION = "1" as const;
export const RUNNER_TRACE_SCHEMA_VERSION = 1 as const;

export type RunnerTarget =
  | {
      kind: "task";
      task_id: string;
    }
  | {
      kind: "recipe_scenario";
      recipe_id: string;
      scenario_id: string;
      task_id?: string;
    };

export type RunnerPromptRole = "system" | "policy" | "profile" | "task" | "context";

export type RunnerPromptBlock = {
  id: string;
  role: RunnerPromptRole;
  content: string;
  title?: string;
  source?: string;
  priority: number;
  resolution?: BehaviorResolutionTrace<Record<string, unknown>>;
};

export type RunnerRepositoryContext = {
  git_root: string;
  workflow_dir: string;
  backend_id: string;
  backend_config_path: string;
  branch?: string | null;
  head_commit?: string | null;
};

export type RunnerDependencyState = {
  ready: boolean;
  missing: string[];
  incomplete: string[];
  completed: string[];
};

export type RunnerTaskContext = {
  task_id: string;
  data: TaskData;
  frontmatter: Record<string, unknown>;
  doc: string;
  sections: Record<string, string>;
  comments: { author: string; body: string }[];
  events: TaskEvent[];
  readme_path?: string;
  dependency_state?: RunnerDependencyState;
  compaction?: RunnerTaskContextCompaction;
};

export type RunnerTaskContextCompactionEntry = {
  original_bytes: number;
  emitted_bytes: number;
  original_count?: number;
  emitted_count?: number;
  truncated: boolean;
};

export type RunnerTaskContextCompaction = {
  doc: RunnerTaskContextCompactionEntry;
  sections: RunnerTaskContextCompactionEntry;
  comments: RunnerTaskContextCompactionEntry;
  events: RunnerTaskContextCompactionEntry;
};

export type RunnerRecipeContext = {
  recipe_id: string;
  scenario_id: string;
  recipe_name?: string;
  recipe_version?: string;
  recipe_dir?: string;
  scenario_file?: string;
  run_profile?: Record<string, unknown>;
  selection_reasons?: string[];
  manifest?: Record<string, unknown>;
  scenario?: Record<string, unknown>;
  agents?: Record<string, unknown>[];
  skills?: Record<string, unknown>[];
  tools?: Record<string, unknown>[];
  capabilities?: AgentplaneCapabilityRegistry;
};

export type RunnerArtifactPaths = {
  run_dir: string;
  bundle_path: string;
  bootstrap_path: string;
  state_path: string;
  events_path: string;
  result_path: string;
  trace_path: string;
  stderr_path: string;
};

export type RunnerTracePolicy = RunnerTraceConfig;
export type RunnerTimeoutPolicy = RunnerTimeoutConfig;

export type RunnerCapabilityLevel = "native" | "wrapper" | "advisory" | "unsupported";

export type RunnerCapabilityChannel = "argv" | "env" | "result" | "none";

export type RunnerCapabilityDescriptor = {
  level: RunnerCapabilityLevel;
  channel: RunnerCapabilityChannel;
  supported_values?: string[];
  note?: string;
};

export type RunnerAdapterCapabilities = {
  adapter_id: string;
  fields: Record<string, RunnerCapabilityDescriptor>;
};

export type RunnerPolicyFieldStatus = "not_requested" | "enforced" | "advisory" | "unsupported";

export type RunnerPolicyFieldDecision = {
  requested?: unknown;
  effective?: unknown;
  status: RunnerPolicyFieldStatus;
  capability_level: RunnerCapabilityLevel;
  channel: RunnerCapabilityChannel;
  supported_values?: string[];
  note?: string;
};

export type RunnerPolicyRefusal = {
  code: string;
  message: string;
  policy_field?: string;
  declared_value?: unknown;
};

export type RunnerPolicyDecision = {
  adapter_id: string;
  requested: Record<string, unknown>;
  effective: Record<string, unknown>;
  fields: Record<string, RunnerPolicyFieldDecision>;
  refusal_reason?: RunnerPolicyRefusal | null;
};

export type RunnerExecutionContract = {
  adapter_id: string;
  mode: "execute" | "dry_run";
  run_id: string;
  artifact_paths: RunnerArtifactPaths;
  profile_runtime?: ResolvedExecutionProfileRuntime;
  trace_policy: RunnerTracePolicy;
  timeout_policy: RunnerTimeoutPolicy;
  adapter_capabilities?: RunnerAdapterCapabilities;
  adapter_capability_registry?: AgentplaneCapabilityRegistry;
  policy_decision?: RunnerPolicyDecision;
  approvals?: {
    require_plan?: boolean;
    require_verify?: boolean;
    require_network?: boolean;
  };
};

export type RunnerContextBundle = {
  schema_version: typeof RUNNER_BUNDLE_SCHEMA_VERSION;
  runner_api_version: typeof RUNNER_API_VERSION;
  target: RunnerTarget;
  base_prompts: RunnerPromptBlock[];
  framework_explain?: FrameworkExplainPayload;
  framework_protocol?: FrameworkProtocolSurface;
  repository: RunnerRepositoryContext;
  task?: RunnerTaskContext;
  recipe?: RunnerRecipeContext;
  execution: RunnerExecutionContract;
};

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
  files_changed_count?: number;
  tests_run?: string[];
  verification_candidates?: string[];
};

export type RunnerTraceStream = "stdout" | "stderr" | "system";

export type RunnerTraceKind = "json_event" | "text";

export type RunnerTraceEvent = {
  schema_version: typeof RUNNER_TRACE_SCHEMA_VERSION;
  ts: string;
  seq: number;
  stream: RunnerTraceStream;
  adapter_id: string;
  kind: RunnerTraceKind;
  raw: string;
  parsed?: Record<string, unknown>;
};

export type RunnerResultArtifact = {
  path: string;
  label?: string;
};

export type RunnerProcessSignal = "SIGHUP" | "SIGINT" | "SIGQUIT" | "SIGTERM" | "SIGKILL";

export type RunnerSupervisionState = {
  pid?: number | null;
  command?: string | null;
  started_at?: string | null;
  heartbeat_at?: string | null;
  cancel_requested_at?: string | null;
  cancel_signal?: RunnerProcessSignal | null;
  timeout_reason?: RunnerTimeoutReason | null;
  timeout_requested_at?: string | null;
  terminate_sent_at?: string | null;
  kill_sent_at?: string | null;
  force_killed?: boolean;
  exit_signal?: RunnerProcessSignal | null;
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

export type RunnerLifecycleStatus = "prepared" | "running" | RunnerResultStatus;

export type RunnerInvocationSnapshot = {
  executable: string | null;
  argv: string[];
  argv_count: number;
  env_keys: string[];
  cwd: string | null;
  run_dir: string | null;
  bundle_path: string | null;
  state_path: string | null;
  events_path: string | null;
  result_path: string | null;
  trace_path: string | null;
  stderr_path: string | null;
  bootstrap_path: string | null;
  output_last_message_path: string | null;
  dry_run: boolean;
  has_result_path: boolean;
  has_output_last_message_path: boolean;
};

export type RunnerPreparedMetadata = {
  prompt_count: number;
  bundle_bytes: number;
  bootstrap_bytes: number;
  bundle_sha256: string;
  bootstrap_sha256: string;
  has_task_context: boolean;
  has_recipe_context: boolean;
  trace_policy: RunnerTracePolicy;
  timeout_policy: RunnerTimeoutPolicy;
  adapter_capabilities?: RunnerAdapterCapabilities;
  adapter_capability_registry?: AgentplaneCapabilityRegistry;
  policy_decision?: RunnerPolicyDecision;
  invocation: RunnerInvocationSnapshot;
};

export type RunnerRunState = {
  schema_version: typeof RUNNER_BUNDLE_SCHEMA_VERSION;
  runner_api_version: typeof RUNNER_API_VERSION;
  run_id: string;
  adapter_id: string;
  target: RunnerTarget;
  status: RunnerLifecycleStatus;
  mode: RunnerExecutionContract["mode"];
  bundle_path: string;
  result_path: string;
  bootstrap_path?: string | null;
  events_path: string;
  trace_path: string;
  stderr_path: string;
  trace_policy: RunnerTracePolicy;
  timeout_policy: RunnerTimeoutPolicy;
  policy_decision?: RunnerPolicyDecision;
  created_at: string;
  updated_at: string;
  prepared_metadata?: RunnerPreparedMetadata;
  supervision?: RunnerSupervisionState;
  result?: RunnerResult;
};

export type RunnerEvent = {
  at: string;
  type: string;
  message: string;
  data?: Record<string, unknown>;
};

export type RunnerRunRecord = {
  bundle: RunnerContextBundle;
  state: RunnerRunState;
  result: RunnerResult | null;
};
