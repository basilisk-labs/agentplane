export type BlueprintId =
  | "analysis.light"
  | "content.light"
  | "docs.change"
  | "code.direct"
  | "code.branch_pr"
  | "release.strict"
  | "ops.approval";

export type TaskKind = "analysis" | "content" | "docs" | "code" | "release" | "ops";

export type WorkflowMode = "direct" | "branch_pr";

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

export type MutationKind = "none" | "docs" | "code" | "release" | "ops" | "unknown";

export type RiskFlag =
  | "network"
  | "credentials"
  | "deploy"
  | "publish"
  | "merge"
  | "security"
  | "external_system";

export type Blueprint = {
  id: BlueprintId;
  version: 1;
  title: string;
  description: string;
  taskKinds: readonly TaskKind[];
  workflowModes?: readonly WorkflowMode[];
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

export type BlueprintRegistry = {
  blueprints: readonly Blueprint[];
};

export type RecipeHint = {
  recipeId: string;
  recipeVersion?: string;
  recipeName?: string;
  extensionId?: string;
  summary?: string;
  kind: RecipeExtensionKind;
  targetNodeKind?: BlueprintNodeKind;
  value: unknown;
};

export type BlueprintResolveInput = {
  taskId?: string;
  title?: string;
  description?: string;
  tags: readonly string[];
  owner?: string;
  workflowMode?: WorkflowMode;
  mutation: MutationKind;
  touchedPaths?: readonly string[];
  recipeHints?: readonly RecipeHint[];
  riskFlags?: readonly RiskFlag[];
  explicitBlueprintId?: BlueprintId;
};

export type SkippedNode = {
  node: BlueprintNode;
  reason: string;
};

export type AcceptedRecipeExtension = {
  recipeId: string;
  recipeVersion?: string;
  recipeName?: string;
  extensionId?: string;
  nodeKind: BlueprintNodeKind;
  kind: RecipeExtensionKind;
  summary?: string;
  value?: unknown;
  reason: string;
};

export type RejectedRecipeExtension = {
  recipeId: string;
  recipeVersion?: string;
  recipeName?: string;
  extensionId?: string;
  nodeKind?: BlueprintNodeKind;
  kind: RecipeExtensionKind;
  summary?: string;
  value?: unknown;
  reason: string;
};

export type StopReason = {
  id: string;
  severity: StopRuleSeverity;
  reason: string;
};

export type ResolvedBlueprint = {
  blueprint: Blueprint;
  activeNodes: readonly BlueprintNode[];
  skippedNodes: readonly SkippedNode[];
  requiredEvidence: readonly EvidenceRequirement[];
  selectionReasons: readonly string[];
  acceptedRecipeExtensions: readonly AcceptedRecipeExtension[];
  rejectedRecipeExtensions: readonly RejectedRecipeExtension[];
  stopReasons: readonly StopReason[];
};

export type BlueprintExplainNode = {
  id: string;
  kind: BlueprintNodeKind;
  mode: BlueprintNodeMode;
  required: boolean;
  protected: boolean;
};

export type BlueprintExplainEvidence = {
  id: string;
  kind: EvidenceKind;
  producedBy: string;
  required: boolean;
  description: string;
};

export type BlueprintExplainOutput = {
  blueprintId: BlueprintId;
  blueprintVersion: 1;
  title: string;
  workflowMode?: WorkflowMode;
  route: readonly BlueprintExplainNode[];
  skippedNodes: readonly SkippedNode[];
  requiredEvidence: readonly BlueprintExplainEvidence[];
  selectionReasons: readonly string[];
  acceptedRecipeExtensions: readonly AcceptedRecipeExtension[];
  rejectedRecipeExtensions: readonly RejectedRecipeExtension[];
  stopReasons: readonly StopReason[];
};
