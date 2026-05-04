import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskSetStatusParsed = {
    taskId: string;
    status: string;
    author?: string;
    body?: string;
    bodyFile?: string;
    commit?: string;
    force: boolean;
    yes: boolean;
    commitFromComment: boolean;
    commitEmoji?: string;
    commitAllow: string[];
    commitAutoAllow: boolean;
    commitAllowTasks: boolean;
    commitRequireClean: boolean;
    confirmStatusCommit: boolean;
    quiet: boolean;
};
export declare const taskSetStatusSpec: CommandSpec<TaskSetStatusParsed>;
export declare function makeRunTaskSetStatusHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskSetStatusParsed) => Promise<number>;
//# sourceMappingURL=set-status.command.d.ts.map