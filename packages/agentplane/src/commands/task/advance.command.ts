import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
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

function emitOrdinaryPacket(
  parsed: TaskAdvanceParsed,
  result: Awaited<ReturnType<typeof advanceTaskStep>>,
): number {
  const output = createCliEmitter();
  if (!("presentation" in result) || result.presentation === "json" || parsed.agentJson) {
    output.json("packet" in result ? result.packet : result);
    return 0;
  }
  const packet = result.packet;
  output.report(
    [
      { label: "task", value: packet.task_id },
      { label: "state_fingerprint", value: packet.state_fingerprint },
      { label: "action", value: packet.action.kind },
      { label: "instruction", value: packet.action.instruction },
      { label: "role", value: packet.authority.role },
      { label: "mutation", value: packet.authority.mutation },
      { label: "stop", value: packet.stop.reason },
      ...(packet.exchange
        ? [
            { label: "exchange_directory", value: packet.exchange.directory },
            { label: "work_order_ref", value: packet.exchange.work_order_ref },
            { label: "result_ref", value: packet.exchange.result_ref },
            { label: "return_invocation", value: packet.exchange.return_invocation },
            { label: "result_path", value: packet.exchange.result_path },
            { label: "resume_argv", value: JSON.stringify(packet.exchange.resume_argv) },
          ]
        : []),
      ...(packet.operator_action
        ? [
            { label: "operator_action", value: packet.operator_action.kind },
            {
              label: "operator_argv",
              value: packet.operator_action.argv
                ? JSON.stringify(packet.operator_action.argv)
                : "provider action required",
            },
          ]
        : []),
      ...(packet.recovery ? [{ label: "recovery", value: packet.recovery.reason }] : []),
    ],
    { header: infoMessage(`task advance: ${parsed.taskId}`) },
  );
  return 0;
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
    const localSource = await initialCommand.taskBackend.getTask(parsed.taskId);
    let command =
      localSource?.extensions && Object.hasOwn(localSource.extensions, TASK_KERNEL_EXTENSION)
        ? initialCommand
        : await resolveTaskOwnerCommandContext({ ctx: initialCommand, taskId: parsed.taskId });
    if (localSource?.extensions && Object.hasOwn(localSource.extensions, TASK_KERNEL_EXTENSION)) {
      command = await resolveCanonicalControllerCommand({ command, task_id: parsed.taskId });
    }
    const source = await command.taskBackend.getTask(parsed.taskId);
    if (source?.extensions && Object.hasOwn(source.extensions, TASK_KERNEL_EXTENSION)) {
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
        kind: "canonical",
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
    }
    return emitOrdinaryPacket(
      parsed,
      await advanceTaskStep({ kind: "ordinary", ctx, parsed, command }),
    );
  };
}
