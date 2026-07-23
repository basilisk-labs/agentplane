import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { gitEnv, resolveBaseBranch } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, unknownEntityMessage, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { ensureGitClean } from "../guard/index.js";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
import { cleanupMergedLocalBranch } from "../shared/merged-branch-cleanup.js";
import { isPathWithin, resolvePathFallback } from "../shared/path.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { archivePrArtifacts } from "./internal/archive-pr.js";
import { resolveCleanupPlan, type CleanupCandidate } from "./cleanup-merged-proof.js";

const output = createCliEmitter();

function isMissingRemoteBranchDelete(error: unknown): boolean {
  const stdout = String((error as { stdout?: string } | null)?.stdout ?? "");
  const stderr = String((error as { stderr?: string } | null)?.stderr ?? "");
  const text = `${stdout}\n${stderr}`;
  return (
    text.includes("remote ref does not exist") ||
    text.includes("unable to delete") ||
    text.includes("remote reference is not a full refname")
  );
}

async function deleteRemoteBranchIfPresent(gitRoot: string, branch: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["push", "origin", "--delete", branch], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch (error) {
    if (isMissingRemoteBranchDelete(error)) return false;
    throw error;
  }
}

function normalizeRequestedTaskIds(taskIds: readonly string[] | undefined): string[] {
  return [
    ...new Set(
      (taskIds ?? []).map((taskId) => taskId.trim()).filter((taskId) => taskId.length > 0),
    ),
  ].toSorted((a, b) => a.localeCompare(b));
}

async function worktreeIsDirty(worktreePath: string): Promise<boolean> {
  const { stdout } = await execFileAsync(
    "git",
    ["status", "--porcelain", "--untracked-files=all"],
    {
      cwd: worktreePath,
      env: gitEnv(),
    },
  );
  return stdout.trim().length > 0;
}

