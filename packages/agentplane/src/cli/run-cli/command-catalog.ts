import type { CommandId } from "../spec/spec.js";
import type { CommandEntry } from "./command-catalog/shared.js";

import { CORE_COMMANDS } from "./command-catalog/core.js";
import { LIFECYCLE_COMMANDS } from "./command-catalog/lifecycle.js";
import { PROJECT_COMMANDS } from "./command-catalog/project.js";
import { TASK_COMMANDS } from "./command-catalog/task.js";

export type { CommandEntry, RunDeps } from "./command-catalog/shared.js";

export const COMMANDS = [
  ...CORE_COMMANDS,
  ...TASK_COMMANDS,
  ...PROJECT_COMMANDS,
  ...LIFECYCLE_COMMANDS,
] as const satisfies readonly CommandEntry[];

export type CatalogMatch = { entry: (typeof COMMANDS)[number]; consumed: number };

export function matchCommandCatalog(tokens: readonly string[]): CatalogMatch | null {
  let best: CatalogMatch | null = null;
  for (const entry of COMMANDS) {
    const id = entry.spec.id;
    if (tokens.length < id.length) continue;
    let ok = true;
    for (const [i, seg] of id.entries()) {
      if (tokens[i] !== seg) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (!best || id.length > best.consumed) {
      best = { entry, consumed: id.length };
    }
  }
  return best;
}

export function findCommandEntry(id: CommandId): CommandEntry | null {
  return (
    COMMANDS.find(
      (entry) =>
        entry.spec.id.length === id.length && entry.spec.id.every((seg, i) => seg === id[i]),
    ) ?? null
  );
}

export function getCommandInvocation(id: CommandId): string {
  const entry = findCommandEntry(id);
  if (!entry) {
    throw new Error(`Unknown command id: ${id.join(" ")}`);
  }
  return entry.invocation ?? `agentplane ${entry.spec.id.join(" ")}`;
}
