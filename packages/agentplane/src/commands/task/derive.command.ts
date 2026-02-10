import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { toStringList } from "../../cli/spec/parse-utils.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskDerive } from "./derive.js";

export type TaskDeriveParsed = {
  spikeId: string;
  title: string;
  description: string;
  owner: string;
  priority: "low" | "normal" | "med" | "high";
  tags: string[];
};

export const taskDeriveSpec: CommandSpec<TaskDeriveParsed> = {
  id: ["task", "derive"],
  group: "Task",
  summary: "Derive an implementation task from a spike task (adds depends_on on the spike).",
  args: [
    {
      name: "spike-id",
      required: true,
      valueHint: "<task-id>",
      description: "Spike task id (must have tag spike).",
    },
  ],
  options: [
    {
      kind: "string",
      name: "title",
      valueHint: "<text>",
      required: true,
      description: "Task title.",
    },
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      required: true,
      description: "Task description (will be annotated with spike provenance).",
    },
    { kind: "string", name: "owner", valueHint: "<id>", required: true, description: "Owner id." },
    {
      kind: "string",
      name: "priority",
      valueHint: "<low|normal|med|high>",
      choices: ["low", "normal", "med", "high"],
      default: "med",
      description: "Task priority (default: med).",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      minCount: 1,
      description: "Repeatable. Adds a tag (must provide at least one).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task derive 202602070101-ABCD --title "Implement X" --description "Do the thing" --owner CODER --tag code',
      why: "Create an implementation task derived from a spike.",
    },
  ],
  validateRaw: (raw) => {
    const tags = toStringList(raw.opts.tag);
    if (tags.some((t) => t.trim() === "")) {
      throw usageError({
        spec: taskDeriveSpec,
        command: "task derive",
        message: "Invalid value for --tag: empty.",
      });
    }
  },
  parse: (raw) => ({
    spikeId: typeof raw.args["spike-id"] === "string" ? raw.args["spike-id"] : "",
    title: raw.opts.title as string,
    description: raw.opts.description as string,
    owner: raw.opts.owner as string,
    priority: (raw.opts.priority as TaskDeriveParsed["priority"]) ?? "med",
    tags: toStringList(raw.opts.tag),
  }),
};

export function makeRunTaskDeriveHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskDeriveParsed): Promise<number> => {
    return await cmdTaskDerive({
      ctx: await getCtx("task derive"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      spikeId: p.spikeId,
      title: p.title,
      description: p.description,
      owner: p.owner,
      priority: p.priority,
      tags: p.tags,
    });
  };
}
