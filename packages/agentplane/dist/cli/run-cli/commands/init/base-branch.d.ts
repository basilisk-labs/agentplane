import type { WorkflowMode } from "../../../../agents/agents-template.js";
export declare function resolveInitBaseBranchForInit(opts: {
    gitRoot: string;
    baseBranchFallback: string;
    isInteractive: boolean;
    workflow: WorkflowMode;
    gitRootExisted: boolean;
}): Promise<string>;
//# sourceMappingURL=base-branch.d.ts.map