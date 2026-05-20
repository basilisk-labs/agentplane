Task: `202605200626-Q0VM6Y`
Title: Add source-shaped topology gate
Canonical task record: `.agentplane/tasks/202605200626-Q0VM6Y/README.md`

## Summary

Add source-shaped topology gate

Make maximum-assimilation context tasks record and verify a source-shaped topology decision before narrative wiki synthesis; includes docs updates.

## Scope

- In scope: Make maximum-assimilation context tasks record and verify a source-shaped topology decision before narrative wiki synthesis; includes docs updates.
- Out of scope: unrelated refactors not required for "Add source-shaped topology gate".

## Verification

- State: ok
- Note:

```text
Raw init remains source-shaped: release-readiness test asserts context/raw contains only .gitkeep;
isolated maximum-assimilation init contour produced only context/raw and context/raw/.gitkeep.
Checks: bun run format:changed, bun test
packages/agentplane/src/commands/context/release-readiness.test.ts, node
.agentplane/policy/check-routing.mjs, ap doctor.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T08:00:43.076Z
- Branch: task/202605200626-Q0VM6Y/source-shaped-topology-gate
- Head: a843ab4d304b

```text
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 docs/user/local-context.mdx                        |  10 +-
 packages/agentplane/src/blueprints/builtins.ts     | 107 +---
 .../src/blueprints/context-maximum-assimilation.ts | 118 +++++
 .../agentplane/src/blueprints/validate.test.ts     |   3 +
 packages/agentplane/src/commands/context/init.ts   |   1 +
 .../src/commands/context/release-readiness.test.ts |   4 +
 packages/agentplane/src/context/ingest-task.ts     |   4 +
 8 files changed, 716 insertions(+), 102 deletions(-)
```

</details>
