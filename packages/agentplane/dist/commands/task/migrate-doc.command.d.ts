import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskMigrateDocParsed = {
    all: boolean;
    quiet: boolean;
    taskIds: string[];
};
export declare const taskMigrateDocSpec: CommandSpec<TaskMigrateDocParsed>;
export declare function runTaskMigrateDoc(ctx: CommandCtx, p: TaskMigrateDocParsed): Promise<number>;
//# sourceMappingURL=migrate-doc.command.d.ts.map