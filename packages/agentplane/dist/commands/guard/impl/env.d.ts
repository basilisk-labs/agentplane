export type CanonicalGitIdentity = {
    name: string;
    email: string;
};
export declare function resolveCanonicalGitIdentity(): Promise<CanonicalGitIdentity | null>;
export declare function buildGitCommitEnv(opts: {
    taskId: string;
    agentId?: string;
    statusTo?: string;
    allowTasks: boolean;
    allowBase: boolean;
    allowPolicy: boolean;
    allowConfig: boolean;
    allowHooks: boolean;
    allowCI: boolean;
    allowStaleDist?: boolean;
    gitIdentity?: CanonicalGitIdentity | null;
}): NodeJS.ProcessEnv;
//# sourceMappingURL=env.d.ts.map