import type { AgentplaneConfig, ResolvedProject } from "@agentplaneorg/core";
import type { Adapters } from "../../adapters/index.js";
import { buildAdapters } from "../../adapters/index.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { PolicyEngine } from "../../policy/engine.js";

export type UsecaseContext = {
  command: CommandContext;
  adapters: Adapters;
  policy: PolicyEngine;
};

export type ReadOnlyUsecaseContext = Pick<UsecaseContext, "command">;

export async function resolveContext(opts: {
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

export function makeReadOnlyUsecaseContext(command: CommandContext): ReadOnlyUsecaseContext {
  return { command };
}

export function makeUsecaseContext(command: CommandContext): UsecaseContext {
  return {
    ...makeReadOnlyUsecaseContext(command),
    adapters: buildAdapters(command),
    policy: new PolicyEngine(),
  };
}
