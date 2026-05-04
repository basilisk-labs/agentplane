import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { type VerifyCommonParsed } from "./verify-command-shared.js";
export type TaskVerifyReworkParsed = VerifyCommonParsed & {
    taskId: string;
};
export declare const taskVerifyReworkSpec: CommandSpec<TaskVerifyReworkParsed>;
export declare function makeRunTaskVerifyReworkHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskVerifyReworkParsed) => Promise<number>;
//# sourceMappingURL=verify-rework.command.d.ts.map