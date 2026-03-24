import type { TaskData, TaskEvent } from "../backends/task-backend.js";

export const RUNNER_BUNDLE_SCHEMA_VERSION = 1 as const;
export const RUNNER_API_VERSION = "1" as const;

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
};

export type RunnerArtifactPaths = {
  run_dir: string;
  bundle_path: string;
  bootstrap_path: string;
  state_path: string;
  events_path: string;
  result_path: string;
};

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

export type RunnerExecutionContract = {
  adapter_id: string;
  mode: "execute" | "dry_run";
  run_id: string;
  artifact_paths: RunnerArtifactPaths;
  adapter_capabilities?: RunnerAdapterCapabilities;
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
  artifacts?: RunnerResultArtifact[];
  findings?: string[];
  verification_hints?: string[];
  capabilities_used?: string[];
  metrics?: RunnerExecutionMetrics;
};

export type RunnerResult = {
  status: RunnerResultStatus;
  exit_code: number | null;
  started_at: string;
  ended_at: string;
  summary?: string;
  stdout_summary?: string;
  stderr_summary?: string;
  output_paths?: string[];
  artifacts?: RunnerResultArtifact[];
  findings?: string[];
  verification_hints?: string[];
  capabilities_used?: string[];
  metrics?: RunnerExecutionMetrics;
};

export type RunnerLifecycleStatus = "prepared" | "running" | RunnerResultStatus;

export type RunnerPreparedMetadata = {
  prompt_count: number;
  bundle_bytes: number;
  bootstrap_bytes: number;
  bundle_sha256: string;
  bootstrap_sha256: string;
  has_task_context: boolean;
  has_recipe_context: boolean;
  adapter_capabilities?: RunnerAdapterCapabilities;
  invocation: {
    executable: string | null;
    argv_count: number;
    env_keys: string[];
    cwd: string | null;
    has_result_path: boolean;
    has_output_last_message_path: boolean;
  };
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
