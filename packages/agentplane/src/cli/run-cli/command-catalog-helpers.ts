import { CommandGraph } from "../spec/registry.js";
import type { CommandId } from "../spec/spec.js";

import type { CommandEntry } from "./command-catalog/kernel.js";

export type CatalogMatch = { entry: CommandEntry; consumed: number };
export type HelpSurfaceMode = "user" | "framework" | "agent" | "all";

export function buildCatalogGraph(entries: readonly CommandEntry[]): CommandGraph<CommandEntry> {
  const graph = new CommandGraph<CommandEntry>((entry) => entry.spec.id);
  for (const entry of entries) graph.add(entry);
  return graph;
}

export function matchCommandEntries(
  entries: readonly CommandEntry[],
  tokens: readonly string[],
): CatalogMatch | null {
  const match = buildCatalogGraph(entries).match(tokens);
  return match ? { entry: match.value, consumed: match.consumed } : null;
}

export function findCommandEntryIn(
  entries: readonly CommandEntry[],
  id: CommandId,
): CommandEntry | null {
  return buildCatalogGraph(entries).lookup(id);
}

export function getDirectChildCommandEntriesFrom(
  entries: readonly CommandEntry[],
  parentId: CommandId = [],
): readonly CommandEntry[] {
  return buildCatalogGraph(entries).directChildren(parentId);
}

export function getDirectChildCommandNamesFrom(
  entries: readonly CommandEntry[],
  parentId: CommandId = [],
): readonly string[] {
  return buildCatalogGraph(entries).directChildSegments(parentId);
}

export function isCommandVisibleInHelp(entry: CommandEntry, mode: HelpSurfaceMode): boolean {
  if (mode === "all") return true;
  if (mode === "agent") return entry.surface !== "internal";
  if (entry.surface === "advanced" || entry.surface === "internal") return false;
  if (mode === "framework") return entry.surface === "user" || entry.surface === "framework";
  return entry.surface === "user";
}

export function makeHelpSpecForEntry(entry: CommandEntry): CommandEntry["spec"] {
  if (!entry.helpGroup) return entry.spec;
  return { ...entry.spec, group: entry.helpGroup };
}

export function getHelpCommandEntriesFrom(
  entries: readonly CommandEntry[],
  mode: HelpSurfaceMode,
): readonly CommandEntry[] {
  return entries.filter((entry) => isCommandVisibleInHelp(entry, mode));
}
