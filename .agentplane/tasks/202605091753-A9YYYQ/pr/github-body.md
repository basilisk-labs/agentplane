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

- Updated: 2026-05-09T18:37:16.398Z
- Branch: task/202605091753-A9YYYQ/hook-context
- Head: 31abc088e938

```text
No changes detected.
```

</details>
