import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { resolveProject } from "@agentplaneorg/core/project";

import {
  findEntry,
  installBlueprint,
  loadCatalog,
  loadPackManifest,
  writeTrustConfig,
  type CatalogKind,
} from "../../../../commands/blueprints/catalog.js";
import { CliError } from "../../../../shared/errors.js";

const execFileAsync = promisify(execFile);

export type CachedBlueprintCatalogItem = {
  id: string;
  kind: CatalogKind;
  label: string;
};

type BlueprintRef = {
  id: string;
  kind?: CatalogKind;
};

function renderRef(item: CachedBlueprintCatalogItem): string {
  return `${item.kind}:${item.id}`;
}

function parseBlueprintRef(value: string): BlueprintRef {
  const trimmed = value.trim();
  if (trimmed.startsWith("blueprint:")) {
    return { kind: "blueprint", id: trimmed.slice("blueprint:".length).trim() };
  }
  if (trimmed.startsWith("pack:")) {
    return { kind: "pack", id: trimmed.slice("pack:".length).trim() };
  }
  return { id: trimmed };
}

export async function listCachedBlueprintCatalogItems(): Promise<CachedBlueprintCatalogItem[]> {
  try {
    const catalog = await loadCatalog({ cwd: process.cwd() });
    return [
      ...catalog.index.blueprints.map((entry) => ({
        id: entry.id,
        kind: "blueprint" as const,
        label: `blueprint:${entry.id}`,
      })),
      ...catalog.index.packs.map((entry) => ({
        id: entry.id,
        kind: "pack" as const,
        label: `pack:${entry.id}`,
      })),
    ];
  } catch (err) {
    if (err instanceof CliError && err.code === "E_USAGE") return [];
    throw err;
  }
}

function renderCachedBlueprintsHint(items: CachedBlueprintCatalogItem[]): string {
  if (items.length === 0) {
    return "Cached blueprint catalog: none. Run `agentplane blueprints catalog refresh --index <path|url>` before selecting blueprints during init.";
  }
  return `Cached blueprint catalog entries: ${items.map(renderRef).join(", ")}`;
}

async function gitStatusPaths(cwd: string): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["status", "--porcelain", "--untracked-files=all"],
    { cwd },
  );
  return stdout
    .split(/\r?\n/u)
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
}

export async function validateCachedBlueprintSelection(selection: string[]): Promise<void> {
  if (selection.length === 0) return;
  const catalog = await loadCatalog({ cwd: process.cwd() });
  const cached = [
    ...catalog.index.blueprints.map((entry) => ({
      id: entry.id,
      kind: "blueprint" as const,
      label: `blueprint:${entry.id}`,
    })),
    ...catalog.index.packs.map((entry) => ({
      id: entry.id,
      kind: "pack" as const,
      label: `pack:${entry.id}`,
    })),
  ];
  const missing = selection.filter((entry) => {
    const ref = parseBlueprintRef(entry);
    return !cached.some((item) => item.id === ref.id && (!ref.kind || item.kind === ref.kind));
  });
  if (missing.length === 0) return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: `Unknown cached blueprint catalog id(s): ${missing.join(", ")}. ${renderCachedBlueprintsHint(cached)}`,
  });
}

export async function maybeInstallCachedBlueprints(opts: {
  blueprints: string[];
  cwd: string;
  rootOverride?: string;
}): Promise<string[]> {
  if (opts.blueprints.length === 0) return [];

  const project = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const before = new Set(await gitStatusPaths(project.gitRoot));
  const catalog = await loadCatalog({ cwd: opts.cwd });
  const allowedIds: string[] = [];

  for (const value of opts.blueprints) {
    const ref = parseBlueprintRef(value);
    const found = findEntry(catalog.index, ref.id, ref.kind);
    if (found.kind === "blueprint") {
      const installed = await installBlueprint({
        projectRoot: project.gitRoot,
        catalogSource: catalog.source,
        entry: found.entry,
      });
      allowedIds.push(...installed.recommendedAllowedIds);
      continue;
    }

    const pack = await loadPackManifest({ catalogSource: catalog.source, entry: found.entry });
    for (const packEntry of pack.manifest.blueprints) {
      const blueprintEntry = findEntry(catalog.index, packEntry.id, "blueprint").entry;
      const installed = await installBlueprint({
        projectRoot: project.gitRoot,
        catalogSource: catalog.source,
        entry: blueprintEntry,
      });
      allowedIds.push(...installed.recommendedAllowedIds);
    }
  }

  if (allowedIds.length > 0) {
    await writeTrustConfig({ projectRoot: project.gitRoot, allowedIds });
  }

  const after = await gitStatusPaths(project.gitRoot);
  return after.filter((entry) => !before.has(entry));
}
