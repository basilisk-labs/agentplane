import path from "node:path";

import { resolveBaseBranch } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { successMessage, unknownEntityMessage, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { ensureGitClean } from "../guard/index.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitDiffNames } from "../shared/git-diff.js";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
import {
  findWorktreeForBranch,
  gitListTaskBranches,
  parseTaskIdFromBranch,
} from "../shared/git-worktree.js";
import { isPathWithin, resolvePathFallback } from "../shared/path.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { archivePrArtifacts } from "./internal/archive-pr.js";

export async function cmdCleanupMerged(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  base?: string;
  yes: boolean;
  archive: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: opts.base ?? null,
      mode: config.workflow_mode,
    });
    if (!baseBranch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Base branch could not be resolved (use `agentplane branch base set` or --base).",
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, baseBranch))) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: unknownEntityMessage("base branch", baseBranch),
      });
    }

    const currentBranch = await gitCurrentBranch(resolved.gitRoot);
    if (currentBranch !== baseBranch) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `cleanup merged must run on base branch ${baseBranch} (current: ${currentBranch})`,
      });
    }

    const repoRoot = await resolvePathFallback(resolved.gitRoot);

    const tasks = await ctx.taskBackend.listTasks();
    const tasksById = new Map(tasks.map((task) => [task.id, task]));
    const prefix = config.branch.task_prefix;
    const branches = await gitListTaskBranches(resolved.gitRoot, prefix);

    const candidates: { taskId: string; branch: string; worktreePath: string | null }[] = [];
    for (const branch of branches) {
      if (branch === baseBranch) continue;
      const taskId = parseTaskIdFromBranch(prefix, branch);
      if (!taskId) continue;
      const task = tasksById.get(taskId);
      if (!task) continue;
      const status = String(task.status || "").toUpperCase();
      if (status !== "DONE") continue;
      const diff = await gitDiffNames(resolved.gitRoot, baseBranch, branch);
      if (diff.length > 0) continue;
      const worktreePath = await findWorktreeForBranch(resolved.gitRoot, branch);
      candidates.push({ taskId, branch, worktreePath });
    }

    const sortedCandidates = candidates.toSorted((a, b) => a.taskId.localeCompare(b.taskId));

    if (!opts.quiet) {
      const archiveLabel = opts.archive ? " archive=on" : "";
      process.stdout.write(`cleanup merged (base=${baseBranch}${archiveLabel})\n`);
      if (sortedCandidates.length === 0) {
        process.stdout.write("no candidates\n");
        return 0;
      }
      for (const item of sortedCandidates) {
        process.stdout.write(
          `- ${item.taskId}: branch=${item.branch} worktree=${item.worktreePath ?? "-"}\n`,
        );
      }
    }

    if (!opts.yes) {
      if (!opts.quiet) {
        process.stdout.write("Re-run with --yes to delete these branches/worktrees.\n");
      }
      return 0;
    }

    for (const item of sortedCandidates) {
      const worktreePath = item.worktreePath ? await resolvePathFallback(item.worktreePath) : null;
      if (worktreePath) {
        if (!isPathWithin(repoRoot, worktreePath)) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `Refusing to remove worktree outside repo: ${worktreePath}`,
          });
        }
        if (worktreePath === repoRoot) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: "Refusing to remove the current worktree",
          });
        }
      }

      if (opts.archive) {
        const taskDir = path.join(resolved.gitRoot, config.paths.workflow_dir, item.taskId);
        await archivePrArtifacts(taskDir);
      }

      if (worktreePath) {
        await execFileAsync("git", ["worktree", "remove", "--force", worktreePath], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
      }
      await execFileAsync("git", ["branch", "-D", item.branch], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
    }

    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage("cleanup merged", undefined, `deleted=${candidates.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "cleanup merged", root: opts.rootOverride ?? null });
  }
}
