import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskCommentParsed = {
    taskId: string;
    author: string;
    body?: string;
    bodyFile?: string;
};
export declare const taskCommentSpec: CommandSpec<TaskCommentParsed>;
export declare function makeRunTaskCommentHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskCommentParsed) => Promise<number>;
//# sourceMappingURL=comment.command.d.ts.map