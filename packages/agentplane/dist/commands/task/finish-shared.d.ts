import type { TaskData } from "../../backends/task-backend.js";
import { type CommandContext } from "../shared/task-backend.js";
import { getTaskStore } from "../shared/task-store.js";
export type ResolvedCommitInfo = {
    hash: string;
    message: string;
};
export type LoadedFinishTask = {
    taskId: string;
    task: TaskData;
};
export declare function existingCommitInfo(task: TaskData): ResolvedCommitInfo | null;
export declare function assertTaskCanFinish(opts: {
    task: TaskData;
    config: CommandContext["config"];
    taskCount: number;
    isMetaTask: boolean;
    resultProvided: boolean;
    resultSummary: string;
    force: boolean;
}): void;
export declare function loadTaskForFinish(opts: {
    ctx: CommandContext;
    store: ReturnType<typeof getTaskStore> | null;
    useStore: boolean;
    taskId: string;
    taskCount: number;
    metaTaskId: string;
    resultProvided: boolean;
    resultSummary: string;
    force: boolean;
    capturePrimaryLifecycleMeta: boolean;
}): Promise<{
    loaded: LoadedFinishTask;
    primaryStatusFrom: string | null;
    primaryTag: string | null;
}>;
export declare function writeFinishedTasks(opts: {
    ctx: CommandContext;
    loadedTasks: LoadedFinishTask[];
    metaTaskId: string;
    author: string;
    body: string;
    force: boolean;
    resultProvided: boolean;
    resultSummary: string;
    riskLevel?: "low" | "med" | "high";
    breaking: boolean;
    taskCommitInfo: ResolvedCommitInfo | null;
}): Promise<void>;
export declare function createTaskCloseCommit(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    baseBranchOverride?: string;
    quiet: boolean;
    closeUnstageOthers?: boolean;
    allowPolicy?: boolean;
    closeRefreshTaskArtifacts?: boolean;
    additionalTaskIds?: string[];
}): Promise<void>;
//# sourceMappingURL=finish-shared.d.ts.map