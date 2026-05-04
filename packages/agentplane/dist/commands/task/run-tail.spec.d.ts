import type { CommandSpec } from "../../cli/spec/spec.js";
export type TaskRunTailParsed = {
    taskId: string;
    runId?: string;
    lines: number;
};
export declare const taskRunTailSpec: CommandSpec<TaskRunTailParsed>;
//# sourceMappingURL=run-tail.spec.d.ts.map