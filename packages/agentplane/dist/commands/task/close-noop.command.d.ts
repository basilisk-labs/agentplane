import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
type TaskCloseNoopParsed = {
    taskId: string;
    author: string;
    note?: string;
    force: boolean;
    yes: boolean;
    quiet: boolean;
};
export declare const taskCloseNoopSpec: CommandSpec<TaskCloseNoopParsed>;
export declare function makeRunTaskCloseNoopHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskCloseNoopParsed) => Promise<number>;
export {};
//# sourceMappingURL=close-noop.command.d.ts.map