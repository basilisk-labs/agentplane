import type { CommandCtx, CommandSpec } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
export type ReadyParsed = {
    taskId: string;
};
export declare const readySpec: CommandSpec<ReadyParsed>;
export declare function makeRunReadyHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: ReadyParsed) => Promise<number>;
//# sourceMappingURL=ready.command.d.ts.map