import { spawn } from "node:child_process";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";

import { dashboardHtml } from "./dashboard-html.js";
import type {
  DashboardEdge,
  DashboardMetrics,
  DashboardNode,
  DashboardSnapshot,
} from "./dashboard-types.js";
import { readContextProjection } from "./reindex.js";
import { collectWikiFiles, extractFrontmatter } from "./wiki-lint.js";
import { fileExists, parseJsonlLines, readText, toPosix } from "./context-utils.js";

type DashboardParsed = {
  host: string;
  port: string;
  open: boolean;
  dumpJson: boolean;
};

type WikiPageInfo = {
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

type MutableGraph = {
  nodes: Map<string, DashboardNode>;
  edges: Map<string, DashboardEdge>;
  warnings: string[];
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

function nodeIdForSource(ref: string): string {
  const base = ref.split("#")[0] ?? ref;
  return `source:${toPosix(base)}`;
}

function nodeIdForTask(ref: string): string | null {
  const match = /\.agentplane\/tasks\/([^/#]+)/u.exec(ref);
  return match?.[1] ? `task:${match[1]}` : null;
}

function addNode(graph: MutableGraph, node: DashboardNode): void {
  const existing = graph.nodes.get(node.id);
  if (!existing) {
    graph.nodes.set(node.id, node);
    return;
  }
  graph.nodes.set(node.id, {
    ...existing,
    label: node.meta ? node.label : existing.label,
    path: node.path ?? existing.path,
    stale: node.stale ?? existing.stale,
    meta: existing.meta || node.meta ? { ...existing.meta, ...node.meta } : undefined,
  });
}

function addEdge(graph: MutableGraph, edge: Omit<DashboardEdge, "id">): void {
  const id = `${edge.type}:${edge.from}->${edge.to}:${edge.label ?? ""}`;
  if (!graph.edges.has(id)) graph.edges.set(id, { ...edge, id });
}

function parseWikiPage(rel: string, text: string): WikiPageInfo {
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

function buildWikiCatalog(pages: WikiPageInfo[]): Map<string, string> {
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
  if (withoutQuery.startsWith("/"))
    return toPosix(withoutQuery.slice(1)) + (hash ? `#${hash}` : "");
  return (
    toPosix(path.normalize(path.join(path.dirname(fromRel), withoutQuery))) +
    (hash ? `#${hash}` : "")
  );
}

function addSourceRef(graph: MutableGraph, from: string, ref: string): void {
  if (!ref) return;
  const taskId = nodeIdForTask(ref);
  if (taskId) {
    addNode(graph, { id: taskId, type: "task", label: taskId.replace(/^task:/u, "") });
    addEdge(graph, { from, to: taskId, type: "source_ref", label: "task" });
    return;
  }
  const sourceId = nodeIdForSource(ref);
  addNode(graph, { id: sourceId, type: "source", label: sourceId.replace(/^source:/u, "") });
  addEdge(graph, { from, to: sourceId, type: "source_ref" });
}

function addWikiLinks(graph: MutableGraph, page: WikiPageInfo, catalog: Map<string, string>): void {
  const obsidianPattern = /!?\[\[([^\]\n]+)\]\]/gu;
  for (const match of page.text.matchAll(obsidianPattern)) {
    const rawTarget = (match[1] ?? "").split("|")[0]?.trim() ?? "";
    if (!rawTarget || rawTarget.startsWith("#")) continue;
    const [targetPage] = rawTarget.split("#");
    const targetId = catalog.get(normalizeTarget(targetPage ?? "").toLowerCase());
    if (targetId) {
      addEdge(graph, { from: page.id, to: targetId, type: "wikilink" });
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
      if (target) addEdge(graph, { from: page.id, to: target, type: "markdown_link" });
      continue;
    }
    if (resolved.startsWith("context/raw/") || resolved.startsWith(".agentplane/tasks/")) {
      addSourceRef(graph, page.id, resolved);
    }
  }
}

async function loadJsonl(root: string, rel: string): Promise<Record<string, unknown>[]> {
  const full = path.join(root, rel);
  if (!(await fileExists(full))) return [];
  return parseJsonlLines(await readText(full)).filter(
    (row): row is Record<string, unknown> => row !== null && typeof row === "object",
  );
}

async function loadWikiPages(root: string): Promise<WikiPageInfo[]> {
  const files = await collectWikiFiles(root, "context/wiki");
  const pages: WikiPageInfo[] = [];
  for (const rel of files) {
    pages.push(parseWikiPage(rel, await readFile(path.join(root, rel), "utf8")));
  }
  return pages;
}

async function addProjectionRows(
  graph: MutableGraph,
  root: string,
  catalog: Map<string, string>,
): Promise<DashboardSnapshot["projection"]> {
  const projection = await readContextProjection(root);
  if (!projection) {
    return {
      adapter: "filesystem",
      available: false,
      generated_at: null,
      rows: 0,
      include_tasks: false,
      include_raw: false,
    };
  }
  for (const row of projection.rows) {
    if (row.kind === "markdown-section" && row.path.startsWith("context/wiki/")) {
      const [pageRel, section = ""] = row.path.split("#section=");
      const pageId =
        catalog.get(normalizeTarget(pageRel ?? "").toLowerCase()) ??
        `wiki.${(pageRel ?? "")
          .replace(/^context\/wiki\//u, "")
          .replace(/\.md$/u, "")
          .replaceAll("/", ".")}`;
      const id = `section:${row.path}`;
      addNode(graph, { id, type: "wiki_section", label: section || row.path, path: row.path });
      addEdge(graph, { from: pageId, to: id, type: "contains" });
    }
    if (row.path.startsWith(".agentplane/tasks/")) {
      const taskId = nodeIdForTask(row.path);
      if (taskId)
        addNode(graph, { id: taskId, type: "task", label: taskId.replace(/^task:/u, "") });
    }
  }
  return {
    adapter: "sqlite",
    available: true,
    generated_at: projection.metadata.generated_at,
    rows: projection.rows.length,
    include_tasks: projection.metadata.include_tasks,
    include_raw: projection.metadata.include_raw,
  };
}

async function addDerivedGraph(graph: MutableGraph, root: string): Promise<void> {
  const entities = await loadJsonl(root, ".agentplane/context/derived/graph/entities.jsonl");
  for (const entity of entities) {
    const id = asString(entity.id);
    if (!id) continue;
    addNode(graph, {
      id: `entity:${id}`,
      type: "entity",
      label: asString(entity.label) || id,
      meta: entity,
    });
  }
  const edges = await loadJsonl(root, ".agentplane/context/derived/graph/edges.jsonl");
  for (const edge of edges) {
    const from = asString(edge.from);
    const to = asString(edge.to);
    if (!from || !to) continue;
    const relation = asString(edge.relation) || "related_to";
    addNode(graph, { id: `entity:${from}`, type: "entity", label: from });
    addNode(graph, { id: `entity:${to}`, type: "entity", label: to });
    addEdge(graph, {
      from: `entity:${from}`,
      to: `entity:${to}`,
      type: "entity_relation",
      label: relation,
      meta: edge,
    });
  }
  const provenance = await loadJsonl(
    root,
    ".agentplane/context/derived/graph/provenance_edges.jsonl",
  );
  for (const row of provenance) {
    const source = asString(row.source);
    const target = asString(row.target) || asString(row.artifact);
    if (!source || !target) continue;
    const targetId = target.startsWith(".agentplane/tasks/")
      ? (nodeIdForTask(target) ?? `source:${target}`)
      : `entity:${target.replace(/^entity:/u, "")}`;
    addNode(graph, {
      id: targetId,
      type: targetId.startsWith("task:") ? "task" : "entity",
      label: targetId.replace(/^(task|entity):/u, ""),
    });
    const sourceId = nodeIdForSource(source);
    addNode(graph, { id: sourceId, type: "source", label: sourceId.replace(/^source:/u, "") });
    addEdge(graph, { from: sourceId, to: targetId, type: "provenance" });
  }
}

async function addFactsAndCapabilities(graph: MutableGraph, root: string): Promise<void> {
  const facts = await loadJsonl(root, ".agentplane/context/derived/facts/facts.jsonl");
  for (const fact of facts) {
    const id = asString(fact.id) || `fact:${graph.nodes.size}`;
    const nodeId = `claim:${id}`;
    addNode(graph, {
      id: nodeId,
      type: "claim",
      label: asString(fact.summary) || asString(fact.claim) || id,
      meta: fact,
    });
    for (const ref of stringList(fact.source_refs)) addSourceRef(graph, nodeId, ref);
  }
  const capabilities = await loadJsonl(
    root,
    ".agentplane/context/derived/capabilities/capabilities.jsonl",
  );
  for (const capability of capabilities) {
    const id = asString(capability.id) || asString(capability.name);
    if (!id) continue;
    const nodeId = `capability:${id}`;
    addNode(graph, {
      id: nodeId,
      type: "capability",
      label: asString(capability.name) || asString(capability.title) || id,
      meta: capability,
    });
    for (const ref of stringList(capability.source_refs)) addSourceRef(graph, nodeId, ref);
  }
}

function addWikiLayer(
  graph: MutableGraph,
  pages: WikiPageInfo[],
  catalog = buildWikiCatalog(pages),
): void {
  for (const page of pages) {
    addNode(graph, {
      id: page.id,
      type: "wiki_page",
      label: page.title,
      path: page.rel,
      meta: { aliases: page.aliases },
    });
    for (const ref of page.sourceRefs) addSourceRef(graph, page.id, ref);
    for (const entity of page.graphEntities) {
      addNode(graph, { id: `entity:${entity}`, type: "entity", label: entity });
      addEdge(graph, { from: page.id, to: `entity:${entity}`, type: "graph_ref", label: "entity" });
    }
    for (const edge of page.graphEdges) {
      const edgeId = `edge:${edge}`;
      addNode(graph, { id: edgeId, type: "edge_record", label: edge });
      addEdge(graph, { from: page.id, to: edgeId, type: "graph_ref", label: "edge" });
    }
    for (const [index, claim] of page.claims.entries()) {
      const record = asRecord(claim);
      const id = asString(record.id) || `${page.id}.claim.${index + 1}`;
      const nodeId = `claim:${id}`;
      addNode(graph, {
        id: nodeId,
        type: "claim",
        label: asString(record.summary) || asString(record.text) || id,
        meta: record,
      });
      addEdge(graph, { from: page.id, to: nodeId, type: "claims" });
    }
    for (const [index, conflict] of page.conflicts.entries()) {
      const record = asRecord(conflict);
      const id = asString(record.id) || `${page.id}.conflict.${index + 1}`;
      const nodeId = `conflict:${id}`;
      addNode(graph, {
        id: nodeId,
        type: "conflict",
        label: asString(record.summary) || asString(record.text) || id,
        meta: record,
      });
      addEdge(graph, { from: page.id, to: nodeId, type: "conflict" });
    }
    addWikiLinks(graph, page, catalog);
  }
}

function computeMetrics(
  nodes: DashboardNode[],
  edges: DashboardEdge[],
  warnings: string[],
): DashboardMetrics {
  const byType: Record<string, number> = {};
  const byEdgeType: Record<string, number> = {};
  for (const node of nodes) byType[node.type] = (byType[node.type] ?? 0) + 1;
  for (const edge of edges) byEdgeType[edge.type] = (byEdgeType[edge.type] ?? 0) + 1;

  const adjacency = new Map<string, Set<string>>();
  for (const node of nodes) adjacency.set(node.id, new Set());
  for (const edge of edges) {
    adjacency.get(edge.from)?.add(edge.to);
    adjacency.get(edge.to)?.add(edge.from);
  }
  const seen = new Set<string>();
  let components = 0;
  let largest = 0;
  for (const node of nodes) {
    if (seen.has(node.id)) continue;
    components += 1;
    let size = 0;
    const stack = [node.id];
    seen.add(node.id);
    while (stack.length > 0) {
      const current = stack.pop();
      if (!current) continue;
      size += 1;
      for (const next of adjacency.get(current) ?? []) {
        if (!seen.has(next)) {
          seen.add(next);
          stack.push(next);
        }
      }
    }
    largest = Math.max(largest, size);
  }
  const wikiPages = nodes.filter((node) => node.type === "wiki_page");
  const wikiInbound = new Set(
    edges
      .filter((edge) => edge.type === "wikilink" || edge.type === "markdown_link")
      .map((edge) => edge.to),
  );
  const sourcedWiki = new Set(
    edges.filter((edge) => edge.type === "source_ref").map((edge) => edge.from),
  );
  return {
    nodes: nodes.length,
    edges: edges.length,
    by_type: byType,
    by_edge_type: byEdgeType,
    components,
    largest_component: largest,
    isolated_nodes: [...adjacency.values()].filter((set) => set.size === 0).length,
    wiki_pages: wikiPages.length,
    wiki_orphans: wikiPages.filter((page) => !wikiInbound.has(page.id)).length,
    wiki_without_source_refs: wikiPages.filter((page) => !sourcedWiki.has(page.id)).length,
    broken_wikilinks: warnings.filter((item) => item.startsWith("broken wikilink:")).length,
    provenance_edges: byEdgeType.provenance ?? 0,
    claim_nodes: byType.claim ?? 0,
    source_nodes: byType.source ?? 0,
  };
}

export async function buildContextDashboardSnapshot(root: string): Promise<DashboardSnapshot> {
  const graph: MutableGraph = { nodes: new Map(), edges: new Map(), warnings: [] };
  const pages = await loadWikiPages(root);
  const catalog = buildWikiCatalog(pages);
  const projection = await addProjectionRows(graph, root, catalog);
  addWikiLayer(graph, pages, catalog);
  await addDerivedGraph(graph, root);
  await addFactsAndCapabilities(graph, root);
  const nodes = [...graph.nodes.values()].toSorted((a, b) => a.id.localeCompare(b.id));
  const edges = [...graph.edges.values()].toSorted((a, b) => a.id.localeCompare(b.id));
  return {
    generated_at: new Date().toISOString(),
    projection,
    nodes,
    edges,
    metrics: computeMetrics(nodes, edges, graph.warnings),
    warnings: graph.warnings,
  };
}

function writeJson(res: ServerResponse, value: unknown): void {
  res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

function writeText(res: ServerResponse, code: number, value: string): void {
  res.writeHead(code, { "content-type": "text/plain; charset=utf-8" });
  res.end(value);
}

function openBrowser(url: string): void {
  if (process.platform === "darwin") {
    spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
  }
}

export async function cmdContextDashboard(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: DashboardParsed;
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  await access(root);
  const snapshot = await buildContextDashboardSnapshot(root);
  if (opts.parsed.dumpJson) {
    process.stdout.write(`${JSON.stringify(snapshot, null, 2)}\n`);
    return 0;
  }
  const host = opts.parsed.host || "127.0.0.1";
  const port = Number.parseInt(opts.parsed.port || "0", 10);
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url ?? "/";
    if (url === "/" || url === "/index.html") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(dashboardHtml());
      return;
    }
    if (url === "/api/graph") return writeJson(res, snapshot);
    if (url === "/api/metrics") return writeJson(res, snapshot.metrics);
    if (url === "/api/health") return writeJson(res, { ok: true, projection: snapshot.projection });
    writeText(res, 404, "not found\n");
  });
  await new Promise<void>((resolve) => server.listen({ host, port }, resolve));
  const address = server.address();
  const actualPort = typeof address === "object" && address ? address.port : port;
  const url = `http://${host}:${actualPort}/`;
  process.stdout.write(`context dashboard: ${url}\n`);
  process.stdout.write(
    `snapshot: nodes=${snapshot.nodes.length} edges=${snapshot.edges.length} projection_rows=${snapshot.projection.rows}\n`,
  );
  if (opts.parsed.open) openBrowser(url);
  await new Promise<void>((resolve) => {
    const shutdown = () => {
      server.close(() => resolve());
    };
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  });
  return 0;
}
