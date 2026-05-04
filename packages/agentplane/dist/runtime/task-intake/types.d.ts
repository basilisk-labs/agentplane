import type { ApprovalSettings } from "@agentplaneorg/core/config";
import type { TaskDocVersion } from "@agentplaneorg/core/tasks";
import type { TaskBackendCapabilities, TaskData, TaskOrigin } from "../../backends/task-backend.js";
import type { BehaviorLayer } from "../behavior/index.js";
import type { AgentplaneCapabilityRegistry } from "../capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import type { ResolvedHarnessContract } from "../harness/index.js";
export type TaskIntakeSourceId = "task_new" | "task_create" | "recipe_scenario" | "import" | "system";
export type TaskIntakeSourceRef = {
    id: TaskIntakeSourceId;
    detail: string;
};
export type TaskIntakeInputKind = "text" | "constraint" | "task_reference" | "recipe_reference" | "output";
export type TaskIntakeInput = {
    kind: TaskIntakeInputKind;
    label?: string;
    value: string;
    required?: boolean;
};
export type TaskIntakePrecedence = {
    behavior_order: BehaviorLayer[];
    extension_layer: "recipes";
};
export type TaskIntakeRuntime = {
    repo: {
        git_root: string;
        agentplane_dir: string;
        workflow_dir: string;
    };
    workflow: {
        mode: ResolvedHarnessContract["workflow"]["mode"];
    };
    backend: {
        id: string;
        config_path: string;
        capabilities: TaskBackendCapabilities | null;
        supports_generate_task_id: boolean;
        supports_bulk_write: boolean;
    };
    task_contract: {
        doc_sections: string[];
        required_doc_sections: string[];
        verify_required_tags: string[];
    };
    policy: {
        approvals: Required<ApprovalSettings>;
        protected_paths: ResolvedHarnessContract["policy"]["protected_paths"];
        unsafe_actions_requiring_explicit_user_ok: string[];
    };
    execution_profile: ResolvedExecutionProfileRuntime;
    capabilities: AgentplaneCapabilityRegistry;
    precedence: TaskIntakePrecedence;
};
export type TaskIntakeContext = {
    runtime: TaskIntakeRuntime;
    source: TaskIntakeSourceRef;
    requested_outcome: string;
    requested_owner?: string;
    requested_tags: string[];
    requested_verify: string[];
    requested_dependencies: string[];
    parent_task_id?: string;
    inputs: TaskIntakeInput[];
};
export type ClarificationQuestion = {
    id: string;
    question: string;
    reason: string;
    required: boolean;
    target_field?: string;
    accepted_values?: string[];
};
export type ClarificationContract = {
    context: TaskIntakeContext;
    status: "ready" | "needs_input";
    assumptions: string[];
    questions: ClarificationQuestion[];
};
export type TaskGraphDependency = {
    from: string;
    to: string;
    kind: "depends_on";
};
export type TaskGraphDraftTask = {
    draft_id: string;
    title: string;
    description: string;
    owner: string;
    priority: TaskData["priority"];
    origin?: TaskOrigin | null;
    tags: string[];
    verify: string[];
    depends_on: string[];
    doc: string;
    doc_version?: TaskDocVersion;
    id_source?: string;
};
export type TaskGraphDraft = {
    context: TaskIntakeContext;
    clarification: ClarificationContract;
    summary: string;
    tasks: TaskGraphDraftTask[];
    dependencies: TaskGraphDependency[];
    warnings: string[];
};
export type TaskMaterializationEntry = {
    draft_id: string;
    task_id: string;
    task: TaskData;
    readme_path: string;
};
export type TaskMaterializationPlan = {
    context: TaskIntakeContext;
    summary: string;
    backend: TaskIntakeRuntime["backend"];
    tasks: TaskMaterializationEntry[];
};
//# sourceMappingURL=types.d.ts.map