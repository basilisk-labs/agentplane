import type { WorkflowDiagnostic, WorkflowDocument, WorkflowValidationResult } from "./types.js";
export declare function readWorkflowDocument(repoRoot: string, absPath?: string): Promise<{
    document: WorkflowDocument | null;
    diagnostics: WorkflowDiagnostic[];
    path: string;
}>;
export declare function validateWorkflowAtPath(repoRoot: string, absPath?: string): Promise<WorkflowValidationResult>;
export declare function validateWorkflowText(repoRoot: string, workflowText: string): Promise<WorkflowValidationResult>;
export declare function publishWorkflowCandidate(repoRoot: string, candidateText: string): Promise<WorkflowValidationResult>;
export declare function restoreWorkflowFromLastKnownGood(repoRoot: string): Promise<WorkflowValidationResult>;
//# sourceMappingURL=file-ops.d.ts.map