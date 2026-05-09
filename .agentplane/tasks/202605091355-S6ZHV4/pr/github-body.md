Task: `202605091355-S6ZHV4`
Title: Deduplicate core type guards
Canonical task record: `.agentplane/tasks/202605091355-S6ZHV4/README.md`

## Summary

Deduplicate core type guards

Create one internal core type guard helper and replace duplicated isRecord/isStringArray implementations inside packages/core without changing public package exports.

## Scope

- In scope: Create one internal core type guard helper and replace duplicated isRecord/isStringArray implementations inside packages/core without changing public package exports.
- Out of scope: unrelated refactors not required for "Deduplicate core type guards".

## Verification

- State: ok
- Note: Core guard deduplication verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T14:00:39.894Z
- Branch: task/202605091355-S6ZHV4/core-guards
- Head: 42c385b23088

```text
 .../blueprint/resolved-snapshot.json               | 496 +++++++++++++++++++++
 packages/core/src/config/schema.impl.ts            |   5 +-
 packages/core/src/config/workflow-file.ts          |   5 +-
 .../core/src/tasks/task-artifact-schema.shared.ts  |   5 +-
 packages/core/src/tasks/task-readme.ts             |   9 +-
 packages/core/src/tasks/task-store.ts              |   5 +-
 packages/core/src/tasks/tasks-export.ts            |   5 +-
 packages/core/src/tasks/tasks-lint.ts              |  13 +-
 packages/core/src/types/guards.ts                  |  11 +
 9 files changed, 516 insertions(+), 38 deletions(-)
```

</details>
