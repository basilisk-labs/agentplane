import { type DiagnosticRemediation } from "../../shared/diagnostic-remediation.js";
export type { DiagnosticRemediation } from "../../shared/diagnostic-remediation.js";
export type DiagnosticNextAction = {
    command: string;
    reason: string;
    reasonCode?: string;
};
export type DiagnosticInfo = {
    state: string;
    likelyCause: string;
    nextAction?: DiagnosticNextAction;
    hint?: string;
    remediation?: DiagnosticRemediation;
};
type DiagnosticContextRecord = Record<string, unknown>;
export declare function withDiagnosticContext(context: DiagnosticContextRecord | undefined, diagnostic: DiagnosticInfo): DiagnosticContextRecord;
export declare function readDiagnosticContext(context: DiagnosticContextRecord | undefined): Partial<DiagnosticInfo>;
export declare function renderDiagnosticFinding(opts: {
    severity: "ERROR" | "WARN" | "INFO";
    state: string;
    likelyCause: string;
    nextAction?: DiagnosticNextAction;
    remediation?: DiagnosticRemediation;
    details?: string[];
}): string;
//# sourceMappingURL=diagnostics.d.ts.map