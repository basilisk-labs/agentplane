import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { LoadedConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { supervisePersistedWorkflowEpisode } from "../shared/supervisor-execution-episode.js";
import { superviseWorkflowStep } from "../shared/workflow-supervisor.js";
import {
  buildHermesLifecycleRecommendation,
  currentAgentplaneCommand,
  executeHermesWorkflowOperation,
  HERMES_LIFECYCLE_ACTIONS,
  hermesCliCommand,
  hermesEnvSnapshot,
  loadHermesStateSnapshot,
  loadLaneRegistry,
  prepareHermesRoute,
  reconcileHermesState,
  routePacket,
  runHermesLifecycle,
  type HermesLifecycleAction,
} from "./hermes-runtime.js";
import {
  hermesSpec,
  type HermesDoctorParsed,
  type HermesEnqueueParsed,
  type HermesLifecycleParsed,
  type HermesReconcileParsed,
  type HermesSuperviseParsed,
} from "./hermes-specs.js";

const output = createCliEmitter();
export {
  hermesDoctorSpec,
  hermesEnqueueSpec,
  hermesLifecycleSpec,
  hermesReconcileSpec,
  hermesSpec,
  hermesSuperviseSpec,
  type HermesDoctorParsed,
  type HermesEnqueueParsed,
  type HermesLifecycleParsed,
  type HermesReconcileParsed,
  type HermesSuperviseParsed,
} from "./hermes-specs.js";

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
  getCtx: (
    command: string,
    options: { includeRemote: boolean; executeStep: boolean },
  ) => Promise<CommandContext>,
): CommandHandler<HermesSuperviseParsed> {
  return async (ctx, parsed) => {
    const commandCtx = await getCtx("hermes supervise", {
      includeRemote: parsed.remote,
      executeStep: parsed.executeStep,
    });
    const routeOpts = {
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
      ...(parsed.remote ? { includeRemote: true } : {}),
    };
    const prepared = await prepareHermesRoute(routeOpts);
    const packet = prepared.packet;
    let refreshedPacket: typeof packet | null = null;
    const persistedEpisode = parsed.executeStep
      ? await supervisePersistedWorkflowEpisode({
          decision: prepared.decision,
          git_root: commandCtx.resolvedProject.gitRoot,
          task_revision: packet.task.revision,
          execute: async ({ operation }) =>
            await executeHermesWorkflowOperation({
              ctx: commandCtx,
              cwd: ctx.cwd,
              rootOverride: ctx.rootOverride ?? null,
              includeRemote: parsed.remote,
              dryRun: parsed.dryRun,
              operation,
            }),
          refresh: async () => {
            const refreshed = await prepareHermesRoute(routeOpts);
            refreshedPacket = refreshed.packet;
            return refreshed.decision;
          },
        })
      : null;
    const supervision =
      persistedEpisode?.execution ??
      (await superviseWorkflowStep({ decision: prepared.decision, mode: "inspect" }));
    const lifecycleRecommendation = buildHermesLifecycleRecommendation(packet);
    const payload = {
      ...packet,
      ...(refreshedPacket ? { refreshed_route: refreshedPacket } : {}),
      hermes_run: hermesEnvSnapshot(),
      hermes_comment_projection: packet.hermes_comment_projection,
      supervisor_policy: {
        execute_raw_shell_from_route: false,
        execution_model: "shared_typed_workflow_operation_registry",
        max_route_steps_per_claim: 1,
      },
      workflow_supervision: {
        schema: "agentplane.workflow-supervisor.v1",
        executable: supervision.executable,
        stop_reason: supervision.stop_reason,
        operation_id: supervision.operation?.id ?? null,
        audit: supervision.audit,
        episode: persistedEpisode
          ? {
              journal_path: persistedEpisode.journal_path,
              status: persistedEpisode.journal.status,
              cursor: persistedEpisode.journal.cursor,
              usage: persistedEpisode.journal.usage,
              stop: persistedEpisode.journal.stop,
              digest: persistedEpisode.journal.digest,
            }
          : null,
      },
      lifecycle_recommendation: lifecycleRecommendation,
      execution: {
        requested: parsed.executeStep,
        dry_run: parsed.dryRun,
        action: packet.next_action.code,
        allowed: supervision.executable,
        block_reason: supervision.stop_reason,
        result: supervision.result,
      },
    };
    if (parsed.executeStep && !supervision.executable && !parsed.dryRun) {
      throw new CliError({
        code: "E_USAGE",
        message: supervision.stop_reason ?? "Hermes supervisor route step is not executable",
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
        { label: "execution_allowed", value: supervision.executable },
      ]);
    }
    if (typeof supervision.result?.exit_code === "number") {
      return supervision.result.exit_code;
    }
    return 0;
  };
}

export function makeRunHermesReconcileHandler(deps: {
  getProjectConfig: (
    command: string,
  ) => Promise<{ project: ResolvedProject; config: LoadedConfig }>;
  getProjectionContext: (command: string) => Promise<CommandContext>;
}): CommandHandler<HermesReconcileParsed> {
  return async (ctx, parsed) => {
    const projectConfig = await deps.getProjectConfig("hermes reconcile");
    const localProjection = parsed.taskId
      ? await routePacket({
          ctx: await deps.getProjectionContext("hermes reconcile"),
          cwd: ctx.cwd,
          rootOverride: ctx.rootOverride ?? null,
          taskId: parsed.taskId,
        })
      : null;
    const hermesStateCards = parsed.hermesState
      ? await loadHermesStateSnapshot(parsed.hermesState)
      : null;
    const payload = {
      mode: "read_only",
      repo: projectConfig.project.gitRoot,
      task_id: parsed.taskId ?? null,
      hermes_run: hermesEnvSnapshot(),
      local_projection: localProjection,
      hermes_state: parsed.hermesState
        ? {
            path: parsed.hermesState,
            loaded: true,
            diagnostics: reconcileHermesState(
              localProjection,
              hermesStateCards ?? [],
              parsed.taskId ?? null,
            ),
          }
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
        { label: "hermes_state", value: parsed.hermesState ?? "not provided" },
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

export function makeRunHermesDoctorHandler(deps: {
  getResolvedProject: (command: string) => Promise<ResolvedProject>;
  getLoadedConfig: (command: string) => Promise<LoadedConfig>;
}): CommandHandler<HermesDoctorParsed> {
  return async (_ctx, parsed) => {
    const [project, loadedConfig] = await Promise.all([
      deps.getResolvedProject("hermes doctor"),
      deps.getLoadedConfig("hermes doctor"),
    ]);
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
      repo: project.gitRoot,
      workflow_mode: loadedConfig.config.workflow_mode,
      recommended_workflow_for_multi_agent: "branch_pr",
      branch_pr_ready: loadedConfig.config.workflow_mode === "branch_pr",
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
