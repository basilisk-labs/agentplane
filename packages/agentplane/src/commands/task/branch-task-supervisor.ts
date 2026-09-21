import type { CommandCtx } from "../../cli/spec/spec.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type { TaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { JournalProjection } from "./direct-task-supervisor-result.js";

export type BranchTaskSupervisorStopCode =
  | "approval_required"
  | "semantic_input_required"
  | "human_input_required"
  | "wait_required"
  | "terminal_attention"
  | "step_budget_exhausted"
  | "unsupported_agent_episode"
  | "operation_failed"
  | "route_refresh_failed"
  | "supervisor_stopped"
  | "executor_adapter_crash"
  | "runner_failed"
  | "runner_receipt_unobserved"
  | "executor_result_missing"
  | "executor_blocked"
  | "missing_knowledge"
  | "executor_semantic_failed"
  | "executor_lifecycle_mutation"
  | "implementation_scope_violation"
  | "implementation_commit_missing"
  | "verification_failed"
  | "evaluator_rework"
  | "evaluator_human_review"
  | "evaluator_blocked"
  | "evaluator_adapter_crash";

type BranchTaskSupervisorStop = {
  code: BranchTaskSupervisorStopCode;
  reason: string;
  route_step_id: string;
  operation_id: string | null;
};

export type BranchExecutorEvidence = {
  run_id: string;
  receipt: NonNullable<NonNullable<TaskRunnerLifecycleResult["result"]>["execution_receipt"]>;
  semantic_status: "completed";
  implementation_commit: string;
};

export type BranchEvaluatorEvidence = {
  evaluator_id: string;
  verdict: "pass" | "rework" | "blocked" | "human_review";
  result_path: string;
  report_path: string;
  receipt_path: string;
};

export type BranchEpisodeOutcome =
  | {
      status: "completed";
      decision: TaskRouteDecision;
      executor?: BranchExecutorEvidence;
      evaluator?: BranchEvaluatorEvidence;
      journal: JournalProjection | null;
      provider_episodes: number;
      lifecycle_calls: number;
      executor_lifecycle_event_delta?: number | null;
    }
  | {
      status: "stopped";
      decision: TaskRouteDecision;
      stop: BranchTaskSupervisorStop;
      executor?: BranchExecutorEvidence;
      evaluator?: BranchEvaluatorEvidence;
      journal: JournalProjection | null;
      provider_episodes: number;
      lifecycle_calls: number;
      executor_lifecycle_event_delta?: number | null;
    };

export type BranchTaskSupervisorOptions = {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  task_execution?: TaskExecutionContext;
  sandbox_override?: string;
  danger_authority?: {
    danger_full_access_authorized: true;
    provenance: "explicit_operator";
    source: string;
  } | null;
};
