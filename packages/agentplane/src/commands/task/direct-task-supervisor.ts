import {
  advanceSupervisorExecutionEpisodeState,
  stopSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import type { CommandCtx } from "../../cli/spec/spec.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { CliError } from "../../shared/errors.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { supervisePersistedWorkflowEpisode } from "../shared/supervisor-execution-episode.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { finalizeDirectTask, verifyDirectTask } from "./direct-task-supervisor-closeout.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { runAndApplyDirectTaskEvaluator } from "./direct-task-supervisor-evaluator.js";
import { prepareDirectImplementationEvidence } from "./direct-task-supervisor-implementation.js";
import { observeDirectExecutor } from "./direct-task-supervisor-observation.js";
import {
  assertedDirect,
  DIRECT_TASK_SUPERVISION_SCHEMA,
  journalProjection,
  routeCode,
  routeStop,
  stoppedResult,
  type DirectTaskSupervisorResult,
  type DirectTaskSupervisorStopCode,
  type JournalProjection,
} from "./direct-task-supervisor-result.js";
import {
  directTaskSupervisorMetrics,
  measureDuplicateExecutorContextBytes,
} from "./direct-task-supervision-measurement.js";
import { recordDirectTaskSupervisionGoldenMetrics } from "./direct-task-supervision-golden-metrics.js";
import {
  observedExternalEffectsFromRunnerResult,
  recordObservedTaskExecutionContract,
} from "./task-execution-contract-observation.js";
import {
  executeDirectOperation,
  type RetainedDirectWorkspace,
} from "./direct-task-supervisor-operation.js";

export type { DirectTaskSupervisorResult } from "./direct-task-supervisor-result.js";

const DEFAULT_EVALUATOR_ID = "recovery-context";

export type DirectTaskSupervisorOptions = {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  include_remote: boolean;
  task_execution?: TaskExecutionContext;
  sandbox_override?: string;
  danger_authority?: {
    danger_full_access_authorized: true;
    provenance: "explicit_operator";
    source: string;
  } | null;
};

function taskEventCount(
  task: Pick<Awaited<ReturnType<typeof loadTaskFromContext>>, "events">,
): number {
  return task.events?.length ?? 0;
}

function evaluatorAdapterFailureClass(error: unknown): string {
  if (error instanceof CliError) return error.code;
  if (error instanceof Error) return error.name;
  return "unknown_error";
}

/**
 * Own the direct golden path. The only semantic provider episodes are the
 * EXECUTOR runner and a read-only EVALUATOR; all lifecycle transitions and
 * route recomputation remain CLI-owned and durable in the supervisor journal.
 */
export async function superviseDirectTaskRun(
  input: DirectTaskSupervisorOptions,
): Promise<DirectTaskSupervisorResult> {
  const retainedWorkspace: { current: RetainedDirectWorkspace | null } = { current: null };
  try {
    return await superviseDirectTaskRunWithWorkspace(input, retainedWorkspace);
  } finally {
    await retainedWorkspace.current?.release();
  }
}

async function superviseDirectTaskRunWithWorkspace(
  input: DirectTaskSupervisorOptions,
  retainedWorkspace: { current: RetainedDirectWorkspace | null },
): Promise<DirectTaskSupervisorResult> {
  let activeCtx = input.ctx;
  let activeCommand = input.command;
  const decision = async () =>
    await buildTaskRouteDecision({
      ctx: activeCommand,
      cwd: activeCtx.cwd,
      rootOverride: activeCtx.rootOverride ?? null,
      taskId: input.task_id,
      includeRemote: input.include_remote,
    });

  let current = await decision();
  assertedDirect(current);
  let journal: JournalProjection | null = null;
  let providerEpisodes = 0;
  let executorLifecycleEventDelta: number | null = null;
  let declaredChecks = 0;
  let lifecycleCalls = 0;
  let toolCalls = 0;
  let duplicateExecutorContextBytes: number | null = null;

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
    let executionBaseCommit: string | null = null;
    let executionBaselineStatus: Awaited<ReturnType<typeof readDirectRepositoryStatus>> = null;
    let executorEventsBefore: number | null = null;
    let persisted: Awaited<ReturnType<typeof supervisePersistedWorkflowEpisode>>;
    try {
      persisted = await supervisePersistedWorkflowEpisode({
        decision: current,
        git_root: input.command.resolvedProject.gitRoot,
        task_revision: null,
        execute: async ({ operation: invoked }) =>
          await executeDirectOperation({
            input,
            operation: invoked,
            retainWorkspace: (workspace) => {
              if (retainedWorkspace.current) {
                throw new Error("Direct task supervisor already retains a task workspace.");
              }
              retainedWorkspace.current = workspace;
              activeCtx = workspace.ctx;
              activeCommand = workspace.command;
              executionBaseCommit = workspace.execution_base_commit;
              executionBaselineStatus = workspace.execution_baseline_status;
              executorEventsBefore = workspace.executor_events_before;
            },
          }),
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
    lifecycleCalls += 1;
    toolCalls += 1;
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
    providerEpisodes += 1;
    duplicateExecutorContextBytes =
      typeof lifecycle.invocation.bundle_path === "string"
        ? await measureDuplicateExecutorContextBytes(lifecycle.invocation.bundle_path)
        : null;
    const observed = observeDirectExecutor(lifecycle, {
      allow_unverified_receipt: input.danger_authority?.danger_full_access_authorized === true,
    });
    if ("stop" in observed) {
      return stoppedResult({
        decision: current,
        journal,
        metrics: directTaskSupervisorMetrics({
          provider_episodes: providerEpisodes,
          executor_lifecycle_event_delta: executorLifecycleEventDelta,
          declared_checks: declaredChecks,
          lifecycle_calls: lifecycleCalls,
          tool_calls: toolCalls,
          duplicate_executor_context_bytes: duplicateExecutorContextBytes,
        }),
        stop: {
          code: observed.stop,
          reason: observed.reason,
          route_step_id: current.workflowStep.id,
          operation_id: operation.id,
        },
      });
    }

    if (operation.id === "runner.follow" && !retainedWorkspace.current) {
      executionBaseCommit = await readDirectTaskHead(activeCtx.cwd);
      executionBaselineStatus = await readDirectRepositoryStatus(activeCtx.cwd);
      executorEventsBefore = taskEventCount(
        await loadTaskFromContext({ ctx: activeCommand, taskId: input.task_id }),
      );
    }
    const task = await loadTaskFromContext({ ctx: activeCommand, taskId: input.task_id });
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
          lifecycle_calls: lifecycleCalls,
          tool_calls: toolCalls,
          duplicate_executor_context_bytes: duplicateExecutorContextBytes,
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

    const implementation = await prepareDirectImplementationEvidence({
      command: activeCommand,
      cwd: activeCtx.cwd,
      task_id: input.task_id,
      execution_base_commit: executionBaseCommit,
      execution_baseline_status: executionBaselineStatus,
      allowed_paths: lifecycle.lifecycle?.work_order_authority?.writable_roots ?? [],
      observed_changed_paths:
        lifecycle.result?.evidence?.provenance === "supervisor_observed"
          ? (lifecycle.result.evidence.changed_paths ?? [])
          : null,
    });
    if (implementation.status !== "ready") {
      return stoppedResult({
        decision: current,
        journal,
        executor: observed.executor,
        metrics: directTaskSupervisorMetrics({
          provider_episodes: providerEpisodes,
          executor_lifecycle_event_delta: executorLifecycleEventDelta,
          declared_checks: declaredChecks,
          lifecycle_calls: lifecycleCalls,
          tool_calls: toolCalls,
          duplicate_executor_context_bytes: duplicateExecutorContextBytes,
        }),
        stop: {
          code:
            implementation.status === "scope_violation"
              ? "implementation_scope_violation"
              : "implementation_commit_missing",
          reason: implementation.reason,
          route_step_id: current.workflowStep.id,
          operation_id: null,
        },
      });
    }
    const reconciliation = await recordObservedTaskExecutionContract({
      command: activeCommand,
      execution:
        input.task_execution ??
        (await resolveTaskExecutionContext({
          ctx: activeCommand,
          tasks: [task],
          primaryTaskId: task.id,
        })),
      task,
      changed_paths: implementation.evidence.changed_paths,
      observed_external_effects: observedExternalEffectsFromRunnerResult(lifecycle.result),
      preserved_commit: implementation.evidence.implementation_commit,
    });
    if (
      reconciliation.escalated ||
      reconciliation.task.execution_contract?.observed.authority_violations.length
    ) {
      return stoppedResult({
        decision: current,
        journal,
        executor: observed.executor,
        metrics: directTaskSupervisorMetrics({
          provider_episodes: providerEpisodes,
          executor_lifecycle_event_delta: executorLifecycleEventDelta,
          declared_checks: declaredChecks,
          lifecycle_calls: lifecycleCalls,
          tool_calls: toolCalls,
          duplicate_executor_context_bytes: duplicateExecutorContextBytes,
        }),
        stop: {
          code: "execution_contract_escalated",
          reason:
            "Supervisor-observed effects exceed the execution contract authority and require branch_pr plus explicit side-effect authority. The execution contract preserved the implementation commit and changed paths; recompute task next-action for the single deterministic handoff.",
          route_step_id: current.workflowStep.id,
          operation_id: null,
        },
      });
    }
    const verification = await verifyDirectTask({
      ctx: activeCtx,
      command: activeCommand,
      task_id: input.task_id,
      task: reconciliation.task,
      implementation_evidence: implementation.evidence,
      decision,
      on_lifecycle_operation: () => {
        lifecycleCalls += 1;
        toolCalls += 1;
      },
      journal: { journal: persisted.journal, journal_path: persisted.journal_path },
    });
    declaredChecks = verification.declared_checks;
    journal = journalProjection(verification.journal, verification.journal_path);
    if (verification.status === "stopped") {
      return stoppedResult({
        decision: verification.decision,
        journal,
        executor: observed.executor,
        metrics: directTaskSupervisorMetrics({
          provider_episodes: providerEpisodes,
          executor_lifecycle_event_delta: executorLifecycleEventDelta,
          declared_checks: declaredChecks,
          lifecycle_calls: lifecycleCalls,
          tool_calls: toolCalls,
          duplicate_executor_context_bytes: duplicateExecutorContextBytes,
        }),
        stop: verification.stop,
      });
    }
    current = verification.decision;
    // Formal verification mutates the task record. Prepare the read-only
    // evaluator from that exact revision so its work order cannot become stale
    // before the provider is invoked.
    const evaluatorTask = await loadTaskFromContext({
      ctx: activeCommand,
      taskId: input.task_id,
    });

    let evaluatorEpisode: Awaited<ReturnType<typeof runAndApplyDirectTaskEvaluator>>;
    try {
      toolCalls += 1;
      evaluatorEpisode = await runAndApplyDirectTaskEvaluator({
        ctx: activeCtx,
        command: activeCommand,
        task: evaluatorTask,
        task_id: input.task_id,
        evaluator_id: DEFAULT_EVALUATOR_ID,
      });
    } catch (error) {
      return stoppedResult({
        decision: current,
        journal,
        executor: observed.executor,
        metrics: directTaskSupervisorMetrics({
          provider_episodes: providerEpisodes,
          executor_lifecycle_event_delta: executorLifecycleEventDelta,
          declared_checks: declaredChecks,
          lifecycle_calls: lifecycleCalls,
          tool_calls: toolCalls,
          duplicate_executor_context_bytes: duplicateExecutorContextBytes,
        }),
        stop: {
          code: "evaluator_adapter_crash",
          reason:
            "The read-only EVALUATOR adapter stopped before a typed verdict was applied " +
            `(${evaluatorAdapterFailureClass(error)}).`,
          route_step_id: current.workflowStep.id,
          operation_id: "runner.follow",
        },
      });
    }
    const evaluatorExecution = evaluatorEpisode.execution;
    const evaluatorResult = evaluatorEpisode.result;
    current = await decision();
    let evaluatorJournal = advanceSupervisorExecutionEpisodeState({
      journal: evaluatorExecution.journal,
      state_fingerprint_digest: current.workflowStep.preconditionFingerprint.digest,
      route_observation: { step_id: current.workflowStep.id },
    });
    await evaluatorExecution.store.write(evaluatorJournal);
    journal = journalProjection(evaluatorJournal, evaluatorExecution.store.path);
    providerEpisodes += 1;
    if (evaluatorResult.verdict !== "pass") {
      const code: DirectTaskSupervisorStopCode =
        evaluatorResult.verdict === "rework"
          ? "evaluator_rework"
          : evaluatorResult.verdict === "human_review"
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
          lifecycle_calls: lifecycleCalls,
          tool_calls: toolCalls,
          duplicate_executor_context_bytes: duplicateExecutorContextBytes,
        }),
        stop: {
          code,
          reason: `EVALUATOR returned ${evaluatorResult.verdict}.`,
          route_step_id: current.workflowStep.id,
          operation_id: "runner.follow",
        },
      });
    }

    const closeout = await finalizeDirectTask({
      ctx: activeCtx,
      command: activeCommand,
      task_id: input.task_id,
      decision,
      execution_base_commit: executionBaseCommit,
      allowed_paths: lifecycle.lifecycle?.work_order_authority?.writable_roots ?? [],
      observed_changed_paths:
        lifecycle.result?.evidence?.provenance === "supervisor_observed"
          ? (lifecycle.result.evidence.changed_paths ?? [])
          : null,
      on_lifecycle_operation: () => {
        lifecycleCalls += 1;
        toolCalls += 1;
      },
      journal: { journal: evaluatorJournal, journal_path: evaluatorExecution.store.path },
      declared_checks: declaredChecks,
    });
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
          lifecycle_calls: lifecycleCalls,
          tool_calls: toolCalls,
          duplicate_executor_context_bytes: duplicateExecutorContextBytes,
        }),
        stop: closeout.stop,
      });
    }
    const terminalJournal = stopSupervisorExecutionEpisode({
      journal: closeout.journal,
      reason: "completed",
    });
    await evaluatorExecution.store.write(terminalJournal);
    journal = journalProjection(terminalJournal, closeout.journal_path);
    const metrics = directTaskSupervisorMetrics({
      provider_episodes: providerEpisodes,
      executor_lifecycle_event_delta: executorLifecycleEventDelta,
      declared_checks: declaredChecks,
      lifecycle_calls: lifecycleCalls,
      tool_calls: toolCalls,
      duplicate_executor_context_bytes: duplicateExecutorContextBytes,
    });
    const goldenMetrics = await recordDirectTaskSupervisionGoldenMetrics({
      command: activeCommand,
      task_id: input.task_id,
      metrics,
      verified_success: true,
      committed_scope_enforced: implementation.status === "ready",
    });
    return {
      schema: DIRECT_TASK_SUPERVISION_SCHEMA,
      task_id: input.task_id,
      workflow_mode: "direct",
      status: "finalized",
      phase: "finalized",
      route: {
        step_id: closeout.decision.workflowStep.id,
        code: routeCode(closeout.decision),
        state_fingerprint: closeout.decision.workflowStep.preconditionFingerprint.digest,
      },
      stop: null,
      executor: observed.executor,
      evaluator: evaluatorResult,
      journal,
      metrics,
      golden_metrics: goldenMetrics,
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