export async function cmdCleanupMerged(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  base?: string;
  yes: boolean;
  archive: boolean;
  deleteRemoteBranches: boolean;
  finalize?: boolean;
  fetch: boolean;
  quiet: boolean;
  preserveDirty?: boolean;
  report?: string;
  skipUnsafeWorktrees?: boolean;
  taskIds?: readonly string[];
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

    if (opts.fetch) {
      await execFileAsync("git", ["fetch", "--prune", "origin"], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
    }

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

    if (opts.finalize) {
      await execFileAsync("git", ["pull", "--ff-only", "origin", baseBranch], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
    }

    const repoRoot = await resolvePathFallback(resolved.gitRoot);
    const requestedTaskIds = normalizeRequestedTaskIds(opts.taskIds);
    const targeted = requestedTaskIds.length > 0;
    const resolution = await resolveCleanupPlan({
      ctx,
      gitRoot: resolved.gitRoot,
      workflowDir: config.paths.workflow_dir,
      baseBranch,
      taskIds: requestedTaskIds,
    });

    const sortedCandidates = resolution.candidates.toSorted(
      (a, b) => a.taskId.localeCompare(b.taskId) || a.branch.localeCompare(b.branch),
    );
    const sortedBlocked = resolution.blocked.toSorted(
      (a, b) => a.taskId.localeCompare(b.taskId) || a.branch.localeCompare(b.branch),
    );
    if (sortedBlocked.length > 0) {
      const details = sortedBlocked
        .map((item) => `- task=${item.taskId} branch=${item.branch}: ${item.reason}`)
        .join("\n");
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Refusing targeted cleanup because merged identity is not proven:\n${details}`,
      });
    }

    const reportRows: string[] = [
      "cleanup merged report",
      `base=${baseBranch}`,
      `mode=${opts.yes ? "apply" : "dry-run"}`,
      `tasks=${targeted ? requestedTaskIds.join(",") : "*"}`,
      `matched_tasks=${[...resolution.matchedTaskIds].toSorted().join(",") || "-"}`,
      `candidates=${sortedCandidates.length}`,
    ];

    if (!opts.quiet) {
      const archiveLabel = opts.archive ? " archive=on" : "";
      const fetchLabel = opts.fetch ? " fetch=on" : "";
      const remoteLabel = opts.deleteRemoteBranches ? " remote=delete" : "";
      const tasksLabel = targeted ? ` tasks=${requestedTaskIds.join(",")}` : "";
      output.line(
        `cleanup merged (base=${baseBranch}${tasksLabel}${archiveLabel}${fetchLabel}${remoteLabel})`,
      );
      for (const item of sortedCandidates) {
        output.line(
          `- ${item.taskId}: branch=${item.branch} worktree=${item.worktreePath ?? "-"} proof=${item.proof}`,
        );
      }
    }
    for (const item of sortedCandidates) {
      reportRows.push(
        `candidate task=${item.taskId} branch=${item.branch} worktree=${item.worktreePath ?? "-"} proof=${item.proof}`,
      );
    }

    if (sortedCandidates.length === 0) {
      await writeCleanupReportIfRequested({
        gitRoot: resolved.gitRoot,
        report: opts.report,
        rows: reportRows,
      });
      if (!opts.quiet) {
        output.line(
          targeted ? `already clean: task=${requestedTaskIds.join(",")}` : "no candidates",
        );
      }
      return 0;
    }

    if (!opts.yes) {
      await writeCleanupReportIfRequested({
        gitRoot: resolved.gitRoot,
        report: opts.report,
        rows: reportRows,
      });
      if (!opts.quiet) output.line("Re-run with --yes to delete these branches/worktrees.");
      return 0;
    }

    const skipUnsafeWorktrees = opts.skipUnsafeWorktrees === true;
    const preparedCandidates: {
      item: CleanupCandidate;
      worktreePath: string | null;
    }[] = [];
    let skippedUnsafe = 0;
    for (const item of sortedCandidates) {
      const worktreePath = item.worktreePath ? await resolvePathFallback(item.worktreePath) : null;
      let unsafeMessage: string | null = null;
      if (worktreePath) {
        const outsideRepo = !isPathWithin(repoRoot, worktreePath);
        const currentWorktree = worktreePath === repoRoot;
        if (outsideRepo) {
          unsafeMessage = `Refusing to remove worktree outside repo: ${worktreePath}`;
        } else if (currentWorktree) {
          unsafeMessage = "Refusing to remove the current worktree";
        } else if (opts.preserveDirty !== true && (await worktreeIsDirty(worktreePath))) {
          unsafeMessage =
            `Refusing to remove dirty worktree: ${worktreePath}. ` +
            "Commit its changes or rerun with --preserve-dirty.";
        }
      }
      if (unsafeMessage) {
        if (skipUnsafeWorktrees) {
          skippedUnsafe += 1;
          reportRows.push(
            `skipped task=${item.taskId} branch=${item.branch} reason=${unsafeMessage}`,
          );
          continue;
        }
        throw new CliError({ exitCode: 5, code: "E_GIT", message: unsafeMessage });
      }
      preparedCandidates.push({ item, worktreePath });
    }

    let deletedRemoteBranches = 0;
    for (const { item, worktreePath } of preparedCandidates) {
      if (opts.archive) {
        const taskDir = path.join(resolved.gitRoot, config.paths.workflow_dir, item.taskId);
        await archivePrArtifacts(taskDir);
      }

      const cleanup = await cleanupMergedLocalBranch({
        gitRoot: resolved.gitRoot,
        branch: item.branch,
        worktreePathHint: worktreePath,
        preserveDirty: opts.preserveDirty === true,
        expectedHeadSha: item.expectedHeadSha,
      });
      reportRows.push(
        `deleted task=${item.taskId} branch=${item.branch} worktree=${worktreePath ?? "-"} preserve_dirty=${cleanup.preservedDirtyState ? "yes" : "no"} stash=${cleanup.stashMessage ?? "-"}`,
      );
      if (opts.deleteRemoteBranches) {
        deletedRemoteBranches += (await deleteRemoteBranchIfPresent(resolved.gitRoot, item.branch))
          ? 1
          : 0;
      }
    }

    await writeCleanupReportIfRequested({
      gitRoot: resolved.gitRoot,
      report: opts.report,
      rows: reportRows,
    });

    if (opts.deleteRemoteBranches) {
      await execFileAsync("git", ["fetch", "--prune", "origin"], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
    }

    if (!opts.quiet) {
      const remoteDetail = opts.deleteRemoteBranches
        ? ` remote_deleted=${deletedRemoteBranches}`
        : "";
      const skippedDetail = skipUnsafeWorktrees ? ` skipped_unsafe=${skippedUnsafe}` : "";
      output.success(
        "cleanup merged",
        undefined,
        `deleted=${preparedCandidates.length}${remoteDetail}${skippedDetail}`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "cleanup merged", root: opts.rootOverride ?? null });
  }
}

async function writeCleanupReportIfRequested(opts: {
  gitRoot: string;
  report?: string;
  rows: readonly string[];
}): Promise<void> {
  const report = opts.report?.trim();
  if (!report) return;
  const reportPath = path.resolve(opts.gitRoot, report);
  if (!isPathWithin(opts.gitRoot, reportPath)) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: `Refusing to write cleanup report outside repo: ${report}`,
    });
  }
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${opts.rows.join("\n")}\n`, "utf8");
}
