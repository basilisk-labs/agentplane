import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import type { RouteBlocker } from "./route-oracle.js";
import { isTaskLocalOnlyAdvance } from "./task-local-freshness.js";
import type { CommandContext } from "./task-backend.js";

function addBlocker(blockers: RouteBlocker[], code: string, summary: string): void {
  if (blockers.some((blocker) => blocker.code === code)) return;
  blockers.push({ code, summary });
}

async function isPrMetaOnlyTaskLocalAdvance(opts: {
  ctx: CommandContext;
  taskId: string;
  prFlow: PrFlowStatusReport | null;
}): Promise<boolean> {
  const branchHeadSha = opts.prFlow?.branch.headSha ?? null;
  const metaHeadSha = opts.prFlow?.branch.metaHeadSha ?? null;
  if (!branchHeadSha || !metaHeadSha || branchHeadSha === metaHeadSha) return false;
  return isTaskLocalOnlyAdvance({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    tasksPath: opts.ctx.config.paths.tasks_path,
    taskId: opts.taskId,
    fromRef: metaHeadSha,
    toRef: branchHeadSha,
  }).catch(() => false);
}

export async function deriveBlockers(opts: {
  ctx: CommandContext;
  task: TaskData;
  resume: TaskResumeContext;
  workflowMode: string;
  prFlow: PrFlowStatusReport | null;
  batchOwnership: RouteBatchOwnership;
}): Promise<RouteBlocker[]> {
  const blockers: RouteBlocker[] = [];
  if (opts.task.status === "DONE") return blockers;
  if (opts.task.plan_approval?.state !== "approved") {
    addBlocker(blockers, "plan_not_approved", "task plan is not approved");
  }
  if (opts.workflowMode === "branch_pr") {
    if (
      opts.batchOwnership.role !== "included" &&
      !opts.resume.pr_branch &&
      !opts.prFlow?.branch.name
    ) {
      addBlocker(blockers, "missing_pr_branch", "branch_pr task has no recorded PR branch");
    }
    if (opts.resume.branch === opts.resume.base_branch) {
      addBlocker(blockers, "on_base_checkout", "current checkout appears to be the base branch");
    }
    if (opts.prFlow?.pr.state === "not_found") {
      addBlocker(blockers, "remote_pr_missing", "task branch is not linked to a remote PR");
    }
    if (opts.prFlow?.branch.name && !opts.prFlow.branch.headSha) {
      addBlocker(
        blockers,
        "branch_head_missing",
        "recorded task branch cannot be resolved locally",
      );
    }
    if (
      opts.prFlow?.branch.headSha &&
      opts.prFlow.branch.metaHeadSha &&
      opts.prFlow.branch.headSha !== opts.prFlow.branch.metaHeadSha &&
      !(await isPrMetaOnlyTaskLocalAdvance({
        ctx: opts.ctx,
        taskId: opts.task.id,
        prFlow: opts.prFlow,
      }))
    ) {
      addBlocker(blockers, "pr_meta_stale", "PR metadata head differs from local branch head");
    }
    if (opts.prFlow?.closeTail.state === "open") {
      addBlocker(blockers, "close_tail_open", "hosted close-tail PR is still open");
    }
    if (opts.prFlow?.closeTail.state === "not_found") {
      addBlocker(
        blockers,
        "close_tail_missing",
        "implementation PR is merged but close-tail is missing",
      );
    }
  }
  if (opts.resume.runner.next_action === "wait") {
    addBlocker(blockers, "runner_alive", "latest runner still appears alive");
  }
  return blockers;
}
