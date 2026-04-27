import { findWorktreeForBranch, resolveBaseBranch } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { withDiagnosticContext } from "./diagnostics.js";
import { gitCurrentBranch } from "./git-ops.js";
import type { CommandContext } from "./task-backend.js";

type WorkflowMode = CommandContext["config"]["workflow_mode"];

export type BranchPrLifecycleContext = {
  baseBranch: string;
  currentBranch: string;
};

export async function resolveBranchPrLifecycleContext(opts: {
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  workflowMode: WorkflowMode;
  cliBaseOpt?: string | null;
  missingBaseMessage: string;
}): Promise<BranchPrLifecycleContext> {
  if (opts.workflowMode !== "branch_pr") {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: workflowModeMessage(opts.workflowMode, "branch_pr"),
    });
  }

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: opts.cliBaseOpt ?? null,
    mode: opts.workflowMode,
  });
  if (!baseBranch) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: opts.missingBaseMessage,
    });
  }

  return {
    baseBranch,
    currentBranch: await gitCurrentBranch(opts.gitRoot),
  };
}

export async function ensureBranchPrBaseCheckout(opts: {
  context: BranchPrLifecycleContext;
  gitRoot: string;
  command: string;
  taskId?: string;
  taskBranch?: string;
  mismatchMessage?: string;
}): Promise<void> {
  const { baseBranch, currentBranch } = opts.context;
  const taskBranch = opts.taskBranch?.trim() ?? "";
  if (currentBranch === baseBranch) return;

  if (taskBranch && currentBranch === taskBranch) {
    const baseWorktreePath = await findWorktreeForBranch(opts.gitRoot, baseBranch);
    const rerunCommand =
      baseWorktreePath && baseWorktreePath.trim().length > 0
        ? `agentplane ${opts.command} ${opts.taskId ?? ""} --branch ${taskBranch} --root ${baseWorktreePath}`.trim()
        : `git checkout ${baseBranch} && agentplane ${opts.command} ${opts.taskId ?? ""} --branch ${taskBranch}`.trim();
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message:
        `${opts.command} must run from the ${baseBranch} base checkout, not from task branch ${taskBranch}. ` +
        `Rerun it against the base checkout after leaving this task worktree.`,
      context: withDiagnosticContext(
        {
          command: opts.command,
          ...(opts.taskId ? { task_id: opts.taskId } : {}),
          branch: taskBranch,
          base_branch: baseBranch,
          current_branch: currentBranch,
          ...(baseWorktreePath ? { base_worktree_path: baseWorktreePath } : {}),
          reason_code: `${opts.command.replaceAll(" ", "_")}_base_checkout_required`,
        },
        {
          state: `${opts.command} was invoked from task branch ${taskBranch} instead of base branch ${baseBranch}`,
          likelyCause:
            "the operator is inside the task worktree, but branch_pr base integration is only valid from the registered base checkout",
          hint: "Use the base checkout/worktree for the resolved base branch, not the task branch worktree, when running the command.",
          nextAction: {
            command: rerunCommand,
            reason: "rerun against the base checkout route",
            reasonCode: `${opts.command.replaceAll(" ", "_")}_base_checkout_required`,
          },
        },
      ),
    });
  }

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      opts.mismatchMessage ??
      `${opts.command} must run on base branch ${baseBranch} (current: ${currentBranch})`,
  });
}
