import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";

export type TaskStatusParsed = {
  taskId: string;
  route: boolean;
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
    json: raw.opts.json === true,
  }),
};

export function makeRunTaskStatusHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskStatusParsed): Promise<number> => {
    const commandCtx = await getCtx("task status");
    const decision = await buildTaskRouteDecision({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(parsed.route ? decision : decision.task);
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
        { label: "branch", value: decision.workspace.branch ?? "unknown" },
        { label: "pr_branch", value: decision.workspace.prBranch ?? "missing" },
        { label: "next_code", value: decision.nextAction.code },
        { label: "next", value: decision.nextAction.command ?? decision.nextAction.summary },
      );
      for (const blocker of decision.blockers) {
        entries.push({ label: "blocker", value: `${blocker.code}: ${blocker.summary}` });
      }
    }
    output.report(entries, { header: infoMessage(`task status: ${parsed.taskId}`) });
    return 0;
  };
}
