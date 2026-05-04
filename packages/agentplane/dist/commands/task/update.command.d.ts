import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskUpdateParsed = {
    taskId: string;
    title?: string;
    description?: string;
    priority?: "low" | "normal" | "med" | "high";
    owner?: string;
    tags: string[];
    replaceTags: boolean;
    dependsOn: string[];
    replaceDependsOn: boolean;
    verify: string[];
    replaceVerify: boolean;
    allowPrimaryChange: boolean;
};
export declare const taskUpdateSpec: CommandSpec<TaskUpdateParsed>;
export declare function makeRunTaskUpdateHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskUpdateParsed) => Promise<number>;
//# sourceMappingURL=update.command.d.ts.map