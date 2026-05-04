import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type WorkStartParsed = {
    taskId: string;
    agent: string;
    slug: string;
    worktree: boolean;
};
export declare const workStartSpec: CommandSpec<WorkStartParsed>;
export declare function makeRunWorkStartHandler(getCtx: (commandForErrorContext: string) => Promise<CommandContext>): CommandHandler<WorkStartParsed>;
//# sourceMappingURL=work-start.command.d.ts.map