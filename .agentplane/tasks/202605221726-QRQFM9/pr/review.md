# PR Review

Created: 2026-05-22T23:52:55.420Z

## Task

- Task: `202605221726-QRQFM9`
- Title: Promote MERGED_PENDING_CLOSE to first-class task state
- Status: DOING
- Branch: `task/202605221726-QRQFM9/merged-pending-close-state`
- Canonical task record: `.agentplane/tasks/202605221726-QRQFM9/README.md`

## Verification

- State: ok
- Note: Evaluator check: projection tests cover task list/search/next; release readiness now has a distinct MERGED_PENDING_CLOSE failure path, while DONE remains unchanged and still requires hosted close metadata.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T23:52:55.420Z
- Branch: task/202605221726-QRQFM9/merged-pending-close-state
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/task-registry-ready-script.test.ts     | 46 +++++++++++++++++++++-
 scripts/checks/check-task-state.mjs                | 34 +++++++++++++++-
 2 files changed, 77 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
