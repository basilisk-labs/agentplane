import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskDeriveParsed = {
    spikeId: string;
    title: string;
    description: string;
    owner: string;
    priority: "low" | "normal" | "med" | "high";
    tags: string[];
    verify: string[];
};
export declare const taskDeriveSpec: CommandSpec<TaskDeriveParsed>;
export declare function makeRunTaskDeriveHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskDeriveParsed) => Promise<number>;
//# sourceMappingURL=derive.command.d.ts.map