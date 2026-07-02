/* eslint-disable unicorn/no-array-sort */
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import {
  collectMatchingFiles,
  fileExists,
  parseJsonlLines,
  readText,
  toPosix,
} from "./context-utils.js";

type JsonRow = { id?: string; [key: string]: unknown };

const TARGET = "maximum-assimilation-v2";
const TOPOLOGY_PLAN = ".agentplane/context/derived/wiki/topology.plan.json";
const PAGE_MANIFESTS = ".agentplane/context/derived/wiki/page-manifests.jsonl";
const PAGE_CREATION = ".agentplane/context/derived/ontology/page-creation.jsonl";
const ENTITY_RESOLUTION = ".agentplane/context/derived/ontology/entity-resolution.jsonl";
const FACTS = ".agentplane/context/derived/facts/facts.jsonl";
const GRAPH_ENTITIES = ".agentplane/context/derived/graph/entities.jsonl";
const GRAPH_EDGES = ".agentplane/context/derived/graph/edges.jsonl";

type ContextMigrateParsed = {
  target: string;
  dryRun: boolean;
};

type MigrationPlan = {
  root: string;
  generatedAt: string;
  wikiPages: string[];
  facts: JsonRow[];
  graphEntities: JsonRow[];
  graphEdges: JsonRow[];
  topologyPlan: JsonRow;
  pageRows: JsonRow[];
  pageManifestRows: JsonRow[];
  entityRows: JsonRow[];
  writes: string[];
};

function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\.mdx?$/u, "")
    .replaceAll(/[^a-z0-9]+/gu, ".")
    .replaceAll(/^\.|\.$/gu, "");
}

function sourceRef(pathValue: string): string {
  return `${pathValue}#section=legacy-migration`;
}

function spanRef(pathValue: string): string {
  return `legacy.${slug(pathValue) || "context"}`;
}

function isMigratableWikiPage(rel: string): boolean {
  if (!rel.endsWith(".md") && !rel.endsWith(".mdx")) return false;
  if (path.basename(rel) === "AGENTS.md") return false;
  if (rel === "context/wiki/index.md" || rel === "context/wiki/glossary.md") return false;
  if (rel.includes("/reports/")) return false;
  return rel.startsWith("context/wiki/");
}

function familyForWikiPage(rel: string): {
  familyId: string;
  pageType: string;
  pathTemplate: string;
} {
  const rest = rel.replace(/^context\/wiki\//u, "");
  const parts = rest.split("/");
  if (parts.length <= 1) {
    return {
      familyId: "family.root",
      pageType: "legacy_root",
      pathTemplate: "context/wiki/{slug}.md",
    };
  }
  const dir = parts[0] ?? "root";
  const dirSlug = slug(dir).replaceAll(".", "_") || "root";
  return {
    familyId: `family.${dirSlug}`,
    pageType: `legacy_${dirSlug}`,
    pathTemplate: `context/wiki/${dir}/{slug}.md`,
  };
}

function buildTopologyPlan(opts: {
  wikiPages: string[];
  factsCount: number;
  graphEntitiesCount: number;
  graphEdgesCount: number;
  generatedAt: string;
}): JsonRow {
  const familiesById = new Map<string, ReturnType<typeof familyForWikiPage>>();
  const pages = opts.wikiPages.length > 0 ? opts.wikiPages : ["context/wiki/legacy.md"];
  for (const rel of pages) {
    const family = familyForWikiPage(rel);
    familiesById.set(family.familyId, family);
  }
  const canonicalPageFamilies = [...familiesById.values()]
    .sort((a, b) => a.familyId.localeCompare(b.familyId))
    .map((family) => ({
      family_id: family.familyId,
      path_template: family.pathTemplate,
      page_type: family.pageType,
      source_evidence_span_ids: ["legacy.context_wiki"],
    }));
  return {
    schema_version: 1,
    mode: "maximum_assimilation",
    source_shape: {
      primary: "legacy_context_workspace",
      rationale:
        "Generated from existing context/wiki paths during maximum-assimilation v2 migration.",
      evidence_span_ids: ["legacy.context_wiki"],
    },
    canonical_page_families: canonicalPageFamilies,
    migration: {
      generated_by: "context.migrate.maximum-assimilation-v2",
      generated_at: opts.generatedAt,
      preserve_existing: true,
      legacy_artifacts: {
        wiki_pages: opts.wikiPages.length,
        facts_rows: opts.factsCount,
        graph_entities: opts.graphEntitiesCount,
        graph_edges: opts.graphEdgesCount,
      },
      coverage_policy:
        "Legacy raw source span coverage is unresolved until re-verified under maximum-assimilation v2.",
    },
  };
}

function buildPageRow(rel: string): JsonRow {
  const family = familyForWikiPage(rel);
  return {
    schema_version: 1,
    id: `page.${slug(rel)}`,
    path: rel,
    page_type: family.pageType,
    family_id: family.familyId,
    source_refs: [sourceRef(rel)],
    span_refs: [spanRef(rel)],
    decision: "preserve_existing_page",
    summary: "Existing wiki page preserved during maximum-assimilation v2 migration.",
    status: "accepted",
    migration_status: "legacy_unverified",
  };
}

function buildPageManifestRow(rel: string): JsonRow {
  const family = familyForWikiPage(rel);
  return {
    schema_version: 1,
    id: `manifest.${slug(rel)}`,
    path: rel,
    page_type: family.pageType,
    family_id: family.familyId,
    source_refs: [sourceRef(rel)],
    span_refs: [spanRef(rel)],
    status: "legacy_preserved",
    generated_by: "context.migrate.maximum-assimilation-v2",
  };
}

function labelForEntity(row: JsonRow): string {
  const nested = row.entity;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    const label = (nested as Record<string, unknown>).label;
    if (typeof label === "string" && label.trim()) return label.trim();
  }
  if (typeof row.label === "string" && row.label.trim()) return row.label.trim();
  if (typeof row.name === "string" && row.name.trim()) return row.name.trim();
  return typeof row.id === "string" ? row.id : "legacy entity";
}

