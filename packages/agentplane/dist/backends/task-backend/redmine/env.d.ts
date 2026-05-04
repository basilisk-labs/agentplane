export type RedmineEnvConfig = {
    url?: string;
    apiKey?: string;
    projectId?: string;
    assigneeId?: number;
    ownerAgent?: string;
    customFields: Partial<Record<RedmineCustomFieldKey, number>>;
    batch: {
        size?: number;
        pauseMs?: number;
    };
};
type RedmineCustomFieldKey = "task_id" | "canonical_state" | "doc" | "doc_version" | "doc_updated_at" | "doc_updated_by" | "tags" | "priority" | "owner";
export declare function readRedmineEnv(): RedmineEnvConfig;
export {};
//# sourceMappingURL=env.d.ts.map