---
tags:
  - agentplane/context
  - agentplane/source-architecture-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.source_architecture.index"
  title: "Source Architecture Assimilation"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - ".agentplane/policy/check-routing.mjs"
    - ".agentplane/policy/context.must.md"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/dod.docs.md"
    - ".agentplane/policy/examples/migration-note.md"
    - ".agentplane/policy/examples/pr-note.md"
    - ".agentplane/policy/examples/unit-test-pattern.md"
    - ".agentplane/policy/framework.dev.md"
    - ".agentplane/policy/governance.md"
    - ".agentplane/policy/incidents.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - ".agentplane/policy/workflow.direct.md"
    - ".agentplane/policy/workflow.md"
    - ".agentplane/policy/workflow.release.md"
    - ".agentplane/policy/workflow.upgrade.md"
    - ".github/workflows/ci.yml"
    - ".github/workflows/dependency-review.yml"
    - ".github/workflows/docs-ci.yml"
    - ".github/workflows/pages-deploy.yml"
    - ".github/workflows/prepublish.yml"
    - ".github/workflows/publish-distribution-module.yml"
    - ".github/workflows/publish.yml"
    - ".github/workflows/task-hosted-close.yml"
    - ".github/workflows/workflows-lint.yml"
    - "packages/agentplane/src/adapters/clock/system-clock-adapter.ts"
    - "packages/agentplane/src/adapters/fs/node-fs-adapter.ts"
    - "packages/agentplane/src/adapters/git/git-context-adapter.ts"
    - "packages/agentplane/src/adapters/index.ts"
    - "packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts"
    - "packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts"
    - "packages/agentplane/src/agents/agents-template.test.ts"
    - "packages/agentplane/src/agents/agents-template.ts"
    - "packages/agentplane/src/agents/policy-routing-check.test.ts"
  claims: []
  graph_refs:
    entities:
      - "entity.source_architecture_corpus"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`.agentplane/policy/check-routing.mjs`](../../.agentplane/policy/check-routing.mjs)
2. [`.agentplane/policy/context.must.md`](../../.agentplane/policy/context.must.md)
3. [`.agentplane/policy/dod.code.md`](../../.agentplane/policy/dod.code.md)
4. [`.agentplane/policy/dod.core.md`](../../.agentplane/policy/dod.core.md)
5. [`.agentplane/policy/dod.docs.md`](../../.agentplane/policy/dod.docs.md)
6. [`.agentplane/policy/examples/migration-note.md`](../../.agentplane/policy/examples/migration-note.md)
7. [`.agentplane/policy/examples/pr-note.md`](../../.agentplane/policy/examples/pr-note.md)
8. [`.agentplane/policy/examples/unit-test-pattern.md`](../../.agentplane/policy/examples/unit-test-pattern.md)
9. [`.agentplane/policy/framework.dev.md`](../../.agentplane/policy/framework.dev.md)
10. [`.agentplane/policy/governance.md`](../../.agentplane/policy/governance.md)
11. [`.agentplane/policy/incidents.md`](../../.agentplane/policy/incidents.md)
12. [`.agentplane/policy/security.must.md`](../../.agentplane/policy/security.must.md)
13. [`.agentplane/policy/workflow.branch_pr.md`](../../.agentplane/policy/workflow.branch_pr.md)
14. [`.agentplane/policy/workflow.direct.md`](../../.agentplane/policy/workflow.direct.md)
15. [`.agentplane/policy/workflow.md`](../../.agentplane/policy/workflow.md)
16. [`.agentplane/policy/workflow.release.md`](../../.agentplane/policy/workflow.release.md)
17. [`.agentplane/policy/workflow.upgrade.md`](../../.agentplane/policy/workflow.upgrade.md)
18. [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)
19. [`.github/workflows/dependency-review.yml`](../../.github/workflows/dependency-review.yml)
20. [`.github/workflows/docs-ci.yml`](../../.github/workflows/docs-ci.yml)
21. [`.github/workflows/pages-deploy.yml`](../../.github/workflows/pages-deploy.yml)
22. [`.github/workflows/prepublish.yml`](../../.github/workflows/prepublish.yml)
23. [`.github/workflows/publish-distribution-module.yml`](../../.github/workflows/publish-distribution-module.yml)
24. [`.github/workflows/publish.yml`](../../.github/workflows/publish.yml)
25. [`.github/workflows/task-hosted-close.yml`](../../.github/workflows/task-hosted-close.yml)
26. [`.github/workflows/workflows-lint.yml`](../../.github/workflows/workflows-lint.yml)
27. [`packages/agentplane/src/adapters/clock/system-clock-adapter.ts`](../../packages/agentplane/src/adapters/clock/system-clock-adapter.ts)
28. [`packages/agentplane/src/adapters/fs/node-fs-adapter.ts`](../../packages/agentplane/src/adapters/fs/node-fs-adapter.ts)
29. [`packages/agentplane/src/adapters/git/git-context-adapter.ts`](../../packages/agentplane/src/adapters/git/git-context-adapter.ts)
30. [`packages/agentplane/src/adapters/index.ts`](../../packages/agentplane/src/adapters/index.ts)
31. [`packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts`](../../packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts)
32. [`packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts`](../../packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts)
33. [`packages/agentplane/src/agents/agents-template.test.ts`](../../packages/agentplane/src/agents/agents-template.test.ts)
34. [`packages/agentplane/src/agents/agents-template.ts`](../../packages/agentplane/src/agents/agents-template.ts)
35. [`packages/agentplane/src/agents/policy-routing-check.test.ts`](../../packages/agentplane/src/agents/policy-routing-check.test.ts)

# Source Architecture Assimilation

This page is the navigation entrypoint for the [[packages|package map]], [[command-surface|command surface]], [[workflow-state-machines|workflow and state-machine map]], [[schemas-policies-checks|schema/policy/check map]], and [[test-coverage|test coverage map]].

The assimilation is graph-first: file-level coverage is stored in graph entities, graph edges, provenance rows, and coverage reports; wiki pages keep the code layer navigable without copying implementation bodies.

## Metrics

- Source files: 1576
- Source lines: 283688
- Source bytes: 9706304
- Packages/groups: 8
- Layers: 20
- Command groups: 91
- Test/spec/snapshot files: 472
- Local import edges captured: 12 of 12

## Navigation

- [[packages]]
- [[command-surface]]
- [[workflow-state-machines]]
- [[schemas-policies-checks]]
- [[test-coverage]]
