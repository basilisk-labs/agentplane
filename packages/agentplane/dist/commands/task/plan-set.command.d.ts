import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskPlanSetParsed = {
    taskId: string;
    text?: string;
    file?: string;
    updatedBy?: string;
};
export declare const taskPlanSetSpec: CommandSpec<TaskPlanSetParsed>;
export declare function makeRunTaskPlanSetHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskPlanSetParsed) => Promise<number>;
//# sourceMappingURL=plan-set.command.d.ts.map