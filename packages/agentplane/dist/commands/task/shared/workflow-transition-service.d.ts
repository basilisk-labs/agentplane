import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { TaskBackend, TaskData } from "../../../backends/task-backend.js";
import { type TaskStoreIntent, type TaskStoreTaskPatch } from "../../shared/task-store.js";
import { type DependencyState } from "./dependencies.js";
type TaskComment = NonNullable<TaskData["comments"]>[number];
type BuildTaskStatusTransitionOptions = {
    task: TaskData;
    at: string;
    toStatus: TaskData["status"];
    eventAuthor: string;
    updatedBy: string;
    note?: string;
    comment?: TaskComment;
    commit?: TaskData["commit"] | null;
    extraFields?: TaskStoreTaskPatch;
};
type BuildTaskVerificationTransitionOptions = {
    task: TaskData;
    at: string;
    by: string;
    note: string;
    state: "ok" | "needs_rework";
    verificationSection: string;
    nextDoc: string;
    requiredSections: string[];
};
export type ExecuteTaskVerificationTransitionRequest = {
    task: TaskData;
    at: string;
    by: string;
    note: string;
    state: "ok" | "needs_rework";
    details?: string | null;
    doc: string;
    requiredSections: string[];
};
export type TaskVerificationTransitionExecution = TaskTransitionWrite & {
    verificationSection: string;
    nextDoc: string;
};
export type TaskTransitionWrite = {
    currentStatus: string;
    intents: TaskStoreIntent[];
    nextTask: TaskData;
};
export type TaskStatusTransitionDependencyPolicy = {
    kind: "none";
} | {
    kind: "require-ready";
    failureMessage?: string;
};
export type TaskStatusTransitionCommentCommitPolicy = {
    enabled: boolean;
    action: string;
    confirmed: boolean;
    quiet: boolean;
};
export type ExecuteTaskStatusTransitionRequest = BuildTaskStatusTransitionOptions & {
    backend: Pick<TaskBackend, "getTask" | "getTasks">;
    config: AgentplaneConfig;
    force: boolean;
    dependencyPolicy?: TaskStatusTransitionDependencyPolicy;
    commentCommitPolicy?: TaskStatusTransitionCommentCommitPolicy;
};
export type TaskStatusTransitionExecution = TaskTransitionWrite & {
    dependencyState: DependencyState | null;
    deferredWarnings: string[];
};
export declare function readDeferredTaskTransitionWarnings(error: unknown): string[];
export declare function buildTaskStatusTransition(opts: BuildTaskStatusTransitionOptions): TaskTransitionWrite;
export declare function executeTaskStatusTransitionRequest(opts: ExecuteTaskStatusTransitionRequest): Promise<TaskStatusTransitionExecution>;
export declare function buildTaskVerificationTransition(opts: BuildTaskVerificationTransitionOptions): TaskTransitionWrite;
export declare function executeTaskVerificationTransitionRequest(opts: ExecuteTaskVerificationTransitionRequest): TaskVerificationTransitionExecution;
export {};
//# sourceMappingURL=workflow-transition-service.d.ts.map