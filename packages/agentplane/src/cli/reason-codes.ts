export type ReasonCodeCategory =
  | "usage"
  | "reconcile"
  | "git"
  | "network"
  | "backend"
  | "validation";

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
  validation_preflight: {
    code: "validation_preflight",
    category: "validation",
    summary: "input/config validation failed before execution",
    action: "run preflight and fix reported validation issues",
  },
};

export function getReasonCodeMeta(code: string | undefined): ReasonCodeMeta | undefined {
  if (!code) return undefined;
  return REASON_CODE_MAP[code];
}
