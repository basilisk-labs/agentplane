import type { CommandContext } from "./task-backend.js";
type WorkflowMode = CommandContext["config"]["workflow_mode"];
type BranchPrLifecycleContext = {
    baseBranch: string;
    currentBranch: string;
};
export declare function resolveBranchPrLifecycleContext(opts: {
    cwd: string;
    rootOverride?: string | null;
    gitRoot: string;
    workflowMode: WorkflowMode;
    cliBaseOpt?: string | null;
    missingBaseMessage: string;
}): Promise<BranchPrLifecycleContext>;
export declare function ensureBranchPrBaseCheckout(opts: {
    context: BranchPrLifecycleContext;
    gitRoot: string;
    command: string;
    taskId?: string;
    taskBranch?: string;
    mismatchMessage?: string;
}): Promise<void>;
export {};
//# sourceMappingURL=branch-pr-context.d.ts.map