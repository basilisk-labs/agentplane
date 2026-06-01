---
aliases:
  - "Task history version assimilation report"
tags:
  - agentplane/context
  - agentplane/task-history
  - agentplane/task-history-version
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "report.task_history_version_assimilation"
  title: "Task history version assimilation report"
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
# Task history version assimilation report

The task history corpus is assimilated through version-level pre-extraction packets rather than one semantic pass over every task. [[Task history version pre-extraction packets]] is the compact source for future semantic extraction; [[Task history coverage]] remains the audit pattern for task-level coverage.

## Volume

- Original task README count: 2945
- Original task README bytes: 18995698
- Original ACR count: 236
- Original ACR bytes: 1388085
- PR artifact file count: 5377
- Counted original source bytes: 20383783
- Version packet bytes: 71792
- Compression ratio by counted source bytes: 283.93:1

## Assimilation Degree

- Covered tasks: 2945/2945 task READMEs represented in version buckets and coverage detail.
- Deep-extract candidates: 1492
- Collapsed low-importance tasks: 152
- Version buckets: 66
- Granularity: version section -> topic counts -> important task extracts -> task-level coverage row.

## Critical Boundaries

- This assimilation preserves task coverage and high-signal extraction targets; it does not claim that every low-score task has been semantically rewritten as standalone wiki prose.
- Release bucket assignment is based on tag chronology versus task-id chronology; it is a context-window strategy, not a substitute for release-note truth.
- A future CURATOR pass should deep-assimilate score 5 clusters for release, branch_pr, context, runner, and policy surfaces.

## Sources

1. [Task history version packets](task-history-version-packets.md)
2. [Task history pre-extraction topology](task-history-preextract-topology.md)
