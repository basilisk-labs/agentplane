import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { deriveRouteOperatorGuidance } from "../shared/route-guidance.js";

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
        execution_packet: decision.executionPacket,
        operator_guidance: operatorGuidance,
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
          label: "fallback",
          value:
            operatorGuidance.fallback.allowed && operatorGuidance.fallback.command
              ? `${operatorGuidance.fallback.command}: ${operatorGuidance.fallback.reason ?? ""}`
              : "none",
        },
        {
          label: "runner_context",
          value:
            `required=${String(operatorGuidance.runnerContext.runnerIsRequired)} ` +
            `allowed_now=${String(operatorGuidance.runnerContext.runnerIsAllowedNow)} ` +
            `failure_means=${operatorGuidance.runnerContext.runnerFailureMeans}`,
        },
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
