import { CommandRegistry } from "../spec/registry.js";
import { helpSpec, makeHelpHandler } from "../spec/help.js";

import { makeHelpJsonFromSpecs } from "../../commands/docs/cli.command.js";
import { COMMANDS, type RunDeps } from "./command-catalog.js";

import type { CommandContext } from "../../commands/shared/task-backend.js";

export function buildRegistry(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandRegistry {
  const registry = new CommandRegistry();
  const getHelpJsonForDocs = () => makeHelpJsonFromSpecs(registry.list().map((e) => e.spec));
  const deps: RunDeps = { getCtx, getHelpJsonForDocs };
  for (const entry of COMMANDS) {
    let loaded: ReturnType<(typeof entry)["load"]> | null = null;
    registry.register(entry.spec, async (ctx, parsed) => {
      loaded ??= entry.load(deps);
      const handler = await loaded;
      return await handler(ctx, parsed);
    });
  }
  registry.register(helpSpec, makeHelpHandler(registry));
  return registry;
}
