import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskPlanApproveParsed = {
    taskId: string;
    by: string;
    note?: string;
};
export declare const taskPlanApproveSpec: CommandSpec<TaskPlanApproveParsed>;
export declare function makeRunTaskPlanApproveHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskPlanApproveParsed) => Promise<number>;
//# sourceMappingURL=plan-approve.command.d.ts.map