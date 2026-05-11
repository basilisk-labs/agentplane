export type BuiltinBlueprintId =
  | "analysis.light"
  | "content.light"
  | "docs.change"
  | "code.direct"
  | "code.branch_pr"
  | "performance.benchmark"
  | "quality.regression"
  | "runner.execution"
  | "post_run.improvement_review"
  | "release.strict"
  | "ops.approval";

export type BlueprintId = BuiltinBlueprintId | (string & {});

export type TaskKind = "analysis" | "content" | "docs" | "code" | "release" | "ops";

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

export type RecipeHint = {
  schemaVersion?: 2;
  source?: "recipe_blueprint_extension";
  recipeId: string;
  recipeVersion?: string;
  recipeName?: string;
  extensionId?: string;
  summary?: string;
  kind: RecipeExtensionKind;
  targetNodeKind?: BlueprintNodeKind;
  value: unknown;
  matchReasons?: readonly string[];
};

export type BlueprintResolveInput = {
  taskId?: string;
  title?: string;
  description?: string;
  tags: readonly string[];
  owner?: string;
  taskKind?: TaskKind;
  workflowMode?: WorkflowMode;
  mutation: MutationKind;
  mutationScope?: MutationKind;
  touchedPaths?: readonly string[];
  recipeHints?: readonly RecipeHint[];
  riskFlags?: readonly RiskFlag[];
  explicitBlueprintId?: BlueprintId;
  blueprintRequest?: BlueprintId;
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

export type BlueprintPlanState = {
  id: string;
  kind: BlueprintNodeKind;
  mode: BlueprintNodeMode;
  required: boolean;
  protected: boolean;
  allowedCommands: readonly string[];
  policyModules: readonly string[];
  evidenceKinds: readonly EvidenceKind[];
};

export type BlueprintContextManifestEntry = {
  id: string;
  kind: "prompt" | "policy_module" | "recipe" | "task" | "repository";
  reason: string;
  source?: string;
};

export type BlueprintPlanArtifact = {
  schemaVersion: 1;
  blueprintId: BlueprintId;
  blueprintVersion: 1;
  title: string;
  taskId?: string;
  workflowMode?: WorkflowMode;
  workflowGitCapabilities?: WorkflowGitCapabilities;
  taskIntent: BlueprintTaskIntent;
  whySelected: readonly string[];
  states: readonly BlueprintPlanState[];
  requiredEvidence: readonly BlueprintExplainEvidence[];
  policyModules: readonly string[];
  allowedCommands: readonly string[];
  contextBudget: BlueprintContextBudget;
  contextManifest: readonly BlueprintContextManifestEntry[];
  acceptedRecipeExtensions: readonly AcceptedRecipeExtension[];
  rejectedRecipeExtensions: readonly RejectedRecipeExtension[];
  stopReasons: readonly StopReason[];
};

export type BlueprintExecutionNodeStatus =
  | "pending"
  | "ready"
  | "running"
  | "succeeded"
  | "skipped"
  | "blocked"
  | "failed";

export type BlueprintExecutionEventType =
  | "planned"
  | "ready"
  | "started"
  | "succeeded"
  | "skipped"
  | "blocked"
  | "failed"
  | "evidence_attached"
  | "resume_checked"
  | "replay_checked";

export type BlueprintExecutionEvidenceRef = {
  id: string;
  kind: EvidenceKind;
  nodeId: string;
  path?: string;
  digest?: BlueprintSnapshotDigest;
  description?: string;
};

export type BlueprintExecutionPlanStep = {
  nodeId: string;
  nodeKind: BlueprintNodeKind;
  mode: BlueprintNodeMode;
  required: boolean;
  protected: boolean;
  dependsOn: readonly string[];
  allowedCommands: readonly string[];
  policyModules: readonly string[];
  expectedEvidence: readonly EvidenceKind[];
};

export type BlueprintNodeExecutionContract = {
  schemaVersion: 1;
  artifactKind: "agentplane.blueprint.node_execution_contract";
  blueprintId: BlueprintId;
  blueprintVersion: 1;
  taskId?: string;
  runId?: string;
  step: BlueprintExecutionPlanStep;
  acceptedRecipeExtensions: readonly AcceptedRecipeExtension[];
  stopReasons: readonly StopReason[];
};

export type BlueprintExecutionPlanArtifact = {
  schemaVersion: 1;
  artifactKind: "agentplane.blueprint.execution_plan";
  blueprintId: BlueprintId;
  blueprintVersion: 1;
  taskId?: string;
  runId?: string;
  generatedAt: string;
  steps: readonly BlueprintExecutionPlanStep[];
  nodeContracts: readonly BlueprintNodeExecutionContract[];
};

export type BlueprintExecutionStateNode = {
  nodeId: string;
  status: BlueprintExecutionNodeStatus;
  evidenceRefs: readonly BlueprintExecutionEvidenceRef[];
  updatedAt?: string;
  message?: string;
};

export type BlueprintExecutionStateEvent = {
  schemaVersion: 1;
  at: string;
  type: BlueprintExecutionEventType;
  nodeId?: string;
  status?: BlueprintExecutionNodeStatus;
  message: string;
  evidenceRefs?: readonly BlueprintExecutionEvidenceRef[];
};

export type BlueprintExecutionStateArtifact = {
  schemaVersion: 1;
  artifactKind: "agentplane.blueprint.execution_state";
  blueprintId: BlueprintId;
  blueprintVersion: 1;
  taskId?: string;
  runId?: string;
  nodes: readonly BlueprintExecutionStateNode[];
  history: readonly BlueprintExecutionStateEvent[];
};

export type BlueprintExecutionCheckProblemCode =
  | "execution_blueprint_mismatch"
  | "execution_version_mismatch"
  | "execution_run_mismatch"
  | "execution_missing_history"
  | "execution_missing_node_state"
  | "execution_unknown_node_state"
  | "execution_duplicate_node_state"
  | "execution_dependency_not_complete"
  | "execution_no_resumable_node";

export type BlueprintExecutionCheckProblem = {
  code: BlueprintExecutionCheckProblemCode;
  message: string;
  path?: string;
};

export type BlueprintExecutionCheckResult = {
  ok: boolean;
  problems: readonly BlueprintExecutionCheckProblem[];
  nextNodeId?: string;
};

export type BlueprintSnapshotDigest = {
  algorithm: "sha256";
  value: string;
};

export type BlueprintSnapshotResolverInput = {
  taskId?: string;
  title?: string;
  description?: string;
  tags: readonly string[];
  owner?: string;
  taskKind?: TaskKind;
  workflowMode?: WorkflowMode;
  workflowGitCapabilities?: WorkflowGitCapabilities;
  mutation: MutationKind;
  mutationScope?: MutationKind;
  touchedPaths: readonly string[];
  recipeHints: readonly RecipeHint[];
  riskFlags: readonly RiskFlag[];
  explicitBlueprintId?: BlueprintId;
  blueprintRequest?: BlueprintId;
};

export type BlueprintSnapshotSelectedBlueprint = {
  id: BlueprintId;
  version: 1;
  title: string;
  taskKinds: readonly TaskKind[];
  workflowModes: readonly WorkflowMode[];
};

export type BlueprintResolvedSnapshotArtifact = {
  schemaVersion: 1;
  artifactKind: "agentplane.blueprint.resolved_snapshot";
  digest: BlueprintSnapshotDigest;
  resolverInput: BlueprintSnapshotResolverInput;
  selectedBlueprint: BlueprintSnapshotSelectedBlueprint;
  plan: BlueprintPlanArtifact;
  nodes: readonly BlueprintPlanState[];
  requiredEvidence: readonly BlueprintExplainEvidence[];
  policyModules: readonly string[];
  allowedCommands: readonly string[];
  contextBudget: BlueprintContextBudget;
  contextManifest: readonly BlueprintContextManifestEntry[];
  acceptedRecipeExtensions: readonly AcceptedRecipeExtension[];
  rejectedRecipeExtensions: readonly RejectedRecipeExtension[];
  stopReasons: readonly StopReason[];
  selectionReasons: readonly string[];
};

export type BlueprintSnapshotValidationProblem = {
  code:
    | "snapshot_invalid_object"
    | "snapshot_invalid_schema_version"
    | "snapshot_invalid_artifact_kind"
    | "snapshot_invalid_digest"
    | "snapshot_digest_mismatch"
    | "snapshot_missing_resolver_input"
    | "snapshot_missing_selected_blueprint"
    | "snapshot_missing_plan"
    | "snapshot_plan_mismatch"
    | "snapshot_invalid_array";
  message: string;
  path?: string;
};

export type BlueprintSnapshotValidationResult = {
  ok: boolean;
  errors: BlueprintSnapshotValidationProblem[];
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

export type BlueprintExplainOutput = {
  blueprintId: BlueprintId;
  blueprintVersion: 1;
  title: string;
  workflowMode?: WorkflowMode;
  workflowGitCapabilities?: WorkflowGitCapabilities;
  route: readonly BlueprintExplainNode[];
  skippedNodes: readonly SkippedNode[];
  requiredEvidence: readonly BlueprintExplainEvidence[];
  plan: BlueprintPlanArtifact;
  selectionReasons: readonly string[];
  acceptedRecipeExtensions: readonly AcceptedRecipeExtension[];
  rejectedRecipeExtensions: readonly RejectedRecipeExtension[];
  stopReasons: readonly StopReason[];
};
