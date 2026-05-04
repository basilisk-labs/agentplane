import { type TaskStatus } from "@agentplaneorg/core/tasks";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskAddParsed = {
    taskIds: string[];
    title: string;
    description: string;
    status: TaskStatus;
    priority: "low" | "normal" | "med" | "high";
    owner: string;
    tags: string[];
    dependsOn: string[];
    verify: string[];
    commentAuthor: string | null;
    commentBody: string | null;
};
export declare const taskAddSpec: CommandSpec<TaskAddParsed>;
export declare function makeRunTaskAddHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskAddParsed) => Promise<number>;
//# sourceMappingURL=add.command.d.ts.map