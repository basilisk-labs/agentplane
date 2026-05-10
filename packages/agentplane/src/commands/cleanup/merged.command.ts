import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdCleanupMerged } from "../branch/index.js";

type CleanupGroupParsed = GroupCommandParsed;

export const cleanupSpec: CommandSpec<CleanupGroupParsed> = {
  id: ["cleanup"],
  group: "Branch",
  summary: "Clean up local branches/worktrees.",
  synopsis: ["agentplane cleanup <merged> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane cleanup merged --yes", why: "Delete merged task branches/worktrees." },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export type CleanupMergedParsed = {
  base: string | null;
  yes: boolean;
  archive: boolean;
  deleteRemoteBranches: boolean;
  finalize: boolean;
  fetch: boolean;
  quiet: boolean;
};

export const cleanupMergedSpec: CommandSpec<CleanupMergedParsed> = {
  id: ["cleanup", "merged"],
  group: "Branch",
  summary: "Delete merged task branches/worktrees (branch_pr workflow).",
  options: [
    { kind: "string", name: "base", valueHint: "<name>", description: "Base branch override." },
    { kind: "boolean", name: "yes", default: false, description: "Confirm deletions." },
    {
      kind: "boolean",
      name: "archive",
      default: false,
      description: "Archive PR artifacts before deletion.",
    },
    {
      kind: "boolean",
      name: "delete-remote-branches",
      default: false,
      description: "Also delete matching remote task branches on origin.",
    },
    {
      kind: "boolean",
      name: "fetch",
      default: false,
      description: "Fetch and prune origin before candidate resolution.",
    },
    {
      kind: "boolean",
      name: "finalize",
      default: false,
      description:
        "Fetch, fast-forward the base branch, then delete merged local and remote task branches/worktrees.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    { cmd: "agentplane cleanup merged", why: "List candidates without deleting." },
    {
      cmd: "agentplane cleanup merged --yes --archive",
      why: "Delete candidates and archive PR artifacts.",
    },
    {
      cmd: "agentplane cleanup merged --yes --delete-remote-branches",
      why: "Delete candidates and matching remote task branches on origin.",
    },
    {
      cmd: "agentplane cleanup merged --fetch",
      why: "Refresh origin before evaluating cleanup candidates.",
    },
    {
      cmd: "agentplane cleanup merged --finalize",
      why: "One-command post-merge base refresh and local/remote cleanup.",
    },
  ],
  validateRaw: (raw) => {
    const base = typeof raw.opts.base === "string" ? raw.opts.base.trim() : "";
    if (raw.opts.base !== undefined && !base) {
      throw usageError({ spec: cleanupMergedSpec, message: "Invalid value for --base: empty." });
    }
  },
  parse: (raw) => ({
    base: typeof raw.opts.base === "string" ? raw.opts.base : null,
    yes: raw.opts.yes === true || raw.opts.finalize === true,
    archive: raw.opts.archive === true,
    deleteRemoteBranches: raw.opts["delete-remote-branches"] === true || raw.opts.finalize === true,
    finalize: raw.opts.finalize === true,
    fetch: raw.opts.fetch === true || raw.opts.finalize === true,
    quiet: raw.opts.quiet === true,
  }),
};

export const runCleanup: CommandHandler<CleanupGroupParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: cleanupSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["cleanup"]),
    command: "cleanup",
    contextCommand: "cleanup",
  });
};

export function makeRunCleanupMergedHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: CleanupMergedParsed): Promise<number> => {
    return await cmdCleanupMerged({
      ctx: await getCtx("cleanup merged"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      base: p.base ?? undefined,
      yes: p.yes,
      archive: p.archive,
      deleteRemoteBranches: p.deleteRemoteBranches,
      finalize: p.finalize,
      fetch: p.fetch,
      quiet: p.quiet,
    });
  };
}
