import type { RunnerArtifactPaths, RunnerContextBundle, RunnerEvent, RunnerInvocation, RunnerRunRecord, RunnerRunState } from "./types.js";
export declare function parseRunnerEventsText(text: string): RunnerEvent[];
export declare function assertRunnerBundleMatchesTask(bundle: RunnerContextBundle, taskId: string, runId: string): void;
export declare class RunnerRunRepository {
    readonly paths: RunnerArtifactPaths;
    constructor(paths: RunnerArtifactPaths);
    static forTaskRun(opts: {
        git_root: string;
        workflow_dir: string;
        task_id: string;
        run_id: string;
    }): RunnerRunRepository;
    static fromBundle(bundle: RunnerContextBundle): RunnerRunRepository;
    static fromInvocation(invocation: RunnerInvocation): RunnerRunRepository;
    writePrepared(opts: {
        bundle: RunnerContextBundle;
        bootstrap_markdown?: string;
        created_at?: string;
        invocation?: RunnerInvocation;
    }): Promise<RunnerRunState>;
    readBundle(): Promise<RunnerContextBundle | null>;
    readState(): Promise<RunnerRunState | null>;
    readRecord(): Promise<RunnerRunRecord | null>;
    readRequiredRecord(opts: {
        task_id: string;
        run_id: string;
    }): Promise<RunnerRunRecord>;
    writeState(state: RunnerRunState): Promise<void>;
    appendEvent(event: RunnerEvent): Promise<void>;
    readEventsTextRequired(opts: {
        task_id: string;
        run_id: string;
    }): Promise<string>;
    readEventsRequired(opts: {
        task_id: string;
        run_id: string;
    }): Promise<{
        events_text: string;
        events: RunnerEvent[];
    }>;
    readTraceTextRequired(opts: {
        task_id: string;
        run_id: string;
    }): Promise<string>;
}
export declare function resolveLatestRunnerRunId(opts: {
    git_root: string;
    workflow_dir: string;
    task_id: string;
}): Promise<string>;
//# sourceMappingURL=run-repository.d.ts.map