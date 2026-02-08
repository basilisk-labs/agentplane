import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import { suggestOne } from "../../cli2/suggest.js";

import {
  cmdBranchBaseClear,
  cmdBranchBaseExplain,
  cmdBranchBaseGet,
  cmdBranchBaseSet,
} from "./index.js";

type BranchBaseGroupParsed = { cmd: string[] };

export const branchBaseSpec: CommandSpec<BranchBaseGroupParsed> = {
  id: ["branch", "base"],
  group: "Branch",
  summary: "Manage the pinned base branch used in branch_pr workflow.",
  synopsis: ["agentplane branch base <get|set|clear|explain> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane branch base get", why: "Print the pinned base branch." },
    { cmd: "agentplane branch base set --current", why: "Pin the current branch as base." },
    { cmd: "agentplane branch base clear", why: "Clear the pinned base branch." },
    { cmd: "agentplane branch base explain", why: "Show current/pinned/effective base details." },
  ],
  parse: (raw) => ({ cmd: (raw.args.cmd ?? []) as string[] }),
};

export const branchBaseGetSpec: CommandSpec<Record<string, never>> = {
  id: ["branch", "base", "get"],
  group: "Branch",
  summary: "Print the pinned base branch.",
  parse: () => ({}),
};

export const branchBaseClearSpec: CommandSpec<Record<string, never>> = {
  id: ["branch", "base", "clear"],
  group: "Branch",
  summary: "Clear the pinned base branch.",
  parse: () => ({}),
};

export const branchBaseExplainSpec: CommandSpec<Record<string, never>> = {
  id: ["branch", "base", "explain"],
  group: "Branch",
  summary: "Explain current, pinned, and effective base branch resolution.",
  parse: () => ({}),
};

export type BranchBaseSetParsed = { value: string | null; useCurrent: boolean };

export const branchBaseSetSpec: CommandSpec<BranchBaseSetParsed> = {
  id: ["branch", "base", "set"],
  group: "Branch",
  summary: "Pin a base branch by name, or pin the current branch.",
  args: [
    {
      name: "name",
      required: false,
      valueHint: "<name>",
      description: "Branch name to pin as base (conflicts with --current).",
    },
  ],
  options: [
    {
      kind: "boolean",
      name: "current",
      description: "Pin the current branch as base (conflicts with <name>).",
      default: false,
    },
  ],
  examples: [
    { cmd: "agentplane branch base set main", why: "Pin main as the base branch." },
    { cmd: "agentplane branch base set --current", why: "Pin the current branch as base." },
  ],
  validateRaw: (raw) => {
    const name = raw.args.name ? String(raw.args.name) : "";
    const useCurrent = raw.opts.current === true;
    if (useCurrent && name) {
      throw usageError({
        spec: branchBaseSetSpec,
        message: "Invalid usage: <name> conflicts with --current.",
      });
    }
    if (!useCurrent && !name) {
      throw usageError({
        spec: branchBaseSetSpec,
        message: "Missing required argument: <name> (or pass --current).",
      });
    }
  },
  parse: (raw) => ({
    value: raw.args.name ? String(raw.args.name) : null,
    useCurrent: raw.opts.current === true,
  }),
};

export const runBranchBase: CommandHandler<BranchBaseGroupParsed> = (_ctx, p) => {
  const input = p.cmd.join(" ");
  const candidates = ["get", "set", "clear", "explain"];
  const suggestion = suggestOne(input, candidates);
  const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
  const msg = p.cmd.length === 0 ? "Missing subcommand." : `Unknown subcommand: ${p.cmd[0]}.`;
  return Promise.reject(
    usageError({
      spec: branchBaseSpec,
      command: "branch base",
      message: `${msg}${suffix}`,
      context: { command: "branch base" },
    }),
  );
};

export const runBranchBaseGet: CommandHandler<Record<string, never>> = async (ctx) => {
  return await cmdBranchBaseGet({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
};

export const runBranchBaseClear: CommandHandler<Record<string, never>> = async (ctx) => {
  return await cmdBranchBaseClear({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
};

export const runBranchBaseExplain: CommandHandler<Record<string, never>> = async (ctx) => {
  return await cmdBranchBaseExplain({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
};

export const runBranchBaseSet: CommandHandler<BranchBaseSetParsed> = async (ctx, p) => {
  return await cmdBranchBaseSet({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    value: p.value ?? undefined,
    useCurrent: p.useCurrent,
  });
};
