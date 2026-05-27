import type { TaskData } from "../../backends/task-backend.js";
import type { RouteBatchOwnership, RouteBatchNextAction } from "./route-batch-ownership.js";

export type RouteBlocker = {
  code: string;
  summary: string;
};

export type RouteOracle = {
  phase: string;
  authoritativeCheckout:
    | "base_checkout"
    | "task_worktree"
    | "current_checkout"
    | "primary_task_worktree"
    | "provider";
  blocker: RouteBlocker | null;
  nextCommand: string | null;
  summary: string;
};

function primaryBlocker(blockers: readonly RouteBlocker[]): RouteBlocker | null {
  return blockers[0] ? { ...blockers[0] } : null;
}

export function deriveRouteOracle(opts: {
  task: TaskData;
  workflowMode: string;
  nextAction: RouteBatchNextAction;
  blockers: readonly RouteBlocker[];
  batchOwnership: RouteBatchOwnership;
}): RouteOracle {
  const code = opts.nextAction.code;
  const blocker = primaryBlocker(opts.blockers);
  if (opts.workflowMode !== "branch_pr") {
    return {
      phase: opts.task.status === "DONE" ? "done" : "direct_execution",
      authoritativeCheckout: "current_checkout",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (opts.batchOwnership.role === "included") {
    return {
      phase: "batch_delegate",
      authoritativeCheckout: "primary_task_worktree",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (opts.task.status === "DONE") {
    return {
      phase: "done_pending_cleanup",
      authoritativeCheckout: "base_checkout",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "approve_plan") {
    return {
      phase: "needs_plan_approval",
      authoritativeCheckout: "base_checkout",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "start_or_recover_worktree") {
    return {
      phase: "worktree_needed",
      authoritativeCheckout: "base_checkout",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "wait_runner") {
    return {
      phase: "runner_wait",
      authoritativeCheckout: "task_worktree",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "open_pr") {
    return {
      phase: "pr_needed",
      authoritativeCheckout: "task_worktree",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "update_pr_artifacts" || code === "verify_or_update_pr") {
    return {
      phase: code === "update_pr_artifacts" ? "pr_artifacts_stale" : "verify_or_pr_update",
      authoritativeCheckout: "task_worktree",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "wait_hosted_checks") {
    return {
      phase: "pr_open_integration_lane",
      authoritativeCheckout: "base_checkout",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "open_close_tail") {
    return {
      phase: "close_tail_needed",
      authoritativeCheckout: "base_checkout",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "merge_close_tail") {
    return {
      phase: "close_tail_provider_lane",
      authoritativeCheckout: "provider",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  if (code === "cleanup") {
    return {
      phase: "done_pending_cleanup",
      authoritativeCheckout: "base_checkout",
      blocker,
      nextCommand: opts.nextAction.command,
      summary: opts.nextAction.summary,
    };
  }
  return {
    phase: code,
    authoritativeCheckout: "current_checkout",
    blocker,
    nextCommand: opts.nextAction.command,
    summary: opts.nextAction.summary,
  };
}
