import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  deriveRouteOperatorGuidance,
  routeRunnerContextIsRelevant,
  type RouteOperatorGuidance,
} from "../shared/route-guidance.js";
import type { RouteExecutionPacket } from "../shared/route-oracle.js";

export type TaskNextActionParsed = {
  taskId: string;
  explain: boolean;
  remote: boolean;
  json: boolean;
};

export const taskNextActionSpec: CommandSpec<TaskNextActionParsed> = {
  id: ["task", "next-action"],
  group: "Task",
  summary: "Print the single safest next command for a task route.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "explain",
      default: false,
      description:
        "Include route context, approval policy, blockers, and ambiguity resolution hints.",
    },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Include hosted PR/check/review state using configured remote tools.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane task next-action 202602030608-F1Q8AB",
      why: "Get the next safe command before manually chaining diagnostics.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    explain: raw.opts.explain === true,
    remote: raw.opts.remote === true,
    json: raw.opts.json === true,
  }),
};

function executionPacketJson(packet: RouteExecutionPacket): Record<string, unknown> {
  return {
    schema_version: packet.schemaVersion,
    action_kind: packet.actionKind,
    safe_to_mutate: packet.safeToMutate,
    requires_provider_action: packet.requiresProviderAction,
    recommended_role: packet.recommendedRole,
    authoritative_checkout: packet.authoritativeCheckout,
    authoritative_checkout_path: packet.authoritativeCheckoutPath,
    mutation_path_hint: packet.mutationPathHint,
    must_run_from: packet.mustRunFrom,
    exact_argv: packet.exactArgv,
    must_not: packet.mustNot,
    return_control_when: packet.returnControlWhen,
    human_provider_action: packet.humanProviderAction,
    stale_state_check: packet.staleStateCheck,
    evidence_missing: packet.evidenceMissing,
    verification_candidate: packet.verificationCandidate,
    stop_reason: packet.stopReason,
    // Backward-compatible aliases for consumers that still read the internal TS shape.
    ...packet,
  };
}

function operatorGuidanceJson(guidance: RouteOperatorGuidance): Record<string, unknown> {
  return {
    schema_version: guidance.schemaVersion,
    schemaVersion: guidance.schemaVersion,
    can_execute_now: guidance.canExecuteNow,
    canExecuteNow: guidance.canExecuteNow,
    should_run_next_command: guidance.shouldRunNextCommand,
    shouldRunNextCommand: guidance.shouldRunNextCommand,
    operator_action: guidance.operatorAction,
    operatorAction: guidance.operatorAction,
    safe_command: guidance.safeCommand,
    safeCommand: guidance.safeCommand,
    diagnostic_command: guidance.diagnosticCommand,
    diagnosticCommand: guidance.diagnosticCommand,
    source_of_truth: {
      route: guidance.sourceOfTruth.route,
      state: guidance.sourceOfTruth.state,
      remote: guidance.sourceOfTruth.remote,
      diagnostic: guidance.sourceOfTruth.diagnostic,
    },
    sourceOfTruth: guidance.sourceOfTruth,
    freshness: guidance.freshness,
    repeat_policy: {
      allowed: guidance.repeatPolicy.allowed,
      max_attempts_before_recompute: guidance.repeatPolicy.maxAttemptsBeforeRecompute,
      maxAttemptsBeforeRecompute: guidance.repeatPolicy.maxAttemptsBeforeRecompute,
      recompute_command: guidance.repeatPolicy.recomputeCommand,
      recomputeCommand: guidance.repeatPolicy.recomputeCommand,
      stop_condition: guidance.repeatPolicy.stopCondition,
      stopCondition: guidance.repeatPolicy.stopCondition,
    },
    repeatPolicy: guidance.repeatPolicy,
    fallback: guidance.fallback,
    executor_context: {
      executor: guidance.executorContext.executor,
      runner_route_active: guidance.executorContext.runnerRouteActive,
      runnerRouteActive: guidance.executorContext.runnerRouteActive,
      current_agent_must_execute: guidance.executorContext.currentAgentMustExecute,
      currentAgentMustExecute: guidance.executorContext.currentAgentMustExecute,
      instruction: guidance.executorContext.instruction,
      warning: guidance.executorContext.warning,
    },
    executorContext: guidance.executorContext,
    runner_context: {
      runner_is_required: guidance.runnerContext.runnerIsRequired,
      runnerIsRequired: guidance.runnerContext.runnerIsRequired,
      runner_is_allowed_now: guidance.runnerContext.runnerIsAllowedNow,
      runnerIsAllowedNow: guidance.runnerContext.runnerIsAllowedNow,
      local_work_allowed_if_runner_fails: guidance.runnerContext.localWorkAllowedIfRunnerFails,
      localWorkAllowedIfRunnerFails: guidance.runnerContext.localWorkAllowedIfRunnerFails,
      runner_failure_means: guidance.runnerContext.runnerFailureMeans,
      runnerFailureMeans: guidance.runnerContext.runnerFailureMeans,
      return_control_when: guidance.runnerContext.returnControlWhen,
      returnControlWhen: guidance.runnerContext.returnControlWhen,
    },
    runnerContext: guidance.runnerContext,
    stop_reason: guidance.stopReason,
    stopReason: guidance.stopReason,
    after_command: guidance.afterCommand,
    afterCommand: guidance.afterCommand,
    stale_state_check: guidance.staleStateCheck,
    staleStateCheck: guidance.staleStateCheck,
    risks: guidance.risks.map((risk) => ({
      code: risk.code,
      summary: risk.summary,
      mitigation_command: risk.mitigationCommand,
      mitigationCommand: risk.mitigationCommand,
      stop_condition: risk.stopCondition,
      stopCondition: risk.stopCondition,
    })),
  };
}

