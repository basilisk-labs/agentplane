import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskScrubParsed = {
    find: string;
    replace: string;
    dryRun: boolean;
    quiet: boolean;
};
export declare const taskScrubSpec: CommandSpec<TaskScrubParsed>;
export declare function makeRunTaskScrubHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskScrubParsed) => Promise<number>;
//# sourceMappingURL=scrub.command.d.ts.map