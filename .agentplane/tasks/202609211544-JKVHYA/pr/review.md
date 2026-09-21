# PR Review

Created: 2026-09-21T16:13:15.390Z

## Task

- Task: `202609211544-JKVHYA`
- Title: Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks
- Status: DOING
- Branch: `task/202609211544-JKVHYA/add-fail-closed-release-scope-exclusions-for-dem`
- Canonical task record: `.agentplane/tasks/202609211544-JKVHYA/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-21T16:13:15.390Z
- Branch: task/202609211544-JKVHYA/add-fail-closed-release-scope-exclusions-for-dem
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/task-registry-ready-script.test.ts     | 177 ++++++++++++++++++++
 .../write-release-ready-manifest-script.test.ts    |  80 ++++++++-
 scripts/checks/check-task-state.mjs                |  21 ++-
 scripts/lib/release-scope-exclusions.mjs           | 184 +++++++++++++++++++++
 scripts/release/check-task-registry-ready.mjs      |  10 ++
 scripts/release/manifest.mjs                       |  12 +-
 scripts/release/release-scope-exclusions.json      |  45 +++++
 7 files changed, 525 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
