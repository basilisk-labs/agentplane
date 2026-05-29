import type { BlueprintRouteDecisionSgrResult } from "../runtime/sgr/index.js";
import type {
  BlueprintExplainEvidence,
  BlueprintId,
  WorkflowGitCapabilities,
  WorkflowMode,
} from "./model-core.js";
import type {
  AcceptedRecipeExtension,
  BlueprintExplainRoute,
  BlueprintPlanArtifact,
  RejectedRecipeExtension,
  SkippedNode,
  StopReason,
} from "./model-resolution.js";

export type BlueprintExplainOutput = {
  blueprintId: BlueprintId;
  blueprintVersion: 1;
  title: string;
  workflowMode?: WorkflowMode;
  workflowGitCapabilities?: WorkflowGitCapabilities;
  route: BlueprintExplainRoute;
  skippedNodes: readonly SkippedNode[];
  requiredEvidence: readonly BlueprintExplainEvidence[];
  plan: BlueprintPlanArtifact;
  selectionReasons: readonly string[];
  acceptedRecipeExtensions: readonly AcceptedRecipeExtension[];
  rejectedRecipeExtensions: readonly RejectedRecipeExtension[];
  stopReasons: readonly StopReason[];
  sgrDecision: BlueprintRouteDecisionSgrResult;
};
