import type { AgentWorkOrderRole, AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { TaskExecutionContract, TaskExecutionRouteMode } from "@agentplaneorg/core/tasks";

import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";

export type NativeTaskProfile =
  | "analysis"
  | "content"
  | "docs"
  | "code"
  | "benchmark"
  | "regression"
  | "context"
  | "context_maximum"
  | "post_run_review"
  | "release"
  | "ops";

export type NativeEvidenceKind =
  | "sources"
  | "assumptions"
  | "context_manifest"
  | "changed_paths"
  | "check_result"
  | "artifact"
  | "approval"
  | "external_link"
  | "commit"
  | "final_output"
  | "weak_links"
  | "quality_report"
  | "rollback"
  | "execution_contract";

export type NativeEvidenceRequirement = {
  id: string;
  kind: NativeEvidenceKind;
  required: true;
  description: string;
};

export type NativeStopSeverity = "stop" | "approval_required" | "warn";

export type NativeStopRule = {
  id: string;
  severity: NativeStopSeverity;
  reason: string;
};

export type NativeLifecycleObligationId =
  | "planning"
  | "user_approval"
  | "implementation"
  | "independent_evaluation"
  | "deterministic_verification"
  | "hosted_integration"
  | "effect_in_doubt_stop";

export type NativeLifecycleObligation = {
  id: NativeLifecycleObligationId;
  owner:
    | "task_plan"
    | "authority_admission"
    | "semantic_work_order"
    | "quality_review"
    | "verification_contract"
    | "provider_gate"
    | "effect_recovery";
  required: boolean;
  protected: boolean;
};

export type NativeTaskObligations = {
  schema_version: 1;
  kind: "agentplane.native_task_obligations";
  source: "task_execution_contract";
  profile: NativeTaskProfile;
  task_kind: string;
  route: {
    selected_mode: TaskExecutionRouteMode;
    reason_codes: string[];
  };
  policy_modules: string[];
  context_budget: {
    max_policy_modules: number;
    max_prompt_blocks: number;
    profile: ResolvedExecutionProfileRuntime["profile"];
    rationale: string;
  };
  mandatory_stages: NativeLifecycleObligation[];
  evidence_requirements: NativeEvidenceRequirement[];
  stop_rules: NativeStopRule[];
};

export type NativeTaskObligationInput = {
  task_kind?: string | null;
  mutation_scope?: string | null;
  risk_flags?: readonly string[] | null;
  execution_contract?: TaskExecutionContract;
  selected_mode: TaskExecutionRouteMode;
  route_reason_codes?: readonly string[];
  execution_profile: ResolvedExecutionProfileRuntime;
};

export type NativeSemanticCapabilityInput = {
  can_mutate: boolean;
  role: AgentWorkOrderRole;
  has_knowledge: boolean;
};

export type NativeSemanticToolClass = AgentWorkOrderV2["authority"]["allowed_tool_classes"][number];
