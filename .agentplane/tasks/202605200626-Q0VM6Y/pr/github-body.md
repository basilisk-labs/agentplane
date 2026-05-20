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
- Note: Quality gate passed for source-shaped topology scope.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T06:30:45.760Z
- Branch: task/202605200626-Q0VM6Y/source-shaped-topology-gate
- Head: ceb72f644170

```text
 docs/user/local-context.mdx                            |  8 ++++++++
 packages/agentplane/src/blueprints/builtins.ts         | 18 ++++++++++++++++++
 packages/agentplane/src/blueprints/validate.test.ts    |  3 +++
 packages/agentplane/src/commands/context/init.ts       |  7 +++++++
 .../src/commands/context/release-readiness.test.ts     | 10 ++++++++++
 packages/agentplane/src/context/ingest-task.ts         |  4 ++++
 6 files changed, 50 insertions(+)
```

</details>
