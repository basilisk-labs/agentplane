# PR Review

Created: 2026-05-22T23:40:42.951Z

## Task

- Task: `202605222339-RZVQJ9`
- Title: Narrow pr flow status local CI route
- Status: DOING
- Branch: `task/202605222339-RZVQJ9/pr-flow-status-ci-route`
- Canonical task record: `.agentplane/tasks/202605222339-RZVQJ9/README.md`

## Verification

- State: ok
- Note: Evaluator check: route is narrow, ordered before broader cli-core/pr catch-alls, preserves task artifact neutrality, and smoke output confirms targeted pr-flow-status selection.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T23:40:42.951Z
- Branch: task/202605222339-RZVQJ9/pr-flow-status-ci-route
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  | 20 ++++++++++++++++++
 scripts/lib/local-ci-selection.d.ts                |  1 +
 scripts/lib/local-ci-selection.mjs                 | 24 ++++++++++++++++++++++
 scripts/lib/test-route-registry.mjs                |  5 +++++
 4 files changed, 50 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
