import type { TaskDocMutationState } from "@agentplaneorg/core/tasks";
import { type TaskData } from "./shared.js";
export type LocalBackendContext = {
    root: string;
    updatedBy: string;
    setLastListWarnings?: (warnings: string[]) => void;
};
export declare function storedRevisionFromFrontmatter(frontmatter: Record<string, unknown>, fallback: number): number;
export declare function assertExpectedRevision(opts: {
    taskId: string;
    expectedRevision?: number;
    currentRevision: number;
}): void;
export declare function taskDocStateFromFrontmatter(frontmatter: Record<string, unknown>, body: string): TaskDocMutationState;
export declare function taskDocStateFromTask(task: Pick<TaskData, "comments" | "doc_updated_by" | "doc_version" | "owner">, doc: string): TaskDocMutationState;
//# sourceMappingURL=local-backend-state.d.ts.map