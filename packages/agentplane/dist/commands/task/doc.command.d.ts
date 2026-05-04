import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskDocParsed = {
    subcommand?: string;
};
export declare const taskDocSpec: CommandSpec<TaskDocParsed>;
export declare function runTaskDoc(_ctx: CommandCtx, p: TaskDocParsed): Promise<number>;
//# sourceMappingURL=doc.command.d.ts.map