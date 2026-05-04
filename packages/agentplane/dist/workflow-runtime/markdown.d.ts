import type { WorkflowDiagnostic, WorkflowDocument, WorkflowFrontMatter, WorkflowSections, WorkflowValidationResult } from "./types.js";
export declare function parseWorkflowMarkdown(text: string, sourcePath?: string): {
    document: Omit<WorkflowDocument, "frontMatter"> & {
        frontMatter: WorkflowFrontMatter;
    };
    diagnostics: WorkflowDiagnostic[];
};
export declare function serializeWorkflowMarkdown(frontMatter: Record<string, unknown>, sections: WorkflowSections): string;
export declare function diagnosticsToValidationResult(diagnostics: WorkflowDiagnostic[]): WorkflowValidationResult;
//# sourceMappingURL=markdown.d.ts.map