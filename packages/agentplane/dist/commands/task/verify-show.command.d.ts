import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { type CommandContext } from "../shared/task-backend.js";
export type TaskVerifyShowParsed = {
    taskId: string;
    quiet: boolean;
};
export declare const taskVerifyShowSpec: CommandSpec<TaskVerifyShowParsed>;
export declare function makeRunTaskVerifyShowHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskVerifyShowParsed) => Promise<number>;
//# sourceMappingURL=verify-show.command.d.ts.map