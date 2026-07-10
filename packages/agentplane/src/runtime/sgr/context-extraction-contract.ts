import {
  CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION,
  type ContextExtractionSgrResult,
} from "./contract-types.js";

export const CONTEXT_EXTRACTION_SGR_EXAMPLE: ContextExtractionSgrResult = {
  schema_version: CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION,
  kind: "context_extraction",
  task_id: "<task-id>",
  reasoning: [
    {
      label: "reconcile-before-write",
      summary: "Resolve existing entities and wiki topology before synthesizing pages.",
      evidence_refs: [{ path: "context/raw/<source>.md", lines: "1-40" }],
    },
  ],
  source_refs: [{ path: "context/raw/<source>.md", lines: "1-40" }],
  extracted_items: [
    {
      id: "entity.example",
      kind: "graph_entity",
      summary: "Reusable canonical entity.",
      source_refs: [{ path: "context/raw/<source>.md", lines: "1-8" }],
      span_refs: ["span.example.0001"],
      confidence: 0.9,
      status: "accepted",
      entity: { id: "entity.example", kind: "concept", label: "Example" },
    },
    {
      id: "resolution.example",
      kind: "entity_resolution",
      summary: "The source term resolves to the canonical entity.",
      source_refs: [{ path: "context/raw/<source>.md", lines: "1-8" }],
      span_refs: ["span.example.0001"],
      confidence: 0.9,
      status: "accepted",
      entity_resolution: {
        source_term: "Example",
        resolution: "new_entity_proposal",
        proposed_entity_id: "entity.example",
        candidate_entities_checked: [
          {
            entity_id: "entity.existing-example",
            reason: "The existing candidate has a different source-backed scope.",
          },
        ],
        why_not_existing: "No existing candidate represents this source-backed concept.",
      },
    },
    {
      id: "decision.example",
      kind: "decision",
      summary: "Source-backed reusable decision.",
      source_refs: [{ path: "context/raw/<source>.md", lines: "9-16" }],
      span_refs: ["span.example.0002"],
      confidence_vector: {
        extraction: 0.9,
        source_quality: 0.9,
        entity_resolution: 0.9,
        freshness: 0.9,
      },
      status: "accepted",
      validity: "current",
      target_path: "context/wiki/examples/example.md",
      canonical_refs: ["entity.example"],
    },
    {
      id: "page.example",
      kind: "page_creation",
      summary: "A reusable topic deserves a canonical page.",
      source_refs: [{ path: "context/raw/<source>.md", lines: "1-16" }],
      span_refs: ["span.example.0001", "span.example.0002"],
      confidence: 0.85,
      status: "accepted",
      page_creation: {
        path: "context/wiki/examples/example.md",
        page_type: "concept",
        family_id: "family.examples",
        decision: "create_new_page",
        canonical_entity_ids: ["entity.example"],
      },
    },
    {
      id: "topology.examples",
      kind: "topology_decision",
      summary: "The source shape justifies a bounded example-page family.",
      source_refs: [{ path: "context/raw/<source>.md", lines: "1-40" }],
      span_refs: ["span.example.0001", "span.example.0002"],
      confidence: 0.85,
      status: "accepted",
      topology_decision: {
        source_shape: {
          primary: "product_docs",
          rationale: "The source describes a reusable product concept and decision.",
          evidence_span_ids: ["span.example.0001", "span.example.0002"],
        },
        canonical_page_families: [
          {
            family_id: "family.examples",
            path_template: "context/wiki/examples/{slug}.md",
            page_type: "concept",
            creation_rule: "Create a page only for reusable concepts.",
            page_vs_heading_rule: "Keep local details as stable headings.",
            source_evidence_span_ids: ["span.example.0001", "span.example.0002"],
          },
        ],
      },
    },
    {
      id: "coverage.example.0001",
      kind: "coverage",
      summary: "The significant source span is covered by formal and wiki artifacts.",
      source_refs: [{ path: "context/raw/<source>.md", lines: "1-16" }],
      span_refs: ["span.example.0001"],
      confidence: 0.9,
      status: "accepted",
      coverage: {
        source_path: "context/raw/<source>.md",
        span_id: "span.example.0001",
        status: "covered",
        reason: "Entity, decision, and page records preserve the reusable meaning.",
        covered_item_ids: ["entity.example", "decision.example", "page.example"],
        target_paths: ["context/wiki/examples/example.md"],
      },
    },
  ],
};

export const CONTEXT_EXTRACTION_CONTRACT = {
  version: 1,
  sgr_schema_version: CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION,
  kind: "context_extraction",
  apply_command: "agentplane context extraction apply <sgr-json> --task-id <task-id>",
  common_required: ["id", "kind", "summary", "source_refs", "status"],
  typed_payloads: {
    graph_entity: ["entity.id", "entity.kind", "entity.label"],
    graph_edge: ["edge.from", "edge.to", "edge.relation"],
    entity_resolution: ["entity_resolution.source_term", "entity_resolution.resolution"],
    page_creation: [
      "span_refs[]",
      "page_creation.path",
      "page_creation.page_type",
      "page_creation.family_id",
      "page_creation.decision",
    ],
    topology_decision: [
      "topology_decision.source_shape.primary",
      "topology_decision.source_shape.rationale",
      "topology_decision.source_shape.evidence_span_ids[]",
      "topology_decision.canonical_page_families[].family_id",
      "topology_decision.canonical_page_families[].path_template",
      "topology_decision.canonical_page_families[].page_type",
      "topology_decision.canonical_page_families[].creation_rule",
      "topology_decision.canonical_page_families[].page_vs_heading_rule",
      "topology_decision.canonical_page_families[].source_evidence_span_ids[]",
    ],
    coverage: ["coverage.source_path", "coverage.status", "coverage.reason"],
  },
  conditional_required: [
    {
      when: {
        field: "entity_resolution.resolution",
        equals: "new_entity_proposal",
      },
      required: [
        "entity_resolution.proposed_entity_id",
        "entity_resolution.candidate_entities_checked[].entity_id",
        "entity_resolution.why_not_existing|why_not_alias_of_existing",
      ],
    },
  ],
  example: CONTEXT_EXTRACTION_SGR_EXAMPLE,
} as const;
