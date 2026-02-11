import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskNormalize } from "./normalize.js";

export type TaskNormalizeParsed = {
  quiet: boolean;
  force: boolean;
  yes: boolean;
};

export const taskNormalizeSpec: CommandSpec<TaskNormalizeParsed> = {
  id: ["task", "normalize"],
  group: "Task",
  summary: "Normalize tasks in the configured backend (stable ordering and formatting).",
  options: [
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
    { cmd: "agentplane task normalize", why: "Normalize tasks and print a short summary." },
    { cmd: "agentplane task normalize --quiet", why: "Normalize tasks without printing output." },
  ],
  parse: (raw) => ({
    quiet: raw.opts.quiet === true,
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
  }),
};

export function makeRunTaskNormalizeHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskNormalizeParsed): Promise<number> => {
    return await cmdTaskNormalize({
      ctx: await getCtx("task normalize"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      quiet: p.quiet,
      force: p.force,
      yes: p.yes,
    });
  };
}
