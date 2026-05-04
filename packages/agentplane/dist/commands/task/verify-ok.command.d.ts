import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { type VerifyCommonParsed } from "./verify-command-shared.js";
export type TaskVerifyOkParsed = VerifyCommonParsed & {
    taskId: string;
};
export declare const taskVerifyOkSpec: CommandSpec<TaskVerifyOkParsed>;
export declare function makeRunTaskVerifyOkHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskVerifyOkParsed) => Promise<number>;
//# sourceMappingURL=verify-ok.command.d.ts.map