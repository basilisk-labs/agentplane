import {
  advanceSupervisorExecutionEpisodeState,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import path from "node:path";

import type { CommandCtx } from "../../cli/spec/spec.js";
import { loadEvaluatorCatalog } from "../../evaluators/catalog.js";
import { CliError } from "../../shared/errors.js";
import { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import {
  projectExecutedTaskRunnerLifecycleResult,
  taskRunnerLifecycleExitCode,
  type TaskRunnerLifecycleResult,
} from "../../runner/usecases/task-run-lifecycle-result.js";
import { applyEvaluatorSgrReview } from "../evaluator/evaluator-review-apply.js";
import { executeEvaluatorSupervisorEpisode } from "../evaluator/evaluator-execute-supervisor.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { supervisePersistedWorkflowEpisode } from "../shared/supervisor-execution-episode.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { WorkflowSupervisorOperationResult } from "../shared/workflow-supervisor.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { cmdTaskStartReady } from "./start-ready.js";
import {
  closeDirectTask,
  type DirectTaskCloseoutStopCode,
} from "./direct-task-supervisor-closeout.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";
import { observeDirectExecutor } from "./direct-task-supervisor-observation.js";
import { DIRECT_TASK_SUPERVISION_GOLDEN_COST } from "./direct-task-supervision-benchmark.js";

const DIRECT_TASK_SUPERVISION_SCHEMA = "agentplane.direct_task_supervision.v1" as const;
const DEFAULT_EVALUATOR_ID = "recovery-context";

type DirectTaskSupervisorStopCode =
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

type DirectTaskSupervisorStop = {
  code: DirectTaskSupervisorStopCode;
  reason: string;
  route_step_id: string;
  operation_id: string | null;
};

type JournalProjection = {
  path: string;
  status: SupervisorExecutionEpisodeJournal["status"];
  cursor: SupervisorExecutionEpisodeJournal["cursor"];
  usage: SupervisorExecutionEpisodeJournal["usage"];
  stop: SupervisorExecutionEpisodeJournal["stop"];
  digest: SupervisorExecutionEpisodeJournal["digest"];
};

type DirectTaskSupervisorMetrics = {
  provider_episodes: number;
  executor_lifecycle_event_delta: number | null;
  declared_checks: number;
  golden_cost: typeof DIRECT_TASK_SUPERVISION_GOLDEN_COST;
};

export type DirectTaskSupervisorResult = {
  schema: typeof DIRECT_TASK_SUPERVISION_SCHEMA;
  task_id: string;
  workflow_mode: "direct";
  status: "finalized" | "stopped";
  phase: string;
  route: {
    step_id: string;
    code: string;
  };
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

export type DirectTaskSupervisorOptions = {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  include_remote: boolean;
  sandbox_override?: string;
  danger_authority?: {
    danger_full_access_authorized: true;
    provenance: "explicit_operator";
    source: string;
  } | null;
};

function journalProjection(
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

function routeCode(decision: TaskRouteDecision): string {
  return decision.workflowStep.compatibility.code;
}

function routeStop(decision: TaskRouteDecision): DirectTaskSupervisorStop {
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
  return {
    code,
    reason: step.summary,
    route_step_id: step.id,
    operation_id: operationId,
  };
}

function stoppedResult(opts: {
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

function directTaskSupervisorMetrics(
  opts: {
    provider_episodes?: number;
    executor_lifecycle_event_delta?: number | null;
    declared_checks?: number;
  } = {},
): DirectTaskSupervisorMetrics {
  return {
    provider_episodes: opts.provider_episodes ?? 0,
    executor_lifecycle_event_delta: opts.executor_lifecycle_event_delta ?? null,
    declared_checks: opts.declared_checks ?? 0,
    golden_cost: DIRECT_TASK_SUPERVISION_GOLDEN_COST,
  };
}

function assertedDirect(decision: TaskRouteDecision): void {
  if (decision.workflowMode !== "direct") {
    throw new CliError({
      code: "E_USAGE",
      message: "Direct task supervision is available only when workflow.mode=direct.",
    });
  }
}

function taskEventCount(
  task: Pick<Awaited<ReturnType<typeof loadTaskFromContext>>, "events">,
): number {
  return task.events?.length ?? 0;
}

async function executeDirectOperation(opts: {
  input: DirectTaskSupervisorOptions;
  operation: Parameters<
    NonNullable<Parameters<typeof supervisePersistedWorkflowEpisode>[0]["execute"]>
  >[0]["operation"];
}): Promise<WorkflowSupervisorOperationResult> {
  const { input, operation } = opts;
  if (operation.id === "task.start") {
    const started = await cmdTaskStartReady({
      ctx: input.command,
      cwd: input.ctx.cwd,
      rootOverride: input.ctx.rootOverride,
      taskId: operation.params.taskId,
      author: operation.params.author,
      body: operation.params.body,
      force: false,
      yes: false,
      quiet: true,
    });
    return {
      status: started === 0 ? "succeeded" : "failed",
      observed_postconditions: started === 0 ? ["task_status_doing"] : [],
      detail: `recorded direct task start for ${operation.params.taskId}`,
      exit_code: started,
    };
  }
  if (operation.id !== "runner.follow" || operation.params.mode !== "run") {
    return {
      status: "failed",
      observed_postconditions: [],
      detail: `Direct task supervisor has no in-process executor for ${operation.id}`,
      exit_code: 1,
    };
  }
  const executed = await executeTaskRunnerExecution({
    ctx: input.command,
    cwd: input.ctx.cwd,
    rootOverride: input.ctx.rootOverride ?? null,
    task_id: operation.params.taskId,
    ...(input.include_remote ? { include_remote: true } : {}),
    ...(input.danger_authority ? { danger_authority: input.danger_authority } : {}),
    ...(input.sandbox_override ? { sandbox_override: input.sandbox_override } : {}),
  });
  const lifecycle = projectExecutedTaskRunnerLifecycleResult({
    task_id: operation.params.taskId,
    execution: executed,
  });
  const exitCode = taskRunnerLifecycleExitCode(lifecycle);
  return {
    status: exitCode === 0 ? "succeeded" : "failed",
    observed_postconditions: ["runner_state_observed"],
    detail: executed.result.summary ?? `runner execution completed for ${operation.params.taskId}`,
    exit_code: exitCode,
    operation_result: { kind: "runner_lifecycle", value: lifecycle },
  };
}

/**
 * Own the direct golden path. The only semantic provider episodes are the
 * EXECUTOR runner and a read-only EVALUATOR; all lifecycle transitions and
 * route recomputation remain CLI-owned and durable in the supervisor journal.
 */
export async function superviseDirectTaskRun(
  input: DirectTaskSupervisorOptions,
): Promise<DirectTaskSupervisorResult> {
  const decision = async () =>
    await buildTaskRouteDecision({
      ctx: input.command,
      cwd: input.ctx.cwd,
      rootOverride: input.ctx.rootOverride ?? null,
      taskId: input.task_id,
      includeRemote: input.include_remote,
    });

  let current = await decision();
  assertedDirect(current);
  let journal: JournalProjection | null = null;
  let providerEpisodes = 0;
  let executorLifecycleEventDelta: number | null = null;
  let declaredChecks = 0;

  for (let operations = 0; operations < 2; operations += 1) {
    const step = current.workflowStep;
    if (step.kind !== "cli_operation")
      return stoppedResult({ decision: current, stop: routeStop(current), journal });
    const operation = step.operation;
    const supportsOperation =
      operation.id === "task.start" ||
      (operation.id === "runner.follow" && operation.params.mode === "run");
    if (!supportsOperation) {
      return stoppedResult({
        decision: current,
        journal,
        stop: {
          code: "unsupported_route_operation",
          reason: `Direct task supervisor does not execute ${operation.id} in the golden path.`,
          route_step_id: step.id,
          operation_id: operation.id,
        },
      });
    }
    const executionBaseCommit =
      operation.id === "runner.follow" ? await readDirectTaskHead(input.ctx.cwd) : null;
    const executorEventsBefore =
      operation.id === "runner.follow"
        ? taskEventCount(await loadTaskFromContext({ ctx: input.command, taskId: input.task_id }))
        : null;
    let persisted: Awaited<ReturnType<typeof supervisePersistedWorkflowEpisode>>;
    try {
      persisted = await supervisePersistedWorkflowEpisode({
        decision: current,
        git_root: input.command.resolvedProject.gitRoot,
        task_revision: null,
        execute: async ({ operation: invoked }) =>
          await executeDirectOperation({ input, operation: invoked }),
        refresh: decision,
      });
    } catch {
      return stoppedResult({
        decision: current,
        journal,
        stop: {
          code: operation.id === "runner.follow" ? "executor_adapter_crash" : "supervisor_stopped",
          reason:
            operation.id === "runner.follow"
              ? "The EXECUTOR adapter crashed after its durable operation intent was recorded."
              : "A formal CLI pre-operation failed after its durable operation intent was recorded.",
          route_step_id: step.id,
          operation_id: operation.id,
        },
      });
    }
    journal = journalProjection(persisted.journal, persisted.journal_path);
    const execution = persisted.execution;
    if (!execution.executable || execution.refreshed_decision === null) {
      return stoppedResult({
        decision: current,
        journal,
        stop: {
          code:
            execution.refreshed_decision === null
              ? "route_refresh_failed"
              : "unsupported_route_operation",
          reason:
            execution.stop_reason ?? "Direct task supervisor could not execute the current route.",
          route_step_id: step.id,
          operation_id: operation.id,
        },
      });
    }
    current = execution.refreshed_decision;
    if (persisted.journal.status === "stopped") {
      return stoppedResult({
        decision: current,
        journal,
        stop: {
          code: "supervisor_stopped",
          reason: `Supervisor journal stopped: ${persisted.journal.stop?.reason ?? "unknown"}.`,
          route_step_id: current.workflowStep.id,
          operation_id: operation.id,
        },
      });
    }
    if (operation.id === "task.start") continue;

    const lifecycle =
      execution.result?.operation_result?.kind === "runner_lifecycle"
        ? execution.result.operation_result.value
        : null;
    if (!lifecycle) {
      return stoppedResult({
        decision: current,
        journal,
        stop: {
          code: "runner_failed",
          reason: "Runner execution returned no typed lifecycle receipt.",
          route_step_id: current.workflowStep.id,
          operation_id: operation.id,
        },
      });
    }
    const observed = observeDirectExecutor(lifecycle);
    if ("stop" in observed) {
      return stoppedResult({
        decision: current,
        journal,
        stop: {
          code: observed.stop,
          reason: observed.reason,
          route_step_id: current.workflowStep.id,
          operation_id: operation.id,
        },
      });
    }

    providerEpisodes += 1;
    const task = await loadTaskFromContext({ ctx: input.command, taskId: input.task_id });
    executorLifecycleEventDelta =
      taskEventCount(task) - (executorEventsBefore ?? taskEventCount(task));
    if (executorLifecycleEventDelta !== 0) {
      return stoppedResult({
        decision: current,
        journal,
        executor: observed.executor,
        metrics: directTaskSupervisorMetrics({
          provider_episodes: providerEpisodes,
          executor_lifecycle_event_delta: executorLifecycleEventDelta,
          declared_checks: declaredChecks,
        }),
        stop: {
          code: "executor_lifecycle_mutation",
          reason:
            "The EXECUTOR changed persisted task lifecycle events; direct lifecycle ownership belongs to the CLI.",
          route_step_id: current.workflowStep.id,
          operation_id: operation.id,
        },
      });
    }

    const evaluators = await loadEvaluatorCatalog({
      projectRoot: input.command.resolvedProject.gitRoot,
      includeBuiltin: true,
    });
    const evaluator = evaluators.find((entry) => entry.id === DEFAULT_EVALUATOR_ID);
    if (!evaluator) {
      throw new CliError({
        code: "E_RUNTIME",
        message: `Direct task supervision requires evaluator ${DEFAULT_EVALUATOR_ID}.`,
      });
    }
    let evaluatorExecution: Awaited<ReturnType<typeof executeEvaluatorSupervisorEpisode>>;
    try {
      evaluatorExecution = await executeEvaluatorSupervisorEpisode({
        ctx: input.ctx,
        command: input.command,
        task,
        evaluator,
        task_id: input.task_id,
        replacement: false,
      });
    } catch {
      return stoppedResult({
        decision: current,
        journal,
        executor: observed.executor,
        stop: {
          code: "evaluator_adapter_crash",
          reason: "The read-only EVALUATOR adapter crashed before a typed verdict was applied.",
          route_step_id: current.workflowStep.id,
          operation_id: "runner.follow",
        },
      });
    }
    const currentTask = await loadTaskFromContext({ ctx: input.command, taskId: input.task_id });
    const resultRef = path.relative(
      input.command.resolvedProject.gitRoot,
      evaluatorExecution.result_path,
    );
    const alreadyApplied = currentTask.quality_review?.evidence_refs?.includes(resultRef) ?? false;
    const applied = alreadyApplied
      ? {
          report_path: path.relative(
            input.command.resolvedProject.gitRoot,
            evaluatorExecution.report_path,
          ),
          result_path: resultRef,
        }
      : await applyEvaluatorSgrReview({
          ctx: input.command,
          task: currentTask,
          workOrderPath: evaluatorExecution.work_order_path,
          result: evaluatorExecution.result,
        });
    current = await decision();
    let evaluatorJournal = advanceSupervisorExecutionEpisodeState({
      journal: evaluatorExecution.journal,
      state_fingerprint_digest: current.workflowStep.preconditionFingerprint.digest,
      route_observation: { step_id: current.workflowStep.id },
    });
    await evaluatorExecution.store.write(evaluatorJournal);
    journal = journalProjection(evaluatorJournal, evaluatorExecution.store.path);
    const evaluatorResult = {
      evaluator_id: evaluatorExecution.result.evaluator_id,
      verdict: evaluatorExecution.result.verdict,
      result_path: applied.result_path,
      report_path: applied.report_path,
      receipt_path: path.relative(
        input.command.resolvedProject.gitRoot,
        path.join(path.dirname(evaluatorExecution.result_path), "evaluator-episode.json"),
      ),
    } as const;
    providerEpisodes += 1;
    if (evaluatorExecution.result.verdict !== "pass") {
      const code: DirectTaskSupervisorStopCode =
        evaluatorExecution.result.verdict === "rework"
          ? "evaluator_rework"
          : evaluatorExecution.result.verdict === "human_review"
            ? "evaluator_human_review"
            : "evaluator_blocked";
      return stoppedResult({
        decision: current,
        journal,
        executor: observed.executor,
        evaluator: evaluatorResult,
        metrics: directTaskSupervisorMetrics({
          provider_episodes: providerEpisodes,
          executor_lifecycle_event_delta: executorLifecycleEventDelta,
          declared_checks: declaredChecks,
        }),
        stop: {
          code,
          reason: `EVALUATOR returned ${evaluatorExecution.result.verdict}.`,
          route_step_id: current.workflowStep.id,
          operation_id: "runner.follow",
        },
      });
    }

    const closeout = await closeDirectTask({
      ctx: input.ctx,
      command: input.command,
      task_id: input.task_id,
      task,
      evaluator: evaluatorResult,
      decision,
      execution_base_commit: executionBaseCommit,
      allowed_paths: lifecycle.lifecycle?.work_order_authority?.writable_roots ?? [],
      journal: { journal: evaluatorJournal, journal_path: evaluatorExecution.store.path },
    });
    declaredChecks = closeout.declared_checks;
    journal = journalProjection(closeout.journal, closeout.journal_path);
    if (closeout.status === "stopped") {
      return stoppedResult({
        decision: closeout.decision,
        journal,
        executor: observed.executor,
        evaluator: evaluatorResult,
        metrics: directTaskSupervisorMetrics({
          provider_episodes: providerEpisodes,
          executor_lifecycle_event_delta: executorLifecycleEventDelta,
          declared_checks: declaredChecks,
        }),
        stop: closeout.stop,
      });
    }
    return {
      schema: DIRECT_TASK_SUPERVISION_SCHEMA,
      task_id: input.task_id,
      workflow_mode: "direct",
      status: "finalized",
      phase: "finalized",
      route: { step_id: closeout.decision.workflowStep.id, code: routeCode(closeout.decision) },
      stop: null,
      executor: observed.executor,
      evaluator: evaluatorResult,
      journal,
      metrics: directTaskSupervisorMetrics({
        provider_episodes: providerEpisodes,
        executor_lifecycle_event_delta: executorLifecycleEventDelta,
        declared_checks: declaredChecks,
      }),
    };
  }
  return stoppedResult({
    decision: current,
    journal,
    stop: {
      code: "unsupported_route_operation",
      reason: "Direct task supervision exceeded its bounded formal pre-operation sequence.",
      route_step_id: current.workflowStep.id,
      operation_id:
        current.workflowStep.kind === "cli_operation" ? current.workflowStep.operation.id : null,
    },
  });
}
