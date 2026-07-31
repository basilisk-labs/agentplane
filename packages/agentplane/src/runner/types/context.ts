import type {
  EvaluatorSkepticismLevel,
  RunnerTraceConfig,
  RunnerTimeoutConfig,
} from "@agentplaneorg/core/config";
import type {
  AgentWorkOrderV2,
  KnowledgeRef,
  PreparedKnowledgeExcerpt,
  StateFingerprint,
  StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import type { TaskEvent } from "../../backends/task-backend.js";
import type { BlueprintPlanArtifact } from "../../blueprints/index.js";
import type { TaskRouteDecision } from "../../commands/shared/route-decision-types.js";
import type { AgentplaneCapabilityRegistry } from "../../runtime/capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import type { FrameworkExplainPayload } from "../../runtime/explain/index.js";
import type { FrameworkProtocolSurface } from "../../runtime/protocol/index.js";
import type { AgentWorkOrderPreparationView } from "../usecases/agent-work-order.js";

import type { RunnerAdapterCapabilities } from "./capabilities.js";
import type { RUNNER_API_VERSION, RUNNER_BUNDLE_SCHEMA_VERSION } from "./constants.js";
import type { RunnerPhaseToolManifest } from "./phase-tools.js";
import type { RunnerExecutionPlaybookContract } from "./playbooks.js";
import type {
  RunnerPolicyDecision,
  RunnerSandboxPolicy,
  RunnerWriteScopePolicy,
} from "./policy.js";
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

export type TaskEpisodeSection = {
  name: string;
  text: string;
  required: boolean;
};

export type TaskEpisodeOmissionReceipt = {
  section: string;
  required: boolean;
  reason_code: "section_budget_exhausted" | "required_section_unavailable";
};

type TaskEpisodeMetadata = {
  task_id: string;
  revision: number | null;
  status: string;
  owner: string | null;
  priority: string | number | null;
  tags: string[];
  task_kind: string | null;
  mutation_scope: string | null;
  blueprint_request: string | null;
};

/**
 * The only task representation serialized into a semantic runner episode.
 *
 * The backend TaskData object is intentionally not part of this view: it is
 * lifecycle state owned by the CLI, whereas an agent needs only the selected
 * semantic narrative and the compact history for its single episode.
 */
export type TaskEpisodeView = {
  schema_version: 1;
  kind: "agentplane.task_episode_view";
  metadata: TaskEpisodeMetadata;
  narrative: {
    title: string;
    description: string;
    sections: TaskEpisodeSection[];
  };
  verification: {
    commands: string[];
  };
  section_policy: {
    source: "task_document_schema";
    required_sections: string[];
  };
  history: {
    comments: { author: string; body: string }[];
    events: TaskEvent[];
  };
  readme_path?: string;
  dependency_state?: RunnerDependencyState;
  compaction: RunnerTaskContextCompaction;
};

/** @deprecated Use TaskEpisodeView; retained as a type-only compatibility alias. */
export type RunnerTaskContext = TaskEpisodeView;

export type RunnerTaskContextCompactionEntry = {
  original_bytes: number;
  emitted_bytes: number;
  original_count?: number;
  emitted_count?: number;
  truncated: boolean;
};

export type RunnerTaskContextCompaction = {
  sections: RunnerTaskContextCompactionEntry;
  comments: RunnerTaskContextCompactionEntry;
  events: RunnerTaskContextCompactionEntry;
  omissions: TaskEpisodeOmissionReceipt[];
  serialized: {
    source_bytes: number;
    emitted_bytes: number;
    duplicate_bytes_removed: number;
  };
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
  artifact_root?: string;
  run_dir: string;
  bundle_path: string;
  blueprint_plan_path: string;
  blueprint_execution_plan_path: string;
  blueprint_execution_state_path: string;
  context_manifest_path: string;
  bootstrap_path: string;
  state_path: string;
  events_path: string;
  result_path: string;
  receipt_path: string;
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
  evaluator_skepticism_level?: EvaluatorSkepticismLevel;
  adapter_capabilities?: RunnerAdapterCapabilities;
  adapter_capability_registry?: AgentplaneCapabilityRegistry;
  phase_tools?: RunnerPhaseToolManifest;
  policy_decision?: RunnerPolicyDecision;
  sandbox_policy?: RunnerSandboxPolicy;
  write_scope?: RunnerWriteScopePolicy;
  approvals?: {
    require_plan?: boolean;
    require_verify?: boolean;
    require_network?: boolean;
    require_force?: boolean;
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
  blueprint?: BlueprintPlanArtifact;
  playbook?: RunnerExecutionPlaybookContract;
  /** Canonical V2 work order for the semantic episode; optional for v1 bundles. */
  work_order?: AgentWorkOrderV2;
  /** Canonical V2 preparation projection paired with `work_order`; optional for v1 bundles. */
  work_order_preparation?: AgentWorkOrderPreparationView;
  /** Internal typed route source retained for runner state-fingerprint observation. */
  route_decision?: TaskRouteDecision;
  state_fingerprint?: StateFingerprint;
  state_fingerprint_policy?: StateFingerprintPolicy;
  /**
   * Digest-addressed views into the existing context knowledge plane.
   * Optional for v1 compatibility; durable knowledge remains at the referenced paths.
   */
  knowledge_refs?: KnowledgeRef[];
  /**
   * Bounded, in-memory preparation results for this episode. These receipts are
   * not a replacement for the assimilation task's context-pack.md artifact.
   */
  prepared_knowledge_excerpts?: PreparedKnowledgeExcerpt[];
  execution: RunnerExecutionContract;
};
