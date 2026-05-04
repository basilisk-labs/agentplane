import type { TaskData } from "../../../backends/task-backend.js";
export type CloseCommitMessage = {
    subject: string;
    body: string;
};
export declare function buildCloseCommitMessage(opts: {
    gitRoot: string;
    task: TaskData;
    keyFilesLimit?: number;
}): Promise<CloseCommitMessage>;
export declare function taskReadmePathForTask(opts: {
    gitRoot: string;
    workflowDir: string;
    taskId: string;
}): string;
//# sourceMappingURL=close-message.d.ts.map