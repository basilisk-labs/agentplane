import type { CommandId } from "../spec/spec.js";
import { setDirectSubcommandNamesLoader } from "../group-command.js";
import type { CommandEntry } from "./command-catalog/kernel.js";
import {
  buildCatalogGraph,
  getDirectChildCommandEntriesFrom,
  getDirectChildCommandNamesFrom,
  getHelpCommandEntriesFrom,
  isCommandVisibleInHelp,
  makeHelpSpecForEntry,
  type CatalogMatch,
  type HelpSurfaceMode,
} from "./command-catalog-helpers.js";

import { CORE_COMMANDS } from "./command-catalog/core.js";
import { LIFECYCLE_COMMANDS } from "./command-catalog/lifecycle.js";
import { PROJECT_COMMANDS } from "./command-catalog/project.js";
import { TASK_COMMANDS } from "./command-catalog/task.js";

export type { CommandEntry } from "./command-catalog/kernel.js";
export type { CatalogMatch, HelpSurfaceMode } from "./command-catalog-helpers.js";
export { isCommandVisibleInHelp, makeHelpSpecForEntry } from "./command-catalog-helpers.js";

export const COMMANDS = [
  ...CORE_COMMANDS,
  ...TASK_COMMANDS,
  ...PROJECT_COMMANDS,
  ...LIFECYCLE_COMMANDS,
] as const satisfies readonly CommandEntry[];

const CATALOG_GRAPH = buildCatalogGraph(COMMANDS);

export function matchCommandCatalog(tokens: readonly string[]): CatalogMatch | null {
  const match = CATALOG_GRAPH.match(tokens);
  return match ? { entry: match.value, consumed: match.consumed } : null;
}

export function findCommandEntry(id: CommandId): CommandEntry | null {
  return CATALOG_GRAPH.lookup(id);
}

export function getDirectChildCommandEntries(parentId: CommandId = []): readonly CommandEntry[] {
  return getDirectChildCommandEntriesFrom(COMMANDS, parentId);
}

export function getDirectChildCommandNames(parentId: CommandId = []): readonly string[] {
  return getDirectChildCommandNamesFrom(COMMANDS, parentId);
}

setDirectSubcommandNamesLoader((prefix) => Promise.resolve(getDirectChildCommandNames(prefix)));

export function getCommandInvocation(id: CommandId): string {
  const entry = findCommandEntry(id);
  if (!entry) {
    throw new Error(`Unknown command id: ${id.join(" ")}`);
  }
  return entry.invocation ?? `agentplane ${entry.spec.id.join(" ")}`;
}

export function getHelpCommandEntries(mode: HelpSurfaceMode): readonly CommandEntry[] {
  return getHelpCommandEntriesFrom(COMMANDS, mode);
}
