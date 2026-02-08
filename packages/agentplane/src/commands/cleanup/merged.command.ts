import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import { suggestOne } from "../../cli2/suggest.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdCleanupMerged } from "../branch/index.js";

type CleanupGroupParsed = { cmd: string[] };

export const cleanupSpec: CommandSpec<CleanupGroupParsed> = {
  id: ["cleanup"],
  group: "Branch",
  summary: "Clean up local branches/worktrees.",
  synopsis: ["agentplane cleanup <merged> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane cleanup merged --yes", why: "Delete merged task branches/worktrees." },
  ],
  parse: (raw) => ({ cmd: (raw.args.cmd ?? []) as string[] }),
};

export type CleanupMergedParsed = {
  base: string | null;
  yes: boolean;
  archive: boolean;
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
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    { cmd: "agentplane cleanup merged", why: "List candidates without deleting." },
    {
      cmd: "agentplane cleanup merged --yes --archive",
      why: "Delete candidates and archive PR artifacts.",
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
    yes: raw.opts.yes === true,
    archive: raw.opts.archive === true,
    quiet: raw.opts.quiet === true,
  }),
};

export const runCleanup: CommandHandler<CleanupGroupParsed> = (_ctx, p) => {
  const input = p.cmd.join(" ");
  const candidates = ["merged"];
  const suggestion = suggestOne(input, candidates);
  const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
  const msg = p.cmd.length === 0 ? "Missing subcommand." : `Unknown subcommand: ${p.cmd[0]}.`;
  return Promise.reject(
    usageError({
      spec: cleanupSpec,
      command: "cleanup",
      message: `${msg}${suffix}`,
      context: { command: "cleanup" },
    }),
  );
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
      quiet: p.quiet,
    });
  };
}
