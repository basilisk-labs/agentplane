import type { RunnerPolicyRefusal, RunnerRunState } from "./types.js";
export type CodexSmokeOutcome = "success" | "timeout" | "policy_refusal" | "runner_failure";
export type CodexSmokeClassification = {
    outcome: CodexSmokeOutcome;
    status: RunnerRunState["status"];
    summary: string;
    timeout_reason?: string | null;
    refusal_reason?: RunnerPolicyRefusal | null;
};
export declare function classifyCodexSmokeRun(state: RunnerRunState): CodexSmokeClassification;
//# sourceMappingURL=codex-smoke.d.ts.map