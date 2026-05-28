import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { successMessage } from "../../../cli/output.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../../shared/errors.js";
import {
  resolveGitIndexLockInfo,
  resolveGitMutationDiagnosticContext,
  withGitMutationMutex,
} from "../../../shared/git-mutation.js";
import { loadTaskFromContext, type CommandContext } from "../../shared/task-backend.js";
import { ensureReconciledBeforeMutation } from "../../shared/reconcile-check.js";
import { stageAllowlist } from "./allow.js";
import { resolveIgnoredDirectCloseDirtyPaths } from "./close-dirt.js";
import { buildCloseCommitMessage, taskReadmePathForTask } from "./close-message.js";
import { appendDcoSignoff } from "./dco.js";
import { buildGitCommitEnv, resolveCanonicalGitIdentity } from "./env.js";
import {
  refreshBranchPrArtifactsForCloseCommit,
  resetRebuildableTaskIndexCache,
} from "./commit-refresh.js";
import { stageCloseCommitPaths } from "./commit-stage.js";
import { guardCommitCheck } from "./policy.js";
import { runCommitWithLock } from "./commit-runner.js";
import type { cmdCommit } from "./commit.js";

const GIT_COMMIT_LOCK_REMEDIATION =
  "Wait for the active AgentPlane or external git process to release index lock, then retry.";

