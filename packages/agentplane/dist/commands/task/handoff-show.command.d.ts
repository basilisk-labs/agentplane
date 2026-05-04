import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskHandoffShowParsed = {
    taskId: string;
    json: boolean;
};
export declare const taskHandoffShowSpec: CommandSpec<TaskHandoffShowParsed>;
export declare const runTaskHandoffShow: (ctx: CommandCtx, parsed: TaskHandoffShowParsed) => Promise<number>;
//# sourceMappingURL=handoff-show.command.d.ts.map