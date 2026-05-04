import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskReclaimParsed = {
    taskId: string;
    author: string;
    reason: string;
    force: boolean;
    json: boolean;
};
export declare const taskReclaimSpec: CommandSpec<TaskReclaimParsed>;
export declare const runTaskReclaim: (ctx: CommandCtx, parsed: TaskReclaimParsed) => Promise<number>;
//# sourceMappingURL=reclaim.command.d.ts.map