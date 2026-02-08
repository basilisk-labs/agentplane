import path from "node:path";
import { mkdir } from "node:fs/promises";

import { fileExists } from "../../../../cli/fs-utils.js";
import { CliError } from "../../../../shared/errors.js";
import { execFileAsync, gitEnv } from "../../../shared/git.js";
import { findWorktreeForBranch } from "../../../shared/git-worktree.js";
import { isPathWithin } from "../../../shared/path.js";

export type IntegrateWorktree = {
  worktreePath: string | null;
  tempWorktreePath: string | null;
  createdTempWorktree: boolean;
};

export async function resolveWorktreeForIntegrate(opts: {
  gitRoot: string;
  worktreesDirRel: string;
  branch: string;
  taskId: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  shouldRunVerify: boolean;
}): Promise<IntegrateWorktree> {
  let tempWorktreePath: string | null = null;
  let createdTempWorktree = false;

  let worktreePath = await findWorktreeForBranch(opts.gitRoot, opts.branch);
  if (opts.mergeStrategy === "rebase" && !worktreePath) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "rebase strategy requires an existing worktree for the task branch",
    });
  }

  if (opts.shouldRunVerify && !worktreePath) {
    const worktreesDir = path.resolve(opts.gitRoot, opts.worktreesDirRel);
    if (!isPathWithin(opts.gitRoot, worktreesDir)) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `worktrees_dir must be inside the repo: ${worktreesDir}`,
      });
    }
    tempWorktreePath = path.join(worktreesDir, `_integrate_tmp_${opts.taskId}`);
    const tempExists = await fileExists(tempWorktreePath);
    if (tempExists) {
      const registered = await findWorktreeForBranch(opts.gitRoot, opts.branch);
      if (!registered) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `Temp worktree path exists but is not registered: ${tempWorktreePath}`,
        });
      }
    } else {
      await mkdir(worktreesDir, { recursive: true });
      await execFileAsync("git", ["worktree", "add", tempWorktreePath, opts.branch], {
        cwd: opts.gitRoot,
        env: gitEnv(),
      });
      createdTempWorktree = true;
    }
    worktreePath = tempWorktreePath;
  }

  return { worktreePath, tempWorktreePath, createdTempWorktree };
}
