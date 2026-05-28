import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import type { RouteNextAction } from "./route-decision-types.js";
import type { RouteBlocker } from "./route-oracle.js";
import { workStartCommand } from "./work-start-command.js";

export function deriveNextAction(opts: {
  task: TaskData;
  resume: TaskResumeContext;
  workflowMode: string;
  prFlow: PrFlowStatusReport | null;
  blockers: readonly RouteBlocker[];
  batchOwnership: RouteBatchOwnership;
}): RouteNextAction {
  const id = opts.task.id;
  if (opts.task.status === "DONE") {
    if (opts.workflowMode !== "branch_pr") {
      return {
        code: "done",
        command: null,
        summary: "task is already done; no branch cleanup is required in direct workflow",
        requiresApproval: false,
      };
    }
    return {
      code: "cleanup",
      command: "agentplane cleanup merged",
      summary:
        "task is already done; pull the base branch and clean merged task branches/worktrees",
      requiresApproval: false,
    };
  }
  if (opts.task.plan_approval?.state !== "approved") {
    return {
      code: "approve_plan",
      command: `agentplane task plan approve ${id} --by ORCHESTRATOR`,
      summary: "approve the task plan before owner-scoped execution",
      requiresApproval: true,
    };
  }
  if (opts.workflowMode !== "branch_pr") {
    return {
      code: opts.resume.runner.next_action ?? "continue_direct",
      command: opts.resume.runner.next_command ?? `agentplane task verify-show ${id}`,
      summary: "continue the direct-mode task from the current checkout",
      requiresApproval: false,
    };
  }
  if (opts.batchOwnership.role === "included") {
    return opts.batchOwnership.nextOwnerAction;
  }
  if (opts.resume.runner.next_action === "wait") {
    return {
      code: "wait_runner",
      command: null,
      summary: "wait for the active runner or reclaim with explicit force if it is orphaned",
      requiresApproval: false,
    };
  }
  if (opts.blockers.some((blocker) => blocker.code === "missing_pr_branch")) {
    return {
      code: "start_or_recover_worktree",
      command: workStartCommand(opts.task),
      summary: "create or recover the dedicated branch_pr worktree before opening a PR",
      requiresApproval: false,
    };
  }
  if (opts.blockers.some((blocker) => blocker.code === "pr_meta_stale")) {
    return {
      code: "update_pr_artifacts",
      command: `agentplane pr update ${id}`,
      summary: "refresh stale PR metadata before hosted checks or integration",
      requiresApproval: false,
    };
  }
  if (opts.prFlow?.pr.state === "not_found") {
    return {
      code: "open_pr",
      command: `agentplane pr open ${id} --author ${opts.task.owner}`,
      summary: "publish/link the task PR",
      requiresApproval: false,
    };
  }
  if (opts.prFlow?.pr.state === "OPEN") {
    return {
      code: "wait_hosted_checks",
      command: `agentplane integrate queue enqueue ${id} --branch ${opts.prFlow.branch.name ?? "<branch>"}`,
      summary: "enqueue the verified branch after hosted checks are stable",
      requiresApproval: false,
    };
  }
  if (opts.prFlow?.closeTail.state === "open") {
    return {
      code: "merge_close_tail",
      command: null,
      summary: "wait for hosted checks and merge the close-tail PR through the provider",
      requiresApproval: true,
    };
  }
  if (opts.prFlow?.closeTail.state === "not_found") {
    return {
      code: "open_close_tail",
      command: `agentplane task hosted-close-pr ${id}`,
      summary: "open the hosted close-tail PR for the merged implementation PR",
      requiresApproval: false,
    };
  }
  return {
    code: "verify_or_update_pr",
    command: `agentplane pr update ${id}`,
    summary: "refresh PR artifacts, verify, then queue integration",
    requiresApproval: false,
  };
}
