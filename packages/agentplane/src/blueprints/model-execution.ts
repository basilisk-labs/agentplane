import type {
  BlueprintId,
  BlueprintNodeKind,
  BlueprintNodeMode,
  BlueprintSnapshotDigest,
  EvidenceKind,
} from "./model-core.js";
import type { AcceptedRecipeExtension, StopReason } from "./model-resolution.js";

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
