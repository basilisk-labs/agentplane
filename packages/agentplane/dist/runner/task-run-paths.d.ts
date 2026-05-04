import type { RunnerArtifactPaths } from "./types.js";
export declare const RUNNER_BUNDLE_FILENAME = "bundle.json";
export declare const RUNNER_BOOTSTRAP_FILENAME = "bootstrap.md";
export declare const RUNNER_STATE_FILENAME = "run-state.json";
export declare const RUNNER_EVENTS_FILENAME = "events.jsonl";
export declare const RUNNER_RESULT_FILENAME = "result.json";
export declare const RUNNER_TRACE_FILENAME = "agent-trace.jsonl";
export declare const RUNNER_STDERR_FILENAME = "stderr.log";
export type TaskRunnerPaths = RunnerArtifactPaths & {
    task_dir: string;
    runs_dir: string;
};
export declare function createRunnerRunId(date?: Date): string;
export declare function resolveTaskRunnerPaths(opts: {
    git_root: string;
    workflow_dir: string;
    task_id: string;
    run_id: string;
}): TaskRunnerPaths;
//# sourceMappingURL=task-run-paths.d.ts.map