import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskScaffold } from "./scaffold.js";

export type TaskScaffoldParsed = {
  taskId: string;
  title?: string;
  overwrite: boolean;
  force: boolean;
  yes: boolean;
  quiet: boolean;
};

export const taskScaffoldSpec: CommandSpec<TaskScaffoldParsed> = {
  id: ["task", "scaffold"],
  group: "Task",
  summary: "Write a task README file scaffold (for the current doc template).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "title",
      valueHint: "<text>",
      description: "Optional. Title used when scaffolding a missing task with --force.",
    },
    {
      kind: "boolean",
      name: "overwrite",
      default: false,
      description: "Overwrite an existing README.md if it already exists.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Allow scaffolding even if the task is missing from the backend.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve force-action approval checks when required.",
    },
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress normal output (still prints errors).",
    },
  ],
  examples: [
    {
      cmd: "agentplane task scaffold 202602030608-F1Q8AB",
      why: "Write README.md from the existing task data.",
    },
    {
      cmd: 'agentplane task scaffold 202602030608-F1Q8AB --overwrite --title "My task" --force',
      why: "Overwrite README.md and allow missing task (uses --title).",
    },
  ],
  validateRaw: (raw) => {
    const title = raw.opts.title;
    if (typeof title === "string" && title.trim() === "") {
      throw usageError({ spec: taskScaffoldSpec, message: "Invalid value for --title: empty." });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      title: typeof raw.opts.title === "string" ? raw.opts.title : undefined,
      overwrite: raw.opts.overwrite === true,
      force: raw.opts.force === true,
      yes: raw.opts.yes === true,
      quiet: raw.opts.quiet === true,
    };
  },
};

export function makeRunTaskScaffoldHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskScaffoldParsed): Promise<number> => {
    return await cmdTaskScaffold({
      ctx: await getCtx("task scaffold"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      title: p.title,
      overwrite: p.overwrite,
      force: p.force,
      yes: p.yes,
      quiet: p.quiet,
    });
  };
}
