import {
  findWorktreeForBranch,
  gitCurrentBranch,
  parseTaskIdFromBranch,
  taskBranchName,
} from "@agentplaneorg/core/git";
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
  const slug = `canonical-${opts.taskId.split("-").at(-1)!.toLowerCase()}`;
  const expectedBranch = taskBranchName({ taskPrefix, taskId: opts.taskId, slug });
  const currentBranch = await gitCurrentBranch(root);
  const alreadyInTaskWorktree = parseTaskIdFromBranch(taskPrefix, currentBranch) === opts.taskId;
  if (!alreadyInTaskWorktree) {
    const target = await findWorktreeForBranch(root, expectedBranch);
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
  if (
    !prepared.execution.executable ||
    prepared.execution.result?.status !== "succeeded" ||
    prepared.execution.stop_reason !== null ||
    prepared.execution.refreshed_decision === null
  ) {
    throw new Error(
      `Canonical worktree preparation failed: ${prepared.execution.stop_reason ?? prepared.execution.result?.detail ?? "route refresh unavailable"}`,
    );
  }
  const refreshed = prepared.execution.refreshed_decision;
  const target =
    refreshed.workspace.taskWorktreePath ?? (await findWorktreeForBranch(root, expectedBranch));
  if (!target) throw new Error("Canonical worktree preparation has no task checkout");
  return action(target);
}
