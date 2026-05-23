import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";

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
    const output = createCliEmitter();
    if (parsed.json) {
      output.json({
        task: decision.task,
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
        { label: "code", value: decision.nextAction.code },
        { label: "summary", value: decision.nextAction.summary },
        { label: "requires_approval", value: decision.nextAction.requiresApproval },
        { label: "command", value: decision.nextAction.command ?? "none" },
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
          ? decision.ambiguities.map((ambiguity) => ({
              label: "ambiguity",
              value: `${ambiguity.code}: ${ambiguity.summary}; resolution: ${ambiguity.resolution}`,
            }))
          : []),
      ],
      { header: infoMessage(`task next-action: ${parsed.taskId}`) },
    );
    return 0;
  };
}
