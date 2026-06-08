import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import type { RouteNextAction } from "./route-decision-types.js";
import type { RouteBlocker } from "./route-oracle.js";
import { workStartCommand } from "./work-start-command.js";
import { isRecord } from "../../shared/guards.js";

function verifiedIncludedClosureCandidate(task: TaskData): boolean {
  if (task.verification?.state !== "ok") return false;
  if (String(task.status).toUpperCase() !== "DOING") return false;
  if (task.commit?.hash) return false;
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  if (batch?.role === "primary") return false;
  if (batch?.role === "included") return true;
  return false;
}

function proseOnlyIncludedClosureCandidate(task: TaskData): boolean {
  if (task.verification?.state !== "ok") return false;
  if (String(task.status).toUpperCase() !== "DOING") return false;
  if (task.commit?.hash) return false;
  const haystack = [
    task.title,
    task.description,
    typeof task.doc === "string" ? task.doc : "",
    ...(Array.isArray(task.comments) ? task.comments.map((comment) => comment.body) : []),
  ]
    .join("\n")
    .toLowerCase();
  return (
    haystack.includes("included in batch") ||
    haystack.includes("included in the batch") ||
    haystack.includes("included task from merged") ||
    haystack.includes("closed included batch task") ||
    haystack.includes("batch worktree") ||
    haystack.includes("included tasks in batch")
  );
}

export function deriveNextAction(opts: {
  task: TaskData;
  resume: TaskResumeContext;
  workflowMode: string;
  prFlow: PrFlowStatusReport | null;
  blockers: readonly RouteBlocker[];
  batchOwnership: RouteBatchOwnership;
}): RouteNextAction {
  const id = opts.task.id;
  if (opts.task.status === "DONE" && opts.workflowMode !== "branch_pr") {
    return {
      code: "done",
      command: null,
      summary: "task is already done; no branch cleanup is required in direct workflow",
      requiresApproval: false,
    };
  }
  if (opts.task.status === "DONE" && opts.workflowMode === "branch_pr") {
    if (opts.prFlow?.pr.state === "OPEN") {
      return {
        code: "wait_hosted_checks",
        command: `agentplane integrate queue enqueue ${id} --branch ${opts.prFlow.branch.name ?? "<branch>"}`,
        summary: "pre-merge closure is recorded; wait for hosted checks and merge the task PR",
        requiresApproval: false,
      };
    }
    if (opts.prFlow?.pr.state === "CLOSED") {
      return {
        code: "inspect_pr",
        command: null,
        summary:
          "task is done but the implementation PR is closed before merge; inspect or reopen it",
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
    if (
      opts.task.verification?.state === "ok" &&
      String(opts.task.status).toUpperCase() === "DOING"
    ) {
      return {
        code: "complete_direct",
        command: `agentplane task complete ${id} --result "<result>" --commit <hash>`,
        summary:
          "task is already verified in direct workflow; close it with task complete instead of rerunning execution",
        requiresApproval: false,
      };
    }
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
  if (!opts.prFlow?.branch.name && verifiedIncludedClosureCandidate(opts.task)) {
    return {
      code: "reconcile_included_task_closure",
      command: `agentplane release tasks reconcile --task-id ${id}`,
      summary:
        "verified included batch task appears landed but lacks closure metadata; reconcile landed evidence before starting a new worktree",
      requiresApproval: false,
    };
  }
  if (!opts.prFlow?.branch.name && proseOnlyIncludedClosureCandidate(opts.task)) {
    return {
      code: "repair_included_batch_metadata",
      command: null,
      summary:
        "task text mentions included batch closure but structured branch_pr batch metadata is missing; restore extensions.branch_pr_batch or primary PR batch metadata before reconciling",
      requiresApproval: false,
    };
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
  if (
    opts.prFlow?.closeTail.state === "merged" ||
    opts.prFlow?.closeTail.state === "recorded_on_base"
  ) {
    const base =
      opts.prFlow.closeTail.state === "recorded_on_base"
        ? opts.prFlow.closeTail.base
        : (opts.prFlow.pr.base ?? "main");
    return {
      code: "sync_hosted_close",
      command: "agentplane cleanup merged --finalize",
      summary:
        "hosted close-tail already landed upstream; finalize base sync and clean merged task branches/worktrees",
      requiresApproval: false,
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
