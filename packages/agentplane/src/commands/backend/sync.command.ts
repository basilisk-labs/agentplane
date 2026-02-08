import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import { suggestOne } from "../../cli2/suggest.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdBackendSyncParsed, type BackendSyncParsed } from "../backend.js";

type BackendRootParsed = { cmd: string[] };

export const backendSpec: CommandSpec<BackendRootParsed> = {
  id: ["backend"],
  group: "Backend",
  summary: "Backend-related operations.",
  description: "This is a command group. Use a subcommand such as `agentplane backend sync ...`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [{ cmd: "agentplane backend sync local --direction pull", why: "Sync the backend." }],
  parse: (raw) => ({ cmd: (raw.args.cmd ?? []) as string[] }),
};

export const backendSyncSpec: CommandSpec<BackendSyncParsed> = {
  id: ["backend", "sync"],
  group: "Backend",
  summary: "Sync the configured backend (push or pull).",
  args: [{ name: "id", required: true, valueHint: "<id>", description: "Configured backend id." }],
  options: [
    {
      kind: "string",
      name: "direction",
      valueHint: "<push|pull>",
      choices: ["push", "pull"],
      required: true,
      description: "Sync direction.",
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
    { cmd: "agentplane backend sync local --direction pull", why: "Pull from backend." },
    {
      cmd: "agentplane backend sync redmine --direction push --yes",
      why: "Push to a networked backend with explicit approval.",
    },
  ],
  parse: (raw) => ({
    backendId: String(raw.args.id),
    direction: raw.opts.direction as BackendSyncParsed["direction"],
    conflict: (raw.opts.conflict ?? "diff") as BackendSyncParsed["conflict"],
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunBackendHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  const handler: CommandHandler<BackendRootParsed> = async (_ctx, p) => {
    // Resolve context once for consistent error mapping and approval gating.
    await getCtx("backend");
    const input = p.cmd.join(" ");
    const suggestion = suggestOne(input, ["sync"]);
    const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
    const msg = p.cmd.length === 0 ? "Missing subcommand." : `Unknown subcommand: ${p.cmd[0]}.`;
    throw usageError({
      spec: backendSyncSpec,
      message: `${msg}${suffix}`,
      context: { command: "backend sync" },
    });
  };

  return handler;
}

export function makeRunBackendSyncHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: BackendSyncParsed): Promise<number> => {
    const commandCtx = await getCtx("backend sync");
    return await cmdBackendSyncParsed({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      flags: p,
    });
  };
}
