import { exitCodeForError } from "../../../cli/exit-codes.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError, type ErrorCode } from "../../../shared/errors.js";
import {
  resolveGitIndexLockInfo,
  resolveGitMutationDiagnosticContext,
  withGitMutationMutex,
  type GitMutationKind,
} from "../../../shared/git-mutation.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { asCommitFailure } from "./commit-diagnostics.js";

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

export async function runCommitWithLock(opts: {
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
