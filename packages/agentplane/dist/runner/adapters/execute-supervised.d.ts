import { type SupervisedProcessResult } from "../process-supervision/run.js";
import { readRunnerResultManifest } from "../result-manifest.js";
import type { RunnerInvocation, RunnerResult } from "../types.js";
type RunnerResultManifest = Awaited<ReturnType<typeof readRunnerResultManifest>>;
export type SupervisedRunnerArtifactInput = {
    invocation: RunnerInvocation;
    processResult: SupervisedProcessResult | null;
    source_manifest_path?: string | null;
    invalid_manifest_path?: string | null;
};
export type SupervisedRunnerBaseResultInput = {
    invocation: RunnerInvocation;
    processResult: SupervisedProcessResult;
    artifacts: NonNullable<RunnerResult["artifacts"]>;
    output_paths: string[];
};
export declare function executeSupervisedRunnerAdapter(opts: {
    invocation: RunnerInvocation;
    assertInvocation: (invocation: RunnerInvocation) => void;
    readStdinText: (invocation: RunnerInvocation) => Promise<string>;
    startMessage: string;
    buildArtifacts: (input: SupervisedRunnerArtifactInput) => NonNullable<RunnerResult["artifacts"]>;
    buildBaseResult: (input: SupervisedRunnerBaseResultInput) => Promise<RunnerResult> | RunnerResult;
    applyManifest: (opts: {
        base: RunnerResult;
        manifest: RunnerResultManifest;
    }) => RunnerResult;
    capabilitiesUsed: (invocation: RunnerInvocation) => string[];
    assertManifest?: (opts: {
        invocation: RunnerInvocation;
        processResult: SupervisedProcessResult;
        manifest: RunnerResultManifest;
    }) => void;
    preserveSourceManifestOnSuccess?: (manifest: RunnerResultManifest) => boolean;
    successEventMessage: (result: RunnerResult) => string;
    failureSummary: string;
    failureEventType: "runner_execute_error" | "runner_execute_finish";
    failureEventMessage: (result: RunnerResult) => string;
}): Promise<RunnerResult>;
export {};
//# sourceMappingURL=execute-supervised.d.ts.map