import type { CommandCtx } from "../../cli/spec/spec.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import {
  loadTaskCommandContext,
  resolveTaskExecutionContext,
} from "../../runtime/task-execution-context/index.js";
import {
  allocateTaskWorkspace,
  releaseWorkspaceLease,
} from "../../runtime/workspace-allocation/index.js";
import { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import {
  projectExecutedTaskRunnerLifecycleResult,
  taskRunnerLifecycleExitCode,
  type TaskRunnerLifecycleResult,
} from "../../runner/usecases/task-run-lifecycle-result.js";
import type { CommandContext } from "../shared/task-backend.js";
import { loadTaskFromContext } from "../shared/task-backend.js";
import type { supervisePersistedWorkflowEpisode } from "../shared/supervisor-execution-episode.js";
import type { WorkflowSupervisorOperationResult } from "../shared/workflow-supervisor.js";
import {
  readDirectRepositoryStatus,
  readDirectTaskHead,
  type DirectImplementationEvidence,
  type DirectRepositoryStatus,
} from "./direct-task-finalization.js";
import { prepareDirectImplementationEvidence } from "./direct-task-supervisor-implementation.js";
import { cmdTaskStartReady } from "./start-ready.js";
import {
  observedExternalEffectsFromRunnerResult,
  recordObservedTaskExecutionContract,
} from "./task-execution-contract-observation.js";

type DirectOperationInput = {
  ctx: CommandCtx;
  command: CommandContext;
  include_remote: boolean;
  sandbox_override?: string;
  danger_authority?: {
    danger_full_access_authorized: true;
    provenance: "explicit_operator";
    source: string;
  } | null;
  task_execution?: TaskExecutionContext;
};

export type RetainedDirectWorkspace = Readonly<{
  ctx: CommandCtx;
  command: CommandContext;
  execution_base_commit: string | null;
  execution_baseline_status: DirectRepositoryStatus | null;
  executor_events_before: number;
  release: () => Promise<void>;
}>;

export type DirectImplementationOperationResult =
  | {
      status: "ready";
      task: Awaited<ReturnType<typeof loadTaskFromContext>>;
      evidence: DirectImplementationEvidence;
      executor_lifecycle_event_delta: number;
    }
  | {
      status: "stopped";
      code:
        | "executor_lifecycle_mutation"
        | "implementation_scope_violation"
        | "implementation_commit_missing"
        | "execution_contract_escalated";
      reason: string;
      executor_lifecycle_event_delta: number;
    };

/**
 * Applies the common post-run repository operation: observe the immutable
 * implementation range, enforce its authority, freeze its evidence, and
 * reconcile the execution contract before verification can advance.
 */
export async function applyDirectImplementationOperation(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  task_execution?: TaskExecutionContext;
  lifecycle: TaskRunnerLifecycleResult;
  execution_base_commit: string | null;
  execution_baseline_status: DirectRepositoryStatus | null;
  executor_events_before: number | null;
}): Promise<DirectImplementationOperationResult> {
  const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.task_id });
  const eventCount = task.events?.length ?? 0;
  const eventDelta = eventCount - (opts.executor_events_before ?? eventCount);
  if (eventDelta !== 0) {
    return {
      status: "stopped",
      code: "executor_lifecycle_mutation",
      reason:
        "The EXECUTOR changed persisted task lifecycle events; direct lifecycle ownership belongs to the CLI.",
      executor_lifecycle_event_delta: eventDelta,
    };
  }

  const implementation = await prepareDirectImplementationEvidence({
    command: opts.command,
    cwd: opts.cwd,
    task_id: opts.task_id,
    execution_base_commit: opts.execution_base_commit,
    execution_baseline_status: opts.execution_baseline_status,
    allowed_paths: opts.lifecycle.lifecycle.work_order_authority?.writable_roots ?? [],
    observed_changed_paths:
      opts.lifecycle.result?.evidence?.provenance === "supervisor_observed"
        ? (opts.lifecycle.result.evidence.changed_paths ?? [])
        : null,
  });
  if (implementation.status !== "ready") {
    return {
      status: "stopped",
      code:
        implementation.status === "scope_violation"
          ? "implementation_scope_violation"
          : "implementation_commit_missing",
      reason: implementation.reason,
      executor_lifecycle_event_delta: eventDelta,
    };
  }

  const execution =
    opts.task_execution ??
    (await resolveTaskExecutionContext({
      ctx: opts.command,
      tasks: [task],
      primaryTaskId: task.id,
    }));
  const reconciliation = await recordObservedTaskExecutionContract({
    command: opts.command,
    execution,
    task,
    changed_paths: implementation.evidence.changed_paths,
    observed_external_effects: observedExternalEffectsFromRunnerResult(opts.lifecycle.result),
    preserved_commit: implementation.evidence.implementation_commit,
  });
  if (
    reconciliation.escalated ||
    reconciliation.task.execution_contract?.observed.authority_violations.length
  ) {
    return {
      status: "stopped",
      code: "execution_contract_escalated",
      reason:
        "Supervisor-observed effects exceed the execution contract authority and require branch_pr plus explicit side-effect authority. The execution contract preserved the implementation commit and changed paths; recompute task next-action for the single deterministic handoff.",
      executor_lifecycle_event_delta: eventDelta,
    };
  }
  return {
    status: "ready",
    task: reconciliation.task,
    evidence: implementation.evidence,
    executor_lifecycle_event_delta: eventDelta,
  };
}

