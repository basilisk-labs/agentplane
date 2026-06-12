import type { RunnerPolicyRefusal, RunnerRunState, RunnerTarget } from "./types.js";

export type CodexSmokeOutcome = "success" | "timeout" | "policy_refusal" | "runner_failure";

export type CodexSmokeClassification = {
  outcome: CodexSmokeOutcome;
  status: RunnerRunState["status"];
  summary: string;
  timeout_reason?: string | null;
  refusal_reason?: RunnerPolicyRefusal | null;
};

function describeTarget(target: RunnerTarget): string {
  if (target.kind === "task") return `task ${target.task_id}`;
  if (target.kind === "loop_step") {
    return `loop step ${target.loop_id}/${target.step_id} for task ${target.task_id}`;
  }
  return `scenario ${target.recipe_id}:${target.scenario_id}`;
}

export function classifyCodexSmokeRun(state: RunnerRunState): CodexSmokeClassification {
  const timeoutReason = state.result?.timeout_reason ?? state.supervision?.timeout_reason ?? null;
  const refusalReason = state.policy_decision?.refusal_reason ?? null;
  const target = describeTarget(state.target);

  if (state.status === "success") {
    return {
      outcome: "success",
      status: state.status,
      summary: `Runner smoke completed successfully for ${target}.`,
      timeout_reason: timeoutReason,
      refusal_reason: refusalReason,
    };
  }

  if (timeoutReason) {
    return {
      outcome: "timeout",
      status: state.status,
      summary: `Runner smoke timed out (${timeoutReason}) for ${target}.`,
      timeout_reason: timeoutReason,
      refusal_reason: refusalReason,
    };
  }

  if (refusalReason) {
    return {
      outcome: "policy_refusal",
      status: state.status,
      summary:
        `Runner smoke was refused by policy for ${target}` +
        (refusalReason.policy_field ? ` (field=${refusalReason.policy_field}).` : "."),
      timeout_reason: timeoutReason,
      refusal_reason: refusalReason,
    };
  }

  return {
    outcome: "runner_failure",
    status: state.status,
    summary: `Runner smoke failed for ${target}.`,
    timeout_reason: timeoutReason,
    refusal_reason: refusalReason,
  };
}
