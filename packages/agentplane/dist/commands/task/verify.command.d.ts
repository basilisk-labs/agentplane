import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskVerifyParsed = {
    subcommand?: string;
};
export declare const taskVerifySpec: CommandSpec<TaskVerifyParsed>;
export declare function runTaskVerify(_ctx: CommandCtx, p: TaskVerifyParsed): Promise<number>;
//# sourceMappingURL=verify.command.d.ts.map