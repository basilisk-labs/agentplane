import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskFindingsParsed = {
    subcommand?: string;
};
export declare const taskFindingsSpec: CommandSpec<TaskFindingsParsed>;
export declare function runTaskFindings(_ctx: CommandCtx, p: TaskFindingsParsed): Promise<number>;
//# sourceMappingURL=findings.command.d.ts.map