export type BuiltinBlueprintId =
  | "analysis.light"
  | "content.light"
  | "docs.change"
  | "code.direct"
  | "code.branch_pr"
  | "performance.benchmark"
  | "quality.regression"
  | "context.assimilation"
  | "context.maximum_assimilation"
  | "post_run.improvement_review"
  | "release.strict"
  | "ops.approval";

export type BlueprintId = BuiltinBlueprintId | (string & {});

export type TaskKind = "analysis" | "content" | "docs" | "code" | "release" | "ops" | "context";

export type WorkflowMode = "direct" | "branch_pr";

export type WorkflowGitCapabilities = {
  workflowMode: WorkflowMode;
  implementationCommitLocation: "current_checkout" | "task_worktree";
  finishCommitSource: "explicit_hash_or_comment_commit" | "explicit_hash";
  closeTailRequired: boolean;
  lifecycleCommentCommitLocation: "current_checkout" | "task_worktree";
  finishCommitFromComment: boolean;
};

export type BlueprintNodeKind =
  | "intake"
  | "scope"
  | "context_resolve"
  | "approval_gate"
  | "worktree_start"
  | "work_unit"
  | "deterministic_check"
  | "fast_local_checks"
  | "artifact_write"
  | "pr_artifact"
  | "hosted_checks"
  | "publish_or_integrate"
  | "verify_record"
  | "quality_gate"
  | "handoff"
  | "finish";

export type BlueprintNodeMode = "deterministic" | "agentic" | "approval" | "record";

export type EvidenceKind =
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
  | "rollback";

export type RecipeExtensionKind =
  | "context_hint"
  | "evidence_requirement"
  | "check_suggestion"
  | "output_schema"
  | "artifact_template"
  | "risk_hint"
  | "preferred_blueprint";

export type StopRuleSeverity = "stop" | "approval_required" | "warn";

export type MutationKind = "none" | "docs" | "code" | "release" | "ops" | "context" | "unknown";

export type RiskFlag =
  | "network"
  | "credentials"
  | "deploy"
  | "publish"
  | "merge"
  | "security"
  | "external_system";

export type BlueprintTaskIntent = {
  taskKind?: TaskKind;
  mutationScope?: MutationKind;
  riskFlags?: readonly RiskFlag[];
  blueprintRequest?: BlueprintId;
};

export type BlueprintContextBudget = {
  maxPolicyModules: number;
  maxPromptBlocks?: number;
  rationale: string;
};

export type BlueprintDefinition = Blueprint;
export type BlueprintState = BlueprintNode;

export type Blueprint = {
  id: BlueprintId;
  version: 1;
  title: string;
  description: string;
  taskKinds: readonly TaskKind[];
  workflowModes?: readonly WorkflowMode[];
  allowedCommands: readonly string[];
  policyModules: readonly string[];
  contextBudget: BlueprintContextBudget;
  nodes: readonly BlueprintNode[];
  edges: readonly BlueprintEdge[];
  requiredEvidence: readonly EvidenceRequirement[];
  stopRules: readonly StopRule[];
  recipeExtensionPoints?: readonly RecipeExtensionPoint[];
};

export type BlueprintNode = {
  id: string;
  kind: BlueprintNodeKind;
  mode: BlueprintNodeMode;
  required: boolean;
  protected?: boolean;
  allowedCommands?: readonly string[];
  policyModules?: readonly string[];
  inputs?: readonly string[];
  outputs?: readonly string[];
  evidence?: readonly EvidenceKind[];
  recipeExtensions?: readonly RecipeExtensionKind[];
};

export type BlueprintEdge = {
  from: string;
  to: string;
  condition?: string;
};

export type EvidenceRequirement = {
  id: string;
  kind: EvidenceKind;
  required: boolean;
  producedBy: string;
  description: string;
};

export type StopRule = {
  id: string;
  reason: string;
  severity: StopRuleSeverity;
};

export type RecipeExtensionPoint = {
  nodeKind: BlueprintNodeKind;
  allowed: readonly RecipeExtensionKind[];
  rejected: readonly string[];
};

export type BlueprintValidationProblem = {
  code:
    | "duplicate_blueprint_id"
    | "duplicate_node_id"
    | "duplicate_evidence_id"
    | "duplicate_stop_rule_id"
    | "empty_field"
    | "missing_core_node"
    | "missing_entry_node"
    | "multiple_entry_nodes"
    | "unknown_edge_node"
    | "cycle"
    | "unknown_evidence_producer"
    | "evidence_kind_not_produced"
    | "optional_protected_node"
    | "disallowed_node_kind"
    | "workflow_mode_mismatch"
    | "missing_approval_gate"
    | "missing_rollback_evidence";
  message: string;
  path?: string;
};

export type BlueprintValidationResult = {
  ok: boolean;
  errors: BlueprintValidationProblem[];
};

export type BlueprintPlanValidationProblem = {
  code:
    | "plan_policy_budget_exceeded"
    | "plan_unknown_policy_module"
    | "plan_unknown_context_policy_module"
    | "plan_duplicate_state"
    | "plan_unknown_state"
    | "plan_missing_entry_state"
    | "plan_missing_finish_state"
    | "plan_invalid_state_transition";
  message: string;
  path?: string;
};

export type BlueprintPlanValidationResult = {
  ok: boolean;
  errors: BlueprintPlanValidationProblem[];
};

export type BlueprintRegistry = {
  blueprints: readonly Blueprint[];
};

export type BlueprintSnapshotDigest = {
  algorithm: "sha256";
  value: string;
};

export type BlueprintExplainNode = {
  id: string;
  kind: BlueprintNodeKind;
  mode: BlueprintNodeMode;
  required: boolean;
  protected: boolean;
  allowedCommands: readonly string[];
  policyModules: readonly string[];
};

export type BlueprintExplainEvidence = {
  id: string;
  kind: EvidenceKind;
  producedBy: string;
  required: boolean;
  description: string;
};
