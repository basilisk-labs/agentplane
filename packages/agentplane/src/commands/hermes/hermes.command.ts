import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";

export type HermesEnqueueParsed = {
  taskId: string;
  board: string;
  assignee: string;
  role: string;
  workspace: string | null;
  json: boolean;
};

export type HermesSuperviseParsed = {
  taskId: string;
  json: boolean;
};

export type HermesReconcileParsed = {
  taskId?: string;
  json: boolean;
};

export type HermesDoctorParsed = {
  json: boolean;
};

const output = createCliEmitter();

export const hermesSpec: CommandSpec<GroupCommandParsed> = {
  id: ["hermes"],
  group: "Integrations",
  summary: "Inspect the Agentplane-owned Hermes adapter contract.",
  description:
    "This command group exposes the repo-local Agentplane side of the Hermes Kanban adapter. " +
    "It does not talk directly to the Hermes SQLite database; Hermes-side plugins should call " +
    "these commands through the CLI or a typed wrapper.",
  synopsis: ["agentplane hermes <enqueue|supervise|reconcile|doctor> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane hermes enqueue 202605311941-K4FCKS --json",
      why: "Render the provider-safe Hermes projection for one Agentplane task.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const hermesEnqueueSpec: CommandSpec<HermesEnqueueParsed> = {
  id: ["hermes", "enqueue"],
  group: "Integrations",
  summary: "Render a provider-safe Hermes Kanban card projection for a task.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "board",
      default: "agentplane",
      valueHint: "<slug>",
      description: "Hermes board slug for the projected card.",
    },
    {
      kind: "string",
      name: "assignee",
      default: "agentplane-supervisor",
      valueHint: "<lane>",
      description: "Hermes assignee or lane that should own the projected root card.",
    },
    {
      kind: "string",
      name: "role",
      default: "CODER",
      valueHint: "<ROLE>",
      description: "Agentplane role represented by the projected Hermes card.",
    },
    {
      kind: "string",
      name: "workspace",
      valueHint: "dir:/abs/repo",
      description: "Hermes workspace spec. Defaults to the Agentplane repository root.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane hermes enqueue 202605311941-K4FCKS --board my-repo --json",
      why: "Build the card body/metadata a Hermes plugin should create idempotently.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    board: typeof raw.opts.board === "string" ? raw.opts.board : "agentplane",
    assignee: typeof raw.opts.assignee === "string" ? raw.opts.assignee : "agentplane-supervisor",
    role: typeof raw.opts.role === "string" ? raw.opts.role : "CODER",
    workspace: typeof raw.opts.workspace === "string" ? raw.opts.workspace : null,
    json: raw.opts.json === true,
  }),
};

export const hermesSuperviseSpec: CommandSpec<HermesSuperviseParsed> = {
  id: ["hermes", "supervise"],
  group: "Integrations",
  summary: "Compute the next safe Agentplane route step for a Hermes supervisor run.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane hermes supervise 202605311941-K4FCKS --json",
      why: "Return a route-gated supervisor packet without executing arbitrary shell text.",
    },
  ],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), json: raw.opts.json === true }),
};

export const hermesReconcileSpec: CommandSpec<HermesReconcileParsed> = {
  id: ["hermes", "reconcile"],
  group: "Integrations",
  summary: "Inspect Hermes projection drift without mutating Agentplane task truth.",
  options: [
    {
      kind: "string",
      name: "task-id",
      valueHint: "<task-id>",
      description: "Limit reconcile diagnostics to one Agentplane task id.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane hermes reconcile --task-id 202605311941-K4FCKS --json",
      why: "Inspect the local Agentplane side of a Hermes projection.",
    },
  ],
  parse: (raw) => ({
    taskId: typeof raw.opts["task-id"] === "string" ? raw.opts["task-id"] : undefined,
    json: raw.opts.json === true,
  }),
};

export const hermesDoctorSpec: CommandSpec<HermesDoctorParsed> = {
  id: ["hermes", "doctor"],
  group: "Integrations",
  summary: "Check the local Agentplane side of the Hermes adapter contract.",
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane hermes doctor --json",
      why: "Check workflow mode, repo root, and Hermes Kanban environment variables.",
    },
  ],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

export async function runHermesGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  return throwGroupCommandUsage({
    spec: hermesSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["hermes"]),
    command: "hermes",
    contextCommand: "hermes",
  });
}

function taskTerminalForHermesComplete(task: {
  status: string;
  verification: string | null;
}): boolean {
  const statusDone = task.status.trim().toUpperCase() === "DONE";
  const verificationState = task.verification?.trim().toLowerCase() ?? "";
  return statusDone && verificationState === "ok";
}

function hermesEnvSnapshot() {
  return {
    task_id: process.env.HERMES_KANBAN_TASK ?? null,
    board: process.env.HERMES_KANBAN_BOARD ?? null,
    db: process.env.HERMES_KANBAN_DB ?? null,
    run_id: process.env.HERMES_KANBAN_RUN_ID ?? null,
    workspace: process.env.HERMES_KANBAN_WORKSPACE ?? null,
    claim_lock_present: Boolean(process.env.HERMES_KANBAN_CLAIM_LOCK),
  };
}

