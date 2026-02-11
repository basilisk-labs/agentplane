import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

import { cmdBranchRemove } from "./index.js";

export type BranchRemoveParsed = {
  branch: string | null;
  worktree: string | null;
  force: boolean;
  yes: boolean;
  quiet: boolean;
};

export const branchRemoveSpec: CommandSpec<BranchRemoveParsed> = {
  id: ["branch", "remove"],
  group: "Branch",
  summary: "Remove a task branch and/or its worktree.",
  options: [
    {
      kind: "string",
      name: "branch",
      valueHint: "<name>",
      description: "Branch name to delete.",
    },
    {
      kind: "string",
      name: "worktree",
      valueHint: "<path>",
      description: "Worktree path to remove (relative to repo root or absolute).",
    },
    { kind: "boolean", name: "force", default: false, description: "Force deletion." },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve force-action approval checks when required.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    {
      cmd: "agentplane branch remove --branch task/202602030608-F1Q8AB/cli",
      why: "Delete a branch.",
    },
    {
      cmd: "agentplane branch remove --worktree .agentplane/worktrees/202602030608-F1Q8AB-cli",
      why: "Remove a worktree.",
    },
    {
      cmd: "agentplane branch remove --branch task/202602030608-F1Q8AB/cli --worktree .agentplane/worktrees/202602030608-F1Q8AB-cli --force",
      why: "Force-remove both worktree and branch.",
    },
  ],
  validateRaw: (raw) => {
    const branch = typeof raw.opts.branch === "string" ? raw.opts.branch.trim() : "";
    const worktree = typeof raw.opts.worktree === "string" ? raw.opts.worktree.trim() : "";
    if (!branch && !worktree) {
      throw usageError({
        spec: branchRemoveSpec,
        message: "Missing required option: provide --branch and/or --worktree.",
      });
    }
  },
  parse: (raw) => ({
    branch: typeof raw.opts.branch === "string" ? raw.opts.branch : null,
    worktree: typeof raw.opts.worktree === "string" ? raw.opts.worktree : null,
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export const runBranchRemove: CommandHandler<BranchRemoveParsed> = async (ctx, p) => {
  return await cmdBranchRemove({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    branch: p.branch ?? undefined,
    worktree: p.worktree ?? undefined,
    force: p.force,
    yes: p.yes,
    quiet: p.quiet,
  });
};
