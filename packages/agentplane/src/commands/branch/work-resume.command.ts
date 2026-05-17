import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";

export type WorkResumeParsed = {
  taskId: string;
  json: boolean;
};

export const workResumeSpec: CommandSpec<WorkResumeParsed> = {
  id: ["work", "resume"],
  group: "Work",
  summary: "Diagnose how to resume a task in the correct checkout/worktree.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane work resume 202602030608-F1Q8AB",
      why: "Find the correct worktree/branch route after interruption.",
    },
  ],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), json: raw.opts.json === true }),
};

export function makeRunWorkResumeHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: WorkResumeParsed): Promise<number> => {
    const decision = await buildTaskRouteDecision({
      ctx: await getCtx("work resume"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(decision);
      return 0;
    }
    output.report(
      [
        { label: "workspace", value: decision.workspace.root },
        { label: "current_branch", value: decision.workspace.branch ?? "unknown" },
        { label: "base_branch", value: decision.workspace.baseBranch ?? "unknown" },
        { label: "pr_branch", value: decision.workspace.prBranch ?? "missing" },
        { label: "next_code", value: decision.nextAction.code },
        { label: "next", value: decision.nextAction.command ?? decision.nextAction.summary },
        ...decision.repairPlan.map((step) => ({
          label: "repair_step",
          value: `${step.code}: ${step.command ?? step.summary}`,
        })),
      ],
      { header: infoMessage(`work resume: ${parsed.taskId}`) },
    );
    return 0;
  };
}
