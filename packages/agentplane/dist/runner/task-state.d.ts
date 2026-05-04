import { type CommandContext } from "../commands/shared/task-backend.js";
import type { RunnerContextBundle, RunnerRunState } from "./types.js";
export declare function persistRunnerOutcomeToTask(opts: {
    ctx: CommandContext;
    task_id: string;
    state: RunnerRunState;
    bundle?: RunnerContextBundle;
}): Promise<void>;
//# sourceMappingURL=task-state.d.ts.map