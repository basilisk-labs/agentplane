---
aliases: []
tags:
  - agentplane/context
  - agentplane/source-architecture-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.source_architecture.workflow_state_machines"
  title: "Workflow and State Machines"
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
    - "packages/agentplane/src/policy/engine.test.ts"
    - "packages/agentplane/src/policy/engine.ts"
    - "packages/agentplane/src/policy/evaluate.test.ts"
    - "packages/agentplane/src/policy/evaluate.ts"
    - "packages/agentplane/src/policy/model.ts"
    - "packages/agentplane/src/policy/result.ts"
    - "packages/agentplane/src/policy/rules/allowlist.ts"
    - "packages/agentplane/src/policy/rules/branch-pr-base.ts"
    - "packages/agentplane/src/policy/rules/clean-tree.ts"
    - "packages/agentplane/src/policy/rules/commit-subject.ts"
    - "packages/agentplane/src/policy/rules/phase.ts"
    - "packages/agentplane/src/policy/rules/protected-paths.ts"
    - "packages/agentplane/src/policy/rules/task-bound-mutation.ts"
    - "packages/agentplane/src/policy/taxonomy-types.ts"
    - "packages/agentplane/src/policy/taxonomy.test.ts"
    - "packages/agentplane/src/policy/taxonomy.ts"
    - "packages/agentplane/src/workflow-lifecycle/contract.test.ts"
    - "packages/agentplane/src/workflow-lifecycle/contract.ts"
  claims: []
  graph_refs:
    entities:
      - "entity.source_concept.branch-pr"
      - "entity.source_concept.task-lifecycle"
      - "entity.source_concept.release"
      - "entity.source_concept.upgrade"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`.agentplane/policy/check-routing.mjs`](../../../.agentplane/policy/check-routing.mjs)
2. [`.agentplane/policy/context.must.md`](../../../.agentplane/policy/context.must.md)
3. [`.agentplane/policy/dod.code.md`](../../../.agentplane/policy/dod.code.md)
4. [`.agentplane/policy/dod.core.md`](../../../.agentplane/policy/dod.core.md)
5. [`.agentplane/policy/dod.docs.md`](../../../.agentplane/policy/dod.docs.md)
6. [`.agentplane/policy/examples/migration-note.md`](../../../.agentplane/policy/examples/migration-note.md)
7. [`.agentplane/policy/examples/pr-note.md`](../../../.agentplane/policy/examples/pr-note.md)
8. [`.agentplane/policy/examples/unit-test-pattern.md`](../../../.agentplane/policy/examples/unit-test-pattern.md)
9. [`.agentplane/policy/framework.dev.md`](../../../.agentplane/policy/framework.dev.md)
10. [`.agentplane/policy/governance.md`](../../../.agentplane/policy/governance.md)
11. [`.agentplane/policy/incidents.md`](../../../.agentplane/policy/incidents.md)
12. [`.agentplane/policy/security.must.md`](../../../.agentplane/policy/security.must.md)
13. [`.agentplane/policy/workflow.branch_pr.md`](../../../.agentplane/policy/workflow.branch_pr.md)
14. [`.agentplane/policy/workflow.direct.md`](../../../.agentplane/policy/workflow.direct.md)
15. [`.agentplane/policy/workflow.md`](../../../.agentplane/policy/workflow.md)
16. [`.agentplane/policy/workflow.release.md`](../../../.agentplane/policy/workflow.release.md)
17. [`.agentplane/policy/workflow.upgrade.md`](../../../.agentplane/policy/workflow.upgrade.md)
18. [`packages/agentplane/src/policy/engine.test.ts`](../../../packages/agentplane/src/policy/engine.test.ts)
19. [`packages/agentplane/src/policy/engine.ts`](../../../packages/agentplane/src/policy/engine.ts)
20. [`packages/agentplane/src/policy/evaluate.test.ts`](../../../packages/agentplane/src/policy/evaluate.test.ts)
21. [`packages/agentplane/src/policy/evaluate.ts`](../../../packages/agentplane/src/policy/evaluate.ts)
22. [`packages/agentplane/src/policy/model.ts`](../../../packages/agentplane/src/policy/model.ts)
23. [`packages/agentplane/src/policy/result.ts`](../../../packages/agentplane/src/policy/result.ts)
24. [`packages/agentplane/src/policy/rules/allowlist.ts`](../../../packages/agentplane/src/policy/rules/allowlist.ts)
25. [`packages/agentplane/src/policy/rules/branch-pr-base.ts`](../../../packages/agentplane/src/policy/rules/branch-pr-base.ts)
26. [`packages/agentplane/src/policy/rules/clean-tree.ts`](../../../packages/agentplane/src/policy/rules/clean-tree.ts)
27. [`packages/agentplane/src/policy/rules/commit-subject.ts`](../../../packages/agentplane/src/policy/rules/commit-subject.ts)
28. [`packages/agentplane/src/policy/rules/phase.ts`](../../../packages/agentplane/src/policy/rules/phase.ts)
29. [`packages/agentplane/src/policy/rules/protected-paths.ts`](../../../packages/agentplane/src/policy/rules/protected-paths.ts)
30. [`packages/agentplane/src/policy/rules/task-bound-mutation.ts`](../../../packages/agentplane/src/policy/rules/task-bound-mutation.ts)
31. [`packages/agentplane/src/policy/taxonomy-types.ts`](../../../packages/agentplane/src/policy/taxonomy-types.ts)
32. [`packages/agentplane/src/policy/taxonomy.test.ts`](../../../packages/agentplane/src/policy/taxonomy.test.ts)
33. [`packages/agentplane/src/policy/taxonomy.ts`](../../../packages/agentplane/src/policy/taxonomy.ts)
34. [`packages/agentplane/src/workflow-lifecycle/contract.test.ts`](../../../packages/agentplane/src/workflow-lifecycle/contract.test.ts)
35. [`packages/agentplane/src/workflow-lifecycle/contract.ts`](../../../packages/agentplane/src/workflow-lifecycle/contract.ts)

# Workflow and State Machines

Workflow logic is spread across runtime workflow code, policy modules, release/upgrade command paths, and branch PR integration commands. The assimilation links these surfaces through recurring concepts rather than treating each command as an isolated file.

| Layer            | Files | Lines  | Tests |
| ---------------- | ----- | ------ | ----- |
| commands         | 663   | 111692 | 191   |
| github-workflows | 9     | 2285   | 0     |
| policy-engine    | 16    | 1395   | 3     |
| release-scripts  | 29    | 6199   | 0     |
| repo-policy      | 17    | 852    | 0     |
| workflow-runtime | 22    | 2615   | 7     |
| workflow-scripts | 9     | 2373   | 0     |

## Retrieval Use

Use this page when a task asks why a command is blocked, what route owns a mutation, or which state transition must happen before finish/merge. The detailed file-level graph carries the concrete source refs.
