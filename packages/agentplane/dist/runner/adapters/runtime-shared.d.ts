import type { RunnerInvocation, RunnerResult } from "../types.js";
export declare function durationMs(startedAt: string, endedAt: string): number | undefined;
export declare function buildInvocationEventData(invocation: RunnerInvocation, extra?: Record<string, unknown>): Record<string, unknown>;
export declare function buildRunnerExecutionArtifacts(opts: {
    invocation: RunnerInvocation;
    trace_artifact_path?: string | null;
    trace_archive_path?: string | null;
    stderr_artifact_path?: string | null;
    stderr_archive_path?: string | null;
    source_manifest_path?: string | null;
    invalid_manifest_path?: string | null;
    include_output_last_message?: boolean;
}): NonNullable<RunnerResult["artifacts"]>;
//# sourceMappingURL=runtime-shared.d.ts.map