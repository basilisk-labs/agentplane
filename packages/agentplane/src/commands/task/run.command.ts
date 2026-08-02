import type { CommandCtx } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  executeTaskRunnerExecution,
  prepareTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";
import {
  projectExecutedTaskRunnerLifecycleResult,
  projectPreparedTaskRunnerLifecycleResult,
  taskRunnerLifecycleExitCode,
} from "../../runner/usecases/task-run-lifecycle-result.js";
import {
  loadTaskRunnerDiagnosticInspection,
  loadTaskRunnerInspection,
} from "../../runner/usecases/task-run-inspect.js";
import { reconcileTaskRunnerActiveClaim } from "../../runner/usecases/task-run-active-claim-runtime.js";
import type { TaskRunLogsParsed } from "./run-parse.js";
import type {
  TaskRunInspectParsed,
  TaskRunParsed,
  TaskRunReconcileParsed,
  TaskRunStatusParsed,
} from "./run.spec.js";
import {
  loadRunnerLogText,
  reportRunnerStatus,
  renderRunnerDiagnosticInspectPayload,
  renderRunnerDiagnosticStatusPayload,
  renderRunnerStatusPayload,
  runnerReconciliationWarning,
  renderTaskRunnerLifecyclePayload,
  reportExecutedTaskRun,
  reportPreparedTaskRun,
  tailText,
} from "./run-render.js";
import { followRunnerLogs } from "./run-logs-follow.js";
import { superviseBranchTaskRun } from "./branch-task-supervisor.js";
import { superviseDirectTaskRun } from "./direct-task-supervisor.js";

export {
  makeRunTaskRunResolveEffectHandler,
  makeRunTaskRunResumeEffectHandler,
} from "./task-run-effect-resolution.command.js";

function reportTaskSupervision(opts: {
  output: ReturnType<typeof createCliEmitter>;
  mode: "direct" | "branch_pr";
  taskId: string;
  result: {
    task_id: string;
    status: string;
    phase: string;
    route: { step_id: string };
    executor: { run_id: string } | null;
    evaluator: { evaluator_id: string; verdict: string } | null;
    stop: { code: string } | null;
    journal: { path: string } | null;
  };
  operations?: number;
}): void {
  const rows = [
    { label: "task", value: opts.result.task_id },
    { label: "status", value: opts.result.status },
    { label: "phase", value: opts.result.phase },
    { label: "route", value: opts.result.route.step_id },
    { label: "executor_run", value: opts.result.executor?.run_id ?? null },
    { label: "evaluator", value: opts.result.evaluator?.evaluator_id ?? null },
    { label: "evaluator_verdict", value: opts.result.evaluator?.verdict ?? null },
    ...(opts.operations === undefined ? [] : [{ label: "operations", value: opts.operations }]),
    { label: "stop", value: opts.result.stop?.code ?? null },
    { label: "journal", value: opts.result.journal?.path ?? null },
  ];
  opts.output.report(rows, {
    header: infoMessage(`${opts.mode} task supervision: ${opts.taskId}`),
  });
}

export type TaskRunContextDependencies = {
  getPreparationContext?: (
    command: string,
    options: { includeRemote: boolean },
  ) => Promise<CommandContext>;
  getExecutionContext?: (
    command: string,
    options: { includeRemote: boolean },
  ) => Promise<CommandContext>;
};

