import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskBrief, type TaskBriefParsed } from "./brief-model.js";
import { reportTaskBriefText } from "./brief-render.js";

export const taskBriefSpec: CommandSpec<TaskBriefParsed> = {
  id: ["task", "brief"],
  group: "Task",
  summary: "Print an agent-ready task brief without remote lookups by default.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Include hosted PR/check/review state using configured remote tools.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task brief 202602030608-F1Q8AB",
      why: "Get local route, Verify Steps, blueprint, blockers, and next command in one view.",
    },
    {
      cmd: "agentplane task brief 202602030608-F1Q8AB --json",
      why: "Emit a machine-readable agent work context.",
    },
    {
      cmd: "agentplane task brief 202602030608-F1Q8AB --remote",
      why: "Include hosted PR truth when remote access is explicitly intended.",
    },
  ],
  notes: [
    "JSON output follows the versioned `agentplane.agent_work_context` contract.",
    "`source_confidence` marks whether each field is local, cached, computed, remote-derived, or skipped.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
    remote: raw.opts.remote === true,
  }),
};

export function makeRunTaskBriefHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskBriefParsed): Promise<number> => {
    const commandCtx = await getCtx("task brief");
    const brief = await buildTaskBrief({
      commandCtx,
      cwd: ctx.cwd,
      parsed,
      rootOverride: ctx.rootOverride ?? null,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(brief);
      return 0;
    }
    reportTaskBriefText(brief, parsed.taskId);
    return 0;
  };
}
