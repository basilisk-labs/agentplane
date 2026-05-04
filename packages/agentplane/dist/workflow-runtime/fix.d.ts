import type { WorkflowDiagnostic } from "./types.js";
type WorkflowFixResult = {
    changed: boolean;
    text: string;
    diagnostics: WorkflowDiagnostic[];
};
type ExpectedWorkflowPolicy = {
    mode: "direct" | "branch_pr";
    approvals: {
        require_plan: boolean;
        require_verify: boolean;
        require_network: boolean;
    };
};
export declare function safeAutofixWorkflowText(text: string, expectedPolicy?: ExpectedWorkflowPolicy): WorkflowFixResult;
export {};
//# sourceMappingURL=fix.d.ts.map