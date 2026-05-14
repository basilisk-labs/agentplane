import type { RunnerContextBundle } from "./types/context.js";
import type {
  RunnerExecutionBlueprintStateId,
  RunnerExecutionPlaybookContract,
  RunnerFinalVerifierCheck,
  RunnerFinalVerifierResult,
  RunnerFinalVerifierState,
  RunnerRuntimeCapabilityContract,
  RunnerRuntimeCapabilityId,
  RunnerRuntimeCapabilityState,
  RunnerTaskPlaybookContract,
} from "./types/playbooks.js";

const CAPABILITY_IDS: readonly RunnerRuntimeCapabilityId[] = [
  "file.read",
  "file.write",
  "file.delete",
  "file.move",
  "file.search",
  "process.exec",
  "result.manifest.write",
];

const KNOWLEDGE_CAPTURE_PLAYBOOK: RunnerTaskPlaybookContract = {
  id: "knowledge_capture_pipeline",
  version: 1,
  title: "Knowledge capture pipeline",
  applies_to_blueprint: "knowledge_capture_result",
  match_signals: ["inbox", "capture", "distill", "thread", "knowledge"],
  required_steps: [
    "read_policy",
    "read_source",
    "write_capture",
    "write_card",
    "update_retrieval_index",
    "retire_source",
    "verify_blueprint",
  ],
  required_capabilities: ["file.read", "file.write", "file.delete", "file.search"],
  allowed_outcomes: ["OUTCOME_OK", "OUTCOME_NONE_CLARIFICATION", "OUTCOME_NONE_UNSUPPORTED"],
};

const BUILTIN_RUNNER_PLAYBOOKS: readonly RunnerTaskPlaybookContract[] = [
  KNOWLEDGE_CAPTURE_PLAYBOOK,
];

function textFromBundle(bundle: RunnerContextBundle): string {
  return [
    bundle.task?.data.title,
    bundle.task?.data.description,
    ...(bundle.task?.data.tags ?? []),
    bundle.task?.data.blueprint_request,
    bundle.blueprint?.blueprintId,
    bundle.recipe?.scenario_id,
    bundle.recipe?.recipe_name,
  ]
    .filter((item): item is string => typeof item === "string" && item.length > 0)
    .join("\n")
    .toLowerCase();
}

function playbookMatchReasons(opts: {
  bundle: RunnerContextBundle;
  playbook: RunnerTaskPlaybookContract;
}): string[] {
  const haystack = textFromBundle(opts.bundle);
  return opts.playbook.match_signals
    .filter((signal) => haystack.includes(signal))
    .map((signal) => `matched signal ${JSON.stringify(signal)}`);
}

export function resolveRunnerTaskPlaybook(bundle: RunnerContextBundle): {
  playbook?: RunnerTaskPlaybookContract;
  match_reasons: readonly string[];
} {
  const scored = BUILTIN_RUNNER_PLAYBOOKS.map((playbook) => ({
    playbook,
    reasons: playbookMatchReasons({ bundle, playbook }),
  })).filter((item) => item.reasons.length > 0);
  scored.sort((left, right) => right.reasons.length - left.reasons.length);
  const winner = scored[0];
  if (!winner) return { match_reasons: [] };
  return { playbook: winner.playbook, match_reasons: winner.reasons };
}

function capabilityStateForAdapterField(opts: {
  bundle: RunnerContextBundle;
  id: RunnerRuntimeCapabilityId;
}): RunnerRuntimeCapabilityState {
  if (opts.id === "result.manifest.write") return "available";
  const adapterId = opts.bundle.execution.adapter_id;
  if (adapterId === "codex") return "unknown";
  return "unknown";
}

function resolveRunnerRuntimeCapabilityContract(
  bundle: RunnerContextBundle,
): RunnerRuntimeCapabilityContract {
  const capabilities = Object.fromEntries(
    CAPABILITY_IDS.map((id) => [id, capabilityStateForAdapterField({ bundle, id })]),
  ) as Record<RunnerRuntimeCapabilityId, RunnerRuntimeCapabilityState>;
  return {
    runtime_id: bundle.execution.adapter_id,
    capabilities,
  };
}

function checksForRequiredState(
  requiredState: readonly RunnerExecutionBlueprintStateId[],
): RunnerFinalVerifierCheck[] {
  return requiredState.map((id) => ({
    id,
    required: true,
    description: `Required execution blueprint state ${id} must be observed before success.`,
  }));
}

export function buildRunnerExecutionPlaybookContract(
  bundle: RunnerContextBundle,
): RunnerExecutionPlaybookContract {
  const selected = resolveRunnerTaskPlaybook(bundle);
  const requiredState: readonly RunnerExecutionBlueprintStateId[] = selected.playbook
    ? [
        "capture_artifact_exists",
        "distill_card_exists",
        "retrieval_index_updated",
        "source_retired",
      ]
    : ["policy_decision_recorded"];
  return {
    schema_version: 1,
    artifact_kind: "agentplane.runner.execution_playbook_contract",
    ...(selected.playbook ? { selected_playbook: selected.playbook } : {}),
    execution_blueprint: {
      id: selected.playbook?.applies_to_blueprint ?? "generic_runner_execution_result",
      ...(bundle.blueprint?.blueprintId
        ? { source_blueprint_id: bundle.blueprint.blueprintId }
        : {}),
      required_state: requiredState,
      success_outcome: "OUTCOME_OK",
    },
    runtime_capabilities: resolveRunnerRuntimeCapabilityContract(bundle),
    final_verifier: {
      mode: "pre_success_guard",
      blocks_success_when_missing: true,
      checks: checksForRequiredState(requiredState),
    },
    match_reasons: selected.match_reasons,
  };
}

export function verifyRunnerFinalState(opts: {
  contract: RunnerExecutionPlaybookContract;
  state: RunnerFinalVerifierState;
}): RunnerFinalVerifierResult {
  const checked = opts.contract.final_verifier.checks
    .filter((check) => check.required)
    .map((check) => check.id);
  const missing = checked.filter((id) => opts.state[id] !== true);
  return {
    ok: missing.length === 0,
    missing,
    checked,
  };
}
