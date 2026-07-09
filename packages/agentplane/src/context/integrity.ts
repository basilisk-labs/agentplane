import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";

import { isRecord } from "../shared/guards.js";
import { fileExists, parseJsonlLines, toPosix } from "./context-utils.js";
import { isUnsupportedPath, readContextWorkspaceMode, readManifest } from "./ingest-manifest.js";

export const WIKI_REPORT_STATE_PATH = ".agentplane/context/derived/wiki/report-state.json";

type JsonRow = Record<string, unknown>;

async function collectFiles(root: string, rel: string): Promise<string[]> {
  const out: string[] = [];
  async function walk(current: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(path.join(root, current), { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const child = toPosix(path.join(current, entry.name));
      if (entry.isDirectory()) await walk(child);
      else if (entry.isFile()) out.push(child);
    }
  }
  await walk(rel);
  return out.toSorted();
}

async function readJsonl(root: string, rel: string): Promise<JsonRow[]> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return [];
  return parseJsonlLines(await readFile(abs, "utf8")) as JsonRow[];
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "")
    : [];
}

function stringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function wikiGraphRefs(text: string): { entities: string[]; edges: string[] } {
  const frontmatter = /^---\n([\s\S]*?)\n---/u.exec(text.replaceAll("\r\n", "\n"))?.[1];
  if (!frontmatter) return { entities: [], edges: [] };
  const parsed = parseYaml(frontmatter) as unknown;
  if (!isRecord(parsed)) return { entities: [], edges: [] };
  const context = isRecord(parsed.agentplane_context) ? parsed.agentplane_context : parsed;
  if (!isRecord(context.graph_refs)) return { entities: [], edges: [] };
  return {
    entities: stringArray(context.graph_refs.entities),
    edges: stringArray(context.graph_refs.edges),
  };
}

function isSemanticWikiPage(rel: string): boolean {
  return (
    rel.endsWith(".md") &&
    rel !== "context/wiki/AGENTS.md" &&
    rel !== "context/wiki/index.md" &&
    rel !== "context/wiki/glossary.md" &&
    !rel.endsWith("/index.md") &&
    !rel.includes("/reports/")
  );
}

export async function computeWikiReportSourceDigest(root: string): Promise<string> {
  const collectedWikiFiles = await collectFiles(root, "context/wiki");
  const wikiFiles = collectedWikiFiles.filter(
    (rel) => rel.endsWith(".md") && !rel.includes("/reports/") && rel !== "context/wiki/AGENTS.md",
  );
  const inputs = [
    ...wikiFiles,
    ".agentplane/context/derived/graph/entities.jsonl",
    ".agentplane/context/derived/graph/edges.jsonl",
  ].toSorted();
  const hash = createHash("sha256");
  for (const rel of inputs) {
    const abs = path.join(root, rel);
    if (!(await fileExists(abs))) continue;
    hash.update(rel);
    hash.update("\0");
    hash.update(await readFile(abs));
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

async function validateWikiGraphRefs(root: string, issues: string[]): Promise<void> {
  const entities = await readJsonl(root, ".agentplane/context/derived/graph/entities.jsonl");
  const entityIds = new Set(entities.map((row) => stringValue(row.id)).filter(Boolean));
  const edges = await readJsonl(root, ".agentplane/context/derived/graph/edges.jsonl");
  const edgeIds = new Set(edges.map((row) => stringValue(row.id)).filter(Boolean));
  const collectedWikiFiles = await collectFiles(root, "context/wiki");
  for (const rel of collectedWikiFiles.filter((file) => file.endsWith(".md"))) {
    const refs = wikiGraphRefs(await readFile(path.join(root, rel), "utf8"));
    for (const entityId of refs.entities) {
      if (!entityIds.has(entityId))
        issues.push(`wiki graph entity ref does not resolve: ${entityId} (${rel})`);
    }
    for (const edgeId of refs.edges) {
      if (!edgeIds.has(edgeId))
        issues.push(`wiki graph edge ref does not resolve: ${edgeId} (${rel})`);
    }
  }
}

async function validateEntityPagePolicy(root: string, issues: string[]): Promise<void> {
  if ((await readContextWorkspaceMode(root)) !== "maximum-assimilation") return;
  for (const row of await readJsonl(root, ".agentplane/context/derived/graph/entities.jsonl")) {
    const id = stringValue(row.id, "<unknown>");
    const status = typeof row.status === "string" ? row.status : "active";
    if (status !== "active" && status !== "accepted") continue;
    const targetPath = typeof row.target_path === "string" ? row.target_path.trim() : "";
    const noPageReason = typeof row.no_page_reason === "string" ? row.no_page_reason.trim() : "";
    if (!targetPath && !noPageReason) {
      issues.push(`active graph entity requires target_path or no_page_reason: ${id}`);
      continue;
    }
    if (targetPath && !(await fileExists(path.join(root, targetPath)))) {
      issues.push(`active graph entity target_path does not exist: ${id} -> ${targetPath}`);
    }
  }
}

async function validateRawManifestCoverage(root: string, issues: string[]): Promise<void> {
  const manifest = await readManifest(root);
  const manifestPaths = new Set(manifest.sources.map((source) => source.path));
  const collectedRawFiles = await collectFiles(root, "context/raw");
  const rawFiles = collectedRawFiles.filter((rel) => !isUnsupportedPath(rel));
  for (const rel of rawFiles) {
    if (!manifestPaths.has(rel)) issues.push(`raw source missing from manifest lock: ${rel}`);
  }
}

async function validateWikiReportFreshness(root: string, issues: string[]): Promise<void> {
  if ((await readContextWorkspaceMode(root)) !== "maximum-assimilation") return;
  const collectedWikiFiles = await collectFiles(root, "context/wiki");
  const semanticWikiPages = collectedWikiFiles.filter((rel) => isSemanticWikiPage(rel));
  if (semanticWikiPages.length < 3) return;
  const stateAbs = path.join(root, WIKI_REPORT_STATE_PATH);
  if (!(await fileExists(stateAbs))) {
    issues.push(`wiki connectivity report state missing: ${WIKI_REPORT_STATE_PATH}`);
    return;
  }
  let state: JsonRow;
  try {
    state = JSON.parse(await readFile(stateAbs, "utf8")) as JsonRow;
  } catch {
    issues.push(`wiki connectivity report state is unreadable: ${WIKI_REPORT_STATE_PATH}`);
    return;
  }
  if (state.target !== "context/wiki") {
    issues.push(
      `wiki connectivity reports cover only ${stringValue(state.target, "<unknown>")}; refresh context/wiki`,
    );
  }
  const currentDigest = await computeWikiReportSourceDigest(root);
  if (state.source_digest !== currentDigest) {
    issues.push(
      "wiki connectivity reports are stale; run agentplane context wiki report context/wiki",
    );
  }
  for (const rel of [
    ".agentplane/context/derived/wiki/link-index.jsonl",
    ".agentplane/context/derived/wiki/orphan-report.jsonl",
  ]) {
    if (!(await fileExists(path.join(root, rel))))
      issues.push(`wiki connectivity report missing: ${rel}`);
  }
}

export async function validateContextCrossSurfaceIntegrity(root: string): Promise<string[]> {
  const issues: string[] = [];
  await validateWikiGraphRefs(root, issues);
  await validateEntityPagePolicy(root, issues);
  await validateRawManifestCoverage(root, issues);
  await validateWikiReportFreshness(root, issues);
  return issues;
}
