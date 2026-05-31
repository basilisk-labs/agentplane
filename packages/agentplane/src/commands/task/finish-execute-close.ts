import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import {
  gitMutationDiagnosticContext,
  resolveGitIndexLockInfo,
} from "../../shared/git-mutation.js";
import { resolveIgnoredDirectCloseDirtyPaths } from "../guard/impl/close-dirt.js";
import type { CommandContext } from "../shared/task-backend.js";
import { createTaskCloseCommit } from "./finish-shared.js";
import { materializeBranchPrCloseTail } from "./finish-close.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";

export async function assertCloseCommitCanMutateTaskState(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
}): Promise<void> {
  const { ctx, options, plan } = opts;
  if (!plan.shouldCloseCommit) return;

  const taskId = plan.primaryTaskId ?? options.taskIds[0];
  const lockInfo = await resolveGitIndexLockInfo({ repoRoot: ctx.resolvedProject.gitRoot });
  if (lockInfo) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT_LOCKED"),
      code: "E_GIT_LOCKED",
      message: [
        "finish close commit cannot proceed while a Git index lock file exists.",
        "Why: close commit creation would fail after the task is marked DONE.",
        "Fix: inspect the active git process or run `agentplane doctor git-locks` before rerunning finish.",
        `Lock: ${lockInfo.lockPath}`,
      ].join("\n"),
      context: gitMutationDiagnosticContext({
        command: "finish",
        cwd: options.cwd,
        repoRoot: ctx.resolvedProject.gitRoot,
        gitDir: lockInfo.gitDir,
        workflowMode: ctx.config.workflow_mode,
        mutationKind: "close_tail",
        taskId,
        indexLockPath: lockInfo.lockPath,
        indexLockAgeMs: lockInfo.ageMs,
        remediation: "Inspect or clear the git index lock before rerunning finish.",
      }),
    });
  }

  const staged = await ctx.git.statusStagedPaths();
  if (staged.length > 0 && options.closeUnstageOthers !== true) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: [
        "finish --close-commit cannot proceed with a non-empty index.",
        "Why: close commit creation would fail after the task is marked DONE.",
        `Staged paths: ${staged.slice(0, 12).join(", ")}${staged.length > 12 ? ` (+${staged.length - 12} more)` : ""}`,
        "Fix: commit or unstage unrelated paths before rerunning finish, or pass --close-unstage-others to let finish unstage non-task paths first.",
        "Tracked-state command: git status --short --untracked-files=no",
        "Full artifact audit: git status --short --untracked-files=all",
      ].join("\n"),
      context: {
        command: "finish",
        task_id: taskId,
        reason_code: "git_close_commit_dirty_index",
        staged_paths: staged,
      },
    });
  }

  const unstaged = await ctx.git.statusUnstagedTrackedPaths();
  const ignored =
    ctx.config.workflow_mode === "direct"
      ? await resolveIgnoredDirectCloseDirtyPaths({ ctx, taskId })
      : [];
  const blockingUnstaged = unstaged.filter((relPath) => !ignored.includes(relPath));
  if (blockingUnstaged.length === 0) return;

  throw new CliError({
    exitCode: 5,
    code: "E_GIT",
    message: [
      "finish --close-commit requires a clean tracked working tree before mutating task state.",
      `Why: deterministic ${ctx.config.workflow_mode} close commits stage only the finished task artifacts; other tracked changes would make commit creation fail after the task is marked DONE.`,
      `Dirty tracked paths: ${blockingUnstaged.slice(0, 12).join(", ")}${blockingUnstaged.length > 12 ? ` (+${blockingUnstaged.length - 12} more)` : ""}`,
      "Fix: commit, stash, or move unrelated lifecycle changes into a batch close branch before rerunning finish.",
      "Tracked-state command: git status --short --untracked-files=no",
      "Full artifact audit: git status --short --untracked-files=all",
    ].join("\n"),
  });
}

export async function finalizeCloseTail(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
  primaryTaskId: string;
  promotedIncidents: number;
}): Promise<void> {
  const { ctx, options, plan, primaryTaskId, promotedIncidents } = opts;
  if (!plan.shouldCloseCommit || !primaryTaskId) return;

  if (!options.quiet) {
    process.stdout.write("task marked DONE; creating deterministic close commit\n");
  }
  const closeUnstageOthers = options.closeCommit === true && options.closeUnstageOthers === true;
  if (ctx.config.workflow_mode === "branch_pr") {
    const closeBranch = await materializeBranchPrCloseTail({
      ctx,
      cwd: options.cwd,
      rootOverride: options.rootOverride,
      taskId: primaryTaskId,
      baseBranchOverride: options.baseBranchOverride,
      quiet: options.quiet,
      closeUnstageOthers,
      allowPolicy: promotedIncidents > 0,
      additionalTaskIds: plan.closeAdditionalTaskIds,
    });
    if (options.quiet) return;
    if (closeBranch) {
      process.stdout.write(
        `branch_pr close tail ready on ${closeBranch}; push that branch and open it with task hosted-close-pr if hosted automation does not create the closure PR for you.\n`,
      );
      return;
    }
    process.stdout.write(
      "branch_pr close tail already handled; skipping local task-close branch materialization.\n",
    );
    return;
  }

  await createTaskCloseCommit({
    ctx,
    cwd: options.cwd,
    rootOverride: options.rootOverride,
    taskId: primaryTaskId,
    baseBranchOverride: options.baseBranchOverride,
    quiet: options.quiet,
    closeUnstageOthers,
    allowPolicy: promotedIncidents > 0,
    additionalTaskIds: plan.closeAdditionalTaskIds,
  });
}