export function makeRunTaskNextActionHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskNextActionParsed): Promise<number> => {
    const decision = await buildTaskRouteDecision({
      ctx: await getCtx("task next-action"),
      cwd: ctx.cwd,
      includeRemote: parsed.remote,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const operatorGuidance = deriveRouteOperatorGuidance(decision);
    const output = createCliEmitter();
    if (parsed.json) {
      output.json({
        task: decision.task,
        route_oracle: decision.oracle,
        execution_packet: executionPacketJson(decision.executionPacket),
        operator_guidance: operatorGuidanceJson(operatorGuidance),
        approval: {
          route_requires_approval: decision.approval.routeRequiresApproval,
          gateway_mutation_policy: decision.approval.gatewayMutationApprovalRequired,
          effective_mutation_approval: decision.approval.effectiveMutationApprovalRequired,
          ...decision.approval,
        },
        next_action: decision.nextAction,
        blockers: decision.blockers,
        source_confidence: {
          next_action: decision.sourceConfidence.next_action,
          blockers: decision.sourceConfidence.blockers,
          route: decision.sourceConfidence.route,
          remote: decision.sourceConfidence.remote,
        },
      });
      return 0;
    }
    output.report(
      [
        { label: "phase", value: decision.oracle.phase },
        { label: "authoritative_checkout", value: decision.oracle.authoritativeCheckout },
        {
          label: "authoritative_checkout_path",
          value: decision.oracle.authoritativeCheckoutPath ?? "unknown",
        },
        { label: "mutation_path_hint", value: decision.oracle.mutationPathHint ?? "none" },
        { label: "safe_to_mutate", value: decision.executionPacket.safeToMutate },
        { label: "operator_action", value: operatorGuidance.operatorAction },
        { label: "can_execute_now", value: operatorGuidance.canExecuteNow },
        {
          label: "source_of_truth",
          value:
            `route=${operatorGuidance.sourceOfTruth.route} ` +
            `diagnostic=${operatorGuidance.sourceOfTruth.diagnostic} ` +
            `remote=${operatorGuidance.sourceOfTruth.remote}`,
        },
        {
          label: "repeat_policy",
          value:
            `allowed=${String(operatorGuidance.repeatPolicy.allowed)} ` +
            `recompute=${operatorGuidance.repeatPolicy.recomputeCommand}`,
        },
        {
          label: "executor_context",
          value:
            `executor=${operatorGuidance.executorContext.executor} ` +
            `runner_route_active=${String(operatorGuidance.executorContext.runnerRouteActive)} ` +
            `instruction=${operatorGuidance.executorContext.instruction}`,
        },
        {
          label: "executor_warning",
          value: operatorGuidance.executorContext.warning,
        },
        {
          label: "fallback",
          value:
            operatorGuidance.fallback.allowed && operatorGuidance.fallback.command
              ? `${operatorGuidance.fallback.command}: ${operatorGuidance.fallback.reason ?? ""}`
              : "none",
        },
        ...(routeRunnerContextIsRelevant(operatorGuidance)
          ? [
              {
                label: "runner_context",
                value:
                  `required=${String(operatorGuidance.runnerContext.runnerIsRequired)} ` +
                  `allowed_now=${String(operatorGuidance.runnerContext.runnerIsAllowedNow)} ` +
                  `failure_means=${operatorGuidance.runnerContext.runnerFailureMeans}`,
              },
            ]
          : []),
        { label: "code", value: decision.nextAction.code },
        { label: "summary", value: decision.nextAction.summary },
        { label: "requires_approval", value: decision.nextAction.requiresApproval },
        { label: "next_command", value: decision.oracle.nextCommand ?? "none" },
        { label: "safe_command", value: operatorGuidance.safeCommand ?? "none" },
        { label: "diagnostic_command", value: operatorGuidance.diagnosticCommand ?? "none" },
        { label: "action_kind", value: decision.executionPacket.actionKind },
        { label: "recommended_role", value: decision.executionPacket.recommendedRole },
        { label: "must_run_from", value: decision.executionPacket.mustRunFrom ?? "unknown" },
        {
          label: "exact_argv",
          value: decision.executionPacket.exactArgv?.join(" ") ?? "none",
        },
        {
          label: "return_control_when",
          value: decision.executionPacket.returnControlWhen,
        },
        {
          label: "stale_state_check",
          value: decision.executionPacket.staleStateCheck,
        },
        {
          label: "evidence_missing",
          value: decision.executionPacket.evidenceMissing.join(", ") || "none",
        },
        {
          label: "requires_provider_action",
          value: decision.executionPacket.requiresProviderAction,
        },
        {
          label: "human_provider_action",
          value: decision.executionPacket.humanProviderAction ?? "none",
        },
        {
          label: "primary_blocker",
          value: decision.oracle.blocker
            ? `${decision.oracle.blocker.code}: ${decision.oracle.blocker.summary}`
            : "none",
        },
        ...(parsed.explain
          ? [
              { label: "workflow", value: decision.workflowMode },
              { label: "checkout_role", value: decision.workspace.checkoutRole },
              { label: "branch", value: decision.workspace.branch ?? "unknown" },
              { label: "base_branch", value: decision.workspace.baseBranch ?? "unknown" },
              {
                label: "route_requires_approval",
                value: decision.approval.routeRequiresApproval,
              },
              {
                label: "gateway_mutation_policy",
                value: decision.approval.gatewayMutationApprovalRequired,
              },
              {
                label: "effective_mutation_approval",
                value: decision.approval.effectiveMutationApprovalRequired,
              },
              {
                label: "runtime_approval",
                value:
                  `plan=${String(decision.approval.runtime.requirePlan)} ` +
                  `network=${String(decision.approval.runtime.requireNetwork)} ` +
                  `verify=${String(decision.approval.runtime.requireVerify)}`,
              },
            ]
          : []),
        ...decision.blockers.map((blocker) => ({
          label: "blocker",
          value: `${blocker.code}: ${blocker.summary}`,
        })),
        ...(parsed.explain
          ? decision.executionPacket.mustNot.map((rule) => ({
              label: "must_not",
              value: rule,
            }))
          : []),
        ...(parsed.explain
          ? decision.ambiguities.map((ambiguity) => ({
              label: "ambiguity",
              value: `${ambiguity.code}: ${ambiguity.summary}; resolution: ${ambiguity.resolution}`,
            }))
          : []),
        ...(parsed.explain
          ? operatorGuidance.risks.map((risk) => ({
              label: "operator_risk",
              value: `${risk.code}: ${risk.summary}; mitigation: ${risk.mitigationCommand}; stop: ${risk.stopCondition}`,
            }))
          : []),
      ],
      { header: infoMessage(`task next-action: ${parsed.taskId}`) },
    );
    return 0;
  };
}
