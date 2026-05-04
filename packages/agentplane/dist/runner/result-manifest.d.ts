import type { RunnerResult, RunnerResultManifest } from "./types.js";
export declare const RUNNER_RESULT_MANIFEST_SCHEMA_VERSION: 1;
export declare class InvalidRunnerResultManifestError extends Error {
    readonly result_path: string;
    readonly reason: string;
    readonly raw_content: string;
    constructor(opts: {
        result_path: string;
        reason: string;
        raw_content: string;
    });
}
export declare function readRunnerResultManifest(resultPath: string): Promise<RunnerResultManifest | null>;
export declare function invalidRunnerResultManifestPath(resultPath: string): string;
export declare function sourceRunnerResultManifestPath(resultPath: string): string;
export declare function preserveInvalidRunnerResultManifest(opts: {
    result_path: string;
    error: InvalidRunnerResultManifestError;
}): Promise<string>;
export declare function preserveRunnerResultManifestSource(resultPath: string): Promise<string | null>;
export declare function writeRunnerResultManifest(opts: {
    result_path: string;
    manifest: RunnerResultManifest;
}): Promise<void>;
export declare function applyRunnerResultManifest(opts: {
    base: RunnerResult;
    manifest: RunnerResultManifest | null;
}): RunnerResult;
export declare function manifestFromRunnerResult(result: RunnerResult): RunnerResultManifest;
//# sourceMappingURL=result-manifest.d.ts.map