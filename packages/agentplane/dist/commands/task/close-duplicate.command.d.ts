import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskCloseDuplicateParsed = {
    taskId: string;
    duplicateOf: string;
    author: string;
    note?: string;
    force: boolean;
    yes: boolean;
    quiet: boolean;
};
export declare const taskCloseDuplicateSpec: CommandSpec<TaskCloseDuplicateParsed>;
export declare function makeRunTaskCloseDuplicateHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskCloseDuplicateParsed) => Promise<number>;
//# sourceMappingURL=close-duplicate.command.d.ts.map