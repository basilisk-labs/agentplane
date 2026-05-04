import { type CommandContext } from "../../commands/shared/task-backend.js";
import { type TaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerContextBundle, RunnerEvent, RunnerRunState } from "../types.js";
export type LoadedTaskRunnerInspection = {
    ctx: CommandContext;
    task_id: string;
    run_id: string;
    selection: "explicit" | "latest";
    paths: TaskRunnerPaths;
    bundle: RunnerContextBundle;
    state: RunnerRunState;
    events: RunnerEvent[];
    events_text: string;
};
export declare function loadTaskRunnerInspection(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id?: string;
}): Promise<LoadedTaskRunnerInspection>;
export declare function readTaskRunnerTraceArtifact(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id?: string;
}): Promise<LoadedTaskRunnerInspection & {
    trace_text: string;
}>;
export declare function readTaskRunnerTraceTail(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id?: string;
    lines: number;
}): Promise<LoadedTaskRunnerInspection & {
    tail_text: string;
}>;
//# sourceMappingURL=task-run-inspect.d.ts.map