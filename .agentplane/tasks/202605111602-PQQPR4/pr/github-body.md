Task: `202605111602-PQQPR4`
Title: Fix task doc canonical rendering drift for v0.5
Canonical task record: `.agentplane/tasks/202605111602-PQQPR4/README.md`

## Summary

Fix task doc canonical rendering drift for v0.5

Normalize task doc set/read/scaffold behavior after canonical sections migration so README output is stable and explicit.

## Scope

- In scope: Normalize task doc set/read/scaffold behavior after canonical sections migration and keep explicit sections stable.
- Out of scope: unrelated refactors not required for "Fix task doc canonical rendering drift for v0.5".

## Verification

- State: ok
- Note: Run task doc targeted regression and verify PR artifacts are complete and language-clean.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-11T16:24:37.925Z
- Branch: task/202605111602-PQQPR4/doc-canonical-v05
- Head: 69c567d83f20

```text
 .../src/cli/run-cli.core.tasks.doc-write.test.ts   |  2 +-
 .../src/commands/shared/task-store/store.ts        |  2 +-
 packages/agentplane/src/commands/task/doc.ts       | 73 ++++++++++++++++++----
 packages/core/src/tasks/task-readme.ts             | 16 +++--
 4 files changed, 76 insertions(+), 17 deletions(-)
```

</details>
