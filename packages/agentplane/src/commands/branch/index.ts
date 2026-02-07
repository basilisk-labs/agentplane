import { mkdir, rename } from "node:fs/promises";
import path from "node:path";

import {
  clearPinnedBaseBranch,
  getBaseBranch,
  getPinnedBaseBranch,
  loadConfig,
  resolveBaseBranch,
  resolveProject,
  setPinnedBaseBranch,
} from "@agentplaneorg/core";

import { loadTaskBackend } from "../../backends/task-backend.js";
import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import {
  successMessage,
  unknownEntityMessage,
  usageMessage,
  workflowModeMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { ensureGitClean } from "../guard/index.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitAheadBehind, gitDiffNames } from "../shared/git-diff.js";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
import {
  findWorktreeForBranch,
  gitListTaskBranches,
  parseTaskIdFromBranch,
} from "../shared/git-worktree.js";
import { isPathWithin, resolvePathFallback } from "../shared/path.js";
import { loadBackendTask } from "../shared/task-backend.js";
import { ensurePlanApprovedIfRequired } from "../task/shared.js";

export {
  gitInitRepo,
  resolveInitBaseBranch,
  promptInitBaseBranch,
  ensureInitCommit,
} from "../shared/git-ops.js";

export const BRANCH_BASE_USAGE =
  "Usage: agentplane branch base get|set|clear|explain [<name>|--current]";
export const BRANCH_BASE_USAGE_EXAMPLE = "agentplane branch base set --current";
export const BRANCH_STATUS_USAGE =
  "Usage: agentplane branch status [--branch <name>] [--base <name>]";
export const BRANCH_STATUS_USAGE_EXAMPLE = "agentplane branch status --base main";
export const BRANCH_REMOVE_USAGE =
  "Usage: agentplane branch remove [--branch <name>] [--worktree <path>] [--force] [--quiet]";
export const BRANCH_REMOVE_USAGE_EXAMPLE =
  "agentplane branch remove --branch task/20260203-F1Q8AB --worktree .agentplane/worktrees/task";
export const WORK_START_USAGE =
  "Usage: agentplane work start <task-id> --agent <id> --slug <slug> [--worktree]";
export const WORK_START_USAGE_EXAMPLE =
  "agentplane work start 202602030608-F1Q8AB --agent CODER --slug cli --worktree";
export const CLEANUP_MERGED_USAGE =
  "Usage: agentplane cleanup merged [--base <name>] [--yes] [--archive] [--quiet]";
export const CLEANUP_MERGED_USAGE_EXAMPLE = "agentplane cleanup merged --yes";

function validateWorkSlug(slug: string): void {
  const trimmed = slug.trim();
  if (!trimmed) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
    });
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Slug must be lowercase kebab-case (a-z, 0-9, hyphen)",
    });
  }
}

function validateWorkAgent(agent: string): void {
  const trimmed = agent.trim();
  if (!trimmed) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
    });
  }
  if (!/^[A-Z0-9_]+$/.test(trimmed)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Agent id must be uppercase letters, numbers, or underscores",
    });
  }
}

async function archivePrArtifacts(taskDir: string): Promise<string | null> {
  const prDir = path.join(taskDir, "pr");
  if (!(await fileExists(prDir))) return null;
  const archiveRoot = path.join(taskDir, "pr-archive");
  await mkdir(archiveRoot, { recursive: true });
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, "");
  let dest = path.join(archiveRoot, stamp);
  if (await fileExists(dest)) {
    dest = path.join(archiveRoot, `${stamp}-${Math.random().toString(36).slice(2, 8)}`);
  }
  await rename(prDir, dest);
  return dest;
}

export async function cmdWorkStart(opts: {
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

    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const mode = loaded.config.workflow_mode;
    if (mode !== "branch_pr" && opts.worktree) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: [
          `--worktree is only supported in workflow_mode=branch_pr (current: ${mode}).`,
          "Switch to branch_pr or omit --worktree.",
          "",
          usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
        ].join("\n"),
      });
    }
    if (mode === "branch_pr" && !opts.worktree) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
      });
    }

    const { task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    ensurePlanApprovedIfRequired(task, loaded.config);

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

    const prefix = loaded.config.branch.task_prefix;
    const branchName = `${prefix}/${opts.taskId}/${opts.slug.trim()}`;

    const branchExists = await gitBranchExists(resolved.gitRoot, branchName);
    let worktreePath = "";
    if (opts.worktree) {
      const worktreesDir = path.resolve(resolved.gitRoot, loaded.config.paths.worktrees_dir);
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

export async function cmdCleanupMerged(opts: {
  cwd: string;
  rootOverride?: string;
  base?: string;
  yes: boolean;
  archive: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    if (loaded.config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(loaded.config.workflow_mode, "branch_pr"),
      });
    }

    await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: opts.base ?? null,
      mode: loaded.config.workflow_mode,
    });
    if (!baseBranch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(CLEANUP_MERGED_USAGE, CLEANUP_MERGED_USAGE_EXAMPLE),
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

    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const tasksById = new Map(tasks.map((task) => [task.id, task]));
    const prefix = loaded.config.branch.task_prefix;
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
        const taskDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir, item.taskId);
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

export async function cmdBranchBaseGet(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const value = await getBaseBranch({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
    process.stdout.write(`${value}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base get", root: opts.rootOverride ?? null });
  }
}

export async function cmdBranchBaseSet(opts: {
  cwd: string;
  rootOverride?: string;
  value?: string;
  useCurrent?: boolean;
}): Promise<number> {
  const trimmed = (opts.value ?? "").trim();
  if (trimmed.length === 0 && !opts.useCurrent) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(BRANCH_BASE_USAGE, BRANCH_BASE_USAGE_EXAMPLE),
    });
  }
  try {
    let nextValue = trimmed;
    if (opts.useCurrent) {
      const resolved = await resolveProject({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      nextValue = await gitCurrentBranch(resolved.gitRoot);
    }
    const value = await setPinnedBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      value: nextValue,
    });
    process.stdout.write(`${value}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base set", root: opts.rootOverride ?? null });
  }
}

export async function cmdBranchBaseClear(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const cleared = await clearPinnedBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    process.stdout.write(`${cleared ? "cleared" : "no-op"}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base clear", root: opts.rootOverride ?? null });
  }
}

export async function cmdBranchBaseExplain(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    let current: string | null = null;
    try {
      current = await gitCurrentBranch(resolved.gitRoot);
    } catch {
      current = null;
    }

    const pinned = await getPinnedBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const effective = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: null,
      mode: loaded.config.workflow_mode,
    });

    const warnings: string[] = [];
    if (pinned && !(await gitBranchExists(resolved.gitRoot, pinned))) {
      warnings.push(`Pinned base branch not found: ${pinned}`);
    }
    if (effective && !(await gitBranchExists(resolved.gitRoot, effective))) {
      warnings.push(`Effective base branch not found: ${effective}`);
    }

    process.stdout.write(`current_branch=${current ?? "-"}\n`);
    process.stdout.write(`pinned_base=${pinned ?? "-"}\n`);
    process.stdout.write(`effective_base=${effective ?? "-"}\n`);
    if (warnings.length > 0) {
      for (const warning of warnings) {
        process.stdout.write(`warning=${warning}\n`);
      }
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base explain", root: opts.rootOverride ?? null });
  }
}

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
    if (!branch || !base) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(BRANCH_STATUS_USAGE, BRANCH_STATUS_USAGE_EXAMPLE),
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
      message: usageMessage(BRANCH_REMOVE_USAGE, BRANCH_REMOVE_USAGE_EXAMPLE),
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
