import type { RunnerTraceConfig, RunnerTimeoutConfig } from "@agentplaneorg/core/config";

import type { TaskData, TaskEvent } from "../../backends/task-backend.js";
import type { AgentplaneCapabilityRegistry } from "../../runtime/capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import type { FrameworkExplainPayload } from "../../runtime/explain/index.js";
import type { FrameworkProtocolSurface } from "../../runtime/protocol/index.js";

import type { RunnerAdapterCapabilities } from "./capabilities.js";
import type { RUNNER_API_VERSION, RUNNER_BUNDLE_SCHEMA_VERSION } from "./constants.js";
import type { RunnerPolicyDecision } from "./policy.js";
import type { RunnerPromptBlock } from "./prompts.js";
import type { RunnerTarget } from "./target.js";

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
