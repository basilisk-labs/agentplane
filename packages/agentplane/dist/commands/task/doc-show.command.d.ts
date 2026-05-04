import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskDocShowParsed = {
    taskId: string;
    section?: string;
    quiet: boolean;
};
export declare const taskDocShowSpec: CommandSpec<TaskDocShowParsed>;
export declare function makeRunTaskDocShowHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskDocShowParsed) => Promise<number>;
//# sourceMappingURL=doc-show.command.d.ts.map