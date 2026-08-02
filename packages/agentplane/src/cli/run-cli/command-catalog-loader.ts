import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { setDirectSubcommandNamesLoader } from "../group-command.js";

import type { CommandEntry } from "./command-catalog/kernel.js";
import { getDirectChildCommandNamesFrom } from "./command-catalog-helpers.js";

type CatalogGroup = "core" | "core-fast" | "task" | "task-read" | "project" | "lifecycle";
type CatalogModule = Record<string, readonly CommandEntry[]>;

const CORE_ROOTS = new Set([
  "agents",
  "codex",
  "config",
  "demo",
  "doctor",
  "ide",
  "incidents",
  "init",
  "insights",
  "intake",
  "mode",
  "platform",
  "preflight",
  "profile",
  "quickstart",
  "release",
  "role",
  "runtime",
  "upgrade",
  "workflow",
]);
const PROJECT_ROOTS = new Set([
  "acr",
  "backend",
  "blueprint",
  "blueprints",
  "branch",
  "context",
  "evaluator",
  "evidence",
  "flow",
  "hermes",
  "integrate",
  "pr",
  "recipes",
  "sync",
  "work",
]);
const LIFECYCLE_ROOTS = new Set([
  "block",
  "cleanup",
  "commit",
  "docs",
  "finish",
  "guard",
  "hooks",
  "ready",
  "start",
  "verify",
]);

const catalogPaths: Record<CatalogGroup, string> = {
  core: "./command-catalog.js",
  "core-fast": "./command-catalog/core-fast.js",
  task: "./command-catalog.js",
  "task-read": "./command-catalog/task-read.js",
  project: "./command-catalog.js",
  lifecycle: "./command-catalog.js",
};
const catalogExports: Record<CatalogGroup, string> = {
  core: "COMMANDS",
  "core-fast": "CORE_FAST_COMMANDS",
  task: "COMMANDS",
  "task-read": "TASK_READ_COMMANDS",
  project: "COMMANDS",
  lifecycle: "COMMANDS",
};
const catalogCache = new Map<CatalogGroup, Promise<readonly CommandEntry[]>>();
let completeCatalogCache: readonly CommandEntry[] | null = null;

function loadSerializedHelpEntries(): readonly CommandEntry[] | null {
  const helpCatalogPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "command-help.json",
  );
  try {
    const parsed = JSON.parse(readFileSync(helpCatalogPath, "utf8")) as {
      schema_version?: unknown;
      entries?: {
        helpGroup?: string;
        invocation?: string;
        spec?: CommandEntry["spec"];
        surface?: CommandEntry["surface"];
      }[];
    };
    if (parsed.schema_version !== 1 || !Array.isArray(parsed.entries)) return null;
    return parsed.entries.map((entry) => {
      if (!entry.spec || !Array.isArray(entry.spec.id) || typeof entry.surface !== "string") {
        throw new Error("Invalid serialized AgentPlane help catalog entry");
      }
      return {
        spec: entry.spec,
        load: async () => {
          throw new Error("Serialized help catalog entries cannot execute commands");
        },
        requirements: [],
        preparationNodes: [],
        dispatch: { project: false, loadedConfig: false, taskContext: false },
        surface: entry.surface,
        helpGroup: entry.helpGroup,
        invocation: entry.invocation,
      } satisfies CommandEntry;
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function groupForRoot(root: string | undefined): CatalogGroup | null {
  if (root === "quickstart" || root === "preflight") return "core-fast";
  if (root && CORE_ROOTS.has(root)) return "core";
  if (root && PROJECT_ROOTS.has(root)) return "project";
  if (root && LIFECYCLE_ROOTS.has(root)) return "lifecycle";
  return null;
}

async function loadCatalogGroup(group: CatalogGroup): Promise<readonly CommandEntry[]> {
  let cached = catalogCache.get(group);
  if (!cached) {
    const embedded = (globalThis as Record<string, unknown>).__AGENTPLANE_COMMAND_CATALOGS__ as
      | Partial<Record<CatalogGroup, readonly CommandEntry[]>>
      | undefined;
    cached = embedded?.[group]
      ? Promise.resolve(embedded[group])
      : import(catalogPaths[group]).then((module: CatalogModule) => {
          const entries = module[catalogExports[group]];
          if (!Array.isArray(entries)) {
            throw new Error(`Invalid AgentPlane command catalog module: ${group}`);
          }
          return entries;
        });
    catalogCache.set(group, cached);
  }
  return await cached;
}

export async function loadCommandEntriesForTokens(
  tokens: readonly string[],
): Promise<readonly CommandEntry[]> {
  if (tokens[0] === "task") {
    return ["list", "search", "next"].includes(tokens[1] ?? "")
      ? await loadCatalogGroup("task-read")
      : await loadCatalogGroup("task");
  }
  const group = groupForRoot(tokens[0]);
  return group ? await loadCatalogGroup(group) : await loadAllCommandEntries();
}

export async function loadAllCommandEntries(): Promise<readonly CommandEntry[]> {
  if (completeCatalogCache) return completeCatalogCache;
  const embedded = (globalThis as Record<string, unknown>).__AGENTPLANE_COMMAND_CATALOGS__ as
    | Partial<Record<CatalogGroup, readonly CommandEntry[]>>
    | undefined;
  if (embedded?.core && embedded.task && embedded.project && embedded.lifecycle) {
    completeCatalogCache = [
      ...embedded.core,
      ...embedded.task,
      ...embedded.project,
      ...embedded.lifecycle,
    ];
    return completeCatalogCache;
  }
  const serialized = loadSerializedHelpEntries();
  if (serialized) {
    completeCatalogCache = serialized;
    return serialized;
  }
  const modulePath = "./command-catalog.js";
  const module = (await import(modulePath)) as { COMMANDS?: readonly CommandEntry[] };
  if (!Array.isArray(module.COMMANDS)) {
    throw new Error("Invalid AgentPlane complete command catalog module");
  }
  completeCatalogCache = module.COMMANDS;
  return completeCatalogCache;
}

setDirectSubcommandNamesLoader(async (prefix) => {
  const entries =
    prefix.length > 0 ? await loadCommandEntriesForTokens(prefix) : await loadAllCommandEntries();
  return getDirectChildCommandNamesFrom(entries, prefix);
});
