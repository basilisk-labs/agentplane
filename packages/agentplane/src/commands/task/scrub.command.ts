import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskScrub } from "./scrub.js";

export type TaskScrubParsed = {
  find: string;
  replace: string;
  dryRun: boolean;
  quiet: boolean;
};

export const taskScrubSpec: CommandSpec<TaskScrubParsed> = {
  id: ["task", "scrub"],
  group: "Task",
  summary: "Replace a string across all tasks (frontmatter + docs).",
  options: [
    {
      kind: "string",
      name: "find",
      valueHint: "<text>",
      required: true,
      description: "The string to search for.",
    },
    {
      kind: "string",
      name: "replace",
      valueHint: "<text>",
      required: true,
      description: "The replacement string.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Print affected task ids without writing changes.",
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
      cmd: 'agentplane task scrub --find "agentctl" --replace "agentplane" --dry-run',
      why: "Preview which tasks would change.",
    },
  ],
  validateRaw: (raw) => {
    const find = raw.opts.find;
    const replace = raw.opts.replace;
    if (typeof find === "string" && find.trim() === "") {
      throw usageError({ spec: taskScrubSpec, message: "Invalid value for --find: empty." });
    }
    if (typeof replace === "string" && replace.trim() === "") {
      throw usageError({ spec: taskScrubSpec, message: "Invalid value for --replace: empty." });
    }
  },
  parse: (raw) => {
    return {
      find: String(raw.opts.find),
      replace: String(raw.opts.replace),
      dryRun: raw.opts["dry-run"] === true,
      quiet: raw.opts.quiet === true,
    };
  },
};

export function makeRunTaskScrubHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskScrubParsed): Promise<number> => {
    return await cmdTaskScrub({
      ctx: await getCtx("task scrub"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      find: p.find,
      replace: p.replace,
      dryRun: p.dryRun,
      quiet: p.quiet,
    });
  };
}
