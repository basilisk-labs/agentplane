# PR Review

Created: 2026-05-23T09:15:33.390Z

## Task

- Task: `202605230831-GKV94B`
- Title: Add release next-action diagnostic
- Status: DOING
- Branch: `task/202605230831-GKV94B/release-next-action-diagnostic`
- Canonical task record: `.agentplane/tasks/202605230831-GKV94B/README.md`

## Verification

- State: ok
- Note: Implemented release next-action diagnostic expansion. Evidence: bun test packages/agentplane/src/commands/release/release-next-action-script.test.ts (2 pass, 14 expects); bun run lint:core passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T09:15:33.390Z
- Branch: task/202605230831-GKV94B/release-next-action-diagnostic
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/release-next-action-script.test.ts     | 149 +++++++++++++++++
 scripts/release/next-action.mjs                    | 185 ++++++++++++++++++++-
 2 files changed, 327 insertions(+), 7 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
