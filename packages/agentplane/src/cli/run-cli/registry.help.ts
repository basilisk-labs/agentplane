import { CommandRegistry } from "../spec/registry.js";
import { helpSpec, makeHelpHandler } from "../spec/help.js";

import { COMMANDS } from "./command-catalog.js";

const helpNoop = () => Promise.resolve(0);

export function buildHelpFastRegistry(): CommandRegistry {
  const registry = new CommandRegistry();
  for (const entry of COMMANDS) registry.register(entry.spec, helpNoop);
  registry.register(helpSpec, makeHelpHandler(registry));
  return registry;
}
