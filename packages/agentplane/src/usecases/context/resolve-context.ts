import type { Adapters } from "../../adapters/index.js";
import { buildAdapters } from "../../adapters/index.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { PolicyEngine } from "../../policy/engine.js";

export type UsecaseContext = {
  command: CommandContext;
  adapters: Adapters;
  policy: PolicyEngine;
};

export async function resolveContext(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<CommandContext> {
  return await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
}

export function makeUsecaseContext(command: CommandContext): UsecaseContext {
  return {
    command,
    adapters: buildAdapters(command),
    policy: new PolicyEngine(),
  };
}
