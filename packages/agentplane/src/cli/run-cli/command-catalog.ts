import { CommandGraph } from "../spec/registry.js";
import type { CommandId } from "../spec/spec.js";
import { setDirectSubcommandNamesLoader } from "../group-command.js";
import type { CommandEntry } from "./command-catalog/kernel.js";

import { CORE_COMMANDS } from "./command-catalog/core.js";
import { LIFECYCLE_COMMANDS } from "./command-catalog/lifecycle.js";
import { PROJECT_COMMANDS } from "./command-catalog/project.js";
import { TASK_COMMANDS } from "./command-catalog/task.js";

export type { CommandEntry, RunDeps } from "./command-catalog/kernel.js";

export const COMMANDS = [
  ...CORE_COMMANDS,
  ...TASK_COMMANDS,
  ...PROJECT_COMMANDS,
  ...LIFECYCLE_COMMANDS,
] as const satisfies readonly CommandEntry[];

export type CatalogMatch = { entry: (typeof COMMANDS)[number]; consumed: number };
export type HelpSurfaceMode = "user" | "framework" | "all";

function buildCatalogGraph(entries: readonly CommandEntry[]): CommandGraph<CommandEntry> {
  const graph = new CommandGraph<CommandEntry>((entry) => entry.spec.id);
  for (const entry of entries) {
    graph.add(entry);
  }
  return graph;
}

const CATALOG_GRAPH = buildCatalogGraph(COMMANDS);

export function matchCommandCatalog(tokens: readonly string[]): CatalogMatch | null {
  const match = CATALOG_GRAPH.match(tokens);
  return match ? { entry: match.value, consumed: match.consumed } : null;
}

export function findCommandEntry(id: CommandId): CommandEntry | null {
  return CATALOG_GRAPH.lookup(id);
}

export function getDirectChildCommandEntries(parentId: CommandId = []): readonly CommandEntry[] {
  return CATALOG_GRAPH.directChildren(parentId);
}

export function getDirectChildCommandNames(parentId: CommandId = []): readonly string[] {
  return CATALOG_GRAPH.directChildSegments(parentId);
}

setDirectSubcommandNamesLoader((prefix) => Promise.resolve(getDirectChildCommandNames(prefix)));

export function getCommandInvocation(id: CommandId): string {
  const entry = findCommandEntry(id);
  if (!entry) {
    throw new Error(`Unknown command id: ${id.join(" ")}`);
  }
  return entry.invocation ?? `agentplane ${entry.spec.id.join(" ")}`;
}

export function isCommandVisibleInHelp(entry: CommandEntry, mode: HelpSurfaceMode): boolean {
  if (mode === "all") return true;
  if (entry.surface === "advanced" || entry.surface === "internal") return false;
  if (mode === "framework") return entry.surface === "user" || entry.surface === "framework";
  return entry.surface === "user";
}

export function makeHelpSpecForEntry(entry: CommandEntry): CommandEntry["spec"] {
  if (!entry.helpGroup) return entry.spec;
  return { ...entry.spec, group: entry.helpGroup };
}

export function getHelpCommandEntries(mode: HelpSurfaceMode): readonly CommandEntry[] {
  return COMMANDS.filter((entry) => isCommandVisibleInHelp(entry, mode));
}
