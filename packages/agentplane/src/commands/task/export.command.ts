import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskExport } from "./export.js";

export type TaskExportParsed = Record<string, never>;

export const taskExportSpec: CommandSpec<TaskExportParsed> = {
  id: ["task", "export"],
  group: "Task",
  summary: "Generate an optional tasks export snapshot at the configured path.",
  examples: [
    {
      cmd: "agentplane task export",
      why: "Write the optional tasks export JSON and print the path.",
    },
  ],
  parse: () => ({}),
};

export function makeRunTaskExportHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx): Promise<number> => {
    return await cmdTaskExport({
      ctx: await getCtx("task export"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
    });
  };
}
