import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdBranchStatus } from "./index.js";

export type BranchStatusParsed = { branch: string | null; base: string | null };

export const branchStatusSpec: CommandSpec<BranchStatusParsed> = {
  id: ["branch", "status"],
  group: "Branch",
  summary: "Show ahead/behind status for a branch relative to a base branch.",
  options: [
    {
      kind: "string",
      name: "branch",
      valueHint: "<name>",
      description: "Branch name (default: current branch).",
    },
    {
      kind: "string",
      name: "base",
      valueHint: "<name>",
      description: "Base branch name (default: auto-resolved base).",
    },
  ],
  examples: [
    { cmd: "agentplane branch status", why: "Check current branch against effective base." },
    { cmd: "agentplane branch status --base main", why: "Check against an explicit base." },
  ],
  parse: (raw) => ({
    branch: typeof raw.opts.branch === "string" ? raw.opts.branch : null,
    base: typeof raw.opts.base === "string" ? raw.opts.base : null,
  }),
};

export const runBranchStatus: CommandHandler<BranchStatusParsed> = async (ctx, p) => {
  return await cmdBranchStatus({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    branch: p.branch ?? undefined,
    base: p.base ?? undefined,
  });
};
