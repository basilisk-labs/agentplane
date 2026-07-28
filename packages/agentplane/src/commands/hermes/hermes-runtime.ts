import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { loadTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import {
  executeTaskRunnerExecution,
  prepareTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";
import {
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import {
  deriveRouteOperatorGuidance,
  routeRunnerContextIsRelevant,
} from "../shared/route-guidance.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { WorkflowSupervisorOperationResult } from "../shared/workflow-supervisor.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";

export {
  currentAgentplaneCommand,
  hermesEnvSnapshot,
  loadLaneRegistry,
} from "./hermes-environment.js";
export { loadHermesStateSnapshot, reconcileHermesState } from "./hermes-state.js";

const execFileAsync = promisify(execFile);

export const HERMES_LIFECYCLE_ACTIONS = ["comment", "block", "complete", "heartbeat"] as const;

export type HermesLifecycleAction = (typeof HERMES_LIFECYCLE_ACTIONS)[number];

export type HermesLocalProjection = Awaited<ReturnType<typeof routePacket>>;

function taskTerminalForHermesComplete(task: {
  status: string;
  verification: string | null;
}): boolean {
  const statusDone = task.status.trim().toUpperCase() === "DONE";
  const verificationState = task.verification?.trim().toLowerCase() ?? "";
  return statusDone && verificationState === "ok";
}

async function runnerVisibilityPacket(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride: string | null;
  taskId: string;
}) {
  const statusCommand = `agentplane task run status ${opts.taskId} --json`;
  const inspectCommand = `agentplane task run inspect ${opts.taskId} --json`;
  const eventLogsCommand = `agentplane task run logs ${opts.taskId} --stream events`;
  try {
    const inspection = await loadTaskRunnerInspection({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      task_id: opts.taskId,
    });
    return {
      latest_available: true,
      commands: {
        status: statusCommand,
        inspect: inspectCommand,
        event_logs: eventLogsCommand,
      },
      latest: {
        run_id: inspection.run_id,
        selection: inspection.selection,
        storage: inspection.storage,
        status: inspection.state.status,
        mode: inspection.state.mode,
        adapter_id: inspection.state.adapter_id,
        target: inspection.state.target,
        updated_at: inspection.state.updated_at,
        exit_code: inspection.state.result?.exit_code ?? null,
        summary: inspection.state.result?.summary ?? null,
        paths: {
          run_dir: inspection.paths.run_dir,
          events: inspection.paths.events_path,
          trace: inspection.paths.trace_path,
          stderr: inspection.paths.stderr_path,
          result: inspection.paths.result_path,
          state: inspection.paths.state_path,
        },
      },
    };
  } catch (err) {
    return {
      latest_available: false,
      commands: {
        status: statusCommand,
        inspect: inspectCommand,
        event_logs: eventLogsCommand,
      },
      latest: null,
      unavailable_reason: err instanceof Error ? err.message : String(err),
    };
  }
}

export function routeNeedsRunnerProjection(decision: TaskRouteDecision): boolean {
  return routeRunnerContextIsRelevant(deriveRouteOperatorGuidance(decision));
}

export async function prepareHermesRoute(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride: string | null;
  taskId: string;
  includeRemote?: boolean;
}) {
  const preparedWorkOrder = requirePreparedAgentWorkOrder(
    await prepareAgentWorkOrder({
      command_ctx: opts.ctx,
      cwd: opts.cwd,
      root_override: opts.rootOverride,
      task_id: opts.taskId,
      ...(opts.includeRemote ? { include_remote: true } : {}),
    }),
  );
  const fullTask = preparedWorkOrder.task_envelope.source_task;
  const decision = preparedWorkOrder.route_decision;
  const shouldProjectRunner = routeNeedsRunnerProjection(decision) || Boolean(fullTask.runner);
  const runner = shouldProjectRunner
    ? await runnerVisibilityPacket({
        ctx: opts.ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
      })
    : null;
  const terminal = {
    hermes_root_complete_allowed: taskTerminalForHermesComplete(decision.task),
    required_gate:
      "Agentplane DONE + verification ok + branch_pr finish/integration evidence + ACR validation",
  };
  const projectionBoundary = {
    hermes_authority: "dispatch_run_lifecycle",
    agentplane_authority: "engineering_task_lifecycle",
    status_sync: "projection_only",
  };
  const packet = {
    task: {
      id: decision.task.id,
      title: decision.task.title,
      status: decision.task.status,
      owner: decision.task.owner,
      revision: fullTask.revision ?? null,
      verification_state: decision.task.verification,
    },
    route_oracle: decision.oracle,
    next_action: decision.nextAction,
    execution_packet: decision.executionPacket,
    blockers: decision.blockers,
    runner,
    terminal,
    projection_boundary: projectionBoundary,
    work_order: preparedWorkOrder.work_order,
    work_order_preparation: preparedWorkOrder.preparation,
    hermes_comment_projection: {
      schema: "agentplane.hermes.lifecycle-comment.v1",
      agentplane_task_id: decision.task.id,
      task_revision: fullTask.revision ?? null,
      title: decision.task.title,
      status: decision.task.status,
      verification_state: decision.task.verification,
      route: {
        phase: decision.oracle.phase,
        next_action: decision.nextAction.code,
        next_summary: decision.nextAction.summary,
        safe_to_mutate: decision.executionPacket.safeToMutate,
        blockers: decision.blockers,
      },
      execution_packet: decision.executionPacket,
      runner,
      evidence_refs: {
        task_readme: `.agentplane/tasks/${decision.task.id}/README.md`,
        acr: `.agentplane/tasks/${decision.task.id}/acr.json`,
        ...(runner
          ? {
              runner_status: runner.commands.status,
              runner_inspect: runner.commands.inspect,
              runner_event_logs: runner.commands.event_logs,
            }
          : {}),
      },
      terminal,
      authority: projectionBoundary,
    },
  };
  return { decision, packet };
}

export async function routePacket(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride: string | null;
  taskId: string;
  includeRemote?: boolean;
}) {
  const prepared = await prepareHermesRoute(opts);
  return prepared.packet;
}

