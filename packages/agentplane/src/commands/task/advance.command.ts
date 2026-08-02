import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import {
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import { CliError } from "../../shared/errors.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { supervisePersistedWorkflowEpisode } from "../shared/supervisor-execution-episode.js";
import type { CommandContext } from "../shared/task-backend.js";

import { executeBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";
import {
  assertAgentActionPacketHasNoChoreography,
  buildAgentActionPacket,
} from "./agent-action-packet.js";

export type TaskAdvanceParsed = {
  taskId: string;
  agentJson: boolean;
  remote: boolean;
};

export const taskAdvanceSpec: CommandSpec<TaskAdvanceParsed> = {
  id: ["task", "advance"],
  group: "Task",
  summary: "Return one compact external-agent action from the shared task supervisor state.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "agent-json",
      default: false,
      description: "Emit the stable compact external-agent protocol.",
    },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Include hosted state while preparing the shared supervisor decision.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task advance 202602030608-F1Q8AB --agent-json",
      why: "Obtain one bounded action without reconstructing lifecycle state.",
    },
  ],
  notes: [
    "The command prepares the same canonical work order and route decision used by the managed task runner.",
    "It executes only registered deterministic transitions, then stops before semantic work, approval, human input, external wait, or terminal attention.",
    "--agent-json changes only rendering; any formal transition is journaled, fingerprint-checked, and supervisor-owned.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    agentJson: raw.opts["agent-json"] === true,
    remote: raw.opts.remote === true,
  }),
};

export function makeRunTaskAdvanceHandler(deps: {
  getContext: (command: string, options: { includeRemote: boolean }) => Promise<CommandContext>;
}) {
  return async (ctx: CommandCtx, parsed: TaskAdvanceParsed): Promise<number> => {
    const command = await deps.getContext("task advance", { includeRemote: parsed.remote });
    const decide = async (): Promise<TaskRouteDecision> =>
      await buildTaskRouteDecision({
        ctx: command,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
        includeRemote: parsed.remote,
        taskId: parsed.taskId,
      });
    let current = await decide();
    let recovery: Parameters<typeof buildAgentActionPacket>[0]["recovery"];
    for (let operationCount = 0; operationCount < 32; operationCount += 1) {
      const step = current.workflowStep;
      if (step.kind !== "cli_operation") break;
      if (step.operation.id === "runner.follow" && step.operation.params.mode === "run") break;
      if (!current.executionPacket.safeToMutate) break;
      const persisted = await supervisePersistedWorkflowEpisode({
        decision: current,
        git_root: command.resolvedProject.gitRoot,
        task_revision: null,
        execute: async ({ operation }) =>
          await executeBranchWorkflowOperation({ decision: current, operation }),
        refresh: decide,
      });
      const execution = persisted.execution;
      if (!execution.executable || execution.stop_reason !== null) {
        const journalReason = persisted.journal.stop?.reason;
        const reason =
          journalReason === "effect_in_doubt" || journalReason === "budget_exhausted"
            ? journalReason
            : execution.stop_reason?.includes("already completed")
              ? "completed_operation"
              : execution.stop_reason?.includes("concurrent") ||
                  execution.stop_reason?.includes("already executing")
                ? "concurrent_execution"
                : execution.stop_reason?.includes("stale")
                  ? "stale_state"
                  : "control_plane_stop";
        recovery = { reason, evidence_digest: persisted.journal.digest };
        break;
      }
      if (execution.result?.status === "failed" || execution.refreshed_decision === null) {
        throw new CliError({
          code: "E_RUNTIME",
          message:
            execution.result?.detail ??
            execution.stop_reason ??
            "Task advance could not complete the registered deterministic transition.",
          context: {
            task_id: parsed.taskId,
            step_id: step.id,
            operation_id: step.operation.id,
            state_fingerprint: step.preconditionFingerprint.digest,
          },
        });
      }
      current = execution.refreshed_decision;
    }
    if (!recovery && current.workflowStep.kind === "cli_operation") {
      const isExpectedBoundary =
        !current.executionPacket.safeToMutate ||
        (current.workflowStep.operation.id === "runner.follow" &&
          current.workflowStep.operation.params.mode === "run");
      if (!isExpectedBoundary) {
        throw new CliError({
          code: "E_RUNTIME",
          message: "Task advance exceeded its bounded deterministic transition budget.",
          context: {
            task_id: parsed.taskId,
            step_id: current.workflowStep.id,
            state_fingerprint: current.workflowStep.preconditionFingerprint.digest,
          },
        });
      }
    }
    const prepared = requirePreparedAgentWorkOrder(
      await prepareAgentWorkOrder({
        command_ctx: command,
        cwd: ctx.cwd,
        root_override: ctx.rootOverride ?? null,
        task_id: parsed.taskId,
        ...(parsed.remote ? { include_remote: true } : {}),
        runner_command: "task advance",
      }),
    );
    const packet = buildAgentActionPacket({
      decision: prepared.route_decision,
      work_order: prepared.work_order,
      ...(recovery ? { recovery } : {}),
    });
    assertAgentActionPacketHasNoChoreography(packet);

    const output = createCliEmitter();
    if (parsed.agentJson) {
      output.json(packet);
      return 0;
    }
    output.report(
      [
        { label: "task", value: packet.task_id },
        { label: "state_fingerprint", value: packet.state_fingerprint },
        { label: "action", value: packet.action.kind },
        { label: "instruction", value: packet.action.instruction },
        { label: "role", value: packet.authority.role },
        { label: "mutation", value: packet.authority.mutation },
        { label: "stop", value: packet.stop.reason },
        ...(packet.recovery ? [{ label: "recovery", value: packet.recovery.reason }] : []),
      ],
      { header: infoMessage(`task advance: ${parsed.taskId}`) },
    );
    return 0;
  };
}
