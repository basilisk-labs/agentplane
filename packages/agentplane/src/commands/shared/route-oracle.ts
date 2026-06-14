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
  mustRunFrom: string | null;
  exactArgv: string[] | null;
  mustNot: string[];
  returnControlWhen: string;
  humanProviderAction: string | null;
  staleStateCheck: string;
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
  if (opts.nextAction.requiresApproval) return "provider_action";
  if (!opts.nextAction.command && opts.nextAction.code.startsWith("wait_")) return "wait";
  if (!opts.nextAction.command) return "stop";
  return exactArgvFor(opts.nextAction.command) ? "local_command" : "stop";
}

function recommendedRoleFor(opts: {
  nextAction: RouteBatchNextAction;
  actionKind: RouteExecutionPacket["actionKind"];
}): RouteExecutionPacket["recommendedRole"] {
  if (opts.actionKind === "provider_action") return "USER";
  if (opts.nextAction.code === "approve_plan") return "ORCHESTRATOR";
  if (
    opts.nextAction.code === "open_pr" ||
    opts.nextAction.code === "update_pr_artifacts" ||
    opts.nextAction.code === "verify_or_update_pr"
  ) {
    return "CODER";
  }
  if (opts.nextAction.code === "run_quality_review") return "EVALUATOR";
  if (opts.nextAction.code === "record_pre_merge_closure") return "CODER";
  if (
    opts.nextAction.code === "wait_hosted_checks" ||
    opts.nextAction.code === "open_close_tail" ||
    opts.nextAction.code === "sync_hosted_close" ||
    opts.nextAction.code === "cleanup" ||
    opts.nextAction.code === "reconcile_included_task_closure"
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
    if (blocker.code === "dirty_task_artifacts") missing.add("task_artifact_cleanup_commit");
    if (blocker.code === "quality_review_missing") missing.add("evaluator_quality_review");
    if (blocker.code === "quality_review_stale") missing.add("fresh_evaluator_quality_review");
    if (blocker.code === "pre_merge_closure_missing") missing.add("pre_merge_closure");
    if (blocker.code === "missing_included_batch_metadata") {
      missing.add("structured_branch_pr_batch_metadata");
    }
  }
  return [...missing].toSorted((a, b) => a.localeCompare(b));
}

function verificationCandidateFor(nextAction: RouteBatchNextAction): string | null {
  if (nextAction.code === "verify_or_update_pr") return "agentplane pr check <task-id>";
  if (nextAction.code.includes("verify")) return nextAction.command;
  if (nextAction.code === "run_quality_review") return nextAction.command;
  if (nextAction.code === "update_pr_artifacts") return "agentplane pr check <task-id>";
  if (nextAction.code === "wait_hosted_checks") return "agentplane pr check <task-id>";
  return null;
}

