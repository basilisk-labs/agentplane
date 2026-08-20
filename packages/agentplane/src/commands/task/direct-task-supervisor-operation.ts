import type { CommandCtx } from "../../cli/spec/spec.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { loadTaskCommandContext } from "../../runtime/task-execution-context/index.js";
import {
  allocateTaskWorkspace,
  releaseWorkspaceLease,
} from "../../runtime/workspace-allocation/index.js";
import { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import {
  projectExecutedTaskRunnerLifecycleResult,
  taskRunnerLifecycleExitCode,
} from "../../runner/usecases/task-run-lifecycle-result.js";
import type { WorkflowSupervisorOperationResult } from "../shared/workflow-supervisor.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  readDirectRepositoryStatus,
  readDirectTaskHead,
  type DirectRepositoryStatus,
} from "./direct-task-finalization.js";
import { cmdTaskStartReady } from "./start-ready.js";
import type { supervisePersistedWorkflowEpisode } from "../shared/supervisor-execution-episode.js";

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
