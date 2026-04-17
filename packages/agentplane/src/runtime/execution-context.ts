import type { AgentplaneConfig, ResolvedProject } from "@agentplaneorg/core";
import type { Adapters } from "../adapters/index.js";
import { buildAdapters } from "../adapters/index.js";
import { loadCommandContext, type CommandContext } from "../commands/shared/task-backend.js";
import { PolicyEngine } from "../policy/engine.js";
import { createApprovalRuntime, type ApprovalRuntime } from "./approvals/index.js";
import {
  resolveTaskBackendCapabilityRegistry,
  type AgentplaneCapabilityRegistry,
} from "./capabilities/index.js";
import {
  resolveExecutionProfileRuntime,
  type ResolvedExecutionProfileRuntime,
} from "./execution-profile/index.js";
import { buildFrameworkExplainPayload, type FrameworkExplainPayload } from "./explain/index.js";
import { resolveHarnessFromCommandContext, type ResolvedHarnessContract } from "./harness/index.js";
import { buildFrameworkProtocolSurface, type FrameworkProtocolSurface } from "./protocol/index.js";
import { createTaskIntakeRuntime, type TaskIntakeRuntime } from "./task-intake/index.js";

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

const READ_ONLY_CONTEXT_CACHE = new WeakMap<CommandContext, Promise<ReadOnlyExecutionContext>>();
const CONTEXT_CACHE = new WeakMap<CommandContext, Promise<ExecutionContext>>();

export async function resolveCommandContext(opts: {
  cwd: string;
  rootOverride?: string | null;
  resolvedProject?: ResolvedProject;
  config?: AgentplaneConfig;
}): Promise<CommandContext> {
  return await loadCommandContext({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    resolvedProject: opts.resolvedProject,
    config: opts.config,
  });
}

export async function resolveReadOnlyExecutionContext(opts: {
  cwd: string;
  rootOverride?: string | null;
  resolvedProject?: ResolvedProject;
  config?: AgentplaneConfig;
}): Promise<ReadOnlyExecutionContext> {
  const command = await resolveCommandContext(opts);
  return await makeReadOnlyExecutionContext(command);
}

export async function resolveExecutionContext(opts: {
  cwd: string;
  rootOverride?: string | null;
  resolvedProject?: ResolvedProject;
  config?: AgentplaneConfig;
}): Promise<ExecutionContext> {
  const command = await resolveCommandContext(opts);
  return await makeExecutionContext(command);
}

export async function makeReadOnlyExecutionContext(
  command: CommandContext,
): Promise<ReadOnlyExecutionContext> {
  let cached = READ_ONLY_CONTEXT_CACHE.get(command);
  if (!cached) {
    cached = buildReadOnlyExecutionContext(command);
    READ_ONLY_CONTEXT_CACHE.set(command, cached);
  }
  return await cached;
}

export async function makeExecutionContext(command: CommandContext): Promise<ExecutionContext> {
  let cached = CONTEXT_CACHE.get(command);
  if (!cached) {
    cached = buildExecutionContext(command);
    CONTEXT_CACHE.set(command, cached);
  }
  return await cached;
}

async function buildReadOnlyExecutionContext(
  command: CommandContext,
): Promise<ReadOnlyExecutionContext> {
  const harness = await resolveHarnessFromCommandContext(command);
  const policy = new PolicyEngine();
  const executionProfile = resolveExecutionProfileRuntime(command.config);
  const capabilities = resolveTaskBackendCapabilityRegistry({
    backend_id: command.backendId,
    capabilities: command.taskBackend.capabilities ?? null,
  });
  const taskIntake = createTaskIntakeRuntime({
    repo: {
      git_root: command.resolvedProject.gitRoot,
      agentplane_dir: command.resolvedProject.agentplaneDir,
      workflow_dir: command.config.paths.workflow_dir,
    },
    backend: {
      id: command.backendId,
      config_path: command.backendConfigPath,
      capabilities: command.taskBackend.capabilities ?? null,
      supports_generate_task_id: typeof command.taskBackend.generateTaskId === "function",
      supports_bulk_write: typeof command.taskBackend.writeTasks === "function",
    },
    harness,
    execution_profile: executionProfile,
    capabilities,
  });
  const frameworkExplain = buildFrameworkExplainPayload({
    harness,
    capabilities,
    execution_profile: executionProfile,
    task_intake: taskIntake,
  });
  return {
    command,
    project: command.resolvedProject,
    repo: {
      git_root: command.resolvedProject.gitRoot,
      agentplane_dir: command.resolvedProject.agentplaneDir,
      workflow_dir: command.config.paths.workflow_dir,
    },
    config: command.config,
    backend: {
      id: command.backendId,
      config_path: command.backendConfigPath,
      capabilities: command.taskBackend.capabilities ?? null,
      task_backend: command.taskBackend,
    },
    harness,
    capabilities,
    execution: harness.execution,
    executionProfile,
    taskIntake,
    frameworkExplain,
    frameworkProtocol: buildFrameworkProtocolSurface({ explain: frameworkExplain }),
    approvals: harness.policy.approvals,
    policy,
    approvalRuntime: createApprovalRuntime({ config: command.config, policy }),
  };
}

async function buildExecutionContext(command: CommandContext): Promise<ExecutionContext> {
  return {
    ...(await makeReadOnlyExecutionContext(command)),
    adapters: buildAdapters(command),
  };
}
