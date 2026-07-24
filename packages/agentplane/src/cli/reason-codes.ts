export type ReasonCodeCategory =
  | "usage"
  | "reconcile"
  | "git"
  | "handoff"
  | "network"
  | "backend"
  | "validation"
  | "feedback";

export type ReasonCodeMeta = {
  code: string;
  category: ReasonCodeCategory;
  summary: string;
  action: string;
};

const REASON_CODE_MAP: Readonly<Record<string, ReasonCodeMeta>> = {
  usage_help: {
    code: "usage_help",
    category: "usage",
    summary: "command invocation is incomplete or invalid",
    action: "open command help and fix required args/flags",
  },
  sync_backend_mismatch: {
    code: "sync_backend_mismatch",
    category: "backend",
    summary: "sync command backend id does not match active backend",
    action: "inspect config and rerun sync for matching backend",
  },
  sync_identity_transition_conflict: {
    code: "sync_identity_transition_conflict",
    category: "usage",
    summary: "sync command selected conflicting cloud identity transitions",
    action: "choose either projection bootstrap or remote identity adoption",
  },
  sync_identity_transition_cloud_only: {
    code: "sync_identity_transition_cloud_only",
    category: "usage",
    summary: "projection identity transitions are cloud-backend operations",
    action: "remove the transition flag or select the cloud backend",
  },
  sync_bootstrap_projection_invalid: {
    code: "sync_bootstrap_projection_invalid",
    category: "usage",
    summary: "projection bootstrap requires a fail-closed push",
    action: "use push direction with conflict=fail",
  },
  sync_adopt_projection_invalid: {
    code: "sync_adopt_projection_invalid",
    category: "usage",
    summary: "projection identity adoption requires a prefer-remote pull",
    action: "use pull direction with conflict=prefer-remote",
  },
  cloud_projection_checkpoint_invalid: {
    code: "cloud_projection_checkpoint_invalid",
    category: "backend",
    summary: "cloud projection checkpoint is malformed or structurally invalid",
    action: "inspect cloud identity and repair the checkpoint before syncing",
  },
  cloud_projection_pending_identity_mismatch: {
    code: "cloud_projection_pending_identity_mismatch",
    category: "backend",
    summary: "pending local cloud mutations belong to another or unknown identity",
    action: "restore the previous identity and resolve its pending push",
  },
  cloud_projection_bootstrap_required: {
    code: "cloud_projection_bootstrap_required",
    category: "backend",
    summary: "cloud projection has no trusted identity checkpoint",
    action: "confirm cache ownership and explicitly bootstrap the projection",
  },
  cloud_projection_adoption_required: {
    code: "cloud_projection_adoption_required",
    category: "backend",
    summary: "cloud projection identity change requires explicit adoption",
    action: "review a pull diff and explicitly adopt the intended remote",
  },
  cloud_projection_identity_mismatch: {
    code: "cloud_projection_identity_mismatch",
    category: "backend",
    summary: "cloud projection checkpoint belongs to a different remote identity",
    action: "review and adopt the intended remote before pushing",
  },
  cloud_projection_apply_incomplete: {
    code: "cloud_projection_apply_incomplete",
    category: "backend",
    summary: "a prior cloud pull may have partially changed the cache",
    action: "resume the same prefer-remote pull against its target identity",
  },
  cloud_projection_checkpoint_changed: {
    code: "cloud_projection_checkpoint_changed",
    category: "backend",
    summary: "cloud projection state changed after synchronization was prepared",
    action: "inspect the new checkpoint and retry from fresh state",
  },
  cloud_cache_projection_changed: {
    code: "cloud_cache_projection_changed",
    category: "backend",
    summary: "local task cache changed while cloud synchronization was in progress",
    action: "review the local edit and retry synchronization from a fresh snapshot",
  },
  cloud_cache_projection_invalid: {
    code: "cloud_cache_projection_invalid",
    category: "backend",
    summary: "local task cache cannot produce a complete safe cloud snapshot",
    action: "repair task scan warnings or unsafe task-directory entries before syncing",
  },
  cloud_projection_operation_in_progress: {
    code: "cloud_projection_operation_in_progress",
    category: "backend",
    summary: "another process owns the cloud projection operation lock",
    action: "wait for the recorded process to finish before retrying",
  },
  cloud_projection_lock_unsafe: {
    code: "cloud_projection_lock_unsafe",
    category: "backend",
    summary: "cloud projection lock containment or ownership could not be proven",
    action: "inspect repository path ownership before retrying",
  },
  cloud_projection_adoption_snapshot_required: {
    code: "cloud_projection_adoption_snapshot_required",
    category: "backend",
    summary: "identity adoption did not return a complete task projection",
    action: "retry only after the cloud service returns a validated full snapshot",
  },
  cloud_pull_complete_snapshot_required: {
    code: "cloud_pull_complete_snapshot_required",
    category: "backend",
    summary: "prefer-remote pull did not prove that its task projection is complete",
    action: "require projection_complete=true before applying remote changes or deletions",
  },
  cloud_pull_projection_invalid: {
    code: "cloud_pull_projection_invalid",
    category: "backend",
    summary: "cloud pull returned malformed or duplicate task identities",
    action: "repair the remote projection before applying or adopting it",
  },
  cloud_pull_projection_conflict: {
    code: "cloud_pull_projection_conflict",
    category: "backend",
    summary: "cloud pull returned conflicting projection envelopes",
    action: "require one canonical task array and matching completeness evidence",
  },
  cloud_conflicts_payload_invalid: {
    code: "cloud_conflicts_payload_invalid",
    category: "backend",
    summary: "cloud conflict state is malformed or ambiguous",
    action: "repair the conflict payload before applying a pull",
  },
  cloud_push_ack_invalid: {
    code: "cloud_push_ack_invalid",
    category: "backend",
    summary: "cloud push receipt does not match the submitted projection",
    action: "keep local dirty state until the service returns a correlated receipt",
  },
  cloud_sync_response_invalid: {
    code: "cloud_sync_response_invalid",
    category: "backend",
    summary: "cloud synchronization returned a non-object response",
    action: "repair the endpoint before applying any projection changes",
  },
  reconcile_git_state_unreadable: {
    code: "reconcile_git_state_unreadable",
    category: "reconcile",
    summary: "reconcile guard cannot read git state",
    action: "run git status and fix repository visibility/permissions",
  },
  reconcile_task_scan_failed: {
    code: "reconcile_task_scan_failed",
    category: "reconcile",
    summary: "reconcile guard could not complete task scan",
    action: "run strict task scan and resolve parse/read errors",
  },
  reconcile_task_scan_incomplete: {
    code: "reconcile_task_scan_incomplete",
    category: "reconcile",
    summary: "task scan produced skipped files/warnings",
    action: "resolve scan warnings before mutating commands",
  },
  git_branch_state: {
    code: "git_branch_state",
    category: "git",
    summary: "branch command cannot determine branch state",
    action: "inspect branch state and repository context",
  },
  git_index_state: {
    code: "git_index_state",
    category: "git",
    summary: "commit command found problematic index/worktree state",
    action: "inspect staged/unstaged changes and retry",
  },
  git_context: {
    code: "git_context",
    category: "git",
    summary: "command requires valid git repository context",
    action: "confirm repository root and tracked changes",
  },
  integrate_base_checkout_required: {
    code: "integrate_base_checkout_required",
    category: "git",
    summary: "integrate was launched from a task worktree instead of the registered base checkout",
    action: "rerun integrate against the base checkout/worktree for the resolved base branch",
  },
  git_task_commit_blocked: {
    code: "git_task_commit_blocked",
    category: "git",
    summary: "task-scoped commit was blocked after guard validation passed",
    action: "inspect the staged payload and fix the blocking hook or policy failure",
  },
  git_close_commit_blocked: {
    code: "git_close_commit_blocked",
    category: "git",
    summary: "deterministic close commit was blocked after staging task artifacts",
    action: "inspect the staged close payload and fix the blocking hook or policy failure",
  },
  git_close_commit_dirty_index: {
    code: "git_close_commit_dirty_index",
    category: "git",
    summary: "close commit cannot proceed while unrelated paths are already staged",
    action: "clear the git index or rerun the close commit flow with an explicit unstage option",
  },
  git_pre_commit_format: {
    code: "git_pre_commit_format",
    category: "git",
    summary: "a formatting check in the pre-commit path blocked the commit",
    action: "run the formatter, stage the resulting changes, and retry the commit",
  },
  git_pre_commit_lint: {
    code: "git_pre_commit_lint",
    category: "git",
    summary: "a lint check in the pre-commit path blocked the commit",
    action: "run lint, fix the reported errors, and retry the commit",
  },
  git_commit_subject_policy: {
    code: "git_commit_subject_policy",
    category: "git",
    summary: "commit-msg policy rejected the commit subject",
    action: "retry with a compliant task suffix/scope commit subject",
  },
  git_commit_dco_missing: {
    code: "git_commit_dco_missing",
    category: "git",
    summary: "commit-msg policy rejected the commit because DCO sign-off is missing",
    action: "retry the commit with -s or add a valid Signed-off-by trailer",
  },
  git_commit_timeout: {
    code: "git_commit_timeout",
    category: "git",
    summary: "git commit timed out while waiting for hooks or finalization",
    action: "inspect hook readiness and active git processes before retrying the commit",
  },
  protected_base_integrate_handoff: {
    code: "protected_base_integrate_handoff",
    category: "handoff",
    summary: "integrate intentionally stopped before mutating a protected base branch",
    action:
      "inspect the persisted handoff route, merge the GitHub PR, then pull the base branch after hosted close finishes",
  },
  network_gate: {
    code: "network_gate",
    category: "network",
    summary: "network access is blocked by policy or environment",
    action: "recheck approvals/connectivity and retry",
  },
  backend_sync_config: {
    code: "backend_sync_config",
    category: "backend",
    summary: "sync command failed due to backend configuration",
    action: "inspect backend config and active backend settings",
  },
  backend_config: {
    code: "backend_config",
    category: "backend",
    summary: "backend configuration is missing or invalid",
    action: "inspect backend config under .agentplane/backends",
  },
  backend_local_fallback: {
    code: "backend_local_fallback",
    category: "backend",
    summary:
      "cloud-backed task surface is unavailable and local task files may be the quickest recovery path",
    action:
      "inspect backend config, switch to local if repo-local task files are authoritative enough, then rerun the command",
  },
  validation_preflight: {
    code: "validation_preflight",
    category: "validation",
    summary: "input/config validation failed before execution",
    action: "run preflight and fix reported validation issues",
  },
  feedback_internal_error_report: {
    code: "feedback_internal_error_report",
    category: "feedback",
    summary: "internal AgentPlane error can be reported through opt-in GitHub issue flow",
    action:
      "preview the privacy-bounded issue payload and enable feedback issue reporting if desired",
  },
  feedback_github_issues_disabled: {
    code: "feedback_github_issues_disabled",
    category: "feedback",
    summary: "GitHub issue feedback is disabled for this project",
    action: "enable feedback.github_issues.enabled before creating feedback issues",
  },
  feedback_agent_context_required: {
    code: "feedback_agent_context_required",
    category: "feedback",
    summary: "E_INTERNAL feedback issues need sanitized agent context for actionable triage",
    action: "pass --agent-context, --agent-context-file, or --allow-missing-agent-context",
  },
  feedback_anonymous_cloud_disabled: {
    code: "feedback_anonymous_cloud_disabled",
    category: "feedback",
    summary: "anonymous AgentPlane Cloud feedback intake is disabled for this project",
    action: "enable feedback.github_issues.allow_anonymous_cloud before using cloud transport",
  },
};

export function getReasonCodeMeta(code: string | undefined): ReasonCodeMeta | undefined {
  if (!code) return undefined;
  return REASON_CODE_MAP[code];
}
