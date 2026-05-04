export type KnownPolicyActionId = "guard_commit" | "commit" | "hook_pre_commit" | "hook_commit_msg" | "network_access" | "force_action" | "policy_write" | "config_write" | "dangerous_fs" | "git_push" | "task_list" | "task_new" | "task_mutation" | "task_status_transition" | "task_start" | "task_block" | "task_set_status" | "task_finish" | "task_plan_set" | "task_plan_approve" | "task_verify" | "task_run" | "scenario_execute" | "recipe_install" | "recipe_list_remote" | "backend_sync" | "backend_migrate_canonical_state" | "backend_inspect" | "upgrade_apply" | "release_apply" | "doctor_fix";
export type PolicyActionId = KnownPolicyActionId | (string & {});
export type PolicyActionFamily = "git" | "task" | "runner" | "recipe" | "backend" | "release" | "upgrade" | "workflow" | "network" | "policy" | "config" | "filesystem" | "diagnostics" | "custom";
export type PolicyApprovalKind = "network_access" | "force_action" | "policy_write" | "config_write" | "dangerous_fs" | "git_push";
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
export declare function resolvePolicyActionDescriptor(action: PolicyActionId): PolicyActionDescriptor;
//# sourceMappingURL=taxonomy.d.ts.map