async function routePacket(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride: string | null;
  taskId: string;
}) {
  const fullTask = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const decision = await buildTaskRouteDecision({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    includeRemote: false,
  });
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
    terminal: {
      hermes_root_complete_allowed: taskTerminalForHermesComplete(decision.task),
      required_gate:
        "Agentplane DONE + verification ok + branch_pr finish/integration evidence + ACR validation",
    },
    projection_boundary: {
      hermes_authority: "dispatch_run_lifecycle",
      agentplane_authority: "engineering_task_lifecycle",
      status_sync: "projection_only",
    },
  };
}

export function makeRunHermesEnqueueHandler(
  getCtx: (command: string) => Promise<CommandContext>,
): CommandHandler<HermesEnqueueParsed> {
  return async (ctx, parsed) => {
    const commandCtx = await getCtx("hermes enqueue");
    const packet = await routePacket({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const payload = {
      idempotency_key: `agentplane:${commandCtx.resolvedProject.gitRoot}:${parsed.taskId}:${parsed.role}`,
      board: parsed.board,
      assignee: parsed.assignee,
      workspace: parsed.workspace ?? `dir:${commandCtx.resolvedProject.gitRoot}`,
      title: packet.task.title,
      body:
        `Agentplane task: ${parsed.taskId}\n` +
        `Repo: ${commandCtx.resolvedProject.gitRoot}\n` +
        "Mode: Agentplane-owned Hermes supervisor. Complete the root card only after Agentplane terminal evidence validates.",
      metadata: {
        agentplane: {
          repo: commandCtx.resolvedProject.gitRoot,
          task_id: parsed.taskId,
          task_revision: packet.task.revision,
          workflow_mode: commandCtx.config.workflow_mode,
          role: parsed.role,
          authority: packet.projection_boundary,
        },
      },
      sync_field_policies: {
        status: {
          authority: "agentplane",
          remote_field: "hermes.status",
          conflict_policy: "agentplane_wins",
        },
        dispatch_status: {
          authority: "derived",
          remote_field: "hermes.status",
          conflict_policy: "record",
        },
      },
    };
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report([
        { label: "task", value: parsed.taskId },
        { label: "board", value: payload.board },
        { label: "assignee", value: payload.assignee },
        { label: "idempotency_key", value: payload.idempotency_key },
        { label: "workspace", value: payload.workspace },
      ]);
    }
    return 0;
  };
}

export function makeRunHermesSuperviseHandler(
  getCtx: (command: string) => Promise<CommandContext>,
): CommandHandler<HermesSuperviseParsed> {
  return async (ctx, parsed) => {
    const commandCtx = await getCtx("hermes supervise");
    const packet = await routePacket({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const payload = {
      ...packet,
      hermes_run: hermesEnvSnapshot(),
      supervisor_policy: {
        execute_raw_shell_from_route: false,
        execution_model: "classify_route_action_then_execute_allowlisted_agentplane_command",
        max_route_steps_per_claim: 1,
      },
    };
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report([
        { label: "task", value: packet.task.id },
        { label: "phase", value: packet.route_oracle.phase },
        { label: "next_action", value: packet.next_action.code },
        { label: "safe_to_mutate", value: packet.execution_packet.safeToMutate },
        {
          label: "hermes_root_complete_allowed",
          value: packet.terminal.hermes_root_complete_allowed,
        },
      ]);
    }
    return 0;
  };
}

export function makeRunHermesReconcileHandler(
  getCtx: (command: string) => Promise<CommandContext>,
): CommandHandler<HermesReconcileParsed> {
  return async (ctx, parsed) => {
    const commandCtx = await getCtx("hermes reconcile");
    const payload = {
      mode: "read_only",
      repo: commandCtx.resolvedProject.gitRoot,
      task_id: parsed.taskId ?? null,
      hermes_run: hermesEnvSnapshot(),
      checks: [
        "Hermes done but Agentplane not DONE",
        "Agentplane DONE but Hermes root card not complete",
        "duplicate Hermes cards for one Agentplane task",
        "Hermes running without current claim",
        "wrong lane for current Agentplane route phase",
      ],
      note: "This scaffold defines the reconcile contract. A Hermes plugin supplies remote board reads; Agentplane task truth remains local.",
    };
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report([
        { label: "mode", value: payload.mode },
        { label: "repo", value: payload.repo },
        { label: "task", value: payload.task_id ?? "all" },
        { label: "remote_board_reads", value: "plugin_required" },
      ]);
    }
    return 0;
  };
}

export function makeRunHermesDoctorHandler(
  getCtx: (command: string) => Promise<CommandContext>,
): CommandHandler<HermesDoctorParsed> {
  return async (_ctx, parsed) => {
    const commandCtx = await getCtx("hermes doctor");
    const env = hermesEnvSnapshot();
    const payload = {
      ok: true,
      repo: commandCtx.resolvedProject.gitRoot,
      workflow_mode: commandCtx.config.workflow_mode,
      recommended_workflow_for_multi_agent: "branch_pr",
      branch_pr_ready: commandCtx.config.workflow_mode === "branch_pr",
      hermes_env: env,
      missing_hermes_env: Object.entries(env)
        .filter(([key, value]) => key !== "claim_lock_present" && value === null)
        .map(([key]) => key),
      adapter_status: "agentplane_side_ready; hermes_plugin_required_for_live_board_mutation",
    };
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report([
        { label: "repo", value: payload.repo },
        { label: "workflow_mode", value: payload.workflow_mode },
        { label: "branch_pr_ready", value: payload.branch_pr_ready },
        { label: "adapter_status", value: payload.adapter_status },
      ]);
    }
    return 0;
  };
}