function exactArgvFor(command: string | null): string[] | null {
  const trimmed = command?.trim() ?? "";
  if (!trimmed) return null;
  if (/[;&|<>`$]/u.test(trimmed)) return null;
  const args: string[] = [];
  let current = "";
  let quote: "'" | '"' | null = null;
  for (const char of trimmed) {
    if (quote) {
      if (char === quote) {
        quote = null;
      } else {
        current += char;
      }
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (/\s/u.test(char)) {
      if (current) {
        args.push(current);
        current = "";
      }
      continue;
    }
    current += char;
  }
  if (quote) return null;
  if (current) args.push(current);
  return args.length > 0 ? args : null;
}

function automationBoundaryMustNotFor(code: string): string[] {
  const rules: Record<string, string[]> = {
    open_pr: [
      "do not create/link the hosted PR manually; agentplane pr open owns branch publish, PR artifacts, and PR creation/linking",
    ],
    update_pr_artifacts: [
      "do not repair stale PR artifacts with manual edits or amend commits; agentplane pr update/pr check own PR artifact freshness",
    ],
    verify_or_update_pr: [
      "do not repair stale PR artifacts with manual edits or amend commits; agentplane pr update/pr check own PR artifact freshness",
      "do not amend only to align quality_review.evaluated_sha; rerun evaluator on current HEAD, then recompute the route",
    ],
    run_quality_review: [
      "do not publish or queue the PR before quality_review is recorded for the current implementation head",
    ],
    record_pre_merge_closure: [
      "do not queue integration before the pre-merge closure marker is committed on the task branch",
    ],
    wait_hosted_checks: [
      "do not merge/rebase/squash the task branch manually; integrate queue/integrate own the serialized merge lane",
      "do not amend only to align quality_review.evaluated_sha; rerun evaluator on current HEAD, then recompute the route",
    ],
    open_close_tail: [
      "do not write close-tail artifacts manually; agentplane task hosted-close-pr owns close-tail recovery",
    ],
    sync_hosted_close: [
      "do not recreate close-tail evidence after hosted close landed; sync base truth, then run AgentPlane cleanup",
    ],
    cleanup: [
      "do not delete task branches/worktrees manually; agentplane cleanup merged owns merged-work cleanup",
    ],
  };
  return rules[code] ?? [];
}

function mustNotFor(opts: {
  actionKind: RouteExecutionPacket["actionKind"];
  nextAction: RouteBatchNextAction;
}): string[] {
  const base = [
    "do not reconstruct branch/worktree/PR state from prose",
    "do not widen lifecycle authority beyond this packet",
    "do not mutate outside mutationPathHint",
    ...automationBoundaryMustNotFor(opts.nextAction.code),
  ];
  if (opts.actionKind === "local_command") {
    return [
      ...base,
      "do not execute raw shell when exactArgv is null",
      "do not continue after a non-zero command exit without recomputing the route",
    ];
  }
  if (opts.actionKind === "provider_action") {
    return [...base, "do not complete AgentPlane task truth from provider/card state"];
  }
  if (opts.actionKind === "wait") {
    return [...base, "do not reclaim or force progress without explicit parent approval"];
  }
  return [...base, "do not perform further task mutation for this route state"];
}

function returnControlWhenFor(opts: {
  actionKind: RouteExecutionPacket["actionKind"];
  nextAction: RouteBatchNextAction;
}): string {
  if (opts.actionKind === "local_command") {
    return "after the exact command exits; recompute task next-action before any further step";
  }
  if (opts.actionKind === "provider_action") {
    return "after the provider or human action completes; recompute task next-action with remote truth when relevant";
  }
  if (opts.actionKind === "wait") {
    return "after the waited condition changes or the parent supervisor grants reclaim/escalation";
  }
  if (opts.nextAction.command && exactArgvFor(opts.nextAction.command) === null) {
    return "after this route is split into argv-safe steps; recompute task next-action before mutating";
  }
  return opts.nextAction.summary;
}

function humanProviderActionFor(opts: {
  actionKind: RouteExecutionPacket["actionKind"];
  nextAction: RouteBatchNextAction;
}): string | null {
  if (opts.actionKind !== "provider_action") return null;
  return opts.nextAction.summary;
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
      ? opts.nextAction.command && exactArgvFor(opts.nextAction.command) === null
        ? "next command is not argv-safe; route must be split before an external agent can execute it"
        : (opts.blockers[0]?.summary ?? opts.nextAction.summary)
      : actionKind === "wait"
        ? opts.nextAction.summary
        : null;
  const exactArgv = actionKind === "local_command" ? exactArgvFor(opts.oracle.nextCommand) : null;
  return {
    schemaVersion: 1,
    actionKind,
    safeToMutate: actionKind === "local_command" && opts.oracle.mutationPathHint !== null,
    requiresProviderAction,
    recommendedRole: recommendedRoleFor({ nextAction: opts.nextAction, actionKind }),
    authoritativeCheckout: opts.oracle.authoritativeCheckout,
    authoritativeCheckoutPath: opts.oracle.authoritativeCheckoutPath,
    mutationPathHint: opts.oracle.mutationPathHint,
    mustRunFrom: opts.oracle.authoritativeCheckoutPath,
    exactArgv,
    mustNot: mustNotFor({ actionKind, nextAction: opts.nextAction }),
    returnControlWhen: returnControlWhenFor({ actionKind, nextAction: opts.nextAction }),
    humanProviderAction: humanProviderActionFor({ actionKind, nextAction: opts.nextAction }),
    staleStateCheck: `agentplane task next-action ${opts.task.id} --explain`,
    evidenceMissing: evidenceMissingFor({
      task: opts.task,
      blockers: opts.blockers,
      nextAction: opts.nextAction,
    }),
    verificationCandidate: verificationCandidateFor(opts.nextAction),
    stopReason,
  };
}
