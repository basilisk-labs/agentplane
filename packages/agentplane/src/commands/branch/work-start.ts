import { mkdir } from "node:fs/promises";
import path from "node:path";

import { resolveBaseBranch } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
import { isPathWithin } from "../shared/path.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { ensurePlanApprovedIfRequired } from "../task/shared.js";

import { validateWorkAgent, validateWorkSlug } from "./internal/work-validate.js";

export async function cmdWorkStart(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  agent: string;
  slug: string;
  worktree: boolean;
}): Promise<number> {
  try {
    validateWorkAgent(opts.agent);
    validateWorkSlug(opts.slug);

    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    const mode = config.workflow_mode;
    if (mode !== "branch_pr" && opts.worktree) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `--worktree is only supported in workflow_mode=branch_pr (current: ${mode}).`,
      });
    }
    if (mode === "branch_pr" && !opts.worktree) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--worktree is required when workflow_mode=branch_pr.",
      });
    }

    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    ensurePlanApprovedIfRequired(task, config);

    const currentBranch = await gitCurrentBranch(resolved.gitRoot);
    let baseRef = currentBranch;
    if (mode === "branch_pr") {
      const baseBranch = await resolveBaseBranch({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
        cliBaseOpt: null,
        mode,
      });
      if (!baseBranch) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Base branch could not be resolved (use `agentplane branch base set`).",
        });
      }
      if (currentBranch !== baseBranch) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `work start must be run on base branch ${baseBranch} (current: ${currentBranch})`,
        });
      }
      baseRef = baseBranch;
    }

    const prefix = config.branch.task_prefix;
    const branchName = `${prefix}/${opts.taskId}/${opts.slug.trim()}`;

    const branchExists = await gitBranchExists(resolved.gitRoot, branchName);
    let worktreePath = "";
    if (opts.worktree) {
      const worktreesDir = path.resolve(resolved.gitRoot, config.paths.worktrees_dir);
      if (!isPathWithin(resolved.gitRoot, worktreesDir)) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `worktrees_dir must be inside the repo: ${worktreesDir}`,
        });
      }
      worktreePath = path.join(worktreesDir, `${opts.taskId}-${opts.slug.trim()}`);
      if (await fileExists(worktreePath)) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `Worktree path already exists: ${worktreePath}`,
        });
      }
      await mkdir(worktreesDir, { recursive: true });

      const worktreeArgs = branchExists
        ? ["worktree", "add", worktreePath, branchName]
        : ["worktree", "add", "-b", branchName, worktreePath, baseRef];
      await execFileAsync("git", worktreeArgs, { cwd: resolved.gitRoot, env: gitEnv() });
    } else {
      if (branchExists) {
        if (currentBranch !== branchName) {
          await execFileAsync("git", ["checkout", "-q", branchName], {
            cwd: resolved.gitRoot,
            env: gitEnv(),
          });
        }
      } else {
        await execFileAsync("git", ["checkout", "-q", "-b", branchName, baseRef], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
      }
    }

    process.stdout.write(
      `${successMessage(
        "work start",
        branchName,
        opts.worktree ? `worktree=${path.relative(resolved.gitRoot, worktreePath)}` : "",
      )}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "work start", root: opts.rootOverride ?? null });
  }
}
