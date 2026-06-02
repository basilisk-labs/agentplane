---
aliases:
  - "Task history version coverage"
tags:
  - agentplane/context
  - agentplane/task-history
  - agentplane/task-history-version
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "report.task_history_version_coverage"
  title: "Task history version coverage"
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

# Task history version coverage

coverage: 2945 task README sources assigned to 66 version buckets.

- covered: task identity, title, status, tags, importance score, topic signals, version bucket, and source refs.
- omitted_boilerplate: repeated lifecycle scaffolding, empty verification shells, generated PR boilerplate, and duplicate closeout text when not carrying durable process knowledge.
- unresolved: exact release inclusion for tasks is not inferred beyond chronological bucket assignment.
- redacted: no secret spans copied into wiki prose; raw README/ACR/PR files remain source refs, not quoted archives.

## Version Coverage Summary

- pre-v0.1.1: 377 tasks; score5=39; score4=55; collapsed_low=38
- v0.1.1: 29 tasks; score5=13; score4=3; collapsed_low=0
- v0.1.2: 5 tasks; score5=0; score4=1; collapsed_low=0
- v0.1.4: 79 tasks; score5=18; score4=12; collapsed_low=13
- v0.1.6: 27 tasks; score5=4; score4=3; collapsed_low=0
- v0.1.7: 10 tasks; score5=1; score4=7; collapsed_low=0
- v0.1.8: 24 tasks; score5=7; score4=5; collapsed_low=0
- v0.1.9: 167 tasks; score5=17; score4=21; collapsed_low=9
- v0.2.0: 8 tasks; score5=1; score4=2; collapsed_low=1
- v0.2.2: 2 tasks; score5=1; score4=0; collapsed_low=1
- v0.2.3: 1 tasks; score5=0; score4=0; collapsed_low=0
- v0.2.5: 23 tasks; score5=5; score4=7; collapsed_low=0
- v0.2.6: 18 tasks; score5=2; score4=1; collapsed_low=9
- v0.2.12: 44 tasks; score5=9; score4=14; collapsed_low=4
- v0.2.13: 39 tasks; score5=20; score4=12; collapsed_low=0
- v0.2.14: 4 tasks; score5=4; score4=0; collapsed_low=0
- v0.2.17: 10 tasks; score5=6; score4=1; collapsed_low=1
- v0.2.19: 53 tasks; score5=7; score4=11; collapsed_low=12
- v0.2.21: 11 tasks; score5=1; score4=2; collapsed_low=1
- v0.2.23: 22 tasks; score5=3; score4=0; collapsed_low=6
- v0.2.25: 17 tasks; score5=1; score4=8; collapsed_low=0
- v0.2.26: 14 tasks; score5=6; score4=0; collapsed_low=0
- v0.3.1: 51 tasks; score5=6; score4=14; collapsed_low=8
- v0.3.2: 80 tasks; score5=19; score4=18; collapsed_low=6
- v0.3.4: 45 tasks; score5=14; score4=4; collapsed_low=8
- v0.3.5: 59 tasks; score5=11; score4=13; collapsed_low=0
- v0.3.6: 74 tasks; score5=43; score4=6; collapsed_low=0
- v0.3.7: 241 tasks; score5=49; score4=104; collapsed_low=2
- v0.3.9: 16 tasks; score5=14; score4=1; collapsed_low=0
- v0.3.10: 128 tasks; score5=62; score4=39; collapsed_low=0
- v0.3.11: 36 tasks; score5=33; score4=3; collapsed_low=0
- v0.3.12: 60 tasks; score5=29; score4=7; collapsed_low=0
- v0.3.13: 24 tasks; score5=13; score4=5; collapsed_low=0
- v0.3.14: 85 tasks; score5=14; score4=13; collapsed_low=0
- v0.3.15: 32 tasks; score5=4; score4=13; collapsed_low=0
- v0.3.16: 63 tasks; score5=5; score4=10; collapsed_low=0
- v0.3.17: 65 tasks; score5=15; score4=8; collapsed_low=0
- v0.3.18: 5 tasks; score5=0; score4=0; collapsed_low=0
- v0.3.21: 28 tasks; score5=11; score4=6; collapsed_low=0
- v0.3.22: 1 tasks; score5=1; score4=0; collapsed_low=0
- v0.3.24: 28 tasks; score5=11; score4=4; collapsed_low=3
- v0.3.25: 1 tasks; score5=1; score4=0; collapsed_low=0
- v0.3.26: 1 tasks; score5=1; score4=0; collapsed_low=0
- v0.3.27: 36 tasks; score5=4; score4=7; collapsed_low=1
- v0.3.28: 13 tasks; score5=10; score4=1; collapsed_low=0
- v0.3.29: 37 tasks; score5=20; score4=4; collapsed_low=0
- v0.4.0: 47 tasks; score5=18; score4=6; collapsed_low=0
- v0.4.1: 68 tasks; score5=43; score4=6; collapsed_low=4
- v0.4.2: 58 tasks; score5=12; score4=6; collapsed_low=19
- v0.4.3: 32 tasks; score5=12; score4=11; collapsed_low=4
- v0.4.4: 173 tasks; score5=66; score4=26; collapsed_low=1
- v0.5.0: 80 tasks; score5=50; score4=7; collapsed_low=0
- v0.6.0: 11 tasks; score5=6; score4=3; collapsed_low=0
- v0.6.1: 51 tasks; score5=39; score4=10; collapsed_low=1
- v0.6.2: 18 tasks; score5=15; score4=2; collapsed_low=0
- v0.6.3: 24 tasks; score5=19; score4=1; collapsed_low=0
- v0.6.4: 8 tasks; score5=6; score4=1; collapsed_low=0
- v0.6.5: 40 tasks; score5=24; score4=5; collapsed_low=0
- v0.6.6: 16 tasks; score5=12; score4=0; collapsed_low=0
- v0.6.7: 5 tasks; score5=4; score4=0; collapsed_low=0
- v0.6.8: 12 tasks; score5=8; score4=2; collapsed_low=0
- v0.6.9: 11 tasks; score5=7; score4=3; collapsed_low=0
- v0.6.10: 12 tasks; score5=6; score4=4; collapsed_low=0
- v0.6.11: 65 tasks; score5=25; score4=8; collapsed_low=0
- v0.6.12: 11 tasks; score5=5; score4=5; collapsed_low=0
- v0.6.13: 10 tasks; score5=6; score4=3; collapsed_low=0

## Sources

1. [.agentplane/tasks](../../../.agentplane/tasks)
