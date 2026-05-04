import type { ApprovalSettings, AgentplaneConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import type { TaskBackendCapabilities } from "../../backends/task-backend.js";
import type { ProtectedPathKind } from "../../shared/protected-paths.js";
import type { PolicyGatewayResolution } from "../../shared/policy-gateway.js";
export type HarnessSourceId = "builtin" | "project" | "config" | "execution_profile" | "policy_gateway" | "backend";
export type HarnessSourceRef = {
    id: HarnessSourceId;
    detail: string;
};
export type HarnessTraceField = "repo" | "workflow" | "task_contract" | "policy_gateway" | "approval_requirements" | "protected_paths" | "execution" | "backend";
export type ResolvedProtectedPathGroups = Record<ProtectedPathKind, string[]>;
export type ResolvedHarnessTrace = Record<HarnessTraceField, HarnessSourceRef[]>;
export type ResolvedHarnessContract = {
    repo: ResolvedProject & {
        policy_gateway: PolicyGatewayResolution;
        tasks_backend_config_path: string;
    };
    workflow: {
        mode: AgentplaneConfig["workflow_mode"];
        status_commit_policy: AgentplaneConfig["status_commit_policy"];
        finish_auto_status_commit: boolean;
        task_prefix: string;
        paths: AgentplaneConfig["paths"];
    };
    task: {
        doc_sections: string[];
        required_doc_sections: string[];
        verify_required_tags: string[];
        verify_steps_required_tags: string[];
        verify_steps_required_primary: string[];
        verification_required_primary: string[];
        spike_tag: string;
        enforce_verify_steps_on_plan_approve: boolean;
        enforce_verify_steps_on_start_without_plan: boolean;
        comments: AgentplaneConfig["tasks"]["comments"];
        closure_commit_requires_approval: boolean;
    };
    policy: {
        approvals: Required<ApprovalSettings>;
        unsafe_actions_requiring_explicit_user_ok: string[];
        protected_paths: ResolvedProtectedPathGroups;
    };
    execution: AgentplaneConfig["execution"];
    backend: {
        id: string;
        config_path: string;
        capabilities: TaskBackendCapabilities | null;
        restrictions: {
            canonical_source: TaskBackendCapabilities["canonical_source"];
            projection: TaskBackendCapabilities["projection"];
            projection_read_mode: TaskBackendCapabilities["projection_read_mode"];
            reads_from_projection_by_default: boolean;
            writes_task_readmes: boolean;
            supports_task_revisions: boolean;
            supports_revision_guarded_writes: boolean;
            may_access_network_on_read: boolean;
            may_access_network_on_write: boolean;
            supports_projection_refresh: boolean;
            supports_push_sync: boolean;
            supports_snapshot_export: boolean;
        };
    };
    trace: ResolvedHarnessTrace;
};
//# sourceMappingURL=types.d.ts.map