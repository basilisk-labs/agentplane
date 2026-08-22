import {
  dispositionForOutcome,
  type OutcomeDisposition,
  type SupervisionOutcome,
} from "@agentplaneorg/core/tasks";

import type {
  BranchTaskSupervisorStopCode,
  BranchTaskSupervisorResult,
} from "./branch-task-supervisor.js";
import type {
  DirectTaskSupervisorResult,
  DirectTaskSupervisorStopCode,
} from "./direct-task-supervisor-result.js";

function assertNever(value: never): never {
  throw new Error(`Unknown task supervision stop code: ${String(value)}`);
}

export function directStopOutcome(code: DirectTaskSupervisorStopCode): SupervisionOutcome {
  switch (code) {
    case "approval_required": {
      return "awaiting_plan_approval";
    }
    case "semantic_input_required":
    case "evaluator_rework":
    case "evaluator_blocked": {
      return "external_wait";
    }
    case "human_input_required":
    case "evaluator_human_review": {
      return "human_required";
    }
    case "wait_required": {
      return "external_wait";
    }
    case "terminal_route":
    case "unsupported_route_operation":
    case "supervisor_stopped":
    case "executor_blocked":
    case "missing_knowledge":
    case "verification_check_unsupported": {
      return "blocked";
    }
    case "stale_route":
    case "route_refresh_failed": {
      return "stale_state";
    }
    case "executor_adapter_crash":
    case "runner_failed":
    case "runner_receipt_unobserved":
    case "executor_result_missing":
    case "executor_semantic_failed":
    case "evaluator_adapter_crash":
    case "executor_lifecycle_mutation":
    case "execution_contract_escalated":
    case "verification_check_failed":
    case "implementation_scope_violation":
    case "implementation_commit_missing":
    case "finish_failed": {
      return "failed";
    }
    default: {
      return assertNever(code);
    }
  }
}

export function branchStopOutcome(code: BranchTaskSupervisorStopCode): SupervisionOutcome {
  switch (code) {
    case "approval_required": {
      return "awaiting_plan_approval";
    }
    case "semantic_input_required":
    case "evaluator_rework":
    case "evaluator_blocked": {
      return "external_wait";
    }
    case "human_input_required":
    case "evaluator_human_review": {
      return "human_required";
    }
    case "wait_required": {
      return "external_wait";
    }
    case "terminal_attention":
    case "step_budget_exhausted":
    case "unsupported_agent_episode":
    case "supervisor_stopped":
    case "executor_blocked":
    case "missing_knowledge": {
      return "blocked";
    }
    case "route_refresh_failed": {
      return "stale_state";
    }
    case "operation_failed":
    case "executor_adapter_crash":
    case "runner_failed":
    case "runner_receipt_unobserved":
    case "executor_result_missing":
    case "executor_semantic_failed":
    case "executor_lifecycle_mutation":
    case "implementation_scope_violation":
    case "implementation_commit_missing":
    case "verification_failed":
    case "evaluator_adapter_crash": {
      return "failed";
    }
    default: {
      return assertNever(code);
    }
  }
}

export function directTaskSupervisionDisposition(
  result: Pick<DirectTaskSupervisorResult, "status" | "stop">,
): OutcomeDisposition {
  if (result.status === "finalized") return dispositionForOutcome("completed");
  if (!result.stop) return dispositionForOutcome("failed");
  return dispositionForOutcome(directStopOutcome(result.stop.code));
}

export function branchTaskSupervisionDisposition(
  result: Pick<BranchTaskSupervisorResult, "status" | "stop">,
): OutcomeDisposition {
  if (result.status === "finalized") return dispositionForOutcome("completed");
  if (!result.stop) return dispositionForOutcome("failed");
  return dispositionForOutcome(branchStopOutcome(result.stop.code));
}
