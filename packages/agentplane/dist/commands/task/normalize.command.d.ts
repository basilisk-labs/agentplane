import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskNormalizeParsed = {
    quiet: boolean;
    force: boolean;
    yes: boolean;
    syncHostedMerges: boolean;
    syncBranchPrState: boolean;
    taskIds: string[];
};
export declare const taskNormalizeSpec: CommandSpec<TaskNormalizeParsed>;
export declare function makeRunTaskNormalizeHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskNormalizeParsed) => Promise<number>;
//# sourceMappingURL=normalize.command.d.ts.map