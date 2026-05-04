import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import type { Adapters } from "../adapters/index.js";
import { type CommandContext } from "../commands/shared/task-backend.js";
import { PolicyEngine } from "../policy/engine.js";
import { type ApprovalRuntime } from "./approvals/index.js";
import { type AgentplaneCapabilityRegistry } from "./capabilities/index.js";
import { type ResolvedExecutionProfileRuntime } from "./execution-profile/index.js";
import { type FrameworkExplainPayload } from "./explain/index.js";
import { type ResolvedHarnessContract } from "./harness/index.js";
import { type FrameworkProtocolSurface } from "./protocol/index.js";
import { type TaskIntakeRuntime } from "./task-intake/index.js";
export type AgentplaneRepositoryContext = {
    git_root: string;
    agentplane_dir: string;
    workflow_dir: string;
};
export type AgentplaneBackendContext = {
    id: string;
    config_path: string;
    capabilities: CommandContext["taskBackend"]["capabilities"] | null;
    task_backend: CommandContext["taskBackend"];
};
export type ReadOnlyExecutionContext = {
    command: CommandContext;
    project: CommandContext["resolvedProject"];
    repo: AgentplaneRepositoryContext;
    config: CommandContext["config"];
    backend: AgentplaneBackendContext;
    harness: ResolvedHarnessContract;
    capabilities: AgentplaneCapabilityRegistry;
    execution: ResolvedHarnessContract["execution"];
    executionProfile: ResolvedExecutionProfileRuntime;
    taskIntake: TaskIntakeRuntime;
    frameworkExplain: FrameworkExplainPayload;
    frameworkProtocol: FrameworkProtocolSurface;
    approvals: ResolvedHarnessContract["policy"]["approvals"];
    policy: PolicyEngine;
    approvalRuntime: ApprovalRuntime;
};
export type ExecutionContext = ReadOnlyExecutionContext & {
    adapters: Adapters;
};
export declare function resolveCommandContext(opts: {
    cwd: string;
    rootOverride?: string | null;
    resolvedProject?: ResolvedProject;
    config?: AgentplaneConfig;
}): Promise<CommandContext>;
export declare function resolveReadOnlyExecutionContext(opts: {
    cwd: string;
    rootOverride?: string | null;
    resolvedProject?: ResolvedProject;
    config?: AgentplaneConfig;
}): Promise<ReadOnlyExecutionContext>;
export declare function resolveExecutionContext(opts: {
    cwd: string;
    rootOverride?: string | null;
    resolvedProject?: ResolvedProject;
    config?: AgentplaneConfig;
}): Promise<ExecutionContext>;
export declare function makeReadOnlyExecutionContext(command: CommandContext): Promise<ReadOnlyExecutionContext>;
export declare function makeExecutionContext(command: CommandContext): Promise<ExecutionContext>;
//# sourceMappingURL=execution-context.d.ts.map