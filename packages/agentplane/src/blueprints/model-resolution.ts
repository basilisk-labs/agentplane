import type {
  Blueprint,
  BlueprintContextBudget,
  BlueprintExplainEvidence,
  BlueprintExplainNode,
  BlueprintId,
  BlueprintNode,
  BlueprintNodeKind,
  BlueprintNodeMode,
  EvidenceKind,
  EvidenceRequirement,
  MutationKind,
  RecipeExtensionKind,
  RiskFlag,
  StopRuleSeverity,
  TaskKind,
  WorkflowGitCapabilities,
  WorkflowMode,
} from "./model-core.js";

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
  taskIntent: {
    taskKind?: TaskKind;
    mutationScope?: MutationKind;
    riskFlags?: readonly RiskFlag[];
    blueprintRequest?: BlueprintId;
  };
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

export type BlueprintExplainRoute = readonly BlueprintExplainNode[];
