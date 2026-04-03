import type { AgentplaneConfig, ResolvedProject } from "@agentplaneorg/core";
import type { Adapters } from "../../adapters/index.js";
import { buildAdapters } from "../../adapters/index.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { PolicyEngine } from "../../policy/engine.js";
import {
  resolveHarnessFromCommandContext,
  type ResolvedHarnessContract,
} from "../../runtime/harness/index.js";

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

export type ReadOnlyUsecaseContext = {
  command: CommandContext;
  project: CommandContext["resolvedProject"];
  repo: AgentplaneRepositoryContext;
  config: CommandContext["config"];
  backend: AgentplaneBackendContext;
  harness: ResolvedHarnessContract;
  execution: ResolvedHarnessContract["execution"];
  approvals: ResolvedHarnessContract["policy"]["approvals"];
  policy: PolicyEngine;
};

export type UsecaseContext = ReadOnlyUsecaseContext & {
  adapters: Adapters;
};

export type AgentplaneReadOnlyExecutionContext = ReadOnlyUsecaseContext;

export type AgentplaneExecutionContext = UsecaseContext;

const READ_ONLY_CONTEXT_CACHE = new WeakMap<CommandContext, Promise<ReadOnlyUsecaseContext>>();
const USECASE_CONTEXT_CACHE = new WeakMap<CommandContext, Promise<UsecaseContext>>();

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

export async function resolveContext(opts: {
  cwd: string;
  rootOverride?: string | null;
  resolvedProject?: ResolvedProject;
  config?: AgentplaneConfig;
}): Promise<ReadOnlyUsecaseContext> {
  const command = await resolveCommandContext(opts);
  return await makeReadOnlyUsecaseContext(command);
}

export const resolveReadOnlyExecutionContext = resolveContext;

export async function resolveExecutionContext(opts: {
  cwd: string;
  rootOverride?: string | null;
  resolvedProject?: ResolvedProject;
  config?: AgentplaneConfig;
}): Promise<AgentplaneExecutionContext> {
  const command = await resolveCommandContext(opts);
  return await makeUsecaseContext(command);
}

export async function makeReadOnlyUsecaseContext(
  command: CommandContext,
): Promise<ReadOnlyUsecaseContext> {
  let cached = READ_ONLY_CONTEXT_CACHE.get(command);
  if (!cached) {
    cached = buildReadOnlyUsecaseContext(command);
    READ_ONLY_CONTEXT_CACHE.set(command, cached);
  }
  return await cached;
}

export async function makeUsecaseContext(command: CommandContext): Promise<UsecaseContext> {
  let cached = USECASE_CONTEXT_CACHE.get(command);
  if (!cached) {
    cached = buildUsecaseContext(command);
    USECASE_CONTEXT_CACHE.set(command, cached);
  }
  return await cached;
}

export const makeReadOnlyExecutionContext = makeReadOnlyUsecaseContext;

export const makeExecutionContext = makeUsecaseContext;

async function buildReadOnlyUsecaseContext(
  command: CommandContext,
): Promise<ReadOnlyUsecaseContext> {
  const harness = await resolveHarnessFromCommandContext(command);
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
    execution: harness.execution,
    approvals: harness.policy.approvals,
    policy: new PolicyEngine(),
  };
}

async function buildUsecaseContext(command: CommandContext): Promise<UsecaseContext> {
  return {
    ...(await makeReadOnlyUsecaseContext(command)),
    adapters: buildAdapters(command),
  };
}
