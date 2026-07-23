import type { TaskData } from "../../backends/task-backend.js";
import type { RouteBatchNextAction } from "./route-batch-ownership.js";
import type { RouteBlocker, RouteOracle } from "./route-oracle.js";

export type RouteExecutionPacket = {
  schemaVersion: 1;
  actionKind: "local_command" | "provider_action" | "wait" | "stop";
  safeToMutate: boolean;
  requiresProviderAction: boolean;
  recommendedRole: "ORCHESTRATOR" | "CODER" | "TESTER" | "INTEGRATOR" | "EVALUATOR" | "USER";
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
export function actionKindFor(opts: {
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
    opts.nextAction.code === "publish_pr_head" ||
    opts.nextAction.code === "update_pr_artifacts" ||
    opts.nextAction.code === "verify_or_update_pr"
  ) {
    return "CODER";
  }
  if (opts.nextAction.code === "quality_review_required") return "EVALUATOR";
  if (opts.nextAction.code === "verification_required") return "TESTER";
  if (opts.nextAction.code === "implementation_rework_required") return "CODER";
  if (opts.nextAction.code === "record_pre_merge_closure") return "CODER";
  if (
    opts.nextAction.code === "wait_hosted_checks" ||
    opts.nextAction.code === "refresh_remote_route" ||
    opts.nextAction.code === "open_close_tail" ||
    opts.nextAction.code === "sync_hosted_close" ||
    opts.nextAction.code === "cleanup" ||
    opts.nextAction.code === "cleanup_blocked" ||
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
    if (blocker.code === "pr_head_unpublished") missing.add("published_pr_head");
    if (blocker.code === "hosted_pr_head_mismatch") missing.add("aligned_hosted_pr_head");
    if (blocker.code === "provider_pr_unavailable") missing.add("live_provider_pr_state");
    if (blocker.code === "pr_meta_stale") missing.add("fresh_pr_artifacts");
    if (blocker.code === "close_tail_missing") missing.add("close_tail_pr");
    if (blocker.code === "cleanup_blocked") missing.add("proven_merged_cleanup_identity");
    if (blocker.code === "runner_alive") missing.add("runner_terminal_state");
    if (blocker.code === "dirty_task_artifacts") missing.add("task_artifact_cleanup_commit");
    if (blocker.code === "quality_review_missing") missing.add("evaluator_quality_review");
    if (blocker.code === "quality_review_stale") missing.add("fresh_evaluator_quality_review");
    if (blocker.code === "implementation_rework_required") {
      missing.add("verified_implementation_rework");
    }
    if (blocker.code === "pre_merge_closure_missing") missing.add("pre_merge_closure");
    if (blocker.code === "pre_merge_closure_stale") missing.add("fresh_pre_merge_closure");
    if (blocker.code === "task_worktree_dirty") missing.add("clean_committed_task_worktree");
    if (blocker.code === "task_worktree_state_unavailable") {
      missing.add("confirmed_task_worktree_state");
    }
    if (blocker.code === "verification_required") missing.add("verification_record");
    if (blocker.code === "missing_included_batch_metadata") {
      missing.add("structured_branch_pr_batch_metadata");
    }
  }
  return [...missing].toSorted((a, b) => a.localeCompare(b));
}

function verificationCandidateFor(nextAction: RouteBatchNextAction): string | null {
  if (nextAction.code === "verification_required") {
    return "agentplane task verify-show <task-id>";
  }
  if (nextAction.code === "verify_or_update_pr") return "agentplane pr check <task-id>";
  if (nextAction.code.includes("verify")) return nextAction.command;
  if (nextAction.code === "quality_review_required") return null;
  if (nextAction.code === "update_pr_artifacts") return "agentplane pr check <task-id>";
  if (nextAction.code === "wait_hosted_checks") return "agentplane pr check <task-id>";
  if (nextAction.code === "publish_pr_head") return "agentplane pr flow status <task-id>";
  if (nextAction.code === "retry_provider_lookup") return "agentplane pr flow status <task-id>";
  if (nextAction.code === "refresh_remote_route")
    return "agentplane task next-action <task-id> --remote --explain";
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
    publish_pr_head: [
      "do not push or relink the hosted PR manually; agentplane pr open owns final branch publication and PR head alignment",
    ],
    retry_provider_lookup: [
      "do not queue or merge while the live GitHub PR head cannot be confirmed",
    ],
    refresh_remote_route: [
      "do not enqueue, publish, or clean a DONE task from local-only PR metadata; recompute with live provider state",
    ],
    update_pr_artifacts: [
      "do not repair stale PR artifacts with manual edits or amend commits; agentplane pr update/pr check own PR artifact freshness",
    ],
    verify_or_update_pr: [
      "do not repair stale PR artifacts with manual edits or amend commits; agentplane pr update/pr check own PR artifact freshness",
      "do not amend only to align quality_review.evaluated_sha; rerun evaluator on current HEAD, then recompute the route",
    ],
    quality_review_required: [
      "do not publish or queue the PR before quality_review is recorded for the current implementation head",
      "do not synthesize verdict, summary, or findings from lint, tests, route state, or other mechanical checks",
    ],
    implementation_rework_required: [
      "do not update, open, publish, queue, or integrate the PR until implementation rework is complete and verified again",
      "do not overwrite or synthesize the persisted EVALUATOR verdict, summary, or findings",
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
    cleanup_blocked: [
      "do not delete task branches/worktrees while exact merged identity or closure proof is blocked",
    ],
    resolve_task_worktree_state: [
      "do not publish, enqueue, claim, reserve, verify, or integrate while the actual task worktree has uncommitted changes or cannot be inspected",
      "do not infer whether uncommitted changes are intended; return that semantic decision to the CODER",
    ],
    verification_required: [
      "do not close, enqueue, claim, reserve, or integrate before TESTER records an evidence-based verification outcome",
      "do not synthesize a verification outcome or executable verification command from route state",
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
  if (opts.nextAction.code === "implementation_rework_required") {
    return [
      ...base,
      "do not mutate task lifecycle or PR state while control belongs to implementation rework",
    ];
  }
  return [...base, "do not perform further task mutation for this route state"];
}

function returnControlWhenFor(opts: {
  actionKind: RouteExecutionPacket["actionKind"];
  nextAction: RouteBatchNextAction;
}): string {
  if (opts.nextAction.code === "implementation_rework_required") {
    return "after the CODER completes implementation rework and records verification; recompute task next-action before PR handling";
  }
  if (opts.nextAction.code === "resolve_task_worktree_state") {
    return "after the CODER makes the task worktree clean and records fresh verification; recompute task next-action before PR handling";
  }
  if (opts.nextAction.code === "verification_required") {
    return "after TESTER records the evidence-based verification outcome; recompute task next-action before PR handling";
  }
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

export function deriveRouteExecutionPacket(opts: {
  task: TaskData;
  nextAction: RouteBatchNextAction;
  blockers: readonly RouteBlocker[];
  oracle: RouteOracle;
}): RouteExecutionPacket {
  const actionKind = actionKindFor({ task: opts.task, nextAction: opts.nextAction });
  const semanticImplementationHandoff = opts.nextAction.code === "implementation_rework_required";
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
    safeToMutate:
      (actionKind === "local_command" || semanticImplementationHandoff) &&
      opts.oracle.mutationPathHint !== null,
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
