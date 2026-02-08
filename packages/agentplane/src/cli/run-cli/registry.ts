import { CommandRegistry } from "../spec/registry.js";
import { helpSpec, makeHelpHandler } from "../spec/help.js";

import { makeHelpJsonFromSpecs } from "../../commands/docs/cli.command.js";
import { COMMANDS, type RunDeps } from "./command-catalog.js";

import type { CommandContext } from "../../commands/shared/task-backend.js";

const helpNoop = () => Promise.resolve(0);

export function buildHelpFastRegistry(): CommandRegistry {
  const registry = new CommandRegistry();
  for (const entry of COMMANDS) registry.register(entry.spec, helpNoop);
  registry.register(helpSpec, makeHelpHandler(registry));
  return registry;
}

export function buildRegistry(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandRegistry {
  const registry = new CommandRegistry();
  const getHelpJsonForDocs = () => makeHelpJsonFromSpecs(registry.list().map((e) => e.spec));
  const deps: RunDeps = { getCtx, getHelpJsonForDocs };
  for (const entry of COMMANDS) registry.register(entry.spec, entry.run(deps));
  registry.register(helpSpec, makeHelpHandler(registry));
  return registry;
}
