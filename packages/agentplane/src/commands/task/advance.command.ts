import type { CommandCtx } from "../../cli/spec/spec.js";
import { computePlanDigest } from "@agentplaneorg/core/tasks";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import {
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import { CliError } from "../../shared/errors.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  preparePersistedSupervisorReplacementAfterFailure,
  supervisePersistedWorkflowEpisode,
} from "../shared/supervisor-execution-episode.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  resolveTaskOwnerCommandContext,
} from "../shared/task-backend.js";

import { executeBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";
import {
  assertAgentActionPacketHasNoChoreography,
  buildAgentActionPacket,
} from "./agent-action-packet.js";
import { recordDirectTaskFormalOperation } from "./direct-task-supervisor-formal-operation.js";
import { finishDirectTask } from "./direct-task-finalization.js";
import {
  acceptExternalAgentResult,
  issueExternalAgentExchange,
} from "./external-agent-supervisor.js";
import { recoverPendingExternalAgentResult } from "./external-agent-supervisor-recovery.js";
import { executeExternalAgentVerification } from "./external-agent-verification.js";
import { resolveConfiguredAuthority } from "./configured-authority.js";
import type { TaskAdvanceParsed } from "./advance.spec.js";

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
    const initialCommand = await deps.getContext("task advance", { includeRemote: parsed.remote });
    const command = await resolveTaskOwnerCommandContext({
      ctx: initialCommand,
      taskId: parsed.taskId,
    });
    const decide = async (freshHead = false): Promise<TaskRouteDecision> => {
      const routeCommand = freshHead
        ? await loadCommandContext({
            cwd: command.resolvedProject.gitRoot,
            rootOverride: null,
          })
        : command;
      return await buildTaskRouteDecision({
        ctx: routeCommand,
        cwd: routeCommand.resolvedProject.gitRoot,
        rootOverride: null,
        includeRemote: parsed.remote,
        freshHead,
        taskId: parsed.taskId,
      });
    };
    let current: TaskRouteDecision;
    if (parsed.result) {
      const accepted = await acceptExternalAgentResult({
        ctx,
        command,
        task_id: parsed.taskId,
        result_path: parsed.result,
        include_remote: parsed.remote,
      });
      const checkout = accepted.executionPacket.mustRunFrom ?? accepted.workspace.root;
      const refreshedCommand = await loadCommandContext({ cwd: checkout, rootOverride: null });
      current = await buildTaskRouteDecision({
        ctx: refreshedCommand,
        cwd: checkout,
        rootOverride: null,
        includeRemote: parsed.remote,
        taskId: parsed.taskId,
      });
    } else {
      const routed = await decide();
      current =
        (await recoverPendingExternalAgentResult({
          command,
          task_id: parsed.taskId,
          current_decision: routed,
          accept_result: async ({ cwd, result_path }) =>
            await acceptExternalAgentResult({
              ctx: { cwd },
              command,
              task_id: parsed.taskId,
              result_path,
              include_remote: parsed.remote,
            }),
        })) ?? routed;
    }
    let replacementPrepared = false;
    if (parsed.replacement) {
      const replacement = await preparePersistedSupervisorReplacementAfterFailure({
        git_root: command.resolvedProject.gitRoot,
        task_id: parsed.taskId,
        state_fingerprint_digest: current.workflowStep.preconditionFingerprint.digest,
      });
      if (replacement === "not_failed") {
        throw new CliError({
          code: "E_USAGE",
          message:
            "task advance --replacement requires a terminal failed operation or an episode-count-only budget stop.",
        });
      }
      replacementPrepared = true;
    }
    let recovery: Parameters<typeof buildAgentActionPacket>[0]["recovery"];
    let verificationAttempted = false;
    for (let operationCount = 0; operationCount < 32; operationCount += 1) {
      const step = current.workflowStep;
      if (step.kind === "approval") {
        // Repository authority is policy, so it must come from the trusted base checkout.
        // The current step may intentionally run inside a mutable task worktree.
        const authorityCheckout =
          current.workspace.baseCheckoutPath ?? command.resolvedProject.gitRoot;
        const authorityCommand = await loadCommandContext({
          cwd: authorityCheckout,
          rootOverride: null,
        });
        const resolved = await resolveConfiguredAuthority({
          command: authorityCommand,
          decision: current,
        });
        if (resolved.state === "granted") {
          current = await decide(true);
          continue;
        }
      }
      if (step.kind === "agent_episode" && step.episode.purpose === "verification") {
        if (verificationAttempted) break;
        verificationAttempted = true;
        const checkout = current.executionPacket.mustRunFrom ?? current.workspace.root;
        const verificationCommand = await loadCommandContext({ cwd: checkout, rootOverride: null });
        const verifyDecision = async () =>
          await buildTaskRouteDecision({
            ctx: verificationCommand,
            cwd: checkout,
            rootOverride: null,
            includeRemote: parsed.remote,
            freshHead: true,
            taskId: parsed.taskId,
          });
        current = await executeExternalAgentVerification({
          ctx: { cwd: checkout },
          command: verificationCommand,
          decision: current,
          decide: verifyDecision,
        });
        continue;
      }
      if (
        step.kind === "terminal" &&
        current.workflowMode === "direct" &&
        step.id === "task.complete.input"
      ) {
        if (current.task.verification !== "ok" || !current.task.commit) {
          throw new CliError({
            code: "E_RUNTIME",
            message:
              "Direct terminal route is missing verified implementation evidence " +
              `(verification=${current.task.verification ?? "missing"}, ` +
              `commit=${current.task.commit ?? "missing"}).`,
            context: {
              task_id: parsed.taskId,
              verification: current.task.verification,
              commit: current.task.commit,
            },
          });
        }
        const checkout = current.executionPacket.mustRunFrom ?? ctx.cwd;
        const closeoutCommand = await loadCommandContext({ cwd: checkout, rootOverride: null });
        const closeoutDecision = async () =>
          await buildTaskRouteDecision({
            ctx: closeoutCommand,
            cwd: checkout,
            rootOverride: null,
            includeRemote: parsed.remote,
            freshHead: true,
            taskId: parsed.taskId,
          });
        const finalized = await recordDirectTaskFormalOperation({
          git_root: closeoutCommand.resolvedProject.gitRoot,
          task_id: parsed.taskId,
          id: "task_finish",
          decision: closeoutDecision,
          run: async () => {
            const exitCode = await finishDirectTask({
              ctx: { cwd: checkout },
              command: closeoutCommand,
              task_id: parsed.taskId,
              implementation_commit: current.task.commit!,
            });
            if (exitCode !== 0) throw new Error(`Direct closeout exited with ${exitCode}.`);
            return { implementation_commit: current.task.commit };
          },
        });
        current = finalized.decision;
        continue;
      }
      if (step.kind !== "cli_operation") break;
      if (step.operation.id === "runner.follow" && step.operation.params.mode === "run") break;
      if (!current.executionPacket.safeToMutate) break;
      const persisted = await supervisePersistedWorkflowEpisode({
        decision: current,
        git_root: command.resolvedProject.gitRoot,
        task_revision: null,
        execute: async ({ operation }) =>
          await executeBranchWorkflowOperation({ decision: current, operation }),
        refresh: async () => await decide(true),
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
    const preparationCheckout =
      current.executionPacket.mustRunFrom ?? current.workspace.root ?? ctx.cwd;
    const preparationCommand = await loadCommandContext({
      cwd: preparationCheckout,
      rootOverride: null,
    });
    const preparationCtx: CommandCtx = { cwd: preparationCheckout };
    const prepared = requirePreparedAgentWorkOrder(
      await prepareAgentWorkOrder({
        command_ctx: preparationCommand,
        cwd: preparationCheckout,
        root_override: null,
        task_id: parsed.taskId,
        ...(parsed.remote ? { include_remote: true } : {}),
        runner_command: "task advance",
        prepared_route_decision: current,
      }),
    );
    const exchange = await issueExternalAgentExchange({
      ctx: preparationCtx,
      command: preparationCommand,
      decision: prepared.route_decision,
      work_order: prepared.work_order,
      replace_failed_operation: parsed.replacement && !replacementPrepared,
    });
    const resumeArgv = exchange
      ? [
          "agentplane",
          "task",
          "advance",
          parsed.taskId,
          "--result",
          exchange.paths.result,
          "--agent-json",
          ...(parsed.remote ? ["--remote"] : []),
        ]
      : null;
    const packetTask = await loadTaskFromContext({
      ctx: preparationCommand,
      taskId: parsed.taskId,
      preferBranchSnapshot: prepared.route_decision.workflowMode === "branch_pr",
    });
    const packet = buildAgentActionPacket({
      decision: prepared.route_decision,
      work_order: exchange?.work_order ?? prepared.work_order,
      ...(exchange ? { transition_id: exchange.exchange.transition_id } : {}),
      ...(exchange
        ? {
            exchange: {
              directory: exchange.paths.directory,
              work_order_ref: "work-order.json",
              result_schema_ref: "result-schema.json",
              result_ref: "result.json",
              return_invocation:
                `agentplane task advance <task_id> --result <exchange_directory>/<result_ref> --agent-json` +
                (parsed.remote ? " --remote" : ""),
              result_path: exchange.paths.result,
              resume_argv: resumeArgv!,
            },
          }
        : {}),
      ...(recovery ? { recovery } : {}),
      remote: parsed.remote,
      plan_approval_transport:
        preparationCommand.config.authority.approval_receipts.trusted_issuers.length > 0
          ? "signed_user_receipt"
          : "host_user_decision",
      plan_digest: computePlanDigest(packetTask.sections?.Plan ?? ""),
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
  };
}
