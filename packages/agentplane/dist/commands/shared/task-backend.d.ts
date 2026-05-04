import type { ResolvedProject } from "@agentplaneorg/core/project";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import { loadTaskBackend, type TaskBackendCapabilities, type TaskBackend, type TaskData, type TaskSummary } from "../../backends/task-backend.js";
import { GitContext } from "@agentplaneorg/core/git";
export { loadTaskFromBranchSnapshot, resolveTaskBranchFromContext, } from "./task-backend-branch-snapshot.js";
export type CommandMemo = {
    tasks?: Promise<TaskData[]>;
    taskProjection?: Promise<TaskSummary[]>;
    changedPaths?: Promise<string[]>;
    headCommit?: Promise<string>;
    agentIds?: Promise<string[]>;
    harness?: Promise<ResolvedHarnessContract>;
};
export type CommandContext = {
    resolvedProject: Awaited<ReturnType<typeof loadTaskBackend>>["resolved"];
    config: Awaited<ReturnType<typeof loadTaskBackend>>["config"];
    taskBackend: Awaited<ReturnType<typeof loadTaskBackend>>["backend"];
    backendId: string;
    backendConfigPath: string;
    git: GitContext;
    memo: CommandMemo;
};
export declare function resolveDocUpdatedBy(task: TaskData, author?: string): string;
export declare function taskDataToFrontmatter(task: TaskData): Record<string, unknown>;
export declare function getTaskBackendCapabilities(ctx: CommandContext): TaskBackendCapabilities;
export declare function backendHasLocalCanonicalSource(ctx: CommandContext): boolean;
export declare function backendWritesTaskReadmes(ctx: CommandContext): boolean;
export declare function backendSupportsTaskBranchSnapshots(ctx: CommandContext): boolean;
export declare function backendUsesLocalTaskStore(ctx: CommandContext): boolean;
export declare function loadCommandContext(opts: {
    cwd: string;
    rootOverride?: string | null;
    resolvedProject?: ResolvedProject;
    config?: AgentplaneConfig;
}): Promise<CommandContext>;
export declare function loadTaskFromContext(opts: {
    ctx: CommandContext;
    taskId: string;
    preferBranchSnapshot?: boolean;
    branchSnapshotBranch?: string | null;
}): Promise<TaskData>;
export declare function loadBackendTask(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    taskId: string;
}): Promise<{
    backend: CommandContext["taskBackend"];
    backendId: string;
    backendConfigPath: string;
    resolved: CommandContext["resolvedProject"];
    config: CommandContext["config"];
    task: TaskData;
}>;
export declare function writeTasksOrFallback(backend: Pick<TaskBackend, "writeTask" | "writeTasks">, tasks: readonly TaskData[]): Promise<void>;
export declare function listTaskSummariesMemo(ctx: CommandContext): Promise<TaskSummary[]>;
export declare function listTasksMemo(ctx: CommandContext): Promise<TaskData[]>;
export declare function listTaskProjection(ctx: CommandContext): Promise<TaskSummary[] | null>;
export declare function exportTaskProjectionSnapshot(opts: {
    ctx: CommandContext;
    outputPath: string;
}): Promise<void>;
//# sourceMappingURL=task-backend.d.ts.map