import type { TaskData } from "../../backends/task-backend.js";
import type { RouteBatchOwnership, RouteBatchNextAction } from "./route-batch-ownership.js";
import { actionKindFor } from "./route-execution-packet.js";

export { deriveRouteExecutionPacket, type RouteExecutionPacket } from "./route-execution-packet.js";

export type RouteBlockerCode =
  | "branch_head_missing"
  | "close_tail_missing"
  | "close_tail_open"
  | "dirty_task_artifacts"
  | "human_input_required"
  | "missing_included_batch_metadata"
  | "missing_pr_branch"
  | "on_base_checkout"
  | "plan_not_approved"
  | "pr_meta_stale"
  | "pre_merge_closure_missing"
  | "quality_review_missing"
  | "quality_review_stale"
  | "remote_pr_missing"
  | "runner_alive";

export type RouteBlocker = {
  code: RouteBlockerCode;
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
  authoritativeCheckoutPath: string | null;
  mutationPathHint: string | null;
  blocker: RouteBlocker | null;
  nextCommand: string | null;
  summary: string;
};

function primaryBlocker(blockers: readonly RouteBlocker[]): RouteBlocker | null {
  return blockers[0] ? { ...blockers[0] } : null;
}

function checkoutPathFor(
  checkout: RouteOracle["authoritativeCheckout"],
  paths: {
    baseCheckoutPath?: string | null;
    taskWorktreePath?: string | null;
    primaryTaskWorktreePath?: string | null;
    currentCheckoutPath?: string | null;
  },
): string | null {
  if (checkout === "base_checkout") return paths.baseCheckoutPath ?? null;
  if (checkout === "task_worktree") return paths.taskWorktreePath ?? null;
  if (checkout === "primary_task_worktree") return paths.primaryTaskWorktreePath ?? null;
  if (checkout === "current_checkout") return paths.currentCheckoutPath ?? null;
  return null;
}

function buildOracle(
  opts: {
    task: TaskData;
    nextAction: RouteBatchNextAction;
    blockers: readonly RouteBlocker[];
    paths?: {
      baseCheckoutPath?: string | null;
      taskWorktreePath?: string | null;
      primaryTaskWorktreePath?: string | null;
      currentCheckoutPath?: string | null;
    };
  },
  route: Pick<RouteOracle, "phase" | "authoritativeCheckout">,
): RouteOracle {
  const actionKind = actionKindFor({ task: opts.task, nextAction: opts.nextAction });
  const authoritativeCheckoutPath = checkoutPathFor(route.authoritativeCheckout, opts.paths ?? {});
  const safeToMutate =
    actionKind === "local_command" &&
    opts.nextAction.requiresApproval !== true &&
    opts.blockers.every((blocker) => blocker.code !== "runner_alive") &&
    authoritativeCheckoutPath !== null;
  return {
    ...route,
    authoritativeCheckoutPath,
    mutationPathHint: safeToMutate ? authoritativeCheckoutPath : null,
    blocker: primaryBlocker(opts.blockers),
    nextCommand: opts.nextAction.command,
    summary: opts.nextAction.summary,
  };
}

export function deriveRouteOracle(opts: {
  task: TaskData;
  workflowMode: string;
  nextAction: RouteBatchNextAction;
  blockers: readonly RouteBlocker[];
  batchOwnership: RouteBatchOwnership;
  paths?: {
    baseCheckoutPath?: string | null;
    taskWorktreePath?: string | null;
    primaryTaskWorktreePath?: string | null;
    currentCheckoutPath?: string | null;
  };
}): RouteOracle {
  const code = opts.nextAction.code;
  if (opts.workflowMode !== "branch_pr") {
    return buildOracle(opts, {
      phase:
        code === "commit_direct_task_artifacts"
          ? "direct_done_pending_artifact_commit"
          : opts.task.status === "DONE"
            ? "done"
            : code === "complete_direct"
              ? "direct_verified_pending_closeout"
              : "direct_execution",
      authoritativeCheckout: "current_checkout",
    });
  }
  if (code === "approve_plan") {
    return buildOracle(opts, {
      phase: "needs_plan_approval",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (code === "done") {
    return buildOracle(opts, {
      phase: "done",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (opts.batchOwnership.role === "included") {
    return buildOracle(opts, {
      phase: "batch_delegate",
      authoritativeCheckout: "primary_task_worktree",
    });
  }
  if (code === "start_or_recover_worktree") {
    return buildOracle(opts, {
      phase: "worktree_needed",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (code === "reconcile_included_task_closure") {
    return buildOracle(opts, {
      phase: "included_task_closure_needed",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (code === "repair_included_batch_metadata") {
    return buildOracle(opts, {
      phase: "included_task_metadata_missing",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (code === "wait_runner") {
    return buildOracle(opts, {
      phase: "runner_wait",
      authoritativeCheckout: "task_worktree",
    });
  }
  if (code === "open_pr") {
    return buildOracle(opts, {
      phase: "pr_needed",
      authoritativeCheckout: "task_worktree",
    });
  }
  if (code === "update_pr_artifacts" || code === "verify_or_update_pr") {
    return buildOracle(opts, {
      phase: code === "update_pr_artifacts" ? "pr_artifacts_stale" : "verify_or_pr_update",
      authoritativeCheckout: "task_worktree",
    });
  }
  if (code === "run_quality_review") {
    return buildOracle(opts, {
      phase: "quality_review_needed",
      authoritativeCheckout: "task_worktree",
    });
  }
  if (code === "record_pre_merge_closure") {
    return buildOracle(opts, {
      phase: "pre_merge_closure_needed",
      authoritativeCheckout: "task_worktree",
    });
  }
  if (code === "wait_hosted_checks") {
    return buildOracle(opts, {
      phase: "pr_open_integration_lane",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (code === "inspect_pr") {
    return buildOracle(opts, {
      phase: "pr_provider_attention",
      authoritativeCheckout: "provider",
    });
  }
  if (code === "open_close_tail") {
    return buildOracle(opts, {
      phase: "close_tail_needed",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (code === "merge_close_tail") {
    return buildOracle(opts, {
      phase: "close_tail_provider_lane",
      authoritativeCheckout: "provider",
    });
  }
  if (code === "sync_hosted_close") {
    return buildOracle(opts, {
      phase: "hosted_close_recorded_upstream",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (code === "cleanup") {
    return buildOracle(opts, {
      phase: "done_pending_cleanup",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (opts.task.status === "DONE") {
    return buildOracle(opts, {
      phase: "done_pending_cleanup",
      authoritativeCheckout: "base_checkout",
    });
  }
  return buildOracle(opts, {
    phase: code,
    authoritativeCheckout: "current_checkout",
  });
}
