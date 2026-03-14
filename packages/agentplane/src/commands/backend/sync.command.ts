import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { COMMAND_SNIPPETS } from "../../cli/command-snippets.js";
import { usageError } from "../../cli/spec/errors.js";
import { suggestOne } from "../../cli/spec/suggest.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  cmdBackendMigrateCanonicalStateParsed,
  cmdBackendSyncParsed,
  type BackendMigrateCanonicalStateParsed,
  type BackendSyncParsed,
} from "../backend.js";

type BackendRootParsed = { cmd: string[] };

export const backendSpec: CommandSpec<BackendRootParsed> = {
  id: ["backend"],
  group: "Backend",
  summary: "Backend-related operations.",
  description:
    "This is a command group. Use a subcommand such as `agentplane backend sync ...` or `agentplane backend migrate-canonical-state ...`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [{ cmd: COMMAND_SNIPPETS.backendSync.pullLocal, why: "Sync the backend." }],
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
    { cmd: COMMAND_SNIPPETS.backendSync.pullLocal, why: "Pull from backend." },
    {
      cmd: COMMAND_SNIPPETS.backendSync.pushRedmineWithYes,
      why: "Push to a networked backend with explicit approval.",
    },
  ],
  parse: (raw) => ({
    backendId: String(raw.args.id),
    direction: (raw.opts.direction ?? "push") as BackendSyncParsed["direction"],
    conflict: (raw.opts.conflict ?? "diff") as BackendSyncParsed["conflict"],
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export const backendMigrateCanonicalStateSpec: CommandSpec<BackendMigrateCanonicalStateParsed> = {
  id: ["backend", "migrate-canonical-state"],
  group: "Backend",
  summary: "Backfill canonical_state for issues in the configured backend.",
  args: [{ name: "id", required: true, valueHint: "<id>", description: "Configured backend id." }],
  options: [
    { kind: "boolean", name: "yes", default: false, description: "Auto-approve network access." },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    {
      cmd: "agentplane backend migrate-canonical-state redmine --yes",
      why: "Backfill structured canonical_state into legacy Redmine issues.",
    },
  ],
  parse: (raw) => ({
    backendId: String(raw.args.id),
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

function runBackendRootGroup(_ctx: CommandCtx, p: BackendRootParsed): Promise<number> {
  const input = p.cmd.join(" ");
  const suggestion = suggestOne(input, ["sync", "migrate-canonical-state"]);
  const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
  const msg = p.cmd.length === 0 ? "Missing subcommand." : `Unknown subcommand: ${p.cmd[0]}.`;
  throw usageError({
    spec: backendSyncSpec,
    message: `${msg}${suffix}`,
    context: { command: "backend sync" },
  });
}

export function makeRunBackendHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return runBackendRootGroup;
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

export function makeRunBackendMigrateCanonicalStateHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: BackendMigrateCanonicalStateParsed): Promise<number> => {
    const commandCtx = await getCtx("backend migrate-canonical-state");
    return await cmdBackendMigrateCanonicalStateParsed({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      flags: p,
    });
  };
}
