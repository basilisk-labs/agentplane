import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskResumeContextParsed = {
    taskId: string;
    runId?: string;
    json: boolean;
};
export declare const taskResumeContextSpec: CommandSpec<TaskResumeContextParsed>;
export declare const runTaskResumeContext: (ctx: CommandCtx, parsed: TaskResumeContextParsed) => Promise<number>;
//# sourceMappingURL=resume-context.command.d.ts.map