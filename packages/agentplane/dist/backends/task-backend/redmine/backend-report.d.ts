import { type TaskBackendInspectionResult, type TaskData } from "../shared.js";
type RedmineReportContext = {
    projectId: string;
    customFields: Record<string, unknown>;
    requestJson: (method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>) => Promise<Record<string, unknown>>;
};
export declare function inspectRedmineConfiguration(context: RedmineReportContext): Promise<TaskBackendInspectionResult>;
export declare function diffRedmineTasks(localTask: TaskData, remoteTask: TaskData): string;
export declare function redmineTasksDiffer(localTask: TaskData, remoteTask: TaskData): boolean;
export {};
//# sourceMappingURL=backend-report.d.ts.map