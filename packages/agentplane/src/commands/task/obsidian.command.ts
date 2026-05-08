import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskObsidian, cmdTaskObsidianClean } from "./obsidian.js";

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

export const taskObsidianCleanSpec: CommandSpec<Record<string, never>> = {
  id: ["task", "obsidian", "clean"],
  group: "Task",
  summary: "Remove generated Obsidian task navigation files under .agentplane.",
  description:
    "Deletes only AgentPlane-generated Obsidian projection files and directories while preserving canonical task READMEs and non-generated Markdown files.",
  options: [],
  examples: [
    {
      cmd: "agentplane task obsidian clean",
      why: "Remove .agentplane/index.md, .agentplane/tasks.md, and generated grouped navigation files.",
    },
  ],
  parse: () => ({}),
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

export function makeRunTaskObsidianCleanHandler() {
  return runTaskObsidianCleanHandler;
}

async function runTaskObsidianCleanHandler(ctx: CommandCtx): Promise<number> {
  return await cmdTaskObsidianClean({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
  });
}
