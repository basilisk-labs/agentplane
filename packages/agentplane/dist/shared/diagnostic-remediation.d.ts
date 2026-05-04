export type DiagnosticRemediation = {
    code: string;
    why: string;
    fix: string;
    safeCommand: string;
    stopCondition: string;
};
export declare function renderRemediationLines(remediation: DiagnosticRemediation): string[];
//# sourceMappingURL=diagnostic-remediation.d.ts.map