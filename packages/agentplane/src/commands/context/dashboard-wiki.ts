import { readFile } from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";

import {
  addDashboardEdge,
  addDashboardNode,
  addDashboardSourceRef,
  type MutableDashboardGraph,
} from "./dashboard-graph.js";
import { collectWikiFiles, extractFrontmatter } from "./wiki-lint.js";
import { toPosix } from "./context-utils.js";

export type DashboardWikiPage = {
  id: string;
  rel: string;
  text: string;
  title: string;
  aliases: string[];
  sourceRefs: string[];
  graphEntities: string[];
  graphEdges: string[];
  claims: unknown[];
  conflicts: unknown[];
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) return [item.trim()];
    const record = asRecord(item);
    const ref = asString(record.ref) || asString(record.path) || asString(record.source);
    return ref ? [ref] : [];
  });
}

function titleFromPath(rel: string): string {
  return path.basename(rel, path.extname(rel)).replaceAll(/[-_]+/gu, " ");
}

function normalizeTarget(value: string): string {
  return toPosix(value)
    .trim()
    .replace(/^context\/wiki\//u, "")
    .replace(/\.md$/u, "")
    .replace(/^\/+/u, "");
}

function pagePathTarget(rel: string): string {
  return rel.replace(/^context\/wiki\//u, "").replace(/\.md$/u, "");
}

function parseWikiPage(rel: string, text: string): DashboardWikiPage {
  const frontmatterText = extractFrontmatter(text);
  const parsed = frontmatterText ? asRecord(parseYaml(frontmatterText)) : {};
  const ctx = asRecord(parsed.agentplane_context);
  const id = asString(ctx.canonical_id) || `wiki.${pagePathTarget(rel).replaceAll("/", ".")}`;
  const title = asString(ctx.title) || asString(parsed.title) || titleFromPath(rel);
  const graphRefs = asRecord(ctx.graph_refs);
  return {
    id,
    rel,
    text,
    title,
    aliases: stringList(parsed.aliases),
    sourceRefs: stringList(ctx.source_refs),
    graphEntities: stringList(graphRefs.entities),
    graphEdges: stringList(graphRefs.edges),
    claims: Array.isArray(ctx.claims) ? ctx.claims : [],
    conflicts: Array.isArray(ctx.conflicts) ? ctx.conflicts : [],
  };
}

export function buildDashboardWikiCatalog(pages: DashboardWikiPage[]): Map<string, string> {
  const catalog = new Map<string, string>();
  const register = (target: string, id: string) => {
    const normalized = normalizeTarget(target).toLowerCase();
    if (normalized && !catalog.has(normalized)) catalog.set(normalized, id);
  };
  for (const page of pages) {
    const target = pagePathTarget(page.rel);
    register(target, page.id);
    register(path.basename(target), page.id);
    register(page.title, page.id);
    for (const alias of page.aliases) register(alias, page.id);
  }
  return catalog;
}

function resolveRelativeLink(fromRel: string, href: string): string {
  const [rawPath, hash = ""] = href.split("#");
  const withoutQuery = (rawPath ?? "").split("?")[0] ?? "";
  if (!withoutQuery) return hash ? `${fromRel}#${hash}` : fromRel;
  if (withoutQuery.startsWith("/")) {
    return toPosix(withoutQuery.slice(1)) + (hash ? `#${hash}` : "");
  }
  return (
    toPosix(path.normalize(path.join(path.dirname(fromRel), withoutQuery))) +
    (hash ? `#${hash}` : "")
  );
}

function addWikiLinks(
  graph: MutableDashboardGraph,
  page: DashboardWikiPage,
  catalog: Map<string, string>,
): void {
  const obsidianPattern = /!?\[\[([^\]\n]+)\]\]/gu;
  for (const match of page.text.matchAll(obsidianPattern)) {
    const rawTarget = (match[1] ?? "").split("|")[0]?.trim() ?? "";
    if (!rawTarget || rawTarget.startsWith("#")) continue;
    const [targetPage] = rawTarget.split("#");
    const targetId = catalog.get(normalizeTarget(targetPage ?? "").toLowerCase());
    if (targetId) {
      addDashboardEdge(graph, { from: page.id, to: targetId, type: "wikilink" });
    } else {
      graph.warnings.push(`broken wikilink: ${page.rel} -> ${rawTarget}`);
    }
  }

  const markdownPattern = /!?\[[^\]\n]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/gu;
  for (const match of page.text.matchAll(markdownPattern)) {
    const href = match[1]?.trim() ?? "";
    if (!href || /^[a-z][a-z0-9+.-]*:/iu.test(href)) continue;
    const resolved = resolveRelativeLink(page.rel, href);
    if (resolved.startsWith("context/wiki/")) {
      const target = catalog.get(normalizeTarget(resolved).toLowerCase());
      if (target) addDashboardEdge(graph, { from: page.id, to: target, type: "markdown_link" });
      continue;
    }
    if (resolved.startsWith("context/raw/") || resolved.startsWith(".agentplane/tasks/")) {
      addDashboardSourceRef(graph, page.id, resolved);
    }
  }
}

export async function loadDashboardWikiPages(root: string): Promise<DashboardWikiPage[]> {
  const files = await collectWikiFiles(root, "context/wiki");
  const pages: DashboardWikiPage[] = [];
  for (const rel of files) {
    pages.push(parseWikiPage(rel, await readFile(path.join(root, rel), "utf8")));
  }
  return pages;
}

export function addDashboardWikiLayer(
  graph: MutableDashboardGraph,
  pages: DashboardWikiPage[],
  catalog = buildDashboardWikiCatalog(pages),
): void {
  for (const page of pages) {
    addDashboardNode(graph, {
      id: page.id,
      type: "wiki_page",
      label: page.title,
      path: page.rel,
      meta: { aliases: page.aliases },
    });
    for (const ref of page.sourceRefs) addDashboardSourceRef(graph, page.id, ref);
    for (const entity of page.graphEntities) {
      addDashboardNode(graph, { id: `entity:${entity}`, type: "entity", label: entity });
      addDashboardEdge(graph, {
        from: page.id,
        to: `entity:${entity}`,
        type: "graph_ref",
        label: "entity",
      });
    }
    for (const edge of page.graphEdges) {
      const edgeId = `edge:${edge}`;
      addDashboardNode(graph, { id: edgeId, type: "edge_record", label: edge });
      addDashboardEdge(graph, { from: page.id, to: edgeId, type: "graph_ref", label: "edge" });
    }
    for (const [index, claim] of page.claims.entries()) {
      const record = asRecord(claim);
      const id = asString(record.id) || `${page.id}.claim.${index + 1}`;
      const nodeId = `claim:${id}`;
      addDashboardNode(graph, {
        id: nodeId,
        type: "claim",
        label: asString(record.summary) || asString(record.text) || id,
        meta: record,
      });
      addDashboardEdge(graph, { from: page.id, to: nodeId, type: "claims" });
    }
    for (const [index, conflict] of page.conflicts.entries()) {
      const record = asRecord(conflict);
      const id = asString(record.id) || `${page.id}.conflict.${index + 1}`;
      const nodeId = `conflict:${id}`;
      addDashboardNode(graph, {
        id: nodeId,
        type: "conflict",
        label: asString(record.summary) || asString(record.text) || id,
        meta: record,
      });
      addDashboardEdge(graph, { from: page.id, to: nodeId, type: "conflict" });
    }
    addWikiLinks(graph, page, catalog);
  }
}
