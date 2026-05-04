import { type TaskBackendFieldNameDrift, type TaskBackendVisibleField } from "../shared.js";
export declare function inspectVisibleCustomFields(opts: {
    projectId: string;
    requestJson: (method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>) => Promise<Record<string, unknown>>;
}): Promise<TaskBackendVisibleField[]>;
export declare function inferVisibleCanonicalStateFieldId(visibleFields: TaskBackendVisibleField[]): number | null;
export declare function detectConfiguredFieldNameDrift(opts: {
    configuredFields: Record<string, unknown>;
    visibleFields: TaskBackendVisibleField[];
}): TaskBackendFieldNameDrift[];
//# sourceMappingURL=inspect.d.ts.map