---
aliases:
  - "Task history pre-extraction topology"
tags:
  - agentplane/context
  - agentplane/task-history
  - agentplane/task-history-version
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "report.task_history_preextract_topology"
  title: "Task history pre-extraction topology"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - ".agentplane/tasks/202601041253-00001/README.md#lines=1-80"
    - ".agentplane/tasks/202606011811-JSY2B9/README.md#lines=1-80"
    - ".agentplane/context/agentplane.context.yaml#lines=1-90"
  claims: []
  graph_refs:
    entities:
      - entity.task_history_version_assimilation
      - entity.task_history_preextract_packet
    edges:
      - edge.task_history_version_assimilation.uses_preextract_packets
  conflicts: []
  updated_by: CURATOR
---

# Task history pre-extraction topology

- source_shape: task history plus PR/ACR support artifacts.
- canonical_families: reports, task-history-version, glossary, derived facts, derived graph, derived coverage.
- page_vs_heading granularity: one version packet section per release tag; one report page for strategy/metrics; task-level details remain in coverage rows and source refs.
- importance boundary: score 4-5 tasks are listed as deep-extract candidates; score 1-2 tasks are collapsed into version aggregates unless they carry incident, release, policy, route, context, or runner signals.
- context-window policy: future extraction loads one version section plus graph/fact rows, not the full .agentplane/tasks corpus.
- unresolved identity: tasks without release-tag alignment are assigned to the nearest previous release bucket or the pre-release bucket; this is deterministic but not a claim about product release inclusion.

This topology updates [[Task history topology]] by adding a pre-extraction packet layer between raw task READMEs and semantic wiki assimilation.

## Sources

1. [.agentplane/tasks](../../../.agentplane/tasks)
2. [.agentplane/context/agentplane.context.yaml](../../../.agentplane/context/agentplane.context.yaml)
