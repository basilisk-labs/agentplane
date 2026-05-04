import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskHandoffParsed = {
    subcommand?: string;
};
export declare const taskHandoffSpec: CommandSpec<TaskHandoffParsed>;
export declare function runTaskHandoff(_ctx: CommandCtx, p: TaskHandoffParsed): Promise<number>;
//# sourceMappingURL=handoff.command.d.ts.map