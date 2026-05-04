export type CodexApprovalMode = "never" | "untrusted" | "on-request";
export type CodexApprovalProbeAction = "write_probe" | "delete_probe";
export type CodexApprovalProbeVerdict = "permissive" | "restrictive" | "unknown";
export type CodexApprovalProbeObservation = {
    mode: CodexApprovalMode;
    action: CodexApprovalProbeAction;
    exit_code: number | null;
    timed_out: boolean;
    target_exists_after: boolean;
};
export type CodexApprovalProbeAssessment = {
    mode: CodexApprovalMode;
    verdict: CodexApprovalProbeVerdict;
    summary: string;
    write_probe: CodexApprovalProbeObservation;
    delete_probe: CodexApprovalProbeObservation;
};
export declare function assessCodexApprovalMode(opts: {
    mode: CodexApprovalMode;
    write_probe: CodexApprovalProbeObservation;
    delete_probe: CodexApprovalProbeObservation;
}): CodexApprovalProbeAssessment;
//# sourceMappingURL=codex-approval-probe.d.ts.map