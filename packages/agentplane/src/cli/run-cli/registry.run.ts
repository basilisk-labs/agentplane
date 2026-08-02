import { CommandRegistry } from "../spec/registry.js";
import { helpSpec, makeHelpHandler } from "../spec/help.js";

import {
  createCommandSession,
  type CommandEntry,
  type CommandPreparationTrace,
  type CommandSessionResolvers,
} from "./command-catalog/kernel.js";

export function buildRegistry(opts: {
  getCtx: CommandSessionResolvers["getCtx"];
  getResolvedProject: CommandSessionResolvers["getResolvedProject"];
  getLoadedConfig: CommandSessionResolvers["getLoadedConfig"];
  getEvaluatorArtifactPort: CommandSessionResolvers["getEvaluatorArtifactPort"];
  getHelpJsonForDocs: CommandSessionResolvers["getHelpJsonForDocs"];
  onPreparationTrace?: (event: CommandPreparationTrace) => void;
  entries: readonly CommandEntry[];
}): CommandRegistry {
  const registry = new CommandRegistry();
  const resolvers: CommandSessionResolvers = {
    getCtx: opts.getCtx,
    getResolvedProject: opts.getResolvedProject,
    getLoadedConfig: opts.getLoadedConfig,
    getHelpJsonForDocs: opts.getHelpJsonForDocs,
    getEvaluatorArtifactPort: opts.getEvaluatorArtifactPort,
    onPreparationTrace: opts.onPreparationTrace,
  };
  for (const entry of opts.entries) {
    if (entry.selectSession) {
      registry.register(entry.spec, async (ctx, parsed) => {
        const selected = entry.selectSession?.(parsed);
        if (!selected) throw new Error("Conditional command did not select a session");
        const session = createCommandSession({
          command: entry.spec.id.join(" "),
          requirements: selected.requirements,
          resolvers,
        });
        const handler = await selected.load(session);
        return await handler(ctx, parsed);
      });
      continue;
    }
    registry.register(entry.spec, async (ctx, parsed) => {
      const session = createCommandSession({
        command: entry.spec.id.join(" "),
        requirements: entry.requirements,
        resolvers,
      });
      const handler = await entry.load(session);
      return await handler(ctx, parsed);
    });
  }
  registry.register(helpSpec, makeHelpHandler(registry));
  return registry;
}
