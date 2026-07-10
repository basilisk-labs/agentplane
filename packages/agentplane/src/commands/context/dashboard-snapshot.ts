import type { DashboardSnapshot } from "./dashboard-types.js";
import {
  addDashboardDerivedGraph,
  addDashboardFactsAndCapabilities,
  addDashboardProjection,
  computeDashboardMetrics,
  type MutableDashboardGraph,
} from "./dashboard-graph.js";
import {
  addDashboardWikiLayer,
  buildDashboardWikiCatalog,
  loadDashboardWikiPages,
} from "./dashboard-wiki.js";

export async function buildContextDashboardSnapshot(root: string): Promise<DashboardSnapshot> {
  const graph: MutableDashboardGraph = { nodes: new Map(), edges: new Map(), warnings: [] };
  const pages = await loadDashboardWikiPages(root);
  const catalog = buildDashboardWikiCatalog(pages);
  const projection = await addDashboardProjection(graph, root, catalog);
  addDashboardWikiLayer(graph, pages, catalog);
  await addDashboardDerivedGraph(graph, root);
  await addDashboardFactsAndCapabilities(graph, root);
  const nodes = [...graph.nodes.values()].toSorted((a, b) => a.id.localeCompare(b.id));
  const edges = [...graph.edges.values()].toSorted((a, b) => a.id.localeCompare(b.id));
  return {
    generated_at: new Date().toISOString(),
    projection,
    nodes,
    edges,
    metrics: computeDashboardMetrics(nodes, edges, graph.warnings),
    warnings: graph.warnings,
  };
}
