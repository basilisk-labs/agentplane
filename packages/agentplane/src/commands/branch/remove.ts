import path from "node:path";

import { loadConfig, resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../cli/error-map.js";
import { successMessage, unknownEntityMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitBranchExists } from "../shared/git-ops.js";
import { isPathWithin, resolvePathFallback } from "../shared/path.js";

export async function cmdBranchRemove(opts: {
  cwd: string;
  rootOverride?: string;
  branch?: string;
  worktree?: string;
  force: boolean;
  quiet: boolean;
}): Promise<number> {
  const branch = (opts.branch ?? "").trim();
  const worktree = (opts.worktree ?? "").trim();
  if (!branch && !worktree) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing required option: --branch or --worktree.",
    });
  }
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);

    if (worktree) {
      const worktreePath = path.isAbsolute(worktree)
        ? await resolvePathFallback(worktree)
        : await resolvePathFallback(path.join(resolved.gitRoot, worktree));
      const worktreesRoot = path.resolve(resolved.gitRoot, loaded.config.paths.worktrees_dir);
      if (!isPathWithin(worktreesRoot, worktreePath)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Refusing to remove worktree outside ${worktreesRoot}: ${worktreePath}`,
        });
      }
      await execFileAsync(
        "git",
        ["worktree", "remove", ...(opts.force ? ["--force"] : []), worktreePath],
        { cwd: resolved.gitRoot, env: gitEnv() },
      );
      if (!opts.quiet) {
        process.stdout.write(`${successMessage("removed worktree", worktreePath)}\n`);
      }
    }

    if (branch) {
      if (!(await gitBranchExists(resolved.gitRoot, branch))) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: unknownEntityMessage("branch", branch),
        });
      }
      await execFileAsync("git", ["branch", opts.force ? "-D" : "-d", branch], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
      if (!opts.quiet) {
        process.stdout.write(`${successMessage("removed branch", branch)}\n`);
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "branch remove", root: opts.rootOverride ?? null });
  }
}
