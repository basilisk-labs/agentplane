import type { BlueprintId } from "../../blueprints/model.js";

export type RunnerExecutionBlueprintStateId =
  | "capture_artifact_exists"
  | "distill_card_exists"
  | "retrieval_index_updated"
  | "source_retired"
  | "policy_decision_recorded";

export type RunnerPlaybookStepId =
  | "read_policy"
  | "read_source"
  | "write_capture"
  | "write_card"
  | "update_retrieval_index"
  | "retire_source"
  | "verify_blueprint"
  | "classify_blocker";

export type RunnerRuntimeCapabilityId =
  | "file.read"
  | "file.write"
  | "file.delete"
  | "file.move"
  | "file.search"
  | "process.exec"
  | "result.manifest.write";

export type RunnerRuntimeCapabilityState = "available" | "unavailable" | "unknown";

export type RunnerOutcomeName =
  | "OUTCOME_OK"
  | "OUTCOME_DENIED_SECURITY"
  | "OUTCOME_NONE_CLARIFICATION"
  | "OUTCOME_NONE_UNSUPPORTED"
  | "OUTCOME_ERR_INTERNAL";

export type RunnerExecutionBlueprintContract = {
  id: string;
  source_blueprint_id?: BlueprintId;
  required_state: readonly RunnerExecutionBlueprintStateId[];
  success_outcome: "OUTCOME_OK";
};

export type RunnerRuntimeCapabilityContract = {
  runtime_id: string;
  capabilities: Record<RunnerRuntimeCapabilityId, RunnerRuntimeCapabilityState>;
};

export type RunnerFinalVerifierCheck = {
  id: RunnerExecutionBlueprintStateId;
  required: boolean;
  description: string;
};

export type RunnerFinalVerifierContract = {
  mode: "pre_success_guard";
  blocks_success_when_missing: boolean;
  checks: readonly RunnerFinalVerifierCheck[];
};

export type RunnerTaskPlaybookContract = {
  id: string;
  version: 1;
  title: string;
  applies_to_blueprint: string;
  match_signals: readonly string[];
  required_steps: readonly RunnerPlaybookStepId[];
  required_capabilities: readonly RunnerRuntimeCapabilityId[];
  allowed_outcomes: readonly RunnerOutcomeName[];
};

export type RunnerExecutionPlaybookContract = {
  schema_version: 1;
  artifact_kind: "agentplane.runner.execution_playbook_contract";
  selected_playbook?: RunnerTaskPlaybookContract;
  execution_blueprint: RunnerExecutionBlueprintContract;
  runtime_capabilities: RunnerRuntimeCapabilityContract;
  final_verifier: RunnerFinalVerifierContract;
  match_reasons: readonly string[];
};

export type RunnerFinalVerifierState = Partial<Record<RunnerExecutionBlueprintStateId, boolean>>;

export type RunnerFinalVerifierResult = {
  ok: boolean;
  missing: readonly RunnerExecutionBlueprintStateId[];
  checked: readonly RunnerExecutionBlueprintStateId[];
};
