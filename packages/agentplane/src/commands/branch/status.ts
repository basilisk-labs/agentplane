import { loadConfig, resolveBaseBranch, resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../cli/error-map.js";
import { unknownEntityMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { gitAheadBehind } from "../shared/git-diff.js";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
import { findWorktreeForBranch, parseTaskIdFromBranch } from "../shared/git-worktree.js";

export async function cmdBranchStatus(opts: {
  cwd: string;
  rootOverride?: string;
  branch?: string;
  base?: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const branch = (opts.branch ?? (await gitCurrentBranch(resolved.gitRoot))).trim();
    const base = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: opts.base ?? null,
      mode: loaded.config.workflow_mode,
    });
    if (!branch) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Invalid value for --branch." });
    }
    if (!base) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Base branch could not be resolved (use `agentplane branch base set` or --base).",
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, branch))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("branch", branch),
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, base))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("base branch", base),
      });
    }

    const taskId = parseTaskIdFromBranch(loaded.config.branch.task_prefix, branch);
    const worktree = await findWorktreeForBranch(resolved.gitRoot, branch);
    const { ahead, behind } = await gitAheadBehind(resolved.gitRoot, base, branch);

    process.stdout.write(
      `branch=${branch} base=${base} ahead=${ahead} behind=${behind} task_id=${taskId ?? "-"}\n`,
    );
    if (worktree) {
      process.stdout.write(`worktree=${worktree}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "branch status", root: opts.rootOverride ?? null });
  }
}
