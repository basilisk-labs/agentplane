import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { taskKernel } from "@agentplaneorg/core/tasks";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveTaskOwnerCommandContext } from "../shared/task-backend.js";
import type { TaskAdvanceParsed } from "./advance.spec.js";
import { advanceTaskStep } from "./advance-task-step.js";
import { createKernelProviderEffectPortResolver } from "./kernel-provider-effect-coordinator.js";
import {
  recoverCanonicalControllerSuspensions,
  resolveCanonicalControllerCommand,
} from "./kernel-controller-handoff.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { classifyKernelCutover } from "./kernel-cutover.js";

function legacyMigrationRequired(taskId: string, reason: string): CliError {
  return new CliError({
    code: "E_PHASE_POLICY",
    message:
      `Task ${taskId} is not owned by the Task Kernel. Ordinary advancement is disabled; ` +
      `migrate the exact record before issuing more work: ` +
      `agentplane task kernel-migrate ${taskId}`,
    context: {
      reason_code: reason,
      task_id: taskId,
      next_action: `agentplane task kernel-migrate ${taskId}`,
    },
  });
}

export function makeRunTaskAdvanceHandler(deps: {
  getContext: (command: string, options: { includeRemote: boolean }) => Promise<CommandContext>;
}) {
  return async (ctx: CommandCtx, parsed: TaskAdvanceParsed): Promise<number> => {
    if (parsed.result && parsed.replacement) {
      throw new CliError({
        code: "E_USAGE",
        message: "task advance --replacement cannot be combined with --result.",
      });
    }
    if (
      parsed.workflowRecovery !== undefined &&
      (!parsed.workflowRecovery || !parsed.remote || parsed.result || parsed.replacement)
    ) {
      throw new CliError({
        code: "E_USAGE",
        message:
          "--workflow-recovery requires --remote and cannot be combined with --result or --replacement.",
      });
    }
    const initialCommand = await deps.getContext("task advance", { includeRemote: parsed.remote });
    await recoverCanonicalControllerSuspensions({
      command: initialCommand,
      task_id: parsed.taskId,
    });
    let command = await resolveTaskOwnerCommandContext({
      ctx: initialCommand,
      taskId: parsed.taskId,
    });
    let source = await command.taskBackend.getTask(parsed.taskId);
    if (!source)
      throw new CliError({
        code: "E_IO",
        message: `Task ${parsed.taskId} was not found in its authoritative checkout.`,
      });
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
    if (read.kind === "malformed")
      throw new CliError({
        code: "E_PHASE_POLICY",
        message:
          `Task ${parsed.taskId} has an unsupported or malformed Task Kernel record. ` +
          "No fallback executor was selected.",
        context: {
          reason_code: read.reason,
          task_id: parsed.taskId,
          fields: read.fields,
          next_action: `agentplane task show ${parsed.taskId} --kernel`,
        },
      });
    if (read.kind === "archived") {
      createCliEmitter().json({
        schema_version: 1,
        task_id: parsed.taskId,
        action: { kind: "terminal", reason: "canonical_archive_read_only" },
      });
      return 0;
    }
    if (read.kind !== "canonical") throw new Error(`Unexpected Task Kernel read: ${read.kind}`);
    command = await resolveCanonicalControllerCommand({ command, task_id: parsed.taskId });
    source = await command.taskBackend.getTask(parsed.taskId);
    if (!source)
      throw new CliError({
        code: "E_IO",
        message: `Task ${parsed.taskId} was not found in its canonical controller checkout.`,
      });
    if (parsed.workflowRecovery) {
      throw new CliError({
        code: "E_USAGE",
        message: "Canonical tasks do not use integration supervisor effect recovery.",
      });
    }
    if (parsed.replacement) {
      throw new Error("Canonical replacement requires an explicit recovery episode");
    }
    const packet = await advanceTaskStep({
      command,
      task_id: parsed.taskId,
      transport: "host",
      result_path: parsed.result,
      effect_port_resolver: createKernelProviderEffectPortResolver({
        command,
        allow_remote: parsed.remote,
      }),
      allow_provider_effects: parsed.remote,
    });
    createCliEmitter().json(packet);
    return 0;
  };
}
