import type { GitContext } from "@agentplaneorg/core/git";
import type { GitPort } from "../../ports/git-port.js";
export declare class GitContextAdapter implements GitPort {
    private readonly inner;
    constructor(inner: GitContext);
    statusChangedPaths(): Promise<string[]>;
    statusStagedPaths(): Promise<string[]>;
    statusUnstagedTrackedPaths(): Promise<string[]>;
    headCommit(): Promise<string>;
    headHashSubject(): Promise<{
        hash: string;
        subject: string;
    }>;
    stage(paths: string[]): Promise<void>;
    commit(opts: {
        message: string;
        body?: string;
        env?: NodeJS.ProcessEnv;
    }): Promise<void>;
}
//# sourceMappingURL=git-context-adapter.d.ts.map