import type { WorkflowDiagnostic } from "./types.js";
export declare function pushDiagnostic(diags: WorkflowDiagnostic[], diagnostic: WorkflowDiagnostic): void;
export declare function remediationForWorkflowDiagnostic(diagnostic: Pick<WorkflowDiagnostic, "code" | "path" | "message">): NonNullable<WorkflowDiagnostic["remediation"]>;
export declare function renderWorkflowDiagnostic(diagnostic: WorkflowDiagnostic): string;
export declare function isRecord(value: unknown): value is Record<string, unknown>;
export declare function expectBoolean(diags: WorkflowDiagnostic[], value: unknown, pathName: string, required: boolean): boolean | undefined;
export declare function expectString(diags: WorkflowDiagnostic[], value: unknown, pathName: string, required: boolean): string | undefined;
export declare function expectIntegerInRange(diags: WorkflowDiagnostic[], value: unknown, pathName: string, min: number, max: number, required: boolean): number | undefined;
//# sourceMappingURL=validation-helpers.d.ts.map