import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskExport } from "./export.js";

export type TaskExportParsed = Record<string, never>;

export const taskExportSpec: CommandSpec<TaskExportParsed> = {
  id: ["task", "export"],
  group: "Task",
  summary: "Export tasks to the configured tasks export path (typically .agentplane/tasks.json).",
  examples: [{ cmd: "agentplane task export", why: "Write tasks export JSON and print the path." }],
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
