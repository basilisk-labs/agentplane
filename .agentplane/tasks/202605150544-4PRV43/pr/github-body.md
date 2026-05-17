Task: `202605150544-4PRV43`
Title: Fix issue #3781 snapshot hook rejection
Canonical task record: `.agentplane/tasks/202605150544-4PRV43/README.md`

## Summary

Fix issue #3781 snapshot hook rejection

Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.

## Scope

- In scope: Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.
- Out of scope: unrelated refactors not required for "Fix issue #3781 snapshot hook rejection".

## Verification

- State: ok
- Note:

```text
Implemented pre-commit fallback task-id inference from staged task artifact paths and added
regression test covering resolved-snapshot task artifact flow; targeted workflow hooks test passes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-15T05:47:47.151Z
- Branch: task/202605150544-4PRV43/snapshot-hook-fix
- Head: ad3958990d0d

```text
 .../blueprint/resolved-snapshot.json               | 322 +++++++++++++++++++++
 .../src/commands/hooks/run.pre-commit.ts           |   7 +-
 .../agentplane/src/commands/hooks/task-context.ts  |  15 +
 .../src/commands/workflow.verify-hooks.test.ts     |  37 +++
 4 files changed, 380 insertions(+), 1 deletion(-)
```

</details>
