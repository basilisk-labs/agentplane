type InitExecutionConfig = {
    profile: "conservative" | "balanced" | "aggressive";
    reasoning_effort: "low" | "medium" | "high" | "xhigh";
    text_verbosity: "low" | "medium" | "high";
    tool_budget: {
        discovery: number;
        implementation: number;
        verification: number;
    };
    stop_conditions: string[];
    handoff_conditions: string[];
    unsafe_actions_requiring_explicit_user_ok: string[];
};
export declare function ensureAgentplaneDirs(agentplaneDir: string, backend: "local" | "redmine"): Promise<void>;
export declare function writeInitConfig(opts: {
    agentplaneDir: string;
    gitRoot: string;
    workflow: "direct" | "branch_pr";
    directCloseDirtyPolicy: "allow_other_task_readmes" | "strict";
    backendConfigPathAbs: string;
    requirePlanApproval: boolean;
    requireNetworkApproval: boolean;
    requireVerifyApproval: boolean;
    execution: InitExecutionConfig;
}): Promise<void>;
export declare function writeBackendStubs(opts: {
    backend: "local" | "redmine";
    backendPath: string;
}): Promise<void>;
export {};
//# sourceMappingURL=write-config.d.ts.map