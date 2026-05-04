import type { RunnerResultStatus, RunnerTracePolicy } from "./types.js";
export type FinalizedTraceArtifact = {
    artifact_path: string | null;
    archive_path: string | null;
};
export declare function compressedTraceArtifactPath(filePath: string): string;
export declare function redactTraceText(text: string, patterns: string[] | undefined): string;
export declare function finalizeTraceArtifact(opts: {
    file_path: string;
    policy: RunnerTracePolicy;
    run_status: RunnerResultStatus;
}): Promise<FinalizedTraceArtifact>;
export declare function readTraceArtifactText(filePath: string): Promise<string>;
//# sourceMappingURL=trace-artifacts.d.ts.map