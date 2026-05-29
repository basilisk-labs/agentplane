import type {
  BlueprintExplainEvidence,
  BlueprintId,
  BlueprintSnapshotDigest,
  MutationKind,
  RiskFlag,
  TaskKind,
  WorkflowGitCapabilities,
  WorkflowMode,
} from "./model-core.js";
import type {
  AcceptedRecipeExtension,
  BlueprintContextManifestEntry,
  BlueprintPlanArtifact,
  BlueprintPlanState,
  RecipeHint,
  RejectedRecipeExtension,
  StopReason,
} from "./model-resolution.js";

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
  contextBudget: {
    maxPolicyModules: number;
    maxPromptBlocks?: number;
    rationale: string;
  };
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
