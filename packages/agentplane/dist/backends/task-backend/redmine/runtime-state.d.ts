import { type TaskData, type TaskDocMeta, type TaskWriteOptions } from "../shared.js";
import type { RedmineBackendRuntimeHost } from "./runtime-context.js";
export declare function ensureRedmineDocMetadata(task: TaskDocMeta): void;
export declare function cacheRedmineTask(host: RedmineBackendRuntimeHost, task: TaskData, dirty: boolean): Promise<void>;
export declare function assertRedmineExpectedRevisionSupported(host: RedmineBackendRuntimeHost, taskId: string, opts?: TaskWriteOptions): void;
export declare function assertRedmineExpectedRevision(taskId: string, expectedRevision: number | undefined, currentRevision: number): void;
export declare function redmineTaskIdFieldId(host: RedmineBackendRuntimeHost): unknown;
export declare function setRedmineIssueCustomField(issue: Record<string, unknown>, fieldId: unknown, value: unknown): void;
export declare function coerceRedmineBackendDocVersion(value: unknown): 2 | 3 | null;
//# sourceMappingURL=runtime-state.d.ts.map