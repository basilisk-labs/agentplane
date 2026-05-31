import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

import { isRecord } from "../../shared/guards.js";
import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";

const execFileAsync = promisify(execFile);

export const HERMES_LIFECYCLE_ACTIONS = ["comment", "block", "complete", "heartbeat"] as const;

export type HermesLifecycleAction = (typeof HERMES_LIFECYCLE_ACTIONS)[number];

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

export function hermesEnvSnapshot() {
  return {
    task_id: process.env.HERMES_KANBAN_TASK ?? null,
    board: process.env.HERMES_KANBAN_BOARD ?? null,
    db: process.env.HERMES_KANBAN_DB ?? null,
    run_id: process.env.HERMES_KANBAN_RUN_ID ?? null,
    workspace: process.env.HERMES_KANBAN_WORKSPACE ?? null,
    claim_lock_present: Boolean(process.env.HERMES_KANBAN_CLAIM_LOCK),
  };
}

export async function loadLaneRegistry() {
  const rawRegistryPath = process.env.ARKADY_LANE_REGISTRY?.trim();
  const registryPath = rawRegistryPath && rawRegistryPath.length > 0 ? rawRegistryPath : null;
  if (!registryPath) {
    return {
      path: null,
      loaded: false,
      error: null,
      agentplane_lanes: [] as unknown[],
    };
  }
  try {
    const parsed = JSON.parse(await readFile(registryPath, "utf8")) as unknown;
    const lanes = isRecord(parsed) ? parsed.lanes : null;
    const agentplaneLanes = Array.isArray(lanes)
      ? lanes.filter((lane) => isRecord(lane) && lane.kind === "agentplane")
      : [];
    return {
      path: registryPath,
      loaded: true,
      error: null,
      agentplane_lanes: agentplaneLanes,
    };
  } catch (err) {
    return {
      path: registryPath,
      loaded: false,
      error: err instanceof Error ? err.message : String(err),
      agentplane_lanes: [] as unknown[],
    };
  }
}

export function currentAgentplaneCommand(): { command: string; argsPrefix: string[] } {
  return { command: resolveAgentplaneBinPath(), argsPrefix: [] };
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
  const commandParts = command.split(/\s+/u);
  const subcommand = commandParts[2];
  if (
    commandParts[0] === "agentplane" &&
    commandParts[1] === "task" &&
    (subcommand === "verify-show" || subcommand === "status" || subcommand === "brief") &&
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
