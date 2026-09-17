export type RunnerExecutionStateId =
  | "capture_artifact_exists"
  | "distill_card_exists"
  | "retrieval_index_updated"
  | "source_retired"
  | "policy_decision_recorded";

type RunnerPlaybookStepId =
  | "read_policy"
  | "read_source"
  | "write_capture"
  | "write_card"
  | "update_retrieval_index"
  | "retire_source"
  | "verify_result"
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

type RunnerOutcomeName =
  | "OUTCOME_OK"
  | "OUTCOME_DENIED_SECURITY"
  | "OUTCOME_NONE_CLARIFICATION"
  | "OUTCOME_NONE_UNSUPPORTED"
  | "OUTCOME_ERR_INTERNAL";

type RunnerExecutionOutcomeContract = {
  id: string;
  required_state: readonly RunnerExecutionStateId[];
  success_outcome: "OUTCOME_OK";
};

export type RunnerRuntimeCapabilityContract = {
  runtime_id: string;
  capabilities: Record<RunnerRuntimeCapabilityId, RunnerRuntimeCapabilityState>;
};

export type RunnerFinalVerifierCheck = {
  id: RunnerExecutionStateId;
  required: boolean;
  description: string;
};

type RunnerFinalVerifierContract = {
  mode: "pre_success_guard";
  blocks_success_when_missing: boolean;
  checks: readonly RunnerFinalVerifierCheck[];
};

export type RunnerTaskPlaybookContract = {
  id: string;
  version: 1;
  title: string;
  applies_to_outcome: string;
  match_signals: readonly string[];
  required_steps: readonly RunnerPlaybookStepId[];
  required_capabilities: readonly RunnerRuntimeCapabilityId[];
  allowed_outcomes: readonly RunnerOutcomeName[];
};

export type RunnerExecutionPlaybookContract = {
  schema_version: 1;
  artifact_kind: "agentplane.runner.execution_playbook_contract";
  selected_playbook?: RunnerTaskPlaybookContract;
  execution_outcome: RunnerExecutionOutcomeContract;
  runtime_capabilities: RunnerRuntimeCapabilityContract;
  final_verifier: RunnerFinalVerifierContract;
  match_reasons: readonly string[];
};

export type RunnerFinalVerifierState = Partial<Record<RunnerExecutionStateId, boolean>>;

export type RunnerFinalVerifierResult = {
  ok: boolean;
  missing: readonly RunnerExecutionStateId[];
  checked: readonly RunnerExecutionStateId[];
};
