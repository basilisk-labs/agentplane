import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskMigrateParsed = {
    source?: string;
    quiet: boolean;
    force: boolean;
    yes: boolean;
};
export declare const taskMigrateSpec: CommandSpec<TaskMigrateParsed>;
export declare function makeRunTaskMigrateHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskMigrateParsed) => Promise<number>;
//# sourceMappingURL=migrate.command.d.ts.map