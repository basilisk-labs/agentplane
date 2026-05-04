import type { RedmineSyncContext } from "./context.js";
export declare function inferRedmineStatusIdForTaskStatus(context: RedmineSyncContext, statusRaw: unknown): Promise<number | null>;
export declare function loadRedmineInferredStatusByTaskStatus(context: RedmineSyncContext): Promise<Map<string, number>>;
export declare function selectRedmineInferredStatus(statuses: {
    id: number;
    name: string;
    isClosed: boolean;
    isDefault: boolean;
}[], target: "TODO" | "DOING" | "DONE"): number | null;
//# sourceMappingURL=status.d.ts.map