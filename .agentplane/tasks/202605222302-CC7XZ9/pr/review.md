# PR Review

Created: 2026-05-22T23:04:37.589Z

## Task

- Task: `202605222302-CC7XZ9`
- Title: Keep CI route registry edits in targeted hooks local CI
- Status: DOING
- Branch: `task/202605222302-CC7XZ9/hooks-route-ci-registry-files`
- Canonical task record: `.agentplane/tasks/202605222302-CC7XZ9/README.md`

## Verification

- State: ok
- Note: Evaluator check: CI routing registry files are covered by the existing hooks bucket without broadening generic scripts handling; regression coverage prevents full-fast fallback for selector maintenance edits.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
