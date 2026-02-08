import type { CommandCtx, CommandSpec } from "../cli2/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import { cmdSyncParsed, type SyncParsed } from "./backend.js";

export const syncSpec: CommandSpec<SyncParsed> = {
  id: ["sync"],
  group: "Backend",
  summary: "Sync the configured backend (alias).",
  description:
    "Alias for backend sync using the configured backend id. Optionally pass an explicit backend id.",
  args: [
    {
      name: "id",
      required: false,
      valueHint: "<id>",
      description: "Optional backend id (must match configured backend id).",
    },
  ],
  options: [
    {
      kind: "string",
      name: "direction",
      valueHint: "<push|pull>",
      choices: ["push", "pull"],
      default: "push",
      description: "Sync direction (default: push).",
    },
    {
      kind: "string",
      name: "conflict",
      valueHint: "<diff|prefer-local|prefer-remote|fail>",
      choices: ["diff", "prefer-local", "prefer-remote", "fail"],
      default: "diff",
      description: "Conflict handling policy (default: diff).",
    },
    { kind: "boolean", name: "yes", default: false, description: "Auto-approve network access." },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    { cmd: "agentplane sync --direction pull", why: "Pull from backend (configured backend id)." },
    { cmd: "agentplane sync redmine --direction push --yes", why: "Push to redmine backend." },
  ],
  parse: (raw) => ({
    backendId: raw.args.id ? String(raw.args.id) : null,
    direction: (raw.opts.direction ?? "push") as SyncParsed["direction"],
    conflict: (raw.opts.conflict ?? "diff") as SyncParsed["conflict"],
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunSyncHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: SyncParsed): Promise<number> => {
    const commandCtx = await getCtx("sync");
    return await cmdSyncParsed({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      flags: p,
    });
  };
}
