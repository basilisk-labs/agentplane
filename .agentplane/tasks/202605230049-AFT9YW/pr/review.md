# PR Review

Created: 2026-05-23T00:49:49.508Z

## Task

- Task: `202605230049-AFT9YW`
- Title: Narrow hosted close PR local CI route
- Status: DOING
- Branch: `task/202605230049-AFT9YW/hosted-close-pr-ci-route`
- Canonical task record: `.agentplane/tasks/202605230049-AFT9YW/README.md`

## Verification

- State: ok
- Note: Addressed PR review: hosted-close-pr bucket now matches only hosted-close-pr files, while non-PR hosted-close command paths remain on the generic task route. Re-ran selector tests, route smoke, lint, and format.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T00:54:59.809Z
- Branch: task/202605230049-AFT9YW/hosted-close-pr-ci-route
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  | 27 ++++++++++++++++++++++
 scripts/lib/local-ci-selection.d.ts                |  1 +
 scripts/lib/local-ci-selection.mjs                 | 26 +++++++++++++++++++++
 scripts/lib/test-route-registry.mjs                |  7 ++++++
 4 files changed, 61 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