function buildEntityResolutionRow(row: JsonRow): JsonRow | null {
  const entityId = typeof row.id === "string" && row.id.trim() ? row.id.trim() : "";
  if (!entityId) return null;
  return {
    schema_version: 1,
    id: `resolution.${slug(entityId)}`,
    source_term: labelForEntity(row),
    resolution: "canonical_entity",
    canonical_entity_id: entityId,
    source_refs: [sourceRef(GRAPH_ENTITIES)],
    span_refs: [`legacy.entity.${slug(entityId)}`],
    summary: "Existing graph entity preserved during maximum-assimilation v2 migration.",
    status: "accepted",
    migration_status: "legacy_unverified",
  };
}

async function collectWikiPages(root: string): Promise<string[]> {
  if (!(await fileExists(path.join(root, "context/wiki")))) return [];
  const files = await collectMatchingFiles(root, "context/wiki");
  return files.filter((rel) => isMigratableWikiPage(rel)).sort((a, b) => a.localeCompare(b));
}

async function loadJsonl(root: string, rel: string): Promise<JsonRow[]> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return [];
  return parseJsonlLines(await readText(abs)) as JsonRow[];
}

async function loadExistingText(root: string, rel: string): Promise<string> {
  const abs = path.join(root, rel);
  return (await fileExists(abs)) ? await readFile(abs, "utf8") : "";
}

function jsonl(rows: JsonRow[]): string {
  return rows.map((row) => JSON.stringify(row)).join("\n") + (rows.length > 0 ? "\n" : "");
}

async function appendJsonlRows(root: string, rel: string, rows: JsonRow[]): Promise<boolean> {
  if (rows.length === 0) return false;
  const abs = path.join(root, rel);
  await mkdir(path.dirname(abs), { recursive: true });
  const existing = await loadExistingText(root, rel);
  const prefix = existing && !existing.endsWith("\n") ? "\n" : "";
  await appendFile(abs, `${prefix}${jsonl(rows)}`, "utf8");
  return true;
}

async function writeJsonIfMissing(root: string, rel: string, value: JsonRow): Promise<boolean> {
  const abs = path.join(root, rel);
  if (await fileExists(abs)) return false;
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  return true;
}

function existingPagePaths(rows: JsonRow[]): Set<string> {
  return new Set(
    rows
      .map((row) => (typeof row.path === "string" ? row.path : row.target_path))
      .filter((value): value is string => typeof value === "string" && value.length > 0),
  );
}

function existingResolvedEntityIds(rows: JsonRow[]): Set<string> {
  return new Set(
    rows
      .flatMap((row) => [row.canonical_entity_id, row.proposed_entity_id, row.entity_id, row.id])
      .filter((value): value is string => typeof value === "string" && value.length > 0),
  );
}

