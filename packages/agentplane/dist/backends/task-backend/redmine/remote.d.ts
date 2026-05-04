import { type TaskData } from "../shared.js";
export declare function listTasksRemote(opts: {
    projectId: string;
    taskFieldId: unknown;
    issueCache: Map<string, Record<string, unknown>>;
    requestJson: (method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>) => Promise<Record<string, unknown>>;
    customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
    issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
}): Promise<TaskData[]>;
export declare function findIssueByTaskId(opts: {
    taskId: string;
    projectId: string;
    taskFieldId: unknown;
    issueCache: Map<string, Record<string, unknown>>;
    requestJson: (method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>) => Promise<Record<string, unknown>>;
    customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
    refreshList: () => Promise<void>;
}): Promise<Record<string, unknown> | null>;
//# sourceMappingURL=remote.d.ts.map