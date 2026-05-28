import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";
import {
  resolveGitIndexLockInfo,
  resolveGitMutationDiagnosticContext,
  withGitMutationMutex,
  type GitMutationKind,
} from "../../../../shared/git-mutation.js";
import { withDiagnosticContext } from "../../../shared/diagnostics.js";

const GIT_INTEGRATE_LOCK_REMEDIATION =
  "Wait for the active AgentPlane write operation in this worktree, then retry integration.";

function classifyGitMutationFailure(
  message: string,
): "E_GIT_LOCKED" | "E_GIT_PERMISSION" | "E_GIT_RACE" | "E_GIT" {
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

export async function runWithIntegrationMutation<T>(opts: {
  repoRoot: string;
  command: string;
  workflowMode: string;
  taskId: string;
  changedPaths: string[];
  run: () => Promise<T>;
}): Promise<T> {
  const lockInfo = await resolveGitIndexLockInfo({ repoRoot: opts.repoRoot });
  if (lockInfo) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT_LOCKED"),
      code: "E_GIT_LOCKED",
      message: `Git index is locked before ${opts.command}: ${lockInfo.lockPath}`,
      context: {
        ...(await resolveGitMutationDiagnosticContext({
          command: opts.command,
          cwd: opts.repoRoot,
          repoRoot: opts.repoRoot,
          workflowMode: opts.workflowMode,
          mutationKind: "integration" as GitMutationKind,
          taskId: opts.taskId,
          changedPaths: opts.changedPaths,
          stagedPaths: [],
        })),
        remediation: GIT_INTEGRATE_LOCK_REMEDIATION,
        git_index_lock_path: lockInfo.lockPath,
        git_index_lock_age_ms: lockInfo.ageMs,
      },
    });
  }

  return withGitMutationMutex(
    {
      repoRoot: opts.repoRoot,
      operation: `git-${opts.command.replaceAll(/[^A-Za-z0-9_-]/g, "-")}`,
      workflowMode: opts.workflowMode,
      mutationKind: "integration" as GitMutationKind,
      taskId: opts.taskId,
    },
    async () => {
      try {
        return await opts.run();
      } catch (err) {
        const message = err instanceof Error ? err.message : `${opts.command} failed`;
        const code = classifyGitMutationFailure(message);
        const remediation =
          code === "E_GIT_LOCKED"
            ? GIT_INTEGRATE_LOCK_REMEDIATION
            : code === "E_GIT_PERMISSION"
              ? "Check repository ownership and writable permissions for worktree metadata."
              : code === "E_GIT_RACE"
                ? "A conflicting integration writer is active; retry after it finishes."
                : "Inspect git error output and retry integration.";
        throw new CliError({
          exitCode: exitCodeForError(code),
          code,
          message: `${opts.command} failed: ${message}`,
          context: withDiagnosticContext(
            {
              ...(await resolveGitMutationDiagnosticContext({
                command: opts.command,
                cwd: opts.repoRoot,
                repoRoot: opts.repoRoot,
                workflowMode: opts.workflowMode,
                mutationKind: "integration" as GitMutationKind,
                taskId: opts.taskId,
                changedPaths: opts.changedPaths,
                stagedPaths: [],
              })),
              remediation,
            },
            {
              state: `${opts.command} failed during integration mutation`,
              likelyCause: "A git mutation failed while handling the integration worktree.",
              nextAction: {
                command: "agentplane doctor git-locks",
                reason: "inspect active locks and retry in a clean worktree context",
                reasonCode: "git_lock_diagnosis",
              },
            },
          ),
        });
      }
    },
  );
}
