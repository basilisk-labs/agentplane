import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { TaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { DirectTaskCloseoutStopCode } from "./direct-task-supervisor-closeout.js";
import {
  directTaskSupervisorMetrics,
  type DirectTaskSupervisorMetrics,
} from "./direct-task-supervision-measurement.js";

export const DIRECT_TASK_SUPERVISION_SCHEMA = "agentplane.direct_task_supervision.v1" as const;

export type DirectTaskSupervisorStopCode =
  | "approval_required"
  | "human_input_required"
  | "wait_required"
  | "terminal_route"
  | "unsupported_route_operation"
  | "route_refresh_failed"
  | "supervisor_stopped"
  | "executor_adapter_crash"
  | "runner_failed"
  | "runner_receipt_unobserved"
  | "executor_result_missing"
  | "executor_blocked"
  | "missing_knowledge"
  | "executor_semantic_failed"
  | "evaluator_rework"
  | "evaluator_human_review"
  | "evaluator_blocked"
  | "evaluator_adapter_crash"
  | "executor_lifecycle_mutation"
  | DirectTaskCloseoutStopCode;

export type DirectTaskSupervisorStop = {
  code: DirectTaskSupervisorStopCode;
  reason: string;
  route_step_id: string;
  operation_id: string | null;
};

export type JournalProjection = {
  path: string;
  status: SupervisorExecutionEpisodeJournal["status"];
  cursor: SupervisorExecutionEpisodeJournal["cursor"];
  usage: SupervisorExecutionEpisodeJournal["usage"];
  stop: SupervisorExecutionEpisodeJournal["stop"];
  digest: SupervisorExecutionEpisodeJournal["digest"];
};

export type DirectTaskSupervisorResult = {
  schema: typeof DIRECT_TASK_SUPERVISION_SCHEMA;
  task_id: string;
  workflow_mode: "direct";
  status: "finalized" | "stopped";
  phase: string;
  route: { step_id: string; code: string };
  stop: DirectTaskSupervisorStop | null;
  executor: {
    run_id: string;
    receipt: NonNullable<NonNullable<TaskRunnerLifecycleResult["result"]>["execution_receipt"]>;
    semantic_status: "completed";
  } | null;
  evaluator: {
    evaluator_id: string;
    verdict: "pass" | "rework" | "blocked" | "human_review";
    result_path: string;
    report_path: string;
    receipt_path: string;
  } | null;
  journal: JournalProjection | null;
  metrics: DirectTaskSupervisorMetrics;
};

export function journalProjection(
  journal: SupervisorExecutionEpisodeJournal,
  pathValue: string,
): JournalProjection {
  return {
    path: pathValue,
    status: journal.status,
    cursor: journal.cursor,
    usage: journal.usage,
    stop: journal.stop,
    digest: journal.digest,
  };
}

export function routeCode(decision: TaskRouteDecision): string {
  return decision.workflowStep.compatibility.code;
}

export function routeStop(decision: TaskRouteDecision): DirectTaskSupervisorStop {
  const step = decision.workflowStep;
  const operationId = step.kind === "cli_operation" ? step.operation.id : null;
  const code: DirectTaskSupervisorStopCode =
    step.kind === "approval"
      ? "approval_required"
      : step.kind === "human_input"
        ? "human_input_required"
        : step.kind === "wait"
          ? "wait_required"
          : step.kind === "terminal"
            ? "terminal_route"
            : "unsupported_route_operation";
  return { code, reason: step.summary, route_step_id: step.id, operation_id: operationId };
}

export function stoppedResult(opts: {
  decision: TaskRouteDecision;
  stop: DirectTaskSupervisorStop;
  journal?: JournalProjection | null;
  executor?: DirectTaskSupervisorResult["executor"];
  evaluator?: DirectTaskSupervisorResult["evaluator"];
  metrics?: DirectTaskSupervisorMetrics;
}): DirectTaskSupervisorResult {
  return {
    schema: DIRECT_TASK_SUPERVISION_SCHEMA,
    task_id: opts.decision.task.id,
    workflow_mode: "direct",
    status: "stopped",
    phase: opts.decision.workflowStep.phase,
    route: { step_id: opts.decision.workflowStep.id, code: routeCode(opts.decision) },
    stop: opts.stop,
    executor: opts.executor ?? null,
    evaluator: opts.evaluator ?? null,
    journal: opts.journal ?? null,
    metrics: opts.metrics ?? directTaskSupervisorMetrics(),
  };
}

export function assertedDirect(decision: TaskRouteDecision): void {
  if (decision.workflowMode !== "direct") {
    throw new CliError({
      code: "E_USAGE",
      message: "Direct task supervision is available only when workflow.mode=direct.",
    });
  }
}
