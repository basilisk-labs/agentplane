import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskExportParsed = Record<string, never>;
export declare const taskExportSpec: CommandSpec<TaskExportParsed>;
export declare function makeRunTaskExportHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx) => Promise<number>;
//# sourceMappingURL=export.command.d.ts.map