import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskScaffoldParsed = {
    taskId: string;
    title?: string;
    overwrite: boolean;
    force: boolean;
    yes: boolean;
    quiet: boolean;
};
export declare const taskScaffoldSpec: CommandSpec<TaskScaffoldParsed>;
export declare function makeRunTaskScaffoldHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskScaffoldParsed) => Promise<number>;
//# sourceMappingURL=scaffold.command.d.ts.map