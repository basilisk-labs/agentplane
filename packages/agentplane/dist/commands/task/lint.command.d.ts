import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskLintParsed = Record<string, never>;
export declare const taskLintSpec: CommandSpec<TaskLintParsed>;
export declare function runTaskLint(ctx: CommandCtx): Promise<number>;
//# sourceMappingURL=lint.command.d.ts.map