Task: `202605222302-CC7XZ9`
Title: Keep CI route registry edits in targeted hooks local CI
Canonical task record: `.agentplane/tasks/202605222302-CC7XZ9/README.md`

## Summary

Keep CI route registry edits in targeted hooks local CI

Local CI selection changes should not force full-fast solely because they touch scripts/lib/test-route-registry.mjs or scripts/lib/local-ci-selection.d.ts. Add these CI routing files to the hooks/local-CI bucket so selector maintenance runs targeted hooks checks instead of broad release/upgrade unit suites during pre-push.

## Scope

- In scope: Local CI selection changes should not force full-fast solely because they touch scripts/lib/test-route-registry.mjs or scripts/lib/local-ci-selection.d.ts. Add these CI routing files to the hooks/local-CI bucket so selector maintenance runs targeted hooks checks instead of broad release/upgrade unit suites during pre-push.
- Out of scope: unrelated refactors not required for "Keep CI route registry edits in targeted hooks local CI".

## Verification

- State: ok
- Note:

```text
Evaluator check: CI routing registry files are covered by the existing hooks bucket without
broadening generic scripts handling; regression coverage prevents full-fast fallback for selector
maintenance edits.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T23:04:37.589Z
- Branch: task/202605222302-CC7XZ9/hooks-route-ci-registry-files
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/local-ci-selection.test.ts | 13 +++++++++++++
 scripts/lib/local-ci-selection.mjs                     |  2 ++
 2 files changed, 15 insertions(+)
```

</details>
