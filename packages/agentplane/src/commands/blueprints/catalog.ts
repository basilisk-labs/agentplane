import { mkdir, cp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { fetchText } from "../../cli/http.js";
import { validateProjectBlueprintFile } from "../../blueprints/index.js";
import { CliError, ValidationError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";

export type CatalogKind = "blueprint" | "pack";

export type CatalogEntry = {
  id: string;
  path: string;
};

export type BlueprintCatalogIndex = {
  schema_version: 1;
  catalog_id: string;
  name: string;
  description?: string;
  blueprints: CatalogEntry[];
  packs: CatalogEntry[];
};

type BlueprintCatalogSource = {
  schema_version: 1;
  source: string;
};

export type CatalogBlueprintManifest = {
  schema_version: 1;
  id: string;
  version: string;
  name: string;
  summary: string;
  definition: {
    id: string;
    path: string;
  };
  activation?: {
    recommended_allowed_ids?: string[];
  };
};

export type CatalogPackManifest = {
  schema_version: 1;
  id: string;
  version: string;
  name: string;
  summary: string;
  blueprints: {
    id: string;
    version?: string;
    required?: boolean;
  }[];
  activation?: {
    recommended_allowed_ids?: string[];
  };
};

export type InstalledBlueprint = {
  catalogId: string;
  blueprintId: string;
  projectPath: string;
  recommendedAllowedIds: string[];
};

function agentplaneHome(): string {
  const configuredHome = process.env.AGENTPLANE_HOME?.trim();
  if (configuredHome === "") return path.join(os.homedir(), ".agentplane");
  return configuredHome ?? path.join(os.homedir(), ".agentplane");
}

function blueprintsHomeDir(): string {
  return path.join(agentplaneHome(), "blueprints");
}

export function cachedIndexPath(): string {
  return path.join(blueprintsHomeDir(), "index.json");
}

function cachedIndexSourcePath(): string {
  return path.join(blueprintsHomeDir(), "index-source.json");
}

function isHttpUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

function normalizeIndexSource(source: string, cwd: string): string {
  return isHttpUrl(source) ? source : path.resolve(cwd, source);
}

function resolveNearSource(source: string, relativePath: string): string {
  if (isHttpUrl(source)) return new URL(relativePath, source).toString();
  return path.resolve(path.dirname(source), relativePath);
}

function catalogRootForIndexSource(source: string): string {
  if (isHttpUrl(source)) {
    const url = new URL(source);
    if (url.pathname.endsWith("/catalog/index.json")) return new URL("../", url).toString();
    return new URL("./", url).toString();
  }
  const indexDir = path.dirname(source);
  if (path.basename(source) === "index.json" && path.basename(indexDir) === "catalog") {
    return path.dirname(indexDir);
  }
  return indexDir;
}

function resolveCatalogEntrySource(indexSource: string, relativePath: string): string {
  const catalogRoot = catalogRootForIndexSource(indexSource);
  if (isHttpUrl(catalogRoot)) return new URL(relativePath, catalogRoot).toString();
  return path.resolve(catalogRoot, relativePath);
}

async function readText(source: string): Promise<string> {
  if (isHttpUrl(source)) return await fetchText(source);
  return await readFile(source, "utf8");
}

function parseCatalogEntry(raw: unknown, field: string): CatalogEntry {
  if (!isRecord(raw)) throw new ValidationError({ message: `${field} entry must be an object.` });
  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  const entryPath = typeof raw.path === "string" ? raw.path.trim() : "";
  if (!id || !entryPath) {
    throw new ValidationError({ message: `${field} entry must contain id and path.` });
  }
  return { id, path: entryPath };
}

function parseCatalogIndex(raw: unknown): BlueprintCatalogIndex {
  if (!isRecord(raw)) {
    throw new ValidationError({ message: "Blueprint catalog index must be an object." });
  }
  if (raw.schema_version !== 1) {
    throw new ValidationError({ message: "Blueprint catalog index schema_version must be 1." });
  }
  const catalogId = typeof raw.catalog_id === "string" ? raw.catalog_id.trim() : "";
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!catalogId || !name) {
    throw new ValidationError({
      message: "Blueprint catalog index must contain catalog_id and name.",
    });
  }
  if (!Array.isArray(raw.blueprints)) {
    throw new ValidationError({ message: "Blueprint catalog index blueprints must be an array." });
  }
  if (!Array.isArray(raw.packs)) {
    throw new ValidationError({ message: "Blueprint catalog index packs must be an array." });
  }
  return {
    schema_version: 1,
    catalog_id: catalogId,
    name,
    description: typeof raw.description === "string" ? raw.description : undefined,
    blueprints: raw.blueprints.map((entry) => parseCatalogEntry(entry, "blueprints")),
    packs: raw.packs.map((entry) => parseCatalogEntry(entry, "packs")),
  };
}

function parseCatalogSource(raw: unknown): BlueprintCatalogSource {
  if (!isRecord(raw) || raw.schema_version !== 1 || typeof raw.source !== "string") {
    throw new ValidationError({ message: "Blueprint catalog cache source is invalid." });
  }
  return { schema_version: 1, source: raw.source };
}

function assertSafeCatalogPathSegment(value: string, label: string): void {
  if (
    !value ||
    value === "." ||
    value === ".." ||
    value.includes("..") ||
    value.includes("/") ||
    value.includes("\\")
  ) {
    throw new ValidationError({
      message: `${label} must be a safe path segment.`,
      context: { value },
    });
  }
}

async function loadCachedCatalog(): Promise<{ index: BlueprintCatalogIndex; source: string }> {
  const [indexText, sourceText] = await Promise.all([
    readFile(cachedIndexPath(), "utf8"),
    readFile(cachedIndexSourcePath(), "utf8"),
  ]);
  return {
    index: parseCatalogIndex(JSON.parse(indexText) as unknown),
    source: parseCatalogSource(JSON.parse(sourceText) as unknown).source,
  };
}

export async function refreshCatalog(opts: {
  cwd: string;
  source: string;
}): Promise<{ index: BlueprintCatalogIndex; source: string }> {
  const source = normalizeIndexSource(opts.source, opts.cwd);
  const index = parseCatalogIndex(JSON.parse(await readText(source)) as unknown);
  await mkdir(blueprintsHomeDir(), { recursive: true });
  await writeJsonStableIfChanged(cachedIndexPath(), index);
  await writeJsonStableIfChanged(cachedIndexSourcePath(), { schema_version: 1, source });
  return { index, source };
}

export async function loadCatalog(opts: {
  cwd: string;
  index?: string;
  refresh?: boolean;
}): Promise<{ index: BlueprintCatalogIndex; source: string }> {
  if (opts.index) return await refreshCatalog({ cwd: opts.cwd, source: opts.index });
  if (opts.refresh) {
    const cached = await loadCachedCatalog();
    return await refreshCatalog({ cwd: opts.cwd, source: cached.source });
  }
  try {
    return await loadCachedCatalog();
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "No cached blueprint catalog found. Run `agentplane blueprints catalog refresh --index <path|url>` first.",
      });
    }
    throw err;
  }
}

