import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { COMMAND_SNIPPETS } from "../../cli/command-snippets.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  cmdBackendConnectParsed,
  cmdBackendInspectParsed,
  cmdBackendMigrateCanonicalStateParsed,
  cmdBackendSyncParsed,
  type BackendConnectParsed,
  type BackendInspectParsed,
  type BackendMigrateCanonicalStateParsed,
  type BackendSyncParsed,
} from "../backend.js";

export const backendSpec: CommandSpec<GroupCommandParsed> = {
  id: ["backend"],
  group: "Backend",
  summary: "Backend-related operations.",
  description:
    "This is a command group. Use a subcommand such as `agentplane backend sync ...`, `agentplane backend inspect ...`, `agentplane backend connect ...`, or `agentplane backend migrate-canonical-state ...`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [{ cmd: COMMAND_SNIPPETS.backendSync.pullLocal, why: "Sync the backend." }],
  parse: (raw) => parseGroupCommand(raw),
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
    {
      kind: "boolean",
      name: "watch",
      default: false,
      description: "Watch mode (pull only): periodically pull until interrupted or max iterations.",
    },
    {
      kind: "string",
      name: "interval-ms",
      valueHint: "<ms>",
      default: "30000",
      description: "Watch mode polling interval in milliseconds (default: 30000).",
    },
    {
      kind: "string",
      name: "max-iterations",
      valueHint: "<n>",
      default: "0",
      description:
        "Watch mode: stop after N iterations (0 means run until interrupted). Useful for tests.",
    },
    { kind: "boolean", name: "yes", default: false, description: "Auto-approve network access." },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    { cmd: COMMAND_SNIPPETS.backendSync.pullLocal, why: "Pull from backend." },
    {
      cmd: COMMAND_SNIPPETS.backendSync.pushCloudWithYes,
      why: "Push to a networked backend with explicit approval.",
    },
  ],
  parse: (raw) => ({
    backendId: String(raw.args.id),
    direction: (raw.opts.direction ?? "push") as BackendSyncParsed["direction"],
    conflict: (raw.opts.conflict ?? "diff") as BackendSyncParsed["conflict"],
    watch: raw.opts.watch === true,
    intervalMs:
      typeof raw.opts["interval-ms"] === "string" ? Number(raw.opts["interval-ms"]) : 30_000,
    maxIterations:
      typeof raw.opts["max-iterations"] === "string" ? Number(raw.opts["max-iterations"]) : 0,
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
      cmd: "agentplane backend migrate-canonical-state cloud --yes",
      why: "Backfill structured canonical_state through the configured cloud connector.",
    },
  ],
  parse: (raw) => ({
    backendId: String(raw.args.id),
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export const backendInspectSpec: CommandSpec<BackendInspectParsed> = {
  id: ["backend", "inspect"],
  group: "Backend",
  summary: "Inspect visible backend readiness facts without mutating remote state.",
  args: [{ name: "id", required: true, valueHint: "<id>", description: "Configured backend id." }],
  options: [
    { kind: "boolean", name: "yes", default: false, description: "Auto-approve network access." },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    {
      cmd: "agentplane backend inspect cloud --yes",
      why: "Inspect cloud backend readiness without remote writes.",
    },
  ],
  parse: (raw) => ({
    backendId: String(raw.args.id),
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export const backendConnectSpec: CommandSpec<BackendConnectParsed> = {
  id: ["backend", "connect"],
  group: "Backend",
  summary: "Configure a cloud backend connection.",
  args: [{ name: "id", required: true, valueHint: "<id>", description: "Configured backend id." }],
  options: [
    {
      kind: "string",
      name: "endpoint",
      valueHint: "<url>",
      description: "Cloud sync service endpoint.",
    },
    {
      kind: "string",
      name: "project-id",
      valueHint: "<id>",
      description: "Cloud sync service project identifier.",
    },
    {
      kind: "string",
      name: "provider",
      valueHint: "<name>",
      description: "Optional remote projection provider selected in the cloud service.",
    },
    {
      kind: "string",
      name: "token",
      valueHint: "<token>",
      description: "Cloud CLI token. Stored only in ignored project .env, not backend JSON.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Reserved for future browser flow approval.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    {
      cmd: "agentplane backend connect cloud --endpoint https://sync.agentplane.cloud --project-id proj_123 --token apc_...",
      why: "Attach this repository to a cloud sync project and keep the token in ignored .env.",
    },
  ],
  parse: (raw) => ({
    backendId: String(raw.args.id),
    endpoint: typeof raw.opts.endpoint === "string" ? raw.opts.endpoint.trim() : null,
    projectId: typeof raw.opts["project-id"] === "string" ? raw.opts["project-id"].trim() : null,
    provider: typeof raw.opts.provider === "string" ? raw.opts.provider.trim() : null,
    token: typeof raw.opts.token === "string" ? raw.opts.token.trim() : null,
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

async function runBackendRootGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: backendSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["backend"]),
    command: "backend",
    contextCommand: "backend",
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

export function makeRunBackendInspectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: BackendInspectParsed): Promise<number> => {
    const commandCtx = await getCtx("backend inspect");
    return await cmdBackendInspectParsed({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      flags: p,
    });
  };
}

export function makeRunBackendConnectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: BackendConnectParsed): Promise<number> => {
    const commandCtx = await getCtx("backend connect");
    return await cmdBackendConnectParsed({
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
