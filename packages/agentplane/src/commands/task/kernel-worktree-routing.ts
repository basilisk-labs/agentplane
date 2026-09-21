import { gitCurrentBranch, listWorktrees, parseTaskIdFromBranch } from "@agentplaneorg/core/git";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { CommandContext } from "../shared/task-backend.js";

import { executeAdmittedBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";

type WorktreeAction = {
  kind: "external_wait";
  reason: "canonical_worktree_prepared";
  must_run_from: string;
};

function action(target: string): WorktreeAction {
  return {
    kind: "external_wait",
    reason: "canonical_worktree_prepared",
    must_run_from: target,
  };
}

async function findTaskWorktree(opts: {
  root: string;
  taskPrefix: string;
  taskId: string;
}): Promise<string | null> {
  const worktrees = await listWorktrees(opts.root);
  const matches = worktrees.filter(
    (entry) =>
      entry.branch !== null && parseTaskIdFromBranch(opts.taskPrefix, entry.branch) === opts.taskId,
  );
  if (matches.length > 1) {
    throw new Error(
      `Multiple worktrees are registered for task ${opts.taskId}: ${matches
        .map((entry) => entry.path)
        .join(", ")}`,
    );
  }
  return matches[0]?.path ?? null;
}

export async function ensureCanonicalTaskWorktree(opts: {
  command: CommandContext;
  task: TaskData;
  taskId: string;
  reasonCode: string;
  hasWorkItem: boolean;
}): Promise<WorktreeAction | null> {
  if (!opts.hasWorkItem || opts.task.execution_route?.repository_mode !== "branch_pr") return null;
  if (
    opts.reasonCode !== "kernel_work_item_execution_required" &&
    opts.reasonCode !== "kernel_work_item_result_required"
  )
    return null;

  const root = opts.command.resolvedProject.gitRoot;
  const taskPrefix = opts.command.config.branch.task_prefix;
  const currentBranch = await gitCurrentBranch(root);
  const alreadyInTaskWorktree = parseTaskIdFromBranch(taskPrefix, currentBranch) === opts.taskId;
  if (!alreadyInTaskWorktree) {
    const target = await findTaskWorktree({ root, taskPrefix, taskId: opts.taskId });
    if (target) return action(target);
  }
  if (opts.reasonCode === "kernel_work_item_result_required" || alreadyInTaskWorktree) return null;

  const workflow = await buildTaskRouteDecision({
    ctx: opts.command,
    cwd: root,
    rootOverride: null,
    includeRemote: false,
    freshHead: true,
    taskId: opts.taskId,
  });
  const routedCheckout = workflow.workspace.taskWorktreePath;
  if (routedCheckout && path.resolve(routedCheckout) !== path.resolve(root)) {
    return action(routedCheckout);
  }
  const prepareOperation =
    workflow.workflowStep.kind === "cli_operation" &&
    workflow.workflowStep.operation.id === "worktree.prepare"
      ? workflow.workflowStep.operation
      : null;
  if (!prepareOperation) {
    throw new Error(
      "Canonical worktree preparation requires the admitted worktree.prepare operation.",
    );
  }
  const prepared = await executeAdmittedBranchWorkflowOperation({
    decision: workflow,
    git_root: root,
    refresh: async () =>
      await buildTaskRouteDecision({
        ctx: opts.command,
        cwd: root,
        rootOverride: null,
        includeRemote: false,
        freshHead: true,
        taskId: opts.taskId,
      }),
  });
  if (!prepared.execution.executable || prepared.execution.result?.status !== "succeeded") {
    throw new Error(
      `Canonical worktree preparation failed: ${prepared.execution.stop_reason ?? prepared.execution.result?.detail ?? "route refresh unavailable"}`,
    );
  }
  const refreshed = prepared.execution.refreshed_decision;
  const target =
    refreshed?.workspace.taskWorktreePath ??
    (await findTaskWorktree({ root, taskPrefix, taskId: opts.taskId }));
  if (!target) {
    throw new Error(
      `Canonical worktree preparation has no task checkout: ${prepared.execution.stop_reason ?? "route refresh did not expose a worktree"}`,
    );
  }
  return action(target);
}