async function buildMigrationPlan(root: string): Promise<MigrationPlan> {
  const generatedAt = new Date().toISOString();
  const wikiPages = await collectWikiPages(root);
  const facts = await loadJsonl(root, FACTS);
  const graphEntities = await loadJsonl(root, GRAPH_ENTITIES);
  const graphEdges = await loadJsonl(root, GRAPH_EDGES);
  const topologyPlan = buildTopologyPlan({
    wikiPages,
    factsCount: facts.length,
    graphEntitiesCount: graphEntities.length,
    graphEdgesCount: graphEdges.length,
    generatedAt,
  });

  const existingPageCreationPaths = existingPagePaths(await loadJsonl(root, PAGE_CREATION));
  const existingPageManifestPaths = existingPagePaths(await loadJsonl(root, PAGE_MANIFESTS));
  const existingEntityResolutionIds = existingResolvedEntityIds(
    await loadJsonl(root, ENTITY_RESOLUTION),
  );

  const pageRows = wikiPages
    .filter((rel) => !existingPageCreationPaths.has(rel))
    .map((rel) => buildPageRow(rel));
  const pageManifestRows = wikiPages
    .filter((rel) => !existingPageManifestPaths.has(rel))
    .map((rel) => buildPageManifestRow(rel));
  const entityRows = graphEntities
    .filter((row) => typeof row.id === "string" && !existingEntityResolutionIds.has(row.id))
    .map((row) => buildEntityResolutionRow(row))
    .filter((row): row is JsonRow => row !== null);

  const writes: string[] = [];
  if (!(await fileExists(path.join(root, TOPOLOGY_PLAN)))) writes.push(TOPOLOGY_PLAN);
  if (pageRows.length > 0) writes.push(PAGE_CREATION);
  if (pageManifestRows.length > 0) writes.push(PAGE_MANIFESTS);
  if (entityRows.length > 0) writes.push(ENTITY_RESOLUTION);

  return {
    root,
    generatedAt,
    wikiPages,
    facts,
    graphEntities,
    graphEdges,
    topologyPlan,
    pageRows,
    pageManifestRows,
    entityRows,
    writes,
  };
}

async function applyMigrationPlan(plan: MigrationPlan): Promise<string[]> {
  const changed: string[] = [];
  if (await writeJsonIfMissing(plan.root, TOPOLOGY_PLAN, plan.topologyPlan)) {
    changed.push(TOPOLOGY_PLAN);
  }
  if (await appendJsonlRows(plan.root, PAGE_CREATION, plan.pageRows)) changed.push(PAGE_CREATION);
  if (await appendJsonlRows(plan.root, PAGE_MANIFESTS, plan.pageManifestRows)) {
    changed.push(PAGE_MANIFESTS);
  }
  if (await appendJsonlRows(plan.root, ENTITY_RESOLUTION, plan.entityRows)) {
    changed.push(ENTITY_RESOLUTION);
  }
  return changed;
}

function renderPlan(plan: MigrationPlan, dryRun: boolean, changed: string[] = []): string {
  const lines = [
    `context migrate ${TARGET}: ${dryRun ? "dry-run" : changed.length > 0 ? "updated" : "already up to date"}`,
    `detected: wiki_pages=${plan.wikiPages.length} facts=${plan.facts.length} graph_entities=${plan.graphEntities.length} graph_edges=${plan.graphEdges.length}`,
    "preserved: context/wiki/**, .agentplane/context/derived/facts/facts.jsonl, .agentplane/context/derived/graph/*.jsonl",
  ];
  const paths = dryRun ? plan.writes : changed;
  if (paths.length > 0) {
    lines.push(dryRun ? "would write:" : "changed:");
    for (const rel of paths) lines.push(`- ${toPosix(rel)}`);
  } else {
    lines.push(dryRun ? "would write: nothing" : "changed: nothing");
  }
  lines.push("");
  return lines.join("\n");
}

export async function cmdContextMigrate(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: ContextMigrateParsed;
}): Promise<number> {
  if (opts.parsed.target !== TARGET) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `unsupported context migration target: ${opts.parsed.target}`,
    });
  }
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const plan = await buildMigrationPlan(root);
  if (opts.parsed.dryRun) {
    process.stdout.write(renderPlan(plan, true));
    return 0;
  }
  const changed = await applyMigrationPlan(plan);
  process.stdout.write(renderPlan(plan, false, changed));
  return 0;
}
