import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
type TaskStartReadyParsed = {
    taskId: string;
    author: string;
    body?: string;
    bodyFile?: string;
    force: boolean;
    yes: boolean;
    quiet: boolean;
};
export declare const taskStartReadySpec: CommandSpec<TaskStartReadyParsed>;
export declare function makeRunTaskStartReadyHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskStartReadyParsed) => Promise<number>;
export {};
//# sourceMappingURL=start-ready.command.d.ts.map