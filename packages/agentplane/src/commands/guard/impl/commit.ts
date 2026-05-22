import { mapCoreError } from "../../../cli/error-map.js";
import { infoMessage, successMessage } from "../../../cli/output.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError, type ErrorCode } from "../../../shared/errors.js";
import { refreshBranchPrArtifactsAfterTaskCommit } from "../../shared/post-commit-pr-artifacts.js";
import {
  resolveGitIndexLockInfo,
  resolveGitMutationDiagnosticContext,
  withGitMutationMutex,
  type GitMutationKind,
} from "../../../shared/git-mutation.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../../shared/task-backend.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { ensureReconciledBeforeMutation } from "../../shared/reconcile-check.js";
import { stageAllowlist } from "./allow.js";
import { resolveIgnoredDirectCloseDirtyPaths } from "./close-dirt.js";
import { buildCloseCommitMessage, taskReadmePathForTask } from "./close-message.js";
import { asCommitFailure } from "./commit-diagnostics.js";
import { appendDcoSignoff } from "./dco.js";
import { buildGitCommitEnv, resolveCanonicalGitIdentity } from "./env.js";
import {
  commitRefreshedTaskArtifacts,
  formatCommitRef,
  refreshBranchPrArtifactsForCloseCommit,
  resetRebuildableTaskIndexCache,
} from "./commit-refresh.js";
import {
  hasExplicitCommitScope,
  stageActiveTaskArtifactsFromAllowTasks,
  stageCloseCommitPaths,
} from "./commit-stage.js";
import { guardCommitCheck } from "./policy.js";

const GIT_COMMIT_LOCK_REMEDIATION =
  "Wait for the active AgentPlane or external git process to release index lock, then retry.";
const GIT_COMMIT_PERMISSION_REMEDIATION =
  "Check repository permissions (uid/gid and write access for .git/*), fix ownership, then retry.";
const GIT_COMMIT_RACE_REMEDIATION =
  "A conflicting git writer was detected. Retry when merge/rebase/commit operations are not running.";

function classifyGitCommitFailure(message: string): ErrorCode {
  if (message.includes("index.lock") || /could not lock|unable to create .*lock/.test(message)) {
    return "E_GIT_LOCKED";
  }
  if (/\b(EACCES|EPERM)\b|operation not permitted|permission denied/i.test(message)) {
    return "E_GIT_PERMISSION";
  }
  if (/another git process|concurrent|already running|is locked/i.test(message)) {
    return "E_GIT_RACE";
  }
  return "E_GIT";
}

