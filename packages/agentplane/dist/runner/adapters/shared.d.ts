import type { RunnerAdapterId } from "@agentplaneorg/core/config";
import type { RunnerAdapterCapabilities, RunnerContextBundle, RunnerExecutionMetrics, RunnerInvocation, RunnerResultArtifact, RunnerResult, RunnerTimeoutReason } from "../types.js";
export type RunnerAdapter = {
    id: RunnerAdapterId;
    describeCapabilities(bundle: RunnerContextBundle): RunnerAdapterCapabilities;
    prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation>;
    execute(invocation: RunnerInvocation): Promise<RunnerResult>;
};
export declare function runnerAdapterSuccessResult(opts: {
    started_at?: string;
    ended_at?: string;
    exit_code?: number;
    summary?: string;
    stdout_summary: string;
    output_paths?: string[];
    metrics?: RunnerExecutionMetrics;
    timeout_reason?: RunnerTimeoutReason | null;
}): RunnerResult;
export declare function runnerAdapterFailureResult(opts: {
    err: unknown;
    started_at?: string;
    ended_at?: string;
    exit_code?: number | null;
    summary?: string;
    stderr_summary?: string;
    output_paths?: string[];
    metrics?: RunnerExecutionMetrics;
    timeout_reason?: RunnerTimeoutReason | null;
}): RunnerResult;
export declare function runnerAdapterCancelledResult(opts: {
    reason: string;
    started_at?: string;
    ended_at?: string;
    exit_code?: number | null;
    summary?: string;
    stderr_summary?: string;
    output_paths?: string[];
    metrics?: RunnerExecutionMetrics;
    timeout_reason?: RunnerTimeoutReason | null;
}): RunnerResult;
export declare function runnerArtifactsFromSpecs(specs: {
    path: string | null | undefined;
    label?: string;
}[]): RunnerResultArtifact[] | undefined;
//# sourceMappingURL=shared.d.ts.map