---
tags:
  - agentplane/context
  - agentplane/source-architecture-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.source_architecture.schemas_policies_checks"
  title: "Schemas Policies Checks"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "packages/core/schemas/acr-v0.1.schema.json"
    - "packages/core/schemas/agentplane-context.schema.json"
    - "packages/core/schemas/config.schema.json"
    - "packages/core/schemas/context-capability-artifact.schema.json"
    - "packages/core/schemas/context-edge.schema.json"
    - "packages/core/schemas/context-entity.schema.json"
    - "packages/core/schemas/context-fact.schema.json"
    - "packages/core/schemas/context-provenance-edge.schema.json"
    - "packages/core/schemas/pr-meta.schema.json"
    - "packages/core/schemas/runner-handoff.schema.json"
    - "packages/core/schemas/task-handoff.schema.json"
    - "packages/core/schemas/task-observation.schema.json"
    - "packages/core/schemas/task-readme-frontmatter.schema.json"
    - "packages/core/schemas/tasks-export.schema.json"
    - "packages/spec/schemas/acr-v0.1.schema.json"
    - "packages/spec/schemas/agentplane-context.schema.json"
    - "packages/spec/schemas/config.schema.json"
    - "packages/spec/schemas/context-capability-artifact.schema.json"
    - "packages/spec/schemas/context-edge.schema.json"
    - "packages/spec/schemas/context-entity.schema.json"
    - "packages/spec/schemas/context-fact.schema.json"
    - "packages/spec/schemas/context-provenance-edge.schema.json"
    - "packages/spec/schemas/pr-meta.schema.json"
    - "packages/spec/schemas/runner-handoff.schema.json"
    - "packages/spec/schemas/task-handoff.schema.json"
    - "packages/spec/schemas/task-observation.schema.json"
    - "packages/spec/schemas/task-readme-frontmatter.schema.json"
    - "packages/spec/schemas/tasks-export.schema.json"
    - ".agentplane/policy/check-routing.mjs"
    - ".agentplane/policy/context.must.md"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/dod.docs.md"
    - ".agentplane/policy/examples/migration-note.md"
    - ".agentplane/policy/examples/pr-note.md"
  claims: []
  graph_refs:
    entities:
      - "entity.source_concept.schemas"
      - "entity.source_concept.policy"
      - "entity.source_concept.github-actions"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`packages/core/schemas/acr-v0.1.schema.json`](../../packages/core/schemas/acr-v0.1.schema.json)
2. [`packages/core/schemas/agentplane-context.schema.json`](../../packages/core/schemas/agentplane-context.schema.json)
3. [`packages/core/schemas/config.schema.json`](../../packages/core/schemas/config.schema.json)
4. [`packages/core/schemas/context-capability-artifact.schema.json`](../../packages/core/schemas/context-capability-artifact.schema.json)
5. [`packages/core/schemas/context-edge.schema.json`](../../packages/core/schemas/context-edge.schema.json)
6. [`packages/core/schemas/context-entity.schema.json`](../../packages/core/schemas/context-entity.schema.json)
7. [`packages/core/schemas/context-fact.schema.json`](../../packages/core/schemas/context-fact.schema.json)
8. [`packages/core/schemas/context-provenance-edge.schema.json`](../../packages/core/schemas/context-provenance-edge.schema.json)
9. [`packages/core/schemas/pr-meta.schema.json`](../../packages/core/schemas/pr-meta.schema.json)
10. [`packages/core/schemas/runner-handoff.schema.json`](../../packages/core/schemas/runner-handoff.schema.json)
11. [`packages/core/schemas/task-handoff.schema.json`](../../packages/core/schemas/task-handoff.schema.json)
12. [`packages/core/schemas/task-observation.schema.json`](../../packages/core/schemas/task-observation.schema.json)
13. [`packages/core/schemas/task-readme-frontmatter.schema.json`](../../packages/core/schemas/task-readme-frontmatter.schema.json)
14. [`packages/core/schemas/tasks-export.schema.json`](../../packages/core/schemas/tasks-export.schema.json)
15. [`packages/spec/schemas/acr-v0.1.schema.json`](../../packages/spec/schemas/acr-v0.1.schema.json)
16. [`packages/spec/schemas/agentplane-context.schema.json`](../../packages/spec/schemas/agentplane-context.schema.json)
17. [`packages/spec/schemas/config.schema.json`](../../packages/spec/schemas/config.schema.json)
18. [`packages/spec/schemas/context-capability-artifact.schema.json`](../../packages/spec/schemas/context-capability-artifact.schema.json)
19. [`packages/spec/schemas/context-edge.schema.json`](../../packages/spec/schemas/context-edge.schema.json)
20. [`packages/spec/schemas/context-entity.schema.json`](../../packages/spec/schemas/context-entity.schema.json)
21. [`packages/spec/schemas/context-fact.schema.json`](../../packages/spec/schemas/context-fact.schema.json)
22. [`packages/spec/schemas/context-provenance-edge.schema.json`](../../packages/spec/schemas/context-provenance-edge.schema.json)
23. [`packages/spec/schemas/pr-meta.schema.json`](../../packages/spec/schemas/pr-meta.schema.json)
24. [`packages/spec/schemas/runner-handoff.schema.json`](../../packages/spec/schemas/runner-handoff.schema.json)
25. [`packages/spec/schemas/task-handoff.schema.json`](../../packages/spec/schemas/task-handoff.schema.json)
26. [`packages/spec/schemas/task-observation.schema.json`](../../packages/spec/schemas/task-observation.schema.json)
27. [`packages/spec/schemas/task-readme-frontmatter.schema.json`](../../packages/spec/schemas/task-readme-frontmatter.schema.json)
28. [`packages/spec/schemas/tasks-export.schema.json`](../../packages/spec/schemas/tasks-export.schema.json)
29. [`.agentplane/policy/check-routing.mjs`](../../.agentplane/policy/check-routing.mjs)
30. [`.agentplane/policy/context.must.md`](../../.agentplane/policy/context.must.md)
31. [`.agentplane/policy/dod.code.md`](../../.agentplane/policy/dod.code.md)
32. [`.agentplane/policy/dod.core.md`](../../.agentplane/policy/dod.core.md)
33. [`.agentplane/policy/dod.docs.md`](../../.agentplane/policy/dod.docs.md)
34. [`.agentplane/policy/examples/migration-note.md`](../../.agentplane/policy/examples/migration-note.md)
35. [`.agentplane/policy/examples/pr-note.md`](../../.agentplane/policy/examples/pr-note.md)

# Schemas Policies Checks

Contract surfaces are the main guardrails for AgentPlane changes: schemas define artifact shape, policy files define agent routing and task constraints, and check scripts/workflows enforce merge and release quality.

| Surface          | Files | Lines |
| ---------------- | ----- | ----- |
| schemas          | 28    | 9358  |
| policies         | 17    | 852   |
| checks/workflows | 57    | 9378  |

## Retrieval Use

Use this page when a behavior may be governed by a schema, policy route, CI check, or release gate rather than by command implementation alone.