async function runCommitWithLock(opts: {
  ctx: CommandContext;
  taskId: string;
  message: string;
  body?: string;
  env?: NodeJS.ProcessEnv;
  allowPrefixes?: string[];
  changedPaths: string[];
  stagedPaths: string[];
  mutationKind: GitMutationKind;
  phase: "task_commit" | "close_commit";
}): Promise<void> {
  const lockInfo = await resolveGitIndexLockInfo({ repoRoot: opts.ctx.resolvedProject.gitRoot });
  if (lockInfo) {
    const lockDiagnosticContext = await resolveGitMutationDiagnosticContext({
      command: "git commit",
      cwd: opts.ctx.resolvedProject.gitRoot,
      repoRoot: opts.ctx.resolvedProject.gitRoot,
      workflowMode: opts.ctx.config.workflow_mode,
      mutationKind: opts.mutationKind,
      taskId: opts.taskId,
      allowPrefixes: opts.allowPrefixes,
      changedPaths: opts.changedPaths,
      stagedPaths: opts.stagedPaths,
    });
    throw new CliError({
      exitCode: exitCodeForError("E_GIT_LOCKED"),
      code: "E_GIT_LOCKED",
      message: `Git index is locked; refusing git commit: ${lockInfo.lockPath}`,
      context: {
        ...lockDiagnosticContext,
        remediation: GIT_COMMIT_LOCK_REMEDIATION,
        git_index_lock_path: lockInfo.lockPath,
        git_index_lock_age_ms: lockInfo.ageMs,
      },
    });
  }

  await withGitMutationMutex(
    {
      repoRoot: opts.ctx.resolvedProject.gitRoot,
      operation: "git-commit",
      workflowMode: opts.ctx.config.workflow_mode,
      mutationKind: opts.mutationKind,
      taskId: opts.taskId,
    },
    async () => {
      try {
        await opts.ctx.git.commit({
          message: opts.message,
          body: opts.body,
          env: opts.env,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "git commit failed";
        const code = classifyGitCommitFailure(message);
        if (code === "E_GIT") {
          const failureContext = await resolveGitMutationDiagnosticContext({
            command: "git commit",
            cwd: opts.ctx.resolvedProject.gitRoot,
            repoRoot: opts.ctx.resolvedProject.gitRoot,
            workflowMode: opts.ctx.config.workflow_mode,
            mutationKind: opts.mutationKind,
            taskId: opts.taskId,
            allowPrefixes: opts.allowPrefixes,
            changedPaths: opts.changedPaths,
            stagedPaths: opts.stagedPaths,
          });
          const failure = asCommitFailure(err, opts.phase, failureContext);
          if (failure) throw failure;
        }

        const remediation =
          code === "E_GIT_LOCKED"
            ? GIT_COMMIT_LOCK_REMEDIATION
            : code === "E_GIT_PERMISSION"
              ? GIT_COMMIT_PERMISSION_REMEDIATION
              : code === "E_GIT_RACE"
                ? GIT_COMMIT_RACE_REMEDIATION
                : "Retry once local git writers are idle and git state is readable.";
        throw new CliError({
          exitCode: exitCodeForError(code),
          code,
          message: `git commit failed: ${message}`,
          context: withDiagnosticContext(
            {
              ...(await resolveGitMutationDiagnosticContext({
                command: "git commit",
                cwd: opts.ctx.resolvedProject.gitRoot,
                repoRoot: opts.ctx.resolvedProject.gitRoot,
                workflowMode: opts.ctx.config.workflow_mode,
                mutationKind: opts.mutationKind,
                taskId: opts.taskId,
                allowPrefixes: opts.allowPrefixes,
                changedPaths: opts.changedPaths,
                stagedPaths: opts.stagedPaths,
              })),
              remediation,
            },
            {
              state:
                code === "E_GIT_LOCKED" ? "Git index lock blocked commit" : "git commit failed",
              likelyCause:
                code === "E_GIT_LOCKED"
                  ? "A git index lock file is present or another process is actively writing git index."
                  : "The commit pre-conditions or hook/policy checks failed while writing repository state.",
              nextAction: {
                command: "agentplane doctor git-locks",
                reason: "inspect lock owner and safe recovery path before retry",
                reasonCode: "git_lock_diagnosis",
              },
            },
          ),
        });
      }
    },
  );
}

export async function cmdCommit(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  baseBranchOverride?: string | null;
  taskId: string;
  message: string;
  close: boolean;
  allow: string[];
  autoAllow: boolean;
  allowTasks: boolean;
  allowBase: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
  requireClean: boolean;
  quiet: boolean;
  closeUnstageOthers: boolean;
  closeCheckOnly: boolean;
  closeStageTaskArtifacts?: boolean;
  closeRefreshTaskArtifacts?: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

    if (opts.close) {
      return await cmdCloseCommit({ ...opts, ctx });
    }

    if (opts.autoAllow) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--auto-allow is disabled; pass explicit --allow <path-prefix>.",
      });
    }

    await ensureReconciledBeforeMutation({ ctx, command: "commit" });

    let autoStaged: string[] = [];
    const staged = await ctx.git.statusStagedPaths();
    if (staged.length === 0) {
      if (!hasExplicitCommitScope(opts)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message:
            "No staged files and no commit allowlist. Pass --allow <path-prefix>, use --allow-tasks for active task artifacts, or stage files manually.",
        });
      }
      autoStaged = await stageAllowlist({
        ctx,
        allow: opts.allow,
        allowTasks: opts.allowTasks,
        allowPolicy: opts.allowPolicy,
        allowConfig: opts.allowConfig,
        allowHooks: opts.allowHooks,
        allowCI: opts.allowCI,
        tasksPath: ctx.config.paths.tasks_path,
        workflowDir: ctx.config.paths.workflow_dir,
        taskId: opts.taskId,
        allowTaskOnly: true,
        emptyAllowMessage:
          "No staged files and no commit allowlist. Pass --allow <path-prefix>, use --allow-tasks for active task artifacts, or stage files manually.",
        noMatchMessage:
          "No changed files matched the commit allowlist (adjust --allow, protected allow flags, or --allow-tasks; otherwise stage files manually).",
        mutationKind: "implementation_commit",
      });
      if (!opts.quiet) {
        process.stdout.write(
          `${infoMessage(`commit auto-staged ${autoStaged.length} path(s) from allowlist`)}\n`,
        );
      }
    } else {
      autoStaged = await stageActiveTaskArtifactsFromAllowTasks({
        ctx,
        taskId: opts.taskId,
        allowTasks: opts.allowTasks,
      });
      if (autoStaged.length > 0 && !opts.quiet) {
        process.stdout.write(
          `${infoMessage(
            `commit auto-staged ${autoStaged.length} active task artifact path(s) from --allow-tasks`,
          )}\n`,
        );
      }
    }

    await guardCommitCheck({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      baseBranchOverride: opts.baseBranchOverride ?? null,
      taskId: opts.taskId,
      message: opts.message,
      allow: opts.allow,
      allowBase: opts.allowBase,
      allowTasks: opts.allowTasks,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
      requireClean: opts.requireClean,
      quiet: opts.quiet,
    });

    const env = buildGitCommitEnv({
      taskId: opts.taskId,
      allowTasks: opts.allowTasks,
      allowBase: opts.allowBase,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
      gitIdentity: await resolveCanonicalGitIdentity(),
    });
    const [changedPaths, stagedPaths] = await Promise.all([
      ctx.git.statusChangedPaths(),
      ctx.git.statusStagedPaths(),
    ]);
    await runCommitWithLock({
      ctx,
      taskId: opts.taskId,
      message: opts.message,
      body: appendDcoSignoff({ config: ctx.config }),
      env,
      allowPrefixes: opts.allow,
      changedPaths,
      stagedPaths,
      mutationKind: "implementation_commit",
      phase: "task_commit",
    });
    const primaryCommit = await ctx.git.headHashSubject();
    await refreshBranchPrArtifactsAfterTaskCommit({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      quiet: opts.quiet,
    });
    ctx.git.invalidateStatus();
    const amendedCommit = await commitRefreshedTaskArtifacts({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      sourceMessage: opts.message,
      quiet: opts.quiet,
    });

    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage(
          "committed",
          formatCommitRef(primaryCommit),
          [
            autoStaged.length > 0 ? `staged=${autoStaged.join(", ")}` : null,
            amendedCommit ? `amended=${formatCommitRef(amendedCommit)}` : null,
          ]
            .filter(Boolean)
            .join("; ") || undefined,
        )}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    const commitFailure = asCommitFailure(err, opts.close ? "close_commit" : "task_commit");
    if (commitFailure) throw commitFailure;
    throw mapCoreError(err, { command: "commit", root: opts.rootOverride ?? null });
  }
}

async function cmdCloseCommit(
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
