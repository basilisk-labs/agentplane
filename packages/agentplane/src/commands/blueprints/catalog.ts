import { mkdir, cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { extractArchive } from "../../cli/archive.js";
import { sha256File } from "../../cli/checksum.js";
import { downloadToFile, fetchText } from "../../cli/http.js";
import { validateProjectBlueprintFile } from "../../blueprints/index.js";
import { CliError, ValidationError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { getVersion } from "../../meta/version.js";
import { cacheBlueprintPackage, pickLatestVersion, resolvePackageRoot } from "./catalog-cache.js";
import {
  assertSafeCatalogPathSegment,
  parseBlueprintManifest,
  parseCatalogIndex,
  parseCatalogSource,
  parsePackManifest,
  type BlueprintCatalogIndex,
  type CatalogBlueprintManifest,
  type CatalogEntry,
  type CatalogKind,
  type CatalogPackManifest,
  type InstalledBlueprint,
} from "./catalog-model.js";

export type { CatalogBlueprintManifest, CatalogEntry, CatalogKind } from "./catalog-model.js";

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

export async function loadBlueprintManifest(opts: {
  catalogSource: string;
  entry: CatalogEntry;
}): Promise<{ manifest: CatalogBlueprintManifest; manifestSource: string }> {
  if (!opts.entry.path) {
    throw new ValidationError({
      message: `Blueprint ${opts.entry.id} is packaged; install it to inspect its full manifest.`,
    });
  }
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
  if (!opts.entry.path) {
    const pack = {
      schema_version: 1,
      id: opts.entry.id,
      version: opts.entry.version ?? "0.0.0",
      name: opts.entry.name ?? opts.entry.id,
      summary: opts.entry.summary ?? "",
      blueprints: opts.entry.blueprints ?? [],
      activation: opts.entry.activation,
    } satisfies CatalogPackManifest;
    return { manifest: parsePackManifest(pack), manifestSource: opts.catalogSource };
  }
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
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-blueprint-"));
  try {
    let manifestSource = "";
    let manifest: CatalogBlueprintManifest;
    if (opts.entry.path) {
      const loaded = await loadBlueprintManifest({
        catalogSource: opts.catalogSource,
        entry: opts.entry,
      });
      manifest = loaded.manifest;
      manifestSource = loaded.manifestSource;
    } else {
      const latest = pickLatestVersion(opts.entry, { agentplaneVersion: getVersion() });
      const archiveUrl = isHttpUrl(latest.url)
        ? latest.url
        : isHttpUrl(opts.catalogSource)
          ? new URL(latest.url, opts.catalogSource).toString()
          : path.resolve(path.dirname(opts.catalogSource), latest.url);
      const archiveName =
        path.basename(isHttpUrl(archiveUrl) ? new URL(archiveUrl).pathname : archiveUrl) ||
        "blueprint.tar.gz";
      const archivePath = path.join(tempRoot, archiveName);
      await (isHttpUrl(archiveUrl)
        ? downloadToFile(archiveUrl, archivePath)
        : cp(archiveUrl, archivePath));
      const actualSha = await sha256File(archivePath);
      if (actualSha !== latest.sha256) {
        throw new ValidationError({
          message: `Blueprint checksum mismatch for ${opts.entry.id}@${latest.version}`,
        });
      }
      await extractArchive({ archivePath, destDir: tempRoot });
      const packageRoot = await resolvePackageRoot(tempRoot);
      manifestSource = path.join(packageRoot, "blueprint.json");
      manifest = parseBlueprintManifest(
        JSON.parse(await readFile(manifestSource, "utf8")) as unknown,
      );
    }
    assertSafeCatalogPathSegment(manifest.definition.id, "Catalog blueprint definition.id");
    assertSafeCatalogPathSegment(manifest.id, "Catalog blueprint manifest id");
    const definitionSource = resolveNearSource(manifestSource, manifest.definition.path);
    const definitionText = await readText(definitionSource);
    const cachePath = await cacheBlueprintPackage({
      agentplaneHome: agentplaneHome(),
      manifest,
      manifestSource,
      definitionText,
    });
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
    return {
      catalogId: manifest.id,
      blueprintId: manifest.definition.id,
      projectPath: path.relative(opts.projectRoot, targetPath),
      cachePath,
      recommendedAllowedIds: manifest.activation?.recommended_allowed_ids ?? [
        manifest.definition.id,
      ],
    };
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}
