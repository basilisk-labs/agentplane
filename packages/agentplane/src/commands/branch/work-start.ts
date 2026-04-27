import { mkdir } from "node:fs/promises";
import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
import { isPathWithin } from "../shared/path.js";
import {
  ensureBranchPrBaseCheckout,
  resolveBranchPrLifecycleContext,
} from "../shared/branch-pr-context.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { ensurePlanApprovedIfRequired } from "../task/shared.js";

import { validateWorkAgent, validateWorkSlug } from "./internal/work-validate.js";
import {
  directWorkLockPath,
  ensureGitClean,
  readDirectWorkLock,
  writeDirectWorkLock,
} from "./work-start.direct.js";
import { ensureCurrentBaseBranch } from "./work-start.git.js";
import { materializeHookShimForWorktree } from "./work-start.hook-shim.js";
import {
  materializeLocalBackendReadmesForWorktree,
  materializeRepoLocalDistForWorktree,
  materializeRepoLocalInstallLayoutForWorktree,
} from "./work-start.materialize.js";

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
    const output = createCliEmitter();
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

    // direct mode: single-stream, no task branches.
    if (mode === "direct") {
      await ensureGitClean(resolved.gitRoot);

      const existingLock = await readDirectWorkLock(resolved.agentplaneDir);
      if (existingLock && existingLock.task_id !== opts.taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message:
            `Another task is already active in this workspace (workflow_mode=direct): ${existingLock.task_id}. ` +
            `Finish it first, or delete ${path.relative(resolved.gitRoot, directWorkLockPath(resolved.agentplaneDir))} to override.`,
        });
      }

      await writeDirectWorkLock(resolved.agentplaneDir, {
        task_id: opts.taskId,
        agent: opts.agent,
        slug: opts.slug.trim(),
        branch: currentBranch,
        started_at: new Date().toISOString(),
      });

      output.success("work start", opts.taskId, `mode=direct branch=${currentBranch}`);
      return 0;
    }

    let baseRef = currentBranch;
    if (mode === "branch_pr") {
      const lifecycleContext = await resolveBranchPrLifecycleContext({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
        gitRoot: resolved.gitRoot,
        workflowMode: mode,
        missingBaseMessage: "Base branch could not be resolved (use `agentplane branch base set`).",
      });
      const { baseBranch } = lifecycleContext;
      await ensureBranchPrBaseCheckout({
        context: lifecycleContext,
        gitRoot: resolved.gitRoot,
        command: "work start",
        mismatchMessage: `work start must be run on base branch ${baseBranch} (current: ${currentBranch})`,
      });
      await ensureCurrentBaseBranch(resolved.gitRoot, baseBranch);
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
      await materializeLocalBackendReadmesForWorktree({
        backend: ctx.taskBackend,
        repoRoot: resolved.gitRoot,
        worktreePath,
        taskId: opts.taskId,
      });
      await materializeRepoLocalDistForWorktree({
        repoRoot: resolved.gitRoot,
        worktreePath,
      });
      await materializeRepoLocalInstallLayoutForWorktree({
        repoRoot: resolved.gitRoot,
        worktreePath,
      });
      await materializeHookShimForWorktree(worktreePath);
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

    output.success(
      "work start",
      branchName,
      opts.worktree ? `worktree=${path.relative(resolved.gitRoot, worktreePath)}` : "",
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "work start", root: opts.rootOverride ?? null });
  }
}
