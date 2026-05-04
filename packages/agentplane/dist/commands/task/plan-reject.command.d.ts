import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskPlanRejectParsed = {
    taskId: string;
    by: string;
    note: string;
};
export declare const taskPlanRejectSpec: CommandSpec<TaskPlanRejectParsed>;
export declare function makeRunTaskPlanRejectHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskPlanRejectParsed) => Promise<number>;
//# sourceMappingURL=plan-reject.command.d.ts.map