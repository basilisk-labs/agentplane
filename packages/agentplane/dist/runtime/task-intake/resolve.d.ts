import type { AgentplaneCapabilityRegistry } from "../capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import type { ResolvedHarnessContract } from "../harness/index.js";
import type { ClarificationContract, ClarificationQuestion, TaskGraphDependency, TaskGraphDraft, TaskGraphDraftTask, TaskIntakeContext, TaskIntakeInput, TaskIntakeRuntime, TaskMaterializationPlan } from "./types.js";
export declare function createTaskIntakeRuntime(opts: {
    repo: TaskIntakeRuntime["repo"];
    backend: {
        id: string;
        config_path: string;
        capabilities: TaskIntakeRuntime["backend"]["capabilities"];
        supports_generate_task_id: boolean;
        supports_bulk_write: boolean;
    };
    harness: Pick<ResolvedHarnessContract, "workflow" | "task" | "policy">;
    execution_profile: ResolvedExecutionProfileRuntime;
    capabilities: AgentplaneCapabilityRegistry;
}): TaskIntakeRuntime;
export declare function createTaskIntakeContext(opts: {
    runtime: TaskIntakeRuntime;
    source: TaskIntakeContext["source"];
    requested_outcome: string;
    requested_owner?: string;
    requested_tags?: string[];
    requested_verify?: string[];
    requested_dependencies?: string[];
    parent_task_id?: string;
    inputs?: TaskIntakeInput[];
}): TaskIntakeContext;
export declare function createClarificationContract(opts: {
    context: TaskIntakeContext;
    assumptions?: string[];
    questions?: ClarificationQuestion[];
}): ClarificationContract;
export declare function createTaskGraphDraft(opts: {
    context: TaskIntakeContext;
    clarification: ClarificationContract;
    summary: string;
    tasks: TaskGraphDraftTask[];
    dependencies?: TaskGraphDependency[];
    warnings?: string[];
}): TaskGraphDraft;
export declare function materializeTaskGraphDraft(opts: {
    draft: TaskGraphDraft;
    task_ids?: Record<string, string>;
    allocateTaskId?: (task: TaskGraphDraft["tasks"][number], index: number) => Promise<string>;
    created_at?: string;
}): Promise<TaskMaterializationPlan>;
//# sourceMappingURL=resolve.d.ts.map