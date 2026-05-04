import type { CommandContext } from "../shared/task-backend.js";
export declare function materializeLocalBackendReadmesForWorktree(opts: {
    backend: CommandContext["taskBackend"];
    repoRoot: string;
    worktreePath: string;
    taskId: string;
}): Promise<void>;
export declare function materializeRepoLocalDistForWorktree(opts: {
    repoRoot: string;
    worktreePath: string;
}): Promise<void>;
export declare function materializeRepoLocalInstallLayoutForWorktree(opts: {
    repoRoot: string;
    worktreePath: string;
}): Promise<void>;
//# sourceMappingURL=work-start.materialize.d.ts.map