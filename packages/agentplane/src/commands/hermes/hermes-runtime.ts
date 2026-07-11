import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { loadTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  deriveRouteOperatorGuidance,
  routeRunnerContextIsRelevant,
} from "../shared/route-guidance.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import { currentAgentplaneCommand } from "./hermes-environment.js";
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

export type HermesRoutePacketForExecution = {
  task: {
    id: string;
    title: string;
    owner: string | null;
  };
  next_action: {
    code: string;
    command?: string | null;
    summary: string;
  };
};

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

export function routeNeedsRunnerProjection(
  decision: Awaited<ReturnType<typeof buildTaskRouteDecision>>,
): boolean {
  return routeRunnerContextIsRelevant(deriveRouteOperatorGuidance(decision));
}

export async function routePacket(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride: string | null;
  taskId: string;
  includeRemote: boolean;
}) {
  const fullTask = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const decision = await buildTaskRouteDecision({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    includeRemote: opts.includeRemote,
  });
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
  return {
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

export function executableStepFor(packet: HermesRoutePacketForExecution): {
  code: string;
  args: string[] | null;
  reason: string | null;
} {
  const taskId = packet.task.id;
  const owner = packet.task.owner ?? "CODER";
  const normalizedSlug = packet.task.title
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .replaceAll(/-{2,}/g, "-")
    .slice(0, 48)
    .replaceAll(/-+$/g, "");
  const slug = normalizedSlug.length > 0 ? normalizedSlug : "hermes-work";
  switch (packet.next_action.code) {
    case "update_pr_artifacts":
    case "verify_or_update_pr": {
      return { code: packet.next_action.code, args: ["pr", "update", taskId], reason: null };
    }
    case "open_pr": {
      return {
        code: packet.next_action.code,
        args: ["pr", "open", taskId, "--author", owner, "--sync-only"],
        reason: null,
      };
    }
    case "continue_direct": {
      return {
        code: packet.next_action.code,
        args: ["task", "verify-show", taskId],
        reason: null,
      };
    }
    case "complete_direct": {
      return {
        code: packet.next_action.code,
        args: null,
        reason:
          "direct closeout needs operator-supplied --result and --commit values; do not rerun task execution",
      };
    }
    case "approve_plan": {
      return {
        code: packet.next_action.code,
        args: null,
        reason:
          "plan approval is an orchestration decision and is not executed by Hermes worker lanes",
      };
    }
    case "wait_runner":
    case "wait_hosted_checks":
    case "merge_close_tail":
    case "done":
    case "cleanup": {
      return { code: packet.next_action.code, args: null, reason: packet.next_action.summary };
    }
    case "start_or_recover_worktree": {
      return {
        code: packet.next_action.code,
        args: ["work", "start", taskId, "--agent", owner, "--slug", slug, "--worktree"],
        reason: null,
      };
    }
    default: {
      break;
    }
  }
  const command = packet.next_action.command?.trim() ?? "";
  const commandParts = command.length > 0 ? command.split(/\s+/u) : [];
  const subcommand = commandParts[2];
  if (
    commandParts.length === 4 &&
    commandParts[0] === "agentplane" &&
    commandParts[1] === "task" &&
    subcommand === "run" &&
    commandParts[3] === taskId
  ) {
    return { code: packet.next_action.code, args: ["task", "run", taskId], reason: null };
  }
  if (
    commandParts.length === 4 &&
    commandParts[0] === "agentplane" &&
    commandParts[1] === "task" &&
    (subcommand === "run" ||
      subcommand === "verify-show" ||
      subcommand === "status" ||
      subcommand === "brief") &&
    commandParts[3] === taskId
  ) {
    return { code: packet.next_action.code, args: ["task", subcommand, taskId], reason: null };
  }
  return {
    code: packet.next_action.code,
    args: null,
    reason: `unsupported Agentplane Hermes route action: ${packet.next_action.code}`,
  };
}

export async function runAgentplaneStep(args: string[], root: string, dryRun: boolean) {
  const command = currentAgentplaneCommand();
  const fullArgs = [...command.argsPrefix, ...args, "--root", root];
  if (dryRun) {
    return {
      executed: false,
      dry_run: true,
      command: [command.command, ...fullArgs],
      exit_code: null,
      stdout: "",
      stderr: "",
    };
  }
  try {
    const result = await execFileAsync(command.command, fullArgs, {
      cwd: root,
      env: process.env,
      maxBuffer: 1024 * 1024 * 4,
    });
    return {
      executed: true,
      dry_run: false,
      command: [command.command, ...fullArgs],
      exit_code: 0,
      stdout: result.stdout,
      stderr: result.stderr,
    };
  } catch (err) {
    const maybe = err as { code?: unknown; stdout?: unknown; stderr?: unknown; message?: string };
    return {
      executed: true,
      dry_run: false,
      command: [command.command, ...fullArgs],
      exit_code: typeof maybe.code === "number" ? maybe.code : 1,
      stdout: typeof maybe.stdout === "string" ? maybe.stdout : "",
      stderr: typeof maybe.stderr === "string" ? maybe.stderr : (maybe.message ?? String(err)),
    };
  }
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