export function findEntry(
  index: BlueprintCatalogIndex,
  id: string,
  kind?: CatalogKind,
): {
  kind: CatalogKind;
  entry: CatalogEntry;
} {
  const blueprint = index.blueprints.find((entry) => entry.id === id);
  const pack = index.packs.find((entry) => entry.id === id);
  if (kind === "blueprint") {
    if (!blueprint) throw new ValidationError({ message: `Unknown blueprint catalog id: ${id}` });
    return { kind, entry: blueprint };
  }
  if (kind === "pack") {
    if (!pack) throw new ValidationError({ message: `Unknown blueprint pack id: ${id}` });
    return { kind, entry: pack };
  }
  if (blueprint && pack) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Catalog id is ambiguous: ${id}. Use --kind blueprint or --kind pack.`,
    });
  }
  if (blueprint) return { kind: "blueprint", entry: blueprint };
  if (pack) return { kind: "pack", entry: pack };
  throw new ValidationError({ message: `Unknown blueprint catalog id: ${id}` });
}

function parseBlueprintManifest(raw: unknown): CatalogBlueprintManifest {
  if (!isRecord(raw) || raw.schema_version !== 1) {
    throw new ValidationError({ message: "Catalog blueprint manifest schema_version must be 1." });
  }
  const definition = isRecord(raw.definition) ? raw.definition : {};
  const manifest = {
    schema_version: 1,
    id: typeof raw.id === "string" ? raw.id.trim() : "",
    version: typeof raw.version === "string" ? raw.version.trim() : "",
    name: typeof raw.name === "string" ? raw.name.trim() : "",
    summary: typeof raw.summary === "string" ? raw.summary.trim() : "",
    definition: {
      id: typeof definition.id === "string" ? definition.id.trim() : "",
      path: typeof definition.path === "string" ? definition.path.trim() : "",
    },
    activation: isRecord(raw.activation)
      ? {
          recommended_allowed_ids: Array.isArray(raw.activation.recommended_allowed_ids)
            ? raw.activation.recommended_allowed_ids.filter(
                (id): id is string => typeof id === "string",
              )
            : undefined,
        }
      : undefined,
  } satisfies CatalogBlueprintManifest;
  if (!manifest.id || !manifest.version || !manifest.definition.id || !manifest.definition.path) {
    throw new ValidationError({
      message:
        "Catalog blueprint manifest must contain id, version, definition.id, and definition.path.",
    });
  }
  return manifest;
}

function parsePackManifest(raw: unknown): CatalogPackManifest {
  if (!isRecord(raw) || raw.schema_version !== 1) {
    throw new ValidationError({ message: "Blueprint pack manifest schema_version must be 1." });
  }
  if (!Array.isArray(raw.blueprints)) {
    throw new ValidationError({ message: "Blueprint pack manifest blueprints must be an array." });
  }
  const pack: CatalogPackManifest = {
    schema_version: 1,
    id: typeof raw.id === "string" ? raw.id.trim() : "",
    version: typeof raw.version === "string" ? raw.version.trim() : "",
    name: typeof raw.name === "string" ? raw.name.trim() : "",
    summary: typeof raw.summary === "string" ? raw.summary.trim() : "",
    blueprints: raw.blueprints.map((entry) => {
      if (!isRecord(entry) || typeof entry.id !== "string" || !entry.id.trim()) {
        throw new ValidationError({ message: "Blueprint pack entries must contain id." });
      }
      return {
        id: entry.id.trim(),
        version: typeof entry.version === "string" ? entry.version.trim() : undefined,
        required: entry.required === true,
      };
    }),
    activation: isRecord(raw.activation)
      ? {
          recommended_allowed_ids: Array.isArray(raw.activation.recommended_allowed_ids)
            ? raw.activation.recommended_allowed_ids.filter(
                (id): id is string => typeof id === "string",
              )
            : undefined,
        }
      : undefined,
  };
  if (!pack.id || !pack.version) {
    throw new ValidationError({ message: "Blueprint pack manifest must contain id and version." });
  }
  return pack;
}

export async function loadBlueprintManifest(opts: {
  catalogSource: string;
  entry: CatalogEntry;
}): Promise<{ manifest: CatalogBlueprintManifest; manifestSource: string }> {
  const manifestSource = resolveCatalogEntrySource(opts.catalogSource, opts.entry.path);
  return {
    manifest: parseBlueprintManifest(JSON.parse(await readText(manifestSource)) as unknown),
    manifestSource,
  };
}

export async function loadPackManifest(opts: {
  catalogSource: string;
  entry: CatalogEntry;
}): Promise<{ manifest: CatalogPackManifest; manifestSource: string }> {
  const manifestSource = resolveCatalogEntrySource(opts.catalogSource, opts.entry.path);
  return {
    manifest: parsePackManifest(JSON.parse(await readText(manifestSource)) as unknown),
    manifestSource,
  };
}

export async function writeTrustConfig(opts: {
  projectRoot: string;
  allowedIds: readonly string[];
}): Promise<void> {
  const configPath = path.join(opts.projectRoot, ".agentplane", "blueprints", "config.json");
  let existingAllowed: string[] = [];
  try {
    const raw = JSON.parse(await readFile(configPath, "utf8")) as unknown;
    if (isRecord(raw) && Array.isArray(raw.allowed_ids)) {
      existingAllowed = raw.allowed_ids.filter((id): id is string => typeof id === "string");
    }
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT") throw err;
  }
  const allowed = [...new Set([...existingAllowed, ...opts.allowedIds])].toSorted();
  await mkdir(path.dirname(configPath), { recursive: true });
  await writeJsonStableIfChanged(configPath, {
    schema_version: 1,
    trust_model: "explicit_allowlist",
    enabled: true,
    allowed_ids: allowed,
    selection: "explicit_only",
  });
}

export async function installBlueprint(opts: {
  projectRoot: string;
  catalogSource: string;
  entry: CatalogEntry;
}): Promise<InstalledBlueprint> {
  const { manifest, manifestSource } = await loadBlueprintManifest({
    catalogSource: opts.catalogSource,
    entry: opts.entry,
  });
  assertSafeCatalogPathSegment(manifest.definition.id, "Catalog blueprint definition.id");
  if (!isHttpUrl(manifestSource)) {
    assertSafeCatalogPathSegment(manifest.id, "Catalog blueprint manifest id");
  }
  const definitionSource = resolveNearSource(manifestSource, manifest.definition.path);
  const definitionText = await readText(definitionSource);
  const targetDir = path.join(opts.projectRoot, ".agentplane", "blueprints");
  const targetPath = path.join(targetDir, `${manifest.definition.id}.json`);
  await mkdir(targetDir, { recursive: true });
  await writeFile(targetPath, definitionText, "utf8");
  const validation = await validateProjectBlueprintFile(targetPath);
  if (!validation.ok) {
    throw new ValidationError({
      message: `Installed blueprint definition is invalid: ${validation.errors
        .map((error) => `${error.code}: ${error.message}`)
        .join("; ")}`,
      context: { path: targetPath },
    });
  }
  if (!isHttpUrl(manifestSource)) {
    const packageRoot = path.dirname(manifestSource);
    const catalogTarget = path.join(
      opts.projectRoot,
      ".agentplane",
      "blueprint-catalog",
      manifest.id,
    );
    await rm(catalogTarget, { recursive: true, force: true });
    await mkdir(path.dirname(catalogTarget), { recursive: true });
    await cp(packageRoot, catalogTarget, { recursive: true });
  }
  return {
    catalogId: manifest.id,
    blueprintId: manifest.definition.id,
    projectPath: path.relative(opts.projectRoot, targetPath),
    recommendedAllowedIds: manifest.activation?.recommended_allowed_ids ?? [manifest.definition.id],
  };
}
