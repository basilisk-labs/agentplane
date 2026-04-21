import { resolveBaseBranch } from "@agentplaneorg/core";

import { cmdCleanupMerged } from "../branch/index.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { loadCommandContext } from "../shared/task-backend.js";
import type { HooksRunOptions } from "./run.js";

export async function runPostMergeHook(opts: HooksRunOptions): Promise<number> {
  try {
    const ctx = await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (ctx.config.workflow_mode !== "branch_pr") return 0;

    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: null,
      mode: ctx.config.workflow_mode,
    });
    if (!baseBranch) return 0;

    const currentBranch = await gitCurrentBranch(ctx.resolvedProject.gitRoot);
    if (currentBranch !== baseBranch) return 0;

    return await cmdCleanupMerged({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      base: baseBranch,
      yes: true,
      archive: false,
      deleteRemoteBranches: false,
      fetch: false,
      quiet: true,
      skipUnsafeWorktrees: true,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message.trim().length > 0
        ? error.message.trim()
        : String(error);
    process.stderr.write(`warning: post-merge cleanup skipped: ${message}\n`);
    return 0;
  }
}
