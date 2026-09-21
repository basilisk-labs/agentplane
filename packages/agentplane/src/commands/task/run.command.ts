import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { taskKernel } from "@agentplaneorg/core/tasks";
import { advanceTaskStep } from "./advance-task-step.js";
import { executeKernelPacket, runManagedTransportStep } from "./kernel-run.js";
import { createKernelProviderEffectPortResolver } from "./kernel-provider-effect-coordinator.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveTaskOwnerCommandContext } from "../shared/task-backend.js";
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
  tailText,
} from "./run-render.js";
import { followRunnerLogs } from "./run-logs-follow.js";
import { classifyKernelCutover } from "./kernel-cutover.js";
import {
  recoverCanonicalControllerSuspensions,
  resolveCanonicalControllerCommand,
} from "./kernel-controller-handoff.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

export {
  makeRunTaskRunResolveEffectHandler,
  makeRunTaskRunResumeEffectHandler,
} from "./task-run-effect-resolution.command.js";

function legacyMigrationRequired(taskId: string, reason: string): CliError {
  return new CliError({
    code: "E_PHASE_POLICY",
    message:
      `Task ${taskId} is not owned by the Task Kernel. Managed legacy execution is disabled; ` +
      `migrate the exact record before issuing more work: ` +
      `agentplane task kernel-migrate ${taskId}`,
    context: {
      reason_code: reason,
      task_id: taskId,
      next_action: `agentplane task kernel-migrate ${taskId}`,
    },
  });
}

type TaskRunContextDependencies = {
  getPreparationContext?: (
    command: string,
    options: { includeRemote: boolean },
  ) => Promise<CommandContext>;
  getExecutionContext?: (
    command: string,
    options: { includeRemote: boolean },
  ) => Promise<CommandContext>;
};

async function canonicalManagedOutput(opts: {
  command: CommandContext;
  task_id: string;
  dry_run: boolean;
  sandbox?: string;
  allow_remote: boolean;
}) {
  if (opts.dry_run) {
    const runtime = await createKernelRuntime({
      command: opts.command,
      task_id: opts.task_id,
      transport: "managed",
      operation_id: "preview",
    });
    const context = await runtime.native.readContext(opts.task_id);
    const current = await runtime.lifecycle.read(opts.task_id, context.repository_fingerprint);
    return {
      schema_version: 1,
      task_id: opts.task_id,
      action: { kind: "read_only", reason: current.next_action.reason_code },
    };
  }
  return await runManagedTransportStep({
    advance: async () =>
      await advanceTaskStep({
        command: opts.command,
        task_id: opts.task_id,
        transport: "managed",
        effect_port_resolver: createKernelProviderEffectPortResolver({
          command: opts.command,
          allow_remote: opts.allow_remote,
        }),
        allow_provider_effects: opts.allow_remote,
      }),
    execute: async (packet) =>
      await executeKernelPacket(
        opts.command,
        opts.task_id,
        packet,
        opts.sandbox,
        opts.allow_remote,
      ),
  });
}

export function makeRunTaskRunHandler(deps: TaskRunContextDependencies) {
  return async (_ctx: CommandCtx, parsed: TaskRunParsed): Promise<number> => {
    const output = createCliEmitter();
    const getContext = parsed.dryRun ? deps.getPreparationContext : deps.getExecutionContext;
    if (!getContext) {
      throw new Error(
        parsed.dryRun
          ? "task run dry-run was loaded without preparation capabilities"
          : "task run execution was loaded without execution capabilities",
      );
    }
    const initialCommandCtx = await getContext("task run", {
      includeRemote: parsed.remote,
    });
    await recoverCanonicalControllerSuspensions({
      command: initialCommandCtx,
      task_id: parsed.taskId,
    });
    let command = await resolveTaskOwnerCommandContext({
      ctx: initialCommandCtx,
      taskId: parsed.taskId,
    });
    let source = await command.taskBackend.getTask(parsed.taskId);
    if (!source) {
      throw new CliError({
        code: "E_IO",
        message: `Task ${parsed.taskId} was not found in its authoritative checkout.`,
      });
    }
    const repositoryIdentity = (await resolveLogicalRepositoryIdentity({
      git_root: command.resolvedProject.gitRoot,
      task: source,
    })) as taskKernel.Sha256Digest;
    const read = readKernelRecord(source, repositoryIdentity);
    if (read.kind === "legacy_unmigrated") {
      const disposition = classifyKernelCutover(source);
      throw legacyMigrationRequired(
        parsed.taskId,
        disposition.kind === "migration_required"
          ? disposition.reason
          : "legacy_migration_required",
      );
    }
    if (read.kind === "malformed") {
      throw new CliError({
        code: "E_PHASE_POLICY",
        message:
          `Task ${parsed.taskId} has an unsupported or malformed Task Kernel record. ` +
          "No fallback runner was selected.",
        context: {
          reason_code: read.reason,
          task_id: parsed.taskId,
          fields: read.fields,
          next_action: `agentplane task show ${parsed.taskId} --kernel`,
        },
      });
    }
    if (read.kind === "archived") {
      output.json({
        schema_version: 1,
        task_id: parsed.taskId,
        action: { kind: "terminal", reason: "canonical_archive_read_only" },
      });
      return 0;
    }
    if (read.kind !== "canonical") throw new Error(`Unexpected Task Kernel read: ${read.kind}`);
    command = await resolveCanonicalControllerCommand({ command, task_id: parsed.taskId });
    source = await command.taskBackend.getTask(parsed.taskId);
    if (!source) {
      throw new CliError({
        code: "E_IO",
        message: `Task ${parsed.taskId} was not found in its canonical controller checkout.`,
      });
    }
    output.json(
      await canonicalManagedOutput({
        command,
        task_id: parsed.taskId,
        dry_run: parsed.dryRun === true,
        sandbox: parsed.sandbox,
        allow_remote: parsed.remote === true,
      }),
    );
    return 0;
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