export async function cmdCloseCommit(
  opts: Parameters<typeof cmdCommit>[0] & {
    ctx: CommandContext;
  },
): Promise<number> {
  if (!opts.closeCheckOnly) {
    await ensureReconciledBeforeMutation({ ctx: opts.ctx, command: "commit" });
    await resetRebuildableTaskIndexCache(opts.ctx);
  }

  let staged = await opts.ctx.git.statusStagedPaths();
  if (staged.length > 0 && opts.closeUnstageOthers) {
    if (!opts.closeCheckOnly) {
      const [changedPaths, stagedPaths] = await Promise.all([
        opts.ctx.git.statusChangedPaths(),
        opts.ctx.git.statusStagedPaths(),
      ]);
      await withGitMutationMutex(
        {
          repoRoot: opts.ctx.resolvedProject.gitRoot,
          operation: "git-restore",
          workflowMode: opts.ctx.config.workflow_mode,
          mutationKind: "close_tail",
          taskId: opts.taskId,
        },
        async () => {
          await execFileAsync("git", ["restore", "--staged", "--", "."], {
            cwd: opts.ctx.resolvedProject.gitRoot,
            env: gitEnv(),
          });
        },
      );
      staged = await opts.ctx.git.statusStagedPaths();
      const lockInfo = await resolveGitIndexLockInfo({
        repoRoot: opts.ctx.resolvedProject.gitRoot,
      });
      if (lockInfo) {
        throw new CliError({
          exitCode: exitCodeForError("E_GIT_LOCKED"),
          code: "E_GIT_LOCKED",
          message: `Git index is locked; refusing close-commit restore: ${lockInfo.lockPath}`,
          context: {
            ...(await resolveGitMutationDiagnosticContext({
              command: "git restore",
              cwd: opts.ctx.resolvedProject.gitRoot,
              repoRoot: opts.ctx.resolvedProject.gitRoot,
              workflowMode: opts.ctx.config.workflow_mode,
              mutationKind: "close_tail",
              taskId: opts.taskId,
              changedPaths,
              stagedPaths,
            })),
            remediation: GIT_COMMIT_LOCK_REMEDIATION,
            git_index_lock_path: lockInfo.lockPath,
            git_index_lock_age_ms: lockInfo.ageMs,
          },
        });
      }
    }
    staged = opts.closeCheckOnly ? staged : await opts.ctx.git.statusStagedPaths();
  }
  if (staged.length > 0 && !opts.closeUnstageOthers) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message:
        "Staged files exist (close commit requires an empty index; rerun with --unstage-others to auto-unstage).",
      context: withDiagnosticContext(
        { command: "commit" },
        {
          state: "close commit cannot run with a non-empty git index",
          likelyCause:
            "deterministic close commits only stage the active task artifact scope, but other staged files are already in the index",
          nextAction: {
            command: "git restore --staged -- .",
            reason: "clear the current index before rerunning the close commit flow",
            reasonCode: "git_close_commit_dirty_index",
          },
        },
      ),
    });
  }

  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const msg = await buildCloseCommitMessage({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    task,
  });
  const readmeAbs = taskReadmePathForTask({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.taskId,
  });
  const readmeRel = readmeAbs.startsWith(opts.ctx.resolvedProject.gitRoot)
    ? readmeAbs.slice(opts.ctx.resolvedProject.gitRoot.length + 1)
    : readmeAbs;
  if (opts.closeCheckOnly) {
    if (!opts.quiet) {
      const stagedCount = staged.length;
      const suffix =
        stagedCount > 0 && opts.closeUnstageOthers ? `; would unstage ${stagedCount} path(s)` : "";
      process.stdout.write(
        `${successMessage("close preflight", opts.taskId, `subject=${msg.subject}${suffix}`)}\n`,
      );
    }
    return 0;
  }
  if (opts.closeStageTaskArtifacts === true) {
    await refreshBranchPrArtifactsForCloseCommit({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      quiet: opts.quiet,
      refreshTaskArtifacts: opts.closeRefreshTaskArtifacts !== false,
    });
  }
  await (opts.closeStageTaskArtifacts === true
    ? stageAllowlist({
        ctx: opts.ctx,
        allow: opts.allow,
        allowTasks: true,
        allowPolicy: opts.allowPolicy,
        tasksPath: opts.ctx.config.paths.tasks_path,
        workflowDir: opts.ctx.config.paths.workflow_dir,
        taskId: opts.taskId,
        allowTaskOnly: true,
        emptyAllowMessage: "No changed task artifacts to stage for the deterministic close commit.",
        noMatchMessage:
          "No changed files matched the active task artifact scope for the deterministic close commit.",
        mutationKind: "close_tail",
      })
    : stageCloseCommitPaths({
        ctx: opts.ctx,
        readmeRel,
        taskId: opts.taskId,
        allowPolicy: opts.allowPolicy,
      }));
  const ignoredUnstagedTrackedPaths = await resolveIgnoredDirectCloseDirtyPaths({
    ctx: opts.ctx,
    taskId: opts.taskId,
  });

  await guardCommitCheck({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    baseBranchOverride: opts.baseBranchOverride ?? null,
    taskId: opts.taskId,
    message: msg.subject,
    allow: opts.allow,
    allowBase: opts.allowBase,
    allowTasks: true,
    allowPolicy: opts.allowPolicy,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: true,
    allowHumanTaskSubject: true,
    ignoredUnstagedTrackedPaths,
    quiet: opts.quiet,
  });

  const env = buildGitCommitEnv({
    taskId: opts.taskId,
    allowTasks: true,
    allowBase: opts.allowBase,
    allowPolicy: opts.allowPolicy,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    allowStaleDist: true,
    allowHumanTaskSubject: true,
    gitIdentity: await resolveCanonicalGitIdentity(),
  });
  const [closeChangedPaths, closeStagedPaths] = await Promise.all([
    opts.ctx.git.statusChangedPaths(),
    opts.ctx.git.statusStagedPaths(),
  ]);
  await runCommitWithLock({
    ctx: opts.ctx,
    taskId: opts.taskId,
    message: msg.subject,
    body: appendDcoSignoff({ config: opts.ctx.config, body: msg.body }),
    env,
    allowPrefixes: opts.allow,
    changedPaths: closeChangedPaths,
    stagedPaths: closeStagedPaths,
    mutationKind: "close_tail",
    phase: "close_commit",
  });

  if (!opts.quiet) {
    const { hash, subject } = await opts.ctx.git.headHashSubject();
    process.stdout.write(
      `${successMessage("committed", `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim())}\n`,
    );
  }
  return 0;
}
