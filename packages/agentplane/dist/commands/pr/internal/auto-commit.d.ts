import type { CommandContext } from "../../shared/task-backend.js";
export declare function maybeAutoCommitTaskPrArtifacts(opts: {
    ctx: CommandContext;
    taskId: string;
    branch: string;
}): Promise<boolean>;
//# sourceMappingURL=auto-commit.d.ts.map