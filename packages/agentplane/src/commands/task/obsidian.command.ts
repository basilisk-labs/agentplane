import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskObsidian } from "./obsidian.js";

export type TaskObsidianParsed = {
  strictRead: boolean;
};

export const taskObsidianSpec: CommandSpec<TaskObsidianParsed> = {
  id: ["task", "obsidian"],
  group: "Task",
  summary: "Generate Obsidian-friendly Markdown task navigation under .agentplane.",
  description:
    "Writes derived Markdown indexes for browsing tasks by status, tag, owner, and dependencies without changing task READMEs as the canonical source.",
  options: [
    {
      kind: "boolean",
      name: "strict-read",
      default: false,
      description: "Fail if task scan skips malformed/unreadable task files.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task obsidian",
      why: "Write .agentplane/index.md, .agentplane/tasks.md, and grouped navigation files.",
    },
  ],
  parse: (raw) => ({
    strictRead: raw.opts["strict-read"] === true,
  }),
};

export function makeRunTaskObsidianHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskObsidianParsed): Promise<number> => {
    return await cmdTaskObsidian({
      ctx: await getCtx("task obsidian"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      strictRead: parsed.strictRead,
    });
  };
}
