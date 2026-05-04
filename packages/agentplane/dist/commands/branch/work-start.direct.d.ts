type DirectWorkLock = {
    task_id: string;
    agent: string;
    slug: string;
    branch: string;
    started_at: string;
};
export declare function directWorkLockPath(agentplaneDir: string): string;
export declare function readDirectWorkLock(agentplaneDir: string): Promise<DirectWorkLock | null>;
export declare function writeDirectWorkLock(agentplaneDir: string, lock: DirectWorkLock): Promise<void>;
export declare function ensureGitClean(gitRoot: string): Promise<void>;
export {};
//# sourceMappingURL=work-start.direct.d.ts.map