export function makeRunTaskRunHandler(deps: TaskRunContextDependencies) {
  return async (ctx: CommandCtx, parsed: TaskRunParsed): Promise<number> => {
    const output = createCliEmitter();
    const dangerAuthority = parsed.allowDangerFullAccess
      ? {
          danger_full_access_authorized: true as const,
          provenance: "explicit_operator" as const,
          source: "task run --allow-danger-full-access",
        }
      : null;
    if (parsed.dryRun) {
      if (!deps.getPreparationContext) {
        throw new Error("task run dry-run was loaded without preparation capabilities");
      }
      const commandCtx = await deps.getPreparationContext("task run", {
        includeRemote: parsed.remote,
      });
      const prepared = await prepareTaskRunnerExecution({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
        task_id: parsed.taskId,
        mode: "dry_run",
        ...(parsed.remote ? { include_remote: true } : {}),
        danger_authority: dangerAuthority,
        sandbox_override: parsed.sandbox,
      });
      const lifecycle = projectPreparedTaskRunnerLifecycleResult({
        task_id: parsed.taskId,
        execution: prepared,
      });
      const payload = renderTaskRunnerLifecyclePayload(lifecycle);
      if (parsed.json) {
        output.json(payload);
      } else {
        reportPreparedTaskRun(payload, parsed.taskId);
      }
      return 0;
    }

    if (!deps.getExecutionContext) {
      throw new Error("task run execution was loaded without execution capabilities");
    }
    const commandCtx = await deps.getExecutionContext("task run", {
      includeRemote: parsed.remote,
    });

    if (commandCtx.config?.workflow_mode === "direct") {
      const supervised = await superviseDirectTaskRun({
        ctx,
        command: commandCtx,
        task_id: parsed.taskId,
        include_remote: parsed.remote,
        ...(parsed.sandbox ? { sandbox_override: parsed.sandbox } : {}),
        ...(dangerAuthority ? { danger_authority: dangerAuthority } : {}),
      });
      if (parsed.json) {
        output.json(supervised);
      } else {
        reportTaskSupervision({
          output,
          mode: "direct",
          taskId: parsed.taskId,
          result: supervised,
        });
      }
      return supervised.stop?.code === "runner_failed" ||
        supervised.stop?.code === "executor_adapter_crash" ||
        supervised.stop?.code === "runner_receipt_unobserved" ||
        supervised.stop?.code === "executor_result_missing" ||
        supervised.stop?.code === "executor_semantic_failed" ||
        supervised.stop?.code === "evaluator_adapter_crash" ||
        supervised.stop?.code === "route_refresh_failed"
        ? 1
        : 0;
    }

    if (commandCtx.config?.workflow_mode === "branch_pr") {
      const supervised = await superviseBranchTaskRun({
        ctx,
        command: commandCtx,
        task_id: parsed.taskId,
        ...(parsed.sandbox ? { sandbox_override: parsed.sandbox } : {}),
        ...(dangerAuthority ? { danger_authority: dangerAuthority } : {}),
      });
      if (parsed.json) {
        output.json(supervised);
      } else {
        reportTaskSupervision({
          output,
          mode: "branch_pr",
          taskId: parsed.taskId,
          result: supervised,
          operations: supervised.operation_receipts.length,
        });
      }
      return supervised.stop?.code === "approval_required" ||
        supervised.stop?.code === "semantic_input_required" ||
        supervised.stop?.code === "wait_required" ||
        supervised.stop?.code === "human_input_required" ||
        supervised.stop?.code === "terminal_attention"
        ? 0
        : supervised.status === "finalized"
          ? 0
          : 1;
    }

    const executed = await executeTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      ...(parsed.remote ? { include_remote: true } : {}),
      danger_authority: dangerAuthority,
      sandbox_override: parsed.sandbox,
    });
    const lifecycle = projectExecutedTaskRunnerLifecycleResult({
      task_id: parsed.taskId,
      execution: executed,
    });
    const payload = renderTaskRunnerLifecyclePayload(lifecycle);
    if (parsed.json) {
      output.json(payload);
    } else {
      reportExecutedTaskRun(payload, parsed.taskId);
    }
    return taskRunnerLifecycleExitCode(lifecycle);
  };
}

export function makeRunTaskRunStatusHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunStatusParsed): Promise<number> => {
    const commandCtx = await getCtx("task run status");
    const inspection = await loadTaskRunnerDiagnosticInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const payload = await renderRunnerDiagnosticStatusPayload(inspection);
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(payload);
    } else {
      reportRunnerStatus(payload, parsed.taskId);
    }
    return 0;
  };
}