export async function executeDirectOperation(opts: {
  input: DirectOperationInput;
  operation: Parameters<
    NonNullable<Parameters<typeof supervisePersistedWorkflowEpisode>[0]["execute"]>
  >[0]["operation"];
  retainWorkspace?: (workspace: RetainedDirectWorkspace) => void;
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
  const taskCommand = await loadTaskCommandContext({
    ctx: input.command,
    taskIds: [operation.params.taskId],
  });
  const allocation = await allocateTaskWorkspace({
    ctx: taskCommand.command,
    execution: taskCommand.execution,
  });
  let workspaceRetained = false;
  let executed: Awaited<ReturnType<typeof executeTaskRunnerExecution>>;
  try {
    const workspaceTaskCommand = await loadTaskCommandContext({
      ctx: taskCommand.command,
      taskIds: [operation.params.taskId],
      baseRef: taskCommand.execution.base_ref,
      baseSha: taskCommand.execution.base_sha,
    });
    const workspaceCtx = {
      ...input.ctx,
      cwd: allocation.workspace_root,
      rootOverride: undefined,
    } satisfies CommandCtx;
    const [executionBaseCommit, executionBaselineStatus] = await Promise.all([
      readDirectTaskHead(allocation.workspace_root),
      readDirectRepositoryStatus(allocation.workspace_root),
    ]);
    opts.retainWorkspace?.(
      Object.freeze({
        ctx: workspaceCtx,
        command: workspaceTaskCommand.command,
        execution_base_commit: executionBaseCommit,
        execution_baseline_status: executionBaselineStatus,
        executor_events_before: workspaceTaskCommand.primary_task.events?.length ?? 0,
        release: async () => await releaseWorkspaceLease(allocation.lease),
      }),
    );
    workspaceRetained = opts.retainWorkspace !== undefined;
    executed = await executeTaskRunnerExecution({
      ctx: workspaceTaskCommand.command,
      cwd: allocation.workspace_root,
      rootOverride: null,
      task_id: operation.params.taskId,
      ...(input.include_remote ? { include_remote: true } : {}),
      ...(input.danger_authority ? { danger_authority: input.danger_authority } : {}),
      ...(input.sandbox_override ? { sandbox_override: input.sandbox_override } : {}),
      task_execution: workspaceTaskCommand.execution,
    });
  } finally {
    if (!workspaceRetained) await releaseWorkspaceLease(allocation.lease);
  }
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
