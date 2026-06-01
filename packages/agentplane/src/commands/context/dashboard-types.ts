export type DashboardNode = {
  id: string;
  type:
    | "wiki_page"
    | "wiki_section"
    | "entity"
    | "edge_record"
    | "claim"
    | "source"
    | "task"
    | "capability"
    | "conflict";
  label: string;
  path?: string;
  stale?: boolean;
  meta?: Record<string, unknown>;
};

export type DashboardEdge = {
  id: string;
  from: string;
  to: string;
  type:
    | "wikilink"
    | "markdown_link"
    | "source_ref"
    | "graph_ref"
    | "claims"
    | "conflict"
    | "contains"
    | "entity_relation"
    | "provenance"
    | "projection";
  label?: string;
  meta?: Record<string, unknown>;
};

export type DashboardMetrics = {
  nodes: number;
  edges: number;
  by_type: Record<string, number>;
  by_edge_type: Record<string, number>;
  components: number;
  largest_component: number;
  isolated_nodes: number;
  wiki_pages: number;
  wiki_orphans: number;
  wiki_without_source_refs: number;
  broken_wikilinks: number;
  provenance_edges: number;
  claim_nodes: number;
  source_nodes: number;
};

export type DashboardSnapshot = {
  generated_at: string;
  projection: {
    adapter: "sqlite" | "filesystem";
    available: boolean;
    generated_at: string | null;
    rows: number;
    include_tasks: boolean;
    include_raw: boolean;
  };
  nodes: DashboardNode[];
  edges: DashboardEdge[];
  metrics: DashboardMetrics;
  warnings: string[];
};
