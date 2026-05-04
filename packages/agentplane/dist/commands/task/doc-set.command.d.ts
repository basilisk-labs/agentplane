import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskDocSetParsed = {
    taskId: string;
    section?: string;
    text?: string;
    file?: string;
    updatedBy?: string;
    fullDoc: boolean;
};
export declare const taskDocSetSpec: CommandSpec<TaskDocSetParsed>;
export declare function makeRunTaskDocSetHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskDocSetParsed) => Promise<number>;
//# sourceMappingURL=doc-set.command.d.ts.map