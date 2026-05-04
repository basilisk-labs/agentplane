import type { WorkflowDiagnostic, WorkflowTemplateRenderOptions, WorkflowValidationResult } from "./types.js";
export declare function validateTemplateStrict(template: string, context: Record<string, unknown>, options?: Partial<WorkflowTemplateRenderOptions>): WorkflowValidationResult;
export declare function renderTemplateStrict(template: string, context: Record<string, unknown>, options?: Partial<WorkflowTemplateRenderOptions>): {
    text: string;
    diagnostics: WorkflowDiagnostic[];
};
//# sourceMappingURL=template.d.ts.map