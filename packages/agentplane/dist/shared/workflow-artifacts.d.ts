export type WorkflowArtifactApprovals = {
    requirePlanApproval: boolean;
    requireVerifyApproval: boolean;
    requireNetworkApproval: boolean;
};
export declare function buildWorkflowRuntimeContext(opts: {
    gitRoot: string;
    workflowMode: "direct" | "branch_pr";
    approvals: WorkflowArtifactApprovals;
    timestamp?: string;
}): {
    workflow: {
        mode: "direct" | "branch_pr";
        version: number;
        source: string;
        approvals: {
            require_plan: boolean;
            require_verify: boolean;
            require_network: boolean;
        };
    };
    runtime: {
        repo_name: string;
        repo_root: string;
        timestamp: string;
    };
};
export declare function ensureWorkflowArtifacts(opts: {
    gitRoot: string;
    workflowMode: "direct" | "branch_pr";
    approvals: WorkflowArtifactApprovals;
    projectOverrideTemplate?: string;
}): Promise<{
    installPaths: string[];
    commitPaths: string[];
    changedPaths: string[];
}>;
//# sourceMappingURL=workflow-artifacts.d.ts.map