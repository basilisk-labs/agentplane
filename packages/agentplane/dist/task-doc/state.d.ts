import type { TaskDocMutationComment, TaskDocVersion } from "@agentplaneorg/core/tasks";
export declare function buildTaskDocState(opts: {
    doc: string;
    owner?: string;
    updatedBy?: string;
    version?: TaskDocVersion;
    updatedAt?: string;
    comments?: readonly TaskDocMutationComment[] | null;
}): import("@agentplaneorg/core/tasks").TaskDocMutationResult;
//# sourceMappingURL=state.d.ts.map