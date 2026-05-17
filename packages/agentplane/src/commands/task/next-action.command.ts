import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";

export type TaskNextActionParsed = {
  taskId: string;
  json: boolean;
};

export const taskNextActionSpec: CommandSpec<TaskNextActionParsed> = {
  id: ["task", "next-action"],
  group: "Task",
  summary: "Print the single safest next command for a task route.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane task next-action 202602030608-F1Q8AB",
      why: "Get the next safe command before manually chaining diagnostics.",
    },
  ],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), json: raw.opts.json === true }),
};

export function makeRunTaskNextActionHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskNextActionParsed): Promise<number> => {
    const decision = await buildTaskRouteDecision({
      ctx: await getCtx("task next-action"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json({
        task: decision.task,
        next_action: decision.nextAction,
        blockers: decision.blockers,
      });
      return 0;
    }
    output.report(
      [
        { label: "code", value: decision.nextAction.code },
        { label: "summary", value: decision.nextAction.summary },
        { label: "requires_approval", value: decision.nextAction.requiresApproval },
        { label: "command", value: decision.nextAction.command ?? "none" },
        ...decision.blockers.map((blocker) => ({
          label: "blocker",
          value: `${blocker.code}: ${blocker.summary}`,
        })),
      ],
      { header: infoMessage(`task next-action: ${parsed.taskId}`) },
    );
    return 0;
  };
}
