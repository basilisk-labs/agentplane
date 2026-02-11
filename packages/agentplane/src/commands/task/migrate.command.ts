import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskMigrate } from "./migrate.js";

export type TaskMigrateParsed = {
  source?: string;
  quiet: boolean;
  force: boolean;
  yes: boolean;
};

export const taskMigrateSpec: CommandSpec<TaskMigrateParsed> = {
  id: ["task", "migrate"],
  group: "Task",
  summary: "Import tasks from an exported JSON file into the configured backend.",
  options: [
    {
      kind: "string",
      name: "source",
      valueHint: "<path>",
      description: "Path to a tasks export JSON file (defaults to config.paths.tasks_path).",
    },
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress normal output (still prints errors).",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Accepted for parity; currently has no additional checks in the node CLI.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve force-action approval checks when required.",
    },
  ],
  examples: [
    { cmd: "agentplane task migrate", why: "Import from the default export path." },
    {
      cmd: "agentplane task migrate --source tasks-export.json",
      why: "Import from a custom file.",
    },
  ],
  parse: (raw) => ({
    source: typeof raw.opts.source === "string" ? raw.opts.source : undefined,
    quiet: raw.opts.quiet === true,
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
  }),
};

export function makeRunTaskMigrateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskMigrateParsed): Promise<number> => {
    return await cmdTaskMigrate({
      ctx: await getCtx("task migrate"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      source: p.source,
      quiet: p.quiet,
      force: p.force,
      yes: p.yes,
    });
  };
}
