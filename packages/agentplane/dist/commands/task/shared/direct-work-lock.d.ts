export type DirectWorkLock = {
    task_id: string;
    agent: string;
    slug: string;
    branch: string;
    started_at: string;
};
export declare function directWorkLockPath(agentplaneDir: string): string;
export declare function readDirectWorkLock(agentplaneDir: string): Promise<DirectWorkLock | null>;
//# sourceMappingURL=direct-work-lock.d.ts.map