import type { TaskDocVersion } from "@agentplaneorg/core/tasks";
import { type TaskData } from "../shared.js";
export declare function startDateFromTaskId(taskId: string): string | null;
export declare function doneRatioForStatus(status: string): number | null;
export declare function issueToTask(opts: {
    issue: Record<string, unknown>;
    taskIdOverride?: string;
    reverseStatus: Map<number, string>;
    customFields: Record<string, unknown>;
    ownerAgent: string;
    defaultDocVersion: TaskDocVersion;
}): TaskData | null;
export declare function taskToIssuePayload(opts: {
    task: TaskData;
    existingIssue?: Record<string, unknown>;
    statusMap: Record<string, unknown>;
    assigneeId: number | null;
    customFields: Record<string, unknown>;
    appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) => void;
}): Record<string, unknown>;
//# sourceMappingURL=mapping.d.ts.map