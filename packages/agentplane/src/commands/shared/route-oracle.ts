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
  authoritativeCheckoutPath: string | null;
  mutationPathHint: string | null;
  blocker: RouteBlocker | null;
  nextCommand: string | null;
  summary: string;
};

export type RouteExecutionPacket = {
  schemaVersion: 1;
  actionKind: "local_command" | "provider_action" | "wait" | "stop";
  safeToMutate: boolean;
  requiresProviderAction: boolean;
  recommendedRole: "ORCHESTRATOR" | "CODER" | "INTEGRATOR" | "EVALUATOR" | "USER";
  authoritativeCheckout: RouteOracle["authoritativeCheckout"];
  authoritativeCheckoutPath: string | null;
  mutationPathHint: string | null;
  evidenceMissing: string[];
  verificationCandidate: string | null;
  stopReason: string | null;
};

function primaryBlocker(blockers: readonly RouteBlocker[]): RouteBlocker | null {
  return blockers[0] ? { ...blockers[0] } : null;
}

function actionKindFor(opts: {
  task: TaskData;
  nextAction: RouteBatchNextAction;
}): RouteExecutionPacket["actionKind"] {
  if (opts.task.status === "DONE" && opts.nextAction.command === null) return "stop";
  if (opts.nextAction.code.startsWith("wait_")) return "wait";
  if (opts.nextAction.requiresApproval && !opts.nextAction.command) return "provider_action";
  return opts.nextAction.command ? "local_command" : "stop";
}

function recommendedRoleFor(opts: {
  nextAction: RouteBatchNextAction;
  actionKind: RouteExecutionPacket["actionKind"];
}): RouteExecutionPacket["recommendedRole"] {
  if (opts.actionKind === "provider_action") return "USER";
  if (opts.nextAction.code === "approve_plan") return "ORCHESTRATOR";
  if (
    opts.nextAction.code === "wait_hosted_checks" ||
    opts.nextAction.code === "open_close_tail" ||
    opts.nextAction.code === "cleanup"
  ) {
    return "INTEGRATOR";
  }
  if (opts.nextAction.code.includes("verify")) return "EVALUATOR";
  return "CODER";
}

function evidenceMissingFor(opts: {
  task: TaskData;
  blockers: readonly RouteBlocker[];
  nextAction: RouteBatchNextAction;
}): string[] {
  const missing = new Set<string>();
  if (opts.task.plan_approval?.state !== "approved") missing.add("approved_plan");
  if (opts.task.verification?.state !== "ok" && opts.nextAction.code.includes("verify")) {
    missing.add("verification_record");
  }
  for (const blocker of opts.blockers) {
    if (blocker.code === "missing_pr_branch") missing.add("task_branch");
    if (blocker.code === "remote_pr_missing") missing.add("remote_pr");
    if (blocker.code === "pr_meta_stale") missing.add("fresh_pr_artifacts");
    if (blocker.code === "close_tail_missing") missing.add("close_tail_pr");
    if (blocker.code === "runner_alive") missing.add("runner_terminal_state");
  }
  return [...missing].toSorted((a, b) => a.localeCompare(b));
}

function verificationCandidateFor(nextAction: RouteBatchNextAction): string | null {
  if (nextAction.code.includes("verify")) return nextAction.command;
  if (nextAction.code === "update_pr_artifacts") return "agentplane pr check <task-id>";
  if (nextAction.code === "wait_hosted_checks") return "agentplane pr check <task-id>";
  return null;
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
      phase: opts.task.status === "DONE" ? "done" : "direct_execution",
      authoritativeCheckout: "current_checkout",
    });
  }
  if (opts.task.status === "DONE") {
    return buildOracle(opts, {
      phase: "done_pending_cleanup",
      authoritativeCheckout: "base_checkout",
    });
  }
  if (code === "approve_plan") {
    return buildOracle(opts, {
      phase: "needs_plan_approval",
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
  if (code === "wait_hosted_checks") {
    return buildOracle(opts, {
      phase: "pr_open_integration_lane",
      authoritativeCheckout: "base_checkout",
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
  if (code === "cleanup") {
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

export function deriveRouteExecutionPacket(opts: {
  task: TaskData;
  nextAction: RouteBatchNextAction;
  blockers: readonly RouteBlocker[];
  oracle: RouteOracle;
}): RouteExecutionPacket {
  const actionKind = actionKindFor({ task: opts.task, nextAction: opts.nextAction });
  const requiresProviderAction = actionKind === "provider_action";
  const stopReason =
    actionKind === "stop"
      ? (opts.blockers[0]?.summary ?? opts.nextAction.summary)
      : actionKind === "wait"
        ? opts.nextAction.summary
        : null;
  return {
    schemaVersion: 1,
    actionKind,
    safeToMutate: opts.oracle.mutationPathHint !== null,
    requiresProviderAction,
    recommendedRole: recommendedRoleFor({ nextAction: opts.nextAction, actionKind }),
    authoritativeCheckout: opts.oracle.authoritativeCheckout,
    authoritativeCheckoutPath: opts.oracle.authoritativeCheckoutPath,
    mutationPathHint: opts.oracle.mutationPathHint,
    evidenceMissing: evidenceMissingFor({
      task: opts.task,
      blockers: opts.blockers,
      nextAction: opts.nextAction,
    }),
    verificationCandidate: verificationCandidateFor(opts.nextAction),
    stopReason,
  };
}
