import type { KnownPolicyActionId } from "./taxonomy-types.js";

export type { KnownPolicyActionId } from "./taxonomy-types.js";

export type PolicyActionId = KnownPolicyActionId | (string & {});

export type PolicyActionFamily =
  | "git"
  | "task"
  | "runner"
  | "recipe"
  | "backend"
  | "release"
  | "upgrade"
  | "workflow"
  | "network"
  | "policy"
  | "config"
  | "filesystem"
  | "diagnostics"
  | "custom";

export type PolicyApprovalKind =
  | "network_access"
  | "force_action"
  | "policy_write"
  | "config_write"
  | "dangerous_fs"
  | "git_push";

export type PolicyActionDescriptor = {
  id: PolicyActionId;
  family: PolicyActionFamily;
  summary: string;
  mutates_state: boolean;
  risky: boolean;
  destructive: boolean;
  approval: PolicyApprovalKind | null;
  enforcement: "git_rules" | "approval_only" | "none";
  source: "builtin" | "custom";
};

type BuiltinPolicyActionDescriptor = Omit<PolicyActionDescriptor, "id" | "source">;

const POLICY_ACTIONS: Record<KnownPolicyActionId, BuiltinPolicyActionDescriptor> = {
  guard_commit: {
    family: "git",
    summary: "Guard a scoped git commit before mutating repository history.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "git_rules",
  },
  commit: {
    family: "git",
    summary: "Create a repository commit under agentplane policy rules.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "git_rules",
  },
  hook_pre_commit: {
    family: "git",
    summary: "Validate staged changes in the pre-commit hook.",
    mutates_state: false,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "git_rules",
  },
  hook_commit_msg: {
    family: "git",
    summary: "Validate the commit subject in the commit-msg hook.",
    mutates_state: false,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "git_rules",
  },
  network_access: {
    family: "network",
    summary: "Access the network from a command or adapter path.",
    mutates_state: false,
    risky: true,
    destructive: false,
    approval: "network_access",
    enforcement: "approval_only",
  },
  force_action: {
    family: "workflow",
    summary: "Override a guarded workflow or validation boundary.",
    mutates_state: true,
    risky: true,
    destructive: true,
    approval: "force_action",
    enforcement: "approval_only",
  },
  policy_write: {
    family: "policy",
    summary: "Modify policy gateway files or canonical policy modules.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: "policy_write",
    enforcement: "approval_only",
  },
  config_write: {
    family: "config",
    summary: "Modify repository configuration that changes runtime behavior.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: "config_write",
    enforcement: "approval_only",
  },
  dangerous_fs: {
    family: "filesystem",
    summary: "Perform potentially dangerous filesystem mutations.",
    mutates_state: true,
    risky: true,
    destructive: true,
    approval: "dangerous_fs",
    enforcement: "approval_only",
  },
  git_push: {
    family: "git",
    summary: "Push local refs to a remote git endpoint.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: "git_push",
    enforcement: "approval_only",
  },
  task_list: {
    family: "task",
    summary: "Read the current task collection without mutating repository state.",
    mutates_state: false,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_new: {
    family: "task",
    summary: "Create a new task record and its task-local artifacts.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_mutation: {
    family: "task",
    summary: "Mutate persisted task state through the task backend.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_status_transition: {
    family: "task",
    summary: "Transition a task lifecycle status and record workflow evidence.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_start: {
    family: "task",
    summary: "Move a task into DOING after task-start invariants pass.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_block: {
    family: "task",
    summary: "Move a task into BLOCKED and persist blocking evidence.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_set_status: {
    family: "task",
    summary: "Apply an explicit task status mutation outside the default lifecycle path.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_finish: {
    family: "task",
    summary: "Close work on a task and persist verified result metadata.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_plan_set: {
    family: "task",
    summary: "Update the task plan body and reset plan approval state as needed.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_plan_approve: {
    family: "task",
    summary: "Approve a task plan and advance workflow gating state.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_plan_reject: {
    family: "task",
    summary: "Reject a task plan and keep implementation blocked until revision.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_verify: {
    family: "task",
    summary: "Record task verification evidence and outcome.",
    mutates_state: true,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  task_run: {
    family: "runner",
    summary: "Prepare or execute a runner invocation for a task.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  integrate: {
    family: "workflow",
    summary: "Integrate a task branch back into the base workflow path.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  work_start: {
    family: "workflow",
    summary: "Prepare the owner work branch or worktree for task implementation.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  scenario_execute: {
    family: "runner",
    summary: "Prepare or execute a runner invocation for a recipe scenario.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
  recipe_install: {
    family: "recipe",
    summary: "Install recipe assets into the repository or project recipe cache.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: "network_access",
    enforcement: "approval_only",
  },
  recipe_list_remote: {
    family: "recipe",
    summary: "Fetch and list recipe catalog entries from a remote source.",
    mutates_state: false,
    risky: true,
    destructive: false,
    approval: "network_access",
    enforcement: "approval_only",
  },
  backend_sync: {
    family: "backend",
    summary: "Synchronize task state between the local repo and the configured backend.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: "network_access",
    enforcement: "approval_only",
  },
  backend_migrate_canonical_state: {
    family: "backend",
    summary: "Mutate backend-managed canonical task state through a migration path.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: "network_access",
    enforcement: "approval_only",
  },
  backend_inspect: {
    family: "backend",
    summary: "Inspect backend configuration and canonical-state metadata.",
    mutates_state: false,
    risky: true,
    destructive: false,
    approval: "network_access",
    enforcement: "approval_only",
  },
  upgrade_apply: {
    family: "upgrade",
    summary: "Apply an agentplane upgrade that may fetch remote release metadata.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: "network_access",
    enforcement: "approval_only",
  },
  release_apply: {
    family: "release",
    summary: "Apply and optionally publish a release across git and package registries.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: "network_access",
    enforcement: "approval_only",
  },
  doctor_fix: {
    family: "diagnostics",
    summary: "Apply automatic repair actions suggested by doctor diagnostics.",
    mutates_state: true,
    risky: true,
    destructive: false,
    approval: null,
    enforcement: "none",
  },
};

export function resolvePolicyActionDescriptor(action: PolicyActionId): PolicyActionDescriptor {
  const builtin = POLICY_ACTIONS[action as KnownPolicyActionId];
  if (builtin) {
    return {
      id: action,
      ...builtin,
      source: "builtin",
    };
  }
  return {
    id: action,
    family: "custom",
    summary: `Unclassified policy action: ${action}`,
    mutates_state: false,
    risky: false,
    destructive: false,
    approval: null,
    enforcement: "none",
    source: "custom",
  };
}
