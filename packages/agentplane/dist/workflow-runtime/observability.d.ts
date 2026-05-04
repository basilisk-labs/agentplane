import type { WorkflowDiagnostic, WorkflowErrorCode } from "./types.js";
type WorkflowEventName = "workflow_build_started" | "workflow_build_completed" | "workflow_build_failed" | "workflow_publish_completed" | "workflow_publish_failed" | "workflow_restore_completed" | "workflow_restore_failed" | "workflow_doctor_check";
export type WorkflowEvent = {
    event: WorkflowEventName;
    code?: WorkflowErrorCode;
    path?: string;
    details?: Record<string, unknown>;
};
export declare function emitWorkflowEvent(event: WorkflowEvent): void;
export declare function diagnosticsSummary(diagnostics: WorkflowDiagnostic[]): string;
export {};
//# sourceMappingURL=observability.d.ts.map