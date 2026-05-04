export type PreflightMode = "quick" | "full";
type NextAction = {
    command: string;
    reason: string;
};
type Probe = {
    ok: boolean;
    error?: string;
};
type TaskArtifactDrift = {
    present: boolean;
    task_ids: string[];
    paths: string[];
};
type MessageFormatGuard = {
    ok: boolean;
    checked_paths: string[];
    errors: string[];
};
export type PreflightReport = {
    mode: PreflightMode;
    project_detected: boolean;
    config_loaded: Probe;
    quickstart_loaded: Probe;
    workflow_loaded: Probe;
    task_list_loaded: Probe & {
        count?: number;
    };
    working_tree_clean_tracked: Probe & {
        value?: boolean;
    };
    task_artifact_drift: TaskArtifactDrift;
    message_format_guard: MessageFormatGuard;
    current_branch: Probe & {
        value?: string;
    };
    workflow_mode: "direct" | "branch_pr" | "unknown";
    approvals: {
        require_plan: boolean | "unknown";
        require_verify: boolean | "unknown";
        require_network: boolean | "unknown";
    };
    harness_health: {
        status: "ok" | "warn";
        reasons: string[];
    };
    outside_repo_needed: false;
    next_actions: NextAction[];
};
export declare function buildPreflightReport(opts: {
    cwd: string;
    rootOverride?: string;
    mode: PreflightMode;
}): Promise<PreflightReport>;
export {};
//# sourceMappingURL=preflight-report.d.ts.map