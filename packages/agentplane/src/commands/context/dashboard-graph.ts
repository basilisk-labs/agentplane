import path from "node:path";

import type {
  DashboardEdge,
  DashboardMetrics,
  DashboardNode,
  DashboardSnapshot,
} from "./dashboard-types.js";
import { readContextProjection } from "./reindex.js";
import { fileExists, parseJsonlLines, readText, toPosix } from "./context-utils.js";

export type MutableDashboardGraph = {
  nodes: Map<string, DashboardNode>;
  edges: Map<string, DashboardEdge>;
  warnings: string[];
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
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

function normalizeTarget(value: string): string {
  return toPosix(value)
    .trim()
    .replace(/^context\/wiki\//u, "")
    .replace(/\.md$/u, "")
    .replace(/^\/+/u, "");
}

function nodeIdForSource(ref: string): string {
  const base = ref.split("#")[0] ?? ref;
  return `source:${toPosix(base)}`;
}

function nodeIdForTask(ref: string): string | null {
  const match = /\.agentplane\/tasks\/([^/#]+)/u.exec(ref);
  return match?.[1] ? `task:${match[1]}` : null;
}

export function addDashboardNode(graph: MutableDashboardGraph, node: DashboardNode): void {
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

export function addDashboardEdge(
  graph: MutableDashboardGraph,
  edge: Omit<DashboardEdge, "id">,
): void {
  const id = `${edge.type}:${edge.from}->${edge.to}:${edge.label ?? ""}`;
  if (!graph.edges.has(id)) graph.edges.set(id, { ...edge, id });
}

export function addDashboardSourceRef(
  graph: MutableDashboardGraph,
  from: string,
  ref: string,
): void {
  if (!ref) return;
  const taskId = nodeIdForTask(ref);
  if (taskId) {
    addDashboardNode(graph, { id: taskId, type: "task", label: taskId.replace(/^task:/u, "") });
    addDashboardEdge(graph, { from, to: taskId, type: "source_ref", label: "task" });
    return;
  }
  const sourceId = nodeIdForSource(ref);
  addDashboardNode(graph, {
    id: sourceId,
    type: "source",
    label: sourceId.replace(/^source:/u, ""),
  });
  addDashboardEdge(graph, { from, to: sourceId, type: "source_ref" });
}

async function loadJsonl(root: string, rel: string): Promise<Record<string, unknown>[]> {
  const full = path.join(root, rel);
  if (!(await fileExists(full))) return [];
  return parseJsonlLines(await readText(full)).filter(
    (row): row is Record<string, unknown> => row !== null && typeof row === "object",
  );
}

export async function addDashboardProjection(
  graph: MutableDashboardGraph,
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
      addDashboardNode(graph, {
        id,
        type: "wiki_section",
        label: section || row.path,
        path: row.path,
      });
      addDashboardEdge(graph, { from: pageId, to: id, type: "contains" });
    }
    if (row.path.startsWith(".agentplane/tasks/")) {
      const taskId = nodeIdForTask(row.path);
      if (taskId) {
        addDashboardNode(graph, {
          id: taskId,
          type: "task",
          label: taskId.replace(/^task:/u, ""),
        });
      }
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

export async function addDashboardDerivedGraph(
  graph: MutableDashboardGraph,
  root: string,
): Promise<void> {
  const entities = await loadJsonl(root, ".agentplane/context/derived/graph/entities.jsonl");
  for (const entity of entities) {
    const id = asString(entity.id);
    if (!id) continue;
    addDashboardNode(graph, {
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
    addDashboardNode(graph, { id: `entity:${from}`, type: "entity", label: from });
    addDashboardNode(graph, { id: `entity:${to}`, type: "entity", label: to });
    addDashboardEdge(graph, {
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
    addDashboardNode(graph, {
      id: targetId,
      type: targetId.startsWith("task:") ? "task" : "entity",
      label: targetId.replace(/^(task|entity):/u, ""),
    });
    const sourceId = nodeIdForSource(source);
    addDashboardNode(graph, {
      id: sourceId,
      type: "source",
      label: sourceId.replace(/^source:/u, ""),
    });
    addDashboardEdge(graph, { from: sourceId, to: targetId, type: "provenance" });
  }
}

export async function addDashboardFactsAndCapabilities(
  graph: MutableDashboardGraph,
  root: string,
): Promise<void> {
  const facts = await loadJsonl(root, ".agentplane/context/derived/facts/facts.jsonl");
  for (const fact of facts) {
    const id = asString(fact.id) || `fact:${graph.nodes.size}`;
    const nodeId = `claim:${id}`;
    addDashboardNode(graph, {
      id: nodeId,
      type: "claim",
      label: asString(fact.summary) || asString(fact.claim) || id,
      meta: fact,
    });
    for (const ref of stringList(fact.source_refs)) addDashboardSourceRef(graph, nodeId, ref);
  }
  const capabilities = await loadJsonl(
    root,
    ".agentplane/context/derived/capabilities/capabilities.jsonl",
  );
  for (const capability of capabilities) {
    const id = asString(capability.id) || asString(capability.name);
    if (!id) continue;
    const nodeId = `capability:${id}`;
    addDashboardNode(graph, {
      id: nodeId,
      type: "capability",
      label: asString(capability.name) || asString(capability.title) || id,
      meta: capability,
    });
    for (const ref of stringList(capability.source_refs)) {
      addDashboardSourceRef(graph, nodeId, ref);
    }
  }
}

export function computeDashboardMetrics(
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
