import type { RouteExecutionPacket } from "./route-execution-packet.js";

export type { RouteExecutionPacket } from "./route-execution-packet.js";

export type RouteBlockerCode =
  | "branch_head_missing"
  | "close_tail_missing"
  | "close_tail_open"
  | "cleanup_blocked"
  | "dirty_task_artifacts"
  | "human_input_required"
  | "implementation_rework_required"
  | "included_batch_verification_pending"
  | "missing_included_batch_metadata"
  | "missing_pr_branch"
  | "on_base_checkout"
  | "plan_not_approved"
  | "pr_head_unpublished"
  | "pr_meta_stale"
  | "provider_pr_unavailable"
  | "hosted_pr_head_mismatch"
  | "pre_merge_closure_missing"
  | "pre_merge_closure_stale"
  | "quality_review_missing"
  | "quality_review_stale"
  | "remote_pr_missing"
  | "runner_alive"
  | "task_worktree_dirty"
  | "task_worktree_state_unavailable"
  | "verification_required";

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

export type WorkflowExecutionContract = {
  oracle: RouteOracle;
  packet: RouteExecutionPacket;
};
