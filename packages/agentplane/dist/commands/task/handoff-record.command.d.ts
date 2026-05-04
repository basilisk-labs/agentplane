import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
export type TaskHandoffRecordParsed = {
    taskId: string;
    fromRole: string;
    toRole?: string;
    reason: string;
    note?: string;
    runId?: string;
    nextActions: string[];
    risks: string[];
    openQuestions: string[];
    evidencePaths: string[];
    json: boolean;
};
export declare const taskHandoffRecordSpec: CommandSpec<TaskHandoffRecordParsed>;
export declare const runTaskHandoffRecord: (ctx: CommandCtx, parsed: TaskHandoffRecordParsed) => Promise<number>;
//# sourceMappingURL=handoff-record.command.d.ts.map