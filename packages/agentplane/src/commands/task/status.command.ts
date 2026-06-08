import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  deriveRouteOperatorGuidance,
  routeRunnerContextIsRelevant,
} from "../shared/route-guidance.js";

export type TaskStatusParsed = {
  taskId: string;
  route: boolean;
  remote: boolean;
  json: boolean;
};

export const taskStatusSpec: CommandSpec<TaskStatusParsed> = {
  id: ["task", "status"],
  group: "Task",
  summary: "Show task lifecycle state with optional branch_pr route decision details.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "route",
      default: false,
      description: "Include route blockers, next action, and repair-plan hints.",
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
      cmd: "agentplane task status 202602030608-F1Q8AB --route",
      why: "Inspect lifecycle and branch_pr route state before resuming work.",
    },
    {
      cmd: "agentplane task status 202602030608-F1Q8AB --route --json",
      why: "Emit machine-readable route diagnostics.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    route: raw.opts.route === true,
    remote: raw.opts.remote === true,
    json: raw.opts.json === true,
  }),
};

export function makeRunTaskStatusHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskStatusParsed): Promise<number> => {
    const commandCtx = await getCtx("task status");
    const decision = await buildTaskRouteDecision({
      ctx: commandCtx,
      cwd: ctx.cwd,
      includeRemote: parsed.remote,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const operatorGuidance = deriveRouteOperatorGuidance(decision);
    const output = createCliEmitter();
    if (parsed.json) {
      if (parsed.route) {
        const { sourceConfidence, ...routeDecision } = decision;
        output.json({
          ...routeDecision,
          operator_guidance: operatorGuidance,
          source_confidence: sourceConfidence,
        });
      } else {
        output.json(decision.task);
      }
      return 0;
    }
    const entries = [
      { label: "task", value: `${decision.task.id} ${decision.task.status}` },
      { label: "title", value: decision.task.title },
      { label: "owner", value: decision.task.owner },
      { label: "plan", value: decision.task.planApproval ?? "pending" },
      { label: "verification", value: decision.task.verification ?? "pending" },
      { label: "workflow", value: decision.workflowMode },
    ];
    if (parsed.route) {
      entries.push(
        { label: "phase", value: decision.oracle.phase },
        { label: "authoritative_checkout", value: decision.oracle.authoritativeCheckout },
        {
          label: "authoritative_checkout_path",
          value: decision.oracle.authoritativeCheckoutPath ?? "unknown",
        },
        { label: "mutation_path_hint", value: decision.oracle.mutationPathHint ?? "none" },
        { label: "safe_to_mutate", value: String(decision.executionPacket.safeToMutate) },
        { label: "branch", value: decision.workspace.branch ?? "unknown" },
        { label: "checkout_role", value: decision.workspace.checkoutRole },
        { label: "pr_branch", value: decision.workspace.prBranch ?? "missing" },
        { label: "next_code", value: decision.nextAction.code },
        { label: "next", value: decision.oracle.nextCommand ?? decision.oracle.summary },
        { label: "action_kind", value: decision.executionPacket.actionKind },
        { label: "operator_action", value: operatorGuidance.operatorAction },
        { label: "can_execute_now", value: String(operatorGuidance.canExecuteNow) },
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
        { label: "safe_command", value: operatorGuidance.safeCommand ?? "none" },
        { label: "diagnostic_command", value: operatorGuidance.diagnosticCommand ?? "none" },
        {
          label: "recommended_role",
          value: decision.executionPacket.recommendedRole,
        },
        {
          label: "requires_provider_action",
          value: String(decision.executionPacket.requiresProviderAction),
        },
        {
          label: "route_requires_approval",
          value: String(decision.approval.routeRequiresApproval),
        },
        {
          label: "gateway_mutation_policy",
          value: String(decision.approval.gatewayMutationApprovalRequired),
        },
        {
          label: "effective_mutation_approval",
          value: String(decision.approval.effectiveMutationApprovalRequired),
        },
      );
      if (decision.batchOwnership.role !== "none") {
        entries.push(
          { label: "batch_role", value: decision.batchOwnership.role },
          { label: "batch_primary", value: decision.batchOwnership.primaryTaskId },
          { label: "batch_branch", value: decision.batchOwnership.branch ?? "missing" },
          {
            label: "batch_included",
            value: decision.batchOwnership.includedTaskIds.join(", ") || "none",
          },
          {
            label: "batch_states",
            value: decision.batchOwnership.taskStates
              .map(
                (state) =>
                  `${state.id}:${state.status}:verification=${state.verification ?? "pending"}`,
              )
              .join(", "),
          },
          {
            label: "batch_next",
            value:
              decision.batchOwnership.nextOwnerAction.command ??
              decision.batchOwnership.nextOwnerAction.summary,
          },
        );
      }
      for (const blocker of decision.blockers) {
        entries.push({ label: "blocker", value: `${blocker.code}: ${blocker.summary}` });
      }
      for (const ambiguity of decision.ambiguities) {
        entries.push({
          label: "ambiguity",
          value: `${ambiguity.code}: ${ambiguity.summary}; resolution: ${ambiguity.resolution}`,
        });
      }
      for (const risk of operatorGuidance.risks) {
        entries.push({
          label: "operator_risk",
          value: `${risk.code}: ${risk.summary}; mitigation: ${risk.mitigationCommand}; stop: ${risk.stopCondition}`,
        });
      }
    }
    output.report(entries, { header: infoMessage(`task status: ${parsed.taskId}`) });
    return 0;
  };
}
