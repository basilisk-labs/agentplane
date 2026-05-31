import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  executableStepFor,
  currentAgentplaneCommand,
  HERMES_LIFECYCLE_ACTIONS,
  hermesCliCommand,
  hermesEnvSnapshot,
  loadLaneRegistry,
  routePacket,
  runAgentplaneStep,
  runHermesLifecycle,
  type HermesLifecycleAction,
} from "./hermes-runtime.js";

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
  executeStep: boolean;
  dryRun: boolean;
};

export type HermesReconcileParsed = {
  taskId?: string;
  json: boolean;
};

export type HermesLifecycleParsed = {
  action: string;
  body: string | null;
  json: boolean;
  dryRun: boolean;
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
    {
      kind: "boolean",
      name: "execute-step",
      default: false,
      description: "Execute one allowlisted Agentplane route step for this Hermes claim.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "With --execute-step, return the planned command without executing it.",
    },
  ],
  examples: [
    {
      cmd: "agentplane hermes supervise 202605311941-K4FCKS --json",
      why: "Return a route-gated supervisor packet without executing arbitrary shell text.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
    executeStep: raw.opts["execute-step"] === true,
    dryRun: raw.opts["dry-run"] === true,
  }),
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

export const hermesLifecycleSpec: CommandSpec<HermesLifecycleParsed> = {
  id: ["hermes", "lifecycle"],
  group: "Integrations",
  summary: "Emit one Hermes Kanban lifecycle callback through the configured Hermes CLI.",
  description:
    "This is the Agentplane-side lifecycle client for Hermes worker lanes. It sends comment, block, " +
    "complete, or heartbeat callbacks through the Hermes CLI and reads task, board, and run identity " +
    "from the Hermes worker environment.",
  args: [{ name: "action", required: true, valueHint: "comment|block|complete|heartbeat" }],
  options: [
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      description: "Callback body, reason, or summary. Heartbeat uses a default body when omitted.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Return the Hermes CLI command without executing it.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane hermes lifecycle comment --body \'{"agentplane_task_id":"202605311941-K4FCKS"}\' --json',
      why: "Write a structured projection comment for the current Hermes card.",
    },
    {
      cmd: "agentplane hermes lifecycle complete --body 'Agentplane terminal evidence validated' --json",
      why: "Complete the current Hermes card after Agentplane terminal gates have passed.",
    },
  ],
  parse: (raw) => ({
    action: String(raw.args.action),
    body: typeof raw.opts.body === "string" ? raw.opts.body : null,
    json: raw.opts.json === true,
    dryRun: raw.opts["dry-run"] === true,
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
      includeRemote: false,
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
          comment_projection: packet.hermes_comment_projection,
        },
      },
      evidence_refs: packet.hermes_comment_projection.evidence_refs,
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
      includeRemote: true,
    });
    const step = executableStepFor(packet);
    const stepResult =
      parsed.executeStep && step.args
        ? await runAgentplaneStep(step.args, commandCtx.resolvedProject.gitRoot, parsed.dryRun)
        : null;
    const payload = {
      ...packet,
      hermes_run: hermesEnvSnapshot(),
      hermes_comment_projection: packet.hermes_comment_projection,
      supervisor_policy: {
        execute_raw_shell_from_route: false,
        execution_model: "classify_route_action_then_execute_allowlisted_agentplane_command",
        max_route_steps_per_claim: 1,
      },
      execution: {
        requested: parsed.executeStep,
        dry_run: parsed.dryRun,
        action: step.code,
        allowed: Boolean(step.args),
        block_reason: step.reason,
        result: stepResult,
      },
    };
    if (parsed.executeStep && !step.args && !parsed.dryRun) {
      throw new CliError({
        code: "E_USAGE",
        message: step.reason ?? "Hermes supervisor route step is not executable",
      });
    }
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
        { label: "execute_step", value: parsed.executeStep },
        { label: "execution_allowed", value: Boolean(step.args) },
      ]);
    }
    if (stepResult?.executed === true && typeof stepResult.exit_code === "number") {
      return stepResult.exit_code;
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
      local_projection: parsed.taskId
        ? await routePacket({
            ctx: commandCtx,
            cwd: ctx.cwd,
            rootOverride: ctx.rootOverride ?? null,
            taskId: parsed.taskId,
            includeRemote: false,
          })
        : null,
      checks: [
        "Hermes done but Agentplane not DONE",
        "Agentplane DONE but Hermes root card not complete",
        "duplicate Hermes cards for one Agentplane task",
        "Hermes running without current claim",
        "wrong lane for current Agentplane route phase",
      ],
      note: "This scaffold defines the reconcile contract. A Hermes plugin supplies remote board reads; Agentplane task truth remains local.",
      plugin_contract: {
        remote_board_reads_required: true,
        remote_board_writes_allowed: "through Hermes lifecycle API or CLI only",
        agentplane_truth: "local task README/frontmatter, verification, PR artifacts, and ACR",
      },
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

async function runHermesLifecycleCommand(
  _ctx: CommandCtx,
  parsed: HermesLifecycleParsed,
): Promise<number> {
  if (!HERMES_LIFECYCLE_ACTIONS.includes(parsed.action as HermesLifecycleAction)) {
    throw new CliError({
      code: "E_USAGE",
      message: `Unsupported Hermes lifecycle action: ${parsed.action}. Use one of: ${HERMES_LIFECYCLE_ACTIONS.join(", ")}`,
    });
  }
  const action = parsed.action as HermesLifecycleAction;
  const env = hermesEnvSnapshot();
  const body =
    parsed.body ??
    (action === "heartbeat"
      ? `Agentplane heartbeat for Hermes run ${env.run_id ?? "unknown"}`
      : null);
  if (!body) {
    throw new CliError({
      code: "E_USAGE",
      message: `--body is required for Hermes lifecycle action: ${action}`,
    });
  }
  const result = await runHermesLifecycle(action, {
    board: env.board,
    taskId: env.task_id,
    body,
    dryRun: parsed.dryRun,
  });
  const payload = {
    action,
    hermes_run: env,
    result,
  };
  if (parsed.json) {
    output.json(payload);
  } else {
    output.report([
      { label: "action", value: action },
      { label: "task", value: env.task_id ?? "unknown" },
      { label: "board", value: env.board ?? "default" },
      { label: "executed", value: result.executed },
    ]);
  }
  return 0;
}

export function makeRunHermesLifecycleHandler(): CommandHandler<HermesLifecycleParsed> {
  return runHermesLifecycleCommand;
}

export function makeRunHermesDoctorHandler(
  getCtx: (command: string) => Promise<CommandContext>,
): CommandHandler<HermesDoctorParsed> {
  return async (_ctx, parsed) => {
    const commandCtx = await getCtx("hermes doctor");
    const env = hermesEnvSnapshot();
    const registry = await loadLaneRegistry();
    const rawAgentplaneBin = process.env.AGENTPLANE_BIN?.trim();
    const agentplaneBin =
      rawAgentplaneBin && rawAgentplaneBin.length > 0
        ? rawAgentplaneBin
        : currentAgentplaneCommand().command;
    const hermesBin = hermesCliCommand();
    const payload = {
      ok: registry.error === null,
      repo: commandCtx.resolvedProject.gitRoot,
      workflow_mode: commandCtx.config.workflow_mode,
      recommended_workflow_for_multi_agent: "branch_pr",
      branch_pr_ready: commandCtx.config.workflow_mode === "branch_pr",
      hermes_env: env,
      missing_hermes_env: Object.entries(env)
        .filter(([key, value]) => key !== "claim_lock_present" && value === null)
        .map(([key]) => key),
      lane_registry: registry,
      binaries: {
        agentplane: agentplaneBin,
        agentplane_configured: Boolean(process.env.AGENTPLANE_BIN?.trim()),
        hermes: hermesBin,
        hermes_configured: Boolean(process.env.HERMES_BIN?.trim()),
      },
      lifecycle_client: {
        command: hermesBin,
        actions: [...HERMES_LIFECYCLE_ACTIONS],
      },
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