export function buildHermesLifecycleRecommendation(
  packet: Awaited<ReturnType<typeof routePacket>>,
) {
  const base = `agentplane hermes lifecycle`;
  if (packet.terminal.hermes_root_complete_allowed) {
    const body = `Agentplane task ${packet.task.id} is DONE with verification ok.`;
    return {
      action: "complete",
      command: `${base} complete --body ${JSON.stringify(body)}`,
      reason: "Agentplane task truth is terminal and verified.",
      body,
    };
  }
  if (packet.blockers.length > 0) {
    const blockerSummary = packet.blockers
      .map((blocker) => blocker.summary)
      .filter((summary) => summary.trim().length > 0)
      .join("; ");
    const body = blockerSummary || `Agentplane task ${packet.task.id} is blocked by route policy.`;
    return {
      action: "block",
      command: `${base} block --body ${JSON.stringify(body)}`,
      reason: "Agentplane route oracle reports blockers for the current task.",
      body,
    };
  }
  const body = JSON.stringify(packet.hermes_comment_projection);
  return {
    action: "comment",
    command: `${base} comment --body ${JSON.stringify(body)}`,
    reason: "Agentplane task is non-terminal; project the latest route evidence.",
    body,
  };
}

/**
 * Hermes is only an adapter. It may invoke the shared runner use case for the
 * one typed runner operation; it never reconstructs or spawns a CLI command.
 */
export async function executeHermesWorkflowOperation(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride: string | null;
  includeRemote: boolean;
  dryRun: boolean;
  operation: WorkflowOperation;
}): Promise<WorkflowSupervisorOperationResult> {
  if (opts.operation.id !== "runner.follow" || opts.operation.params.mode !== "run") {
    return {
      status: "failed",
      observed_postconditions: [],
      detail: `Hermes has no in-process executor for typed operation ${opts.operation.id}`,
      exit_code: 1,
    };
  }

  const taskId = opts.operation.params.taskId;
  if (opts.dryRun) {
    const prepared = await prepareTaskRunnerExecution({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      task_id: taskId,
      mode: "dry_run",
      ...(opts.includeRemote ? { include_remote: true } : {}),
    });
    return {
      status: "succeeded",
      observed_postconditions: ["runner_state_observed"],
      detail: `prepared runner invocation ${prepared.invocation.run_id} for ${taskId}`,
      exit_code: null,
    };
  }

  const executed = await executeTaskRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    task_id: taskId,
    ...(opts.includeRemote ? { include_remote: true } : {}),
  });
  const succeeded = executed.result.status === "success" && !executed.active_claim_cleanup;
  return {
    status: succeeded ? "succeeded" : "failed",
    observed_postconditions: ["runner_state_observed"],
    detail: executed.result.summary ?? `runner execution completed for ${taskId}`,
    exit_code: executed.result.exit_code,
  };
}

export function hermesCliCommand(): string {
  const rawHermesBin = process.env.HERMES_BIN?.trim();
  return rawHermesBin && rawHermesBin.length > 0 ? rawHermesBin : "hermes";
}

export async function runHermesLifecycle(
  action: HermesLifecycleAction,
  opts: {
    board: string | null;
    taskId: string | null;
    body: string;
    dryRun: boolean;
  },
) {
  const args = ["kanban"];
  if (opts.board) args.push("--board", opts.board);
  args.push(action === "heartbeat" ? "heartbeat" : action);
  if (opts.taskId) args.push(opts.taskId);
  if (action === "comment") args.push("--body", opts.body);
  if (action === "block") args.push("--reason", opts.body);
  if (action === "complete") args.push("--summary", opts.body);
  if (opts.dryRun) return { executed: false, command: [hermesCliCommand(), ...args] };
  const result = await execFileAsync(hermesCliCommand(), args, { maxBuffer: 1024 * 1024 });
  return { executed: true, command: [hermesCliCommand(), ...args], stdout: result.stdout };
}