export function makeRunTaskRunInspectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunInspectParsed): Promise<number> => {
    const commandCtx = await getCtx("task run inspect");
    const inspection = await loadTaskRunnerDiagnosticInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const payload = await renderRunnerDiagnosticInspectPayload(inspection, parsed.events);
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: payload.task_id },
          { label: "run", value: payload.run_id },
          { label: "storage", value: payload.storage },
          { label: "status", value: payload.status },
          { label: "active_claim_present", value: payload.active_claim_present },
          { label: "active_claim_retained", value: payload.active_claim_retained },
          { label: "active_claim_run", value: payload.active_claim?.run_id ?? null },
          { label: "projection_pending", value: payload.projection_pending },
          { label: "reconcile_required", value: payload.reconcile_required },
          { label: "adapter", value: payload.adapter_id },
          { label: "claimed_run_authority", value: payload.claimed_run_authority },
          { label: "recovery_lease", value: payload.recovery_lease?.status ?? null },
          { label: "recovery_lease_owner", value: payload.recovery_lease?.owner_status ?? null },
          { label: "execution_blocked", value: payload.execution_blocked },
          { label: "next_safe_action", value: payload.next_safe_action },
          { label: "run_dir", value: payload.paths?.run_dir ?? null },
          { label: "bundle", value: payload.paths?.bundle ?? null },
          { label: "bootstrap", value: payload.paths?.bootstrap ?? null },
          { label: "result", value: payload.paths?.result ?? null },
          { label: "events", value: payload.paths?.events ?? null },
          { label: "trace", value: payload.paths?.trace ?? null },
          { label: "stderr", value: payload.paths?.stderr ?? null },
        ],
        { header: infoMessage(`task runner inspect: ${parsed.taskId}`) },
      );
      if (payload.recent_events.length > 0) {
        output.line("recent_events:");
        output.lines(payload.recent_events.map((event) => JSON.stringify(event)));
      }
    }
    return 0;
  };
}

export function makeRunTaskRunReconcileHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, parsed: TaskRunReconcileParsed): Promise<number> => {
    const commandCtx = await getCtx("task run reconcile");
    const result = await reconcileTaskRunnerActiveClaim({
      ctx: commandCtx,
      task_id: parsed.taskId,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(result);
    } else {
      output.report(
        [
          { label: "task", value: result.task_id },
          { label: "status", value: result.status },
          { label: "run", value: result.run_id },
          { label: "claimed_run_authority", value: result.claimed_run_authority },
        ],
        { header: infoMessage(`task runner reconcile: ${parsed.taskId}`) },
      );
    }
    return 0;
  };
}

export function makeRunTaskRunLogsHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunLogsParsed): Promise<number> => {
    const commandCtx = await getCtx("task run logs");
    const inspection = await loadTaskRunnerInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const output = createCliEmitter();
    const statusPayload = await renderRunnerStatusPayload(inspection);
    const reconciliationWarning = runnerReconciliationWarning(statusPayload);
    if (reconciliationWarning) output.warn(reconciliationWarning, "stderr");
    const text = await loadRunnerLogText(inspection, parsed.stream);
    const emittedChars = text.length;
    const initial = tailText(text, parsed.tail);
    if (initial) output.lines(initial.split("\n"));
    if (!parsed.follow) return 0;

    return await followRunnerLogs({
      initial_inspection: inspection,
      stream: parsed.stream,
      emitted_chars: emittedChars,
      output,
      reload: async (runId) =>
        await loadTaskRunnerInspection({
          ctx: commandCtx,
          cwd: ctx.cwd,
          rootOverride: ctx.rootOverride ?? null,
          task_id: parsed.taskId,
          run_id: runId,
        }),
    });
  };
}
