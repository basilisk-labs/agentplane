export declare function ensureInitWorkflow(opts: {
    gitRoot: string;
    workflowMode: "direct" | "branch_pr";
    approvals: {
        requirePlanApproval: boolean;
        requireVerifyApproval: boolean;
        requireNetworkApproval: boolean;
    };
}): Promise<{
    installPaths: string[];
}>;
//# sourceMappingURL=write-workflow.d.ts.map