Task: `202605091753-A9YYYQ`
Title: Deduplicate hook task intent context
Canonical task record: `.agentplane/tasks/202605091753-A9YYYQ/README.md`

## Summary

Deduplicate hook task intent context

Extract common hook helpers for task intent loading, enum parsing, environment flags, and branch task-id inference from pre-commit and commit-msg hooks.

## Scope

- In scope: Extract common hook helpers for task intent loading, enum parsing, environment flags, and branch task-id inference from pre-commit and commit-msg hooks.
- Out of scope: unrelated refactors not required for "Deduplicate hook task intent context".

## Verification

- State: ok
- Note: Verified: extracted shared hook task context helper; focused hook tests passed (2 files, 33 tests), typecheck passed, Prettier passed, clone:report improved metrics to 84 clones / 1420 duplicated lines / 15111 duplicated tokens, and clone:check passed without baseline update.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T18:37:34.130Z
- Branch: task/202605091753-A9YYYQ/hook-context
- Head: e3b10b70df91

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 .../src/commands/hooks/run.commit-msg.ts           | 104 +----
 .../src/commands/hooks/run.pre-commit.ts           |  82 +---
 .../agentplane/src/commands/hooks/task-context.ts  |  94 ++++
 4 files changed, 614 insertions(+), 171 deletions(-)
```

</details>
